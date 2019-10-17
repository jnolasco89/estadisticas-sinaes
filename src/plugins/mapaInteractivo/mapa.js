import Escala from './escala.js'

export default class Mapa {

    constructor(idLienzo, idContenedorMapa) {
        this.idLienzo = idLienzo;
        this.idContenedorMapa = idContenedorMapa;
        this.idSvg = "svg_mapa_dinamico";
        this.nivelGeografico = 1;
        this.etiquetasPath = true;
        this.matrizIni = [1, 0, 0, 1, 0, 0];
        this.idFondo = "FONDO";
        this.idViewBox = "grupMapa";
        this.verEtiquetas = false;
        this.permitirZoom = false;
        this.permitirArrastre = false;
    }

    ini() {
        //Configurando las dimensiones para el mapa-----
            
            document.getElementById(this.idSvg).setAttribute("style", "width:100%;height:100%;");
            this.pintar();
            this.iniEventosDeTransformacion();
            this.escala = new Escala("lienzo-escala", "escala_svg", 5, ["yellow", "green", "red", "black", "grey", "green"]);
       
    }

    pintar() {
        //var svg = document.getElementById(this.idSvg).contentDocument;
        var svg = document.getElementById(this.idSvg).contentDocument.activeElement;
        svg.getElementById(this.idFondo).setAttribute("style", "fill:white!important;");

        var iniSelector;
        if (this.nivelGeografico === 1) {
            iniSelector = 'DEP_';
        } else {
            iniSelector = 'MUN_';
        }

        //Primero se le da a la zona el color  correspondiente a cantidad=0, esto es debido a que como hay
        //Zonas que no aparecen en la lista de datosPorAreaGeo, entonces x esta razon son valor cero,
        //pero al no aparecer en la lista,no entran ni en el if de cantidad===0 y no pinta con el color
        //Para valores igual a cero. Por esta razon todas las zonas se colorean con valor cero y se les
        //asigna cantidad=0.
        var paths = svg.querySelectorAll('path[id^="' + iniSelector + '"]');
        var self = this;
        paths.forEach(path => {
            path.setAttribute('style', 'fill: #35AD73');
            path.setAttribute('data-cantidad', 0);
            path.setAttribute('data-colorZona', '#35AD73');

            if (self.verEtiquetas) {
                this.crearEtiquetaEnPath(path);
            }

            path.onmousemove = function (ev) {
                /*
                //Este codigo lo utilizaba cuando probe el componente
                //solo. Pero ya dentro de otro componente, agarra las
                //coordenadas svg, por eso el codigo se comentó.

                var tooltip = document.getElementById("tooltip-mapa");

                var x = ev.pageX + document.getElementById(self.idLienzo).offsetLeft;
                var y = ev.pageY + document.getElementById(self.idLienzo).offsetTop;
                
                var html = "Texto aquí.";

                tooltip.querySelector(".cuerpoToolTip").innerHTML = html;

                //tooltip.style.display="block";
                tooltip.style.left = (x + 5) + "px";
                tooltip.style.top = (y - tooltip.offsetHeight - 10) + "px";
                */
               var tooltip = document.getElementById("tooltip-mapa");

               var x = ev.pageX;
               var y = ev.pageY;
               
               var html = "Texto aquí.";

               tooltip.querySelector(".cuerpoToolTip").innerHTML = html;

               //tooltip.style.display="block";
               tooltip.style.left = (x + 5) + "px";
               tooltip.style.top = (y - tooltip.offsetHeight - 10) + "px";
            };

            path.onmouseenter = function () {
                path.setAttribute("style", "fill:#00AEEF");
            }

            path.onmouseleave = function () {
                var color = path.getAttribute('data-colorZona');
                path.setAttribute("style", "fill:" + color);
            }
        });
    }

