<template>
  <div>
    <v-card>
      <v-card-title> Student Timetable </v-card-title>
      <v-card-text>
        <v-row >
          <!-- Header row with time slots -->
          <v-col
            class="header-col"
            cols="1"
            v-for="timeSlot in timeSlots"
            :key="timeSlot"
          >
            {{ timeSlot }}
          </v-col>
        </v-row>
        <!-- Timetable grid -->
        <v-row v-for="day in timetable" :key="day.day">
          <!-- Day column -->
          <v-col class="day-col" cols="1">
            {{ day.day }}
          </v-col>
          <!-- Time slots for each day -->
          <v-col
            v-for="newtimeSlot in newtimeSlots"
            :key="newtimeSlot"
            class="time-slot-col"
            cols="1"
          >
            <div v-if="timetableEntryExists(day.day, newtimeSlot)">
              {{ getTmpCode(day.day, newtimeSlot) }}
            </div>
          </v-col>
        </v-row>
      </v-card-text> </v-card
    ><br />
    <label>This is all your seleted courses</label><br /><br />
    <v-chip v-for="course in courses" :key="course.code">{{
      course.code
    }}</v-chip>
  </div>
</template>
  
  <script>
export default {
  name: "Table",
  data() {
    return {
      timeSlots: [
        "Day/Time ",
        "08.00-09.00",
        "09.00-10.00",
        "10.00-11.00",
        "11.00-12.00",
        "12.00-13.00",
        "13.00-14.00",
        "14.00-15.00",
        "15.00-16.00",
        "16.00-17.00",
        "17.00-18.00",
        "18.00-19.00",
      ],
      newtimeSlots: [
        "08.00-09.00",
        "09.00-10.00",
        "10.00-11.00",
        "11.00-12.00",
        "12.00-13.00",
        "13.00-14.00",
        "14.00-15.00",
        "15.00-16.00",
        "16.00-17.00",
        "17.00-18.00",
        "18.00-19.00",
      ],
      timetable: [
        {
          day: "MON",
        },
        {
          day: "TUE",
        },
        {
          day: "WED",
        },
        {
          day: "THU",
        },
        {
          day: "FRI",
        },
        {
          day: "SAT",
        },
        {
          day: "SUN",
        },
        // Add more days and timetable entries here
      ],
      courses: [],
      tmpCode: "",
      testCourse: [
        {
          courseId: 1,
          code: "000-000",
          courseName: "courseName",
          credit: "1.0",
          day: "Mon",
          time: "13.00-14.00",
        },
      ],
      RecieveSelectedCourse: null,
    };
  },
  created() {
    this.getSelectedCourse();
    this.prepareData();
  },
  methods: {
    timetableEntryExists(day, timeSlot) {
      for (const course of this.courses) {
        if (course.day == day && course.time == timeSlot) {
          return true;
        }
      }
      return false;
    },
    getTmpCode(day, timeSlot) {
      const course = this.courses.find(
        (course) => course.day === day && course.time === timeSlot
      );
      console.log("getTmpCode Course===>", course);
      return course ? course.code : "";
    },

    getSelectedCourse() {
      if (localStorage.getItem("selectedCourse") != null) {
        this.RecieveSelectedCourse = JSON.parse(
          localStorage.getItem("selectedCourse")
        );
        var tmp = localStorage.getItem("selectedCourse");
        // console.log("Receive Coursed ===>", this.RecieveSelectedCourse);
        var day = this.RecieveSelectedCourse[0].sections[0].days[0].dayName;
        // console.log("this is day name===>", day);
      }
    },
    prepareData() {
      this.RecieveSelectedCourse.forEach((course) => {
        // console.log("course==>", course);
        this.courses.push({
          courseId: course.courseId,
          code: course.code,
          courseName: course.courseName,
          credit: course.credit,
          day: course.sections[0].days[0].dayName,
          time: course.sections[0].days[0].classes[0].classTime,
        });
        console.log("this is course", this.courses);
      });
    },
  },
};
</script>
  
  <style scoped>
.header-col {
  font-weight: bold;
  border-bottom: 2px solid #ccc;
  text-align: left;
}

.day-col {
  font-weight: bold;
  text-align: center;
}

.time-slot-col {
  border: 1px solid #ccc;
  text-align: center;
}
</style>
  