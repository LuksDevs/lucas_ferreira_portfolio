
const urlIcon = "http://127.0.0.1:5500/src/json/icons.json";

async function getIcons() {
    const iconsResponse = await fetch(urlIcon);
    const containerIcon = document.querySelector('.container-icon-card');
    try {
        const icons = await iconsResponse.json();
        icons.map((icon) => {
            containerIcon.innerHTML +=
                `
                <span class="span-icon">
                    <i class='${icon.icon}'></i> ${icon.description}
                </span>
            `
        })
    } catch (err) {
        console.error(`Erro ao recuperar os dados dos icons de Tecnologias favoritas! Error: ${err}`)
    }
}
getIcons()

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.button-carousel-prev');
    const nextBtn = document.querySelector('.button-carousel-next');
    const cards = document.querySelectorAll('.carousel-card');
    const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight);
    let currentPosition = 0;
    const visibleCards = Math.floor(carousel.offsetWidth / cardWidth);
    const totalCards = cards.length;

    // Atualiza a visibilidade dos botões
    // function updateButtons() {
    //     prevBtn.style.display = currentPosition === 0 ? 'none' : 'block';
    //     nextBtn.style.display = currentPosition <= -(totalCards - visibleCards) * cardWidth ? 'none' : 'block';
    // }

    // Move o carousel para a posição especificada
    function moveTo(position) {
        carousel.style.transform = `translateX(${position}px)`;
        currentPosition = position;
        // updateButtons();
    }

    // Event listeners para os botões
    prevBtn.addEventListener('click', function() {
        const newPosition = currentPosition + cardWidth * visibleCards;
        moveTo(Math.min(newPosition, 0));
    });

    nextBtn.addEventListener('click', function() {
        const maxPosition = -(totalCards - visibleCards) * cardWidth;
        const newPosition = currentPosition - cardWidth * visibleCards;
        moveTo(Math.max(newPosition, maxPosition));
    });

    // Inicializa os botões
    // updateButtons();

    // Opcional: Adiciona suporte para touch/swipe em dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    carousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe para a esquerda (próximo)
            nextBtn.click();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe para a direita (anterior)
            prevBtn.click();
        }
    }
});