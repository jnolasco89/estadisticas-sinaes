import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        verCargando: false,
        idFuenteActual:1,
        idTemaActual:101,
        anioActual:(new Date()).getFullYear(),
        idDeptoActual:1,
        idMunActual:101,
        nivelGeografico:1
    },
    mutations:{
        setVerCargando(state,payload){
            state.verCargando=payload
        },
        setIdFuenteActual(state,payload){
            state.idFuenteActual=payload
        },
        setIdTemaActual(state,payload){
            state.idTemaActual=payload
        },
        setAnioActual(state,payload){
            state.anioActual=payload
        },
        setIdDeptoActual(state,payload){
            state.idDeptoActual=payload
        },
        setIdMunActual(state,payload){
            state.idMunActual=payload
        },
        setNivelGeografico(state,payload){
            state.nivelGeografico=payload
        }
    },
    getters:{
        verCargando:state=>state.verCargando
    }
});