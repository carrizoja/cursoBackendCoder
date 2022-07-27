const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

const TEST_EMAIL = 'carrizoja@gmail.com';
const TEST_PASSWORD = 'jqqlgqfufvetnpuc';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: TEST_EMAIL,
        pass: TEST_PASSWORD
    }
});

const htmlTemplate = `
<h1>Default template</h1>

`

// Mail structure
const mailOptions = {
    from: "Node mail",
    to: TEST_EMAIL,
    subject: "New user registered!",
    html: htmlTemplate

}

module.exports = { transporter, mailOptions };