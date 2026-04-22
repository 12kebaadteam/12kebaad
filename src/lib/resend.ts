import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOTP(email: string, otp: string) {
  try {
    await resend.emails.send({
      from: '12kebaad <verification@verification.12kebaad.in>',
      to: email,
      subject: 'Welcome to 12kebaad.in - Your Verification OTP',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <p>Hello,</p>
          <br/>
          <p>Thank you for using 12kebaad.in – your guide after Class 12 🎓</p>
          <br/>
          <p>To complete your verification, please use the One-Time Password (OTP) below:</p>
          <br/>
          <h3 style="color: #3b82f6;"><strong>OTP: ${otp}</strong></h3>
          <br/>
          <p>This OTP is valid for the next 10 minutes. Please do not share it with anyone for security reasons.</p>
          <br/>
          <p>If you did not request this, you can safely ignore this email.</p>
          <br/>
          <p>Best regards,<br/>Team 12kebaad.in</p>
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error("Resend Error:", error);
    return false;
  }
}

export async function sendRecommendations(email: string, recommendations: any[]) {
  const listItems = recommendations
    .map(r => `<li><strong>${r.name}</strong>: ${r.aiSummary}</li>`)
    .join('');

  try {
    await resend.emails.send({
      from: '12kebaad <verification@verification.12kebaad.in>',
      to: email,
      subject: 'Your Top 5 Career Recommendations',
      html: `
        <h1>Your Personalized Career Plan</h1>
        <p>Based on your profile, here are your top 5 matches:</p>
        <ul>${listItems}</ul>
        <p><a href="${process.env.NEXTAUTH_URL}/results">View full details and roadmaps</a></p>
      `,
    });
    return true;
  } catch (error) {
    console.error("Resend Email Error:", error);
    return false;
  }
}
