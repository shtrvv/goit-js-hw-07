import { galleryItems } from './gallery-items.js';
// Change code below this line

const container = document.querySelector('.gallery');

container.insertAdjacentHTML('afterbegin', createMarkup(galleryItems));
container.addEventListener('click', onContainerClick);

function createMarkup(arr) {
    return arr.map(({ preview, original, description }) => `
    <li class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
    </li>`).join('');
}

function onContainerClick(event) {
    event.preventDefault();

    if (event.target === event.currentTarget) {
        return;
    }

    const instance = basicLightbox.create(`
    <img src="${event.target.dataset.source}" width="800" height="600">
    `);
    instance.show();

    document.addEventListener('keydown', onEscClick);

    function onEscClick(event) {
        if (event.key === 'Escape') {
            instance.close();
            document.removeEventListener('keydown', onEscClick);
        }
    }
}
