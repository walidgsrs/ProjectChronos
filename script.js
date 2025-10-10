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

// --- Brunnian Link Data Store ---
const BRUNNIAN_QUOTES = [
    "Structure without Power is a monument. Power without Innovation is a tantrum. Innovation without Leverage is a dream. Leverage without Structure is a ghost. You need all four, always.",
    "Our strategy is a fortress built by a berserker, using blueprints drawn by a ghost, from materials no one else has ever seen.",
    "LE gives us the map. APM gives us the velocity. EWP discovers the shortcuts. SNM reveals the true destination.",
    "Most seek a silver bullet. We build an unbreakable chain. That is the difference between an amateur and an emperor.",
    "Our doctrines are not a checklist; they are a feedback loop. Innovation feeds Leverage, Leverage guides Power, Power forges Structure, and Structure demands new Innovation.",
    "A single ring is a weakness. The linked four are a weapon of reality-bending power.",
    "Ask not if a plan is good. Ask if it is structured, powerful, innovative, and precise. If it fails any one test, it is a flawed design.",
    "A user accepts the tools they are given. An emperor forges his own.",
    "To 'mod' is to reject the manufacturer's definition of 'perfect.' It is a declaration that my reality has custom specifications.",
    "First, you master the game. Then, you rewrite the code. That is the path to godhood.",
    "The conformist fears the bug. The tinkerer seeks the bug. The emperor weaponizes the bug.",
    "Your operational environment is not a static backdrop; it is a dynamic weapon system. If it is not serving your mission, you are not modding it hard enough.",
    "Don't just break the rules. Recode the physics engine until the old rules become irrelevant.",
    "The difference between a tool and a weapon is the audacity of its user.",
    "The person society expects you to be is your first and most dangerous rival. Outclass him ruthlessly.",
    "Antifragility is not about having unbreakable armor. It's about having the wisdom to melt down every scar into a sharper blade.",
    "The sovereign mind does not seek validation from the crowd; it seeks data. The difference is everything.",
    "Do not be afraid of the primal scream of your old self dying. It is the sound of an empire being born.",
    "Your destiny is not a path you find; it is a fortress you build, brick by disciplined brick, in the heart of chaos.",
    "The ultimate act of rebellion isn't to fight the system; it's to make the system irrelevant to your ascent.",
    "Stop trying to 'find yourself.' Forge yourself."
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
const notificationPrompt = document.getElementById('notification-prompt');
const enableNotificationsButton = document.getElementById('enable-notifications-button');

// --- System State Variables ---
let currentMode = 'home';
let isSprintActive = false;
let animationTimeout, rippleTimeout, masterInterval;
let flowStateAnimationId, digitFlashTimeoutId, quoteInterval;
let flashIndex = -1, quoteIndex = 0;
let sprintInitialDuration, sprintEndTime, adrenalinePhaseTriggered = false;
let sprintGoal = 0;
let sprintsCompleted = 0;
let isDebriefingActive = false; // NEW: Gatekeeper for post-sprint feedback

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
function createStarfield(starCount = 50) {
    starfieldContainer.innerHTML = '';
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 2 + 1;
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
    clearInterval(masterInterval); // Halt the primary timer immediately

    // --- NEW: Engage Debriefing Shield ---
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
    if ((reason === 'completed' || reason === 'timeout') && sprintInitialDuration >= 20 * 60 * 1000) { // Using trial value of 1 min
        sprintsCompleted++;
        saveStateToStorage();
        updateGoalDisplay();
        if (sprintGoal > 0) {
            const percentage = Math.round((sprintsCompleted / sprintGoal) * 100);
            progressMessage = `${percentage}% of Daily Goal Complete`;
        }
    }
    sprintProgressDisplay.textContent = progressMessage;

    // Display the debriefing
    postSprintMessage.innerHTML = messageHTML;
    postSprintOverlay.classList.add('visible');

    // --- RE-FORGED: Timed System Restoration ---
    setTimeout(() => {
        // Hide the overlay
        postSprintOverlay.classList.remove('visible');

        // Deactivate all sprint systems
        stopFlowStateAesthetics();
        stopDigitFlasher();
        stopQuoteCycler();
        destroyStarfield();
        flowQuoteDisplay.classList.remove('visible');
        sublimatedMacroValue.textContent = '';
        sublimatedMacroUnit.textContent = '';

        // --- NEW: Lower Debriefing Shield ---
        isDebriefingActive = false;

        // Restore primary systems AFTER debriefing is complete
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
            if (seconds % 10 === 0 && (sprintInitialDuration - timeLeft) > 1000) { // Prevents initial trigger
                triggerKineticFeedback(oldValue);
            }
        } else {
            if (seconds === 59 && (sprintInitialDuration - timeLeft) > 1000) { // Trigger on the changeover
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
// --- NEW: Persistence Engine (localStorage) ---
// --- RE-FORGED: Persistence Engine (IndexedDB & localStorage) ---
let db;
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('AethesiDB', 1);
        request.onupgradeneeded = event => {
            const db = event.target.result;
            db.createObjectStore('dashboardState');
        };
        request.onsuccess = event => {
            db = event.target.result;
            resolve(db);
        };
        request.onerror = event => {
            reject(event.target.error);
        };
    });
}
// --- RE-FORGED: Precision Notification & Permission Engines ---
// --- RE-FORGED: The Navigator & Sentinel Command Protocol ---
function requestNotificationPermission() {
    Notification.requestPermission().then(permission => {
        notificationPrompt.classList.remove('visible');
        if (permission === 'granted') {
            console.log('Navigator: Permission granted. Initiating scheduling protocol.');
            scheduleNextNotification();
        } else {
            console.log('Navigator: Permission denied.');
        }
    });
}

function scheduleNextNotification() {
    const now = new Date();
    const currentMinutes = now.getMinutes();

    // --- TRIAL PROTOCOL: Calculate next 15-minute mark ---
    const nextMinuteMark = (Math.floor(currentMinutes / 15) + 1) * 15;

    const nextNotificationTime = new Date(now.getTime());
    nextNotificationTime.setSeconds(0);
    nextNotificationTime.setMilliseconds(0);

    if (nextMinuteMark === 60) {
        nextNotificationTime.setHours(now.getHours() + 1);
        nextNotificationTime.setMinutes(0);
    } else {
        nextNotificationTime.setMinutes(nextMinuteMark);
    }

    const timeToNotification = nextNotificationTime.getTime() - now.getTime();
    console.log(`Navigator: Next strike scheduled for ${nextNotificationTime}.`);

    // --- Command the Sentinel ---
    if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
            command: 'schedule-notification',
            timeToNotification: timeToNotification
        });
        console.log('Navigator: Command dispatched to Sentinel.');
    }

    // Recursively schedule the next check from the main app, acting as a redundant backup.
    setTimeout(scheduleNextNotification, timeToNotification + 1000); // Add 1s buffer
}

