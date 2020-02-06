<template>
  <apexchart type="line" height="350" :options="chartOptions" :series="seriesChart" />
</template>
<script>
import apexchart from "vue-apexcharts";

export default {
  name: "linearBarChart",
  components: {
    apexchart
  },
  props: ["categorias","series"],
  computed: {
    chartOptions: function() {
      return {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        title: {
          text: "",
          align: "left"
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: this.categorias
        },
        dataLabels: {
          enabled: true,
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
      };
    },
    seriesChart: function() {
      return this.series;
        /*
      return [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        },
        {
          name: "Desktopsss",
          data: [20, 51, 65, 11, 29, 82, 99, 11, 248]
        }
      ];
        */
    }
  }
};
</script>