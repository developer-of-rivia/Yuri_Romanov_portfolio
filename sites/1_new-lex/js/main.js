$(document).ready(function () {
	// Работа меню
	$('.header__burger').on('click', function () {
		$('.header__nav').toggleClass(' header__nav--open');
	});
	$('.header__nav-close').on('click', function () {
		$('.header__nav').toggleClass(' header__nav--open');
	});
	// табы
	$('.tabs').each(function () {
		let ths = $(this);
		ths.find('.tabs__item').not(':first').hide();
		ths.find('.tabs__link').click(function () {
			ths.find('.tabs__link').removeClass('active').eq($(this).index()).addClass('active');
			ths.find('.tabs__item').hide().eq($(this).index()).fadeIn()
		}).eq(0).addClass('active');
	});
	// слайдер
	$('.wem__slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrow: true,
		appendArrows: $('.wem__slider-arrows'),
		prevArrow: '<button class="slick-prev wem__slider-prev" aria-label="Previous" type="button"></button>',
		nextArrow: '<button class="slick-next wem__slider-next" aria-label="Next" type="button"></button>',
	});
	$('.orgm__slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrow: true,
		adaptiveHeight: true,
		appendArrows: $('.orgm__slider-arrows'),
		prevArrow: '<button class="slick-prev wem__slider-prev" aria-label="Previous" type="button"></button>',
		nextArrow: '<button class="slick-next wem__slider-next" aria-label="Next" type="button"></button>',
	});
	// анимация карточек org__item
	$(".org__item").hover(function () {
		$(this).addClass('animate__animated animate__pulse');
	});
	$(".org__item").mouseleave(function () {
		$(this).removeClass('animate__animated animate__pulse').delay(500);
	});
	// magnific popup
	$('.popup-link').magnificPopup();
});