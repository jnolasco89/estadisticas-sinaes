<template>
  <apexchart type="bar" height="350" :options="chartOptions" :series="seriesChart" />
</template>
<script>
import apexchart from "vue-apexcharts";

export default {
  name: "horizontal-bar-chart",
  props: ["categorias","series"],
  components: {
    apexchart
  },
  computed: {
    chartOptions: function() {
      return {
        chart: {
          stacked: true
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        stroke: {
          width: 1,
          colors: ["#fff"]
        },

        title: {
          text: ""
        },
        xaxis: {
          categories: this.categorias,
          labels: {
            formatter: function(val) {
              //return val + "K";
              return val;
            }
          }
        },
        yaxis: {
          title: {
            text: undefined
          }
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val + "K";
            }
          }
        },
        fill: {
          opacity: 1
        },

        legend: {
          position: "top",
          horizontalAlign: "left",
          offsetX: 40
        }
      };
    },
    seriesChart: function() {
       return this.series;
    }
  }
};
</script>