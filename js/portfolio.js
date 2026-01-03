/**
 * Portfolio Logic using Sanity.io
 */

// Initialize Client
import { createClient } from 'https://esm.sh/@sanity/client'
import imageUrlBuilder from 'https://esm.sh/@sanity/image-url'

// Initialize Client
const sanityClient = createClient({
    projectId: 'vtcyzegl',
    dataset: 'production',
    apiVersion: '2023-01-01',
    useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
    return builder.image(source);
}

document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('portfolio-grid');

    try {
        // Query to fetch projects
        const query = `*[_type == "project"]{
            title,
            mainImage,
            description,
            services
        }`;

        const projects = await sanityClient.fetch(query);

        if (projects.length === 0) {
            grid.innerHTML = '<div class="text-center" style="grid-column: 1 / -1;">Nog geen projecten gevonden. Voeg ze toe in Sanity Studio!</div>';
            return;
        }

        grid.innerHTML = ''; // Clear loading state

        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'card reveal-on-scroll';
            card.style.padding = '0'; // Reset card padding for image
            card.style.overflow = 'hidden';

            const imageUrl = project.mainImage ? urlFor(project.mainImage).width(400).height(300).url() : 'assets/hero-bg.png';
            const servicesList = project.services ? project.services.join(', ') : '';

            card.innerHTML = `
                <div style="height: 250px; overflow: hidden;">
                    <img src="${imageUrl}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;">
                </div>
                <div style="padding: var(--spacing-sm);">
                    <h3 class="text-primary font-bold" style="margin-bottom: var(--spacing-xs);">${project.title}</h3>
                    <p class="text-sm" style="color: var(--color-text-light); margin-bottom: var(--spacing-sm); font-style: italic;">${servicesList}</p>
                    <p style="font-size: 0.9rem;">${project.description || ''}</p>
                </div>
            `;

            // Add hover effect via JS or rely on CSS
            const img = card.querySelector('img');
            card.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.05)';
            });
            card.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
            });

            grid.appendChild(card);
        });

        // Re-trigger scroll animations for new elements if needed
        if (window.initScrollAnimations) window.initScrollAnimations();

    } catch (error) {
        console.error('Sanity Fetch Error:', error);
        grid.innerHTML = `<div class="text-center" style="color: red; grid-column: 1 / -1;">Fout bij het laden van projecten. Controleer uw CORS instellingen in Sanity.<br><small>${error.message}</small></div>`;
    }
});
