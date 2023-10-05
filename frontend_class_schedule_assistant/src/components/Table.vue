<template>
  <v-card>
    <v-card-title> Student Timetable </v-card-title>
    <v-card-text>
      <v-row>
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
          v-for="timeSlot in timeSlots"
          :key="timeSlot"
          class="time-slot-col"
          cols="1"
        >
          <!-- Display timetable information here for the specific day and time slot -->
          <div v-if="timetableEntryExists(day.day, timeSlot)">
            {{ getTimetableEntry(day.day, timeSlot).subject }}
            <br />
            {{ getTimetableEntry(day.day, timeSlot).location }}
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
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
        "18.00-19.00"
      ],
      timetable: [
        {
          day: "Mon",
          entries: {
            "08.00-09.00": { subject: "Math", location: "Room 101" },
            "11.00-12.00": { subject: "History", location: "Room 202" },
          },
        },
        {
          day: "Tue",
          entries: {
            "09.00-10.00": { subject: "Science", location: "Room 103" },
          },
        },
        {
          day: "Wed",
          entries: {
            "09.00-10.00": { subject: "Science", location: "Room 103" },
          },
        },
        {
          day: "Thu",
          entries: {
            "09.00-10.00": { subject: "Science", location: "Room 103" },
          },
        },
        {
          day: "Fri",
          entries: {
            "09.00-10.00": { subject: "Science", location: "Room 103" },
          },
        },
        {
          day: "Sat",
          entries: {
            "09.00-10.00": { subject: "Science", location: "Room 103" },
          },
        },
        {
          day: "Sun",
          entries: {
            "09.00-10.00": { subject: "Science", location: "Room 103" },
          },
        }
        // Add more days and timetable entries here
      ],
    };
  },
  methods: {
    timetableEntryExists(day, timeSlot) {
      const dayEntry = this.timetable.find((entry) => entry.day === day);
      return dayEntry && dayEntry.entries[timeSlot];
    },
    getTimetableEntry(day, timeSlot) {
      const dayEntry = this.timetable.find((entry) => entry.day === day);
      return dayEntry ? dayEntry.entries[timeSlot] : {};
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
  