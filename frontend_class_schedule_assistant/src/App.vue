<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawer: false,
  }),
  methods: {
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  created(){
    localStorage.setItem('userId',0)
    localStorage.setItem('stayLogin',false)
  },
};
</script>
