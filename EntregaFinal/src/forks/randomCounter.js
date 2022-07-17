const service = require('../services/fork');

process.on('message', msg => {
    const { cant } = msg;

    const result = service.countGenerateRandomNumbers(cant);
    process.send({ result });
});