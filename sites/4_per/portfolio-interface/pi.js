let yuchoise_item_desk = document.querySelector('.yuchoise__item--desk');
let yuchoise_item_mobile = document.querySelector('.yuchoise__item--mobile');
let yudevices = document.querySelector('.yudevices');


yuchoise_item_desk.addEventListener('click', function(){
    this.classList.add('yuchoise__item--active');
    yuchoise_item_mobile.classList.remove('yuchoise__item--active');
    yudevices.classList.remove('yudevices--active');
});
yuchoise_item_mobile.addEventListener('click', function(){
    this.classList.add('yuchoise__item--active');
    yuchoise_item_desk.classList.remove('yuchoise__item--active');
    yudevices.classList.add('yudevices--active');
});


function iniFrame() {
if ( window.location !== window.parent.location )
// скрипты для iframe страницы
{
    let iframeBody = document.querySelector('body');
    iframeBody.classList.add('body--iframe');

    let yuchoiseInterface = document.querySelector('.yuchoise');
    yuchoiseInterface.classList.add('hidden');

    document.querySelectorAll('body').forEach(el => {
        new SimpleBar(el)
    });
}
// else {
//     document.write("The page is not in an iFrame");
// }
}
iniFrame();