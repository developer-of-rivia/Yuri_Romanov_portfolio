$('.yuchoise__item').on('click', function () {
    $('.yuchoise__item').removeClass('yuchoise__item--active');
    $(this).addClass('yuchoise__item--active');
});
$('.yuchoise__item--mobile').on('click', function () {
    $('.yudevices').addClass('yudevices--active');
});
$('.yuchoise__item--desk').on('click', function () {
    $('.yudevices').removeClass('yudevices--active');
});


// lazy load portfolio interface
window.addEventListener("click", piframe);

function piframe() {
    const piElement = document.querySelector('.piframe');

    if (!piElement.classList.contains('pi_loaded')) {
        const piElementUrl = piElement.dataset.mobile;
        piElement.insertAdjacentHTML(
            "beforeend",
            `<iframe src="${piElementUrl}" style="border: 0" allowfullscreen=""></iframe>`
        );
        piElement.classList.add('pi_loaded');
    }
}