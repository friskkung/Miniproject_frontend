<template>
    <v-form @submit.prevent="login">
      <v-text-field
        v-model="email"
        label="Email"
        required
        type="email"
      ></v-text-field>
  
      <v-text-field
        v-model="password"
        label="Password"
        required
        type="password"
      ></v-text-field>
  
      <v-btn color="primary" type="submit">Login</v-btn>
    </v-form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      login() {
        // You can add your login logic here.
        // Typically, you'd make an API request to authenticate the user.
        // For the sake of this example, we'll just print the email and password.
        console.log('Email: ' + this.email);
        console.log('Password: ' + this.password);
      }
    }
  };
  </script>
  