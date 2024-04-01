// Get DOM Elements
const timerOutput = document.getElementById('timer'); // Use timerOutput consistently
const startPauseButton = document.getElementById('startPauseButton');
const resetButton = document.getElementById('resetButton');
const customTimeInput = document.getElementById('customTime');
const timerContainer = document.getElementById('timerContainer');
const timerInput = document.getElementById('timerInput'); // Use timerInput consistently
const editButton = document.getElementById('editButton');
const bellSound = document.getElementById('bellSound');

// Variables
let defaultTime = 25 * 60; // 25 minutes in seconds
let currentTime = defaultTime;
let timerInterval; // To store the timer interval
let isPaused = false; // Initial state is not paused

// Event Listeners
startPauseButton.addEventListener('click', startPauseTimer);
resetButton.addEventListener('click', resetTimer);
timerContainer.addEventListener('click', editTimer);
editButton.addEventListener('click', saveTimerOnEditButton);
timerInput.addEventListener('change', onTimerChange);
timerInput.addEventListener('keyup', saveTimerOnEnterKey);

// Functions
startPauseButton.addEventListener('click', startPauseTimer);

function saveTimerOnEditButton(event) {
    saveTimer();
    event.stopPropagation();
}

function startPauseTimer() {
    if (isPaused) {
        startTimer(); // Resume the timer
        startPauseButton.textContent = "Pause";
    } else {
        pauseTimer(); // Pause the timer
        startPauseButton.textContent = "Start";
    }
    isPaused = !isPaused; // Toggle the isPaused flag
}

function pauseTimer() {
    clearInterval(timerInterval); // Clear the interval to pause the timer
    timerInterval = null; // Set timerInterval to null to indicate timer is stopped
    resetButton.disabled = false; // Enable reset button when timer is paused
}

function startTimer() {
    if (timerInterval) return;  // Check if timer is already running

    timerInterval = setInterval(() => {
        currentTime--;
        displayTime();

        if (currentTime <= 0) {
            clearInterval(timerInterval);
            // Play audio cue when timer ends
            bellSound.play(); // Play the bell sound
            resetButton.disabled = false; // Enable reset button after timer ends
        }
    }, 1000); // Interval set to 1 second (1000 milliseconds)
    resetButton.disabled = true; // Disable reset button while timer is running

}

function resetTimer() {
    currentTime = defaultTime;
    displayTime();
    clearInterval(timerInterval); // Clear any running timer interval
    timerInterval = null; // Set timerInterval to null to indicate timer is stopped
    resetButton.disabled = true; // Disable reset button again
}

function editTimer() {
    showInput(); // Show the input field
    showEditButton();
    hideTimer(); // Hide timer text
    timerInput.focus(); // Set focus to the input
}

function saveTimer() {
    const newTime = parseInt(timerInput.value) * 60;
    defaultTime = newTime;
    currentTime = newTime;
    timerOutput.textContent = timerInput.value; // Update the output element
    displayTime();
    hideEditButton();
    hideInput();
    showTimer();
}

function onTimerChange() {
    defaultTime = customTimeInput.value * 60; // Convert minutes to seconds
    currentTime = defaultTime;
    displayTime();
}

function saveTimerOnEnterKey(event) {
    if (event.key === 'Enter') {
        saveTimer();
    }
}

// Helper Functions
function displayTime() {
    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime % 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    timerOutput.textContent = `${minutes}:${seconds}`;

    bellSound.load(); // Preload the sound
}

function showTimer() {
    timerOutput.style.display = 'inline-block'; // Update to show the output element
}

function hideTimer() {
    timerOutput.style.display = 'none'; // Update to hide the output element
}

function showInput() {
    timerInput.style.display = 'inline-block';
}

function hideInput() {
    timerInput.style.display = 'none';
}

function showEditButton() {
    editButton.style.display = 'inline-block';
}

function hideEditButton() {
    editButton.style.display = 'none';
}

// Call `displayTime` to initialize the timer on page load
displayTime();
