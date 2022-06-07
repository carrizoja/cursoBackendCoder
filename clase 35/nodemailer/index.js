const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

const TEST_EMAIL = 'alba.larson56@ethereal.email';
const TEST_PASSWORD = 'mF3zZthczweMCmcn6D';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: TEST_EMAIL,
        pass: TEST_PASSWORD
    }
});

const htmlTemplate = `
<h1>Mensaje de mail</h1>

`

// Mail structure
const mailOptions = {
    from: "Node mail",
    to: TEST_EMAIL,
    subject: "Test email",
    html: htmlTemplate

}

// route to send email using Ethereal
app.post('/email-coder', async(req, res) => {

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log(info)
        res.send('Email sent to' + TEST_EMAIL)
    } catch (error) {
        console.log(error)
    }

})



app.listen(8080, () => {
    console.log('Server ok in port 8080');
})