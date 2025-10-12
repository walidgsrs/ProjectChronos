// Aethesi Supremacy Protocol: OPERATION: CHRONOS - The Final Forging (Resilient Core)
// Doctrinal Engineer: Forge

// --- Core Constants ---
const targetDate = new Date('2028-05-21T00:00:00+01:00');

// --- Audio Arsenal ---
const pulseAudio = new Audio('Pulse.mp3');
const strategicRippleAudio = new Audio('laser_hit.wav');
const tacticalRippleAudio = new Audio('se_dashpanel_d.mp3');
const sprintStartAudio = new Audio('play.wav');
const adrenalineStartAudio = new Audio('Boost.mp3');
const flowRippleAudio = new Audio('Dash.mp3');
const cancelSprintAudio = new Audio('Death.mp3');
const completeSprintAudio = new Audio('highscore.wav');
const endSprintAudio = new Audio('Drop.mp3');

[pulseAudio, strategicRippleAudio, tacticalRippleAudio, sprintStartAudio, adrenalineStartAudio, flowRippleAudio, cancelSprintAudio, completeSprintAudio, endSprintAudio].forEach(audio => audio.volume = 1.0);

// --- The EψM Doctrine Data Store ---
const BRUNNIAN_QUOTES = [
    "The amateur seeks knowledge within a single book. The emperor builds a library of 'unrelated' books and finds the single, secret text written in the margins between them all.",
    "Every system has a source code. Our hunt is for the single line of forgotten history that explains the machine learning algorithm. That is the nature of the Synthesis Engine.",
    "Creativity is the act of remembering a future you haven't seen yet by connecting pasts you were never a part of.",
    "A fact is a brick. An insight is a blueprint. But synthesis... synthesis is the act of seeing the quarry, the brickyard, and the cathedral all at once.",
    "Do not study subjects. Study connections. The space between the disciplines is where reality-bending power is found.",
    "A single new connection between two old ideas is a weapon more powerful than a thousand memorized facts.",
    "The Zeroth Law: True mastery is not knowing the answer, but knowing which two 'unrelated' questions share a single, hidden answer.",
    "The completionist does not stop when the game is won; he stops when there are no more assets to seize. The board is just the beginning.",
    "Never just win the argument. Colonize the intellectual territory so that your opponent's next argument must be framed in your language.",
    "A good strategist wins on the current map. A sovereign ruler terraforms a new one where their victory is the only possible outcome.",
    "Resource maximization is not a business tactic; it is a moral imperative. Wasted potential is the only true failure.",
    "The hunt is for everything: every underrated book, every forgotten piece of code, every marginal gain. We do this not from greed, but from the cold certainty that supremacy is built on an overwhelming asymmetry of assets.",
    "Leave no stone unturned. No page unread. No opportunity unexploited. This is not about being a perfectionist; it's about being an apex predator.",
    "Your 'rivals' are a valuable resource. Hunt down the secrets of their success, absorb their strengths, and then thank them as you leave them behind.",
    "The goal is not a longer essay; the goal is a heavier one. We measure our work not in words, but in intellectual density.",
    "A shallow yellow idea, compressed under immense strategic pressure, becomes a white-hot singularity of undeniable truth.",
    "Ruthlessly hunt down and execute every sentence, every word, every pixel that does not pay its rent in pure, unadulterated value.",
    "Do not build a bigger sword. Forge a smaller, denser blade that can cut through steel.",
    "The amateur expands to show his knowledge. The master condenses to prove it.",
    "In an age of infinite noise, the rarest and most powerful asset is a single, perfectly forged point of crystalline clarity.",
    "Osmium isn't a process; it's a promise. A promise that every asset we create will be an unbreakable, inescapable, and unignorable concentration of pure power."
];

