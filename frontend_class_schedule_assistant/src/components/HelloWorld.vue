<template>
  <v-app>
    <!-- Navigation Drawer -->
    <v-navigation-drawer app>
      <!-- Your navigation links go here -->
      <v-list>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/about">
          <v-list-item-icon>
            <v-icon>mdi-book</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Course</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/about">
          <v-list-item-icon>
            <v-icon>mdi-table</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Timetable</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/about">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Account</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-app-bar app>
      <v-toolbar-title>Class Schedule Assistance</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/login">Login</v-btn>
    </v-app-bar>

    <v-main>
      <!-- Your main content goes here -->
      <h1>Wellcome to Class Schedule Assistance!</h1>
      <v-container class="grey lighten-5" >
        <v-row no-gutters>
          <v-col cols="12" sm="4">
            
            <v-card class="pa-2" outlined tile ><a href=""><v-icon>mdi-book</v-icon><br>Course</a> </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card class="pa-2" outlined tile><a href=""><v-icon>mdi-table</v-icon><br>Timetable</a> </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card class="pa-2" outlined tile><a href=""><v-icon>mdi-account</v-icon><br>Account</a> </v-card>
          </v-col>
        </v-row>
      </v-container>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({}),
};
</script>
</style>
