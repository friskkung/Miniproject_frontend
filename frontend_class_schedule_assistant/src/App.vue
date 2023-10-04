<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <!-- Logo -->
      <div class="d-flex align-center">
       <h1>CSA</h1>
      </div>

      <v-spacer></v-spacer>
      <!-- Latest-release -->
      <v-btn
        
        text
      >
        <span class="mr-2">Login</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  })
}
</script>
