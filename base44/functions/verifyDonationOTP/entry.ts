import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Must match the same store as sendDonationOTP — since Deno isolates are separate per function,
// we use a simple stateless approach: the OTP is stored as a Base44 entity record.
// For this demo we verify a 6-digit OTP stored during send (works within same isolate session).
// For production, use a shared database entity or Redis.

const otpStore = new Map();

// Allow sendDonationOTP to write to this store via a shared pattern:
// We expose a simple endpoint that accepts {email, otp} and validates
// by re-checking Base44 entity DonationOTP

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { email, otp } = await req.json();

    if (!email || !otp) return Response.json({ error: "Email and OTP required" }, { status: 400 });

    // Fetch OTP record from database
    const records = await base44.asServiceRole.entities.DonationOTP.filter({ email });
    
    if (!records || records.length === 0) {
      return Response.json({ verified: false, error: "No OTP found for this email" });
    }

    const record = records[0];
    const now = Date.now();

    if (now > record.expiry) {
      await base44.asServiceRole.entities.DonationOTP.delete(record.id);
      return Response.json({ verified: false, error: "OTP has expired" });
    }

    if (record.otp !== otp) {
      return Response.json({ verified: false, error: "Invalid OTP" });
    }

    // Delete after successful verification
    await base44.asServiceRole.entities.DonationOTP.delete(record.id);
    return Response.json({ verified: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});