    crearEtiquetaEnPath(path) {
        var svg = document.getElementById(this.idSvg).contentDocument.activeElement;
        /*----------------------------------------------------------------------------------------
        * CODIGO PARA UBICAR LA ETIQUETA EN EL CENTRO DE CADA PATH(ZONA GEOGRAFICA) DEL SVG(MAPA)
        -----------------------------------------------------------------------------------------*/
        //Paso 1:
        //Como primer paso se obtienen las cajas que contienen tanto al path de la zona geografica
        //asi como tambien la caja que contiene a la etiqueta que sera colocada.
        //El método getBoundingClientRect() obtiene la caja que se forma al rededor de cada path
        //o figura dentro de un svg. Ademas tambien se obtiene el objeto svg donde se dibujaran las
        //etiquetas.

        //Obteniendo la caja o rectangulo contenedor del path
        //y sus propiedades x,y.ancho y alto
        var cajaPath = path.getBoundingClientRect();
        var xCajaPath = cajaPath.left;
        var yCajaPath = cajaPath.top;
        var anchoCajaPath = cajaPath.width;
        var largoCajaPath = cajaPath.height;

        //Obteniendo las coordenadas relativas al svg
        var puntoNuevo = this.coordenadasScreenAsvg(xCajaPath + (anchoCajaPath / 2), yCajaPath + (largoCajaPath / 2));

        //Creando la etiqueta de texto
        var cajaDeTexto = document.createElementNS("http://www.w3.org/2000/svg", "text");
        cajaDeTexto.setAttribute("x", puntoNuevo.x);
        cajaDeTexto.setAttribute("y", puntoNuevo.y);

        var idPath = path.getAttribute("id");
        var idEtiqueta = "ETIQUETA_";
        if (idPath == null ? false : idPath.length > 0) {
            idEtiqueta += idPath;
        } else {
            //Genera un numero random entre 1 y 1000
            var numRandom = Math.floor((Math.random() * 1000) + 1);
            idEtiqueta += numRandom;
        }

        cajaDeTexto.setAttribute("id", idEtiqueta);
        var textoCaja = document.createTextNode("Prueba de texto");
        cajaDeTexto.appendChild(textoCaja);

        //Agregando la etiquet al SVG
        svg.getElementById(this.idViewBox).appendChild(cajaDeTexto);

        //Despues de agregar las etiquetas se proceda a centrar
        //dichas etiquetas
        var etiqueta = svg.querySelector("#" + idEtiqueta);
        var rectEtiqueta = etiqueta.getBoundingClientRect();
        puntoNuevo = this.coordenadasScreenAsvg(rectEtiqueta.left - (rectEtiqueta.width / 2), rectEtiqueta.top);
        etiqueta.setAttribute("x", puntoNuevo.x);
    }

    iniEventosDeTransformacion() {
        var svg = document.getElementById(this.idSvg).contentDocument.activeElement;

        var self = this;

        //Evento para mouse wheel para ampliar o reducir el mapa
        //El evento "wheel" esta soportado para los siguientes navegadores
        //Chrome 31.0+, ie 9.0+, Firefox 17.0+, Zafari(No soportado), Opera 18.0+
        if (this.permitirZoom) {
            svg.addEventListener("wheel", function (e) {
                e.preventDefault();
                if (e.deltaY < 0) {
                    self.ampliarOreducirZoom(1, e.pageX, e.pageY);
                } else {
                    self.ampliarOreducirZoom(-1, e.pageX, e.pageY);
                }
            });
        }


        //Evento para arrastrar el mapa
        var isDragging = false;//Variable logica que indica si se esta o no arrastrando el mapa
        var lastX, lastY = 0;//Indica la ultima coordenada previa al movimiento del puntero en el SVG
        if (this.permitirArrastre) {
            svg.onmousemove = function (ev) {
                //Se obtiene las coordenadas depantalla y se asignan a las variables globales
                var xPantalla = ev.clientX;
                var yPantalla = ev.clientY;

                //Las coordenadas de pantalla son convertidas en coordenadas SVG
                var xSVG = self.coordenadasScreenAsvg(xPantalla, yPantalla).x;
                var ySVG = self.coordenadasScreenAsvg(xPantalla, yPantalla).y;

                //Si se esta arrastrando el mapa se procede a mover el plano para desplazar el mapa
                if (isDragging) {
                    /*
                    Este codigo se puede utilizar para saber hacia que direccion se esta desplazando el mapa:
                
                        if (lastX < xSVG) {//Moviendoce a la derecha
                            ---- Codigo a ejecutar ----
                        } else {//Moviendose a la izquierda
                            ---- Codigo a ejecutar ----
                        }
                    */
                    //Se calcula la traslacion que se debe realizar en el eje X
                    var traslacionX = xSVG - lastX;

                    //Se calcula la traslacion que se debe realizae en el eje Y
                    var traslacionY = ySVG - lastY;

                    //Metodo que se utiliza para ralizar la traslacion del plano
                    self.arrastrarMapa(traslacionX, traslacionY);
                }

                //Se obtiene las ultimas coordenadas X y Y , para luego utilizarlas con las coordenadas X y Y actuales
                //y calcular el desplazamiento que se realizará.
                lastX = self.coordenadasScreenAsvg(ev.clientX, ev.clientY).x;
                lastY = self.coordenadasScreenAsvg(ev.clientX, ev.clientY).y;
            };
            svg.onmousedown = function () {
                isDragging = true;
            }
            svg.onmouseup = function () {
                isDragging = false;
            }
        }
    }

