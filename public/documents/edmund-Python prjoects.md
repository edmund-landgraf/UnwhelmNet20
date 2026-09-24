# 🧩 Selected Python Projects (Northpoint)

**Total Scripts:** 397  
**Total Lines:** ~45,829  
**Distinct Libraries:** 105  
**Core Stack:** `pyodbc`, `pandas`, `requests`, `googleapiclient`, `openpyxl`, `json`, `re`  
**Overall Theme:** Enterprise-grade automation across SQL Server, APIs, and document workflows for property management, analytics, and integrations.

---

## 🧾 1. Audit Log Automation
**Libraries:** `pyodbc`, `json`, `re`, `datetime`, `logging`  
**Representative Scripts:** *auditLogBulkLoadfromJSON.py*, *auditLogInsertMissingRowsImproved.py*, *AuditLogImportAllJson.py*  
**Highlights:**
- Automated extraction and consolidation of AppFolio audit logs  
- Incremental updates and missing-row recovery  
- JSON normalization for SQL ingestion  

---

## 💸 2. Auto Rent Charges
**Libraries:** `pyodbc`, `datetime`, `pandas`  
**Representative Script:** *autoRentCharges.py*  
- Automatic rent charge generation  
- Ledger validation and reconciliation  
- Monthly billing automation  

---

## 📦 3. Box API Integrations
**Libraries:** `requests`, `boxsdk`, `json`  
**Representative Scripts:** *boxUploadFile.py*, *boxFolderSync.py*  
- File sync automation with Box.com  
- Versioning and folder synchronization  
- Integration bridge between exports and Box  

---

## 🧠 4. BITS Download & Data Sync
**Tools:** `BITS (bitsadmin)`, Windows Task Scheduler, Python (`subprocess`, `glob`, `shutil`)  
**Representative Scripts:** *pwBitsDownload.py*  
- Automated nightly download of 20+ Propertyware JSON endpoints  
- Uses Microsoft **BITS** for resilient background transfers  
- Cleans old files and replaces them with fresh daily snapshots  
- Moves downloaded JSON files into shared Google Drive workspaces  
- Fully automated via **Windows Task Scheduler**  

**Example Process:**  
1. Loop through Propertyware and TenantTurner JSON URLs  
2. Use `bitsadmin /transfer` to fetch each dataset  
3. Delete stale files before download  
4. Copy results into a raw-data folder for ETL ingestion  

---

## 💼 5. Commissions Calculation
**Libraries:** `pandas`, `openpyxl`, `datetime`  
**Representative Scripts:** *calculateCommissions.py*, *agentCommissionsReport.py*  
- Monthly and transaction-based commission reports  
- Automated Excel reconciliation  


---

## 🧩 6. Custom Fields Automation
**Libraries:** `requests`, `json`, `pyodbc`  
**Representative Scripts:** *updateCustomFields.py*, *AppFolio_CustomFields.py*  
- Batch-updated AppFolio custom fields  
- Schema enforcement and consistency checks  

---

## ✉️ 7. Draft Gmail Automation
**Libraries:** `googleapiclient.discovery`, `google_auth_oauthlib.flow`, `email.mime`  
**Representative Scripts:** *draftGmailMessages.py*, *gmailAutoReply.py*  
- Automated Gmail drafts and templates  
- OAuth2 authentication mastery  

---

## 📊 8. Excel Reporting & Formatting
**Libraries:** `openpyxl`, `pandas`, `os`, `shutil`  
**Representative Scripts:** *RentFinder_MakeExcelwImage_New3_AF.py*, *ExcelFormatter.py*  
- CMA and financial Excel report generation  
- Embedded property images and custom formatting  

---

## 📁 9. Extract CSVs and Flat Files
**Libraries:** `csv`, `os`, `pandas`  
**Representative Scripts:** *extractCSVs.py*, *csvNormalizer.py*  
- Automated CSV discovery and cleanup  
- Schema inference and normalization  

---

## 📧 10. Extract Gmail Subjects
**Libraries:** `googleapiclient.discovery`, `base64`, `email`  
**Representative Script:** *extractGmailSubjects.py*  
- Indexed inbound Gmail subjects and metadata  
- Built searchable datasets from inboxes  

---

## 🗺️ 11. InsideMaps Extraction
**Libraries:** `requests`, `json`, `re`  
**Representative Scripts:** *insideMapsExtract.py*, *insideMapsDownloader.py*  
- 3D tour metadata retrieval from InsideMaps  
- Auto-linking media to property records  

---

## 🔍 12. Findigs API Integration
**Libraries:** `requests`, `json`, `pandas`  
**Representative Scripts:** *findigsImport.py*, *findigsStatus.py*  
- Tenant verification imports via Findigs API  
- JSON normalization to SQL  

---

## 📄 13. PDF Flattening and Conversion
**Libraries:** `PyPDF2`, `fitz`, `pikepdf`  
**Representative Scripts:** *pdfFlatten.py*, *pdfToImage.py*  
- Flattened PDFs for compatibility  
- Batch merging and conversion pipelines  

---

## ☁️ 14. Google Drive Mastery
**Libraries:** `googleapiclient.discovery`, `os`, `shutil`  
**Representative Scripts:** *googleDriveUpload.py*, *DriveFolderSync.py*  
- Full CRUD file/folder automation  
- OAuth2 + service account credential handling  

---

## 📋 15. SurveyMonkey Integration
**Libraries:** `requests`, `json`, `csv`  
**Representative Scripts:** *surveyMonkeyExtract.py*, *surveyMonkeyToSQL.py*  
- Automated response extraction  
- SQL-normalized storage of survey data  

---

