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
                    {{ timerStore.sum }}
                </v-container>
                <v-btn @click="playSound">
                  sound test
                </v-btn>
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

            async function asyncTest() {
                try {
                    // Загрузка аудио файла с помощью fetch или axios
                    timerStore.isLoading = true;
                    const response = await fetch('https://corsproxy.io/?' + encodeURIComponent('https://drive.google.com/uc?id=1GXfIo2F69q9UJkl0cnEsW7bUmzEObo5t&export=download'));
                    const audioBlob = await response.blob();

                    // Создание нового объекта Audio
                    const audio = new Audio();
                    audio.src = URL.createObjectURL(audioBlob);

                    // Воспроизведение аудио
                    timerStore.isLoading = false;
                    audio.play();
                } catch (error) {
                    alert('Произошла ошибка:', error);
                }
            }

            // Функция для воспроизведения аудио
            function playAudio(src) {
            const audio = new Audio(src);
            if (timerStore.soundState === "вкл") audio.play();
            }

            const playSound = function(){
            // const sound = new Audio('https://drive.google.com/uc?id=1GXfIo2F69q9UJkl0cnEsW7bUmzEObo5t&export=download');
            // const sound = new Audio('src/audio/end.mp3');
                const audioURL = ('https://drive.google.com/uc?id=1GXfIo2F69q9UJkl0cnEsW7bUmzEObo5t&export=download');

                fetch(audioURL)
                .then(response => {
                    // Если запрос прошел успешно, попытаемся воспроизвести аудио
                    return response.blob();
                })
                .then(blob => {
                    // Попытка конвертировать полученные данные в URL для воспроизведения
                    const audioSrc = URL.createObjectURL(blob);

                    // Сохраняем URL аудиофайла в localStorage
                    localStorage.setItem('audioSrc', audioSrc);

                    // Пытаемся воспроизвести аудио
                    playAudio(audioSrc);
                })
                .catch(() => {
                    // Если запрос не удался из-за ошибки CORS, используем сохраненный URL из localStorage
                    const storedAudioSrc = localStorage.getItem('audioSrc');
                    if (storedAudioSrc) {
                    playAudio(storedAudioSrc);
                    } else {
                    alert('Не удалось загрузить аудио и нет сохраненного URL.');
                    }
                });
                
            }
            return { timerStore, playSound, addTimer, enableSound, startTimer, asyncTest};
        },
    };
</script>

<style lang="scss" scoped>

</style>