console.log(process.argv)

const arguments = process.argv.slice(2);
console.log(arguments)

const sum = arguments.reduce((acc, value) => acc + parseInt(value), 0);
console.log(sum);