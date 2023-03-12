$(document).ready(function(){

	/* табы */
	/*$('.tabs-wrapper').each(function() {
		let ths = $(this);
		ths.find('.tab-item').not(':first').hide();
		ths.find('.tab').click(function() {
			ths.find('.tab').removeClass('active').eq($(this).index()).addClass('active');
			ths.find('.tab-item').hide().eq($(this).index()).fadeIn()
		}).eq(0).addClass('active');
	});*/
    
    $(document).on('click','.news_tabs span',function() {
        $('.news_tabs span').removeClass('active');
        $(this).addClass('active');
        location.href = '/news?cat='+$(this).data('cat');
    });
    $(document).on('click','.gallery_tabs span',function() {
        $('.news_tabs span').removeClass('active');
        $(this).addClass('active');
        location.href = '/gallery?cat='+$(this).data('cat');
    });



	/* Главный слайдер */
	$('.gallery-box').slick({
	    slidesToShow: 3,
	    prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button"></button>',
	    nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button"></button>',
	    dots: false,
	    centerMode: true,
	    variableWidth: true
	});


	/* Слайдер с новостями на главной */
	$('.articles-box').slick({
	    slidesToShow: 3,
	    prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button"></button>',
	    nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button"></button>',
	    dots: false,
	    responsive: [
	    {
	      breakpoint: 800,
	      settings: {
	        slidesToShow: 2,
	        slidesToScroll: 2,
	      }
	    },
	    {
	      breakpoint: 575,
	      settings: {
	        slidesToShow: 1,
	        slidesToScroll: 1
	      }
	    },
	  ]
	});


	/* textarea тянется вместе с содержимым */
	autosize(document.querySelectorAll('textarea'));


	/* Попап */
	$(".popup-link").magnificPopup({
		type: 'image',
        gallery:{
            enabled:true
        }
	});


	/* Мобильное меню */
	$('.header_burger').on('click', function(){
		$('.header_right').toggleClass(' header-right--open');
	});
	$('.header_burger').on('click', function(){
		$('.header_burger').toggleClass(' header_burger--open');
	});
	$('.header_burger').on('click', function(){
		$('html').toggleClass(' body-stop');
	});
	

	
	$(document).on('click','.vacancy-link',function(e) {
        e.preventDefault();
        let tab = $(this).data('tab');
        $('.vacancy-tab').removeClass('active');
        $('.vacancy-tab[data-tab="'+tab+'"]').addClass('active');
    	let elementClick = $(this).attr('href');
    	let destination = $(elementClick).offset().top;
    	$("html:not(:animated),body:not(:animated)").animate({
    		scrollTop: destination
    	}, 300);
    });
    
    $(document).on('click','.to-vac',function(e) {
        e.preventDefault();
    	let elementClick = $(this).attr('href');
    	let destination = $(elementClick).offset().top;
    	$("html:not(:animated),body:not(:animated)").animate({
    		scrollTop: destination
    	}, 300);
    });
	
	$('.order-form').submit(function(e) {
    	e.preventDefault();
    	var form_data = $(this).serialize();
    	$.ajax({
    		url: '/ajax',
    		data: form_data,
    		type: "POST",
    		success: function(data){
    			$.fancybox.close();
    			$.fancybox.open({ src  : '#success-message' });
    		}
    	});
    });
    
});