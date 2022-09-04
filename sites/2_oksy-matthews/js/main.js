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
	// lazy map
	YaMapsShown = false;
	$(document).ready(function () {
		$(window).scroll(function () {
			if (!YaMapsShown) {
				if ($(window).scrollTop() + $(window).height() > $(document).height() - 700) {
					showYaMaps();
					YaMapsShown = true;
				}
			}
		});
	});
	function showYaMaps() {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "http://api-maps.yandex.ru/services/constructor/1.0/js/?sid=iaFxi9Mln1MO3U5voKWd_CC9HX1G5YO6&width=320&height=250";
		document.getElementByClassName("contacts-map").appendChild(script);
	}
});