// --- DOM Element Leverage ---
const bodyElement = document.body;
const timeValueDisplay = document.getElementById('time-value');
const timeUnitDisplay = document.getElementById('time-unit');
const sublimatedMacroValue = document.getElementById('macro-value');
const sublimatedMacroUnit = document.getElementById('macro-unit');
const targetDateDisplay = document.getElementById('target-date-display');
const sublimatedTargetDate = document.getElementById('sublimated-target-date');
const realtimeClockDisplay = document.getElementById('realtime-clock');
const modeSwitches = document.querySelectorAll('input[name="mode"]');
const fullscreenToggle = document.getElementById('fullscreen-toggle');
const rippleContainer = document.getElementById('ripple-effect-container');
const sprintDurationInput = document.getElementById('sprint-duration-input');
const launchSprintButton = document.getElementById('launch-sprint-button');
const cancelSprintButton = document.getElementById('cancel-sprint-button');
const completeSprintButton = document.getElementById('complete-sprint-button');
const flowQuoteDisplay = document.getElementById('flow-quote-display');
const starfieldContainer = document.getElementById('starfield-container');
const postSprintOverlay = document.getElementById('post-sprint-overlay');
const postSprintMessage = document.getElementById('post-sprint-message');
const sprintGoalTracker = document.getElementById('sprint-goal-tracker');
const sprintGoalInput = document.getElementById('sprint-goal-input');
const sprintGoalDisplay = document.getElementById('sprint-goal-display');
const sprintProgressDisplay = document.getElementById('sprint-progress-display');
// --- NEW: Forged Input Control Levers ---
const goalDecrement = document.getElementById('goal-decrement');
const goalIncrement = document.getElementById('goal-increment');
const sprintDecrement = document.getElementById('sprint-decrement');
const sprintIncrement = document.getElementById('sprint-increment');
const taskNameContainer = document.getElementById('task-name-container');
const taskNameDisplay = document.getElementById('task-name');
const taskNameInput = document.getElementById('task-name-input');
const editTaskNameButton = document.getElementById('edit-task-name-button');

// --- System State Variables ---
let currentMode = 'home';
taskNameContainer.classList.remove('editing'); // Ensure editing mode is cancelled on sprint end
let isSprintActive = false;
let animationTimeout, rippleTimeout, masterInterval;
let flowStateAnimationId, digitFlashTimeoutId, quoteInterval;
let flashIndex = -1, quoteIndex = 0;
let sprintInitialDuration, sprintEndTime, adrenalinePhaseTriggered = false;
let sprintGoal = 0;
let sprintsCompleted = 0;
let isDebriefingActive = false; // NEW: Gatekeeper for post-sprint feedback
let currentTaskName = "Tactical Sprint";

// --- Core State Machine ---
function setMode(newMode) {
    if (isSprintActive) return;
    if (currentMode === newMode) return;
    currentMode = newMode;
    updateBodyClass();
    updateDisplay();
}

function updateBodyClass() {
    bodyElement.className = '';
    bodyElement.classList.add(`${currentMode}-mode`);
    if (document.fullscreenElement || document.webkitFullscreenElement) {
        bodyElement.classList.add('fullscreen-active');
    }
    if (isSprintActive) {
        bodyElement.classList.add('sprint-active');
        if (adrenalinePhaseTriggered) {
            bodyElement.classList.add('adrenaline-phase');
        } else {
            bodyElement.classList.add('flow-state');
        }
    }
}

// --- INNOVATION: Celestial Starfield Engine ---
function createStarfield(starCount = 75) { // Increased density from 50 to 75
    starfieldContainer.innerHTML = '';
    // --- NEW: Define the celestial palette ---
    const starColors = ['blue-white', 'yellow', 'bright-red', 'blue'];

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // --- NEW: Randomly assign a color class from the palette ---
        const colorClass = starColors[Math.floor(Math.random() * starColors.length)];
        star.classList.add(colorClass);
        
        const size = Math.random() * 2.5 + 1.5; // Stars between 1.5px and 4px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        star.style.top = `${Math.random() * 60}%`;
        star.style.left = `${Math.random() * 100}%`;
        
        star.style.animationDuration = `${Math.random() * 5 + 3}s`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        starfieldContainer.appendChild(star);
    }
}

