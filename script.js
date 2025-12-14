/* ==============================================
   GLOBAL: FLOATING HEARTS (Runs on ALL pages)
   ============================================== */
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '💖';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 3 + 's';
    heart.style.fontSize = Math.random() * 15 + 20 + 'px';
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 6000);
}
// Start hearts immediately
setInterval(createHeart, 300);


/* ==============================================
   HOME PAGE LOGIC (Only runs if elements exist)
   ============================================== */
const confettiBtn = document.getElementById('surpriseBtn');
const countdownElement = document.getElementById('countdown');

if (confettiBtn) {
    // We are on index.html
    confettiBtn.addEventListener('click', function() {
        
        // 1. Reveal "I Love You" Message
        const hiddenMessage = document.getElementById('hiddenMessage');
        if(hiddenMessage) {
            hiddenMessage.classList.remove('hidden');
            hiddenMessage.classList.add('fade-in');
        }

        // 2. Hide the Button
        this.style.display = 'none';

        // 3. Launch Confetti
        // (Check if confetti library is loaded first to prevent errors)
        if (typeof confetti === "function") {
            launchConfetti();
        }

        // 4. Play Music
        const audio = document.getElementById('bdayAudio');
        if(audio) {
            audio.play().catch(e => console.log("Audio requires user interaction"));
        }

        // 5. Reveal The Rest (Gallery & Letter Link)
        // Note: We changed 'letter' to 'final-step'
        const sections = ['gallery', 'final-step', 'footer'];
        
        sections.forEach((id, index) => {
            setTimeout(() => {
                const el = document.getElementById(id);
                if(el) {
                    el.classList.remove('hidden');
                    el.classList.add('fade-in');
                }
            }, index * 1000); // 1 second stagger
        });
    });
}

/* ==============================================
   CONFETTI FUNCTION
   ============================================== */
function launchConfetti() {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) { return Math.random() * (max - min) + min; }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      var particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

/* ==============================================
   COUNTDOWN & LOCK LOGIC
   ============================================== */
if (countdownElement) {
    // Only run this if we see the countdown timer
    function checkTime() {
        const currentYear = new Date().getFullYear();
        // DATE SETTING: Change this to her actual birthday
        // Format: "Month Day, Year Hour:Minute:Second"
        const targetDate = "December 15, 2025 00:00:00"; 
        
        const birthdayTime = new Date(targetDate).getTime();
        const now = new Date().getTime();
        const gap = birthdayTime - now;

        const lockedScreen = document.getElementById('locked-screen');
        const birthdayContent = document.getElementById('birthday-content');

        if (gap <= 0) {
            // IT IS BIRTHDAY
            if(lockedScreen) lockedScreen.style.display = 'none';
            if(birthdayContent) birthdayContent.style.display = 'block';
        } else {
            // WAITING
            if(lockedScreen) lockedScreen.style.display = 'flex';
            if(birthdayContent) birthdayContent.style.display = 'none';

            const second = 1000;
            const minute = second * 60;
            const hour = minute * 60;
            const day = hour * 24;

            const d = Math.floor(gap / day);
            const h = Math.floor((gap % day) / hour);
            const m = Math.floor((gap % hour) / minute);
            const s = Math.floor((gap % minute) / second);

            if(document.getElementById('days')) document.getElementById('days').innerText = d < 10 ? '0' + d : d;
            if(document.getElementById('hours')) document.getElementById('hours').innerText = h < 10 ? '0' + h : h;
            if(document.getElementById('minutes')) document.getElementById('minutes').innerText = m < 10 ? '0' + m : m;
            if(document.getElementById('seconds')) document.getElementById('seconds').innerText = s < 10 ? '0' + s : s;
        }
    }
    
    setInterval(checkTime, 1000);
    checkTime();
}