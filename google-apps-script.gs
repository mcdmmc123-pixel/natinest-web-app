const SHEET_ID = "1saBJdW_6AaTs-Gxm6ayeI8LTXEMmd7UUOzImOrEJTZs";
const SHEET_NAME = "Reservations";
const OWNER_EMAILS = ["k.shreyasgowdru@gmail.com", "gangadharar739@gmail.com"];

const HEADERS = [
  "Submitted At",
  "Submission ID",
  "Full Name",
  "Email",
  "Phone Number",
  "Full Delivery Address",
  "City / Area",
  "Selected Plan",
  "Eggs Per Week",
  "Message",
];

const REQUIRED_FIELDS = [
  "submissionId",
  "fullName",
  "email",
  "phone",
  "address",
  "city",
  "plan",
  "eggsPerWeek",
];

function setup() {
  const sheet = getReservationSheet_();
  sheet.clear();
  sheet.appendRow(HEADERS);
  sheet.setFrozenRows(1);
}

function doGet() {
  return json_({ status: "ok", service: "natinest-reservations" });
}

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    const data = parsePayload_(e);
    const validationError = validateReservation_(data);
    if (validationError) {
      return json_({ status: "error", message: validationError });
    }

    const sheet = getReservationSheet_();
    ensureHeaders_(sheet);

    const submittedAt = data.submittedAt ? new Date(data.submittedAt) : new Date();
    const duplicate = findDuplicate_(sheet, data, submittedAt);
    if (duplicate) {
      return json_({ status: "success", duplicate: true });
    }

    sheet.appendRow([
      submittedAt,
      clean_(data.submissionId),
      clean_(data.fullName),
      clean_(data.email).toLowerCase(),
      clean_(data.phone),
      clean_(data.address),
      clean_(data.city),
      clean_(data.plan),
      Number(data.eggsPerWeek),
      clean_(data.message),
    ]);

    sendOwnerEmail_(data, submittedAt);

    return json_({ status: "success" });
  } catch (error) {
    return json_({ status: "error", message: error.message });
  } finally {
    try {
      lock.releaseLock();
    } catch (error) {
      // Lock may not have been acquired if Apps Script failed early.
    }
  }
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error("Empty request body");
  }

  return JSON.parse(e.postData.contents);
}

function validateReservation_(data) {
  const missing = REQUIRED_FIELDS.filter((field) => !hasValue_(data[field]));
  if (missing.length > 0) {
    return `Missing required fields: ${missing.join(", ")}`;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean_(data.email))) {
    return "Invalid email";
  }

  if (!/^[+()\-\s\d]{10,20}$/.test(clean_(data.phone))) {
    return "Invalid phone number";
  }

  const eggsPerWeek = Number(data.eggsPerWeek);
  if (!Number.isFinite(eggsPerWeek) || eggsPerWeek < 6 || eggsPerWeek > 500) {
    return "Invalid eggs per week";
  }

  return "";
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    return;
  }

  const current = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const needsHeaderRepair = HEADERS.some((header, index) => current[index] !== header);
  if (needsHeaderRepair) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function findDuplicate_(sheet, data, submittedAt) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;

  const values = sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues();
  const submissionId = clean_(data.submissionId);
  const email = clean_(data.email).toLowerCase();
  const phone = clean_(data.phone);
  const plan = clean_(data.plan);
  const submittedTime = submittedAt.getTime();
  const recentWindowMs = 15 * 60 * 1000;

  return values.some((row) => {
    const rowSubmittedAt = row[0] instanceof Date ? row[0].getTime() : new Date(row[0]).getTime();
    const sameSubmissionId = clean_(row[1]) === submissionId;
    const sameRecentCustomer =
      clean_(row[3]).toLowerCase() === email &&
      clean_(row[4]) === phone &&
      clean_(row[7]) === plan &&
      Number.isFinite(rowSubmittedAt) &&
      Math.abs(submittedTime - rowSubmittedAt) <= recentWindowMs;

    return sameSubmissionId || sameRecentCustomer;
  });
}

function getReservationSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}

function sendOwnerEmail_(data, submittedAt) {
  const subject = "New NatiNest reservation";
  const body = [
    "New reservation received from the website.",
    "",
    `Submission Timestamp: ${submittedAt.toISOString()}`,
    `Customer Full Name: ${clean_(data.fullName)}`,
    `Email: ${clean_(data.email).toLowerCase()}`,
    `Phone Number: ${clean_(data.phone)}`,
    `Address: ${clean_(data.address)}`,
    `Selected Plan: ${clean_(data.plan)}`,
    `Eggs Per Week: ${Number(data.eggsPerWeek)}`,
    `Message: ${clean_(data.message)}`,
    "",
    `Submission ID: ${clean_(data.submissionId)}`,
  ].join("\n");

  MailApp.sendEmail(OWNER_EMAILS.join(","), subject, body);
}

function clean_(value) {
  return value === undefined || value === null ? "" : String(value).trim();
}

function hasValue_(value) {
  return clean_(value).length > 0;
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
