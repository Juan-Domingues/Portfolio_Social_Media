// Funcionalidades da página de projetos
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('projectsCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('projectModal');
    
    let currentIndex = 0;
    let filteredCards = Array.from(projectCards);
    const cardWidth = 410; // largura do card + gap
    
    // === CARROSSEL ===
    function updateCarousel() {
        const translateX = -currentIndex * cardWidth;
        carousel.style.transform = `translateX(${translateX}px)`;
        
        // Atualizar estado dos botões
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex >= filteredCards.length - 1 ? '0.5' : '1';
    }
    
    function showFilteredCards() {
        // Esconder todos os cards
        projectCards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Mostrar apenas os filtrados
        filteredCards.forEach(card => {
            card.style.display = 'block';
        });
        
        // Resetar posição do carrossel
        currentIndex = 0;
        updateCarousel();
    }
    
    // Eventos do carrossel
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < filteredCards.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // === FILTROS ===
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adicionar classe active ao botão clicado
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            if (filterValue === 'all') {
                filteredCards = Array.from(projectCards);
            } else {
                filteredCards = Array.from(projectCards).filter(card => {
                    const cardTech = card.getAttribute('data-tech');
                    return cardTech && cardTech.includes(filterValue);
                });
            }
            
            showFilteredCards();
        });
    });
    
    // === NAVEGAÇÃO POR TECLADO ===
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        } else if (e.key === 'Escape') {
            closePreview();
        }
    });
    
    // === TOUCH/SWIPE SUPPORT ===
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - próximo
                nextBtn.click();
            } else {
                // Swipe right - anterior
                prevBtn.click();
            }
        }
    }
    
    // === AUTO-PLAY (OPCIONAL) ===
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            if (currentIndex < filteredCards.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        }, 5000); // 5 segundos
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Pausar auto-play quando hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // Iniciar auto-play
    // startAutoPlay(); // Descomente para ativar
    
    // === ANIMAÇÕES DE ENTRADA ===
    function animateCardsOnLoad() {
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            }, index * 200);
        });
    }
    
    // Inicializar
    updateCarousel();
    animateCardsOnLoad();
});

// === FUNÇÕES GLOBAIS PARA MODAL ===
function openPreview(projectId) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    
    // Configurações específicas por projeto
    const projectConfigs = {
        project1: {
            title: 'Portfolio Website',
            content: `
                <h2 style="color: #00ffff; font-family: 'Andale Mono', monospace; margin-bottom: 20px;">Portfolio Website Preview</h2>
                <div style="background: rgba(0,0,0,0.5); padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                    <p style="color: #cccccc; font-family: 'Andale Mono', monospace; line-height: 1.6;">
                        Este é meu portfólio pessoal desenvolvido com HTML5, CSS3 e JavaScript. 
                        Apresenta um design futurístico com tema ciano, efeitos glassmorphism, 
                        animações suaves e total responsividade.
                    </p>
                </div>
                <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                    <a href="index.html" style="color: #00ffff; text-decoration: none; padding: 10px 20px; border: 1px solid #00ffff; border-radius: 10px;">Ver Projeto</a>
                    <a href="https://github.com/Juan-Domingues" style="color: #00ffff; text-decoration: none; padding: 10px 20px; border: 1px solid #00ffff; border-radius: 10px;">GitHub</a>
                </div>
            `
        },
        project2: {
            title: 'Web Application',
            content: `
                <h2 style="color: #00ffff; font-family: 'Andale Mono', monospace; margin-bottom: 20px;">Web Application Preview</h2>
                <div style="background: rgba(0,0,0,0.5); padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                    <p style="color: #cccccc; font-family: 'Andale Mono', monospace; line-height: 1.6;">
                        Aplicação web full-stack em desenvolvimento utilizando React.js no frontend 
                        e Node.js no backend. Projeto focado em boas práticas e arquitetura escalável.
                    </p>
                </div>
                <div style="color: #ffaa00; font-family: 'Andale Mono', monospace; text-align: center; padding: 20px;">
                    🚧 Projeto em desenvolvimento - Em breve disponível!
                </div>
            `
        },
        project3: {
            title: 'UI/UX Design',
            content: `
                <h2 style="color: #00ffff; font-family: 'Andale Mono', monospace; margin-bottom: 20px;">UI/UX Design Preview</h2>
                <div style="background: rgba(0,0,0,0.5); padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                    <p style="color: #cccccc; font-family: 'Andale Mono', monospace; line-height: 1.6;">
                        Projetos de UI/UX desenvolvidos no Figma, focando em experiência do usuário, 
                        design systems e prototipagem interativa para aplicações modernas.
                    </p>
                </div>
                <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                    <a href="#" style="color: #ff00ff; text-decoration: none; padding: 10px 20px; border: 1px solid #ff00ff; border-radius: 10px;">Ver Designs</a>
                    <a href="#" style="color: #ff00ff; text-decoration: none; padding: 10px 20px; border: 1px solid #ff00ff; border-radius: 10px;">Protótipos</a>
                </div>
            `
        }
    };
    
    const config = projectConfigs[projectId];
    if (config) {
        modalBody.innerHTML = config.content;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closePreview() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Fechar modal clicando fora
document.addEventListener('click', (e) => {
    const modal = document.getElementById('projectModal');
    if (e.target === modal) {
        closePreview();
    }
});

// === ANIMAÇÕES EXTRAS ===
function addHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Efeito de parallax na imagem
            const img = card.querySelector('.project-img');
            if (img) {
                img.style.transform = 'scale(1.1) translateY(-5px)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const img = card.querySelector('.project-img');
            if (img) {
                img.style.transform = 'scale(1) translateY(0)';
            }
        });
    });
}

// Inicializar efeitos extras
document.addEventListener('DOMContentLoaded', addHoverEffects);
