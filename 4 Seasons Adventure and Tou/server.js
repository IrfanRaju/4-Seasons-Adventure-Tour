import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Tour booking API is running.' });
});

app.post('/api/contact', async (req, res) => {
  const { name, phone, email, groupSize, travelDates, message } = req.body || {};

  if (!name || !phone || !travelDates) {
    return res.status(400).json({
      success: false,
      message: 'Name, phone, and preferred travel dates are required.',
    });
  }

  const inquiry = {
    name: name.trim(),
    phone: phone.trim(),
    email: email ? email.trim() : 'Not provided',
    groupSize: groupSize || 'Not specified',
    travelDates: travelDates.trim(),
    message: message ? message.trim() : 'No additional note provided',
  };

  const html = `
    <h2>New Tour Inquiry</h2>
    <p><strong>Name:</strong> ${inquiry.name}</p>
    <p><strong>Phone / WhatsApp:</strong> ${inquiry.phone}</p>
    <p><strong>Email:</strong> ${inquiry.email}</p>
    <p><strong>Group type:</strong> ${inquiry.groupSize}</p>
    <p><strong>Preferred travel dates:</strong> ${inquiry.travelDates}</p>
    <p><strong>Message:</strong> ${inquiry.message}</p>
  `;

  const fromAddress = process.env.SMTP_USER || 'demo@example.com';
  const toAddress = process.env.EMAIL_TO || 'booking@4seasonsadventure.com';

  try {
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT || 587) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: fromAddress,
        to: toAddress,
        replyTo: inquiry.email,
        subject: `New tour inquiry from ${inquiry.name}`,
        html,
      });

      return res.json({
        success: true,
        message: 'Your inquiry has been sent successfully. We will contact you soon.',
      });
    }

    console.log('SMTP credentials missing. Demo mode enabled. Inquiry saved to console:');
    console.log(html);

    return res.json({
      success: true,
      message: 'Your inquiry was received in demo mode. Connect SMTP credentials to send emails directly.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      message: 'We could not send your inquiry right now. Please contact us on WhatsApp instead.',
    });
  }
});

const distPath = path.join(__dirname, 'dist');
const indexFile = path.join(distPath, 'index.html');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(indexFile);
  });
}

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
