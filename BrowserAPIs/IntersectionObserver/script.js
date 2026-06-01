const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle('show', entry.isIntersecting);
        // if the element is intersecting with the viewport, add the 'show' class, otherwise remove it.

        // if (entry.isIntersecting) observer.unobserve(entry.target); // stop observing the element once it is visible in the viewport.
    }, {
        // threshold: 0.5, // the callback will be executed when 50% of the element is visible in the viewport.
        // rootMargin: '-100px' // the callback will be executed when the element is 100px away from the bottom of the viewport.
        threshold: 1,
    });
})

const lastCardObserver = new IntersectionObserver(entries => {
    const lastCard = entries[0];
    if (!lastCard.isIntersecting) return;
    loadNewCards();
    lastCardObserver.unobserve(lastCard.target);
    lastCardObserver.observe(document.querySelector('.card:last-child'));
}, {
    rootMargin: "100px"
});

lastCardObserver.observe(document.querySelector('.card:last-child'));

cards.forEach(card => {
    observer.observe(card);
});

// observer.observe(cards[0]);
// boundingClientRect: is the size of the observed element and its position relative to the viewport.
// intersectionRect: is the size of the visible part of the observed element and its position relative to the viewport.

const cardContainer = document.querySelector('.card-container');

function loadNewCards() {
    for (let i = 0; i < 10; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.textContent = 'New Card';
        observer.observe(card);
        cardContainer.appendChild(card);
    }
}
