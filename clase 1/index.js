console.log("Hola Mundo");

function suma(num1, num2) {
    return num1 + num2
}

let resultado1 = suma(1, 2)
console.log(resultado1)

let a = () => {
    const x = "Holaaa"
    console.log(x)
}

a()

//Función Closure

function gritarNombre(nombre) {
    const signos = "!!!!";
    return function() {
        console.log(`${nombre}${signos}`)
    }
}

const gritarAPedro = gritarNombre("Pedro");

gritarAPedro();



