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
                    v-model="time"
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
                    {{ calcSec() }}
                </v-container>
                <v-btn
                    @click="startTimer">
                    Начать таймер
                </v-btn>
                <v-switch
                    v-model="soundState"
                    hide-details
                    true-value="вкл"
                    false-value="выкл"
                    color="primary"
                    :label="`Звук: ${soundState}`"
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
    export default {
        data(){
            return{
                time: 30,
                timer: [],
                sum: 0,
                soundState: "вкл",
            }
        },
        methods:{
            calcSec(){
                this.timer.forEach((element) => {
                    this.sum += element.seconds
                })
            },

            addTimer(){
                this.timer.push({seconds: this.time})
            },

            startTimer(){
                let a = setInterval(function (){
                    alert('test')
                    this.sum -= 1;
                    if (this.sum == 0){
                        clearInterval(a);
                    }
                }, 1000);
                if (this.sum === 0) this.playSound();
            },

            playSound(){
                const sound = new Audio('src/audio/end.mp3');
                if (this.soundState === "вкл") sound.play();
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>