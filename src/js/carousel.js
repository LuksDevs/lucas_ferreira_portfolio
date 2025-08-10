
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const cards = document.querySelectorAll('.card-project');
    const prevBtn = document.querySelector('.button-carousel-prev');
    const nextBtn = document.querySelector('.button-carousel-next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');

    const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight);
    const visibleCards = Math.floor(carousel.offsetWidth / cardWidth);

    let currentIndex = 0;
    const cardCount = cards.length;
    let startX = 0;
    let endX = 0;

    cards.forEach((card, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');

        indicator.addEventListener('click', () => {
            goToCard(index);
        });
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = document.querySelectorAll('.indicator');

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        updateButtons();
    }

    function goToCard(index) {
        currentIndex = index;
        updateCarousel();
    }
    function updateButtons() {
        const lastCard = cards.length - 1;
        nextBtn.style.display = currentIndex === lastCard ? "none" : "block";
        prevBtn.style.display = currentIndex === 0 ? "none" : "block";
    }
    updateButtons();
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : cardCount - 1;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < cardCount - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });



    // Touch

    carousel.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
    },{
        passive: true,
    });

    carousel.addEventListener('touchmove', (event) => {
        endX = event.touches[0].clientX;
    },{
        passive: true,
    });

    carousel.addEventListener('touchend', () => {
        if(startX - endX > 50) {
            currentIndex = (currentIndex < cardCount - 1) ? currentIndex + 1 : 0;
        } else if(endX - startX > 50) {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : cardCount - 1;
        }
        updateCarousel();
    },{
       passive: true, 
    });

    window.addEventListener('resize', updateCarousel);

});

