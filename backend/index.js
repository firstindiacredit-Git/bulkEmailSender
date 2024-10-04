const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Configure Nodemailer transport for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sinodkr001@gmail.com', // Your Gmail
    pass: 'erbv jtgo diak pebm'   // Your Gmail App Password (Enable 2FA and use App-specific password)
  }
});

// Send email to multiple recipients
app.post('/send-email', async (req, res) => {
  const { emails, subject, message } = req.body;

  const mailOptions = {
    from: 'sinodkr001@gmail.com', 
    to: emails.join(', '),  // Join all emails in a comma-separated string
    subject: subject,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ success: false, message: 'Failed to send emails', error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
