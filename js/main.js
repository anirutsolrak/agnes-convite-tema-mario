document.addEventListener('DOMContentLoaded', () => {
    const playBtn = document.getElementById('play-button');
    const screen1 = document.getElementById('screen-1');
    const screen2 = document.getElementById('screen-2');
    const bgm = document.getElementById('bgm');
    const agnesText = document.getElementById('agnes-text');
    let clickCount = 0;

    // Easter egg
    playBtn.addEventListener('click', (e) => {
        clickCount++;
        if(clickCount === 3) {
            triggerEasterEgg();
        }
    });

    playBtn.addEventListener('click', () => {
        // Play Audio
        bgm.volume = 0.5;
        bgm.play().catch(e => console.log('Audio autoplay prevented:', e));

        // Screen transitioning
        screen1.classList.add('hidden');
        
        // Show screen 2 after a small delay
        setTimeout(() => {
            screen1.style.display = 'none';
            screen2.style.display = 'flex';
            screen2.classList.remove('hidden');
            
            // Fire confetti
            fireConfetti();
            
            // Reveal blocks
            const blocks = document.querySelectorAll('.brick-panel, .action-panel');
            blocks.forEach((b, idx) => {
                b.style.opacity = '0';
                b.style.transform = 'translateY(20px)';
                b.style.transition = 'all 0.5s ease ' + (idx * 0.2) + 's';
                
                setTimeout(() => {
                    b.style.opacity = '1';
                    b.style.transform = 'translateY(0)';
                }, 50);
            });
            
            // Typewriter effect for name
            animateName();
        }, 1000);
    });

    function fireConfetti() {
        const container = document.getElementById('confetti-container');
        const colors = ['#ff007f', '#00f0ff', '#ffd700', '#00ff00'];
        
        for(let i=0; i<50; i++) {
            const conf = document.createElement('div');
            conf.classList.add('confetti');
            conf.style.left = Math.random() * 100 + 'vw';
            conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            conf.style.animationDuration = (Math.random() * 2 + 2) + 's';
            container.appendChild(conf);
        }
    }

    function animateName() {
        const text = "✨ AGNES ✨";
        agnesText.innerHTML = '';
        let i = 0;
        const interval = setInterval(() => {
            agnesText.innerHTML += text.charAt(i);
            i++;
            if(i >= text.length) clearInterval(interval);
        }, 150);
    }

    function triggerEasterEgg() {
        // create little stars running across screen
        for(let i=0; i<10; i++) {
            const star = document.createElement('div');
            star.innerHTML = '⭐';
            star.style.position = 'absolute';
            star.style.left = '-50px';
            star.style.top = (Math.random() * 100) + 'vh';
            star.style.fontSize = '24px';
            star.style.zIndex = '9999';
            star.style.transition = 'all 2s linear';
            document.body.appendChild(star);
            
            setTimeout(() => {
                star.style.transform = `translateX(${window.innerWidth + 100}px) rotate(720deg)`;
            }, 50);
            
            setTimeout(() => {
                star.remove();
            }, 2050);
        }
    }
});