function destroyStarfield() {
    starfieldContainer.innerHTML = '';
}

// --- Flow State & Motivational Engines ---
function updateFlowStateAesthetics() {
    const hue = (Date.now() / 83) % 360;
    const color = `hsl(${hue}, 100%, 70%)`;
    const shadowColor = `hsla(${hue}, 100%, 70%, 0.25)`;
    bodyElement.style.setProperty('--dynamic-color', color);
    bodyElement.style.setProperty('--dynamic-shadow-color', shadowColor);
    flowStateAnimationId = requestAnimationFrame(updateFlowStateAesthetics);
}
function startFlowStateAesthetics() {
    if (flowStateAnimationId) cancelAnimationFrame(flowStateAnimationId);
    flowStateAnimationId = requestAnimationFrame(updateFlowStateAesthetics);
}
function stopFlowStateAesthetics() {
    cancelAnimationFrame(flowStateAnimationId);
    bodyElement.style.removeProperty('--dynamic-color');
    bodyElement.style.removeProperty('--dynamic-shadow-color');
}
function digitizeTimer(text) {
    timeValueDisplay.innerHTML = text.split('').map(char => `<span class="digit">${char === ':' ? '&#x2B25;' : char}</span>`).join('');
}
function startDigitFlasher() {
    stopDigitFlasher();
    flashIndex = -1;
    flashNextDigit();
}
function flashNextDigit() {
    const digits = timeValueDisplay.querySelectorAll('.digit');
    if (!isSprintActive || digits.length === 0 || adrenalinePhaseTriggered) return;
    let nextIndex = flashIndex;
    let nextDigit;
    do {
        nextIndex = (nextIndex + 1) % digits.length;
        nextDigit = digits[nextIndex];
    } while (nextDigit && !nextDigit.textContent.match(/[a-zA-Z0-9]/) && nextIndex !== flashIndex)
    flashIndex = nextIndex;
    digits[flashIndex].classList.add('flash');
    digitFlashTimeoutId = setTimeout(() => {
        if (digits[flashIndex]) digits[flashIndex].classList.remove('flash');
        digitFlashTimeoutId = setTimeout(flashNextDigit, 2000);
    }, 5000);
}
function stopDigitFlasher() {
    clearTimeout(digitFlashTimeoutId);
    const flashedDigits = timeValueDisplay.querySelectorAll('.digit.flash');
    flashedDigits.forEach(d => d.classList.remove('flash'));
}
function startQuoteCycler() {
    stopQuoteCycler();
    displayNextQuote();
    quoteInterval = setInterval(displayNextQuote, 30000);
}
function stopQuoteCycler() {
    clearInterval(quoteInterval);
    flowQuoteDisplay.classList.remove('visible');
}
function displayNextQuote() {
    flowQuoteDisplay.classList.remove('visible');
    setTimeout(() => {
        quoteIndex = (quoteIndex + 1) % BRUNNIAN_QUOTES.length;
        flowQuoteDisplay.textContent = BRUNNIAN_QUOTES[quoteIndex];
        flowQuoteDisplay.classList.add('visible');
    }, 1000);
}

// --- Sprint Engine ---
function launchSprint() {
    postSprintOverlay.classList.remove('visible'); // Ensure debriefing screen is hidden
    const durationMinutes = parseInt(sprintDurationInput.value, 10);
    if (isNaN(durationMinutes) || durationMinutes <= 0) return;
    sublimatedMacroValue.textContent = timeValueDisplay.textContent;
    sublimatedMacroUnit.textContent = timeUnitDisplay.textContent;
    sprintStartAudio.currentTime = 0;
    sprintStartAudio.play().catch(e => {});
    // Set default task name for new sprint
    currentTaskName = "Tactical Sprint";
    taskNameDisplay.textContent = currentTaskName;
    isSprintActive = true;
    sprintInitialDuration = durationMinutes * 60 * 1000;
    sprintEndTime = Date.now() + sprintInitialDuration;
    adrenalinePhaseTriggered = false;
    updateBodyClass();
    startFlowStateAesthetics();
    startDigitFlasher();
    startQuoteCycler();
    createStarfield();
    updateDisplay();
}

