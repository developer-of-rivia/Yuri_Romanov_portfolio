$(window).ready(function() {
	/* New code for bootstrap based chunks */
	$('.cfcity_list a').on('click', function(e) {
		if ( cityFields.cityInDomain ) return true;
		var value = $(this).data('city');
		$.ajax({
			type: 'POST',
			url: cityFields.actionUrl,
			dataType: 'json',
			data: {
				action: 'city/select',
				city: value
			},
			success: function(response) {
				if ( response.success ) location.reload();
			}
		});
		e.preventDefault();
		return false;
	});
	if ( document.cookie.search('cfFirst=') < 0 ) {
		$('.cfcity_first').fadeIn('fast');
	}
	$('.cfcity [data-toggle="modal"], .cfcity_first [data-toggle="modal"], .cfcity_first [data-dismiss="cfcity"]').on('click', function(e) {
		$('.cfcity_first').fadeOut('fast', function() {
			$(this).remove();
		});
		var date = new Date(new Date().getTime()+94608000*1000);
		var host = cityFields.cityInDomain ? cityFields.mainHost : location.hostname.replace(/^www\./, '');
		document.cookie = 'cfFirst=1; path=/; domain=.'+host+'; expires='+date.toUTCString();
		if ( $(this).data('toggle') == 'modal' && $($(this).data('target')).length > 0 ) {
			$($(this).data('target')).modal('show');
		}
		e.preventDefault();
		return false;
	});
	var cfAjaxSearchRequest = null;
	$('#cfCitySearch').on('keyup', function() {
	    if ( this.value.length < 2 ) return false;
		if ( cfAjaxSearchRequest !== null ) {
			cfAjaxSearchRequest.abort();
			cfAjaxSearchRequest = null;
		}
		cfAjaxSearchRequest = $.ajax({
			type: 'POST',
			url: cityFields.actionUrl,
			dataType: 'json',
			data: {
				action: 'city/search',
				query: this.value
			},
			success: function(response) {
				$('#cfCityError').hide();
				if ( response.length > 0 ) {
					var tmp = $('.cfcity_list a').first().parent().clone().show();
					$('.cfcity_list a').parent().remove();
					$.each(response, function(i ,val) {
						var tmp2 = tmp.clone();
						tmp2.find('a').attr('href', val.link);
						tmp2.find('a').data('city', val.id);
						tmp2.find('a').text(val.name);
						$('.cfcity_list').append(tmp2);
					});
				} else {
					$('.cfcity_list a').parent().hide();
					$('#cfCityError').show();
				}
			}
		});
		return true;
	});

	/* Old code for old chunks */
	$('.cfcity').on('change', function(e) {
		if ( $(this.options[this.selectedIndex]).data('href') ) {
			location.href = $(this.options[this.selectedIndex]).data('href');
			e.preventDefault();
			return false;
		}
		var value = (this.value || this.options[this.selectedIndex].value);
		$.ajax({
			type: 'POST',
			url: cityFields.actionUrl,
			dataType: 'json',
			data: {
				action: 'city/select',
				city: value
			},
			success: function(response) {
				if ( response.success ) location.reload();
			}
		});
		e.preventDefault();
		return false;
	});
});
