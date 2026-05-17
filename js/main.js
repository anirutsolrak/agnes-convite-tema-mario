document.addEventListener('DOMContentLoaded', () => {
    const playBtn = document.getElementById('play-button');
    const screen1 = document.getElementById('screen-1');
    const screen2 = document.getElementById('screen-2');
    const bgm = document.getElementById('bgm');
    
    let hasStarted = false;
    let autoStartTimeout;

    // 1. Auto-start after 5 seconds se a pessoa não clicar
    autoStartTimeout = setTimeout(() => {
        if (!hasStarted) {
            startGame();
        }
    }, 5000);

    // Cancelar timer se a pessoa clicar antes e rodar manualmente
    let clickCount = 0;
    playBtn.addEventListener('click', (e) => {
        clickCount++;
        if(clickCount === 3) {
            triggerEasterEgg();
        }
        
        if (!hasStarted) {
            clearTimeout(autoStartTimeout);
            startGame();
        }
    });

    function startGame() {
        hasStarted = true;
        
        // Tenta rodar a música (se o navegador bloquear autoplay, printamos no console)
        bgm.volume = 0.5;
        bgm.play().catch(e => console.log('Áudio autoplay bloqueado:', e));

        // Transição de tela
        screen1.classList.add('hidden');
        
        setTimeout(() => {
            screen1.style.display = 'none';
            screen2.style.display = 'flex';
            screen2.classList.remove('hidden');
            
            // Animação dos painéis
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
            
            // Chama a função de autoscroll ao carregar a página 2
            initAutoScroll();

        }, 1000);
    }

    function initAutoScroll() {
        let hasScrolled = false;
        
        const onScroll = () => {
            hasScrolled = true;
            window.removeEventListener('scroll', onScroll);
        };
        
        // Fica de olho se a pessoa deslizou a tela
        window.addEventListener('scroll', onScroll);
        
        // Se após 5 segundos ela tiver ficado parada olhando a imagem
        setTimeout(() => {
            if (!hasScrolled) {
                const target = document.querySelector('.banner-message');
                if(target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }, 5000);
    }

    function triggerEasterEgg() {
        for(let i = 0; i < 10; i++) {
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