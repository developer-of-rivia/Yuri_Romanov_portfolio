$(document).ready(function () {
    // unwrap menu__right
    if ($(window).width() < 575) {
        $('.menu__icon').unwrap();
    }
    // magnificPopup
    $('.popup-link').magnificPopup();
    // burger-menu
    $('.menu__burger').on('click', function () {
        $('.nav').toggleClass(' nav--open');
        $('html').addClass('overflow-none');
    });
    $('.nav__close').on('click', function () {
        $('.nav').toggleClass(' nav--open');
        $('html').removeClass('overflow-none');
    });
    // select
    let currentValue = '';
    $('.select__head').on('click', function () {
        $('.select__head').not($(this)).removeClass(' select__head--active');
        $('.select__box').not($(this).next()).removeClass(' select__box--active');
        $(this).next().toggleClass(' select__box--active');
        $(this).toggleClass(' select__head--active');
    })
    $('.select__item').on('click', function () {
        currentValue = $(this).children('span').text();
        $(this).closest('.select__box').siblings('.select__head').addClass('select__head2');
        $(this).closest('.select__box').children('.select__item').removeClass('select__item--curent')
        $(this).toggleClass('select__item--curent');
        $(this).closest('.select__box').siblings('.select__head').toggleClass('select__head--active');
        $(this).closest('.select__box').siblings('.select__head').children('span').html(currentValue);
        $(this).closest('.select__box').toggleClass(' select__box--active');
        $(this).closest('.select__box').siblings('.select__input').children('input').attr('value', currentValue);
    });
    jQuery(function ($) {
        $(document).mouseup(function (e) { // событие клика по веб-документу
            var div = $(".select"); // тут указываем ID элемента
            if (!div.is(e.target) // если клик был не по нашему блоку
                && div.has(e.target).length === 0) { // и не по его дочерним элементам
                $('.select').find('.select__box').removeClass('select__box--active');
                $('.select').find('.select__head').removeClass('select__head--active');
            }
        });
    });
    // выпадающее меню
    $('.nav__parent').on('click', function () {
        $('.nav__parent').not(this).removeClass('nav__list--open');
        $(this).toggleClass(' nav__list--open');
    });
    jQuery(function ($) {
        $(document).mouseup(function (e) { // событие клика по веб-документу
            var div = $(".nav__parent"); // тут указываем ID элемента
            if (!div.is(e.target) // если клик был не по нашему блоку
                && div.has(e.target).length === 0) { // и не по его дочерним элементам
                $('.nav__parent').removeClass('nav__list--open');
            }
        });
    });
});