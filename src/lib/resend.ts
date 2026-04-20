import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build_only');

export async function sendOTP(email: string, otp: string) {
  try {
    await resend.emails.send({
      from: '12kebaad <onboarding@resend.dev>', // Update with verified domain in production
      to: email,
      subject: 'Your 12kebaad Verification Code',
      html: `<p>Your verification code is <strong>${otp}</strong>. It expires in 10 minutes.</p>`,
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
      from: '12kebaad <onboarding@resend.dev>',
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
