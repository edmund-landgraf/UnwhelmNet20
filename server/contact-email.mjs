import "dotenv/config";
import { ConfidentialClientApplication } from "@azure/msal-node";

const tenantId = process.env.UNWHELM_TENANT_ID;
const clientId = process.env.UNWHELM_CLIENT_ID;
const clientSecret = process.env.UNWHELM_CLIENT_SECRET;
const senderAddress = process.env.UNWHELM_SENDER || "no-reply@unwhelm.net";

let msalApp = null;

function getMsalApp() {
  if (!tenantId || !clientId || !clientSecret) {
    throw new Error("Azure AD credentials not configured");
  }

  if (!msalApp) {
    msalApp = new ConfidentialClientApplication({
      auth: {
        clientId,
        authority: `https://login.microsoftonline.com/${tenantId}`,
        clientSecret,
      },
    });
  }

  return msalApp;
}

async function getAccessToken() {
  const tokenResponse = await getMsalApp().acquireTokenByClientCredential({
    scopes: ["https://graph.microsoft.com/.default"],
  });

  if (!tokenResponse?.accessToken) {
    throw new Error("Unable to acquire Microsoft Graph access token.");
  }

  return tokenResponse.accessToken;
}

function buildHtmlBody(data) {
  return `
  <div style="font-family:Inter,Arial,sans-serif;background:#faf7ff;color:#333;padding:24px;">
    <h2 style="color:#5b21b6;">New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Company:</strong> ${data.company}</p>
    <p><strong>Phone:</strong> ${data.phone ?? ""}</p>
    <p><strong>Title:</strong> ${data.title ?? ""}</p>
    <p><strong>Website:</strong> ${data.website ?? ""}</p>
    <hr style="margin:20px 0;border:none;border-top:1px solid #ddd;">
    <p><strong>Software Platforms:</strong> ${(data.software ?? []).join(", ")}</p>
    <p><strong>Goals:</strong> ${(data.goals ?? []).join(", ")}</p>
    <p><strong>Message:</strong><br>${data.message}</p>
    <hr style="margin:20px 0;border:none;border-top:1px solid #ddd;">
    <small style="color:#666;">IP: ${data.ipAddress ?? ""}<br>Agent: ${data.userAgent ?? ""}</small>
  </div>`;
}

function buildRtfBody(data) {
  return `{\\rtf1\\ansi
\\b Name:\\b0  ${data.name}\\line
\\b Email:\\b0  ${data.email}\\line
\\b Company:\\b0  ${data.company}\\line
\\b Phone:\\b0  ${data.phone ?? ""}\\line
\\b Title:\\b0  ${data.title ?? ""}\\line
\\b Website:\\b0  ${data.website ?? ""}\\line\\line
\\b Software Platforms:\\b0  ${(data.software ?? []).join(", ")}\\line
\\b Goals:\\b0  ${(data.goals ?? []).join(", ")}\\line\\line
\\b Message:\\b0\\line ${data.message}\\line\\line
\\b IP Address:\\b0  ${data.ipAddress ?? ""}\\line
\\b User Agent:\\b0  ${data.userAgent ?? ""}}`;
}

export async function sendContactEmail(data) {
  const accessToken = await getAccessToken();
  const graphEndpoint = `https://graph.microsoft.com/v1.0/users/${senderAddress}/sendMail`;
  const toRecipients = [{ emailAddress: { address: senderAddress } }];
  const ccRecipients =
    data.sendCC && data.email
      ? [{ emailAddress: { address: data.email } }]
      : undefined;
  const replyTo =
    data.email && data.email !== senderAddress
      ? [{ emailAddress: { address: data.email } }]
      : undefined;

  const mailPayload = {
    message: {
      subject: `[UnwhelmNet Lead] New Contact Submission from ${data.name}`,
      body: {
        contentType: "HTML",
        content: buildHtmlBody(data),
      },
      from: {
        emailAddress: {
          name: "No-Reply",
          address: senderAddress,
        },
      },
      toRecipients,
      ccRecipients,
      replyTo,
      categories: ["Unwhelm Contact"],
      internetMessageHeaders: [{ name: "X-Unwhelm-Tag", value: "contact-form" }],
      attachments: [
        {
          "@odata.type": "#microsoft.graph.fileAttachment",
          name: "contact_submission.rtf",
          contentType: "application/rtf",
          contentBytes: Buffer.from(buildRtfBody(data), "utf-8").toString("base64"),
        },
      ],
    },
    saveToSentItems: true,
  };

  const response = await fetch(graphEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mailPayload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Graph sendMail failed (${response.status}): ${text}`);
  }
}

function readJson(request) {
  return new Promise((resolveBody, reject) => {
    const chunks = [];
    request.on("data", (chunk) => chunks.push(chunk));
    request.on("end", () => {
      try {
        const raw = Buffer.concat(chunks).toString("utf8");
        resolveBody(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
    });
    request.on("error", reject);
  });
}

function clientIp(request) {
  const forwarded = request.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return request.socket?.remoteAddress ?? "unknown";
}

export async function handleContactSubmit(request, response) {
  try {
    const data = await readJson(request);
    const submission = {
      name: (data.name ?? "").toString().trim(),
      email: (data.email ?? "").toString().trim(),
      phone: (data.phone ?? "").toString().trim() || null,
      company: (data.company ?? "").toString().trim(),
      title: (data.title ?? "").toString().trim() || null,
      website: (data.website ?? "").toString().trim() || null,
      message: (data.message ?? "").toString().trim(),
      software: Array.isArray(data.software) ? data.software : [],
      goals: Array.isArray(data.goals) ? data.goals : [],
      cloudProviders: Array.isArray(data.cloudProviders) ? data.cloudProviders : [],
      onPremise: (data.onPremise ?? "").toString(),
      ipAddress: clientIp(request),
      userAgent: request.headers["user-agent"] ?? "unknown",
      sendCC: Boolean(data.sendCC),
    };

    if (!submission.name || !submission.email || !submission.company || !submission.message) {
      response.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
      response.end(JSON.stringify({ success: false, error: "Missing required contact fields." }));
      return;
    }

    await sendContactEmail(submission);
    response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ success: true, message: "Form submission saved and email sent successfully." }));
  } catch (error) {
    console.error("[Contact] Submission failed:", error);
    response.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : "Contact submission failed.",
    }));
  }
}

export function contactApiMiddleware(request, response, next) {
  const path = request.url?.split("?")[0];
  if (request.method === "POST" && path === "/api/contact/submit") {
    void handleContactSubmit(request, response);
    return;
  }
  next();
}
