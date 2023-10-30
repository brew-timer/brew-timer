<script>
import {useTimerStore} from "src/stores/timerStore.js";

export function playSound(){
            const sound = new Audio('src/audio/end.mp3');
            const timerStore = useTimerStore();
            
            if (timerStore.soundState === "вкл") sound.play();
            }
</script>