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
const logObjectiveAudio = new Audio('Select.mp3');
const forgeMissionAudio = new Audio('HighScore.mp3');

[pulseAudio, strategicRippleAudio, tacticalRippleAudio, sprintStartAudio, adrenalineStartAudio, flowRippleAudio, cancelSprintAudio, completeSprintAudio, endSprintAudio, logObjectiveAudio, forgeMissionAudio].forEach(audio => audio.volume = 1.0);

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
// --- AEGIS Brick #1 Levers ---
const logObjectiveButton = document.getElementById('log-objective-button');
const aegisDossierOverlay = document.getElementById('aegis-dossier-overlay');
const objectiveNameInput = document.getElementById('objective-name');
const forgeMissionButton = document.getElementById('forge-mission-button');
const abortDossierButton = document.getElementById('abort-dossier-button');
const progressBarFill = document.querySelector('.progress-bar-fill');
const progressPercentage = document.querySelector('.progress-percentage');

// --- System State Variables ---
let currentMode = 'home';
taskNameContainer.classList.remove('editing'); // Ensure editing mode is cancelled on sprint end
let isSprintActive = false;
let animationTimeout, rippleTimeout, masterInterval;
let flowStateAnimationId, digitFlashTimeoutId;
let flashIndex = -1;
let sprintInitialDuration, sprintEndTime, adrenalinePhaseTriggered = false;
// --- Celestial Command State ---
let starElements = [];
let sprintGoal = 0;
let sprintsCompleted = 0;
let isDebriefingActive = false; // NEW: Gatekeeper for post-sprint feedback
let currentTaskName = "Tactical Sprint";
// --- NEW: The Debounce Engine for High-Velocity Command Buffering ---
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
// --- NEW: The Resize Handler ---
const handleResize = debounce(() => {
    if (isSprintActive) {
        startWarpDrive(); // Re-forge the cosmos with the new dimensions
    }
}, 250); // 250ms delay is the optimal calibration
// --- WARP DRIVE ENGINE STATE ---
let warpCanvas, warpCtx;
let stars = [];
let warpAnimationId;
let warpSpeed = 0; // The core velocity controller

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
// --- WARP DRIVE PHYSICS ENGINE ---
function setupWarpDrive() {
    warpCanvas = document.getElementById('warp-drive-canvas');
    if (!warpCanvas) return;
    warpCtx = warpCanvas.getContext('2d');
    
    // Set canvas to full screen size
    warpCanvas.width = window.innerWidth;
    warpCanvas.height = window.innerHeight;

    function Star() {
        // --- RE-FORGED: The Annulus Protocol for a clean hyperspace lane ---
        
        // 1. Define the central void. This is the radius from the center where no stars will be generated.
        const deadZoneRadius = Math.min(warpCanvas.width, warpCanvas.height) * 0.15;
        
        // 2. Define the maximum radius for star generation.
        const maxRadius = Math.min(warpCanvas.width, warpCanvas.height) * 0.9;
        
        // 3. Generate a random angle and a random radius OUTSIDE the dead zone.
        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.sqrt(Math.random()) * (maxRadius - deadZoneRadius) + deadZoneRadius;
        // Using Math.sqrt on the random number ensures a more uniform distribution away from the center.

        // 4. Convert the polar coordinates back to Cartesian to be used by the physics engine.
        this.x = radius * Math.cos(angle);
        this.y = radius * Math.sin(angle);
        this.z = Math.random() * warpCanvas.width;
        this.pz = this.z;
        // --- RE-FORGED: The Desaturated Singularity Palette ---
        const colors = [
            'hsl(220, 100%, 95%)', // A brilliant, piercing blue-white
            'hsl(60, 100%, 95%)',  // A brilliant, searing yellow-white
            'hsl(30, 100%, 95%)',  // A subtle, distant orange-white
            'hsl(0, 0%, 100%)'     // Pure, absolute white
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speed = Math.random() * 0.2 + 0.1; // Each star has its own base velocity
    }

    // Generate the initial starfield
    stars = [];
    for (let i = 0; i < 400; i++) { // DENSITY AMPLIFIED
        stars.push(new Star());
    }
}

function startWarpDrive() {
    if (warpAnimationId) cancelAnimationFrame(warpAnimationId);
    setupWarpDrive(); // Re-setup in case of window resize
    renderWarpDrive();
}

function stopWarpDrive() {
    cancelAnimationFrame(warpAnimationId);
    if (warpCtx) {
        warpCtx.clearRect(0, 0, warpCanvas.width, warpCanvas.height);
    }
}

function renderWarpDrive() {
    if (!warpCtx) return;

    const centerX = warpCanvas.width / 2;
    const centerY = warpCanvas.height / 2;

    // --- RE-FORGED: Weaken the Void for longer persistence ---
    // The alpha value is reduced from 0.4 to 0.2, allowing trails to persist much longer.
    warpCtx.fillStyle = 'rgba(5, 5, 7, 0.2)';
    warpCtx.fillRect(0, 0, warpCanvas.width, warpCanvas.height);

    for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        star.z -= star.speed * warpSpeed;

        if (star.z <= 0) {
            star.z = warpCanvas.width;
            star.x = (Math.random() * warpCanvas.width * 1.5) - (warpCanvas.width * 1.5 / 2);
            star.y = (Math.random() * warpCanvas.height * 1.5) - (warpCanvas.height * 1.5 / 2);
        }

        const k = 128 / star.z;
        const sx = star.x * k + centerX;
        const sy = star.y * k + centerY;

        if (sx > 0 && sx < warpCanvas.width && sy > 0 && sy < warpCanvas.height) {
            
            let trailLengthFactor, trailWidth;

            if (adrenalinePhaseTriggered) {
                // --- RE-CALIBRATED: Berserker Charge with a Sharper Blade ---
                trailLengthFactor = 20; // Length remains unchanged
                trailWidth = 2.5;       // Thickness is recalibrated for precision
            } else {
                // --- RE-CALIBRATED: Flow State with a Sharper Blade ---
                trailLengthFactor = 10; // Length remains unchanged
                trailWidth = 1.5;       // Thickness is recalibrated for precision
            }

            const z_tail = star.z + star.speed * warpSpeed * trailLengthFactor;
            const k_tail = 128 / z_tail;
            const tail_x = star.x * k_tail + centerX;
            const tail_y = star.y * k_tail + centerY;
            
            let trailColor;
            if (adrenalinePhaseTriggered) {
                const timeIntoAdrenaline = (sprintInitialDuration * 0.25) - (sprintEndTime - Date.now());
                const transitionDuration = 1000;

                if (timeIntoAdrenaline < transitionDuration) {
                    const transitionProgress = timeIntoAdrenaline / transitionDuration;
                    const r1 = 0, g1 = 188, b1 = 212;
                    const r2 = 255, g2 = 150, b2 = 150;
                    const r = Math.floor(r1 + (r2 - r1) * transitionProgress);
                    const g = Math.floor(g1 + (g2 - g1) * transitionProgress);
                    const b = Math.floor(b1 + (b2 - b1) * transitionProgress);
                    trailColor = `rgb(${r}, ${g}, ${b})`;
                } else {
                    const progress = (sprintEndTime - Date.now()) / (sprintInitialDuration * 0.25);
                    const corruption = 1 - Math.max(0, Math.min(1, progress));
                    const red = 255;
                    const green = Math.floor(150 * (1 - corruption));
                    const blue = Math.floor(150 * (1 - corruption));
                    trailColor = `rgb(${red}, ${green}, ${blue})`;
                }
            } else {
                trailColor = star.color;
            }

            // --- RE-FORGED: The "Energy Stream" Rendering Protocol ---

            // 1. Calibrate the Aura for Subliminal Effect
            warpCtx.shadowBlur = 3;
            warpCtx.shadowColor = trailColor;

            // 2. Forge the Monolithic Energy Stream
            warpCtx.lineWidth = (1 - (star.z / warpCanvas.width)) * trailWidth;
            warpCtx.strokeStyle = trailColor;
            warpCtx.lineCap = 'round';
            warpCtx.beginPath();
            warpCtx.moveTo(tail_x, tail_y);
            warpCtx.lineTo(sx, sy);
            warpCtx.stroke();

            // 3. Purge the Shadow State
            warpCtx.shadowBlur = 0;
        }
    }

    warpAnimationId = requestAnimationFrame(renderWarpDrive);
}

