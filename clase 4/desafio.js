/* let obj = {};
for (i = 0; i < 10000; i++) {
    let random = Math.floor(Math.random() * 20 + 1)
    if (obj[random]) {
        obj[random]++
    } else {
        obj[random] = 1
    }
}


console.log(obj);
let suma = Object.values(obj).reduce((accumulator, current) => accumulator + current)
console.log(suma) */

const products = [
    { id: 1, name: 'Escuadra', price: 323.45 },
    { id: 2, name: 'Calculadora', price: 234.56 },
    { id: 3, name: 'Globo Terráqueo', price: 45.67 },
    { id: 4, name: 'Paleta Pintura', price: 456.78 },
    { id: 5, name: 'Reloj', price: 67.89 },
    { id: 6, name: 'Agenda', price: 78.90 }
]

let names = products.map(obj => obj.name).join(' , ')
console.log(names);

let total = products.reduce((accumulator, newObject) => accumulator + newObject.price, 0)
console.log(total)
let avg = total / products.length;
console.log(avg);

let min = products[0].price;
let max = products[0].price;

products.forEach(products => {
    if (products.price < min) {
        min = products.price
    }
    if (products.price > max) {
        max = products.price
    }
})

console.log(min);
console.log(max);

let sendObject = {
    names: names,
    total: total,
    avg: avg,
    min: min,
    max: max
}
console.log(sendObject)