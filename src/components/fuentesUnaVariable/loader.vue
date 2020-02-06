<template>
  <v-container fluid>
    <v-row>
      <v-col cols="5">
        <v-skeleton-loader class="mx-auto cabecera-tabla" style="margin-bottom:20px;" type="heading"></v-skeleton-loader>
        <v-skeleton-loader class="mx-auto" type="image"></v-skeleton-loader>
      </v-col>
      <v-col cols="7">
        <v-skeleton-loader class="mx-auto cabecera-tabla" type="heading"></v-skeleton-loader>
        <v-skeleton-loader class="mx-auto" type="table-row" v-for="(n,index) in 5" v-bind:key="index"></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "loader",
  data() {
    return {
      observer: null
    };
  },
  mounted() {
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.10
    };

    this.observer = new IntersectionObserver(entries => {
      if (entries[0] && entries[0].isIntersecting) {
        this.$emit("intersect", this.pid);
      }
    }, options);

    this.observer.observe(this.$el);
  },
  destroyed() {
    this.observer.disconnect();
  }
};
</script>
<style>
  .cabecera-tabla div{
    width: 100%!important;
  }
</style>