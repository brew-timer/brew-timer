import { defineStore } from 'pinia';
import { ref, computed } from "vue";

export const useTimerStore = defineStore({
  id: "timer",
  state: () => ({
    time: ref(30),
    timers: ref([]),
    sum: ref(0),
    soundState: ref("вкл"),
  }),

  getters: {
    calcSec(state) {
      return computed(() => {
        return state.timers.reduce((acc, timerItem) => acc + timerItem.seconds, 0);
      });
    },
  },

  actions: {
    addTimer({ state }) {
      state.timers.push({ seconds: state.time });
    },

    startTimer({ state }) {
      const startTime = Date.now();
      const endTime = startTime + (state.sum.value * 1000);

      function updateTimer() {
        const currentTime = Date.now();
        const remainingTime = endTime - currentTime;

        if (remainingTime <= 0) {
          clearInterval(timerInterval);
          console.log("Время истекло!");
        } else {
          const remainingSeconds = Math.round(remainingTime / 1000);
          console.log(`Осталось времени: ${remainingSeconds} секунд`);
        }
      }

      const timerInterval = setInterval(updateTimer, 1000);
    },
  },
});