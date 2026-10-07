# Google Sheets Enquiry Backup Setup Guide

This guide describes how to configure an optional Google Sheet to receive automated backup copies of customer enquiries submitted through the website.

---

## 1. How It Works & Important Caveats

### Primary Delivery Path vs. Convenience Copy
- **Email Is the Authoritative Source of Truth**: When a user submits an enquiry on the website, it is sent directly to the hosted form provider (`NEXT_PUBLIC_FORM_ENDPOINT`). The form provider sends an email notification to the company inbox configured in the provider's dashboard. That email remains the primary, authoritative delivery path.
- **Convenience Backup Only**: The Google Sheet receives an asynchronous, non-blocking parallel copy of the submission payload. Because the browser sends this copy via a background `no-cors` request without waiting for a server confirmation, an occasional missing row is possible if a mobile network drops abruptly.
- **Reconciliation via `submission_id`**: Every submission generates a unique `submission_id` in the user's browser. Both the hosted form provider email and the Google Sheet record this exact same `submission_id`, allowing you to quickly spot duplicates or reconcile sheet rows against inbox emails.
- **Security & Privacy Considerations**:
  - The Google Apps Script Web App URL is public to allow the browser to post submissions without exposing API secret keys. The script accepts `POST` requests only and contains **no `doGet` method**, ensuring that stored spreadsheet data can never be read, viewed, or queried through the web app URL.
  - Personal identifiable information (subscriber name, phone number, and enquiry notes) will be stored in your company's Google account. Limit Google Sheet sharing permissions exclusively to authorized office staff.
  - If enabled, the website's Privacy Policy and Terms and Conditions should mention that customer enquiry records are archived in secure spreadsheet storage.

---

## 2. Google Apps Script Code

Copy and paste the entire script below into your Google Sheet's Apps Script editor.

```javascript
/**
 * Shri Vijaya Ganapathi Chit Fund Pvt Ltd
 * Automated Enquiry Backup Webhook
 *
 * Appends customer lead submissions to an 'Enquiries' worksheet.
 * Note: Only doPost is implemented. No data can be read or queried via GET.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Acquire lock for up to 30 seconds to prevent concurrent write collisions
    lock.waitLock(30000);

    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput("Empty payload").setMimeType(ContentService.MimeType.TEXT);
    }

    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return ContentService.createTextOutput("Invalid JSON").setMimeType(ContentService.MimeType.TEXT);
    }

    // Ignore automated bots or incomplete requests missing both name and phone
    var name = (data.name || "").toString().trim();
    var phone = (data.phone || "").toString().trim();
    if (!name && !phone) {
      return ContentService.createTextOutput("Ignored: Missing name and phone").setMimeType(ContentService.MimeType.TEXT);
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Enquiries");

    var headers = [
      "received_at",
      "submission_id",
      "name",
      "phone",
      "interested_in",
      "message",
      "consent",
      "form_location",
      "page_path",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "gclid",
      "fbclid"
    ];

    // Create the Enquiries sheet and format header row if it does not exist
    if (!sheet) {
      sheet = ss.insertSheet("Enquiries");
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#F3F4F6");
      sheet.setFrozenRows(1);
    }

    // Neutralizes formula injection (=, +, -, @) and truncates long inputs
    function sanitize(val) {
      if (val === null || val === undefined) return "";
      var str = val.toString().trim();
      if (str.length > 1000) {
        str = str.substring(0, 1000);
      }
      // Prefix with apostrophe to keep phone numbers starting with + as plain text
      // and prevent formula execution when exported to Excel / CSV
      if (/^[=+\-@]/.test(str)) {
        str = "'" + str;
      }
      return str;
    }

    // Timestamp in Indian Standard Time (IST)
    var now = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");

    var row = [
      now,
      sanitize(data.submission_id),
      sanitize(name),
      sanitize(phone),
      sanitize(data.interested_in),
      sanitize(data.message),
      sanitize(data.consent),
      sanitize(data.form_location),
      sanitize(data.page_path),
      sanitize(data.utm_source),
      sanitize(data.utm_medium),
      sanitize(data.utm_campaign),
      sanitize(data.utm_term),
      sanitize(data.utm_content),
      sanitize(data.gclid),
      sanitize(data.fbclid)
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService.createTextOutput("Error: " + err.toString()).setMimeType(ContentService.MimeType.TEXT);
  } finally {
    lock.releaseLock();
  }
}
```

