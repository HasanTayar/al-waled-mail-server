const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors("*"));
app.use(express.json()); 

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Email sending route
app.post('/send-email', async (req, res) => {
    const { to, subject, html } = req.body;
    try {
      await transporter.sendMail({
        from: '"alwaled-farm" <' + process.env.EMAIL_USER + '>',
        to,
        subject,
        html,
      });
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    }
  });
  
// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