## 🧾 16. Google Sheets Automation
**Libraries:** `gspread`, `googleapiclient`, `pandas`  
**Representative Scripts:** *updateGSheetFromSQL.py*, *appendToGoogleSheet.py*  
- SQL ↔ GSheet synchronization  
- Multi-tab regional dashboards  

---

## ✅ 17. Google Tasks Integration
**Libraries:** `googleapiclient.discovery`  
**Representative Scripts:** *gtasksSync.py*, *gtasksSummary.py*  
- Automated Google Task creation  
- Linked reporting and tracking  

---

## 🧱 18. JSON Flatteners & Normalizers
**Libraries:** `json`, `pandas`, `re`  
**Representative Scripts:** *jsonFlattener.py*, *nestedJSONToSQL.py*  
- Flattened nested JSON structures  
- Supported Findigs, Rently, and AppFolio schemas  

---

## 🏠 19. Lease Renewal Automation
**Libraries:** `pyodbc`, `datetime`, `requests`  
**Representative Scripts:** *leaseRenewalCheck.py*, *autoRenewalEmail.py*  
- Detected lease expirations  
- Triggered renewal workflows and email alerts  

---

## 📬 20. MailForm.io Workflows
**Libraries:** `requests`, `json`  
**Representative Scripts:** *mailformBatchSend.py*, *mailformCSVParser.py*  
- Automated notice creation and tracking  
- Tenant and property data integration  

---

## 🧭 21. Tenant Turner Integration
**Libraries:** `requests`, `json`, `pyodbc`  
**Representative Scripts:** *tenantTurnerImport.py*, *tenantTurnerSync.py*  
- Showings and applicant data imports  
- Cross-referenced SQL records  

---

## 🔗 22. GSheet Lookup Tools
**Libraries:** `gspread`, `pandas`  
**Representative Script:** *lookupToGSheet.py*  
- Property lookups across systems  
- Dynamic validation sheets  

---

## 📂 23. PDF Utilities
**Libraries:** `PyPDF2`, `pikepdf`, `fitz`  
**Representative Scripts:** *pdfMerge.py*, *pdfRename.py*  
- PDF merging, renaming, and validation  
- Automated archival workflows  

---

## 🧩 24. Property Meld API
**Libraries:** `requests`, `json`, `pyodbc`  
**Representative Scripts:** *propertyMeldPull.py*, *meldWorkOrdersToSQL.py*  
- Work order ingestion from Property Meld  
- Unified maintenance tracking dashboard  

---

## 🏢 25. PropertyWare Document Puller
**Libraries:** `requests`, `os`, `pyodbc`  
**Representative Scripts:** *propertyWareDocs.py*, *propertyWarePDFDownload.py*  
- Lease and statement PDF extraction  
- File-to-property ID mapping  

---

## 📊 26. RentFinder & CMA System
**Libraries:** `pandas`, `pyodbc`, `openpyxl`, `requests`  
**Representative Scripts:** *RentFinder_MakeExcelwImage_New3_AF.py*, *RentFinder_GetEstimate_Appfolio.py*  
- CMA report generation linking AppFolio + Rentometer  
- Excel outputs with photos and analytics  

---

## 💰 27. Rentometer Integration
**Libraries:** `requests`, `json`, `pandas`  
**Representative Scripts:** *rentometerCompare.py*, *rentometerAPI.py*  
- Market rent data ingestion  
- Comparative pricing analysis  

---

## 💬 28. Google Chatbot Development
**Libraries:** `Flask`, `googleapiclient`, `requests`  
**Representative Scripts:** *googleChatBot.py*, *botMessageHandler.py*  
- Chatbot for internal property queries  
- SQL + Drive + Sheets integration  

---

## ❄️ 29. Snowflake Data Integration
**Libraries:** `snowflake.connector`, `pandas`  
**Representative Scripts:** *snowflakeSync.py*, *snowflakeLoadAF.py*  
- Data warehousing for BI and analytics  
- Cloud-to-local synchronization  

---

## 📘 30. Ledger and General Accounting
**Libraries:** `pandas`, `pyodbc`, `datetime`  
**Representative Scripts:** *ledgerReconcile.py*, *ledgerSummaryToExcel.py*  
- Ledger reconciliation and exception reporting  
- Excel summary generation  

---

## 🏠 31. Master Leases & Portfolio Management
**Libraries:** `pyodbc`, `pandas`, `json`  
**Representative Scripts:** *masterLeasesLoad.py*, *portfolioMerge.py*  
- Hierarchical lease rollups  
- Cross-portfolio normalization  

---

## 🔍 32. zInspector Integration
**Libraries:** `requests`, `json`, `os`, `shutil`  
**Representative Scripts:** *zInspectorImport.py*, *zInspectorImagePull.py*  
- Inspection image ingestion and tagging  
- Automated syncing with property modules  

---

# 🧠 Technical Mastery Summary

| Domain | Core Tools | Skills Demonstrated |
|--------|-------------|--------------------|
| **ETL & SQL Integration** | `pyodbc`, `pandas` | Schema management, normalization, delta updates |
| **APIs & Cloud Platforms** | Google API, Box, Findigs, Tenant Turner, Property Meld | OAuth2, REST API, JSON parsing |
| **Excel & Reporting** | `openpyxl`, `pandas` | Dynamic report generation, embedded media |
| **Automation & Sync** | `os`, `shutil`, `tempfile` | File management, archival, scheduling |
| **Data Validation & Quality** | `re`, `logging`, `json` | Error handling, schema enforcement |
| **AI / Chatbot Foundations** | `Flask`, Google Chat API | Conversational interfaces for automation |
