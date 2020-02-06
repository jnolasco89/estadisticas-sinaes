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
              
          </v-tab-item>

          <v-tab-item value="tab-2">
            <tabla-general :grupos="data.grupos" :zonas="data.zonas" :total-general="data.resumenZonas"></tabla-general>
          </v-tab-item>

          <v-tab-item value="tab-3">
          </v-tab-item>

        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>
              
<script>
import Consultas from "../../servicios/consultas";
import Loader from './loader.vue';
import TablaGeneral from "./tablaGeneral";

export default {
  name: "tablasFuentes2",
  props: ["data"],
  components: {
    Loader,
    TablaGeneral
  },
  data() {
    return {
      tab: null,
      temporal: null
    };
  },
  methods: {
   
  },
  computed: {
    
  },
  mounted(){
  }
};
</script>
<style>
.v-tabs__item {
  text-transform: none !important;
}
</style>

