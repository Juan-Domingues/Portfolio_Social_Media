// Funcionalidades avançadas do cabeçalho
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.cabecalho');
    const menuLinks = document.querySelectorAll('.cabecalho__menu__link');
    let lastScrollTop = 0;

    // Efeito de scroll no cabeçalho
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercent = (scrollTop / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        // Adiciona classe 'scrolled' quando rola para baixo
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Atualiza a barra de progresso
        header.style.setProperty('--scroll-progress', scrollPercent + '%');
        
        // Esconde/mostra o cabeçalho baseado na direção do scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }

    // Adiciona o indicador de progresso via CSS
    const style = document.createElement('style');
    style.textContent = `
        .cabecalho::after {
            width: var(--scroll-progress, 0%);
        }
    `;
    document.head.appendChild(style);

    // Smooth scroll para os links internos
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Remove classe ativa de todos os links
                    menuLinks.forEach(l => l.classList.remove('active'));
                    // Adiciona classe ativa ao link clicado
                    this.classList.add('active');
                    
                    // Scroll suave
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });

        // Efeito de hover aprimorado
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            
            // Cria efeito de ondulação
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, transparent 70%);
                transform: translate(-50%, -50%);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
                z-index: 0;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Atualiza link ativo baseado na posição da página
    function updateActiveLink() {
        const sections = ['home', 'sobre'];
        let currentSection = '';
        
        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    currentSection = section;
                }
            }
        });

        menuLinks.forEach(link => {
            const href = link.getAttribute('href').substring(1);
            if (href === currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', updateActiveLink);
    
    // Adiciona CSS para o efeito de ondulação
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes rippleEffect {
            0% {
                width: 0;
                height: 0;
                opacity: 1;
            }
            100% {
                width: 200px;
                height: 200px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Inicializa
    handleScroll();
    updateActiveLink();
    
    // Define o primeiro link como ativo por padrão
    if (menuLinks.length > 0) {
        menuLinks[0].classList.add('active');
    }
});

// Adiciona partículas flutuantes no cabeçalho
function createFloatingParticles() {
    const header = document.querySelector('.cabecalho');
    
    for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: radial-gradient(circle, rgba(0, 255, 255, 0.6) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatParticle ${3 + Math.random() * 4}s linear infinite;
            z-index: 1;
        `;
        
        header.appendChild(particle);
    }
}

// CSS para partículas flutuantes
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(0) translateX(0) scale(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
            transform: scale(1);
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) translateX(50px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatStyle);

// Executa quando a página carrega
window.addEventListener('load', createFloatingParticles);
