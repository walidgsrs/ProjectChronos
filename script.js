// Aethesi Supremacy Protocol: OPERATION: CHRONOS - Final Auditory Tuning
// Doctrinal Engineer: Forge

const targetDate = new Date('2028-05-21T00:00:00+01:00');

// --- Audio Core: Three distinct, purpose-built channels ---
const pulseAudio = new Audio('pulse.ogg'); 
pulseAudio.volume = 1.0;

// --- NEW: Ripple Audio Assets ---
const strategicRippleAudio = new Audio('Swoosh_ut.ogg');
strategicRippleAudio.volume = 1.0;

const tacticalRippleAudio = new Audio('Shockwave.ogg');
tacticalRippleAudio.volume = 1.0;


// --- DOM Element Leverage ---
const bodyElement = document.body;
const timeValueDisplay = document.getElementById('time-value');
const timeUnitDisplay = document.getElementById('time-unit');
const targetDateDisplay = document.getElementById('target-date-display');
const realtimeClockDisplay = document.getElementById('realtime-clock');
const modeSwitches = document.querySelectorAll('input[name="mode"]');
const fullscreenToggle = document.getElementById('fullscreen-toggle');
const rippleContainer = document.getElementById('ripple-effect-container');

let currentMode = 'home';
let animationTimeout;
let rippleTimeout;

// --- Core State Machine ---
function setMode(newMode) {
    if (currentMode === newMode) return;
    currentMode = newMode;
    bodyElement.className = `${currentMode}-mode`;

    if (document.fullscreenElement || document.webkitFullscreenElement) {
        bodyElement.classList.add('fullscreen-active');
    }
    
    updateDisplay();
}

// --- Unified Display Engine ---
function updateDisplay() {
    const oldValue = timeValueDisplay.textContent;
    const now = new Date();

    switch (currentMode) {
        case 'home':
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            timeValueDisplay.textContent = `${hours}:${minutes}`;
            timeUnitDisplay.textContent = '';
            break;
        case 'strategic':
            const timeLeftHours = targetDate - now;
            const hoursLeft = Math.floor(timeLeftHours / (1000 * 60 * 60));
            timeValueDisplay.textContent = hoursLeft.toLocaleString('en-US');
            timeUnitDisplay.textContent = "Hours";
            break;
        case 'tactical':
            const timeLeftMinutes = targetDate - now;
            const minutesLeft = Math.floor(timeLeftMinutes / (1000 * 60));
            timeValueDisplay.textContent = minutesLeft.toLocaleString('en-US');
            timeUnitDisplay.textContent = "Minutes";
            break;
    }

    const newValue = timeValueDisplay.textContent;
    if ((currentMode === 'strategic' || currentMode === 'tactical') && newValue !== oldValue) {
        // Set old value for the golden echo
        timeValueDisplay.setAttribute('data-old-value', oldValue);
        
        // Trigger visual animations
        timeValueDisplay.classList.add('value-changed');
        clearTimeout(animationTimeout);
        animationTimeout = setTimeout(() => {
            timeValueDisplay.classList.remove('value-changed');
        }, 3000);

        rippleContainer.classList.add('ripple-active');
        clearTimeout(rippleTimeout);
        rippleTimeout = setTimeout(() => {
            rippleContainer.classList.remove('ripple-active');
        }, 3000);

        // Trigger base auditory pulse
        pulseAudio.currentTime = 0;
        pulseAudio.play().catch(error => {});

        // --- NEW: State-Aware Auditory Shockwave ---
        if (currentMode === 'strategic') {
            strategicRippleAudio.currentTime = 0;
            strategicRippleAudio.play().catch(error => {});
        } else if (currentMode === 'tactical') {
            tacticalRippleAudio.currentTime = 0;
            tacticalRippleAudio.play().catch(error => {});
        }
    }
}

// --- Ancillary Clock ---
function updateRealtimeClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    realtimeClockDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

// --- Fullscreen Engine ---
function toggleFullscreen() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        const docEl = document.documentElement;
        if (docEl.requestFullscreen) {
            docEl.requestFullscreen();
        } else if (docEl.webkitRequestFullscreen) { // Safari
            docEl.webkitRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { // Safari
            document.webkitExitFullscreen();
        }
    }
}

function updateFullscreenIcon() {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
        bodyElement.classList.add('fullscreen-active');
    } else {
        bodyElement.classList.remove('fullscreen-active');
    }
}

// --- System Initialization ---
function initializeDashboard() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    targetDateDisplay.textContent = `Target: ${targetDate.toLocaleDateString('en-US', options)}`;
    
    modeSwitches.forEach(sw => sw.addEventListener('change', () => setMode(sw.value)));
    fullscreenToggle.addEventListener('click', toggleFullscreen);
    
    document.addEventListener('fullscreenchange', updateFullscreenIcon);
    document.addEventListener('webkitfullscreenchange', updateFullscreenIcon);
    
    // --- RE-FORGED: Prime all audio channels on first user interaction ---
    document.body.addEventListener('click', () => { 
        pulseAudio.load(); 
        strategicRippleAudio.load();
        tacticalRippleAudio.load();
    }, { once: true });
    
    updateDisplay();
    updateRealtimeClock();
}

// --- Activate All Systems ---
document.addEventListener('DOMContentLoaded', initializeDashboard);
setInterval(updateDisplay, 1000);
setInterval(updateRealtimeClock, 1000);

// --- PWA Service Worker Registration ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then(registration => {
            console.log('Aethesi ServiceWorker registered.');
        }).catch(error => {
            console.log('Aethesi ServiceWorker registration failed: ', error);
        });
    });
}