// --- Sprint Engine ---
function launchSprint() {
    postSprintOverlay.classList.remove('visible');
    const durationMinutes = parseInt(sprintDurationInput.value, 10);
    const minDuration = parseInt(sprintDurationInput.min, 10);
    const maxDuration = parseInt(sprintDurationInput.max, 10);

    if (isNaN(durationMinutes) || durationMinutes < minDuration || durationMinutes > maxDuration) {
        // --- Execute Rejection Protocol ---
        sprintDurationInput.classList.add('input-invalid');
        return; // Abort mission
    }

    // --- CORRECTION: Seize command from the master clock ---
    clearInterval(masterInterval);
    clearInterval(ancillaryInterval); // Also halt the secondary clock

    sublimatedMacroValue.textContent = timeValueDisplay.textContent;
    sublimatedMacroUnit.textContent = timeUnitDisplay.textContent;
    sprintStartAudio.currentTime = 0;
    sprintStartAudio.play().catch(e => {});
    
    currentTaskName = "Tactical Sprint";
    taskNameDisplay.textContent = currentTaskName;

    progressBarFill.style.width = '0%';
    progressPercentage.style.left = '0%';
    progressPercentage.textContent = '0%';

    isSprintActive = true;
    sprintInitialDuration = durationMinutes * 60 * 1000;
    sprintEndTime = Date.now() + sprintInitialDuration;
    adrenalinePhaseTriggered = false;
    
    updateBodyClass();
    startFlowStateAesthetics();
    startDigitFlasher();
    startWarpDrive();
    warpSpeed = 0.7; // RE-CALIBRATED: A more potent cruising velocity

    // --- CORRECTION: Initiate the sprint's own, sovereign heartbeat ---
    sprintInterval = setInterval(updateDisplay, 1000);
    updateDisplay(); // Execute immediately
    // --- NEW: Activate the Resilience Protocol ---
    window.addEventListener('resize', handleResize);
}

