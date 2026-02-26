// ==========================================
// FUNÇÕES DE NAVEGAÇÃO E SCROLL
// ==========================================

// Smooth Scroll Personalizado Lento e Suave
function smoothScroll(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    // Curva de Easing (easeInOutCubic) para a rolagem iniciar leve, acelerar e terminar leve de novo
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
}

// Evento de clique nos links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetClass = this.getAttribute('href');
        if (targetClass === "#") return;

        const targetElement = document.querySelector(targetClass);
        if (targetElement) {
            // Posiciona subtraindo o tamanho do menu fixo (ex: altura 80px)
            const navbarHeight = document.querySelector('nav').offsetHeight || 80;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight + 20;

            // Chama a animação customizada com 1500 milissegundos (1.5 segundos) - beem lento e dramático
            smoothScroll(targetPosition, 1500);

            // Fechar menu mobile se estiver aberto
            fecharMenuMobile();
        }
    });
});

// ==========================================
// BOTÃO VOLTAR AO TOPO
// ==========================================
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    smoothScroll(0, 1500); // 1.5s para subir pro topo de forma suave
});

// Menu Mobile (Hamburger)
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

function fecharMenuMobile() {
    if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// ==========================================
// INTERSECTION OBSERVER (Scroll Reveal Moderno)
// ==========================================
const reveals = document.querySelectorAll('.reveal');

const appearOptions = {
    threshold: 0.15, // Um pouco mais estrito para deixar a animação rolar bem
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function (
    entries,
    appearOnScroll
) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

reveals.forEach(reveal => {
    appearOnScroll.observe(reveal);
});

// Iniciar a primeira checagem após carregamento rápido
window.addEventListener('load', () => {
    reveals.forEach(reveal => {
        const rect = reveal.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            reveal.classList.add('active');
        }
    });
});

// ==========================================
// FORMULÁRIO DE RSVP
// ==========================================
const rsvpForm = document.getElementById('rsvp-form');
const rsvpSuccess = document.getElementById('rsvp-success');
const restricaoRadios = document.querySelectorAll('input[name="restricao_toggle"]');
const restricaoContainer = document.getElementById('restricao-container');

// Toggle campo de restrição alimentar
restricaoRadios.forEach(radio => {
    radio.addEventListener('change', function () {
        if (this.value === 'sim') {
            restricaoContainer.classList.remove('hidden');
        } else {
            restricaoContainer.classList.add('hidden');
        }
    });
});

// Simular envio de formulário
if (rsvpForm) {
    rsvpForm.addEventListener('submit', function (e) {
        // Permitimos o comportamento padrão (redirecionamento pro Formspree)
        // Apenas mudamos o texto do botão para feedback visual antes de sair da página.
        const btn = rsvpForm.querySelector('button[type="submit"]');
        btn.innerHTML = 'Enviando...';
        btn.style.opacity = '0.7';
    });
}

// ==========================================
// DADOS DOS PRESENTES
// ==========================================
const giftsData = [
    { id: 1, name: 'Passagem aérea para a lua de mel', price: 1000, emoji: '✈️', curQ: 0, totQ: 1, cat: 'luademel', prevBuyers: [] },
    { id: 2, name: 'Cota para ajudar na lua de mel', price: 300, emoji: '🌴', curQ: 0, totQ: 1, cat: 'luademel', prevBuyers: [] },
    { id: 3, name: 'Um dia no spa para o casal', price: 650, emoji: '💆', curQ: 0, totQ: 1, cat: 'sobrevivencia', prevBuyers: [] },
    { id: 4, name: 'Cota "amigos para sempre"', price: 600, emoji: '👫', curQ: 0, totQ: 1, cat: 'sobrevivencia', prevBuyers: [] },
    { id: 5, name: '1 ano de corte de cabelo para o noivo', price: 600, emoji: '✂️', curQ: 0, totQ: 1, cat: 'sobrevivencia', prevBuyers: [] },
    { id: 6, name: 'Adiantamento da Aposentadoria da Noiva', price: 500, emoji: '👵', curQ: 0, totQ: 1, cat: 'sobrevivencia', prevBuyers: [] },
    { id: 7, name: 'Adiantamento da Aposentadoria do Noivo', price: 500, emoji: '👴', curQ: 0, totQ: 1, cat: 'sobrevivencia', prevBuyers: [] },
    { id: 8, name: 'Pagar a paciência da noiva', price: 400, emoji: '🧘', curQ: 0, totQ: 1, cat: 'sobrevivencia', prevBuyers: [] },
    { id: 9, name: 'Contribuição para hotel 5 estrelas', price: 380, emoji: '⭐', curQ: 0, totQ: 1, cat: 'luademel', prevBuyers: [] },
    { id: 10, name: 'Massagem relaxante pós casamento', price: 360, emoji: '💆', curQ: 0, totQ: 1, cat: 'sobrevivencia', prevBuyers: [] },
    { id: 11, name: 'Vale "Eu Avisei" (uso exclusivo da esposa)', price: 350, emoji: '📜', curQ: 0, totQ: 1, cat: 'sobrevivencia', prevBuyers: [] },
    { id: 12, name: 'Cobertor para o noivo estar coberto de razão', price: 445, emoji: '🛋️', curQ: 0, totQ: 1, cat: 'sobrevivencia', prevBuyers: [] },
    { id: 13, name: 'Robô que concorda com tudo', price: 550, emoji: '🤖', curQ: 0, totQ: 1, cat: 'sobrevivencia', prevBuyers: [] },
    { id: 14, name: 'Paciência extra para a noiva', price: 250, emoji: '🧠', curQ: 0, totQ: 1, cat: 'sobrevivencia', prevBuyers: [] },
    { id: 15, name: 'Brinde da noite de núpcia', price: 220, emoji: '🥂', curQ: 0, totQ: 1, cat: 'luademel', prevBuyers: [] },
    { id: 16, name: 'Primeiro lugar na fila do buffet', price: 285, emoji: '🍽️', curQ: 0, totQ: 1, cat: 'sobrevivencia', prevBuyers: [] },
    { id: 17, name: 'Máscara de gás para trocar fraldas', price: 265, emoji: '😷', curQ: 0, totQ: 1, cat: 'sobrevivencia', prevBuyers: [] },
    { id: 18, name: 'Academia pós lua de mel', price: 420, emoji: '💪', curQ: 0, totQ: 1, cat: 'sobrevivencia', prevBuyers: [] },
    { id: 19, name: 'Translado para o hotel', price: 150, emoji: '🚗', curQ: 0, totQ: 10, cat: 'luademel', prevBuyers: [] },
    { id: 20, name: 'Translado para o aeroporto', price: 150, emoji: '🚕', curQ: 0, totQ: 10, cat: 'luademel', prevBuyers: [] },
    { id: 21, name: 'Jantar romântico para o casal', price: 150, emoji: '🍷', curQ: 0, totQ: 10, cat: 'luademel', prevBuyers: [] },
    { id: 22, name: 'Kit ressaca para os noivos', price: 160, emoji: '🤒', curQ: 0, totQ: 10, cat: 'sobrevivencia', prevBuyers: [] },
    { id: 23, name: 'Primeiro café da manhã depois de casados', price: 185, emoji: '☕', curQ: 0, totQ: 10, cat: 'luademel', prevBuyers: [] },
    { id: 24, name: 'Drinks para beber na lua de mel', price: 100, emoji: '🍹', curQ: 0, totQ: 10, cat: 'luademel', prevBuyers: [] },
    { id: 25, name: 'Piquenique romântico', price: 100, emoji: '🧺', curQ: 0, totQ: 10, cat: 'luademel', prevBuyers: [] },
    { id: 26, name: 'Jantar romântico (hambúrguer)', price: 100, emoji: '🍔', curQ: 0, totQ: 10, cat: 'luademel', prevBuyers: [] },
    { id: 27, name: 'Aluguel de bicicleta na lua de mel', price: 110, emoji: '🚲', curQ: 0, totQ: 10, cat: 'luademel', prevBuyers: [] },
    { id: 28, name: 'Ajude o noivo a dar flores à noiva', price: 80, emoji: '🌸', curQ: 0, totQ: 10, cat: 'sobrevivencia', prevBuyers: [] },
    { id: 29, name: 'Garrafa de vinho para o casal', price: 70, emoji: '🍾', curQ: 0, totQ: 10, cat: 'luademel', prevBuyers: [] },
    { id: 30, name: 'Só pra não dizer que não dei nada', price: 70, emoji: '🎀', curQ: 0, totQ: 10, cat: 'sobrevivencia', prevBuyers: [] },
    { id: 31, name: 'Lenço para a noiva não borrar a maquiagem', price: 60, emoji: '💄', curQ: 0, totQ: 10, cat: 'sobrevivencia', prevBuyers: [] },
    { id: 32, name: 'Combo de controles de TV anti-briga', price: 60, emoji: '📺', curQ: 0, totQ: 10, cat: 'sobrevivencia', prevBuyers: [] },
    { id: 33, name: 'Jack Fire para o noivo', price: 140, emoji: '🥃', curQ: 0, totQ: 10, cat: 'sobrevivencia', prevBuyers: [] },
    { id: 34, name: 'Licor de chocolate para a noiva', price: 140, emoji: '🍫', curQ: 0, totQ: 10, cat: 'sobrevivencia', prevBuyers: [] },
    { id: 35, name: 'Apoio psicológico para comer saudável', price: 85, emoji: '🥗', curQ: 0, totQ: 10, cat: 'sobrevivencia', prevBuyers: [] },
    { id: 36, name: 'Remedinho para ressaca dos noivos', price: 90, emoji: '💊', curQ: 0, totQ: 10, cat: 'sobrevivencia', prevBuyers: [] },
    { id: 37, name: 'Estoque de Engov pós festa', price: 40, emoji: '💊', curQ: 0, totQ: 10, cat: 'sobrevivencia', prevBuyers: [] },
    { id: 38, name: 'Tampões de Ouvido Anti-Ronco', price: 50, emoji: '😴', curQ: 0, totQ: 10, cat: 'sobrevivencia', prevBuyers: [] }
];

// Formatar moeda BRL
function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Renderizar presentes
const giftsGrid = document.getElementById('gifts-grid');

function renderGifts(filter = 'todos') {
    if (!giftsGrid) return;
    giftsGrid.innerHTML = '';

    const filtered = giftsData.filter(g => {
        if (filter === 'todos') return true;
        if (filter === 'ate100') return g.price <= 100;
        if (filter === '100a300') return g.price > 100 && g.price <= 300;
        if (filter === 'acima300') return g.price > 300;
        if (filter === 'luademel') return g.cat === 'luademel';
        if (filter === 'sobrevivencia') return g.cat === 'sobrevivencia';
        return true;
    });

    filtered.forEach(gift => {
        const pct = gift.totQ > 0 ? (gift.curQ / gift.totQ) * 100 : 0;
        const isSoldOut = gift.curQ >= gift.totQ;

        let buyersHtml = '';
        if (gift.prevBuyers.length > 0) {
            const list = gift.prevBuyers.slice(0, 3).map(b => `<span class="buyer-name">${b}</span>`).join('');
            buyersHtml = `<div class="buyers-list">${list}</div>`;
        }

        const card = document.createElement('div');
        card.className = `gift-card reveal reveal-bottom active delay-${(filtered.indexOf(gift) % 5) * 100 + 100}`;
        card.innerHTML = `
            <div class="gift-emoji">${gift.emoji}</div>
            <h3 class="gift-name">${gift.name}</h3>
            <p class="gift-price">${formatCurrency(gift.price)}</p>
            
            <div class="gift-progress">
                <span class="progress-text">${gift.curQ} de ${gift.totQ} cotas preenchidas</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${pct}%"></div>
                </div>
            </div>
            
            <button class="btn-outline-gold btn-block" onclick="openPixModal(${gift.id})" ${isSoldOut ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
                ${isSoldOut ? 'Esgotado' : '🎁 Presentear via PIX'}
            </button>
            ${buyersHtml}
        `;
        giftsGrid.appendChild(card);
    });
}

// Inicializar
renderGifts('todos');

// ==========================================
// FILTROS
// ==========================================
const filterChips = document.querySelectorAll('.filter-chip');
filterChips.forEach(chip => {
    chip.addEventListener('click', function () {
        filterChips.forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        renderGifts(this.dataset.filter);
    });
});

// ==========================================
// MODAL PIX
// ==========================================
const pixModal = document.getElementById('pix-modal');
const closeModal = document.querySelector('.close-modal');
const copyPixBtn = document.getElementById('copy-pix');
const pixKeyInput = document.getElementById('chave-pix');
const confirmGiftBtn = document.getElementById('confirm-gift');
let currentGiftId = null;

window.openPixModal = function (id) {
    const gift = giftsData.find(g => g.id === id);
    if (!gift) return;

    currentGiftId = id;
    document.getElementById('modal-emoji').innerText = gift.emoji;
    document.getElementById('modal-title').innerText = gift.name;
    document.getElementById('modal-price').innerText = formatCurrency(gift.price) + (gift.totQ > 1 ? ' (valor da cota)' : '');

    document.getElementById('donator-name').value = '';
    confirmGiftBtn.innerHTML = 'Confirmar Pagamento';
    confirmGiftBtn.disabled = false;

    pixModal.classList.remove('hidden');
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        pixModal.classList.add('hidden');
    });
}

