# Google Sheets Setup: Separate Tabs for Telecallers & Agents

This setup automatically routes each type of submission into its own dedicated sheet tab in your Google Sheet:

1. **`Enquiries`** → Customer chit fund leads
2. **`Telecallers`** → Telecaller job applications
3. **`Business Agents`** → Chit Fund Business Agent applications
4. **`Recovery Agents`** → Chit Fund Recovery Agent applications

---

## Google Apps Script Code (`Code.gs`)

Paste this entire script into your Google Sheet's Apps Script editor (**Extensions > Apps Script**):

```javascript
/**
 * Shri Vijaya Ganapathi Chit Fund Pvt Ltd
 * Multi-Tab Webhook
 *
 * Automatically separates submissions into dedicated tabs:
 * - 'Enquiries' (Customer leads)
 * - 'Telecallers' (Telecaller applications)
 * - 'Business Agents' (Business agent applications)
 * - 'Recovery Agents' (Recovery agent applications)
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);

    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(
        JSON.stringify({ result: "error", error: "Empty payload" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return ContentService.createTextOutput(
        JSON.stringify({ result: "error", error: "Invalid JSON format" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    var name = (data.name || "").toString().trim();
    var phone = (data.phone || "").toString().trim();
    if (!name && !phone) {
      return ContentService.createTextOutput(
        JSON.stringify({ result: "error", error: "Missing name and phone" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // Sanitize input to prevent formula injection
    function sanitize(val) {
      if (val === null || val === undefined) return "";
      var str = val.toString().trim();
      if (str.length > 2000) {
        str = str.substring(0, 2000);
      }
      if (/^[=+\-@]/.test(str)) {
        str = "'" + str;
      }
      return str;
    }

    // Timestamp in Indian Standard Time (IST)
    var istTimestamp = Utilities.formatDate(
      new Date(),
      "Asia/Kolkata",
      "yyyy-MM-dd HH:mm:ss"
    );

    var cleanPhone = sanitize(phone);
    if (/^\d{10}$/.test(phone)) {
      cleanPhone = "'" + phone;
    }

    // ====================================================
    // CASE A: CAREER APPLICATIONS (SEPARATE TABS PER ROLE)
    // ====================================================
    if (data.type === "career" || data.role) {
      var role = (data.role || "").toString().trim();
      var targetTabName = "Career Applications";

      if (role === "Telecaller") {
        targetTabName = "Telecallers";
      } else if (role === "Chit Fund Business Agent") {
        targetTabName = "Business Agents";
      } else if (role === "Chit Fund Recovery Agent") {
        targetTabName = "Recovery Agents";
      }

      var roleSheet = ss.getSheetByName(targetTabName);
      var roleHeaders = [
        "Timestamp (IST)",
        "Full Name",
        "Phone",
        "Experience",
        "Message"
      ];

      // Auto-create the tab if it doesn't exist yet
      if (!roleSheet) {
        roleSheet = ss.insertSheet(targetTabName);
        roleSheet.appendRow(roleHeaders);
        var rHeaderRange = roleSheet.getRange(1, 1, 1, roleHeaders.length);
        rHeaderRange.setFontWeight("bold");
        rHeaderRange.setBackground("#2A113E"); // Brand Deep Purple
        rHeaderRange.setFontColor("#FFFFFF");
        roleSheet.setFrozenRows(1);
      }

      var roleRow = [
        istTimestamp,
        sanitize(name),
        cleanPhone,
        sanitize(data.experience || "Not specified"),
        sanitize(data.message)
      ];

      roleSheet.appendRow(roleRow);

      return ContentService.createTextOutput(
        JSON.stringify({ result: "success", tab: targetTabName })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // ====================================================
    // CASE B: CUSTOMER CHIT ENQUIRIES
    // ====================================================
    var enquirySheet = ss.getSheetByName("Enquiries");
    var enquiryHeaders = [
      "Timestamp (IST)",
      "Name",
      "Phone",
      "Interested Chit Group",
      "Message",
      "Form Location",
      "Page"
    ];

    if (!enquirySheet) {
      enquirySheet = ss.insertSheet("Enquiries");
      enquirySheet.appendRow(enquiryHeaders);
      var eHeaderRange = enquirySheet.getRange(1, 1, 1, enquiryHeaders.length);
      eHeaderRange.setFontWeight("bold");
      eHeaderRange.setBackground("#2A113E");
      eHeaderRange.setFontColor("#FFFFFF");
      enquirySheet.setFrozenRows(1);
    }

    var enquiryRow = [
      istTimestamp,
      sanitize(name),
      cleanPhone,
      sanitize(data.interested_in || data.chitPlanName || "General Chit Inquiry"),
      sanitize(data.message),
      sanitize(data.form_location || "Website"),
      sanitize(data.page_path || "/")
    ];

    enquirySheet.appendRow(enquiryRow);

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success", tab: "Enquiries" })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", error: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```
