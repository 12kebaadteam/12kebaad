import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || 're_dummy_fallback_key';
const resend = new Resend(resendApiKey);

// Helper to get safe application URL
const getAppUrl = () => {
  return (process.env.NEXTAUTH_URL || 'https://12kebaad.in').replace(/\/$/, '');
};

interface Recommendation {
  name: string;
  aiSummary: string;
  matchScore?: number;
  sector?: string;
  stream?: string;
}

export async function sendRecommendations(email: string, recommendations: Recommendation[]) {
  const appUrl = getAppUrl();

  // Map each recommendation to a highly designed premium HTML card
  const cardsHtml = recommendations
    .map((r, index) => {
      // Dynamic colors based on rank/match position to add visual depth
      let borderLeftColor = '#4f46e5'; // Default Indigo
      let scoreBg = '#e0e7ff';
      let scoreColor = '#4338ca';
      let scoreBorder = '#c7d2fe';

      if (index === 0) {
        // Top Rank: Brand Orange
        borderLeftColor = '#e8630a';
        scoreBg = '#ffedd5';
        scoreColor = '#ea580c';
        scoreBorder = '#fed7aa';
      } else if (index >= 3) {
        // Lower Rank: Sky Blue
        borderLeftColor = '#0ea5e9';
        scoreBg = '#e0f2fe';
        scoreColor = '#0369a1';
        scoreBorder = '#bae6fd';
      }

      const matchPercent = r.matchScore || (98 - index * 4); // fallbacks if score is not present
      const sectorText = r.sector || 'General';
      const streamText = r.stream || 'Any';

      return `
        <div style="background-color: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; border-left: 5px solid ${borderLeftColor}; margin-bottom: 18px; box-shadow: 0 2px 4px rgba(15, 23, 42, 0.02);">
          <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td valign="top" style="padding-bottom: 8px;">
                <h4 style="margin: 0; color: #0f172a; font-size: 18px; font-weight: 800; font-family: Arial, sans-serif;">
                  ${index + 1}. ${r.name}
                </h4>
                <div style="margin-top: 6px;">
                  <span style="background-color: #f1f5f9; color: #475569; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; display: inline-block; text-transform: uppercase; letter-spacing: 0.5px; margin-right: 6px; font-family: Arial, sans-serif;">
                    ${sectorText}
                  </span>
                  <span style="background-color: #f0fdf4; color: #166534; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; display: inline-block; text-transform: uppercase; letter-spacing: 0.5px; font-family: Arial, sans-serif;">
                    Stream: ${streamText}
                  </span>
                </div>
              </td>
              <td valign="top" align="right" width="100" style="padding-bottom: 8px;">
                <span style="background-color: ${scoreBg}; color: ${scoreColor}; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; display: inline-block; border: 1px solid ${scoreBorder}; font-family: Arial, sans-serif; white-space: nowrap;">
                  ${matchPercent}% Fit
                </span>
              </td>
            </tr>
          </table>
          <p style="margin: 8px 0 0 0; color: #475569; font-size: 14px; line-height: 1.6; font-family: Arial, sans-serif; font-style: italic; border-left: 2px solid #e2e8f0; padding-left: 8px;">
            "${r.aiSummary}"
          </p>
        </div>
      `;
    })
    .join('');

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);">
      <!-- Top Premium Header -->
      <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 32px 24px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; font-family: Arial, sans-serif;">Your Custom AI Career Plan 🔮</h1>
        <p style="margin: 8px 0 0 0; color: #bfdbfe; font-size: 14px; font-weight: 500; font-family: Arial, sans-serif;">
          Top 5 career recommendations based on your stream, interests, and passion
        </p>
      </div>

      <div style="padding: 24px 20px;">
        <p style="font-size: 15px; color: #334155; margin-bottom: 24px; text-align: center; font-family: Arial, sans-serif;">
          Our AI career predictor has analyzed your inputs and synthesized your absolute best career paths. Here are your top 5 matched profiles:
        </p>

        <!-- Recommendation Cards List -->
        <div style="margin-bottom: 28px;">
          ${cardsHtml}
        </div>

        <!-- Big CTA Button -->
        <div style="text-align: center; margin: 32px 0 24px 0;">
          <a href="${appUrl}/results" style="display: inline-block; padding: 14px 32px; background-color: #e8630a; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold; box-shadow: 0 4px 8px rgba(232, 99, 10, 0.25); font-family: Arial, sans-serif;">
            Unlock Detailed Roadmaps & Colleges →
          </a>
          <p style="margin: 8px 0 0 0; color: #64748b; font-size: 12px; font-family: Arial, sans-serif;">
            Unlock entrance exams, average salary trends, and state relevance scores
          </p>
        </div>

        <!-- Signature / Footer -->
        <div style="border-top: 1px solid #e2e8f0; padding-top: 24px; text-align: center; margin-top: 24px;">
          <p style="margin: 0 0 4px 0; color: #475569; font-size: 14px; font-weight: bold; font-family: Arial, sans-serif;">Best regards,</p>
          <p style="margin: 0 0 2px 0; color: #1e3a8a; font-size: 16px; font-weight: 800; font-family: Arial, sans-serif;">Team 12kebaad.in</p>
          <p style="margin: 0; color: #e8630a; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; font-family: Arial, sans-serif;">India's Smartest Career Predictor</p>
        </div>
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: '12kebaad <noreply@welcome.12kebaad.in>',
      to: email,
      subject: 'Your Top 5 AI Career Recommendations 🔮 | 12kebaad.in',
      html: emailHtml,
    });
    return true;
  } catch (error) {
    console.error("Resend Email Error:", error);
    return false;
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  const appUrl = getAppUrl();
  const welcomeImageUrl = `${appUrl}/welcome-card.jpg`;

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);">
      <!-- Welcome Illustration Image Banner -->
      <div style="width: 100%; text-align: center; background-color: #ffffff; padding: 0;">
        <img src="${welcomeImageUrl}" alt="Welcome to 12kebaad.in" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 1px solid #e2e8f0;" />
      </div>

      <div style="padding: 32px 24px;">
        <h2 style="color: #1e3a8a; font-size: 24px; font-weight: 800; margin-top: 0; margin-bottom: 16px; text-align: center; font-family: Arial, sans-serif;">
          Welcome to 12kebaad.in, ${name}! 🚀
        </h2>
        
        <p style="font-size: 15px; color: #334155; margin-bottom: 24px; text-align: center; font-family: Arial, sans-serif;">
          We're absolutely thrilled to have you onboard. Choosing the right path after Class 12 is one of the most important decisions of your life, and we're here to help you get it right.
        </p>

        <!-- What to do Next Card -->
        <div style="background-color: #ffffff; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0; margin-bottom: 32px; box-shadow: 0 2px 4px rgba(15, 23, 42, 0.01);">
          <h3 style="color: #0f172a; font-size: 16px; font-weight: 700; margin-top: 0; margin-bottom: 16px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; font-family: Arial, sans-serif;">
            Here's what you can do next:
          </h3>
          
          <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <!-- Step 1 -->
            <tr>
              <td valign="top" width="36" style="padding-bottom: 16px;">
                <span style="display: inline-block; background-color: #ffedd5; color: #ea580c; border-radius: 8px; width: 28px; height: 28px; text-align: center; line-height: 28px; font-size: 14px; font-weight: bold; font-family: Arial, sans-serif;">🎯</span>
              </td>
              <td valign="top" style="padding-left: 8px; padding-bottom: 16px; font-family: Arial, sans-serif;">
                <h4 style="margin: 0 0 4px 0; color: #1e293b; font-size: 15px; font-weight: bold;">Take the Career Quiz</h4>
                <p style="margin: 0; color: #64748b; font-size: 13px; line-height: 1.5;">Let our advanced AI analyze your interests and match you with your top 10 custom career choices.</p>
              </td>
            </tr>

            <!-- Step 2 -->
            <tr>
              <td valign="top" width="36" style="padding-bottom: 16px;">
                <span style="display: inline-block; background-color: #e0e7ff; color: #4f46e5; border-radius: 8px; width: 28px; height: 28px; text-align: center; line-height: 28px; font-size: 14px; font-weight: bold; font-family: Arial, sans-serif;">🎓</span>
              </td>
              <td valign="top" style="padding-left: 8px; padding-bottom: 16px; font-family: Arial, sans-serif;">
                <h4 style="margin: 0 0 4px 0; color: #1e293b; font-size: 15px; font-weight: bold;">Explore Custom Colleges</h4>
                <p style="margin: 0; color: #64748b; font-size: 13px; line-height: 1.5;">Find elite colleges tailored to your budget, academic stream, and locations.</p>
              </td>
            </tr>

            <!-- Step 3 -->
            <tr>
              <td valign="top" width="36">
                <span style="display: inline-block; background-color: #dcfce7; color: #16a34a; border-radius: 8px; width: 28px; height: 28px; text-align: center; line-height: 28px; font-size: 14px; font-weight: bold; font-family: Arial, sans-serif;">🗺️</span>
              </td>
              <td valign="top" style="padding-left: 8px; font-family: Arial, sans-serif;">
                <h4 style="margin: 0 0 4px 0; color: #1e293b; font-size: 15px; font-weight: bold;">Unlock Roadmaps</h4>
                <p style="margin: 0; color: #64748b; font-size: 13px; line-height: 1.5;">Follow clean, step-by-step guidelines and certifications to transition smoothly to your dream career.</p>
              </td>
            </tr>
          </table>
        </div>

        <!-- CTA Button -->
        <div style="text-align: center; margin-bottom: 32px;">
          <a href="${appUrl}/quiz-intro" style="display: inline-block; padding: 14px 32px; background-color: #e8630a; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold; box-shadow: 0 4px 8px rgba(232, 99, 10, 0.25); font-family: Arial, sans-serif;">
            Start Your Career Quiz →
          </a>
        </div>

        <p style="font-size: 14px; color: #64748b; text-align: center; margin-bottom: 24px; font-family: Arial, sans-serif;">
          If you have any questions or need custom guidance, just reply directly to this email. We're here to support you!
        </p>

        <!-- Signature -->
        <div style="border-top: 1px solid #e2e8f0; padding-top: 24px; text-align: center;">
          <p style="margin: 0 0 4px 0; color: #475569; font-size: 14px; font-weight: bold; font-family: Arial, sans-serif;">Best regards,</p>
          <p style="margin: 0 0 2px 0; color: #1e3a8a; font-size: 16px; font-weight: 800; font-family: Arial, sans-serif;">Team 12kebaad.in</p>
          <p style="margin: 0; color: #e8630a; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; font-family: Arial, sans-serif;">India's Smartest Career Predictor</p>
        </div>
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: '12kebaad <noreply@welcome.12kebaad.in>',
      to: email,
      subject: "Welcome to 12kebaad.in! 🎉 Let's find your perfect career",
      html: emailHtml,
    });
    return true;
  } catch (error) {
    console.error("Welcome Email Error:", error);
    return false;
  }
}
