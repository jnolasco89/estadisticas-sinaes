export default class Escala {
    constructor(idDivEscala, idSvgEscala, numeroDeIntervalos, coloresEscala) {
        this.idDivEscala = idDivEscala;
        this.idSvgEscala = idSvgEscala;
        this.numeroDeIntervalos = numeroDeIntervalos;
        this.coloresEscala = coloresEscala;

        this.escala = document.getElementById(this.idDivEscala).contentDocument.activeElement;
        this.dibujarIntervalos();
        this.calcularIntervalos(10);
    }

    calcularIntervalos(maximo) {
        var factor = 0;
        var baseNueve = 0;

        if (maximo > 1 && maximo < 999) {
            factor = 1;
            baseNueve = 0;
        } else if (maximo > 1000 && maximo < 9999) {
            factor = 10;
            baseNueve = 9;
        } else if (maximo > 10000 && maximo < 99999) {
            factor = 100;
            baseNueve = 99;
        } else if (maximo > 100000 && maximo < 999999) {
            factor = 1000;
            baseNueve = 999;
        } else if (maximo > 1000000 && maximo < 9999999) {
            factor = 10000;
            baseNueve = 9999;
        } else if (maximo > 10000000 && maximo < 99999999) {
            factor = 100000;
            baseNueve = 99999;
        }

        var inicioNum = Math.trunc(maximo / factor);
        var maxResul = inicioNum * factor;
        var res = maximo - maxResul;
        var sum = baseNueve - res;
        var valMax = maximo + sum;

        var rango = Math.round(valMax / (this.numeroDeIntervalos - 1));

        var intervalos = [];
        //***********************************************************
        for (var i = 0; i < this.numeroDeIntervalos; i++) {
            if (i === 0) {
                intervalos.push({
                    iniReal: 0,
                    finReal: 0,
                    iniAprox: 0,
                    finAprox: 0
                });
            } else {
                var multiplicador = (this.numeroDeIntervalos - 1) - i;

                if (i === 1) {
                    intervalos.push({
                        iniReal: 1,
                        finReal: valMax - (rango * multiplicador),
                        iniAprox: 1,
                        finAprox: Math.trunc((valMax - (rango * multiplicador)) / factor)
                    });
                } else {
                    intervalos.push({
                        iniReal: intervalos[i - 1].finReal + 1,
                        finReal: valMax - (rango * multiplicador),
                        iniAprox: Math.ceil((intervalos[i - 1].finReal + 1) / factor),
                        finAprox: Math.trunc((valMax - (rango * multiplicador)) / factor)
                    });
                }
            }
        }
        console.log(JSON.stringify(intervalos));
    }

    dibujarIntervalos() {
        //PASO 1:
        //Como primer paso se hace que el svg de la escala ocupe todo el contenedor.
        //Asignando el ancho al svg de la escala, se le asigna el ancho de todo el div
        this.escala.setAttribute('width', '100%');
        this.escala.setAttribute('height', '100%');

        //PASO 2:
        //Se obtiene el ancho del div que contiene a la escala y luego se hace que el viewbox
        //ocupe todo ese ancho.
        var anchoDivEscala = document.getElementById(this.idDivEscala).getBoundingClientRect().width, 
        altoDivEscala =document.getElementById(this.idDivEscala).height;
        this.escala.setAttribute('viewBox', '0 0 ' + anchoDivEscala + ' ' + altoDivEscala);

        //PASO 3:
        //Se hace que el fondo de la escala ocupe todo el contenedor también.
        this.escala.querySelector("#fondoEscala").setAttribute("width","100%");
        this.escala.querySelector("#fondoEscala").setAttribute('height', '100%');
        //$('#' + idSvgEscala + " .fondoEscala").attr('width', '100%').attr('height', '100%');

        //PASO 4:
        //Calculando el ancho de cada intervalo y asignandole ese ancho al intervalo que aparece
        //inicialmente en el svg y que despues sera clonado.
        var anchoIntervalos = anchoDivEscala / this.numeroDeIntervalos;
        var traslacionIntervalo = anchoIntervalos;
        var intervaloInicial =  this.escala.getElementById("intervaloEscala");
        intervaloInicial.querySelector("rect").setAttribute("width",anchoIntervalos+"px");

        //La cantidad de intervalos declaradas en la variable "numeroDeIntervalos" incluye tambien
        //un intervalo que representa "sin datos", por ejemplo si el usuario indica que desea 4 
        //intervalos, uno de esos seria o representaria "sin datos".

        for (var i = 0; i < this.numeroDeIntervalos; i++) {
            if (i === 0) {
                intervaloInicial.querySelector("rect").setAttribute('style', 'fill:' + this.coloresEscala[i]);
            } else {
                var clonIntervalo = intervaloInicial.cloneNode(true);
                clonIntervalo.querySelector("rect").setAttribute('transform', 'translate(' + traslacionIntervalo + ',' + 0 + ')');
                clonIntervalo.querySelector("rect").setAttribute('style', 'fill:' + this.coloresEscala[i]);
                this.escala.getElementById("contenedorIntervalos").append(clonIntervalo);
                traslacionIntervalo += anchoIntervalos;
            }
        }

    }
}
