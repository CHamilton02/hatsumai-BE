export default function forgotPasswordEmailHTML(email: string, url: string) {
  return `<div style="font-family: Arial, sans-serif; padding: 20px;">
            <div style="
              max-width: 600px;
              margin: auto;
              background: white;
              padding: 30px;
              border-radius: 6px;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
            ">
              <h1 style="margin-top: 0; font-size: 28px; color: #007BFF;">Hatsumai</h1>

              <h2 style="color: #333; font-size: 22px;">Reset Your Password</h2>

              <p style="font-size: 16px; color: #555; line-height: 1.5;">
                Hello ${email}! You requested a password reset. Click the button below to reset your password:
              </p>

              <a href="${url}" style="
                display: inline-block;
                margin: 20px 0;
                padding: 12px 20px;
                color: white;
                background-color: #007BFF;
                text-decoration: none;
                border-radius: 4px;
                font-weight: bold;
              ">
                Reset Password
              </a>

              <p style="font-size: 14px; color: #999; line-height: 1.4;">
                This link will expire in 10 minutes. If you didn’t request this, you can ignore this email.
              </p>

              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            </div>
          </div>`
}
