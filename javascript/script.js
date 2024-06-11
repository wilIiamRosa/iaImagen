function updateClock() {
    const clock = document.querySelector('.clock');
    const hourHand = clock.querySelector('.hour-hand');
    const minuteHand = clock.querySelector('.minute-hand');
    const secondHand = clock.querySelector('.second-hand');

    const now = new Date();
    const hours = (now.getUTCHours() - 3 + 24) % 24; // Ajuste para horário de Brasília (UTC-3)
    const minutes = now.getUTCMinutes();
    const seconds = now.getUTCSeconds();

    const hoursDegrees = ((hours / 12) * 360) + 90;
    const minutesDegrees = ((minutes / 60) * 360) + 90;
    const secondsDegrees = ((seconds / 60) * 360) + 90;

    hourHand.style.transform = `translateX(-50%) rotate(${hoursDegrees}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minutesDegrees}deg)`;
    secondHand.style.transform = `translateX(-50%) rotate(${secondsDegrees}deg)`;
}

setInterval(updateClock, 1000);
updateClock();

// Cronômetro
let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;

const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const display = document.getElementById('display');

function startStop() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateStopwatch, 1000);
        startStopButton.textContent = 'Stop';
        running = true;
    } else {
        clearInterval(tInterval);
        startStopButton.textContent = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    display.textContent = '00:00:00';
    startStopButton.textContent = 'Start';
    running = false;
}

function updateStopwatch() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    display.textContent = 
        (hours < 10 ? '0' + hours : hours) + ':' + 
        (minutes < 10 ? '0' + minutes : minutes) + ':' + 
        (seconds < 10 ? '0' + seconds : seconds);
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
