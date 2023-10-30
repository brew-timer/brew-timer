<script>
function countdownTimer(seconds) {
    // Получаем текущее время в миллисекундах
    const startTime = Date.now();
    
    // Вычисляем время завершения в миллисекундах
    const endTime = startTime + (seconds * 1000);

    // Функция для обновления оставшегося времени
    function updateTimer() {
        const currentTime = Date.now();
        const remainingTime = endTime - currentTime;

        // Проверяем, осталось ли время
        if (remainingTime <= 0) {
            clearInterval(timerInterval); // Останавливаем интервал, когда время истекло
            console.log("Время истекло!");
        } else {
            // Вычисляем оставшееся время в секундах
            const remainingSeconds = Math.round(remainingTime / 1000);
            console.log(`Осталось времени: ${remainingSeconds} секунд`);
        }
    }

    // Запускаем таймер с интервалом в 1 секунду для обновления оставшегося времени
    const timerInterval = setInterval(updateTimer, 1000);
}

// Пример использования функции таймера обратного отсчета на 60 секунд
countdownTimer(60);
</script>