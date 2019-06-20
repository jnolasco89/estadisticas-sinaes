<template>
    <v-container grid-list-md>
        <v-layout align-center row justify-space-between>
            <v-flex md2 lg2 xl2 d-flex>
                <v-select :items="fuentes"
                        label="Fuente">
                </v-select>
            </v-flex>
            <v-flex md3 lg3 d-flex>
                <v-select :items="temas"
                        label="Tema">
                </v-select>
            </v-flex>
            <v-flex md2 lg2 d-flex>
                <v-select
                        label="Anio">
                </v-select>
            </v-flex>
            <v-flex md2 lg2 d-flex>
                <v-select :items="departamentos"
                        label="Nivel geográfico">
                </v-select>
            </v-flex>
            <v-flex md3 lg3 d-flex>
                <v-select :items="municipios"
                        label="Municipios">
                </v-select>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    name:"controlesFuentes",
    data(){
        return {
            fuentes:[],
            temas:[],
            departamentos:[],
            municipios:[]
        }
    }
}
</script>

