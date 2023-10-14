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
          ></v-text-field
          ><v-spacer></v-spacer>
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
  </div>
</template>

<script>
export default {
  name: "course",
  data() {
    return {
      drawer: false,
      stayLogin: false,
      stateUser: "staff",
      courseItem: [],
      selectedCourse: [],
      headers: [
        {
          text: "ไอดี",
          align: "start",
          sortable: true, // อนุญาตให้เรียงลำดับคอลัมน์นี้
          value: "courseId",
        },
        {
          text: "code",
          sortable: true,
          value: "code",
        },
        {
          text: "course name",
          sortable: true,
          value: "courseName", // แก้ไขตรงนี้จาก 'CourseName' เป็น 'courseName'
        },
        {
          text: "credit",
          sortable: true,
          value: "credit",
        },
        {
          text: "selected",
          sortable: false, // ไม่สามารถเรียงลำดับได้
          value: "selected",
        },
      ],
      search: "",
    };
  },
  created() {
    this.initialize();
    this.clearLocalStorage();
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    toStaffMenu() {
      if (this.stayLogin) {
        this.$router.push("/login");
        localStorage.setItem("userId", 0);
        localStorage.setItem("stayLogin", false);
      } else {
        this.$router.push("/login");
      }
    },
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
      // ระบบลอจิกของคุณ
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
          this.selectedCourse.splice(this.selectedCourse.indexOf(item), 1); // แก้ไขการลบข้อมูล
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
      if (!this.search) return this.courseItem; // คืนค่ารายการทั้งหมดหากไม่มีการค้นหา

      const keyword = this.search.toLowerCase();
      return this.courseItem.filter((item) => {
        return (
          item.courseId.toString().toLowerCase().includes(keyword) ||
          item.code.toString().toLowerCase().includes(keyword) ||
          item.courseName.toLowerCase().includes(keyword) ||
          item.credit.toString().includes(keyword)
        );
      });
    },
  },
};
</script>


<style>
</style>