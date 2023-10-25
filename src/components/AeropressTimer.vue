<template>
    <div>
        <v-card
            width="800px"
            title="Аэропресс таймер"
            text="Выбери нужные таймеры на нужное время заваривания"
        >
            <v-responsive
                class="mx-auto"
                max-width="344"
            >
                <v-text-field
                    v-model="time"
                    clearable
                    hide-details="auto"
                    label="Время"
                    justify-content ="center"
                ></v-text-field>
                <v-btn
                    variant="tonal"
                    @click="addTimer"
                >
                    Добавить таймер
                </v-btn>
                <v-card>
                    {{ sum }}
                </v-card>
                <v-btn
                    @click="startTimer">
                    Начать таймер
                </v-btn>
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
                time: 0,
                timer: [],
                sum: 0,
            }
        },
        methods:{
            addTimer(){
                this.timer.push({seconds: this.time})
            },

            startTimer(){
                for (let t of this.timer){
                    this.sum+=Number(t.seconds);
                }
                setInterval()
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>