function endSprint(reason = 'timeout') {
    if (!isSprintActive) return;

    // --- CORRECTION: Terminate the sprint's heartbeat absolutely ---
    isSprintActive = false;
    clearInterval(sprintInterval); // Purge the sprint's timer
    isDebriefingActive = true;

    // --- Debriefing Protocol ---
    let messageHTML = '';
    // ... (switch statement remains the same) ...
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
    // ... (progress logic remains the same) ...
    if ((reason === 'completed' || reason === 'timeout') && sprintInitialDuration >= 20 * 60 * 1000) {
        sprintsCompleted++;
        saveStateToStorage();
        updateGoalDisplay();
        if (sprintGoal > 0) {
            const percentage = Math.round((sprintsCompleted / sprintGoal) * 100);
            progressMessage = `${percentage}% of Daily Goal Complete`;
        }
    }
    sprintProgressDisplay.textContent = progressMessage;
    postSprintMessage.innerHTML = messageHTML;
    postSprintOverlay.classList.add('visible');

    // --- State Reversion Protocol ---
    setTimeout(() => {
        postSprintOverlay.classList.remove('visible');
        isDebriefingActive = false;

        // Purge all sprint-specific systems
        stopFlowStateAesthetics();
        stopDigitFlasher();
        warpSpeed = 0; // Disengage Warp Drive
        stopWarpDrive();
        // --- NEW: Deactivate the Resilience Protocol ---
        window.removeEventListener('resize', handleResize);
        sublimatedMacroValue.textContent = '';
        sublimatedMacroUnit.textContent = '';
        
        // --- CORRECTION: Restore the master clock ---
        updateBodyClass();
        startMasterIntervals(); // Command the main system to re-ignite
        updateDisplay();
    }, 4500);
}
// --- RE-FORGED: The Dual-Mode Kinetic Feedback Core ---
function triggerKineticFeedback(oldValue) {
    if (isDebriefingActive) return; // Mission abort if debriefing is active

    // --- Auditory Systems remain constant ---
    pulseAudio.currentTime = 0;
    pulseAudio.play().catch(e => {});

    if (isSprintActive) {
        // --- SPRINT PROTOCOL: Internal Glow Pulse ---
        timeValueDisplay.classList.add('glow-pulse');
        clearTimeout(animationTimeout); // Use the existing timeout variable
        animationTimeout = setTimeout(() => {
            timeValueDisplay.classList.remove('glow-pulse');
        }, 1000); // Animation duration is 1s

        // Play the correct ripple sound
        if (adrenalinePhaseTriggered) {
            tacticalRippleAudio.currentTime = 0;
            tacticalRippleAudio.play().catch(e => {});
        } else {
            flowRippleAudio.currentTime = 0;
            flowRippleAudio.play().catch(e => {});
        }

    } else {
        // --- STANDBY PROTOCOL: Golden Echo & External Shockwave ---
        timeValueDisplay.setAttribute('data-old-value', oldValue);
        timeValueDisplay.classList.add('value-changed'); // This triggers the color flash
        clearTimeout(animationTimeout);
        animationTimeout = setTimeout(() => {
            timeValueDisplay.classList.remove('value-changed');
        }, 3000);

        rippleContainer.classList.add('ripple-active');
        clearTimeout(rippleTimeout);
        rippleTimeout = setTimeout(() => {
            rippleContainer.classList.remove('ripple-active');
        }, 3000);

        // Play the correct ripple sound
        if (currentMode === 'strategic') {
            strategicRippleAudio.currentTime = 0;
            strategicRippleAudio.play().catch(e => {});
        } else {
            tacticalRippleAudio.currentTime = 0;
            tacticalRippleAudio.play().catch(e => {});
        }
    }
}

