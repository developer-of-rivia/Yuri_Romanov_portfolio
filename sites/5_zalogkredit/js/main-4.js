$(document).ready(function(){

    $('.acc-filter_open').on('click', function(){
    	$('.acc-filter_wrapper').toggleClass(' acc-filter--open');
    });
    $('.acc-filter_close').on('click', function(){
    	$('.acc-filter_wrapper').toggleClass(' acc-filter--open');
    });


    /*new SimpleBar(document.getElementById('acc-wrapper'), {
    	autoHide: false,
	});*/


	/* очищает */
	 $(".order-clean").on("click", function() {
		$(this).closest(".tab").find("input")
			.not(':button, :submit, :reset, :hidden, .reset')
			.val('')
			.removeAttr('checked')
			.removeAttr('selected');
		$(this).closest(".tab").find("select")
			.not(':button, :submit, :reset, :hidden, .reset')
			.val('')
			.removeAttr('checked')
			.removeAttr('selected');
	});

	$(".order-accept").on("click", function() {
	    let acceptInput = $(this).find('input');
	    if(acceptInput.prop('checked')){
	        acceptInput.prop('checked', false);
	    }else{
	        acceptInput.prop('checked', true);
	    }
	});

	/*$(".order-btn").on("click", function() {
		$('.step.order-tab.order-tabs-first-child').removeClass('order-tabs-first-child');
	});*/

	/* табы */
	$('.content-tabs-wrapper').each(function() {
		let ths = $(this);
		ths.find('.tab-item').not(':first').hide();
		ths.find('.tab').click(function() {
			ths.find('.tab').removeClass('active').eq($(this).index()).addClass('active');
			ths.find('.tab-item').hide().eq($(this).index()).fadeIn()
		}).eq(0).addClass('active');
	});


	/* кнопка сбросить поля */
	/*
	$(".reset").on("click", function() {
		$(this).closest("form")[0].reset();
		$(this).closest("form").find(".input").html("Выбрать");
	});*/


	/* слайдер */
	$('.exit-box').owlCarousel({
	   responsive : {
	    320 : {
	        items: 1
	    },
	    575 : {
	        items: 2
	    },
	    781 : {
	        items: 3
	    },
	    992 : {
	        items: 4
	    },
	  }
	});


	/* поиск по сайту */
	$('.header-search-icon').on('click', function(){
		$('.header-search_results').toggleClass(' header-results--open');
		$('.header-search-input').toggleClass(' header-input--open');
		$('.header-search-input').focus();
		$('.header-search').toggleClass(' header-search--open');
		$('.header-search-close').toggleClass(' header-search-close--visible');
		$('.header-search-icon').toggleClass(' header-search-icon--hidden');
	});

	$('.header-search-close').on('click', function(){
		$('.header-search_results').toggleClass(' header-results--open');
		$('.header-search-input').toggleClass(' header-input--open');
		$('.header-search-input').focus();
		$('.header-search').toggleClass(' header-search--open');
		$('.header-search-close').toggleClass(' header-search-close--visible');
		$('.header-search-icon').toggleClass(' header-search-icon--hidden');
	});

	// castom select
	$('.select').each(function(){
		var select = $(this);
		if ($('.select-options ul li.selected', select).length) {
			$('.input', select).html($('.select-options li.selected > span:first-child', select).html());
		} else {
			$('.input', select).html($('.select-options li:first-child > span:first-child', select).html());
		}
		select.click(function() {
			$(this).children('.select-options').toggleClass('visible');
		});
		$('.select-options li', select).click(function() {
			$('.selected', select).removeClass('selected');
			$(this).addClass('selected');
			//$('.input', select).text($(this).find('span').text());
			$('.input', select).html($(this).children('span').html());
		});
	})
	$(".select").on("click", function() {
		$(this).children('.input').toggleClass(' input-active');
		$(this).children('.input-angle').toggleClass(' input-angle--active');
	});


	/* попап */
	$(".popup-link").magnificPopup();

	/* для меню */
	$('.menu-box_inner').hover(function(){
		$(this).prev().toggleClass(' menu-box_arrowdown');
	});

	/* меню открытие на мобилках */
	$('.header-burger').on('click', function(){
		$('.menu-line').toggleClass(' menu-line--open');
		$('.menu-burger-icon').toggleClass(' menu-burger-icon-hidden');
		$('.menu-close-icon').toggleClass(' menu-close-icon--visible');
		$('.page-body').toggleClass(' body-stop');
		$('.header-loc').toggleClass(' header-loc--open');
	});

	/* слайдер */
	$('.comments-box').owlCarousel({
	    dots: true,
	   responsive : {
	    320 : {
	        items: 1

	    },
	    781 : {
	        items: 2

	    },
	    992 : {
	    	items: 2

	    }
	  }
	});

	/* выбор стран */
	$('.header-loc_click').on('click', function(){
		$('.loc-search').toggleClass(' loc-search--open');
		$('.page-body').toggleClass(' body-stop');
	});
	$('.loc-search_close').on('click', function(){
		$('.loc-search').toggleClass(' loc-search--open');
		$('.page-body').toggleClass(' body-stop');
	});

	/* Слайдер на странице news */
	$('.tab-item--slider').owlCarousel({
		responsive : {
	    320 : {
	        items: 1,
			nav: true,
			dots: true,
			navText: ['<span></span>','<span></span>'],
	    },
	    781 : {
	    	items: 1,
	        dots: false,
	        nav: false,
	        mouseDrag: false,
	        touchDrag: false
	    },
	  }
	});

	/* owlcarousel точки с цифрами */
	var i= 1; $('.tab-item--slider1 .owl-dot').each(function(){    $(this).find('span').html(i);   i++; });
	var i= 1; $('.tab-item--slider2 .owl-dot').each(function(){    $(this).find('span').html(i);   i++; });
	var i= 1; $('.tab-item--slider3 .owl-dot').each(function(){    $(this).find('span').html(i);   i++; });
	var i= 1; $('.tab-item--slider4 .owl-dot').each(function(){    $(this).find('span').html(i);   i++; });
	var i= 1; $('.tab-item--slider5 .owl-dot').each(function(){    $(this).find('span').html(i);   i++; });
	var i= 1; $('.tab-item--slider6 .owl-dot').each(function(){    $(this).find('span').html(i);   i++; });
	var i= 1; $('.tab-item--slider7 .owl-dot').each(function(){    $(this).find('span').html(i);   i++; });
	var i= 1; $('.tab-item--slider8 .owl-dot').each(function(){    $(this).find('span').html(i);   i++; });
	var i= 1; $('.tab-item--slider9 .owl-dot').each(function(){    $(this).find('span').html(i);   i++; });
	var i= 1; $('.tab-item--slider10 .owl-dot').each(function(){    $(this).find('span').html(i);   i++; });
	//var i= 1; $('.tab-item--slider .owl-dot').each(function(){    $(this).find('span').html(i);   i++; });

	/* textarea тянется вместе с содержимым */
	autosize(document.querySelectorAll('textarea'));

	/* ползунок на калькуляторе */
	range = $('.range-slider > .input-range');
	value = $('.range-slider > .range-value');
	    
	value.val(range.attr('value'));

	range.on('input', function(){
	  //monparent=$(this).parent();
	  monparent=this.parentNode;
	  value=$(monparent).find('.range-value');
	    $(value).val(this.value);
	});

	value.on('input', function(){
	    monparent=this.parentNode;
	  	range=$(monparent).find('.input-range');
	    $(range).val(this.value);
	 
	});

});