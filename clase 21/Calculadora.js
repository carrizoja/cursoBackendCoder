class Calculadora {
    // Funcionalidad de Suma

    static sumar(a, b) {
        // refactoring code
        if (!a || !b) return console.log("Faltan parámetros");
        if (!Number.isInteger(a) || !Number.isInteger(b)) {
            return console.log("Los parámetros deben ser números enteros");
        }
        console.log(a + b);

        /*    if ((!a) || (!b)) {
               return console.log("Faltan parámetros");
           } else {
               if (!Number.isInteger(a) || !Number.isInteger(b)) {
                   return console.log("Los parámetros deben ser números enteros");
               } else {
                   let result = a + b;
                   console.log("El resultado de la suma es: " + result);
               }
           } */
    }
}
Calculadora.sumar(2, 4);


// Que la función viva dentro de una clase
// Que el método exista
// Que reciba dos argumentos
// El método solo debe recibit enteros
// El método debe realizar la suma correctamente