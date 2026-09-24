# 🧩 AppFolio Platform Integration Guide  
**File:** `Appfolio_Platform_Integration_Guide.md`  
**Updated:** Jan 14 2024  

---

## 🧠 1. Overview  

AppFolio serves as the central Property Management System (PMS) for many real-estate firms.  
However, specialized SaaS platforms—such as **Findigs**, **Rently**, **TenantTurner**, and **PropertyMeld**—often provide richer workflows for applications, showings, or maintenance.  

This guide outlines how to integrate those platforms into AppFolio using two models:

- **Stack Partner Mode** → Official AppFolio Stack Marketplace integrations  
- **Non-Stack Partner Mode** → Custom integration where you build both sides (AppFolio + Vendor API)

It also details how to **turn off AppFolio’s overlapping modules** so each third-party platform fully replaces its domain-specific functionality.

---

## 🔄 2. Integration Models  

| Integration Type | Description | Typical Vendors | Data Direction | Maintenance Level |
|------------------|-------------|-----------------|----------------|-------------------|
| **Stack Partner** | Certified partner listed in the AppFolio Stack Marketplace. AppFolio provisions API credentials, endpoints, and data schedule. | Rently • TenantTurner • PropertyMeld | Bi-Directional | Low |
| **Non-Stack Partner** | Manual integration using AppFolio + third-party APIs. Developer manages auth, mapping, and scheduling. | Findigs (Applications / Screening) | Bi-Directional or Uni-Directional | High |

---

## 🧱 3. Data Mapping & Object Alignment  

Every integration requires mapping AppFolio entities to external schemas.

| AppFolio Entity | External System Entity | Direction | Notes |
|-----------------|------------------------|------------|--------|
| `Property` | `property` / `building` | Two-Way | Address, IDs, property groups |
| `Unit` | `unit` / `listing` | Two-Way | Rent, bedrooms, availability |
| `Tenant / Applicant` | `applicant` | Two-Way (Findigs) | Shared screening data |
| `Application` | `application` | Findigs → AppFolio | AppFolio native applications disabled |
| `WorkOrder` | `ticket` | PropertyMeld ↔ AppFolio | Stack integration |
| `Showing / Lead` | `showing` / `lead` | Rently / TenantTurner ↔ AppFolio | Stack integration |
| `ScreeningDecision` | `decision` | Findigs → AppFolio | Custom API callback |
| `Owner / Vendor` | same | Read-only | Financials remain in AppFolio |

An **IntegrationMap** table (internal) stores ID correlations:

| appfolio_id | external_id | entity_type | last_synced | direction |
|--------------|-------------|--------------|--------------|-----------|
| 100023 | BLD-204 | property | 2025-11-05 | AppFolio → Findigs |
| 200045 | APP-982 | application | 2025-11-05 | Findigs → AppFolio |

---

## 🧰 4. Turning Off Built-In Modules  

To prevent workflow overlap, disable AppFolio’s built-in modules replaced by external systems.

### 4.1 Findigs — Applications & Screening  

**Goal:** Use Findigs exclusively for renter applications and screening.  

---

1. **Disable AppFolio Online Applications**  

   Admin → Settings → Online Applications → Uncheck **“Accept Online Applications.”**  

   Remove “Apply Now” buttons from public listings.

2. **Redirect Listings to Findigs**  

   Replace AppFolio’s “Apply” URLs with hosted Findigs links:  

   ```
   https://apply.findigs.com/apply/{YOUR ORG}/{unit-id}
   ```

3. **Create API Bridge**  

   Findigs POSTs decisions back to AppFolio via your integration endpoint:  

   ```json
   {
     "unit_code": "A1-203",
     "applicant_name": "John Doe",
     "decision": "Approved",
     "decision_date": "2025-11-05"
   }
   ```

4. **Deploy Middleware Service**  

   - Poll AppFolio `/units` and `/properties` for updates  
   - Push listings to Findigs  
   - Receive screening decisions → update AppFolio  

