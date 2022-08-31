$(document).ready(function(){

    $('.order-form').submit(function(e) {
    	e.preventDefault();
    	let form = $('.order-form')[0]; 
        let fd = new FormData(form);  
        $.ajax({
            url:'/ajax',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data){
                window.location.href = '/my-bid';
            }
        });
    });   
    
    $('.contact-form').submit(function(e) {
    	e.preventDefault();
    	var form_data = $(this).serialize();
    	$.ajax({
    		url: '/ajax',
    		data: form_data,
    		type: "POST",
    		success: function(){
    			$('.success-link').click();
    		}
    	});
    });

    
    $('.login-form').submit(function(e) {
	    e.preventDefault();
	    let form_data = $(this).serialize();
	    console.log(form_data);
    	$.ajax({
    		url: '/ajax',
    		data: form_data,
    		type: "POST",
    		success: function(data){
    		    let loginResult = jQuery.parseJSON(data);
    		    if(loginResult.code == -1){
    		        $('.login-form__error').html(loginResult.message);
    		    }else if(loginResult.code == 0){
    		        location.reload();
    		    }
    			
    		}
    	});
    });
    
    $(document).on('click','.logout',function(e) {
        e.preventDefault();
        let pst = {};
        pst.action = 'webLogout';
        
        $.post('/ajax', pst, function(data){
            console.log(data);
	        let loginResult = jQuery.parseJSON(data);
	        if(loginResult.code == 0){
	            location.reload();
	        }
        });
    });

    $(document).on('click','.loc-search_box a',function(e) {
        e.preventDefault();
        $.cookie('city', $(this).data('id'),{ expires: 30, path: '/' });
        location.reload();
    });
    
    $(document).on('click','.open-file-form',function(e) {
        e.preventDefault();
        $('.docs-input').last().click();
    });
    
    $(document).on('change','[name="work_type"]',function(e) {
        e.preventDefault();
        var currentType = $(this).val();
        $('.order-field-work').each(function(){
	       getCurrentFields(currentType,$(this));
        });
        $('.order-column-work').each(function(){
	       getCurrentFields(currentType,$(this));
        });
    });
    
    if($('.worktype-block').length){
        $('.worktype-block input[data-type="'+$('.worktype-block').data('worktype')+'"]').click();
    }
    
    $('.select-placeholder').each(function(){
	    $(this).find('option[value="'+$(this).data('selected')+'"]').attr('selected', 'true');
    });
    
    function getCurrentFields(currentType,currentBlock){
        let currentTypes = currentBlock.data('type');
        let a_currentTypes = currentTypes.split(',');
        if(a_currentTypes.includes(currentType)){
            currentBlock.addClass('active');
            if(currentBlock.hasClass('order-field-work-')){
                currentBlock.find('input').addClass('required');
                currentBlock.find('select').addClass('required');
            }
        }else{
            currentBlock.removeClass('active');
            if(currentBlock.hasClass('order-field-work')){
                currentBlock.find('input').removeClass('required');
                currentBlock.find('select').removeClass('required');
            }
        }
    }
    
    $.fn.setCursorPosition = function(pos) {
        if ($(this).get(0).setSelectionRange) {
          $(this).get(0).setSelectionRange(pos, pos);
        } else if ($(this).get(0).createTextRange) {
          var range = $(this).get(0).createTextRange();
          range.collapse(true);
          range.moveEnd('character', pos);
          range.moveStart('character', pos);
          range.select();
        }
    };
    $('.phone').click(function(){
        $(this).setCursorPosition(4);  // set position number
    });
    
    
    $('.phone').mask("+7 (999) 999-99-99",{
        /*autoclear: false, 
        'placeholder': '',*/
        completed:function(){
            $('.phone-confirm').addClass('active active_phone'); 
            let pstCheckPhone = {};
            pstCheckPhone.action = 'checkPhone';
            pstCheckPhone.phone = $('.phone').val().replace(/[^\d]/g, '');
            $.post('/ajax', pstCheckPhone, function(data){
               let result = $.parseJSON(data);
    	       if(result.resp == 202){
    	           controlConfirmPhoneBlock('active active_success','active_code active_phone active_error active_timer','Подтвержденный телефон','','',0);
    	           $('[name="phone"]').addClass('valid-phone');
    	       }else if(result.resp == 201 && result.time === 0){
    	           controlConfirmPhoneBlock('active active_phone active_error','active_code active_success active_timer','','Необходимо подтвердить телефон','','',0);
    	       }else if(result.resp == 201 && result.time !== 0){
    	           controlConfirmPhoneBlock('active active_timer active_error active_code','active_phone  active_success','','Необходимо подтвердить телефон','Отправить код повторно<br>можно будет через <span>'+result.time+'</span> сек.',result.time);
    	       }
            });
        }
    });
    

    $(document).on('click','.phone-confirm__btn',function(e) {
        e.preventDefault();
        let pstSavePhone = {};
        pstSavePhone.action = 'savePhone';
        pstSavePhone.phone = $('.phone').val().replace(/[^\d]/g, '');
        $.post('/ajax', pstSavePhone, function(data){
            let result = $.parseJSON(data);
	        if(result.resp == 202){
	            controlConfirmPhoneBlock('active active_success','active_timer active_phone active_code active_error','Подтвержденный телефон','','',0);
	        }else{
	            controlConfirmPhoneBlock('active active_timer active_error active_code','active_success active_phone','','Необходимо подтвердить телефон','Отправить код повторно<br>можно будет через <span>'+result.time+'</span> сек.',60);
	        }
        });
    });
    
    $(document).on('click','.phone-confirm__repeatcode',function(e) {
        e.preventDefault();
        $('[name="phone-code"]').val('');
        $('.phone-confirm__btn').click();
    });
    
    
    $(document).on('keyup','.phone',function() {
        let currentPhoneLength = $(this).val().replace(/[^\d]/g, '').length;
        if(currentPhoneLength < 11){
            controlConfirmPhoneBlock('','active active_phone active_code active_success active_error','','','',0);
        }
    });
    
    $(document).on('keyup','[name="phone-code"]',function() {
        let currentCode = $(this).val();
        if(currentCode.length > 4){
            $(this).val(currentCode.substr(0, 4));
        }
        if(currentCode.length == 4){
            let pstConfirmPhone = {};
            pstConfirmPhone.action = 'confirmPhone';
            pstConfirmPhone.phone = $('.phone').val().replace(/[^\d]/g, '');
            pstConfirmPhone.code = $(this).val();
            $.post('/ajax', pstConfirmPhone, function(data){
                let result = $.parseJSON(data);
                if(result.resp == '200'){
                    controlConfirmPhoneBlock('active active_success','active_phone active_code active_error active_timer','Телефон успешно подтвержден!','','',0);
                    $('[name="phone"]').addClass('valid-phone');
                }else if(result.resp == '503'){
                    controlConfirmPhoneBlock('active active_error active_timer active_code','active_phone  active_success','','Неверный код','Отправить код повторно<br>можно будет через <span>'+result.time+'</span> сек.',0);
                }else if(result.resp == '504'){
                    controlConfirmPhoneBlock('active active_error active_timer','active_phone active_code active_success','','Вы исчерпали лимит на ввод кода, отправьте sms еще раз','Отправить код повторно<br>можно будет через <span>'+result.time+'</span> сек.',0);
                }else if(result.resp == '505'){
                    сontrolConfirmPhoneBlock('active active_error','active_phone active_code active_success active_timer','','Телефон не найден. Введите телефона еще раз','',0);
                }
            });
        }
    });
    
    
    function controlConfirmPhoneBlock(onClass,offClass,successText,errorText,timeText,timeVal){
        $('.phone-confirm__text_success').html(successText);
        $('.phone-confirm__text_error').html(errorText);
        $('.phone-confirm__time').html(timeText);
        $('.phone-confirm').removeClass(offClass);
        $('.phone-confirm').addClass(onClass);
        if(timeVal > 0){
            let timer; 
            let x = timeVal; 
            countdown(); 
            function countdown(){  
              $('.phone-confirm__time span').html(x);
              x--; 
              if (x<0){
                clearTimeout(timer); 
                $('.phone-confirm__time').html('<a href="#" class="phone-confirm__repeatcode">Отправить код еще раз</a>');
              }
              else {
                timer = setTimeout(countdown, 1000);
              }
            }
        }
    }
    
    /*$('[name="pasport_number"]').mask('9999-999999');*/
    /*$('[name="pasport_issued_date"]').mask('99.99.9999');*/
    /*$('[name="pasport_depcode"]').mask('999-999');*/
    $('[name="snils"]').mask('999-999-999 99');
    $('[name="dop_contact_phone"]').mask('+7 (999) 999-99-99');
    $('[name="employer_phone"]').mask('+7 (999) 999-99-99');
    /*$('[name="phone"]').mask('+7 (999) 999-99-99');*/

    
    $(document).on('click','.sort-direction-btn ',function(e) {
        e.preventDefault();
        $(this).toggleClass('sort-direction-btn_ascending');
        getBid();
    });
    $(document).on('change','.acc-sort_select select',function(e) {
        getBid();
    });
    $(document).on('click','.acc-filter_btn button',function(e) {
        e.preventDefault();
        $('.acc-filter_wrapper ').removeClass('acc-filter--open');
        if($(this).hasClass('acc-filter_btn__reset')){
            $('.acc-filter_wrapper select').val(0);
        }
        getBid();
    });
    
    
    var oldStatus;
    $(document).on('focus','.bid-status,.bid-agent-status',function(e) {
        oldStatus = $(this).val();
    });
    $(document).on('change','.bid-status',function(e) {
        setStatus($(this),'status','bid-status-wrapper_');
    });
    
    $(document).on('change','.bid-agent-status',function(e) {
        setStatus($(this),'agent_status','bid-agent-status-wrapper_');
    });
    
    function setStatus(block,row,wrap){
        let pst = {};
        let statusWrap = block.parent();
        pst.action = 'saveStatus';
        pst.bid = block.parents('tr').data('bid');
        pst.email = block.parents('tr').data('email');
        pst.row = row;
        pst.bid_status = block.val();
        statusWrap.removeClass(wrap+oldStatus);
        statusWrap.addClass(wrap+pst.bid_status);
        $.post('/ajax', pst, function(data){
            block.blur();
        });
    }
    
    $(document).on('click','.del-bid',function(e) {
        e.preventDefault();
        let pst = {};
        var currentTr = $(this).parents('tr');
        pst.action = 'delBid';
        pst.bid = currentTr.data('bid');
        $.post('/ajax', pst, function(data){
            if(data == 200){
                currentTr.remove();
            }
        }); 
    });
    
    function getBid(){
        let pst = {};
        pst.action = 'getBid';
        if($('.sort-direction-btn_ascending').length){
            pst.sortdir = 'ASC';   
        }else{
            pst.sortdir = 'DESC';   
        }
        pst.sortParam = $('.acc-sort_select select').val();
        if($('.acc-filter_select_status select').val() !== 0){
            pst.filterStatus = $('.acc-filter_select_status select').val();
        }
        if($('.acc-filter_select_agent-status select').val() !== 0){
            pst.agentFilterStatus = $('.acc-filter_select_agent-status select').val();
        }
        $.post('/ajax', pst, function(data){
            $('.acc-content-row').remove();
	        $('.acc-head-row').after(data);
        });
    }
    
    if($('#calc input').length){
        $(document).on('#calc input',function(ev){
            calc();
        });
    }
    
    
    if($('.order-matches-reg').length && !$('.order-matches-reg input').prop('checked')){
        $('.address-constant-reg').addClass('active');
        $('.address-constant-reg input').addClass('required');
    }
    $(document).on('change','.order-matches-reg input',function(e) {
        if(!$(this).prop('checked')){
            $('.address-constant-reg').addClass('active');
            $('.address-constant-reg input').addClass('required');
        }else{
            $('.address-constant-reg').removeClass('active');
            $('.address-constant-reg input').removeClass('required');
        }
    });
    
    if($('#calc').length){
        var diagram = document.getElementById('calc-diagram');
        diagram.width = 186;
        diagram.height = 186;
        var ctx = diagram.getContext('2d');
        calc();

    }
    
    Date.prototype.daysInMonth = function() {
		return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
	};
    
    $(document).on('click','.calc-to-pdf',function(e) {
        e.preventDefault();
        let calcPst = {};
        calcPst.action = 'setCalcPdf';
        calcPst.type = $('[name="calc-type"]:checked').val();
        calcPst.sum = parseInt($('[name="calc-sum"]').val());
        calcPst.months = parseInt($('[name="calc-month"]').val());
        calcPst.rate = $('[name="calc-rate"]').val();
        calcPst.over = $('.calc-result-overpayment').html();
        calcPst.overpercent = $('.calc-result-percent').html();
        calcPst.total = $('.calc-result-total').html();
        calcPst.end = $('.calc-end-date').html();
        calcPst.pay = $('.calc-result-month-payment').html();
        let calcDate = new Date();
        calcPst.start = calcDate.toLocaleString('default', { day: '2-digit' })+'.'+calcDate.toLocaleString('default', { month: '2-digit' })+'.'+paymentDate.getFullYear();
        
        $.post('/ajax', calcPst, function(data){
        	window.open('http://s26586.h3.modhost.pro/files/'+data);
        });
    });
    
    function calc(){

        let calcType = $('[name="calc-type"]:checked').val();
        let calcSum = parseInt($('[name="calc-sum"]').val().replace(/,/g,''));

        let calcMonths = parseInt($('[name="calc-month"]').val());
        let calcRate = $('[name="calc-rate"]').val();
        let caltmonthRate = calcRate/12/100;
        
        //для дифференцированного
        let calcMonthPaymentMainDebt = calcSum/calcMonths;

         
        let calcMonthPayment = calcSum * (caltmonthRate * Math.pow((1 + caltmonthRate),calcMonths) ) / (Math.pow((1 + caltmonthRate),calcMonths) - 1);
        let calcTotal = calcMonthPayment*calcMonths;
        let calcOverpayment = calcTotal - calcSum;
        
        let calcLink = 'http://s26586.h3.modhost.pro?&sum='+calcSum+'&rate='+calcRate+'&month='+calcMonths+'&type='+calcType;
        $('#calc-link').val(calcLink);
        
        $('.calc-result-sum').html(parseInt(calcSum).toLocaleString('ru'));
        if(calcType == 3){
            $('.calc-result-overpayment').html(parseInt(calcOverpayment).toLocaleString('ru'));
            $('.calc-result-total').html(parseInt(calcTotal).toLocaleString('ru'));
            $('.calc-result-month-payment').html(parseInt(calcMonthPayment).toLocaleString('ru'));
            $('.calc-result-percent').html(((100*calcOverpayment)/(calcMonthPayment*calcMonths)).toLocaleString('ru'));
        }
        Date.prototype.daysInMonth = function() {
            return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
        };
        
        var now = new Date();
        now.setMonth(now.getMonth() + calcMonths);
        dateText = now.toLocaleString('default', { month: 'long' })+' '+now.getFullYear();
        $('.calc-end-date').html(dateText);
        $('.calc-payment-schedule tbody').html('');
        let maxPayment = 0;
        let minPayment = 100000000000000000000;
        let totalDif = 0;
        let annuSum = 0;
        for (let i = 1; i < calcMonths+1; i++) { 
            paymentDate = new Date();
            paymentDate.setMonth(now.getMonth() + i);
            isLeap = new Date(paymentDate.getFullYear(),1,29).getMonth();
            if(isLeap == 1){
                amountDays = 366;
            }else{
                amountDays = 365;
            }
            
            if(calcType == 3){
                
                //Остаток долга × Процентная ставка × Количество дней в месяце / Количество дней в году
                /*percentPayment = ((calcSum - annuSum)*(calcRate/100)*paymentDate.daysInMonth())/amountDays;*/
                
                percentPayment = (calcSum - annuSum)*(calcRate/100)/12;
                mainPaid = calcMonthPayment-percentPayment;

                annuSum += mainPaid;
                if(i != calcMonths){
                    tableRemainder = (calcSum - annuSum).toFixed(2).toLocaleString('ru');
                }else{
                    tableRemainder = 0;
                }
                
                $('.calc-payment-schedule tbody').append('<tr><td>'+paymentDate.toLocaleString('default', { day: '2-digit' })+'.'+paymentDate.toLocaleString('default', { month: '2-digit' })+'.'+paymentDate.getFullYear()+'</td><td>'+mainPaid.toFixed(2).toLocaleString('ru')+' + '+percentPayment.toFixed(2).toLocaleString('ru')+'</td><td>'+calcMonthPayment.toFixed(2).toLocaleString('ru')+'</td><td>'+tableRemainder+'</td></tr>');
                
            }else{
                
                monthPayment = (calcSum - (calcMonthPaymentMainDebt*(i-1)))*(calcRate/100)*paymentDate.daysInMonth()/amountDays;
                $('.calc-payment-schedule tbody').append('<tr><td>'+paymentDate.toLocaleString('default', { day: '2-digit' })+'.'+paymentDate.toLocaleString('default', { month: '2-digit' })+'.'+paymentDate.getFullYear()+'</td><td>'+parseInt(calcMonthPaymentMainDebt).toLocaleString('ru')+' + '+parseInt(monthPayment).toLocaleString('ru')+'</td><td>'+parseInt(monthPayment+calcMonthPaymentMainDebt).toLocaleString('ru')+'</td><td>'+parseInt((calcSum-(calcMonthPaymentMainDebt*i))).toLocaleString('ru')+'</td></tr>');
                if(maxPayment<parseInt(monthPayment+calcMonthPaymentMainDebt)){
                    maxPayment = parseInt(monthPayment+calcMonthPaymentMainDebt);
                }
                if(minPayment>parseInt(monthPayment+calcMonthPaymentMainDebt)){
                    minPayment = parseInt(monthPayment+calcMonthPaymentMainDebt);
                }
                totalDif += monthPayment+calcMonthPaymentMainDebt;
            }
        }
        
        if(calcType == 4){
            $('.calc-result-month-payment').html(parseInt(maxPayment).toLocaleString('ru')+' - '+parseInt(minPayment).toLocaleString('ru'));
            $('.calc-result-overpayment').html(parseInt(totalDif - calcSum).toLocaleString('ru'));
            $('.calc-result-total').html(parseInt(totalDif).toLocaleString('ru'));
            $('.calc-result-percent').html(((100*(totalDif - calcSum))/(totalDif)).toLocaleString('ru'));
        }
        
        ctx.clearRect(0,0,120,120);
        function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
            
            ctx.fillStyle = color;
        	ctx.beginPath();
        	ctx.moveTo(centerX,centerY);
        	ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        	ctx.closePath();
        	ctx.fill();
        }
        if(calcType == 3){
            drawPieSlice(ctx, 93, 93, 93, 0, 2 * Math.PI * calcSum / calcTotal, '#65BB56');
            drawPieSlice(ctx, 93, 93, 93, 2 * Math.PI * calcSum / calcTotal, (2 * Math.PI * calcSum / calcTotal) + (2 * Math.PI * calcOverpayment / calcTotal), '#8F42E5'); 
        }else{
            drawPieSlice(ctx, 93, 93, 93, 0, 2 * Math.PI * calcSum / totalDif, '#65BB56');
            drawPieSlice(ctx, 93, 93, 93, 2 * Math.PI * calcSum / totalDif, (2 * Math.PI * calcSum / totalDif) + (2 * Math.PI * (totalDif - calcSum) / totalDif), '#8F42E5'); 
        }
        
    }
    
    $('.val-calc-link').val('');
   
    $(document).on('click','.copy-calc-link',function(e) {
        e.preventDefault();
        var copyText = document.getElementById('calc-link');
        /* Select the text field */
        copyText.select();
        /* Copy the text inside the text field */
        document.execCommand("copy");
        /* Alert the copied text */
        console.log(copyText.value);
    });
    
    
    
        
    $(document).on('click','.order-continue',function() {
        let currentTab = $(this).parents('.tab');
        let currentTabNum = currentTab.data('tab');
        let currentDirection = $(this).data('direction');
        let nextTabNum = currentTabNum + currentDirection;
        let valid = validateForm(currentTab);

        if(!valid && $(this).data('direction') == 1){
            return false;
        }

        $('.order-tab').removeClass('active');
        $('.tab').removeClass('active');
        $('.order-tab[data-tab="'+nextTabNum+'"]').addClass('active');
        $('.tab[data-tab="'+nextTabNum+'"]').addClass('active');
        if(nextTabNum > currentTabNum){
            $('.order-tab[data-tab="'+currentTabNum+'"]').addClass('finish');
        }else{
            $('.order-tab[data-tab="'+currentTabNum+'"]').removeClass('finish');
        }
        
    	let destination = $('#regForm').offset().top - 20;
    	$("html:not(:animated),body:not(:animated)").animate({
    		scrollTop: destination
    	}, 300);
        });
    
    $(document).on('focusout','#regForm input',function(e) {
        let currentVal = $(this).val();
        let currentParent =  $(this).parents('.order-field');
        let currentName = $(this).attr('name');
        if(currentName == 'sum'){
            if(currentVal == ''){
                currentParent.addClass('error');
                currentParent.removeClass('success');
                $(this).addClass('invalid');
            }else{
                currentParent.removeClass('error');
                currentParent.addClass('success');
                $(this).removeClass('invalid');
            }
        }
        if(currentName == 'email'){
            if(validateEmail($(this).val())){
                $(this).removeClass('invalid');
	            inputParent.removeClass('error');
            }else{
                valid = false;
	            $(this).addClass('invalid');
	            if($(this).parent().hasClass('order-accept')){
	                $(this).parent().addClass('invalid');
	            }
	            inputParent.addClass('error');
            }
        }
    });
    
    $(document).on('change','#regForm select',function(e) {
        let currentVal = $(this).val();
        let currentParent =  $(this).parents('.order-field');
        let currentName = $(this).attr('name');
        console.log(currentParent);
        if(currentName == 'credit_purpose' || currentName == 'credit_term'){
            if(currentVal == ''){
                currentParent.addClass('error');
                currentParent.removeClass('success');
                $(this).addClass('invalid');
            }else{
                currentParent.removeClass('error');
                currentParent.addClass('success');
                $(this).removeClass('invalid');
            }
        }
    });
    
    $(document).on('click','.order-clean input',function(e) {
        $('.order-field').removeClass('success');
    });
    
    /*$(document).on('keyup','#regForm input',function(e) {
        let now = new Date();
        let day = now.getDate()
        let month = now.getMonth();
        let year = now.getFullYear();
        console.log(day,month,year);
        let a_val =  new Array();
        if($(this).attr('name') == 'pasport_issued_date'){
            a_val = $(this).val().split('.');
            if(a_val[0] > 31){
                
            }
            
            console.log(a_val[0]);
        }
    });*/

    
    function validateForm(tab){
        let valid = true;
        tab.find('.required').each(function(){
            let inputParent = $(this).parent();
            if(($(this).val() === '' && !$(this).hasClass('chekbox')) || (!$(this).prop('checked') && $(this).hasClass('chekbox')) || ($(this).val() === null && $(this).hasClass('sel') ) ){
	            valid = false;
	            $(this).addClass('invalid');
	            if($(this).parent().hasClass('order-accept')){
	                $(this).parent().addClass('invalid');
	            }
	            inputParent.addClass('error');
	        }else{
	            $(this).removeClass('invalid');
	            if($(this).parent().hasClass('order-accept')){
	                $(this).parent().removeClass('invalid');
	            }
	            inputParent.removeClass('error');
	        }
	        if($(this).attr('type') == 'email'){
	            if(validateEmail($(this).val())){
	                $(this).removeClass('invalid');
    	            if($(this).parent().hasClass('order-accept')){
    	                $(this).parent().removeClass('invalid');
    	            }
    	            inputParent.removeClass('error');
	            }else{
	                valid = false;
    	            $(this).addClass('invalid');
    	            if($(this).parent().hasClass('order-accept')){
    	                $(this).parent().addClass('invalid');
    	            }
    	            inputParent.addClass('error');
	            }
	        }
        });
        if(!$('[name="phone"]').hasClass('valid-phone')){
            valid = false;
        }

        fileRequired = true;
        if(tab.find('.file-required').length > 0){
            fileRequired = false;
        }
        tab.find('.file-required').each(function(){
            if($(this).val()!==''){
                fileRequired = true;
            }
        });
        
        if(!fileRequired){
            $('.open-file-form').addClass('invalid');
            valid = false;
        }else{
            $('.open-file-form').removeClass('invalid');
        }
        
        return valid;
    };
    
    function validateEmail(email) {
        var pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern .test(email);
    }
    

	if($('.bid-wrapper').length){
	    $('.bid-wrapper input').attr('readonly',true);
	    $('.bid-wrapper textarea').attr('readonly',true);
	    $('.bid-wrapper select').attr('disabled',true);
	}
	$(document).on('click','.save-bid-btn',function(e) {
        e.preventDefault();
        let form_data = $('.bid-params-form').serialize();
        $.post('/ajax', form_data, function(data){
	       console.log(data);
        });
    });
	$(document).on('click','.bid-title_edit a',function(e) {
        e.preventDefault();
        $('.bid-title_edit a').toggleClass('hidden');
        $('.bid-wrapper').toggleClass('editing');
        if($('.bid-wrapper').hasClass('editing')){
            $('.bid-wrapper input').attr('readonly',false);
            $('.bid-wrapper textarea').attr('readonly',false);
            $('.bid-wrapper select').attr('disabled',false);
        }else{
            $('.bid-wrapper input').attr('readonly',true);
            $('.bid-wrapper textarea').attr('readonly',true);
            $('.bid-wrapper select').attr('disabled',true);
        }
    });

    $('.seniority-block div').each(function(){
	    let currentNum = $(this).find('input').val();
	    $(this).find('span').html(declOfNum(currentNum, $(this).data('time').split(',')));
    });


    $(document).on('blur','.seniority-block input',function(e) {
        let currentNum = $(this).val();
	    $(this).next('span').html(declOfNum(currentNum, $(this).data('time').split(',')));
    });
    
    function declOfNum(n, text_forms) {  
        n = Math.abs(n) % 100; 
        var n1 = n % 10;
        if (n > 10 && n < 20) { return text_forms[2]; }
        if (n1 > 1 && n1 < 5) { return text_forms[1]; }
        if (n1 == 1) { return text_forms[0]; }
        return text_forms[2];
    }
    
    $(document).on('click','.get-pdf',function(e) {
        e.preventDefault();
        $('.bid-wrapper select').attr('disabled',false);
        let form_data = $('.bid-params-form').serialize();
        let bid = $(this).data('bid');
        form_data = form_data.replace('saveBid', 'getPdf');
       
        $.post('/ajax', form_data, function(data){
            $('.bid-wrapper select').attr('disabled',true);
            $('.download-pdf').show();
            $('.download-xls').show();
            $('.banks-email').show();
        });
    });
    
    $(document).on('click','.banks-email__btn',function(e) {
        e.preventDefault();
        let pst = {};
        pst.emails = [];
        pst.bid = $(this).data('bid');
        pst.action = 'sendToBanks';
        $('.banks-email__item input:checked').each(function(){
            pst.emails.push($(this).parent().data('email'));
        });
        /*success-message-banks*/
        $.post('/ajax', pst, function(data){
            $.magnificPopup.open({
              items: {
                src: '#success-popup-banks', // can be a HTML string, jQuery object, or CSS selector
                type: 'inline'
              }
            });
        });
    });
    
    $(document).on('keyup','[name="changecity"]',function() {
        let currentVal = $(this).val().toLowerCase();
        $('.cities-list li').each(function(){
	        let currentCity = $(this).data('city').toLowerCase();
	        if(currentCity.indexOf(currentVal) == '-1'){
	            $(this).addClass('hide-city');
	        }else{
	            $(this).removeClass('hide-city');
	        }
        });
    });
    
    $(document).on('keyup','#regForm [name="sum"]',function(e) {
        let currentVal = $(this).val();
        $(this).val(currentVal.replace(/[^\d]/g, '').replace(/\B(?=(?:\d{3})+(?!\d))/g, '.'));
        //$(this).val(currentVal.toLocaleString('ru'));
    });
    
    /*var n = '5000000';
    n = n.replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');
    n = n.replace(/\s/g, '')*/

    if($('[name="objectaddress"]').length){
        /*var $container = $(document.getElementById('one_string'));
        var $address = $container.find('[name="objectaddress"]');
        $address.fias({
            oneString: true,
        });*/
        
        /*var $containerCity = $(document.getElementById('type_code'));
        var $city = $containerCity.find('[name="city"]');
        $city.fias({
            type: $.fias.type.city,
        });*/
        
        /*var $cityBirthPlace = $('[name="birth_place"]');
        $cityBirthPlace.fias({
            type: $.fias.type.city,
        });*/

    }
    
    if($('#name').length){
        var token = '3592c46d2d444ec84b0419e67f8b1abdd87c06e9';
        $("#name").suggestions({
          token: token,
          type: "NAME",
          params: {
            parts: ["NAME"]
          },
          onSelect: function(suggestion) {
            checkDadataInput($(this),1,0)
          },
          onSelectNothing: function(suggestion) {
            checkDadataInput($(this),2,0)
          }
        });
        $("#surname").suggestions({
          token: token,
          type: "NAME",
          params: {
            parts: ["SURNAME"]
          },
          onSelect: function(suggestion) {
            checkDadataInput($(this),1,0)
          },
          onSelectNothing: function(suggestion) {
            checkDadataInput($(this),2,0)
          }
        });
        $("#patronymic").suggestions({
          token: token,
          type: "NAME",
          params: {
            parts: ["PATRONYMIC"]
          },
          onSelect: function(suggestion) {
            checkDadataInput($(this),1,0)
          },
          onSelectNothing: function(suggestion) {
            checkDadataInput($(this),2,0)
          }
        });
        
        $('[name="objectaddress"]').suggestions({
            token: token,
            type: "ADDRESS",
            onSelect: function(suggestion) {
                checkDadataInput($(this),1,1)
            },
            onSelectNothing: function(suggestion) {
                checkDadataInput($(this),2,2)
            }
        });
        
        $('[name="address_reg"],[name="address_residence"]').suggestions({
            token: token,
            type: "ADDRESS",
            onSelect: function(suggestion) {
                checkDadataInput($(this),1,0)
            },
            onSelectNothing: function(suggestion) {
                checkDadataInput($(this),2,0)
            }
        });
        

        $('[name="city"]').suggestions({
            token: token,
            type: "ADDRESS",
            bounds: "city",
              onSelect: function(suggestion) {
                checkDadataInput($(this),1,0)
              },
              onSelectNothing: function(suggestion) {
                checkDadataInput($(this),2,0)
              }
        });
        
        $('[name="birth_place"]').suggestions({
            token: token,
            type: "ADDRESS",
            bounds: "city",
              onSelect: function(suggestion) {
                checkDadataInput($(this),1,0)
              },
              onSelectNothing: function(suggestion) {
                checkDadataInput($(this),2,0)
              }
        });
        
        $('[name="org_inn"],[name="org_name"],[name="employer_address"]').suggestions({
            token: token,
            type: "PARTY",
            onSelect: function(suggestion) {
                $('[name="org_inn"]').val(suggestion.data.inn);
                $('[name="org_name"]').val(suggestion.data.name.full);
                $('[name="employer_address"]').val(suggestion.data.address.value);
            }
        });

        function formatResult(value, currentValue, suggestion) {
            suggestion.value = suggestion.data.code;
            return suggestion.data.code + " — " + suggestion.data.name;
        }
        
        function showSuggestion(suggestion) {
            $('[name="pasport_issued_by"]').val(suggestion.data.name);
            $('[name="pasport_depcode"]').val(suggestion.data.code);
            $(this).parents('.order-field').addClass('success');
            $(this).parents('.order-field').removeClass('error');
        }
        function clearSuggestion() {
            $('[name="pasport_issued_by"]').val('');
            $('[name="pasport_depcode"]').val('');
            $(this).parents('.order-field').removeClass('success');
            $(this).parents('.order-field').addClass('error');
        }
        
        $('[name="pasport_issued_by"]').suggestions({
            token: token,
            type: "fms_unit",
            formatResult: formatResult,
            onSelect: showSuggestion,
            onSelectNothing: clearSuggestion
        });
        
        /*$('[name="pasport_depcode"]').suggestions({
          token: '3592c46d2d444ec84b0419e67f8b1abdd87c06e9',
          type: "fms_unit",
          onSelect: showDepcode
        });*/
        
        /*function showDepcode(value, currentValue, suggestion) {
          return suggestion.data.code;
        }
        
        function showSuggestion(suggestion) {
          $('[name="pasport_depcode"]').val(suggestion.data.code);
        }*/

    }
    
    /*$(document).on('click','[name="pasport_number"],[name="pasport_issued_date"],[name="pasport_depcode"]',function(e) {
    	$(this).setCursorPosition(0); 
    
    }); */
    $(document).on('click','#cookie__close',function(e) {
    	$(this).parents('.cookie-notice').hide();
    	$.cookie('notice', 1,{ expires: 1130, path: '/' });
    }); 
    
    $('[name="pasport_number"]').inputmask('9999-999999',{ "oncomplete": function(){ checkDadataInput($(this),1,0) },"onincomplete": function(){ checkDadataInput($(this),2,0) }});
    
    $('[name="birth"]').inputmask({ 
        "oncomplete": function(){ 
            let a_birth = $(this).val().split('.');
            let birth = new Date(+a_birth[2], a_birth[1] - 1, +a_birth[0]);
            let errorText = '';
            let birthValid = true;
            let age = get_current_age(birth);
            if(age < 18){
                checkDadataInput($(this),2,0);
                errorText = 'Вам должно быть больше 18 лет';
                birthValid = false;
            }else if(age > 75){
                checkDadataInput($(this),2,0);
                errorText = 'Вам должно быть не более 75 лет';
                birthValid = false;
            } else{
                errorText = 'Укажите дату рождения';
            }
            
            if(birthValid){
                checkDadataInput($(this),1,0);
            }else{
                checkDadataInput($(this),2,0);
            }
            $(this).next().html(errorText);
        },
        "onincomplete": function(){ 
            checkDadataInput($(this),2,0);
    }});
    
    let o_errorText = {};
    o_errorText.pasport_issued_date = ['Укажите корректную дату','Дата выдачи паспорта не может быть больше текущей','Укажите дату выдачи паспорта'];
    o_errorText.address_datreg = ['Укажите корректную дату','Дата регистрации не может быть больше текущей','Укажите дату регистрации'];
    o_errorText.pension_date = ['Укажите корректную дату','Дата выдачи пенсионного удостоверения не может быть больше текущей','Укажите дату выдачи пенсионного удостоверения'];
    

    $('[name="pasport_issued_date"], [name="address_datreg"], [name="pension_date"]').inputmask({ 
        "oncomplete": function(){ 
            let currentName = $(this).attr('name');
            let a_pasportDate = $(this).val().split('.');
            let pasportDate = new Date(+a_pasportDate[2], a_pasportDate[1] - 1, +a_pasportDate[0]);
            let errorText = '';
            let pasportDateValid = true;
            let pasportAge = get_current_age(pasportDate);
            let currentDate = new Date().getTime();
            if(pasportAge > 100){
                checkDadataInput($(this),2,0);
                errorText = o_errorText[currentName][0];
                pasportDateValid = false;
            }else if(currentDate < pasportDate){
                checkDadataInput($(this),2,0);
                errorText = o_errorText[currentName][1];
                pasportDateValid = false;
            } else{
                errorText = o_errorText[currentName][2];
            }
            if(pasportDateValid){
                checkDadataInput($(this),1,0);
            }else{
                checkDadataInput($(this),2,0);
            }
            $(this).next().html(errorText);
        },
        "onincomplete": function(){ 
            checkDadataInput($(this),2,0);
    }});
    
    function get_current_age(date) {
      return ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;
    }
    
    function checkDadataInput(el,flag,flagInvalid){
        if(flag == 1){
            el.parents('.order-field').addClass('success');
            el.parents('.order-field').removeClass('error');
        }else{
            el.parents('.order-field').removeClass('success');
            el.parents('.order-field').addClass('error');
        }
        if(flagInvalid == 1){
            el.removeClass('invalid'); 
        }else if(flagInvalid == 2){
            el.addClass('invalid');
        }
    }
});
