document.addEventListener("DOMContentLoaded", function(event) { 
    // табы для меню
    $('.nd-tabs-wrapper').each(function() {
        let ths = $(this);
        ths.find('.nd-tab-item').not(':first').hide();
        ths.find('.nd-tab').click(function() {
            ths.find('.nd-tab').removeClass('nd-tab-active').eq($(this).index()).addClass('nd-tab-active');
            ths.find('.nd-tab-item').hide().eq($(this).index()).fadeIn()
        }).eq(0).addClass('nd-tab-active');
    });
    // появление меню
    let burger = document.querySelector('.nd-hbottom__title');
    let burgerWord = document.querySelector('.nd-hbottom__title1');
    let menu = document.querySelector('.nd-menu');
    let closeIcon = document.querySelector('.nd-menu__close');
    let burgerIcon = document.querySelector('.nd-cat-desk-ico');

    burger.onclick = function(){
        if(menu.classList.contains('nd-menu--open')){
            menu.classList.remove('nd-menu--open');
            burgerWord.textContent = 'Открыть';
            burgerIcon.classList.remove('nd-cat-desk-ico-open');
            burger.classList.remove('nd-hbottom__title--menu-open');
        } else {
            menu.classList.add('nd-menu--open');
            burgerWord.textContent = 'Закрыть';
            burgerIcon.classList.add('nd-cat-desk-ico-open');
            burger.classList.add('nd-hbottom__title--menu-open');
        }
    }
    closeIcon.onclick = function(){
        menu.classList.remove('nd-menu--open');
        burgerWord.textContent = 'Открыть';
        burger.classList.remove('nd-hbottom__title--menu-open');
        burgerIcon.classList.remove('nd-cat-desk-ico-open');
    }
    // подпункты
    let ndMenuItemLists = document.querySelectorAll('.nd-menu__item-list--father');
    for(let i = 0; i < ndMenuItemLists.length; i++){
        ndMenuItemLists[i].onclick = function(){
            if(this.classList.contains('nd-menu__item-submenu--open')){
                this.classList.remove('nd-menu__item-submenu--open');
                this.querySelector('.fa-angle-down').style.transform = 'rotate(0deg)';
            } else {
                this.classList.add('nd-menu__item-submenu--open');
                this.querySelector('.fa-angle-down').style.transform = 'rotate(180deg)';
            }
        }
    }
    // fancybox
    // Fancybox.bind("[data-fancybox]", {
    //     placeFocusBack: false
    // });
    // fixed top
    jQuery(function($) {
        $(window).scroll(function(){
            if($(this).scrollTop()>140){
                $('.nd-hcenter__logo').addClass('nd-hcenter__logo--fixed');
                $('.nd-hcenter').addClass('nd-hcenter--fixed');
                $('.nd-hcenter__phone').addClass('nd-hcenter__phone--fixed');
                $('.nd-hcenter__search').addClass('nd-hcenter__search--fixed');
                $('.nd-hbottom__title').addClass('nd-hbottom__title--fixed');
                $('.nd-header').addClass('nd-header--fixed');
                $('.nd-menu').addClass('nd-menu--fixed');
                $('.nd-hcenter__btn2').addClass('nd-hcenter__btn2--fixed');
            }
            else if ($(this).scrollTop()<140){
                $('.nd-hcenter__logo').removeClass('nd-hcenter__logo--fixed');
                $('.nd-hcenter').removeClass('nd-hcenter--fixed');
                $('.nd-hcenter__phone').removeClass('nd-hcenter__phone--fixed');
                $('.nd-hcenter__search').removeClass('nd-hcenter__search--fixed');
                $('.nd-hbottom__title').removeClass('nd-hbottom__title--fixed');
                $('.nd-header').removeClass('nd-header--fixed');
                $('.nd-menu').removeClass('nd-menu--fixed');
                $('.nd-hcenter__btn2').removeClass('nd-hcenter__btn2--fixed');
            }
        });
    });
    // nd-clients__box
    $('.nd-clients__box').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        variableWidth: true,
        dots: true,
        appendArrows: $('.nd-clients__arrows'),
        appendDots: $('.nd-clients__dots'),
        prevArrow: '<i class="fa fa-angle-left"></i>',
        nextArrow: '<i class="fa fa-angle-right"></i>',
        responsive: [
            {
              breakpoint: 760,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                variableWidth: false,
              }
            },
        ]
    });
    // nd-cusers__box
    $('.nd-cusers__box').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: true,
        appendArrows: $('.nd-cusers__arrows'),
        prevArrow: '<i class="fa fa-angle-left"></i>',
        nextArrow: '<i class="fa fa-angle-right"></i>',
        responsive: [
            {
              breakpoint: 760,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
              }
            },
        ]
    });
    // nd-cusers__box
    $('.nd-cert__box').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        variableWidth: true,
        appendArrows: $('.nd-cert__arrows'),
        prevArrow: '<i class="fa fa-angle-left"></i>',
        nextArrow: '<i class="fa fa-angle-right"></i>',
    });
    // nd-cusers__box
    $('.nd-main-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        appendDots: $('.nd-main__dots'),
        arrows: false,
    });
});