import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || 're_dummy_fallback_key';
const resend = new Resend(resendApiKey);

export async function sendRecommendations(email: string, recommendations: any[]) {
  const listItems = recommendations
    .map(r => `<li><strong>${r.name}</strong>: ${r.aiSummary}</li>`)
    .join('');

  try {
    await resend.emails.send({
      from: '12kebaad <noreply@welcome.12kebaad.in>',
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

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    await resend.emails.send({
      from: '12kebaad <noreply@welcome.12kebaad.in>',
      to: email,
      subject: "Welcome to 12kebaad.in! 🎉 Let's find your perfect career",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1e3a5f;">Welcome to 12kebaad.in, ${name}! 🚀</h2>
          <p>We're thrilled to have you onboard. Taking the first step towards deciding your career after Class 12 is huge, and you're in the right place.</p>
          <br/>
          <p>Here's what you can do next:</p>
          <ul>
            <li><strong>Take the Career Quiz:</strong> Let our AI analyze your interests and predict your top 10 career matches.</li>
            <li><strong>Explore Colleges:</strong> Find the best colleges tailored to your stream and budget.</li>
            <li><strong>View Roadmaps:</strong> Get step-by-step guidance on how to achieve your dream career.</li>
          </ul>
          <br/>
          <p>If you have any questions or need guidance, just hit reply to this email!</p>
          <br/>
          <a href="${process.env.NEXTAUTH_URL}/quiz-intro" style="display: inline-block; padding: 10px 20px; background-color: #e8630a; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Start Your Career Quiz</a>
          <br/><br/>
          <p>Best regards,<br/><strong>Team 12kebaad.in</strong><br/><em>India's smartest career predictor</em></p>
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error("Welcome Email Error:", error);
    return false;
  }
}
