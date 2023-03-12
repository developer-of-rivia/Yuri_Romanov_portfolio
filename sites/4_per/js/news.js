$(document).ready(function () {
    function pagSlider(sliderName, pagContainer) {
        let slider = $('.' + sliderName);
        let pages = $('.' + pagContainer);
        slider.slick('slickGoTo', 0);
        slider.on('init', function () {
            pages.html('<span>' + i + '</span>' + '/' + slick.slideCount);
        });
        slider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
            let i = (currentSlide ? currentSlide : 0) + 1;
            pages.html('<span>' + i + '</span>' + '  /  ' + slick.slideCount);
        });
    }

    // scert slider
    $('.scert__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: 'ondemand',
        arrows: true,
        dots: true,
        appendDots: $('.scert__slider-dots'),
        appendArrows: $('.scert__slider-arrows'),
        prevArrow: '<button class="slick-prev slider__arrow--first" aria-label="Previous" type="button"><i class="_icon-arrow-left"></button>',
        nextArrow: '<button class="slick-next slider__arrow--first" aria-label="Next" type="button"><i class="_icon-arrow-right"></button>',
    });
    pagSlider('scert__slider', 'scert__slider-pags');
});