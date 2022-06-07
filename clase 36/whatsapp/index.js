const express = require('express');
const app = express();
const twilio = require('twilio');

// Credentials twilio
const accountId = "AC50a0b45fb6d0658494c0fc5e34abc1d3";
const authToken = "e0e031a45b4f34dc727ad91c1edb7d5b";
app.use(express.json());
const client = new twilio(accountId, authToken);
/* const options = {
    body: 'This is a WhatsApp from Node JS',
    mediaUrl: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    to: 'whatsapp:+5491130284520',
    from: 'whatsapp:+14155238886',
} */

// path post
app.post('/twilio-coder', async(req, res) => {
    const options = {
        body: req.body.message,
        mediaUrl: req.body.mediaUrl,
        to: 'whatsapp:+5491130284520',
        from: 'whatsapp:+14155238886',
    }
    try {
        const message = await client.messages.create(options);
        res.json({ data: message });

    } catch (error) {
        console.log(error);
    }
})


app.listen(8080, () => {
    console.log('Server running on port 8080');
})