window.addEventListener('DOMContentLoaded', (event) => {
    let timer = document.getElementById('timer');
    const startBtn = document.getElementById('start-button');
    const stopBtn = document.getElementById('stop-button');
    const resetBtn = document.getElementById('reset-button');

    let timerId;
    let lastStartTime = 0;
    let millisElapsedBeforeLastStart = 0;
    const INTERVAL_MS = 1000 / 60;

    startBtn.addEventListener('click', startTimer);
    stopBtn.addEventListener('click', stopTimer);
    resetBtn.addEventListener('click', resetTimer);


    function startTimer() {
        startBtn.disabled = true;
        stopBtn.disabled = false;
        resetBtn.disabled = true;

        lastStartTime = Date.now();
        timerId = setInterval(updateTimer, INTERVAL_MS);
    }

    function stopTimer() {
        startBtn.disabled = false;
        stopBtn.disabled = true;
        resetBtn.disabled = false;
        millisElapsedBeforeLastStart += Date.now() - lastStartTime;
        console.log(millisElapsedBeforeLastStart);
        clearInterval(timerId);
    }

    function resetTimer() {
        resetBtn.disabled = true;
        timer.textContent = "00:00:000";
        millisElapsedBeforeLastStart = 0;
    }

    function updateTimer() {
        const millisElapsed = Date.now() - lastStartTime + millisElapsedBeforeLastStart;
        const secsElapsed = millisElapsed / 1000;
        const minsElapsed = secsElapsed / 60;

        const milliText = formatNumber(millisElapsed % 1000, 3);
        const secsText = formatNumber(Math.floor(secsElapsed) % 60, 2);
        const minsText = formatNumber(Math.floor(minsElapsed), 2);
        timer.textContent = `${minsText}:${secsText}:${milliText}`;
    }

    function formatNumber(number, desiredLength) {
        const stringNumber = String(number);
        return stringNumber.padStart(desiredLength, '0');
    }
});