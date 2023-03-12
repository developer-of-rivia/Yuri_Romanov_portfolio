$(document).ready(function () {
// pick section
    let pickSpan = '';
    $('.pick__exp').on('click', function () {
        $('.pick__box-more').toggleClass(' pick__box-more--open');
        pickSpan = $(this).children('span');
        if (pickSpan.text() == 'Расширенный поиск') {
            $(pickSpan).text('Простой поиск');
            $(pickSpan).next().css('transform', 'rotate(180deg)');
        } else {
            $(pickSpan).text('Расширенный поиск');
            $(pickSpan).next().css('transform', 'rotate(0deg)');
        }
    });
    $('.select-content__pickall').on('click', function () {
        if ($(this).hasClass('pickall-true')) {
            $(this).removeClass('pickall-true');
            $(this).closest('.select-content__top').siblings('.select-content__list').children('.select-content__col').children('.checkbox').children('input').prop('checked', false);
            $(this).text('выбрать всё');
        } else {
            $(this).addClass('pickall-true');
            $(this).closest('.select-content__top').siblings('.select-content__list').children('.select-content__col').children('.checkbox').children('input').prop('checked', true);
            $(this).text('снять всё');
        }
    });

    $('.select__count').on('click', function () {
        $(this).children('.select__head').addClass('select__head2');
        $(this).children('.select__head').children('.manuf--result').html($(this).find('.select-content_item input:checkbox:checked').length + ' выбрано');
    })
    /* */
    $('.select__head span').addClass('manuf--result');
    $('.manuf--result').bind("DOMSubtreeModified", function () {
        if ($(this).html() == '0 выбрано' || $(this).html() == 'Не важно') {
            $(this).closest('.select__head').removeClass('select__head2');
            $(this).html('Не важно');
        }
        if ($(this).html() == '1 выбрано') {
            $(this).html(($(this).closest('.select__head').siblings('.select__box').find('.checkbox').children('input:checked').siblings('.checkbox__content').text()));
        }
    });

    $('.pick__spoiler-body').show();
});