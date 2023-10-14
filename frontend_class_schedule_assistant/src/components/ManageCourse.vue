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
        <span class="mr-2">Log Out</span>
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
          <v-btn
            color="primary"
            dark
            class="mb-2"
            @click="openDialog('add', defaultItem)"
          >
            เพิ่มข้อมูล
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.courseId }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.courseName }}</td>
          <td>{{ item.credit }}</td>
          <td>{{ item.sections[0].days[0].dayName }}</td>
          <td>{{ item.sections[0].days[0].classes[0].classTime }}</td>
          <td>
            <v-icon small class="mr-2" @click="openDialog('แก้ไขข้อมูล', item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </td>
        </tr>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
    <div>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="code" label="code"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="courseName"
                    label="name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="credit" label="credit"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="dayName" label="day"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="classTime" label="time"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
            <v-btn color="blue darken-1" text @click="save(formTitle)">
              บันทึกข้อมูล
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5"
            >Are you sure you want to delete this item?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="deleteItemConfirm"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "course",
  data() {
    return {
      drawer: false,
      dialog: false,
      dialogDelete: false,
      courseItem: [],
      selectedCourse: [],
      code: "",
      courseName: "",
      credit: "",
      dayName: "",
      classTime: "",
      defaultItem: [],
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
          text: "day",
          sortable: false, // ไม่สามารถเรียงลำดับได้
          value: "dayName",
        },
        {
          text: "time",
          sortable: false, // ไม่สามารถเรียงลำดับได้
          value: "classTime",
        },
        {
          text: "action",
          sortable: false, // ไม่สามารถเรียงลำดับได้
          value: "action",
        },
      ],
      search: "",
      formTitle: "",
      editedIndex: -1,
      formTitle: "",
      idCourse: "",
      idForDelete: "",
    };
  },
  created() {
    this.initialize();
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    group() {
      this.drawer = false;
    },
  },
  methods: {
    toStaffMenu() {
      localStorage.setItem("userId", 0);
      this.$router.push("/login");
      localStorage.setItem("stayLogin", false);
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
    openDialog(Action, item) {
      //console.log(Action, item)
      this.formTitle = "";
      if (Action === "add") {
        this.formTitle = "เพิ่มข้อมูล";
        this.editItem = item;
        this.dialog = true;
      } else {
        this.formTitle = "แก้ไขข้อมูล";
        this.dialog = true;
        this.code = item.code;
        this.courseName = item.courseName;
        this.credit = item.credit;
        this.dayName = item.sections[0].days[0].dayName;
        this.classTime = item.sections[0].days[0].classes[0].classTime;
        this.idCourse = item.courseId;
      }
    },
    deleteItem(item) {
      this.idForDelete = item.courseId;
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      try {
        var data = await this.axios.delete(
          "http://localhost:9000/course/" + this.idForDelete
        );
        this.initialize();
      } catch (error) {}
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.code = "";
      this.courseName = "";
      this.credit = "";
      this.dayName = "";
      this.classTime = "";
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save(actions) {
      if (actions === "เพิ่มข้อมูล") {
        // this.desserts.push(this.editedItem)
        // this.dialog=false
        var data = {
          code: this.code,
          courseName: this.courseName,
          credit: this.credit,
          sections: [
            {
              sections: "00",
              days: [
                {
                  dayName: this.dayName,
                  classes: [
                    {
                      classTime: this.classTime,
                    },
                  ],
                },
              ],
            },
          ],
        };
        console.log("data after send===>", data);
        try {
          var dataResponse = await this.axios.post(
            "http://localhost:9000/course",
            data
          );
          console.log("dataResponse ===> ", dataResponse);
          this.close();
          this.initialize();
        } catch (error) {
          console.log(error.message);
        }
      } else {
        var data = {
          code: this.code,
          courseName: this.courseName,
          credit: this.credit,
          sections: [
            {
              sections: "00",
              days: [
                {
                  dayName: this.dayName,
                  classes: [
                    {
                      classTime: this.classTime,
                    },
                  ],
                },
              ],
            },
          ],
        };
        console.log("data after send===>", data);
        try {
          var dataResponse = await this.axios.put(
            "http://localhost:9000/course/" + this.idCourse,
            data
          );
          console.log("dataResponse ===>", dataResponse);
          this.close();
          this.initialize();
        } catch (error) {
          console.log(error.message);
        }
      }
      this.close();
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