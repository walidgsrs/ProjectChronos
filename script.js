// Aethesi Supremacy Protocol: OPERATION: CHRONOS - Mod #1, The Final Forging
// Doctrinal Engineer: Forge

// --- Core Constants ---
const targetDate = new Date('2028-05-21T00:00:00+01:00');

// --- Audio Arsenal ---
const pulseAudio = new Audio('pulse.ogg');
const strategicRippleAudio = new Audio('swoosh_ut.ogg');
const tacticalRippleAudio = new Audio('shockwave.ogg');
const sprintStartAudio = new Audio('line_blast1.ogg');
const adrenalineStartAudio = new Audio('fx-dramatic-cinematic-boom-sound-effect-249258.mp3');

[pulseAudio, strategicRippleAudio, tacticalRippleAudio, sprintStartAudio, adrenalineStartAudio].forEach(audio => audio.volume = 1.0);

// --- NEW: Brunnian Link Data Store ---
const BRUNNIAN_QUOTES = [
    "A fortress without a foundation is a tomb; a mission without a layered strategy is a dream.",
    "Do not just build a wall; engineer a system of interlocking fields of fire, where each layer protects the next.",
    "Chaos is conquered not by fighting it, but by building a structure of such perfect logic that chaos cannot find a foothold.",
    "First, we build the map. Then, we conquer the world.",
    "Velocity without precision is just a faster way to fail. The Asymptotic Peak is the union of both.",
    "The Pacesetter Rival is not an enemy to be hated, but a ghost to be mercilessly consumed on the path to mastery.",
    "Do not fear the ticking clock; let its relentless pressure be the forge that tempers your will into a weapon of impossible speed.",
    "Good is the enemy of Legendary. We do not stop at 'better'; we stop at 'unbeatable.'",
    "A 'failure' is the universe giving you a priceless piece of intelligence about a path not to take. Do not mourn it; weaponize it.",
    "The greatest fortresses are built from the alloys of wild ideas and shattered assumptions, forged in the silent, clandestine fires of the Alpha Phase.",
    "Perfection is a prison. The Prototype, forever in beta, is the only state of true freedom and perpetual evolution.",
    "Never attack the fortress wall when a single, neglected keystone will suffice.",
    "The whisper of a flawed assumption is louder than the roar of an army. We listen for the whisper.",
    "Do not seek to win the opponent's game; find the single thread that, when pulled, unravels their entire reality.",
    "Our Structure defines our ambition, our Leverage directs our strike, our Innovation finds the weapon, and our Power delivers the blow. The removal of one ring is the loss of all."
];

// --- DOM Element Leverage ---
const bodyElement = document.body;
const timeValueDisplay = document.getElementById('time-value');
const timeUnitDisplay = document.getElementById('time-unit');
const sublimatedMacroValue = document.getElementById('macro-value');
const sublimatedMacroUnit = document.getElementById('macro-unit');
const sublimatedTargetDate = document.getElementById('target-date-display');
const realtimeClockDisplay = document.getElementById('realtime-clock');
const modeSwitches = document.querySelectorAll('input[name="mode"]');
const fullscreenToggle = document.getElementById('fullscreen-toggle');
const rippleContainer = document.getElementById('ripple-effect-container');
const sprintDurationInput = document.getElementById('sprint-duration-input');
const launchSprintButton = document.getElementById('launch-sprint-button');
const cancelSprintButton = document.getElementById('cancel-sprint-button');
const completeSprintButton = document.getElementById('complete-sprint-button');
const flowQuoteDisplay = document.getElementById('flow-quote-display');
const adrenalinePrompt = document.getElementById('adrenaline-prompt');

// --- System State Variables ---
let currentMode = 'home';
let isSprintActive = false;
let animationTimeout, rippleTimeout, masterInterval, sprintInterval;
let flowStateAnimationId, digitFlashTimeoutId, quoteInterval;
let flashIndex = -1;
let quoteIndex = 0;
let sprintInitialDuration;
let adrenalinePhaseTriggered = false;

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

// --- Flow State & Digit Flasher Engines ---
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
    // CORRECTION: The diamond is now rendered correctly in all phases.
    timeValueDisplay.innerHTML = text
        .split('')
        .map(char => `<span class="digit">${char === ':' ? '&#x2B25;' : char}</span>`)
        .join('');
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

// --- NEW: Motivational Text Engine ---
function startQuoteCycler() {
    stopQuoteCycler(); // Ensure no previous instance is running
    displayNextQuote(); // Display the first quote immediately
    quoteInterval = setInterval(displayNextQuote, 30000); // Cycle every 30 seconds
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
    }, 1000); // Wait for the fade-out to complete before changing text
}


// --- Sprint Engine ---
function launchSprint() {
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
    clearInterval(masterInterval);
    sprintInterval = setInterval(updateDisplay, 1000);
    
    startFlowStateAesthetics();
    startDigitFlasher();
    startQuoteCycler();
    updateDisplay();
}

