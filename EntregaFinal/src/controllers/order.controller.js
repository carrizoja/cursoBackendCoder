const orderService = require('../services/order.service.js');
const { transporter, mailOptions } = require('../services/Nodemailer');
const { errorLog: errorLogger, infoLog: infoLogger, warnLog: warnLog } = require('../utils/loggers/winston');
const twilio = require('twilio');

// Credentials twilio
const accountId = "AC50a0b45fb6d0658494c0fc5e34abc1d3";
const authToken = "b14d5cedfe04c176a64aff1f40820277";
const client = new twilio(accountId, authToken);

const getOrders = async(req, res) => {
    try {
        const response = await orderService.getAll();
        res.json(response);
    } catch (error) {
        console.log(error);
    }
};

const getOrderByUsername = async(req, res) => {
    try {
        const username = req.params.username;
        const response = await orderService.getOrderByUsername(username);
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}

const postOrder = async(req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) return res.status(400).send({ error: "There isn't any data" });

    try {
        const order = req.body;
        await orderService.save(order).then(result => res.send(result));
        try {
            mailOptions.html = `<h1>New order!</h1>
            <p>Username: ${req.body.username}</p>
            <p>Email: ${req.body.email}</p>
            <p>Address: ${req.body.address}</p>
            <p>Products: ${req.body.products}</p>
            <p>Total: ${req.body.total}</p>
                  
            `
            let info = await transporter.sendMail(mailOptions);
            infoLogger.info(`Email sent: ${info.messageId} || Date: ${new Date()}`);

        } catch (error) {
            errorLogger.error(` ${error} || Date: ${new Date()}`);

        }
        const options = {
            body: `New order! Username: ${req.body.username} Email: ${req.body.email} Address: ${req.body.address} Products: ${req.body.products} Total: ${req.body.total}`,
            to: 'whatsapp:+5491130284520',
            from: 'whatsapp:+14155238886',
        }
        try {
            const message = await client.messages.create(options);
            infoLogger.info(`Message sent: ${message.sid} || Date: ${new Date()}`);

        } catch (error) {
            console.log(error);
        }

    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    getOrders,
    postOrder,
    getOrderByUsername

}