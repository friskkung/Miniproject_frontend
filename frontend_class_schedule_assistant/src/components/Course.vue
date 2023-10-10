<template>
  <v-data-table :headers="headers" :items="filteredItems" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>ข้อมูลรายวิชา</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-btn color="primary" dark class="mb-2" @click="saveSelected()">
          Save selected courses
        </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.courseId }}</td>
        <td>{{ item.code }}</td>
        <td>{{ item.courseName }}</td>
        <td>{{ item.credit }}</td>
        <td>
          <v-checkbox
            v-model="item.selected"
            @click="selectedCourses(item, item.selected)"
          ></v-checkbox>
        </td>
      </tr>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "course",
  data() {
    return {
      courseItem: [],
      selectedCourse: [],
      headers: [
        {
          text: "ไอดี",
          align: "start",
          sortable: false,
          value: "courseId",
        },
        { text: "code", value: "code" },
        { text: "course name", value: "CourseName" },
        { text: "credit", value: "credit" },
        { text: "selected", value: "selected" },
      ],
      selectedCourseId: "",
      selectedCourseCode: "",
      selectedCourseName: "",
      selectedCourseCredit: "",
      search: "",
    };
  },
  created() {
    this.initialize();
    this.clearLocalStorage();
  },
  methods: {
    async initialize() {
      this.courseItem = [];
      try {
        var data = await this.axios.get("http://localhost:9000/course");
        console.log("data course===>", data);
        this.courseItem = data.data;
        console.log("courseItem===>", this.courseItem);
      } catch (error) {
        console.log(error.message);
      }
    },
    openDialog(action, item) {
      // Implement your dialog logic here
    },
    selectedCourses(item, selected) {
      console.log("Item pass by==>", item);
      if (selected) {
        if (item != null) {
          this.selectedCourse.push(item);
          console.log("Current Selected Course===>", this.selectedCourse);
        } else {
          console.log("item is null!");
        }
      } else {
        if (item != null) {
          this.selectedCourse.pop(item);
          console.log("Current Selected Course===>", this.selectedCourse);
        } else {
          console.log("item is null!");
        }
      }
    },
    saveSelected() {
      console.log("selected course in save ===>", this.selectedCourse);
      if (this.selectedCourse != null) {
        var tmp = JSON.stringify(this.selectedCourse);
        console.log("after stringify selected course in save ===>", tmp);
        localStorage.setItem("selectedCourse", tmp);
        var getLodata = localStorage.getItem("selectedCourse");
        console.log("local data==>", getLodata);
        this.$router.push("/table");
      } else {
        alert("please select some course!");
      }
    },
    clearLocalStorage() {
      localStorage.removeItem("selectedCourse");
    },
  },
  computed: {
    filteredItems() {
      if (!this.search) return this.courseItem; // Return all items if search is empty

      const keyword = this.search.toLowerCase();
      return this.courseItem.filter((item) => {
        var courseId = JSON.stringify(item.courseId)
        var code =JSON.stringify(item.code)
        var courseName=JSON.stringify(item.courseName)
        var credit=JSON.stringify(item.credit)
        // Adjust the properties you want to search through here
        return (
          courseId.toLowerCase().includes(keyword) ||
          code.toLowerCase().includes(keyword) ||
          courseName.toLowerCase().includes(keyword) ||
          credit.toString().includes(keyword)
        );
      });
    },
  },
};
</script>

<style>
</style>