function endSprint() {
    isSprintActive = false;
    clearInterval(sprintInterval);
    
    stopFlowStateAesthetics();
    stopDigitFlasher();
    stopQuoteCycler();
    flowQuoteDisplay.classList.remove('visible'); // Purge the quote visibility on sprint end

    sublimatedMacroValue.textContent = '';
    sublimatedMacroUnit.textContent = '';
    
    masterInterval = setInterval(updateDisplay, 1000);
    updateBodyClass();
    updateDisplay();
}

// --- Kinetic Feedback Core ---
function triggerKineticFeedback(oldValue) {
    timeValueDisplay.setAttribute('data-old-value', oldValue);
    timeValueDisplay.classList.add('value-changed');
    clearTimeout(animationTimeout);
    animationTimeout = setTimeout(() => { timeValueDisplay.classList.remove('value-changed'); }, 3000);

    rippleContainer.classList.add('ripple-active');
    clearTimeout(rippleTimeout);
    rippleTimeout = setTimeout(() => { rippleContainer.classList.remove('ripple-active'); }, 3000);

    pulseAudio.currentTime = 0;
    pulseAudio.play().catch(e => {});

    // --- CORRECTION: Sound selection is now phase-aware ---
    if (isSprintActive && !adrenalinePhaseTriggered) {
        // Flow State uses the Strategic sound
        strategicRippleAudio.currentTime = 0;
        strategicRippleAudio.play().catch(e => {});
    } else {
        // Adrenaline, Tactical Standby, and Strategic modes use their respective sounds
        if (currentMode === 'strategic') {
            strategicRippleAudio.currentTime = 0;
            strategicRippleAudio.play().catch(e => {});
        } else {
            tacticalRippleAudio.currentTime = 0;
            tacticalRippleAudio.play().catch(e => {});
        }
    }
}

// --- Unified Display Engine ---
function updateDisplay() {
    const now = Date.now();
    if (isSprintActive) {
        const oldValue = timeValueDisplay.textContent.replace(/\s/g, '');
        const timeLeft = sprintEndTime - now;

        if (!adrenalinePhaseTriggered && timeLeft <= sprintInitialDuration * 0.25) {
            adrenalinePhaseTriggered = true;
            stopFlowStateAesthetics();
            stopDigitFlasher();
            stopQuoteCycler();
            updateBodyClass();
            adrenalineStartAudio.currentTime = 0;
            adrenalineStartAudio.play().catch(e => {});
        }
        
        if (timeLeft <= 0) { endSprint(); return; }

        const minutes = Math.floor((timeLeft / 1000) / 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);
        const sprintText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        // CORRECTION: Digitize in all sprint phases to ensure diamond is always present
        if (oldValue !== sprintText.replace(':', '❖')) {
            digitizeTimer(sprintText);
        }

        timeUnitDisplay.textContent = 'SPRINT';

        if (adrenalinePhaseTriggered) {
            if (seconds % 10 === 0) {
                triggerKineticFeedback(oldValue);
            }
        } else {
            if (seconds === 0) {
                triggerKineticFeedback(oldValue);
            }
        }

    } else {
        const oldValue = timeValueDisplay.textContent;
        let newValue;
        switch (currentMode) {
            case 'home':
                newValue = `${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`;
                timeValueDisplay.innerHTML = newValue;
                timeUnitDisplay.textContent = '';
                break;
            case 'strategic':
                newValue = Math.floor((targetDate - new Date()) / 36e5).toLocaleString('en-US');
                timeValueDisplay.innerHTML = newValue;
                timeUnitDisplay.textContent = "Hours";
                break;
            case 'tactical':
                newValue = Math.floor((targetDate - new Date()) / 6e4).toLocaleString('en-US');
                timeValueDisplay.innerHTML = newValue;
                timeUnitDisplay.textContent = "Minutes";
                break;
        }
        if (newValue !== oldValue) {
            triggerKineticFeedback(oldValue);
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
        if (event.key === 'Escape') endSprint();
        if (event.shiftKey && event.key.toLowerCase() === 'f') {
            event.preventDefault();
            endSprint();
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

// --- System Initialization ---
function initializeDashboard() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    sublimatedTargetDate.textContent = `Target: ${targetDate.toLocaleDateString('en-US', options)}`;
    
    modeSwitches.forEach(sw => sw.addEventListener('change', () => setMode(sw.value)));
    fullscreenToggle.addEventListener('click', toggleFullscreen);
    launchSprintButton.addEventListener('click', launchSprint);
    cancelSprintButton.addEventListener('click', endSprint);
    completeSprintButton.addEventListener('click', endSprint);
    document.addEventListener('fullscreenchange', updateFullscreenIcon);
    document.addEventListener('webkitfullscreenchange', updateFullscreenIcon);
    document.addEventListener('keydown', handleHotkeys);
        sublimatedTargetDate.textContent = `Target: ${targetDate.toLocaleDateString('en-US', options)}`;
    
    document.body.addEventListener('click', () => { 
        [pulseAudio, strategicRippleAudio, tacticalRippleAudio, sprintStartAudio, adrenalineStartAudio].forEach(a => a.load());
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
