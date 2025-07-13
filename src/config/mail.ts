import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendEmail(to: string, subject: string, html: string) {
  const info = await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    html,
  })

  return info.messageId
}
