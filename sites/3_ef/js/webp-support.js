// webp if
function ThisIsWebP() {
    var def = $.Deferred(), crimg = new Image();
    crimg.onload = function () { def.resolve(); };
    crimg.onerror = function () { def.reject(); };
    crimg.src = "img/add-img1.webp";
    return def.promise();
}

ThisIsWebP().then(function () {
    //Есть поддержка webp
    $('body').addClass('webp-support');
}, function () {
    //Нет поддержки webp
    $('body').addClass('webp-missed');
});