---

## 3. Step-by-Step Setup Guide (Non-Developer)

### Step 1: Create the Google Sheet
1. Log in to your company's official Google Account (e.g. Gmail or Google Workspace).
2. Go to [Google Sheets](https://sheets.google.com) and create a **Blank spreadsheet**.
3. Name the spreadsheet: **SVG Chit Fund — Website Enquiries**.

### Step 2: Open the Apps Script Editor
1. In the top menu of your Google Sheet, click **Extensions** > **Apps Script**.
2. Rename the project from "Untitled project" to **SVG Enquiry Webhook**.
3. Clear any default code in the `Code.gs` editor, and paste the complete script provided in **Section 2** above.

### Step 3: Configure Project Time Zone
1. On the left sidebar of the Apps Script editor, click the **Project Settings** icon (gear icon).
2. Check the box **"Show 'appsscript.json' manifest file in editor"** (or verify the Time zone setting is set to **(GMT+05:30) India Standard Time (Kolkata)**).
3. Click the **Editor** icon (`< >` icon) to return to code view, and click **Save** (disk icon).

### Step 4: Deploy as a Web App
1. At the top right of the Apps Script window, click the blue **Deploy** button > **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in the deployment details:
   - **Description**: `SVG Website Enquiry Collector v1`
   - **Execute as**: `Me (<your company email>)`
   - **Who has access**: `Anyone` *(Crucial: allows the browser to send anonymous enquiries)*
4. Click **Deploy**.
5. When prompted for authorization, click **Authorize access**, select your company Google account, click **Advanced**, and then click **Go to SVG Enquiry Webhook (unsafe)**, and click **Allow**.
6. Google will display a **Web app URL** formatted like:
   `https://script.google.com/macros/s/AKfycb.../exec`
7. Click **Copy** to copy this URL.

### Step 5: Add the URL to Vercel & Redeploy
1. Log in to your **Vercel Dashboard** and navigate to your `svg_chits` project.
2. Go to **Settings** > **Environment Variables**.
3. Add a new variable:
   - **Key**: `NEXT_PUBLIC_SHEET_ENDPOINT`
   - **Value**: *(Paste your copied Web app URL from Step 4)*
   - **Environments**: Select **Production** and **Preview**.
4. Click **Save**.
5. **Redeploy the application**: Because variables prefixed with `NEXT_PUBLIC_` are baked into the static site at build time, you must trigger a new deployment for the change to take effect:
   - Go to **Deployments** in Vercel, click the three dots on the latest production deployment, and select **Redeploy**.

### Step 6: Verify Delivery
1. Open the live website in your browser.
2. Submit a test enquiry with your name, a test phone number, and a note indicating "Test".
3. Verify that:
   - The email notification arrives at your company inbox from your hosted form provider.
   - A new row appears in your Google Sheet under the **Enquiries** tab within 2–5 seconds with the exact timestamp, name, phone, and matching `submission_id`.

### Step 7: How to Download All Enquiries as CSV or Excel
1. Open the Google Sheet in your browser.
2. In the top menu, click **File** > **Download**.
3. Choose either **Comma-separated values (.csv)** or **Microsoft Excel (.xlsx)**.
4. The downloaded file preserves phone numbers and formula protection cleanly.

### What to Do If You Edit the Script Later
If you ever edit the Apps Script code:
1. Click **Deploy** > **Manage deployments**.
2. Click the **Edit** icon (pencil).
3. Under **Version**, select **New version**.
4. Click **Deploy**. *(This updates the existing URL without needing to change Vercel environment variables).*

---

## 4. How to Turn It Off

If you ever wish to disable Google Sheet copies and rely exclusively on email notifications:
1. Go to your **Vercel Dashboard** > **Settings** > **Environment Variables**.
2. Delete `NEXT_PUBLIC_SHEET_ENDPOINT` (or clear its value).
3. Redeploy the website.
4. Once redeployed, the website will cease sending any requests to the Google Apps Script Web App.