// --- RE-FORGED: The Resilient, Self-Correcting Chronomatic Engine ---
function updateDisplay() {
    const now = new Date();
    const oldValue = timeValueDisplay.textContent.replace(/\s/g, '');
    let newValue;

    if (isSprintActive) {
// --- RE-FORGED: The Multi-Stage Pressure Gauge Engine ---
        const elapsedTime = now.getTime() - (sprintEndTime - sprintInitialDuration);
        let progress = (elapsedTime / sprintInitialDuration) * 100;
        progress = Math.min(100, Math.max(0, progress));

        const progressRemaining = 100 - progress;

        // Command the visual decay
        progressBarFill.style.width = `${progressRemaining}%`;
        progressPercentage.style.left = `${progressRemaining}%`;
        progressPercentage.textContent = `${Math.floor(progressRemaining)}%`;

        // --- NEW: Inverted Multi-Stage Color Calculation ---
        let barColor, barShadow, textColor;

        if (progressRemaining > 75) {
            // Stage 1 (100%-76%): Purity / White
            barColor = '#ffffff';
            barShadow = '0 0 8px #ffffff, 0 0 16px rgba(255, 255, 255, 0.7)';
            textColor = 'rgba(255, 255, 255, 0.8)';
        } else if (progressRemaining > 50) {
            // Stage 2 (75%-51%): Yellow
            barColor = '#FFD700';
            barShadow = '0 0 8px #FFD700, 0 0 16px rgba(255, 215, 0, 0.7)';
            textColor = '#FFD700';
        } else if (progressRemaining > 25) {
            // Stage 3 (50%-26%): Orange
            barColor = '#ff9800';
            barShadow = '0 0 10px #ff9800, 0 0 20px rgba(255, 152, 0, 0.7)';
            textColor = '#ff9800';
        } else { // progressRemaining <= 25
            // Stage 4 (25%-0%): Red
            barColor = '#ff0033';
            barShadow = '0 0 12px #ff0033, 0 0 25px rgba(255, 0, 51, 0.7)';
            textColor = '#ff0033';
        }
        
        // Command the CSS variables
        progressBarFill.style.setProperty('--progress-bar-color', barColor);
        progressBarFill.style.setProperty('--progress-bar-shadow', barShadow);
        progressPercentage.style.color = textColor;
// --- NEW: Dynamic Color Calculation ---
let percentageColor;
if (progress < 25) {
    percentageColor = 'rgba(255, 255, 255, 0.8)'; // Default white/gray
} else if (progress >= 25 && progress <= 75) {
    // Calculate progress within the 25-75 window (0.0 to 1.0)
    const transitionProgress = (progress - 25) / 50;
    // Interpolate hue from yellow (60) to red (0)
    const hue = 60 - (transitionProgress * 60);
    percentageColor = `hsl(${hue}, 100%, 70%)`;
} else { // progress > 75
    percentageColor = 'hsl(0, 100%, 70%)'; // Solid red
}
progressPercentage.style.color = percentageColor;
        const timeLeft = sprintEndTime - now.getTime();
if (!adrenalinePhaseTriggered && timeLeft <= sprintInitialDuration * 0.25) {
            adrenalinePhaseTriggered = true;
            // --- THE BERSERKER CHARGE ---
            warpSpeed = 4.0; // RE-CALIBRATED: The final, overwhelming berserker charge
            stopDigitFlasher();
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
    } else if (aegisDossierOverlay.classList.contains('visible') && event.key === 'Escape') {
        closeDossier();
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


// --- AEGIS Command Functions ---
function openDossier() {
    logObjectiveAudio.currentTime = 0;
    logObjectiveAudio.play().catch(e => {});
    aegisDossierOverlay.classList.add('visible');
    objectiveNameInput.focus(); // Immediately focus the primary input
    validateDossier(); // Run validation on open
}

function closeDossier() {
    aegisDossierOverlay.classList.remove('visible');
    // Optional: Reset form on close
    aegisDossierOverlay.querySelector('.dossier-form').reset();
}

function validateDossier() {
    // A mission without a name is not a mission.
    const hasName = objectiveNameInput.value.trim() !== '';
    forgeMissionButton.disabled = !hasName;
}

function forgeMission() {
    const missionData = {
        name: objectiveNameInput.value.trim(),
        class: document.querySelector('input[name="objective-class"]:checked').value,
        scale: document.querySelector('input[name="objective-scale"]:checked').value,
        frame: document.querySelector('input[name="narrative-frame"]:checked').value,
        horizon: document.getElementById('event-horizon').value,
        intel: document.getElementById('dossier-intel').value,
        timestamp: new Date().toISOString()
    };

    console.log("Mission Forged:", missionData);

    // --- PRESERVED DIRECTIVE: The auditory pulse remains ---
    forgeMissionAudio.currentTime = 0;
    forgeMissionAudio.play().catch(e => {});
    
    // The function now returns to its pure, stable state.
    closeDossier();
}

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
    // --- COMMAND LINKAGES RESTORED ---
    cancelSprintButton.addEventListener('click', () => endSprint('cancelled'));
    completeSprintButton.addEventListener('click', () => endSprint('completed'));
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
    // --- Self-Purging Mechanism for Input Rejection ---
    sprintDurationInput.addEventListener('animationend', () => {
        sprintDurationInput.classList.remove('input-invalid');
    });
    // --- AEGIS Listeners ---
    logObjectiveButton.addEventListener('click', openDossier);
    abortDossierButton.addEventListener('click', closeDossier);
    forgeMissionButton.addEventListener('click', forgeMission);
    objectiveNameInput.addEventListener('input', validateDossier); // Real-time validation
    
    
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
[pulseAudio, strategicRippleAudio, tacticalRippleAudio, sprintStartAudio, adrenalineStartAudio, flowRippleAudio, cancelSprintAudio, completeSprintAudio, endSprintAudio, logObjectiveAudio, forgeMissionAudio].forEach(a => a.load());
    }, { once: true });
    
    updateDisplay();
    updateRealtimeClock();
}

// --- Activate All Systems ---

let ancillaryInterval; // The interval for the secondary clock

function startMasterIntervals() {
    // Purge any existing intervals to prevent duplication
    clearInterval(masterInterval);
    clearInterval(ancillaryInterval);
    
    masterInterval = setInterval(updateDisplay, 1000);
    ancillaryInterval = setInterval(updateRealtimeClock, 1000);
}

startMasterIntervals(); // Initial activation on load
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


