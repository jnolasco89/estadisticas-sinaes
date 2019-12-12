<template>
  <div>
    <button type="button" @click="cambiarImagen">Cambio</button>
    <div id="lienzo-mapa">
      <div id="contenedor-mapa">
        <object id="svg_mapa_dinamico" type="image/svg+xml" :data="imagen">No se pudo cargar el mapa</object>
      </div>
      <object id="lienzo-escala" type="image/svg+xml" :data="escala">No se pudo cargar el mapa</object>
      <div id="tooltip-mapa">
        <div class="toolTipContent">
          <div class="cuerpoToolTip"></div>
          <div class="trianguloToolTip"></div>
          <div class="trianguloToolTipBorder"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Mapa from "./mapa.js";

var mapa = new Mapa("lienzo-mapa", "escala-mapa");

export default {
  name: "mapaComponent",
  mounted() {
    
    this.$nextTick(function() {
       mapa.ini(); 
    });
    
    /*
    window.addEventListener("load", () => {
      mapa.ini();
    });
    */
    /*
    this.$nextTick(() => {
      mapa.ini();
    });*/
  },
  data() {
    return {
      prueba: "Aqui deberia cargar el mapa",
      img: 1,
      rutaImg: "MAP_FULL_DEPTOS.svg"
    };
  },
  methods: {
    cambiarImagen: function() {
      mapa.ini();
      /*
      if (this.img == 1) {
        this.$http.get("http://localhost:8080/prueba-custom-component/src/assets/logo.png").then(result => {
          console.log(JSON.stringify(result));
        });
        this.img = 2;
        this.rutaImg = "logo.png";
      } else {
        this.$http.get("http://localhost:8080/prueba-custom-component/src/MAP_FULL_DEPTOS.svg").then(result => {
          console.log(JSON.stringify(result));
        });
        this.img = 1;
        this.rutaImg = "MAP_FULL_DEPTOS.svg";
      }
      */
    }
  },
  computed: {
    imagen: function() {
      return require(`../../assets/svg/${this.rutaImg}`);
    },
    escala: function() {
      return require(`../../assets/svg/escala.svg`);
    }
  }
};
</script>
<style>
#lienzo-mapa {
  position: relative;
  border: solid 1px red;
  width: 100%;
  height: 100%;
}

#contenedor-mapa {
  border: solid 1px green;
  width: 100%;
  height: 100%;
}

#lienzo-escala {
  width: 80%;
  height: 30px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  margin-left: -40%;
  border: solid 1px red;
}

#tooltip-mapa {
  position: absolute;
  border: solid 1px red;
  z-index: 1000;
}
</style>