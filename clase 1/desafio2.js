class Contador {
    constructor(responsable) {
        this.responsable = responsable;
        this.contador = 0;
    }
    static contadorGeneral = 0; //entre instancias de esa clase se van a poder compartir 
    obtenerResponsable() {
        console.log(this.responsable);
    }
    obtenerCuentaIndividual() {
        console.log(this.contador)
    }
    obtenerCuentaGlobal() {
        console.log(Contador.contadorGeneral);
    }
    contar() {
        this.contador++;
        Contador.contadorGeneral++;
    }
}

let contador1 = new Contador("Lucas");
let contador2 = new Contador("David");

contador1.obtenerResponsable();
contador2.obtenerResponsable();

contador1.obtenerCuentaIndividual();
contador2.obtenerCuentaIndividual();

contador1.contar();
