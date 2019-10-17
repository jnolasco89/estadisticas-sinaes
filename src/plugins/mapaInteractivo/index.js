import MapaComponent from './mapaComponent.vue'

export default {
    install(vue, opts) {
        vue.mixin({
            mounted() {
                console.log("Montado");
            }
        });

         //Registrando los componentes a utilizar
         vue.component('mapa-interactivo', MapaComponent);


        // Register custom directive tha enables commenting on any element
        /*
        vue.directive('mapa-enabled', {
            bind: function (el, binding, vnode) {
                el.style.backgroundColor = "red";
            }
        })
        */
       
    }
}