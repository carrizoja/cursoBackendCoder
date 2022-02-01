const moment = require('moment');
let today = moment();
let birthday = moment('1982-09-24');

console.log(`hoy es ${today.format('DD/MM/YYYY')}`)
console.log(`Mi cumpleaños es ${birthday.format('DD/MM/YYYY')}`)
console.log(`Desde que nací, pasaron ${today.diff(birthday,'days')} días`);
console.log(`Desde que nací, pasaron ${today.diff(birthday,'years')} años`);