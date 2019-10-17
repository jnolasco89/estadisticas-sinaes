<template>
    <v-container grid-list-md>
        <v-layout align-center row justify-space-between>
            <v-flex md2 lg2 xl2 d-flex>
                <v-select :items="fuentes" prepend-icon="account_balance"
                        label="Fuente">
                </v-select>
            </v-flex>
            <v-flex md3 lg3 d-flex>
                <v-select :items="temas" prepend-icon="description"
                        label="Tema">
                </v-select>
            </v-flex>
            <v-flex md2 lg2 d-flex>
                <v-select prepend-icon="event"
                        label="Anio">
                </v-select>
            </v-flex>
            <v-flex md2 lg2 d-flex>
                <v-select :items="departamentos" prepend-icon="image_search"
                        label="Nivel geográfico">
                </v-select>
            </v-flex>
            <v-flex md3 lg3 d-flex>
                <v-select :items="municipios" prepend-icon="map"
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

