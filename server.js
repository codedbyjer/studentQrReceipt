require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Allow CORS from any origin for simplicity; adjust as needed for production
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Route to send email
app.post('/send-email', async (req, res) => {
    const { email, subject, text, qrCodeUrl } = req.body;

    try {
        // Configure mail options
        const mailOptions = {
            from: '"Computer Explorer Society" <solecraft577@gmail.com>',
            to: email,
            subject: subject,
            text: text,
            attachments: [
                {
                    filename: 'qrcode.png',
                    path: qrCodeUrl,
                    cid: 'qrcode@cid'
                }
            ]
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Email sent', info });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error sending email', error });
    }
});

// Serve the index.html file for any non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
