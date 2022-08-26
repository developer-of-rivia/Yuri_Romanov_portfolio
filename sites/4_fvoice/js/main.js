$(document).ready(function () {
  $(window).scroll(function () {
    var st = $(this).scrollTop();
    $('.main-head').css({
      "transform": "translate(0%, " + st / 20 + "%"
    });
  });
  $('.menu-link').on('click', function () {
    $('.menu-box').toggleClass(' menu-open');
  });
  $('.menu-top_close').on('click', function () {
    $('.menu-box').toggleClass('menu-open');
  });
  function slowScroll(id) {
    var offset = 0;
    $('html, body').animate({
      scrollTop: $(id).offset().top - offset
    }, 1000);
    return false;
  }
  $('.menu-pars li a').on('click', function () {
    $('.menu-box').toggleClass(' menu-open')
  });
  $('.popup-link').magnificPopup();
  $(".mask-phone").mask("+7 (999) 999 99-99");

  $(document).on('af_complete', function (event, response) {
    var form = response.form;
    if (form.attr('id') == 'popup-wrapper' || form.attr('id') == 'popup-wrapper2' || form.attr('id') == 'flat-form') {
      window.location.href = "/uspeshnaya-otpravka.html"
    }
  });
});