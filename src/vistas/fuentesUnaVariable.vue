<template>
  <div>
    <controles-fuentes
      v-bind:prop-id-fuente="idFuente"
      v-bind:prop-id-tema="idTema"
      v-bind:prop-anio="anio"
      v-bind:prop-id-depto="idDepto"
      v-bind:prop-id-mun="idMun"
      v-on:cargardatos="cargar"
    ></controles-fuentes>

      <v-container grid-list-md v-if="datosCargados">
        <v-layout row>
          <v-flex md2>
            <v-img :src="imagenFuente" width="90" height="70"></v-img>
          </v-flex>
          <v-flex md8>
            <v-icon class="enlinea">insert_chart_outlined</v-icon>
            <h2 class="enlinea">{{nombreTema}}</h2>
          </v-flex>
          <v-flex md2>
            <v-img :src="imagenConna" width="90" height="70"></v-img>
          </v-flex>
        </v-layout>
      </v-container>
      <mapa-fuentes v-if="datosCargados"></mapa-fuentes>
      <tablas-fuentes v-if="datosCargados" v-bind:data="datosConsulta"></tablas-fuentes>
  </div>
</template>
<script>
import ControlesFuentes from "../components/fuentesUnaVariable/controlesFtes";
import MapaFuentes from "../components/fuentesUnaVariable/mapaFuentes";
import TablasFuentes from "../components/fuentesUnaVariable/tablasFuentes";
import ServiciosEstadisticas from "../servicios/consultas";

const servEst = new ServiciosEstadisticas();

export default {
  name: "app",
  components: {
    ControlesFuentes,
    MapaFuentes,
    TablasFuentes
  },
  mounted() {
    let datosURL = servEst.getParametrosURL();
    this.idFuente = datosURL.idFuente * 1;
    this.idTema = datosURL.idTema * 1;
    this.anio = datosURL.anioIni * 1;
    this.idDepto = datosURL.idDepto * 1;
    this.idMun = datosURL.idMun * 1;
  },
  data() {
    return {
      datosConsulta:null,
      datosCargados: false,
      idFuente: 0,
      idTema: 0,
      nombreTema:"",
      anio: 0,
      idDepto: 0,
      idMun: 0,
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
  },
  methods: {
    cargar(temaSeleccionado, datosEstadisticos) {
      this.idFuente = this.$store.state.idFuenteActual;
      this.datosCargados=true;
      this.nombreTema=temaSeleccionado.CatTempDsc;
      this.datosConsulta=datosEstadisticos;
      /*
      console.log(JSON.stringify(datosEstadisticos));
      alert("Cargar datos");
      */
    }
  },
  computed: {
    imagenFuente() {
      let img;
      switch (this.idFuente) {
        case 1:
          img = "connaCondensed.png";
          break;
        case 2:
          img = "minedCondensed.png";
          break;
        case 3:
          img = "imlCondensed.jpg";
          break;
      }
      return require(`../assets/imgsFuentes/${img}`);
    },
    imagenConna(){
      return require(`../assets/imgsFuentes/connaCondensed.png`);
    }
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