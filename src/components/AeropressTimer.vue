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
            },

            var count = 5;
            // запущен таймер или нет
            started = false;

            // запуск таймера по кнопке
            function start() {
            // если таймер уже запущен — выходим из функции
            if (started) {return};
            // запоминаем время нажатия
            var start_time = new Date(); 
            // получаем время окончания таймера
            var stop_time = start_time.setMinutes(start_time.getMinutes() + count); 

            // запускаем ежесекундный отсчёт
            var countdown = setInterval(function() {
                // текущее время
                var now = new Date().getTime();
                // сколько времени осталось до конца таймера
                var remain = stop_time - now; 
                // переводим миллисекунды в минуты и секунды
                var min = Math.floor( (remain % (1000 * 60 * 60)) / (1000 * 60) );
                var sec = Math.floor( (remain % (1000 * 60)) / 1000 );
                // если значение текущей секунды меньше 10, добавляем вначале ведущий ноль
                sec = sec < 10 ? "0" + sec : sec;
                // отправляем значение таймера на страницу в нужный раздел
                document.getElementById("timer").innerHTML = min + ":" + sec;
                // если время вышло
                if (remain < 0) {
                // останавливаем отсчёт
                clearInterval(countdown);
                // пишем текст вместо цифр
                document.getElementById("timer").innerHTML = "Всё!";
                }
            }, 1000);
            // помечаем, что таймер уже запущен
            started = true;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>