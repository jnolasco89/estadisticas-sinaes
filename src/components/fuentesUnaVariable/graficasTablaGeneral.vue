<template>
  <div>
    <horizontal-bar-chart v-bind:categorias="categorias" v-bind:series="seriesHorizontalBarChart"></horizontal-bar-chart>
    <linear-bar-chart v-bind:categorias="categorias" v-bind:series="seriesLinearBarChart"></linear-bar-chart>
  </div>
</template>
<script>
import HorizontalBarChart from "../Graficos/horizontal-bar-chart";
import LinearBarChart from "../Graficos/linear-bar-chart";

export default {
  name: "graficas-tabla-general",
  props: ["seriesCategorias"],
  components:{
      HorizontalBarChart,
      LinearBarChart
  },
  computed: {
      seriesHorizontalBarChart:function(){
          //return this.seriesCategorias.seriesHorizontalBarChart;
          return this.seriesCategorias[0].series;
      },
      seriesLinearBarChart:function(){
          //return this.seriesCategorias.seriesLineBarChart;
          return this.seriesCategorias[1].series;
      },
      categorias:function(){
          //return this.seriesCategorias.categorias;
          return this.seriesCategorias[0].categorias;
      }
  }
};
</script>