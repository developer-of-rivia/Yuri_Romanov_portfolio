$(document).ready(function () {
    // spoiler mobile
    if ($(window).width() <= 574) {
        $('.spoiler__body--mobile').hide(0);
        $(document).on('click', '.spoiler__head--mobile', function (e) {
            $(this).parents('.spoiler--mobile').toggleClass("active").find('.spoiler__body--mobile').slideToggle();
            $(this).parents('.spoiler--mobile').find('.pick__spoiler-head').html('Развернуть фильтр');
            if ($(this).parents('.spoiler--mobile').hasClass('active')) {
                $(this).parents('.spoiler--mobile').find('.pick__spoiler-head').html('Подобрать генератор');
            }
        });
    }
    // wrapSlider function
    function wrapSlider(item, wrapName, wrapMd, wrapSm, wrapXs) {
        if ($(window).width() >= 991) {
            var stockItem = $('.' + item),
                cntGroup = wrapMd; // по сколько элементов в группе
            var divsArr = stockItem.get();
            for (var i = 0; i < stockItem.length; i += cntGroup) {
                $(divsArr.slice(i, i + cntGroup)).wrapAll('<div class=' + wrapName + '>');
            }
        }
        if ($(window).width() <= 991 && $(window).width() > 574) {
            var stockItem = $('.' + item),
                cntGroup = wrapSm; // по сколько элементов в группе
            var divsArr = stockItem.get();
            for (var i = 0; i < stockItem.length; i += cntGroup) {
                $(divsArr.slice(i, i + cntGroup)).wrapAll('<div class=' + wrapName + '>');
            }
        }
        if ($(window).width() <= 574) {
            var stockItem = $('.' + item),
                cntGroup = wrapXs; // по сколько элементов в группе
            var divsArr = stockItem.get();
            for (var i = 0; i < stockItem.length; i += cntGroup) {
                $(divsArr.slice(i, i + cntGroup)).wrapAll('<div class=' + wrapName + '>');
            }
        }
    }
    /* tslider */
    $('.tslider__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        lazyLoad: 'ondemand',
        loop: true,
        dots: true,
        appendDots: $('.tslider__slider-dots'),
    });
    /* sort tabs */
    if ($(window).width() >= 575) {
        createTabs('sort__tabs', 'sort__item', 'sort__tabs-link');
    }
    // sort fromtabs
    if ($(window).width() <= 574) {
        $('.spoiler__body--fromtabs').hide(0);
        $(document).on('click', '.spoiler__head--fromtabs', function (e) {
            $(this).parents('.spoiler--fromtabs').toggleClass("active").find('.spoiler__body--fromtabs').slideToggle();
        });
    }
    // sort fromtabs
    if ($(window).width() <= 991) {
        $('.spoiler__body--tablet').hide(0);
        $(document).on('click', '.spoiler__head--tablet', function (e) {
            $(this).parents('.spoiler--tablet').toggleClass("active").find('.spoiler__body--tablet').slideToggle();
        });
    }
    // pagSlider function
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
    // tabs
    function createTabs(tabsContainer, tabsItem, tabsLink) {
        $('.' + tabsContainer).each(function () {
            let ths = $(this);
            ths.find('.' + tabsItem).not(':first').hide();
            ths.find('.' + tabsLink).click(function () {
                ths.find('.' + tabsLink).removeClass('active').eq($(this).index()).addClass('active');
                ths.find('.' + tabsItem).hide().eq($(this).index()).fadeIn()
            }).eq(0).addClass('active');
        });
    }
    // scert slider
    // scert slider
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
    // trust slider
    // trust slider
    // trust slider
    wrapSlider('trust__col', 'trust__item-group', 6, 4, 2);
    $('.trust__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        lazyLoad: 'ondemand',
        dots: true,
        appendDots: $('.trust__slider-dots'),
        appendArrows: $('.trust__slider-arrows'),
        prevArrow: '<button class="slick-prev slider__arrow--first" aria-label="Previous" type="button"><i class="_icon-arrow-left"></button>',
        nextArrow: '<button class="slick-next slider__arrow--first" aria-label="Next" type="button"><i class="_icon-arrow-right"></button>',
    });
    pagSlider('trust__slider', 'trust__slider-pags');
    /* proj slider */
    /* proj slider */
    /* proj slider */
    wrapSlider('proj__item', 'proj__item-group', 3, 2, 1);
    $('.proj__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        loop: false,
        arrows: true,
        dots: true,
        appendDots: $('.proj__slider-dots'),
        appendArrows: $('.proj__slider-arrows'),
        prevArrow: '<button class="slick-prev slider__arrow--first" aria-label="Previous" type="button"><i class="_icon-arrow-left"></button>',
        nextArrow: '<button class="slick-next slider__arrow--first" aria-label="Next" type="button"><i class="_icon-arrow-right"></button>',
    });
    /* mstabs */
    $('.lead__slider').css('height', '0');
    $('.lead__slider').css('overflow', 'hidden');
    $('.lead__slider-arrows').css('display', 'none');
    $('.lead__slider-pags').css('display', 'none');
    $('.mstabs--stocks').on('click', function () {
        $(this).addClass('title');
        $(this).removeClass('title-area__sub');
        $('.mstabs--leads').removeClass('title');
        $('.mstabs--leads').addClass('title-area__sub');
        $('.lead__slider').css('height', '0');
        $('.lead__slider').css('overflow', 'hidden');
        $('.lead__slider-arrows').css('display', 'none');
        $('.lead__slider-pags').css('display', 'none');
        $('.stock__slider').css('display', 'block');
        $('.stock__slider-arrows').css('display', 'flex');
        $('.stock__slider-pags').css('display', 'block');
    });
    $('.mstabs--leads').on('click', function () {
        $(this).addClass('title');
        $(this).removeClass('title-area__sub');
        $('.mstabs--stocks').removeClass('title');
        $('.mstabs--stocks').addClass('title-area__sub');
        $('.stock__slider').css('display', 'none');
        $('.stock__slider-arrows').css('display', 'none');
        $('.stock__slider-pags').css('display', 'none');
        $('.lead__slider').css('height', 'auto');
        $('.lead__slider').css('overflow', 'visible');
        $('.lead__slider-arrows').css('display', 'flex');
        $('.lead__slider-pags').css('display', 'block');
    });
    pagSlider('proj__slider', 'proj__slider-pags');
    // stock slider
    // stock slider
    // stock slider
    wrapSlider('stock__item', 'stock__item-group', 3, 2, 1);
    $('.stock__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        appendArrows: $('.stock__slider-arrows'),
        prevArrow: '<button class="slick-prev slider__arrow--first" aria-label="Previous" type="button"><i class="_icon-arrow-left"></button>',
        nextArrow: '<button class="slick-next slider__arrow--first" aria-label="Next" type="button"><i class="_icon-arrow-right"></button>',
    });
    pagSlider('stock__slider', 'stock__slider-pags');
    // lead slider
    // lead slider
    // lead slider
    wrapSlider('lead__item', 'lead__item-group', 3, 2, 1);
    $('.lead__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        appendArrows: $('.lead__slider-arrows'),
        prevArrow: '<button class="slick-prev slider__arrow--first" aria-label="Previous" type="button"><i class="_icon-arrow-left"></button>',
        nextArrow: '<button class="slick-next slider__arrow--first" aria-label="Next" type="button"><i class="_icon-arrow-right"></button>',
    });
    pagSlider('lead__slider', 'lead__slider-pags');
    // second example, where the scrollbar is painted insde of the scroll area,
    // with some vertical offset both from top & bottom
    let scrollBox = document.querySelectorAll('.select__box--scroll');
    for (let i = 0; i < scrollBox.length; i++) {
        scrollBox[i].fakeScroll({
            track: "smooth"
        });
    }
    for (let elm of document.querySelectorAll('.fakeScroll__content'))
    // читать дальше на главной странице
    $('.message__content-readmore').on('click', function () {
        if ($('.message').hasClass('message--active')) {
            $('.message').removeClass('message--active');
            $(this).children('span').html('Читать дальше');
        } else {
            $('.message').addClass('message--active');
            $(this).children('span').html('Скрыть');
        }
    });
    // cview
    // cview
    // cview
    $('.cviews__item--list').addClass('cviews__item--active');
    $('.cviews__item--tile').on('click', function () {
        $('.cviews__item--tile').addClass('cviews__item--active');
        $('.cviews__item--list').removeClass('cviews__item--active');
        $('.item').removeClass('item--list');
        $('.catalog__box').addClass('catalog__box--tile');
        $('.catalog__box').removeClass('catalog__box--list');
        $('.catalog__top').hide();
    });
    $('.cviews__item--list').on('click', function () {
        $('.cviews__item--list').addClass('cviews__item--active');
        $('.cviews__item--tile').removeClass('cviews__item--active');
        $('.item').removeClass('item--tile');
        $('.item').addClass('item--list');
        $('.catalog__box').addClass('catalog__box--list');
        $('.catalog__box').removeClass('catalog__box--tile');
        $('.catalog__top').show();
    });
    if ($(window).width() < 991) {
        $('.catalog__item').removeClass('item--list');
    }
    // qa spoiler
    $('.qa__spoiler-body').hide(300);
    $(document).on('click', '.qa__spoiler-head', function (e) {
        $(this).parents('.qa__spoiler').toggleClass("active").find('.qa__spoiler-body').slideToggle();
    });
    // catalog load more
    if ($(window).width() < 991) {
        $('.catalog__item').hide();
        $(function () {
            $(".catalog__item").slice(0, 2).show();
            $(".cshowall").on('click', function (e) {
                $(".catalog__item:hidden").slice(0, 2).slideDown();
                if ($(".catalog__item:hidden").length == 0) {
                    $(".cshowall").fadeOut('slow');
                }
            });
        });
    }
    // cfilter
    $('.select__item-up').on('click', function(){
        $(this).closest('.select__box').siblings('.select__head').children('.select__chosed-up').css('display', 'block');
        $(this).closest('.select__box').siblings('.select__head').children('.select__chosed-down').css('display', 'none');
    });
    $('.select__item-down').on('click', function(){
        $(this).closest('.select__box').siblings('.select__head').children('.select__chosed-up').css('display', 'none');
        $(this).closest('.select__box').siblings('.select__head').children('.select__chosed-down').css('display', 'block');
    });
    $('.select__item-not').on('click', function(){
        $(this).closest('.select__box').siblings('.select__head').children('.select__chosed-up').css('display', 'none');
        $(this).closest('.select__box').siblings('.select__head').children('.select__chosed-down').css('display', 'none');
    });
});