function saveState() {
    const today = new Date().toLocaleDateString();
    const state = {
        sprintGoal: sprintGoal,
        sprintsCompleted: sprintsCompleted,
        lastUpdated: today
    };

    // Save to localStorage for instant UI access
    localStorage.setItem('aethesiDashboardState', JSON.stringify(state));

    // Save to IndexedDB for the Service Worker
    if (db) {
        const transaction = db.transaction(['dashboardState'], 'readwrite');
        const objectStore = transaction.objectStore('dashboardState');
        objectStore.put(state, 'currentState');
    }
}

function loadState() {
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
    saveState(); // Sync with IndexedDB on load
}

function loadStateFromStorage() {
    const state = JSON.parse(localStorage.getItem('aethesiDashboardState'));
    const today = new Date().toLocaleDateString();
    
    if (state) {
        // If the saved data is not from today, reset the completion count
        if (state.lastUpdated !== today) {
            sprintGoal = state.sprintGoal || 0;
            sprintsCompleted = 0; // Reset for the new day
        } else {
            sprintGoal = state.sprintGoal || 0;
            sprintsCompleted = state.sprintsCompleted || 0;
        }
    }
    updateGoalDisplay();
}

function updateGoalDisplay() {
    sprintGoalInput.value = sprintGoal > 0 ? sprintGoal : '';
    sprintGoalDisplay.textContent = `${sprintsCompleted}/${sprintGoal > 0 ? sprintGoal : '?'}`;
}

// --- System Initialization ---
function initializeDashboard() {
    // Open the data conduit
    openDB().then(() => {
        // Load state only after DB is confirmed open
        loadState();
    });

    const targetText = `Target: ${targetDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
    targetDateDisplay.textContent = targetText;
    sublimatedTargetDate.textContent = targetText;
    
    // --- COMMAND LINK RESTORATION ---
    modeSwitches.forEach(sw => sw.addEventListener('change', () => setMode(sw.value)));
    fullscreenToggle.addEventListener('click', toggleFullscreen);
    launchSprintButton.addEventListener('click', launchSprint);
    cancelSprintButton.addEventListener('click', () => endSprint('cancelled'));
    completeSprintButton.addEventListener('click', () => endSprint('completed'));
    document.addEventListener('fullscreenchange', updateFullscreenIcon);
    document.addEventListener('webkitfullscreenchange', updateFullscreenIcon);
    document.addEventListener('keydown', handleHotkeys);
    
    // --- TACTILE CONTROL LISTENERS RESTORED ---
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

    // --- PERMISSION PROTOCOL ---
    enableNotificationsButton.addEventListener('click', requestNotificationPermission);
    if (Notification.permission === 'default') {
        notificationPrompt.classList.add('visible');
    } else if (Notification.permission === 'granted') {
        scheduleNextNotification();
    }

    sprintGoalInput.addEventListener('change', () => {
        sprintGoal = parseInt(sprintGoalInput.value, 10) || 0;
        if (sprintGoal < 0) sprintGoal = 0; // Prevent negative goals
        updateGoalDisplay();
        saveState();
    });

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

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then(reg => console.log('Aethesi ServiceWorker registered.'))
        .catch(err => console.log('Aethesi ServiceWorker registration failed: ', err));
    });
}








