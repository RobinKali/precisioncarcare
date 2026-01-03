/**
 * Before/After Slider Logic
 */
document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.ba-slider');

    sliders.forEach(slider => {
        const resize = slider.querySelector('.resize');
        const handle = slider.querySelector('.handle');

        // Initial setup
        const sliderWidth = slider.offsetWidth;
        resize.style.width = '50%';
        handle.style.left = '50%';

        // Fix: Set width of the image inside resize to match slider width
        const beforeImg = resize.querySelector('img');
        if (beforeImg) {
            beforeImg.style.width = `${sliderWidth}px`;
        }

        let isDown = false;

        const move = (e) => {
            if (!isDown) return;

            const rect = slider.getBoundingClientRect();
            const x = (e.clientX || e.touches[0].clientX) - rect.left;
            const width = Math.max(0, Math.min(x, rect.width));
            const percentage = (width / rect.width) * 100;

            resize.style.width = `${percentage}%`;
            handle.style.left = `${percentage}%`;
        };

        // Update image width on window resize
        window.addEventListener('resize', () => {
            const newWidth = slider.offsetWidth;
            if (beforeImg) beforeImg.style.width = `${newWidth}px`;
        });

        // Mouse events
        slider.addEventListener('mousedown', () => isDown = true);
        window.addEventListener('mouseup', () => isDown = false);
        slider.addEventListener('mousemove', move);

        // Touch events
        slider.addEventListener('touchstart', () => isDown = true);
        window.addEventListener('touchend', () => isDown = false);
        slider.addEventListener('touchmove', move);
    });
});
