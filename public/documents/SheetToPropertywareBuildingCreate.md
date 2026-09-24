# 🏢 Sheet to Propertyware Building Create

> **Sheet to Propertyware Building Create** is a Windows Forms automation utility written in **VB.NET**, designed to interface with the **Propertyware REST API** for **building creation, lease management, and data synchronization**.  
> It integrates with SQL Server and multiple data sources (**Excel, CSV, Google Sheets**) to streamline property data operations across systems.

---

## 🌐 Overview

This tool automates Propertyware operations such as:

- 🔍 **Retrieving** prospect, lease, unit, and document data from Propertyware API  
- 🧱 **Creating new buildings** in Propertyware using structured data  
- 🧾 **Reading data from Excel, CSV, or Google Sheets** to populate Propertyware entities  
- 💾 **Integrating with SQL Server** for structured storage and validation  
- 📄 **Downloading and parsing documents** associated with units or leases  
- 🧠 **Mapping custom fields** dynamically using JSON definitions

---

## ⚙️ Key Features

| Category | Description |
|-----------|--------------|
| **API Integration** | Uses `HttpClient` to call multiple Propertyware REST endpoints for prospects, leases, buildings, and GL accounts. |
| **Multi-Source Data Import** | Supports importing structured data from Excel spreadsheets, CSV files, and Google Sheets. Uses `ExcelDataReader.dll` for Excel files. |
| **JSON Serialization** | Employs `Newtonsoft.Json` for serializing and deserializing Propertyware entities. |
| **SQL Connectivity** | Reads and writes to Microsoft SQL Server using `System.Data.SqlClient`. |
| **Logging & Error Handling** | Gracefully handles failed requests and provides diagnostic information. |
| **Windows UI** | Implements WinForms UI (`Form1.vb`, `Form2.vb`) for configuration and manual triggers. |

---

## 🌐 Propertyware API Endpoints

The following REST endpoints are directly used throughout the VB modules for automation and data exchange.

---

### 🧱 Buildings

| Operation | HTTP Method | Endpoint | Purpose |
|------------|--------------|-----------|----------|
| Create Building | `POST` | `/pw/api/rest/v1/buildings` | Creates a new building from Excel or manual data. |
| Get Building Details | `GET` | `/pw/api/rest/v1/buildings/{id}` | Retrieves full building details. |
| List Buildings | `GET` | `/pw/api/rest/v1/buildings` | Retrieves all buildings (filtered or paginated). |

**Used in:** `CreateA1Building`, `CreateA1BuildingExcel`, `FetchBuildingData`

---

### 🧾 Leases

| Operation | HTTP Method | Endpoint | Purpose |
|------------|--------------|-----------|----------|
| Get Lease | `GET` | `/pw/api/rest/v1/leases/{id}` | Fetches full lease record for validation. |
| List Leases | `GET` | `/pw/api/rest/v1/leases` | Retrieves leases for a portfolio or property. |
| Copy Lease | `POST` | `/pw/api/rest/v1/leases/{id}/copy` | Duplicates a lease onto another unit. |

**Used in:** `FetchLeaseData`, `CopyLeaseRequest`

---

### 🧍 Prospects

| Operation | HTTP Method | Endpoint | Purpose |
|------------|--------------|-----------|----------|
| Get Prospect | `GET` | `/pw/api/rest/v1/prospects/{id}` | Retrieves a single prospect record. |
| List Prospects | `GET` | `/pw/api/rest/v1/prospects` | Gets all prospects by filter or page. |

**Used in:** `FetchProspectData`, `FetchProspectsList`

---

### 🏢 Units

| Operation | HTTP Method | Endpoint | Purpose |
|------------|--------------|-----------|----------|
| Get Unit | `GET` | `/pw/api/rest/v1/units/{id}` | Retrieves unit data (address, size, rent). |
| List Units | `GET` | `/pw/api/rest/v1/units` | Lists units within a portfolio. |

**Used in:** `FetchUnitData`

---

### 📂 Documents

