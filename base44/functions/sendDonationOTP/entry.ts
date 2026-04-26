import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { email, name } = await req.json();

    if (!email) return Response.json({ error: "Email is required" }, { status: 400 });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Delete old OTPs for this email
    const existing = await base44.asServiceRole.entities.DonationOTP.filter({ email });
    for (const rec of existing) {
      await base44.asServiceRole.entities.DonationOTP.delete(rec.id);
    }

    // Store new OTP
    await base44.asServiceRole.entities.DonationOTP.create({ email, otp, expiry });

    // Send email
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: email,
      subject: "Your IMAM NGO Donation Verification Code",
      body: `Dear ${name || "Donor"},\n\nYour OTP for donation verification is:\n\n  ${otp}\n\nThis code expires in 10 minutes. Do not share it with anyone.\n\nJazakAllah Khair!\nIMAM NGO Team`,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});