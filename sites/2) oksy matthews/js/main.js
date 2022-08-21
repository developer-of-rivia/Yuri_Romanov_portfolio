$(document).ready(function () {
	/* бургер меню */
	if (document.documentElement.clientWidth < 991) {
		$('.header-burger').on('click', function () {
			$('.header-content').toggleClass(' header-content--open');
			$('.header-burger').toggleClass(' header-burger--open');
			$('html').toggleClass(' body-stop');
		});
		$('.menu li a').on('click', function () {
			$('.header-content').removeClass('header-content--open');
			$('.header-burger').removeClass('header-burger--open');
			$('html').removeClass('body-stop');
		});
	}
	/* spoiler */
	/*
	$('.spoiler-body').hide(300);
	$(document).on('click', '.spoiler-head', function (e) {
		$(this).parents('.spoiler-body').toggleClass("active").find('.spoiler-body').slideToggle();
	});*/
	// gallery 1
	$('.gallery-wrapper1').slick({
		sliderToShow: 1,
		prevArrow: '<button type="button" class="slick-prev"></button>',
		nextArrow: '<button type="button" class="slick-next"></button>',
		adaptiveHeight: true,
		infinite: false,
		fade: true,
		cssEase: 'linear',
	});
	// gallery 2
	$('.gallery-wrapper2').slick({
		sliderToShow: 1,
		prevArrow: '<button type="button" class="slick-prev"></button>',
		nextArrow: '<button type="button" class="slick-next"></button>',
		adaptiveHeight: true,
		infinite: false,
		fade: true,
		cssEase: 'linear',
	});
	//
	$(".popup-link").magnificPopup({
	});
	/* textarea тянется вместе с содержимым */
	autosize(document.querySelectorAll('textarea'));
	/* spoiler */
	$('.spoiler-body').hide(300);
	$(document).on('click', '.spoiler-head', function (e) {
		e.preventDefault()
		$(this).parents('.spoiler-wrap').toggleClass("active").find('.spoiler-body').slideToggle();
	});
	$(document).on('click', '.spoiler-plus', function (e) {
		e.preventDefault()
		$(this).parents('.spoiler-wrap').toggleClass("active").find('.spoiler-body').slideToggle();
		this.nextElementSibling.style.display = 'block';
		this.style.display = 'none';
	});
	$(document).on('click', '.spoiler-minus', function (e) {
		e.preventDefault()
		$(this).parents('.spoiler-wrap').toggleClass("active").find('.spoiler-body').slideToggle();
		this.previousElementSibling.style.display = 'block';
		this.style.display = 'none';
	});
	$('.team-spoiler').on('click', function () {
		$(this).children('.spoiler_body').toggleClass(' hidden');
	});
});