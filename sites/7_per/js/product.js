$(document).ready(function () {
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
    /* sort tabs */
    if ($(window).width() >= 575) {
        createTabs('sort__tabs', 'sort__item', 'sort__tabs-link');
    }
    // sort fromtabs
    if ($(window).width() <= 574) {
        $('.spoiler__body--fromtabs').toggleClass(' product-spoiler-hidden');
        $(document).on('click', '.spoiler__head--fromtabs', function (e) {
            $(this).parents('.spoiler--fromtabs').toggleClass("active").find('.spoiler__body--fromtabs').toggleClass(' product-spoiler-hidden');
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
    /* showcase slider */
    $('.showcase__box').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        arrows: true,
        dots: false,
        initialSlide: 1,
        centerMode: true,
        centerPadding: '25px',
        appendArrows: $('.showcase__slider-arrows'),
        prevArrow: '<button class="slick-prev slider__arrow--first" aria-label="Previous" type="button"><i class="_icon-arrow-left"></button>',
        nextArrow: '<button class="slick-next slider__arrow--first" aria-label="Next" type="button"><i class="_icon-arrow-right"></button>',
    });
    let previewImg = $('.showcase__preview').find('img');
    $('.showcase__box-item').on('click', function () {
        let pickedSlide = $(this).find('img').attr('src');
        previewImg.attr('src', pickedSlide);
        $('.showcase__item').removeClass('showcase__item--active');
        $(this).find('.showcase__item').addClass('showcase__item--active');
    });
    /* prodocs slider */
    $('.prodocs__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        arrows: true,
        dots: false,
        appendArrows: $('.prodocs__slider-arrows'),
        prevArrow: '<button class="slick-prev slider__arrow--first" aria-label="Previous" type="button"><i class="_icon-arrow-left"></button>',
        nextArrow: '<button class="slick-next slider__arrow--first" aria-label="Next" type="button"><i class="_icon-arrow-right"></button>',
    });
    pagSlider('prodocs__slider', 'prodocs__slider-pags');
    if ($(window).width() < 991) {
        $('.produbs').appendTo('.mobile-tabs-area');
        $('.products__docspape').appendTo('.product-mobile-sidebar');
    };
    //
    if ($(window).width() < 575) {
        $('.produbs__box').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            arrows: true,
            dots: false,
            appendArrows: $('.produbs__box-arrows'),
            prevArrow: '<button class="slick-prev slider__arrow--first" aria-label="Previous" type="button"><i class="_icon-arrow-left"></button>',
            nextArrow: '<button class="slick-next slider__arrow--first" aria-label="Next" type="button"><i class="_icon-arrow-right"></button>',
        });
        pagSlider('produbs__box', 'produbs__box-pags');
        $('.analog__box').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            arrows: true,
            dots: false,
            appendArrows: $('.analog__box-arrows'),
            prevArrow: '<button class="slick-prev slider__arrow--first" aria-label="Previous" type="button"><i class="_icon-arrow-left"></button>',
            nextArrow: '<button class="slick-next slider__arrow--first" aria-label="Next" type="button"><i class="_icon-arrow-right"></button>',
        });
        pagSlider('analog__box', 'analog__box-pags');
    }
    if ($(window).width() < 991) {
        $('.analog .item').removeClass('item--list');
    }
});