    //Esta función convierte coordenadas de pantalla en coordenada SVG
    //retorna un punto con las coordenadas convertidas.
    coordenadasScreenAsvg(xPantalla, yPantalla) {
        var svg = document.getElementById(this.idSvg).contentDocument.activeElement;
        var punto = svg.createSVGPoint();//Se crea el punto
        punto.x = xPantalla;
        punto.y = yPantalla;
        var ctm = svg.getScreenCTM().inverse();
        punto = punto.matrixTransform(ctm);

        return punto;
    }

    coordenadasSVGaScreen(xSvg, ySvg) {
        var svg = document.getElementById(this.idSvg).contentDocument.activeElement;
        var punto = svg.createSVGPoint();//Se crea el punto
        punto.x = xSvg;
        punto.y = ySvg;
        var ctm = svg.getScreenCTM();
        punto = punto.matrixTransform(ctm);

        return punto;
    }

    ampliarOreducirZoom(ampliarOreducir, coordenadaX, coordenadaY) {
        /*----------------------------------------------------------------------------------------
                                CODIGO PARA REALIZAR ZOOM EN EL MAPA
        -----------------------------------------------------------------------------------------*/
        //Para poder realizar zoom de un manera correcta hay que realizar dos transformaciones
        //al grupo de elementos que se desea ampliar o reducir, estas transformaciones son:
        //Escalado: que sirve para ampliar o reducir el grupo de elementos.
        //Traslacion: se debe trasladar el plano para que al momento de aumentar o reducir
        //el zoom esto se hace en torno al par de coordenada X Y que marca el puntero dentro
        //del SVG esto es asi si realiza por medio del scroll la ampliacion o reduccion, si
        //esta se realiza por medio de los controles de zoom la coordenada X Y en torno a la que se
        //realizara el zoom sera el centro del SVG.

        //PASO 1:
        //Se almacenan las transfromaciones que el plano a sufrido previamente ya que seran utilizadas
        //para el calculo de las nuevas transformaciones.
        var factorAnteriorX = this.matrizIni[0];//El factor de escalado anterior en X
        var factorAnteriorY = this.matrizIni[3];//El factor de escalado anterior en Y
        var trasAntX = this.matrizIni[4];//La traslacion anterior del plano en X
        var trasAntY = this.matrizIni[5];//La traslacion anterior del plano en Y

        //PASO 2:
        //Verificar si lo que se desea hacer es aumentar o reducir el zoom.  Aqui es donde
        //se le suma o resta al factor de ampliacion para obtener el nuevo valor para realizar
        //el zoom.
        //La variable "ampliarOreducir" puede tener el valor de 1 o -1.
        //Cuando contiene el valor de 1 indica que se esta realizando una ampliación.
        //Cuando contiene el valor de -1 indica que se esta realizando una reducción.
        if (ampliarOreducir === 1) {
            this.matrizIni[0] += 0.25;
            this.matrizIni[3] += 0.25;
        } else {
            if ((this.matrizIni[0] - 0.25) > 0 && (this.matrizIni[3] - 0.25) > 0) {
                this.matrizIni[0] -= 0.25;
                this.matrizIni[3] -= 0.25;
            }
        }


        //PASO 3:
        //CAlcular la traslacion que se debe realizar al plano de coordenadas.
        //Calculando la traslacion del plano por medio de la formula:
        // Tx = Px - Znx((Px - Tax)/Zax)
        // Ty = Py - Zny((Py - Tay)/Zay)
        //
        //Donde Tx es la traslación en X, Ty es la traslación en Y, Px es la coordenada SVG que marca 
        //el puntero en X es equivalente a la variable xSVG, Znx es el factor de escalado nuevo o actual,
        //Tax es la traslación anterior que se sufrio el plano en el eje X, Zax es el factor de escalado
        //anterior el que sufrio el plano antes. Esto mismo aplica para la segunda formula solo que en el
        //eje Y.
        var xTraslacionPlano = coordenadaX - this.matrizIni[0] * ((coordenadaX - trasAntX) / factorAnteriorX);
        var yTraslacionPlano = coordenadaY - this.matrizIni[3] * ((coordenadaY - trasAntY) / factorAnteriorY);

        //Almacenando la traslación del plano en la matrizIni
        this.matrizIni[4] = xTraslacionPlano;
        this.matrizIni[5] = yTraslacionPlano;

        //PASO 4:
        //Realizar la transformación
        /*
                El método matrix es una combinación de los métodos de traslación, de escalado y de sesgado.
                Tiene seis parámetros o números dentro del paréntesis.
                transform="matrix(a,b,c,d,e,f)"
                - Los dos últimos parámetros actúan igual que el método translate de forma que "e" y "f" 
                  indican el desplazamiento en los ejes "x" e "y" respectivamente.
                - Los parámetros primero y cuarto actúan igual que el método scale de forma que el parámetro 
                  "a" hace un escalado en el eje "x", y el parámetro "d" hace un escalado en el eje "y".
                - Los parámetros segundo y tercero actúan como los métodos skew(SESGADO). Aquí el número que debemos 
                  indicar no es el número de grados del ángulo sino su tangente. 
                  El parámetro "b" inclina el eje "x" un angulo cuya tangente es la indicada. El parámetro 
                  "c" hace lo mismo con el eje "y". 
                  
                 transform="matrix(escaladoX, sesgadoX ,sesgadoY ,escaladoY ,desplazamientoX ,desplazamientoY)"  
               */

        //Aplicando la transformacion a los elementos SVG deseados
        var svg = document.getElementById(this.idSvg).contentDocument.activeElement;
        var vb = svg.getElementById(this.idViewBox);
        vb.setAttribute('transform', 'matrix(' + this.matrizIni[0] + ',0,0,' + this.matrizIni[3] + ',' + this.matrizIni[4] + ',' + this.matrizIni[5] + ')');
        //document.getElementById("grupMapa").setAttribute('transform','matrix(' + matrizIni[0] + ',0,0,' + matrizIni[3] + ',' + matrizIni[4] + ',' + matrizIni[5] + ')');
        //$('#' + idViewBox).attr('transform', 'matrix(' + matrizIni[0] + ',0,0,' + matrizIni[3] + ',' + matrizIni[4] + ',' + matrizIni[5] + ')');

    }

    arrastrarMapa(traslacionX, traslacionY) {
        //Sumando la traslacion en X
        this.matrizIni[4] += traslacionX;

        //Sumando la traslacion en Y
        this.matrizIni[5] += traslacionY;

        //Se realiza la transformacion al area SVG indicada
        var svg = document.getElementById(this.idSvg).contentDocument.activeElement;
        var vb = svg.getElementById(this.idViewBox);
        vb.setAttribute('transform', 'matrix(' + this.matrizIni[0] + ',0,0,' + this.matrizIni[3] + ',' + this.matrizIni[4] + ',' + this.matrizIni[5] + ')');
    }

    resetZoomYtraslacion() {
        this.matrizIni = [1, 0, 0, 1, 0, 0];
        //Se realiza la transformacion al area SVG indicada
        var svg = document.getElementById(this.idSvg).contentDocument.activeElement;
        var vb = svg.getElementById(this.idViewBox);
        vb.setAttribute('transform', 'matrix(' + matrizIni[0] + ',0,0,' + matrizIni[3] + ',' + matrizIni[4] + ',' + matrizIni[5] + ')');
    }
}