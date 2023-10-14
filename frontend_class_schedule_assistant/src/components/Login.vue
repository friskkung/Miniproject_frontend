<template>
  <div class="login-container">
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <!-- Logo -->
      <div class="d-flex align-center">
        <h1>CSA</h1>
      </div>
      <v-spacer></v-spacer>
      <!-- Latest-release -->
      <v-btn text>
        <span class="mr-2">Staff</span>
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
    <v-card class="login-card">
      <v-card-title class="headline">Login</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="username"
            label="Username"
            prepend-icon="mdi-account"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            prepend-icon="mdi-lock"
            required
            type="password"
          ></v-text-field>

          <v-btn :disabled="!valid" color="primary" class="mr-4" @click="login">
            Login
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset"> cancle </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    drawer: false,
    valid: true,
    username: "",
    password: "",
    id: 0,
  }),
  created() {
    this.checkStayLogin();
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    checkStayLogin() {
      console.log("UserID", localStorage.getItem("userId"));
      if (localStorage.getItem("userId") != 0) {
        this.$router.push("/manageCourse");
      }
    },
    async login() {
      try {
        var validateUser = await this.axios.get(
          "http://localhost:9000/users?username=" +
            this.username +
            "&password=" +
            this.password
        );
        console.log("validateUser===>", validateUser);
        console.log("validateUserStatus===>", typeof validateUser.status);
        if (validateUser.status == 200) {
          this.id = validateUser.data.userId;
          console.log("ID:", this.id);
          localStorage.setItem("userId", this.id);
          localStorage.setItem("stayLogin",true)
          this.$router.push("/manageCourse");
        }
      } catch (error) {
        console.log("validateError==>", error);
      }
    },
    reset() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  max-width: 400px;
  width: 100%;
}

.headline {
  text-align: center;
}
</style>
