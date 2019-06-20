<template>
  <div>
    <controles-fuentes></controles-fuentes>

    <v-container grid-list-md>
      <v-layout row>
        <v-flex md2>
          <v-img src="https://picsum.photos/350/165?random" width="90" height="70"></v-img>
        </v-flex>
        <v-flex md8>
          <v-icon class="enlinea">insert_chart_outlined</v-icon>
          <h2 class="enlinea">TEMA SEGUN FUENTE</h2>
        </v-flex>
        <v-flex md2>
          <v-img src="https://picsum.photos/350/165?random" width="90" height="70"></v-img>
        </v-flex>
      </v-layout>
    </v-container>

    <mapa-fuentes></mapa-fuentes>
    <tablas-fuentes></tablas-fuentes>
  </div>
</template>
<script>
import ControlesFuentes from "../components/fuentesUnaVariable/controlesFtes";
import MapaFuentes from "../components/fuentesUnaVariable/mapaFuentes";
import TablasFuentes from "../components/fuentesUnaVariable/tablasFuentes";

export default {
  name: "app",
  components: {
    ControlesFuentes,
    MapaFuentes,
    TablasFuentes
  },
  data() {
    return {
      itemsJP: ["Documentos Estadísticos", "Mapa Interactivo"],
      itemsIGarantes: [
        "Documentos Estadísticos",
        "Mapa Interactivo",
        "Área de Supervivencia y Crecimiento Integral",
        "Área de Protección",
        "Área de Desarrollo",
        "Área de Participación"
      ]
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}

.no-mayuscula {
  text-transform: none !important;
  font-size: 12px !important;
  padding-left: 6px !important;
  padding-right: 6px !important;
  cursor: pointer;
}

.v-menu__content {
  top: 50px !important;
}

.v-list__tile {
  font-size: 12px !important;
  height: 35px !important;
}

.enlinea {
  display: inline-block;
}
</style>