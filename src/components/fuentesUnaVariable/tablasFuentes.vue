<template>
    <v-container fluid>
        <v-layout justify-center align-content-space-between row>
            <v-flex md12 lg12 xl12>
                <v-tabs color="default">
                   <v-tabs-slider color="blue"></v-tabs-slider>

                   <v-tab href="#resumen" class="primary-text">
                       <v-icon>library_books</v-icon> Resumen
                   </v-tab>
                   <v-tab href="#generales" class="primary-text">
                       <v-icon>library_books</v-icon> Datos Generales
                   </v-tab>
                   <v-tab href="#especificos" class="primary-text">
                       <v-icon>library_books</v-icon> Datis Especificos
                   </v-tab>

                   <v-tabs-items>
                       <v-tab-item :value="'resumen'">
                           resumen
                       </v-tab-item>
                       <v-tab-item :value="'generales'">
                           generales
                       </v-tab-item>
                       <v-tab-item :value="'especificos'">
                           especificos
                       </v-tab-item>
                   </v-tabs-items>
                </v-tabs>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    name:"tablasFuentes"
}
</script>
<style>
.v-tabs__item{
    text-transform: none!important;
}
</style>