5. **Train Leasing Staff**  

   Applications and decisions now live in **Findigs**; AppFolio remains the data archive.

---

### 4.2 Rently & TenantTurner — Scheduling / Marketing  

**Goal:** Keep AppFolio as the property database while delegating showings and leads.  

| Step | Action |
|------|---------|
| 1 | Ensure all rentable units are *Available* in AppFolio. |
| 2 | Enable Stack integration → `Integrations > AppFolio Stack > Enable Rently / TenantTurner`. |
| 3 | Disable AppFolio’s *Online Showing Scheduler* and *Lead Tracking* modules. |
| 4 | Allow AppFolio → Partner listing sync; partner → AppFolio showing events. |
| 5 | Keep marketing URLs consistent; public site handled by partner, pricing and availability by AppFolio. |

**Example Flow**  

```
AppFolio → Rently → Applicant Schedules Tour → Rently POST Event → AppFolio Timeline Updated
```

---

### 4.3 PropertyMeld — Maintenance  

Enable through Stack Marketplace, then disable AppFolio “Tenant Portal Work Order Requests.”  
AppFolio auto-syncs open/closed ticket statuses.

---

## 🚀 5. Client Implementation Walkthrough  

| Step | Description | Responsible Role | Output |
|------|--------------|-----------------|---------|
| 1 | Identify AppFolio modules to disable (Applications, Showings, Maintenance). | IT / PM | Integration Scope Matrix |
| 2 | Enable Stack integrations (Rently, TenantTurner, PropertyMeld). | AppFolio Admin | API Keys Exchanged |
| 3 | Create Findigs Org Account, obtain API credentials, configure screening rules. | Leasing Team | Client ID + Secret |
| 4 | Deploy middleware service bridging AppFolio ↔ Findigs. | DevOps | Running Integration |
| 5 | Disable overlaps in AppFolio. | Admin | Single Source of Truth |
| 6 | Redirect marketing flows to Findigs “Apply” URLs. | Marketing | Unified Lead Funnel |
| 7 | Validate ID mappings (Property → Unit → Listing → Application). | QA | Verified Mappings |
| 8 | Go-Live + Monitor API Health / Logs. | All Teams | Stable Integration |

---

## 🧭 6. Best Practices & Governance  

- Maintain an `IntegrationMap` database for cross-IDs.  
- Use bulk endpoints and delta timestamps instead of full pulls.  
- Log request/response bodies with correlation IDs.  
- Rotate API tokens every 90 days.  
- Keep sandbox environments for each vendor.  
- Audit data ownership (define “system of record”).  
- Provide staff playbooks per workflow:  
  - Applications → Findigs  
  - Showings → Rently / TenantTurner  
  - Maintenance → PropertyMeld  

---

## 🧾 7. Summary  

| Category | Stack Partner | Non-Stack Partner |
|-----------|---------------|------------------|
| **Integration Effort** | Low | High |
| **Provisioning** | AppFolio-Managed | Manual |
| **Support** | Joint (AppFolio + Vendor) | Internal |
| **Control / Customization** | Moderate | Full |
| **Example Vendors** | Rently, TenantTurner, PropertyMeld | Findigs |

**Resulting Architecture:**  

```
             ┌──────────────────────────┐
             │      AppFolio Core DB     │
             │  (Financials, Tenants,    │
             │   Properties, Leases)     │
             └────────────┬──────────────┘
                          │
          ┌───────────────┼────────────────┐
          │                │                │
   Stack APIs        Stack APIs        Custom API
   (Rently,          (PropertyMeld)    Bridge (Findigs)
   TenantTurner)                         ↑    ↓
          │                              │    │
          └───────────────→──────────────┘    │
                          Data Loop            │
                          (Leads, Apps,        │
                           Screening)──────────┘
```

By separating responsibilities this way, `{YOUR ORG}` gains best-in-class functionality in each vertical  
while AppFolio continues to serve as the unified financial and operational backbone.

---

**End of File — `Appfolio_Platform_Integration_Guide.md`**
