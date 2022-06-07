const express = require('express');
const app = express();
const twilio = require('twilio');

// Twilio credentials
const accountSid = 'AC50a0b45fb6d0658494c0fc5e34abc1d3';
const authToken = 'e0e031a45b4f34dc727ad91c1edb7d5b';

const client = new twilio(accountSid, authToken);

app.post('/twilio-coder', async(req, res) => {
    try {
        const sms = await client.messages.create({
            // message body
            body: "test message",
            // sender phone number
            from: '+16812532722',
            // receiver phone number
            to: '+5491130284520'

        })
        console.log(sms)
        res.send({ data: sms })

    } catch (error) {
        console.log(error);
    }
})

app.listen(8080, () => {
    console.log('Server listening on port 8080');
})