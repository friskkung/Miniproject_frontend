<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <!-- Logo -->
      <div class="d-flex align-center">
        <h1>CSA</h1>
      </div>
      <v-spacer></v-spacer>
      <!-- Latest-release -->
      <v-btn text @click="toStaffMenu">
        <span class="mr-2">{{ stateUser }}</span>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
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
      <v-container>
        <h1 class="page-title">Welcome to Class Schedule Assistance!</h1>
        <v-row justify="center">
          <v-col cols="12" sm="6" md="4">
            <v-card class="custom-card" outlined tile link to="/course">
              <v-icon class="card-icon">mdi-book</v-icon>
              <div class="card-label">Course</div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-card class="custom-card" outlined tile link to="/table">
              <v-icon class="card-icon">mdi-table</v-icon>
              <div class="card-label">Timetable</div>
            </v-card>
          </v-col>
          <!-- Add more cards as needed -->
        </v-row>
      </v-container>
      <router-view></router-view>
    </v-main>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    drawer: false,
    stayLogin: false,
    stateUser: "staff",
  }),
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      console.log("stayLogin==>",localStorage.getItem('stayLogin'))
      if (localStorage.getItem('stayLogin')==true) {
        this.stateUser = "Log OUt";
      }
    },
    toStaffMenu() {
      if (this.stayLogin) {
        this.$router.push("/login");
        localStorage.setItem("userId", 0);
        localStorage.setItem("stayLogin", false);
      } else {
        this.$router.push("/login");
      }
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style>
.page-title {
  font-size: 24px;
  margin: 20px 0;
  color: #007bff;
  text-align: center;
}

.custom-card {
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  transition: transform 0.2s;
  margin: 1px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  justify-content: center;
}

.custom-card:hover {
  transform: scale(1.05);
}

.card-icon {
  font-size: 36px;
  color: #007bff;
  text-align: center;
}

.card-label {
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
  justify-content: center;
}

.footer {
  text-align: center;
  padding: 20px;
  background-color: #007bff;
  color: #fff;
}
</style>