function mostrarLista(lista = []) {
    if (lista.length === 0) return console.log("Lista vacía")
    for (const element of lista) console.log(element);
}

mostrarLista();

(function(lista = []) {
    if (lista.length === 0) return console.log("Lista vacía")
    for (const element of lista) console.log(element);
})([1, 2, 3, 4])

function crearMultiplicador(numeroBase) {
    return function(numeroAMultiplicar) {
        console.log(numeroBase * numeroAMultiplicar);
    }
}

let duplicador = crearMultiplicador(2);
let triplicador = crearMultiplicador(3);
let invertir = crearMultiplicador(-1);
duplicador(6);


// CLASES (es un molde )

class Cliente {
    constructor(name, fecha, direccion) {
        this.name = name;
        this.fecha = fecha;
        this.direccion = direccion;
    }
    comprar() {
        console.log("estoy comprando");
    }
    levantarQueja() {
        console.log(`Yo, ${this.name}, me estoy quejando`);
    }
}

let cliente1 = new Cliente("Marco", 2132211, "asasasas");
let cliente2 = new Cliente("Jose", 234321, "dasdasdas");

cliente1.levantarQueja();
cliente2.levantarQueja();