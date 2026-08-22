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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[\d+\-\s()]{7,}$/;

const escapeHtml = (value) => String(value || '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const formatFieldName = (field) => field
  .replace(/([A-Z])/g, ' $1')
  .replace(/^./, (character) => character.toUpperCase());

const fieldLabels = {
  name: 'Customer Name',
  email: 'Email Address',
  phone: 'Phone / WhatsApp Number',
  destination: 'Selected Tour or Package',
  tourType: 'Selected Tour or Package',
  package: 'Selected Tour or Package',
  travelDates: 'Travel Date',
  groupSize: 'Number of Persons',
  persons: 'Number of Persons',
  travelers: 'Number of Persons',
  message: 'Customer Message / Special Requirements',
  requirements: 'Customer Message / Special Requirements',
  country: 'Country',
  nationality: 'Nationality',
  departureCity: 'Departure City',
  difficulty: 'Trekking Level',
  accommodation: 'Preferred Accommodation',
  transport: 'Transportation',
  expeditionType: 'Expedition Type',
  experience: 'Previous Climbing Experience',
  duration: 'Number of Days',
  formType: 'Inquiry Type',
};

const getFieldLabel = (field) => fieldLabels[field] || formatFieldName(field);

const createTransporter = () => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    requireTLS: Number(process.env.SMTP_PORT || 587) !== 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const validateInquiryData = (formData) => {
  const errors = [];
  const name = String(formData.name || '').trim();
  const phone = String(formData.phone || '').trim();
  const email = String(formData.email || '').trim();
  const travelDates = String(formData.travelDates || '').trim();

  if (!name) {
    errors.push('Customer Name is required.');
  } else if (name.length < 2) {
    errors.push('Customer Name must be at least 2 characters.');
  }

  if (!phone) {
    errors.push('Phone / WhatsApp Number is required.');
  } else if (!phoneRegex.test(phone)) {
    errors.push('Please enter a valid Phone / WhatsApp Number (at least 7 digits).');
  }

  if (email && !emailRegex.test(email)) {
    errors.push('Please enter a valid Email Address.');
  }

  if (!travelDates) {
    errors.push('Travel Date is required.');
  }

  return errors;
};

const buildEmailHtml = (formData, formTypeLabel) => {
  const inquiry = { formType: formTypeLabel };

  Object.entries(formData).forEach(([field, value]) => {
    if (field !== 'formType') {
      inquiry[field] = String(value || '').trim() || 'Not provided';
    }
  });

  const preferredOrder = [
    'formType',
    'name',
    'email',
    'phone',
    'destination',
    'tourType',
    'package',
    'travelDates',
    'groupSize',
    'persons',
    'travelers',
    'country',
    'nationality',
    'departureCity',
    'difficulty',
    'accommodation',
    'transport',
    'expeditionType',
    'experience',
    'duration',
    'message',
    'requirements',
  ];

  const orderedEntries = [];
  const addedFields = new Set();

  preferredOrder.forEach((field) => {
    if (inquiry[field] !== undefined) {
      orderedEntries.push([field, inquiry[field]]);
      addedFields.add(field);
    }
  });

  Object.entries(inquiry).forEach(([field, value]) => {
    if (!addedFields.has(field)) {
      orderedEntries.push([field, value]);
    }
  });

  const customerName = inquiry.name || 'Customer';

  const rowsHtml = orderedEntries
    .map(([field, value]) => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px 16px; font-weight: 700; color: #082b45; width: 35%; background: #f8fafc;">
          ${escapeHtml(getFieldLabel(field))}
        </td>
        <td style="padding: 12px 16px; color: #0d1b26;">
          ${escapeHtml(value)}
        </td>
      </tr>
    `).join('');

  return `
    <div style="font-family: Inter, 'Segoe UI', Arial, sans-serif; background: #f0f7fa; padding: 32px 16px;">
      <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 50px rgba(8, 43, 69, 0.12);">
        <div style="background: linear-gradient(135deg, #082b45, #159bd7); padding: 32px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 26px; letter-spacing: -0.02em;">New ${formTypeLabel}</h1>
          <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">
            From: ${escapeHtml(customerName)} • ${new Date().toLocaleString()}
          </p>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin: 0;">
          ${rowsHtml}
        </table>
        <div style="background: #f8fafc; padding: 20px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #51626f; margin: 0; font-size: 13px;">
            4 Seasons Adventure & Tour • ${escapeHtml(process.env.SMTP_USER || '')}
          </p>
        </div>
      </div>
    </div>
  `;
};

const sendInquiryEmail = async (formData, formTypeLabel) => {
  const transporter = createTransporter();
  if (!transporter) {
    throw new Error('SMTP credentials are missing. Please configure SMTP_USER and SMTP_PASS in .env file.');
  }

  const fromAddress = process.env.SMTP_USER || '4seasonsadventureandtour@gmail.com';
  const toAddress = process.env.EMAIL_TO || '4seasonsadventureandtour@gmail.com';
  const email = String(formData.email || '').trim();
  const customerName = String(formData.name || 'Customer').trim();

  const emailOptions = {
    from: fromAddress,
    to: toAddress,
    subject: `New ${formTypeLabel} from ${customerName}`,
    html: buildEmailHtml(formData, formTypeLabel),
  };

  if (email && emailRegex.test(email)) {
    emailOptions.replyTo = email;
  }

  await transporter.verify();
  await transporter.sendMail(emailOptions);
};

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    message: 'Tour booking API is running.',
    emailConfigured: !!(process.env.SMTP_USER && process.env.SMTP_PASS),
  });
});

app.post('/api/contact', async (req, res) => {
  try {
    const formData = req.body || {};
    const errors = validateInquiryData(formData);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Please fix the following errors:',
        errors,
      });
    }

    await sendInquiryEmail(formData, 'Contact Inquiry');

    return res.json({
      success: true,
      message: 'Thank you for contacting 4 Seasons Adventure and Tour! Your inquiry has been received successfully. We will get back to you soon.',
    });
  } catch (error) {
    console.error('Contact form error:', error.message);

    if (error.message.includes('SMTP credentials')) {
      return res.status(503).json({
        success: false,
        message: 'Email delivery is not configured. Please add SMTP_USER and SMTP_PASS to the .env file, then restart the server.',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'We could not send your inquiry right now. Please try again or contact us on WhatsApp instead.',
    });
  }
});

app.post('/api/send-email', async (req, res) => {
  try {
    const formData = req.body || {};
    const errors = validateInquiryData(formData);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Please fix the following errors:',
        errors,
      });
    }

    await sendInquiryEmail(formData, 'Booking Inquiry');

    return res.json({
      success: true,
      message: 'Thank you for contacting 4 Seasons Adventure and Tour! Your inquiry has been received successfully. We will get back to you soon.',
    });
  } catch (error) {
    console.error('Booking form error:', error.message);

    if (error.message.includes('SMTP credentials')) {
      return res.status(503).json({
        success: false,
        message: 'Email delivery is not configured. Please add SMTP_USER and SMTP_PASS to the .env file, then restart the server.',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'We could not send your booking inquiry right now. Please try again or contact us on WhatsApp instead.',
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
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('⚠️  Email delivery is disabled: SMTP_USER and SMTP_PASS are required in .env.');
  } else {
    console.log('✅ Email service is configured and ready.');
  }
});
