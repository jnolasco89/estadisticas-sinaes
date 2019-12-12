<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>SINAES</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu :nudge-width="100">
        <template v-slot:activator="{ on }">
          <v-toolbar-title v-on="on" class="no-mayuscula">
            <span>Estadísticas Juntas de Protección</span>
            <v-icon>arrow_drop_down</v-icon>
          </v-toolbar-title>
        </template>
        <v-list>
          <v-list-tile v-for="item in itemsJP" :key="item">
            <v-list-tile-title v-text="item"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-menu :nudge-width="100">
        <template v-slot:activator="{ on }">
          <v-toolbar-title v-on="on" class="no-mayuscula">
            <span>Estadísticas Instituciones Garantes</span>
            <v-icon>arrow_drop_down</v-icon>
          </v-toolbar-title>
        </template>
        <v-list>
          <v-list-tile v-for="item in itemsIGarantes" :key="item">
            <v-list-tile-title v-text="item"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-menu>
        <template v-slot:activator="{ on }">
          <v-toolbar-title class="no-mayuscula">
            <span>Estadísticas Instituciones Garantes</span>
          </v-toolbar-title>
        </template>
      </v-menu>
    </v-app-bar>

    <!-- ================ CONTENIDO ================ -->
    <v-content>
      <vista-fuentes-una-variable></vista-fuentes-una-variable>
    </v-content>

    <!-- ================ PIE DE PAGINA ================ -->
    <v-footer app></v-footer>
    <v-overlay :value="this.$store.state.verCargando">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
      <p>Cargando...</p>
    </v-overlay>
  </v-app>
</template>

<script>
import VistaFuentesUnaVariable from "./vistas/fuentesUnaVariable";

export default {
  name: "app",
  components: {
    VistaFuentesUnaVariable
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

p {
  font-weight: bold;
}
</style>