function endSprint(reason = 'timeout') {
    if (!isSprintActive) return;
    isSprintActive = false;
    clearInterval(masterInterval);
    isDebriefingActive = true;

    // --- Debriefing Protocol ---
    let messageHTML = '';
    switch (reason) {
        case 'cancelled':
            cancelSprintAudio.currentTime = 0;
            cancelSprintAudio.play().catch(e => {});
            messageHTML = 'Sprint <span class="glow-purple">Cancelled.</span>';
            break;
        case 'completed':
            completeSprintAudio.currentTime = 0;
            completeSprintAudio.play().catch(e => {});
            messageHTML = 'Sprint <span class="glow-green">Complete!</span>';
            break;
        case 'timeout':
        default:
            endSprintAudio.currentTime = 0;
            endSprintAudio.play().catch(e => {});
            messageHTML = "Time's Up. <span class='glow-orange'>Did you finish?</span>";
            break;
    }

    // --- Performance Ledger Logic ---
    let progressMessage = '';
    if ((reason === 'completed' || reason === 'timeout') && sprintInitialDuration >= 20 * 60 * 1000) {
        sprintsCompleted++;
        saveStateToStorage(); // Correctly calls the restored persistence engine
        updateGoalDisplay();
        if (sprintGoal > 0) {
            const percentage = Math.round((sprintsCompleted / sprintGoal) * 100);
            progressMessage = `${percentage}% of Daily Goal Complete`;
        }
    }
    sprintProgressDisplay.textContent = progressMessage;

    postSprintMessage.innerHTML = messageHTML;
    postSprintOverlay.classList.add('visible');

    setTimeout(() => {
        postSprintOverlay.classList.remove('visible');
        stopFlowStateAesthetics();
        stopDigitFlasher();
        stopQuoteCycler();
        destroyStarfield();
        flowQuoteDisplay.classList.remove('visible');
        sublimatedMacroValue.textContent = '';
        sublimatedMacroUnit.textContent = '';
        isDebriefingActive = false;
        masterInterval = setInterval(updateDisplay, 1000);
        updateBodyClass();
        updateDisplay();
    }, 4500);
}
// --- Kinetic Feedback Core ---
function triggerKineticFeedback(oldValue) {
    if (isDebriefingActive) return; // Mission abort if debriefing is active
    timeValueDisplay.setAttribute('data-old-value', oldValue);
    timeValueDisplay.classList.add('value-changed');
    clearTimeout(animationTimeout);
    animationTimeout = setTimeout(() => { timeValueDisplay.classList.remove('value-changed'); }, 3000);
    rippleContainer.classList.add('ripple-active');
    clearTimeout(rippleTimeout);
    rippleTimeout = setTimeout(() => { rippleContainer.classList.remove('ripple-active'); }, 3000);
    pulseAudio.currentTime = 0;
    pulseAudio.play().catch(e => {});

    if (isSprintActive && !adrenalinePhaseTriggered) {
        flowRippleAudio.currentTime = 0;
        flowRippleAudio.play().catch(e => {});
    } else if (currentMode === 'strategic') {
        strategicRippleAudio.currentTime = 0;
        strategicRippleAudio.play().catch(e => {});
    } else {
        tacticalRippleAudio.currentTime = 0;
        tacticalRippleAudio.play().catch(e => {});
    }
}

