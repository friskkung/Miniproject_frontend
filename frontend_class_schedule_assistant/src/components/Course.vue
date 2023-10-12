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
        ></v-text-field><v-spacer></v-spacer>
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