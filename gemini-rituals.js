import { auth, db } from './firebase.js';

// DOM elements
const ritualTabs = document.querySelectorAll('.ritual-tab');
const ritualContents = document.querySelectorAll('.ritual-content');
const startBreathingBtn = document.getElementById('startBreathing');
const stopBreathingBtn = document.getElementById('stopBreathing');
const breathText = document.getElementById('breathText');
const generateBreathingBtn = document.getElementById('generateBreathing');
const customBreathingDiv = document.getElementById('customBreathing');
const musicContainer = document.getElementById('musicContainer');
const creativePrompt = document.getElementById('creativePrompt');
const newCreativePromptBtn = document.getElementById('newCreativePrompt');
const personalizedPromptBtn = document.getElementById('personalizedPrompt');

// Breathing exercise state
let breathingInterval;
let currentBreathPhase = 0;
const breathPhases = [
    { text: "Breathe In", duration: 4000, color: "bg-blue-100" },
    { text: "Hold", duration: 4000, color: "bg-blue-50" },
    { text: "Breathe Out", duration: 4000, color: "bg-blue-100" },
    { text: "Hold", duration: 4000, color: "bg-blue-50" }
];

// Initialize
setupTabNavigation();
loadMusicTracks();
loadCreativePrompt();

// Tab navigation
function setupTabNavigation() {
    ritualTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            ritualTabs.forEach(t => {
                t.classList.remove('text-pink-600', 'border-pink-600');
                t.classList.add('text-gray-500', 'hover:text-gray-700');
            });
            tab.classList.add('text-pink-600', 'border-pink-600');
            tab.classList.remove('text-gray-500', 'hover:text-gray-700');
            
            // Show corresponding content
            const tabId = tab.dataset.tab + 'Tab';
            ritualContents.forEach(content => {
                content.classList.add('hidden');
            });
            document.getElementById(tabId).classList.remove('hidden');
        });
    });
}

// Breathing exercise
function startBreathingExercise() {
    startBreathingBtn.disabled = true;
    stopBreathingBtn.disabled = false;
    
    currentBreathPhase = 0;
    updateBreathDisplay();
    
    breathingInterval = setInterval(() => {
        currentBreathPhase = (currentBreathPhase + 1) % breathPhases.length;
        updateBreathDisplay();
    }, breathPhases[currentBreathPhase].duration);
}

function stopBreathingExercise() {
    clearInterval(breathingInterval);
    startBreathingBtn.disabled = false;
    stopBreathingBtn.disabled = true;
    breathText.textContent = "Breathe In";
    document.querySelector('.breathing-circle').className = 
        'breathing-circle w-40 h-40 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center';
}

function updateBreathDisplay() {
    const phase = breathPhases[currentBreathPhase];
    breathText.textContent = phase.text;
    document.querySelector('.breathing-circle').className = 
        `breathing-circle w-40 h-40 rounded-full ${phase.color} border-2 border-blue-200 flex items-center justify-center`;
}

// Music tracks
async function loadMusicTracks() {
    try {
        // In production, these would be fetched from a music API
        const tracks = [
            {
                title: "Gentle Rain",
                description: "Soothing rain sounds for relaxation",
                duration: "10:00",
                url: "https://example.com/rain.mp3"
            },
            {
                title: "Forest Ambience",
                description: "Calming sounds of a peaceful forest",
                duration: "15:00",
                url: "https://example.com/forest.mp3"
            },
            {
                title: "Ocean Waves",
                description: "Gentle waves to help you unwind",
                duration: "12:00",
                url: "https://example.com/ocean.mp3"
            }
        ];

        musicContainer.innerHTML = tracks.map(track => `
            <div class="ritual-card p-4 rounded-lg border border-gray-200">
                <div class="flex items-center">
                    <div class="mr-4 text-blue-500">
                        <i class="fas fa-music text-2xl"></i>
                    </div>
                    <div class="flex-1">
                        <h3 class="font-medium text-gray-800">${track.title}</h3>
                        <p class="text-sm text-gray-600">${track.description}</p>
                        <p class="text-xs text-gray-500 mt-1">${track.duration}</p>
                    </div>
                    <button class="play-music-btn text-pink-500 hover:text-pink-700" data-url="${track.url}">
                        <i class="fas fa-play"></i>
                    </button>
                </div>
            </div>
        `).join('');

        // Add event listeners to play buttons
        document.querySelectorAll('.play-music-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const url = btn.dataset.url;
                // In production, this would play the audio
                alert(`Would play: ${url}`);
            });
        });

    } catch (error) {
        console.error("Error loading music:", error);
        musicContainer.innerHTML = `
            <div class="text-center py-4 text-red-500">
                <i class="fas fa-exclamation-triangle mr-2"></i>
                Couldn't load music. Try again later.
            </div>
        `;
    }
}