// --- RE-FORGED: The Resilient, Self-Correcting Chronomatic Engine ---
function updateDisplay() {
    const now = new Date();
    const oldValue = timeValueDisplay.textContent.replace(/\s/g, '');
    let newValue;

    if (isSprintActive) {
        const timeLeft = sprintEndTime - now.getTime();
        if (!adrenalinePhaseTriggered && timeLeft <= sprintInitialDuration * 0.25) {
            adrenalinePhaseTriggered = true;
            stopFlowStateAesthetics();
            stopDigitFlasher();
            stopQuoteCycler();
            destroyStarfield();
            updateBodyClass();
            adrenalineStartAudio.currentTime = 0;
            adrenalineStartAudio.play().catch(e => {});
        }
        if (timeLeft <= 0) { endSprint('timeout'); return; }
        const minutes = Math.floor((timeLeft / 1000) / 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);
        newValue = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        if (oldValue !== newValue.replace(':', '❖')) {
            digitizeTimer(newValue);
        }
        timeUnitDisplay.textContent = 'SPRINT';

        if (adrenalinePhaseTriggered) {
            if (seconds % 10 === 0 && (sprintInitialDuration - timeLeft) > 1000) {
                triggerKineticFeedback(oldValue);
            }
        } else {
            if (seconds === 59 && (sprintInitialDuration - timeLeft) > 1000) {
                triggerKineticFeedback(oldValue);
            }
        }
    } else {
        switch (currentMode) {
            case 'home':
                newValue = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
                if (oldValue !== newValue) timeValueDisplay.innerHTML = newValue;
                timeUnitDisplay.textContent = '';
                break;
            case 'strategic':
                newValue = Math.floor((targetDate - now) / 36e5).toLocaleString('en-US');
                if (oldValue !== newValue) {
                    timeValueDisplay.innerHTML = newValue;
                    triggerKineticFeedback(oldValue);
                }
                timeUnitDisplay.textContent = "Hours";
                break;
            case 'tactical':
                newValue = Math.floor((targetDate - now) / 6e4).toLocaleString('en-US');
                if (oldValue !== newValue) {
                    timeValueDisplay.innerHTML = newValue;
                    triggerKineticFeedback(oldValue);
                }
                timeUnitDisplay.textContent = "Minutes";
                break;
        }
    }
}


// --- Ancillary Functions ---
function updateRealtimeClock() {
    const now = new Date();
    realtimeClockDisplay.textContent = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
}
function handleHotkeys(event) {
    if (isSprintActive) {
        if (event.key === 'Escape') endSprint('cancelled');
        if (event.shiftKey && event.key.toLowerCase() === 'f') {
            event.preventDefault();
            endSprint('completed');
        }
    } else if (currentMode === 'tactical' && event.key === 'Enter') {
        if (document.activeElement === sprintDurationInput) launchSprint();
    }
}
function toggleFullscreen() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        const docEl = document.documentElement;
        if (docEl.requestFullscreen) docEl.requestFullscreen();
        else if (docEl.webkitRequestFullscreen) docEl.webkitRequestFullscreen();
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    }
}
function updateFullscreenIcon() { updateBodyClass(); }

// --- RE-FORGED: Streamlined Persistence Engine (localStorage only) ---
function saveStateToStorage() {
    const today = new Date().toLocaleDateString();
    localStorage.setItem('aethesiDashboardState', JSON.stringify({
        sprintGoal: sprintGoal,
        sprintsCompleted: sprintsCompleted,
        lastUpdated: today
    }));
}

function loadStateFromStorage() {
    const state = JSON.parse(localStorage.getItem('aethesiDashboardState'));
    const today = new Date().toLocaleDateString();
    
    if (state) {
        if (state.lastUpdated !== today) {
            sprintGoal = state.sprintGoal || 0;
            sprintsCompleted = 0;
        } else {
            sprintGoal = state.sprintGoal || 0;
            sprintsCompleted = state.sprintsCompleted || 0;
        }
    }
    updateGoalDisplay();
    saveStateToStorage();
}

function updateGoalDisplay() {
    sprintGoalInput.value = sprintGoal > 0 ? sprintGoal : '';
    sprintGoalDisplay.textContent = `${sprintsCompleted}/${sprintGoal > 0 ? sprintGoal : '?'}`;
}

