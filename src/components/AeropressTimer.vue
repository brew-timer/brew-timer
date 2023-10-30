<template>
    <div>
        <v-card
            width="500"
            title="Аэропресс таймер"
            text="Выбери нужные таймеры на нужное время заваривания"
        >
            <v-responsive
                
                max-width="450"
                class="spacing-playground pa-10"
                fluid
            >
                <!-- <v-text-field
                    v-model="time"
                    clearable
                    hide-details="auto"
                    label="Время"
                    justify-content ="center"
                ></v-text-field> -->
                <v-slider
                    v-model="timerState.time"
                    thumb-label="always"
                    step="5"
                    show-ticks
                    h-auto
                    class="h-auto"/>
                <v-btn
                    variant="tonal"
                    @click="addTimer()"
                >
                    Добавить таймер
                </v-btn>
                <v-btn @click="playSound">
                    sound test
                </v-btn>
                <v-container
                    class="text-h1">
                    <!-- TODO: использовать переменную, а не функцию -->
                    {{ sum }}
                </v-container>
                <v-btn
                    @click="playSound">
                    Начать таймер
                </v-btn>
                <v-switch
                    v-model="timerState.soundState"
                    hide-details
                    true-value="вкл"
                    false-value="выкл"
                    color="primary"
                    :label="`Звук: ${timerState.soundState}`"
  ></v-switch>
            </v-responsive>
            <v-divider class="mx-4"></v-divider>
            <div
                v-for="t in timer"
                :key="t.seconds"
                display="flex">
                <v-chip>{{t.seconds}}</v-chip>
            </div>
        </v-card>
    </div>
</template>

<script>  
    // import {playSound} from '../components/utility/EndSound.vue';ß
    import { useTimerStore } from '../stores/timerStore';
    
    export default {
        name: "AeropressTimer",
        setup(){
            const timerStore = useTimerStore();
            
            const playSound = function(){
            const sound = new Audio('src/audio/end.mp3');
            const timerStore = useTimerStore();
            
            if (timerStore.soundState === "вкл") sound.play();
            }
            //TODO: сейчас данные идут не из стейт меннеджера, а из данных родителя
            const timerState = {
                time : timerStore.time,
                timers: timerStore.timers,
                sum : timerStore.sum,
                soundState : timerStore.soundState
            }
            return {timerState, playSound};
        },
    };
</script>
<!-- <script>
import { useTimerStore } from '../stores/timerStore';
import { ref, computed } from 'vue';

export default{
setup(){
    const timerStore = useTimerStore();

    // Используйте реактивные переменные внутри setup()
    const time = ref(timerStore.time);
    const timers = ref(timerStore.timers);
    const sum = computed(() => timerStore.sum.value);
    const soundState = ref(timerStore.soundState);

    // Методы, которые вы хотите использовать в шаблоне
    const addTimer = () => {
      timerStore.addTimer();
    };

    const startTimer = () => {
      timerStore.startTimer();
    };

    const playSound = () => {
      // Логика для воспроизведения звука
    };

    // Возвращаемые значения, доступные в шаблоне
    return {
      time,
      timers,
      sum,
      soundState,
      addTimer,
      startTimer,
      playSound,
    };
  },
};
</script> -->


<style lang="scss" scoped>

</style>