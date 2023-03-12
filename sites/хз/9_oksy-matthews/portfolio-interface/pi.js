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
function iniFrame() {
if ( window.location !== window.parent.location )
{
    let yuchoiseInterface = document.querySelector('.yuchoise');
    yuchoiseInterface.classList.add('hidden');
}
// else {
//     document.write("The page is not in an iFrame");
// }
}
iniFrame();