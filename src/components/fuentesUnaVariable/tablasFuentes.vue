<template>
  <v-container fluid>
    <v-layout justify-center align-content-space-between row>
      <v-flex md12 lg12 xl12>
        <v-tabs v-model="tab" color="default">
          <v-tabs-slider color="blue"></v-tabs-slider>

          <v-tab href="#tab-1" class="primary-text">
            <v-icon>library_books</v-icon>Resumen
          </v-tab>
          <v-tab href="#tab-2" class="primary-text">
            <v-icon>library_books</v-icon>Datos Generales
          </v-tab>
          <v-tab href="#tab-3" class="primary-text">
            <v-icon>library_books</v-icon>Datos Especificos
          </v-tab>

          <v-tab-item value="tab-1">
            <v-simple-table dense style="border:solid 1px black;">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th :rowspan="rowspan">{{cabeceraZonaGeo}}</th>
                    <th :rowspan="rowspan">Año</th>
                    <th
                      v-for="grupo in grupos"
                      :key="grupo.nombre"
                      :colspan="grupo.subgrupos.length"
                      :rowspan="calcularRowSpan(grupo)"
                    >{{grupo.nombre}}</th>
                  </tr>
                  <tr>
                    <template v-for="grupo in grupos">
                      <template v-for="(variable, index) in grupo.subgrupos">
                        <th
                          v-if="mostrarVariables(grupo)"
                          :key="`th-tbgral-${grupo.id}-${index}`"
                        >{{variable.nombre}}</th>
                      </template>
                    </template>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="zona in zonas">
                    <template v-for="(anio,index) in zona.anios">
                      <!-- Fila para nombre zona y cantidades-->
                      <tr v-bind:key="`tr-tbgral-zona-cantidad-${zona.idNumerico}-${anio.anio}`">
                        <td :rowspan="zona.anios.length*2" v-if="index==0">{{zona.nombre}}</td>
                        <td rowspan="2">
                          {{anio.anio}}
                          <vertical-bar-chart></vertical-bar-chart>
                        </td>
                        <template v-for="(resumen,index) in anio.resumenSubtemas">
                          <td
                            v-if="resumen.subgrupos.length==0"
                            v-bind:key="`td-tbgral-cantidad-${zona.idNumerico}-${anio.anio}-${resumen.id}-${index}`"
                          >{{resumen.cantidad}}</td>
                          <template v-else v-for="subgrupo in resumen.subgrupos">
                            <td
                              v-bind:key="`td-tbgral-${zona.idNumerico}-${anio.anio}-${resumen.id}-${subgrupo.id}`"
                            >{{subgrupo.cantidad}}</td>
                          </template>
                        </template>
                      </tr>
                      <!-- Fila para porcentajes-->
                      <tr v-bind:key="`tr-tbgral-zona-porcentaje-${zona.idNumerico}-${anio.anio}`">
                        <template v-for="(resumen,index) in anio.resumenSubtemas">
                          <td
                            v-if="resumen.subgrupos.length==0"
                            v-bind:key="`td-tbgral-porcentaje-${zona.idNumerico}-${anio.anio}-${resumen.id}-${index}`"
                          >{{resumen.porcentaje}}</td>
                          <template v-else v-for="subgrupo in resumen.subgrupos">
                            <td
                              v-bind:key="`td-tbgral-${zona.idNumerico}-${anio.anio}-${resumen.id}-${subgrupo.id}`"
                            >{{subgrupo.porcentaje}}</td>
                          </template>
                        </template>
                      </tr>
                    </template>
                  </template>
                </tbody>
              </template>
            </v-simple-table>
          </v-tab-item>

          <v-tab-item value="tab-2">
            <template v-for="zona in zonas">
              <h2 v-bind:key="zona.id">{{zona.nombre}}</h2>
              <v-simple-table dense v-bind:key="zona.id">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th :rowspan="rowspan">Año</th>
                      <th :rowspan="rowspan">Subtema</th>
                      <th
                        v-for="grupo in grupos"
                        :key="grupo.nombre"
                        :colspan="grupo.subgrupos.length"
                        :rowspan="calcularRowSpan(grupo)"
                      >{{grupo.nombre}}</th>
                      <th :rowspan="rowspan">Total</th>
                    </tr>
                    <tr>
                      <template v-for="grupo in grupos">
                        <template v-for="(variable, index) in grupo.subgrupos">
                          <th
                            v-if="mostrarVariables(grupo)"
                            :key="`th-tbespec-${grupo.id}-${index}`"
                          >{{variable.nombre}}</th>
                        </template>
                      </template>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="anio in zona.anios">
                      <template v-for="(subtema,index) in anio.subtemas">
                        <tr
                          v-bind:key="`tr-tbespec-zona-cantidad-${zona.idNumerico}-${anio.anio}-${subtema.idNumerico}`"
                        >
                          <td :rowspan="anio.subtemas.length*2" v-if="index==0">{{anio.anio}}</td>
                          <td rowspan="2">{{subtema.nombre}}</td>
                          <template v-for="(grupo,index) in subtema.grupos">
                            <td
                              v-if="grupo.subgrupos.length==0"
                              v-bind:key="`td-tbespec-cantidad-${zona.idNumerico}-${anio.anio}-${subtema.idNumerico}-${grupo.id}-${index}`"
                            >{{grupo.cantidad}}</td>
                            <template v-else v-for="(subgrupo,index) in grupo.subgrupos">
                              <td
                                v-bind:key="`td-tbespec-cantidad-${zona.idNumerico}-${anio.anio}-${subtema.idNumerico}-${grupo.id}-${subgrupo.id}-${index}`"
                              >{{subgrupo.cantidad}}</td>
                            </template>
                          </template>
                          <td>{{subtema.total}}</td>
                        </tr>

                        <tr
                          v-bind:key="`tr-tbespec-zona-porcentaje-${zona.idNumerico}-${anio.anio}-${subtema.idNumerico}`"
                        >
                          <template v-for="(grupo,index) in subtema.grupos">
                            <td
                              v-if="grupo.subgrupos.length==0"
                              v-bind:key="`td-tbespec-porcentaje-${zona.idNumerico}-${anio.anio}-${subtema.idNumerico}-${grupo.id}-${index}`"
                            >{{grupo}}</td>
                            <template v-else v-for="(subgrupo,index) in grupo.subgrupos">
                              <td
                                v-bind:key="`td-tbespec-porcentaje-${zona.idNumerico}-${anio.anio}-${subtema.idNumerico}-${grupo.id}-${subgrupo.id}-${index}`"
                              >{{subgrupo}}</td>
                            </template>
                          </template>
                        </tr>
                      </template>
                    </template>
                  </tbody>
                </template>
              </v-simple-table>
            </template>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>
                
                <!--
                </tbody>
              </template>
            </v-simple-table>
          </v-tab-item>
          <v-tab-item value="tab-2">
            <v-card flat tile>
              <v-card-text>ASDASD</v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item value="tab-3">
            <v-card flat tile>
              <v-card-text>FFFF</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>-->
