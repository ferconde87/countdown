// Get DOM Elements
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const customTimeInput = document.getElementById('customTime');

let defaultTime = 25 * 60; // 25 minutes in seconds
let currentTime = defaultTime;
let timerInterval; // To store the timer interval

// Update timer display
function displayTime() {
    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime % 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    timerDisplay.textContent = `${minutes}:${seconds}`;
    const bellSound = document.getElementById('bellSound');
    bellSound.load(); // Preload the sound
}

// Start timer functionality
startButton.addEventListener('click', () => {
    console.log("Start button clicked!");
    if (timerInterval) return;  // Check if timer is already running

    timerInterval = setInterval(() => {
        currentTime--;
        displayTime();

        if (currentTime <= 0) {
            clearInterval(timerInterval);
            // Play audio cue

            bellSound.play(); // Play the bell sound
            resetButton.disabled = false; // Enable reset button after timer ends
        }
    }, 1000); // Interval set to 1 second (1000 milliseconds)
    resetButton.disabled = true; // Disable reset button while timer is running
});


// Reset timer functionality
resetButton.addEventListener('click', () => {
    currentTime = defaultTime;
    displayTime();
    clearInterval(timerInterval); // Clear any running timer interval
    timerInterval = null; // Set timerInterval to null to indicate timer is stopped
    resetButton.disabled = true; // Disable reset button again
});

// Call `displayTime` to initialize the timer on page load
displayTime();
