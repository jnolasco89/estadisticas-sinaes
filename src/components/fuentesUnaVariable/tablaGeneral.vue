<template>
  <div class="tabla-general">
    <div class="contenedor">
      <!-- *********** HEADER TABLA *********** -->
      <div class="fila-header-zona">
        <div class="col-graficos">Departamento</div>
        <div class="col-datos">
          <div class="fila-anio">
            <div class="col-anio">Anio</div>
            <div class="col-cantidad-porcentaje">
              <div class="fila-cantidad">
                <div
                  v-for="grupo in grupos"
                  v-bind:key="`header-grupo-${grupo.id}`"
                  v-bind:style="{width:anchoColSubgrupo*(grupo.subgrupos.length==0?1:1+grupo.subgrupos.length)+'%'}"
                >{{grupo.nombre}}</div>
                <div v-bind:style="{width:anchoColSubgrupo+'%'}">Total</div>
              </div>
              <div class="fila-cantidad">
                <template v-for="(grupo,index) in grupos">
                  <div
                    v-if="grupo.subgrupos.length==0"
                    v-bind:key="`header-subgrupo-${grupo.id}-${index}`"
                    v-bind:style="{width:anchoColSubgrupo+'%'}"
                  ></div>
                  <template v-else v-for="(subgrupo,indexSubgrupo) in grupo.subgrupos">
                    <div
                      v-bind:key="`header-grupo-${grupo.id}-${index}-${subgrupo.id}`"
                      v-bind:style="{width:anchoColSubgrupo+'%'}"
                    >{{subgrupo.nombre}}</div>
                    <div
                      v-if="indexSubgrupo== grupo.subgrupos.length-1"
                      v-bind:key="`header-total-grupo-${grupo.id}-${index}-${subgrupo.id}`"
                      v-bind:style="{width:anchoColSubgrupo+'%'}"
                    >Total</div>
                  </template>
                </template>
                <!-- columna de total de grupos-->
                <!-- Debe ser vacia para rellenar la tabla de divs -->
                <div v-bind:style="{width:anchoColSubgrupo+'%'}"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- *********** BODY TABLA *********** -->
      <div class="fila-zona" v-for="zona in zonasAmostrar" v-bind:key="zona.idNumerico">
        <div class="fila-zona-datos-anios">
          <div class="col-graficos">
            <h2>{{zona.idCadena}}-{{zona.nombre}}</h2>
            <graficas-tabla-general
              v-bind:series-categorias="zona.graficasSinSubtemas"
            ></graficas-tabla-general>
          </div>
          <div class="col-datos">
            <div
              class="fila-anio"
              v-for="anio in zona.anios"
              v-bind:key="`${zona.idNumerico}-${anio.anio}`"
            >
              <div class="col-anio">{{anio.anio}}</div>
              <div class="col-cantidad-porcentaje">
                <div class="fila-cantidad">
                  <!-- Columnas cantidades subgrupos anio -->
                  <template v-for="(resumen,index) in anio.resumenSubtemas">
                    <div
                      v-if="resumen.subgrupos.length==0"
                      v-bind:style="{width:anchoColSubgrupo+'%'}"
                      v-bind:key="`cantidad-${zona.idNumerico}-${anio.anio}-${resumen.id}-${index}`"
                    >{{resumen.cantidad | cantidad}}</div>
                    <template v-else v-for="(subgrupo,index) in resumen.subgrupos">
                      <div
                        v-bind:style="{width:anchoColSubgrupo+'%'}"
                        v-bind:key="`cantidad-${zona.idNumerico}-${anio.anio}-${resumen.id}-${subgrupo.id}-${index}`"
                      >{{subgrupo.cantidad | cantidad}}</div>
                      <div
                        class="celda-total"
                        v-if="index== resumen.subgrupos.length-1"
                        v-bind:key="`cantidad-${zona.idNumerico}-${anio.anio}-${resumen.id}-${subgrupo.id}-${index}-totalCantidad`"
                        v-bind:style="{width:anchoColSubgrupo+'%'}"
                      >{{resumen.cantidad | cantidad}}</div>
                    </template>
                  </template>
                  <!-- Columna porcentaje total anio -->
                  <div
                    class="celda-total"
                    v-bind:style="{width:anchoColSubgrupo+'%'}"
                  >{{anio.total | cantidad}}</div>
                </div>
                <div class="fila-porcentaje">
                  <!-- Columnas porcentajes subgrupos anio -->
                  <template v-for="(resumen,index) in anio.resumenSubtemas">
                    <div
                      v-if="resumen.subgrupos.length==0"
                      v-bind:style="{width:anchoColSubgrupo+'%'}"
                      v-bind:key="`porcentaje-${zona.idNumerico}-${anio.anio}-${resumen.id}-${index}`"
                    >{{resumen.porcentaje | porcentaje}}</div>
                    <template v-else v-for="(subgrupo,index) in resumen.subgrupos">
                      <div
                        v-bind:style="{width:anchoColSubgrupo+'%'}"
                        v-bind:key="`porcentaje-${zona.idNumerico}-${anio.anio}-${resumen.id}-${subgrupo.id}-${index}`"
                      >{{subgrupo.porcentaje | porcentaje}}</div>
                      <div
                        class="celda-total"
                        v-if="index== resumen.subgrupos.length-1"
                        v-bind:key="`porcentaje-${zona.idNumerico}-${anio.anio}-${resumen.id}-${index}-totalPorcentaje`"
                        v-bind:style="{width:anchoColSubgrupo+'%'}"
                      >{{resumen.porcentaje | porcentaje}}</div>
                    </template>
                  </template>
                  <!-- Columna cantidad total anio -->
                  <div
                    class="celda-total"
                    v-bind:style="{width:anchoColSubgrupo+'%'}"
                  >{{anio.total | porcentaje}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="fila-zona-datos-anios">
          <div class="col-graficos total-resaltado">Total</div>
          <div class="col-datos">
            <div class="fila-anio">
              <div class="col-anio total-resaltado"></div>

              <div class="col-cantidad-porcentaje">
                <div class="fila-cantidad">
                  <!-- Columnas cantidades subgrupos anio -->
                  <template v-for="(resumen,index) in zona.resumenAnios">
                    <div
                      v-if="resumen.subgrupos.length==0"
                      v-bind:style="{width:anchoColSubgrupo+'%'}"
                      v-bind:key="`cantidad-${zona.idNumerico}-${resumen.id}-${index}`"
                      class="total-resaltado"
                    >{{resumen.cantidad | cantidad}}</div>
                    <template v-else v-for="(subgrupo,index) in resumen.subgrupos">
                      <div
                        v-bind:style="{width:anchoColSubgrupo+'%'}"
                        v-bind:key="`cantidad-${zona.idNumerico}-${resumen.id}-${subgrupo.id}-${index}`"
                        class="total-resaltado"
                      >{{subgrupo.cantidad | cantidad}}</div>
                      <div
                        class="celda-total total-resaltado"
                        v-if="index== resumen.subgrupos.length-1"
                        v-bind:key="`cantidad-${zona.idNumerico}-${resumen.id}-${subgrupo.id}-${index}-totalCantidad`"
                        v-bind:style="{width:anchoColSubgrupo+'%'}"
                      >{{resumen.cantidad | cantidad}}</div>
                    </template>
                  </template>
                  <!-- Columna porcentaje total anio -->
                  <div class="celda-total total-resaltado" v-bind:style="{width:anchoColSubgrupo+'%'}">Total</div>
                </div>
                <div class="fila-porcentaje">
                  <!-- Columnas porcentajes subgrupos anio -->
                  <template v-for="(resumen,index) in zona.resumenAnios">
                    <div
                      v-if="resumen.subgrupos.length==0"
                      v-bind:style="{width:anchoColSubgrupo+'%'}"
                      v-bind:key="`porcentaje-${zona.idNumerico}-${resumen.id}-${index}`"
                      class="total-zona total-resaltado"
                    >{{resumen.porcentaje | porcentaje}}</div>
                    <template v-else v-for="(subgrupo,index) in resumen.subgrupos">
                      <div
                        v-bind:style="{width:anchoColSubgrupo+'%'}"
                        v-bind:key="`porcentaje-${zona.idNumerico}-${resumen.id}-${subgrupo.id}-${index}`"
                        class="total-resaltado"
                      >{{subgrupo.porcentaje | porcentaje}}</div>
                      <div
                        class="celda-total total-resaltado"
                        v-if="index== resumen.subgrupos.length-1"
                        v-bind:key="`porcentaje-${zona.idNumerico}-${resumen.id}-${index}-totalPorcentaje`"
                        v-bind:style="{width:anchoColSubgrupo+'%'}"
                      >{{resumen.porcentaje | porcentaje}}</div>
                    </template>
                  </template>
                  <!-- Columna cantidad total anio -->
                  <div
                    class="celda-total total-resaltado"
                    v-bind:style="{width:anchoColSubgrupo+'%'}"
                  >Total2</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- *********** LOADER *********** -->
    <loader @intersect="filtrarZonas" v-if="verLoader"></loader>
  </div>
</template>
<script>
import Loader from "./loader";
import graficasTablaGeneral from "./graficasTablaGeneral";
import numeral from 'numeral';

export default {
  name: "tablaGeneral",
  props: ["grupos", "zonas", "totalGeneral"],
  components: {
    Loader,
    graficasTablaGeneral
  },
  filters:{
    porcentaje:function(value){
      return value.toFixed(2)+"%";
    },
    cantidad:function(value){
      return numeral(value).format('0,0');
    }
  },
  mounted() {
    this.filtrarZonas();
    this.calcularAnchoColSubgrupo();
  },
  data() {
    return {
      incremento: 5,
      zonasAmostrar: [],
      verLoader: true,
      anchoColSubgrupo: 0,
      datosGrafico: null
    };
  },
  methods: {
    filtrarZonas: function() {
      if (this.zonas.length - this.zonasAmostrar <= 0) {
        this.zonasAmostrar = this.zonas.slice(0, this.zonas.length);
      } else {
        this.zonasAmostrar = this.zonas.slice(
          0,
          this.zonasAmostrar.length + this.incremento
        );
      }

      if (this.zonas.length == this.zonasAmostrar.length) {
        this.verLoader = false;
      }
    },
    calcularAnchoColSubgrupo: function() {
      let contadorSubgrupos = 0;
      let columnasTotal = 1; //Se inicia a 1 tomando en cuenta la columna de total general

      this.grupos.forEach(g => {
        if (g.subgrupos.length == 0) {
          contadorSubgrupos++;
        } else {
          contadorSubgrupos += g.subgrupos.length;
          columnasTotal++;
        }
      });
      //this.anchoColSubgrupo = 100 / contadorSubgrupos;
      this.anchoColSubgrupo = 100 / (contadorSubgrupos + columnasTotal);
    },
    procesarSerie: function(index, grupo, series) {
      if (index == 0) {
        series.push({
          id: grupo.id,
          name: grupo.nombre,
          data: [grupo.cantidad]
        });
      } else {
        series.forEach(s => {
          if (s.id == grupo.id) {
            s.data.push(grupo.cantidad);
          }
        });
      }
    },
    crearCategoriasYSeriesGraficaBarras: function(anios) {
      let arrAnios = [];
      let seriesHorizontalBar = [];
      let seriesLineBar = [];

      anios.forEach((anio, indexAnio) => {
        arrAnios.push(anio.anio);

        //Para las series de la grafica de linea
        //Para total NNA por anio
        seriesLineBar.push(anio.total);

        //Para las series de la grafica de barra
        anio.resumenSubtemas.forEach(grupo => {
          if (grupo.subgrupos.length == 0) {
            this.procesarSerie(indexAnio, grupo, seriesHorizontalBar);
          } else {
            grupo.subgrupos.forEach(subgrupo => {
              this.procesarSerie(indexAnio, subgrupo, seriesHorizontalBar);
            });
          }
        });
      });

      return {
        categorias: arrAnios,
        seriesHorizontalBarChart: seriesHorizontalBar,
        seriesLineBarChart: [
          {
            name: "NNA",
            data: seriesLineBar
          }
        ]
      };
    }
  }
};
</script>
<style>
.tabla-general {
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
}

.celda-total {
  background: #c4ffc4;
}
/* ====================================== */
.fila-header-zona {
  width: 100%;
  display: flex;
}

.fila-zona {
  width: 100%;
  display: grid;
}

.fila-zona-datos-anios {
  display: flex;
  width: 100%;
}

.fila-zona-total-anios {
  width: 100%;
}

/*
.col-texto-total{
  */
/* width: 40%;/* 40% del ancho de la columna de graficos + 7% de ancho la columna de anio */
/*
}
*/
.col-graficos {
  width: 40%;
}

.col-datos {
  width: 60%;
  display: grid;
  font-size: 12px;
}

.fila-anio {
  display: flex;
  border-bottom: solid 2px #ddd;
}

.col-anio {
  width: 7%;
  font-weight: bold;
}

.col-cantidad-porcentaje {
  width: 93%;
  display: grid;
}

.fila-cantidad {
  display: flex;
  font-weight: bold;
  border-bottom: solid 1px #ddd;
}

.fila-porcentaje {
  display: flex;
}

.total-resaltado{
  background:#CECECE;
  border-bottom: solid 2px #959595 !important;
  font-weight: bold;
}
</style>