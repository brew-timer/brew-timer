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
    addTimer() {
      this.timers.push({ seconds: this.time });
      this.timers.forEach((element) => {
        this.sum += element.seconds
      })
    },

    enableSound(){
      if (this.soundState === "вкл") this.state.soundState = "выкл"
    },

    startTimer() {
      // Получаем текущее время в миллисекундах
      const startTime = Date.now();
      
      // Вычисляем время завершения в миллисекундах
      const endTime = startTime + (this.sum * 1000);
  
      // Функция для обновления оставшегося времени
      const updateTimer = () => {
          const currentTime = Date.now();
          const remainingTime = endTime - currentTime;
  
          // Проверяем, осталось ли время
          if (remainingTime <= 0) {
              clearInterval(timerInterval); // Останавливаем интервал, когда время истекло
              const sound = new Audio('src/audio/end.mp3');
              const timerStore = useTimerStore();
            
              if (this.soundState === "вкл") sound.play();
              
              this.sum = 0;
              this.timers = [];
          } else {
              // Вычисляем оставшееся время в секундах
              const remainingSeconds = Math.round(remainingTime / 1000);
              this.sum = remainingSeconds;
          }
      }
  
      // Запускаем таймер с интервалом в 1 секунду для обновления оставшегося времени
      const timerInterval = setInterval(updateTimer, 1000);
  }
  },
});