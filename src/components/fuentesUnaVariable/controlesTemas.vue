<template>
  <v-container fluid>
    <v-layout align-center justify-center fill-height row>
      <v-flex xs12 sm12 md12 lg12>
              <v-menu
        :close-on-content-click="false"
        v-model="datePickerVisible"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="fechaFormateada"
          label="Mes consulta"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker
          v-model="fecha"
          type="year"
          locale="es"
          @input="datePickerVisible = false"
          no-title
          scrollable
        ></v-date-picker>
      </v-menu>
      </v-flex>
     
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "controlesTemas",
  data() {
    return {
      fecha:"",
      fechaFormateada:"",
      datePickerVisible:false
    };
  }
};
</script>
