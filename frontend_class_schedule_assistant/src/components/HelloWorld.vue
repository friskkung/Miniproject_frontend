<template>
  <v-main>
    <v-container>
      <h1 class="page-title">Welcome to Class Schedule Assistance!</h1>
      <v-row justify="center">
        <v-col cols="12" sm="6" md="4">
          <v-card class="custom-card" outlined tile link to="/course">
            <v-icon class="card-icon" >mdi-book</v-icon>
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
</template>

<script>
export default {
name: "HelloWorld",
data: () => ({}),
};
</script>

<style>
.page-title {
  font-size: 24px;
  margin: 20px 0;
  color: #007BFF;
  text-align: center;
}

.custom-card {
  background-color: #F5F5F5;
  border: 1px solid #E0E0E0;
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
  color: #007BFF;
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
  background-color: #007BFF;
  color: #fff;
}
</style>