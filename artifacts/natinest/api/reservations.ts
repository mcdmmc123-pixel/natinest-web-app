const REQUIRED_FIELDS = ["submissionId", "fullName", "email", "phone", "address", "city", "plan", "eggsPerWeek"] as const;

function isPresent(value: unknown) {
  return typeof value === "string" ? value.trim().length > 0 : value !== undefined && value !== null;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ status: "error", message: "Method not allowed" });
  }

  const webhookUrl = process.env.RESERVATION_WEBHOOK_URL;
  if (!webhookUrl) {
    return res.status(500).json({ status: "error", message: "Reservation webhook is not configured" });
  }

  let payload: Record<string, unknown>;
  try {
    payload = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  } catch {
    return res.status(400).json({ status: "error", message: "Invalid JSON body" });
  }

  const missing = REQUIRED_FIELDS.filter((field) => !isPresent(payload[field]));
  if (missing.length > 0) {
    return res.status(400).json({ status: "error", message: `Missing required fields: ${missing.join(", ")}` });
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  let result: { status?: string; message?: string } = {};
  try {
    result = JSON.parse(text);
  } catch {
    result = { status: response.ok ? "success" : "error", message: text };
  }

  if (!response.ok || result.status !== "success") {
    return res.status(502).json({
      status: "error",
      message: result.message || "Reservation service failed",
    });
  }

  return res.status(200).json({ status: "success" });
}
