// lazy load iframe
window.addEventListener("scroll", lazyScroll);

function lazyScroll() {
    if (!loadMapBlock.classList.contains('_loaded')) {
        getMap();
    };
}

const windowHeight = document.documentElement.clientHeight;
const loadMapBlock = document.querySelector('.lazy-iframe');

function getMap() {
    const loadMapBlockPos = loadMapBlock.getBoundingClientRect().top + window.pageYOffset;
    if (window.pageYOffset > loadMapBlockPos - windowHeight) {
        const loadMapUrl = loadMapBlock.dataset.map;
        loadMapBlock.insertAdjacentHTML(
            "beforeend",
            `<iframe src="${loadMapUrl}" style="border: 0" allowfullscreen=""></iframe>`
        );
        loadMapBlock.classList.add('_loaded');
    }
}

if (!loadMapBlock.classList.contains('_loaded')) {
    getMap();
};