// Fechar modal clicando fora
window.addEventListener('click', (e) => {
    if (e.target === pixModal) {
        pixModal.classList.add('hidden');
    }
});

// Copiar chave
if (copyPixBtn) {
    copyPixBtn.addEventListener('click', () => {
        pixKeyInput.select();
        document.execCommand('copy');
        const originalText = copyPixBtn.innerText;
        copyPixBtn.innerText = '✔️ Chave Copiada!';
        setTimeout(() => {
            copyPixBtn.innerText = originalText;
        }, 2000);
    });
}

// Simular pagamento
if (confirmGiftBtn) {
    confirmGiftBtn.addEventListener('click', () => {
        const nameInput = document.getElementById('donator-name');
        if (!nameInput.value.trim()) {
            alert('Por favor, informe seu nome para identificarmos o presente.');
            nameInput.focus();
            return;
        }

        confirmGiftBtn.innerHTML = 'Processando...';
        confirmGiftBtn.disabled = true;

        setTimeout(() => {
            const gift = giftsData.find(g => g.id === currentGiftId);
            if (gift && gift.curQ < gift.totQ) {
                gift.curQ++;
                gift.prevBuyers.unshift(nameInput.value.trim()); // Adiciona no início
            }

            pixModal.classList.add('hidden');

            // Re-render gifts and keep active filter
            const activeFilter = document.querySelector('.filter-chip.active').dataset.filter;
            renderGifts(activeFilter);

            // Scroll para o grid suavamente
            const gridOffset = document.getElementById('gifts-grid').offsetTop;
            window.scrollTo({ top: gridOffset - 100, behavior: 'smooth' });

        }, 1200);
    });
}


