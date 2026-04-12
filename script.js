function filterMenu() {
    const query = document.getElementById('menuSearch').value.trim().toLowerCase();
    const cards = document.querySelectorAll('.dish-card');
    const sections = document.querySelectorAll('.menu-section');
    const noResults = document.getElementById('no-results');

    cards.forEach(card => {
        const searchableText = (card.getAttribute('data-name') + ' ' + card.textContent).toLowerCase();
        const matches = searchableText.includes(query);
        card.hidden = !matches;
    });

    let visibleAny = false;
    sections.forEach(section => {
        const visibleCards = section.querySelectorAll('.dish-card:not([hidden])').length;
        section.style.display = visibleCards ? '' : 'none';
        if (visibleCards) {
            visibleAny = true;
        }
    });

    const showNoResults = query.length > 0 && !visibleAny;
    noResults.classList.toggle('no-results-hidden', !showNoResults);
}

// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const mobileNav = document.getElementById('mobileNav');

if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        mobileToggle.setAttribute('aria-expanded', isOpen.toString());
    });
}

// Smooth scrolling for category links
document.querySelectorAll('.category-scroller a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const navHeight = document.querySelector('.navbar').offsetHeight;

        if (mobileNav && mobileNav.classList.contains('open')) {
            mobileNav.classList.remove('open');
            mobileToggle.setAttribute('aria-expanded', 'false');
        }

        window.scrollTo({
            top: targetSection.offsetTop - navHeight,
            behavior: 'smooth'
        });
    });
});