<template>
  <v-container grid-list-md>
    <v-layout align-center justify-space-between row>
      
      <v-flex md6 lg6 xl6>
        <mapa-interactivo></mapa-interactivo>
        <!--
        <v-container fluid>
          <v-layout row>
            <v-flex xs12>
              <v-card dark flat color="red lighten-1">
                <mapa-interactivo></mapa-interactivo>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        -->
      </v-flex>
      
      <v-flex md6 lg6 xl6>
        <v-container fluid>
          <v-layout row align-center justify-center>
            <v-flex xs4 order-md1>
               <doughnut-chart 
               :chartdata="chartdata" 
               :options="options" 
               ></doughnut-chart>
            </v-flex>
            <v-flex xs4 order-md2>
              <doughnut-chart 
               :chartdata="chartdata" 
               :options="options" 
               ></doughnut-chart>
            </v-flex>
            <v-flex xs4 order-md3>
              <doughnut-chart 
               :chartdata="chartdata" 
               :options="options" 
               ></doughnut-chart>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs6 order-md1>
              <doughnut-chart 
               :chartdata="chartdata" 
               :options="options" 
               ></doughnut-chart>
            </v-flex>
            <v-flex xs6 order-md2>
              <doughnut-chart 
               :chartdata="chartdata" 
               :options="options" 
               ></doughnut-chart>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Consultas from '../../servicios/consultas'
import DoughnutChart from '../Graficos/doughnut'

const consultas=new Consultas();
var data=consultas.getDataDonut();

export default {
  name: "mapaFuentes",
  components:{
      DoughnutChart
  },
  data() {
    return {
      cantidadDeAnios: 5,
      chartdata:data.chartdata,
      options:data.options
    };
  }
};
</script>
<style>
canvas{
    width: 150px;
    height: 150px;
    margin: 0 auto;
}
</style>
