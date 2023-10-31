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
                    v-model="timerStore.time"
                    thumb-label="always"
                    step="5"
                    show-ticks
                    h-auto
                    class="h-auto"/>
                <v-btn
                    variant="tonal"
                    @click="addTimer"
                >
                    Добавить таймер
                </v-btn>
                <v-container
                    class="text-h1">
                    <!-- TODO: использовать переменную, а не функцию -->
                    {{ timerStore.sum }}
                </v-container>
                <v-btn
                    @click="startTimer">
                    Начать таймер
                </v-btn>
                <v-switch
                    v-model="timerStore.soundState"
                    hide-details
                    true-value="вкл"
                    false-value="выкл"
                    color="primary"
                    :label="`Звук: ${timerStore.soundState}`"
  ></v-switch>
            </v-responsive>
            <v-divider class="mx-4"></v-divider>
            <div
                v-for="t in timerStore.timers"
                :key="t.seconds"
                display="flex">
                <v-chip>{{t.seconds}}</v-chip>
            </div>
        </v-card>
    </div>
</template>

<script>  
    import { useTimerStore } from '../stores/timerStore';
    import { ref } from 'vue';
    
    export default {
        name: "AeropressTimer",
        setup(){
            const timerStore = useTimerStore();

            function addTimer(){
                timerStore.addTimer()
            }
            
            const enableSound = () => {
                timerStore.enableSound()
            }

            const startTimer = () => {
                timerStore.startTimer()
            }

            const playSound = function(){
            const sound = new Audio('src/audio/end.mp3');
            
            if (timerStore.soundState === "вкл") sound.play();
            }
            //TODO: сейчас данные идут не из стейт меннеджера, а из данных родителя
            const timerState = {
                time : timerStore.time,
                timers: timerStore.timers,
                sum : timerStore.sum,
                soundState : timerStore.soundState
            }
            return {timerState, timerStore, playSound, addTimer, enableSound, startTimer};
        },
    };
</script>

<style lang="scss" scoped>

</style>