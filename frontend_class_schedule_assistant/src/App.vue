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
    <!-- Navigation Drawer -->
    <v-navigation-drawer app mini-variant>
      <!-- Your navigation links go here -->
      <v-list>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/course">
          <v-list-item-icon>
            <v-icon>mdi-book</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Course</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/table">
          <v-list-item-icon>
            <v-icon>mdi-table</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Timetable</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

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