// --- System Initialization ---
async function initializeDashboard() {
    const targetText = `Target: ${targetDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
    targetDateDisplay.textContent = targetText;
    sublimatedTargetDate.textContent = targetText;
    
    modeSwitches.forEach(sw => sw.addEventListener('change', () => setMode(sw.value)));
    fullscreenToggle.addEventListener('click', toggleFullscreen);
    launchSprintButton.addEventListener('click', launchSprint);
    cancelSprintButton.addEventListener('click', () => endSprint('cancelled'));
    completeSprintButton.addEventListener('click', () => endSprint('completed'));
    // --- NEW: Mission Designator Listeners ---
    editTaskNameButton.addEventListener('click', () => {
        taskNameContainer.classList.add('editing');
        taskNameInput.value = currentTaskName;
        taskNameInput.focus();
    });

    taskNameInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            currentTaskName = taskNameInput.value.trim() || "Tactical Sprint"; // Fallback to default
            taskNameDisplay.textContent = currentTaskName;
            taskNameContainer.classList.remove('editing');
        }
    });

    taskNameInput.addEventListener('blur', () => { // Confirm on clicking away
        currentTaskName = taskNameInput.value.trim() || "Tactical Sprint";
        taskNameDisplay.textContent = currentTaskName;
        taskNameContainer.classList.remove('editing');
    });
    document.addEventListener('fullscreenchange', updateFullscreenIcon);
    document.addEventListener('webkitfullscreenchange', updateFullscreenIcon);
    document.addEventListener('keydown', handleHotkeys);
    
    goalDecrement.addEventListener('click', () => {
        sprintGoalInput.stepDown();
        sprintGoalInput.dispatchEvent(new Event('change'));
    });
    goalIncrement.addEventListener('click', () => {
        sprintGoalInput.stepUp();
        sprintGoalInput.dispatchEvent(new Event('change'));
    });
    sprintDecrement.addEventListener('click', () => {
        sprintDurationInput.stepDown();
    });
    sprintIncrement.addEventListener('click', () => {
        sprintDurationInput.stepUp();
    });
    
    sprintGoalInput.addEventListener('change', () => {
        sprintGoal = parseInt(sprintGoalInput.value, 10) || 0;
        if (sprintGoal < 0) sprintGoal = 0;
        updateGoalDisplay();
        saveStateToStorage(); // Corrected function call
    });

    loadStateFromStorage(); // Corrected function call
    
    document.body.addEventListener('click', () => { 
        [pulseAudio, strategicRippleAudio, tacticalRippleAudio, sprintStartAudio, adrenalineStartAudio, flowRippleAudio, cancelSprintAudio, completeSprintAudio, endSprintAudio].forEach(a => a.load());
    }, { once: true });
    
    updateDisplay();
    updateRealtimeClock();
}

// --- Activate All Systems ---
masterInterval = setInterval(updateDisplay, 1000);
document.addEventListener('DOMContentLoaded', initializeDashboard);
setInterval(updateRealtimeClock, 1000);

// --- RE-FORGED: PWA Service Worker Registration with Update Protocol ---
if ('serviceWorker' in navigator) {
    const updateNotification = document.getElementById('update-notification');
    const reloadButton = document.getElementById('reload-button');
    let newWorker;

    navigator.serviceWorker.register('./sw.js').then(reg => {
        reg.addEventListener('updatefound', () => {
            // A new version of the service worker has been found.
            newWorker = reg.installing;
            newWorker.addEventListener('statechange', () => {
                // The new worker is installed and waiting to take control.
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // Make the update notification visible.
                    updateNotification.classList.add('visible');
                }
            });
        });
    });

    reloadButton.addEventListener('click', () => {
        // Send the command to the new worker to take over.
        newWorker.postMessage({ action: 'skipWaiting' });
    });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
        // The new worker has taken control. Reload the page to use the new assets.
        window.location.reload();
    });
}