// Creative prompts
async function loadCreativePrompt() {
    try {
        // In production, this would call Gemini API
        const prompts = [
            "Draw or write about a place where you feel completely at peace",
            "Create something using only three colors that represent how you feel right now",
            "Write a short letter to your favorite childhood object",
            "Make a quick sketch of how your mood would look as a landscape"
        ];
        
        creativePrompt.textContent = prompts[Math.floor(Math.random() * prompts.length)];
        
    } catch (error) {
        console.error("Error loading creative prompt:", error);
        creativePrompt.textContent = "Couldn't load prompt. Try again later.";
    }
}

// Event listeners
startBreathingBtn.addEventListener('click', startBreathingExercise);
stopBreathingBtn.addEventListener('click', stopBreathingExercise);
generateBreathingBtn.addEventListener('click', generateCustomBreathing);
newCreativePromptBtn.addEventListener('click', loadCreativePrompt);
personalizedPromptBtn.addEventListener('click', generatePersonalizedPrompt);

// Generate custom breathing exercise
async function generateCustomBreathing() {
    try {
        generateBreathingBtn.disabled = true;
        generateBreathingBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Generating...';
        
        // In production, this would call Gemini API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const exercises = [
            {
                title: "Calming Breath",
                pattern: "Inhale for 4s, Hold for 2s, Exhale for 6s, Hold for 2s",
                description: "This pattern helps activate your parasympathetic nervous system for relaxation"
            },
            {
                title: "Energy Boost",
                pattern: "Inhale for 2s, Exhale sharply for 1s, Repeat 10 times",
                description: "Quick breaths to increase alertness and energy"
            },
            {
                title: "Evening Wind Down",
                pattern: "Inhale for 5s, Exhale for 5s, No holds",
                description: "Simple equal breathing to prepare for sleep"
            }
        ];
        
        const exercise = exercises[Math.floor(Math.random() * exercises.length)];
        
        customBreathingDiv.innerHTML = `
            <div class="bg-blue-50 p-4 rounded-lg">
                <h3 class="font-medium text-blue-800 mb-1">${exercise.title}</h3>
                <p class="text-blue-700 mb-2">${exercise.pattern}</p>
                <p class="text-sm text-blue-600">${exercise.description}</p>
            </div>
        `;
        customBreathingDiv.classList.remove('hidden');
        
    } catch (error) {
        console.error("Error generating breathing exercise:", error);
        customBreathingDiv.innerHTML = `
            <div class="bg-red-50 p-3 rounded-lg text-red-600 text-sm">
                Couldn't generate exercise. Try again later.
            </div>
        `;
        customBreathingDiv.classList.remove('hidden');
    } finally {
        generateBreathingBtn.disabled = false;
        generateBreathingBtn.innerHTML = '<i class="fas fa-magic mr-2"></i> Generate for Me';
    }
}

// Generate personalized creative prompt
async function generatePersonalizedPrompt() {
    try {
        personalizedPromptBtn.disabled = true;
        personalizedPromptBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Thinking...';
        
        // In production, this would call Gemini API with user context
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const prompts = [
            "Create a color palette that represents how you've felt this week",
            "Write a short poem where each line starts with letters from your name",
            "Draw a map of your ideal safe space with at least 5 comforting elements",
            "Make a quick collage using found objects that represent your current mood"
        ];
        
        creativePrompt.textContent = prompts[Math.floor(Math.random() * prompts.length)];
        
    } catch (error) {
        console.error("Error generating personalized prompt:", error);
        creativePrompt.textContent = "Couldn't generate prompt. Try again later.";
    } finally {
        personalizedPromptBtn.disabled = false;
        personalizedPromptBtn.innerHTML = '<i class="fas fa-user mr-2"></i> Get Personalized Prompt';
    }
}

// Handle auth state changes
auth.onAuthStateChanged((user) => {
    if (!user) {
        auth.signInAnonymously().catch(error => {
            console.error("Anonymous sign-in failed:", error);
        });
    }
});