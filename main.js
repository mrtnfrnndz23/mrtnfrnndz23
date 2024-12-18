document.querySelectorAll('.section').forEach(section => {
    section.addEventListener('mouseover', () => {
        section.classList.add('bg-gray-100');
    });
    section.addEventListener('mouseout', () => {
        section.classList.remove('bg-gray-100');
    });
});
