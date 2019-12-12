<template>
  <v-container grid-list-md>
    <v-layout align-center row justify-space-between>
      <v-flex md2 lg2 xl2 d-flex>
        <v-select
          :items="fuentes"
          prepend-icon="account_balance"
          label="Fuente"
          item-value="id"
          item-text="nombre"
          @change="cargarTemasFuente"
          :menu-props="{ top: false, offsetY: true }"
          v-model="idFuente"
          dense
        ></v-select>
      </v-flex>
      <v-flex md3 lg3 d-flex>
        <v-select
          :items="temas"
          prepend-icon="description"
          label="Tema"
          item-value="CatTemID"
          item-text="CatTempDsc"
          v-model="idTema"
          @change="setTemaSeleccionado"
          dense
        ></v-select>
      </v-flex>
      <v-flex md2 lg2 d-flex>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model="anio" label="Año" prepend-icon="event" readonly v-on="on"></v-text-field>
          </template>
          <v-date-picker
            ref="picker"
            v-model="date"
            :max="new Date().toISOString().substr(0, 10)"
            min="1950-01-01"
            @input="save"
            reactive
            locale="es"
            no-title
          ></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex md2 lg2 d-flex>
        <v-select
          :items="departamentos"
          item-value="DepartamentoID"
          item-text="DepartamentoLbl"
          prepend-icon="image_search"
          label="Nivel geográfico"
          @change="cargarMunicipios"
          v-model="idDepto"
          dense
        ></v-select>
      </v-flex>
      <v-flex md3 lg3 d-flex>
        <v-select
          :items="municipios"
          item-value="MUN_ID"
          item-text="MunicipioLbl"
          prepend-icon="map"
          label="Municipios"
          v-model="idMun"
          @change="setMunicipioSeleccionado"
          dense
        ></v-select>
      </v-flex>
    </v-layout>

    <v-layout align-center row>
      <v-flex xs12 sm12 md12 lg12>
        <v-btn small color="primary" @click="cargarDatos">Cargar</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import ServiciosEstadisticas from "../../servicios/consultas";

const servEst = new ServiciosEstadisticas();

export default {
  name: "controlesFuentes",
  props: {
    propIdFuente: {
      type: Number,
      default: 1
    },
    propIdTema: {
      type: Number,
      default: 101
    },
    propAnio: {
      type: Number,
      default: new Date().getFullYear()
    },
    propIdDepto: {
      type: Number,
      default: 1
    },
    propIdMun: {
      type: Number,
      default: 101
    }
  },
  mounted() {
    this.$store.commit("setVerCargando", true);
    this.fuentes = servEst.getFuentes();
    this.departamentos = servEst.getDepartamentos();
    this.municipios = servEst.getMunicipios(-1);

    let self = this;
    this.$nextTick(function() {
      let promesa = servEst.getTemasYsubtemasFuente(this.propIdFuente);
      promesa()
        .then(res => {
          //Llenando la lista de temas
          self.temas = res.data;
          self.temas = res.data;
          self.temas.unshift({
            CatTemID: -1,
            CatTempDsc: "Seleccione un tema"
          });
          //Iniciando el date del date-picker
          self.date = new Date(this.propAnio, 1, 1).toISOString().substr(0, 10);
          //Llenando la lista de municipios
          self.municipios = servEst.getMunicipios(self.propIdDepto);

          //Iniciando la variables locales
          self.idFuente = this.propIdFuente;
          self.idTema = this.propIdTema;
          self.anio = this.propAnio;
          self.idDepto = this.propIdDepto;
          self.idMun = this.propIdMun;

          //Quitando la pantalla de cargando
          this.$store.commit("setVerCargando", false);
        })
        .catch(err => {
          this.$store.commit("setVerCargando", false);
          alert("Error");
        });
    });
  },
  data() {
    return {
      date: null,
      menu: false,
      idFuente: null,
      idTema: null,
      anio: null,
      idDepto: null,
      idMun: null,
      fuentes: [],
      temas: [],
      departamentos: [],
      municipios: []
    };
  },
  watch: {
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
      this.$refs.picker.activePicker = "YEAR";
      this.menu = false;

      const [anio, mes, dia] = this.date.split("-");
      this.anio = anio;
    },
    cargarTemasFuente: function(id) {
      this.$store.commit("setVerCargando", true);

      this.idFuente = id;
      let self = this;
      let promesa = servEst.getTemasYsubtemasFuente(id);
      promesa()
        .then(res => {
          this.$store.commit("setVerCargando", false);
          self.temas = res.data;
          self.temas.unshift({
            CatTemID: -1,
            CatTempDsc: "Seleccione un tema"
          });
          self.idTema = -1;
        })
        .catch(err => {
          this.$store.commit("setVerCargando", false);
          alert("Error");
        });
    },
    setTemaSeleccionado: function(id) {
      this.idTema = id;
    },
    fechaSeleccionada: function() {
      const [anio, mes, dia] = this.fecha.split("-");
      this.anio = anio;
    },
    formatearFecha: function(fecha) {
      if (!fecha) return null;
      const [month, day, year] = fecha.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    cargarMunicipios(idDepto) {
      this.idDepto = idDepto;
      this.municipios = servEst.getMunicipios(idDepto);
    },
    setMunicipioSeleccionado(idMun) {
      this.idMun = idMun;
    },
    cargarDatos() {
      this.$store.commit("setVerCargando", true);
      this.$store.commit("setIdFuenteActual", this.idFuente);
      this.$store.commit("setIdTemaActual", this.idTema);
      this.$store.commit("setAnioActual", this.anio);
      this.$store.commit("setIdDeptoActual", this.idDepto);
      this.$store.commit("setIdMunActual", this.idMun);
      if (this.idDepto * 1 < 0 && this.idMun * 1 < 0) {
        this.$store.commit("setNivelGeografico", 1);
      } else if (this.idDepto * 1 > 0 && this.idMun * 1 > 0) {
        this.$store.commit("setNivelGeografico", 2);
      } else {
        this.$store.commit("setNivelGeografico", 1);
      }

      let temaSeleccionado;
      for (let i = 0; i < this.temas.length; i++) {
        if (this.temas[i].CatTemID == this.idTema) {
          temaSeleccionado = this.temas[i];
          break;
        }
      }
      //this.$emit("cargardatos",temaSeleccionado);
      let promesa = servEst.getDatosFuente(
        this.idFuente,
        this.anio,
        this.anio + 5,
        this.idDepto,
        this.idMun,
        this.idTema,
        temaSeleccionado.subtemas.length
      );
      promesa()
        .then(res => {
          res.data.zonas.forEach(elemento=>{
            elemento.nombre=servEst.getNombreZona(elemento.idNumerico,this.$store.state.nivelGeografico);
          });
          this.$emit("cargardatos", temaSeleccionado, res.data);
          this.$store.commit("setVerCargando", false);
        })
        .catch(err => {
          alert("Error EN LA PROMESA PARA DATOS ESTADISTICOS");
        });
    }
  },
  computed: {
    imagenFuente: function() {
      let img;
      switch (this.idFuente) {
        case 1:
          img = "connaCondensed.png";
          break;
        case 2:
          img = "minedCondensed.jpg";
          break;
        case 3:
          img = "imlCondensed.png";
          break;
      }
      return require(`../../assets/imgsFuentes/${img}`);
    }
  }
};
</script>

