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
	// popup
	$(".popup-link").magnificPopup({
	});
	// textarea тянется вместе с содержимым
	autosize(document.querySelectorAll('textarea'));
	$('.spoiler-wrap').on('click', function () {
		if ($(this).hasClass('spoiler-wrap--active')) {
			$(this).removeClass('spoiler-wrap--active');
			$(this).children('.spoiler-body').fadeOut(500);
		} else {
			$(this).addClass('spoiler-wrap--active');
			$(this).children('.spoiler-body').fadeIn(500);
		}
	});

	function ThisIsWebP() {
		var def = $.Deferred(), crimg = new Image();
		crimg.onload = function () { def.resolve(); };
		crimg.onerror = function () { def.reject(); };
		crimg.src = "img/about-bg1.webp";
		return def.promise();
	}

	ThisIsWebP().then(function () {
		//Есть поддержка webp
		console.log('есть');
		$('body').addClass('webp-support');
	}, function () {
		//Нет поддержки webp
		console.log('net');
		$('body').addClass('webp-missed');
	});
});