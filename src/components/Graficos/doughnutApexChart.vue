<template>
  <apexchart type="donut" :options="chartOptions" :series="series" />
</template>
<script>
import apexchart from "vue-apexcharts";

export default {
  name: "donut-chart",
  components: {
    apexchart
  },
  data() {
    return {
      series: [44, 55, 41, 17, 15],
      chartOptions: {
        labels: ["A", "B", "C", "D", "E"],
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          pie: {
            size: 40
          }
        },
        legend:{
          show:false
        }
      }
    };
  }
};
</script>