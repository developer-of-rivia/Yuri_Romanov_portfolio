$(document).ready(function () {
	// video close
	$('body').on('click', function () {
		$('.popup-video_item').get(0).pause();
	})
	// burger menu
	$('.header__burger').on('click', function () {
		$('.sidebar-wrapper').toggleClass(' sidebar--active');
		$('html').toggleClass(' body-stop');
	});
	$('.menu__link').on('click', function () {
		$('.sidebar-wrapper').toggleClass(' sidebar--active');
		$('html').toggleClass(' body-stop');
	});
	$('.sidebar__close').on('click', function () {
		$('.sidebar-wrapper').toggleClass(' sidebar--active');
		$('html').toggleClass(' body-stop');
	});
	// открытие попап окна по классу
	$(".popup-link").magnificPopup({

	});
	$('.iframe-link').magnificPopup({
		type: 'iframe'
	});
	// спойлер
	$('.spoiler__body').hide(300);
	$(document).on('click', '.spoiler__head', function (e) {
		e.preventDefault()
		$(this).parents('.spoiler').toggleClass("active").find('.spoiler__body').slideToggle();
	});
	// slider
	$('.trust__slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrow: true,
		appendArrows: $('.trust__slider-arrows'),
		prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><i class="_icon-ungle-left"></i></button>',
		nextArrow: '<button class="slick-next" aria-label="Next" type="button"><i class="_icon-ungle-right"></i></button>',
	});
	// slider
	$('.main__slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrow: false,
		autoplay: true,
	});
	// cont tabs
	var mediaQuery = window.matchMedia('(min-width: 992px)');
	if (mediaQuery.matches) {
		$('.cont__loc--ware').on('click', function () {
			$('.cont__loc--office').removeClass('cont__loc--active');
			$('.cont__map--office').removeClass('cont__map--active');
			$('.cont__loc--ware').addClass('cont__loc--active');
			$('.cont__map--ware').addClass('cont__map--active');
		});
		$('.cont__loc--office').on('click', function () {
			$('.cont__loc--ware').removeClass('cont__loc--active');
			$('.cont__map--ware').removeClass('cont__map--active');
			$('.cont__loc--office').addClass('cont__loc--active');
			$('.cont__map--office').addClass('cont__map--active');
		});
	}
	// mask input phone
	$('.popup__phone').mask('+7 (999) 999-99-99');
});