<script>
import Consultas from "../../servicios/consultas";
import VerticalBarChart from "../Graficos/vertical-bar-chart";
import DoughnutChart from "../Graficos/doughnutApexChart";

const consultas = new Consultas();
var data = consultas.getDataDonut();

export default {
  name: "tablasFuentes",
  props: ["data"],
  components: {
    VerticalBarChart,
    DoughnutChart
  },
  data() {
    return {
      chartdata: data.chartdata,
      options: data.options,
      tab: null,
      temporal: null
    };
  },
  methods: {
    getVariablesAnio: function(anio) {},
    calcularRowSpan: function(grupo) {
      let rowspan = 1;
      if (grupo.subgrupos.length == 1 && grupo.subgrupos[0].etiqueta == null) {
        rowspan = 2;
      }
      return rowspan;
    },
    mostrarVariables: function(grupo) {
      if (grupo.subgrupos.length == 1 && grupo.subgrupos[0].etiqueta == null) {
        return false;
      } else {
        return true;
      }
    },
    generarCeldasGrupo: function(grupos) {
      let cantidades = "",
        porcentajes = "";
      grupos.forEach(grupo => {
        grupo.subgrupos.forEach(subgrupo => {
          cantidades += "<td>" + subgrupo.cantidad + "</td>";
          porcentajes += "<td>" + subgrupo.porcentaje + "</td>";
        });
      });

      this.temporal = porcentajes;
      return cantidades;
    }
  },
  computed: {
    cabeceraZonaGeo: function() {
      if (this.$store.state.nivelGeografico == 1) {
        return "Departamento";
      } else {
        return "Municipio";
      }
    },
    grupos: function() {
      let grupos = this.data.grupos; //this.data[0].anios[0].subtemas[0].grupos; //.grupos[0].variables;
      return grupos;
    },
    zonas: function() {
      let zonas = this.data.zonas;
      return zonas;
    },
    rowspan: function() {
      let rowspan = 1;
      let grupos = this.data.grupos;
      for (let i = 0; i < grupos.length; i++) {
        if (grupos[i].id > 0 && grupos[i].subgrupos.length > 1) {
          rowspan = 2;
          break;
        }
      }

      return rowspan;
    }
  },
  mounted() {
    //this.procesarHeadersTabla();
  }
};
</script>
<style>
.v-tabs__item {
  text-transform: none !important;
}
</style>


