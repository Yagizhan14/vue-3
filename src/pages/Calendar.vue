<template>
  <div class="m-auto">
    <h1 class="text-center">Vue Calendar</h1>
    <h2 class="text-center">{{ currentMonthName }} - {{ currentYear }}</h2>
    <section class="flex my-2">
      <p
        class="p-2 font-bold text-center"
        style="width:14.28%"
        v-for="day in days"
        :key="day"
      >
        {{ day }}
      </p>
    </section>
    <section class="flex flex-wrap">
      <p
        class="p-2 text-center"
        style="width:14.28%"
        v-for="num in getStartDay()"
        :key="num"
      ></p>
      <p
        class="p-2 text-center"
        style="width:14.28%"
        v-for="num in getDaysInMonth()"
        :key="num"
        :class="getCurrentDateClass(num)"
      >
        {{ num }}
      </p>
    </section>
    <section class="flex justify-between my-4 items-center">
      <button @click="onPreviousMonth" class="border p-2 px-4 rounded">
        Previous
      </button>
      <button @click="onNextMonth" class="border p-2 px-4 rounded">Next</button>
    </section>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  data() {
    return {
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      currentDate: new Date().getDate(),
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
    };
  },
  methods: {
    getDaysInMonth() {
      return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    },
    getStartDay() {
      return new Date(this.currentYear, this.currentMonth, 1).getDay();
    },
    onNextMonth() {
      if (this.currentMonth === 11) {
        this.currentYear++;
        this.currentMonth = 0;
      } else {
        this.currentMonth++;
      }
    },
    onPreviousMonth() {
      if (this.currentMonth === 0) {
        this.currentYear--;
        this.currentMonth = 11;
      } else {
        this.currentMonth--;
      }
    },
    getCurrentDateClass(num) {
      return (
        new Date(this.currentYear, this.currentMonth, num).toDateString() ===
          new Date().toDateString() && "text-yellow-600"
      );
    },
  },
  computed: {
    currentMonthName() {
      return new Date(this.currentYear, this.currentMonth).toLocaleString(
        "default",
        {
          month: "long",
        },
      );
    },
  },
};
</script>

<style></style>
