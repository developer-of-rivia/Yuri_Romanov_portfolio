$(document).ready(function () {
    // скрипт для инпута +-
    const counter = function () {
        const btns = document.querySelectorAll('.counter__btn');
        btns.forEach(btn => {

            btn.addEventListener('click', function () {
                const direction = this.dataset.direction;
                const inp = this.parentElement.querySelector('.counter__value');
                const currentValue = +inp.value;
                let newValue;

                if (direction === 'plus') {
                    newValue = currentValue + 1;
                } else {
                    newValue = currentValue - 1 > 0 ? currentValue - 1 : 0;
                }
                inp.value = newValue;

            })
        })
    }
    counter();


    let counterInput = document.querySelectorAll('.counter__value');
    for (let i = 0; i < counterInput.length; i++) {
        counterInput[i].addEventListener('keyup', function () {
            this.value = this.value.replace(/[^\d]/g, () => {
                return '';
            });
            //this.value = this.value.replace(/^0/, () => { $(this).next().text('0 не может быть вначале'); return '' });
        });
    }
    // скрипт для чекбокса
    $('.bfrom__checkbox-error').hide();
    $('.checkbox input').on('change', function () {
        if (this.checked == false) {
            $('.bform__btn').prop('disabled', true);
            $('.bfrom__checkbox-error').show();
        } else {
            $('.bform__btn').prop('disabled', false);
            $('.bfrom__checkbox-error').hide();
        }
    });
    // маска для телефона
    [].forEach.call(document.querySelectorAll('.telmask'), function (input) {
        var keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            var pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            var matrix = "+7 (___) ___ __-__",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type == "blur" && this.value.length < 5) this.value = "";
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false)
    });
    // валидация формы
    jQuery.validator.addMethod("checkMask", function(value, element) {
        return /\+\d{1}\(\d{3}\)\d{3}-\d{4}/g.test(value); 
    });
    
    $('form').validate({
      rules: {
        ph: {
          checkMask: false
        },
      },
    });
});