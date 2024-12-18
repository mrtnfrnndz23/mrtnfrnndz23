document.querySelectorAll('.section').forEach(section => {
    section.addEventListener('mouseover', () => {
        section.classList.add('bg-gray-100');
    });
    section.addEventListener('mouseout', () => {
        section.classList.remove('bg-gray-100');
    });
});

document.querySelectorAll('.list li').forEach(item => {
    item.addEventListener('click', () => {
        const description = item.querySelector('.description');
        const arrow = item.querySelector('.arrow');
        if (description) {
            description.classList.toggle('hidden');
            arrow.textContent = description.classList.contains('hidden') ? '▼' : '▲';
            if (!description.classList.contains('hidden')) {
                description.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Scroll to the description
                touchEnabled = false; // Disable touch events
                setTimeout(() => {
                    touchEnabled = true; // Re-enable touch events after 1 second
                }, 1000);
            }
        }
    });
});

document.querySelectorAll('.section').forEach(section => {
    section.addEventListener('click', () => {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Scroll to the section
    });
});

const carousel = document.querySelector('.carousel');
const sections = document.querySelectorAll('.section');
const prevButton = document.querySelector('.carousel-button.left');
const nextButton = document.querySelector('.carousel-button.right');
let currentIndex = 0;

function updateCarousel() {
    const sectionWidth = carousel.clientWidth; // Use carousel width instead of section width
    carousel.style.transform = `translateX(-${currentIndex * sectionWidth}px)`;

    // Hide or show buttons based on the current index
    prevButton.style.display = currentIndex === 0 ? 'none' : 'block';
    nextButton.style.display = currentIndex === sections.length - 1 ? 'none' : 'block';
}

// Initialize the carousel buttons visibility
updateCarousel();

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

nextButton.addEventListener('click', () => {
    if (currentIndex < sections.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});

function handleScroll(event) {
    if (event.deltaY > 0 && currentIndex < sections.length - 1) {
        currentIndex++;
    } else if (event.deltaY < 0 && currentIndex > 0) {
        currentIndex--;
    }
    updateCarousel();
}

carousel.addEventListener('wheel', handleScroll);

window.addEventListener('resize', updateCarousel);

let startX = 0;
let endX = 0;
const edgeThreshold = 50; // Define a threshold for edge detection
let touchEnabled = true; // Flag to enable/disable touch events

carousel.addEventListener('touchstart', (event) => {
    if (touchEnabled) {
        startX = event.touches[0].clientX;
    }
});

carousel.addEventListener('touchmove', (event) => {
    if (touchEnabled) {
        endX = event.touches[0].clientX;
    }
});

carousel.addEventListener('touchend', (event) => {
    if (touchEnabled) {
        const touchDistance = startX - endX;
        const target = event.target;

        // Check if the touch event is on a description element
        if (!target.closest('.description')) {
            if (Math.abs(touchDistance) > edgeThreshold) {
                if (touchDistance > 0 && currentIndex < sections.length - 1) {
                    currentIndex++;
                } else if (touchDistance < 0 && currentIndex > 0) {
                    currentIndex--;
                }
                updateCarousel();
            }
        }
    }
});