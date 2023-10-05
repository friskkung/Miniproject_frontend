<template>
    <div>
      <v-data-table
        :headers="headers"
        :items="courses"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:item.course-name="{ item }">
          <v-btn text @click="showCourseDetails(item)">{{ item['course-name'] }}</v-btn>
        </template>
      </v-data-table>
  
      <v-dialog v-model="dialog" max-width="600">
        <v-card>
          <v-card-title>
            {{ selectedCourse['course-name'] }} Details
          </v-card-title>
          <v-card-text>
            <div>
              <strong>Course Code:</strong> {{ selectedCourse['course-code'] }}
            </div>
            <div>
              <strong>Course Credit:</strong> {{ selectedCourse['course-credit'] }}
            </div>
            <!-- Add more course details here -->
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
  export default {
    name:'Course',
    data() {
      return {
        headers: [
          { text: 'Course Code', value: 'course-code' },
          { text: 'Course Name', value: 'course-name' },
          { text: 'Course Credit', value: 'course-credit' },
        ],
        courses: [
          // Replace this with your course data from your API or Vuex store
          {
            'course-code': 'CSE101',
            'course-name': 'Introduction to Computer Science',
            'course-credit': 3,
          },
          // Add more courses as needed
        ],
        dialog: false,
        selectedCourse: {},
      };
    },
    methods: {
      showCourseDetails(course) {
        this.selectedCourse = course;
        this.dialog = true;
      },
    },
  };
  </script>
  