| Operation | HTTP Method | Endpoint | Purpose |
|------------|--------------|-----------|----------|
| Get Document Metadata | `GET` | `/pw/api/rest/v1/documents?entityType={type}&entityId={id}` | Lists documents for a given entity. |
| Download Document | `GET` | `/pw/api/rest/v1/documents/{id}/download` | Streams file binary for download. |

**Used in:** `FetchDocumentsData`, `DownloadDocument`

---

### 💰 General Ledger Accounts

| Operation | HTTP Method | Endpoint | Purpose |
|------------|--------------|-----------|----------|
| Get GL Accounts | `GET` | `/pw/api/rest/v1/glAccounts` | Retrieves the general ledger account list for mapping. |

**Used in:** `FetchGLAccountsData`

---

### 🧺 Portfolios

| Operation | HTTP Method | Endpoint | Purpose |
|------------|--------------|-----------|----------|
| Get Portfolios | `GET` | `/pw/api/rest/v1/portfolios` | Lists available portfolios for the organization. |

**Used in:** `RetrievePortfolios`

---

### 🔧 Work Orders

| Operation | HTTP Method | Endpoint | Purpose |
|------------|--------------|-----------|----------|
| List Work Orders | `GET` | `/pw/api/rest/v1/workOrders?status=OPEN` | Fetches open work orders for review or import. |

**Used in:** `RetrieveAllWorkOrders`

---

## 🧩 Related Routines

| Function | Purpose | Key Libraries |
|-----------|----------|---------------|
| Fetch Prospect Data | Retrieves a single prospect record for validation | `HttpClient`, `Newtonsoft.Json` |
| Fetch Unit Data | Gets property/unit details | `HttpClient` |
| Fetch Documents | Retrieves document metadata for entities | `HttpClient`, `Newtonsoft.Json` |
| Download Document | Saves remote documents locally | `HttpClient`, `System.IO` |
| Create Building | Posts a new building to Propertyware | `HttpClient`, `Newtonsoft.Json` |
| Create Buildings from Excel | Reads Excel and creates multiple buildings | `ExcelDataReader`, `System.Data.SqlClient` |
| Retrieve Work Orders | Downloads open work orders | `HttpClient` |
| Retrieve GL Accounts | Fetches general ledger accounts | `HttpClient` |
| Retrieve Portfolios | Lists available portfolios | `HttpClient` |
| Copy Lease Request | Clones an existing lease | `HttpClient`, `Newtonsoft.Json` |

---

## 🧰 Helper Routines and Utilities

| Routine | Description |
|----------|-------------|
| **Read Excel Rows** | Parses building data from `.xlsx` files using `ExcelDataReader`. |
| **Serialize / Deserialize JSON** | Converts VB.NET objects to and from JSON for API use. |
| **Abbreviate Address** | Standardizes address fields for Propertyware format. |
| **Log API Activity** | Writes requests and responses to local log files or SQL. |
| **SQL Execute** | Inserts or queries database for progress tracking. |

---

## 🖥️ Example API Call (VB.NET)

    ' Create Building Example
    Dim client As New HttpClient()
    client.DefaultRequestHeaders.Add("x-propertyware-client-id", clientId)
    client.DefaultRequestHeaders.Add("x-propertyware-client-secret", clientSecret)
    client.DefaultRequestHeaders.Add("x-propertyware-system-id", systemId)

    Dim body As String = JsonConvert.SerializeObject(newBuildingObject)
    Dim content As New StringContent(body, Encoding.UTF8, "application/json")
    Dim response = Await client.PostAsync("https://api.propertyware.com/pw/api/rest/v1/buildings", content)

    If response.IsSuccessStatusCode Then
        Console.WriteLine("✅ Building created successfully.")
    Else
        Console.WriteLine("❌ Failed: " & response.StatusCode.ToString())
    End If

---

## 🧾 Summary

A1PWBuildingCreate automates the tedious data entry between **Excel**, **SQL**, and **Propertyware REST APIs**.  
It enables full-cycle operations — from importing buildings and leases to verifying documents and syncing work orders — all within a clean Windows Forms interface.

---

**Author:** Edmund Landgraf  
**Organization:** Northpoint Asset Management  
**Updated:** October 2025
