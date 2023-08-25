/*jshint esversion: 6 */
var __langcode = '';
var emailFormObj = {};
emailFormObj.getParameterByName = function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

emailFormObj.sendvideoactivity = function (body = '', percent = 0, sendAlert = '') {
    //console.log(body);
	jQuery.ajax({
		type: "POST",
		url: omctweaktools.ajaxurl,
		dataType: 'json',
		data: {
			'action': 'mv_send_video_activity',
			'video_activity_body': body,
			'percent': percent,
			'sendAlert': sendAlert
		},
		success: function (response) {					
			console.log(response);					 
		}
	});
}

var _flag = 1;
var duration = 0;

window._wq = window._wq || [];
_wq.push({ id: 'cydliwz2wn', onReady: function(video) {
	//console.log("I got a handle to the video!", video);
	video.bind("play", function () {
		duration = (video.duration() + 60) * 1000;
		console.log('duration 1: ' + duration);
		return video.unbind;
	});
	video.bind("pause", function () {
		duration = duration - (video.secondsWatched()*1000);
		console.log('duration 2: ' + duration);
		if (_flag) {
			jQuery(this).delay(duration).queue(function (n) {
				var percent = (video.percentWatched() * 100).toFixed(2);
				var msg = 'Watched ' + percent + '% of the video.';
				console.log(msg);
				emailFormObj.sendvideoactivity(msg, percent, 'alert3');
				_flag = 0;
				n();
			});
		}
	});

	video.bind("end", function () {
		if (_flag) {
			_flag = 0;
			var percent = (video.percentWatched() * 100).toFixed(2);
			var msg = 'Watched ' + percent + '% of the video.';
			console.log(msg);
			emailFormObj.sendvideoactivity(msg, percent,'alert3');
			return video.unbind;
		}
	});

}});

__langcode = emailFormObj.getParameterByName('lang');
__langcode = __langcode != null && __langcode != '' ? __langcode : 'en';

jQuery(function($) {

    $(document).ready(function () {

		$(document).on('click', '#redeem-user-cta', function() {
			emailFormObj.overlayspin(true);
			$.ajax({
				type: "POST",
				url: omctweaktools.ajaxurl + (__langcode ? '?lang=' + __langcode : ''),
				dataType: 'json',
				data: {
					'action': 'redeem_user_cta',
					'cta' : $(this).data('action')
				},
				success: function (response) {
					if (typeof response.red_url && response.red_url !== undefined && response.red_url != '') {
						window.location.href = response.red_url;
					} else {
						alert('Something wrong! Please try agail later.');
					}
				}
			});
		});
        
        $('.sidebar-close, .overlay').on('click', function () {
            // hide sidebar
            $('#country-sidemenu').removeClass('active');
            // hide overlay
            $('.overlay').removeClass('active');
            $('body').removeClass('overflowhidden');
        });

        $('.sidemenu-link').on('click', function () {
            // open sidebar country-sidemenu
            $('#country-sidemenu').addClass('active');
            $('body').addClass('overflowhidden');
            
            // fade in the overlay
            $('.overlay').addClass('active');
            //$('.collapse.in').toggleClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        });

    });

    let countries_list = [
        {
            code: 'AS',
            pcode: '+1648',
            country: 'American Samoa'
        },
        {
            code: 'AT',
            pcode: '+43',
            country: 'Austria'
        },
        {
            code: 'AU',
            pcode: '+61',
            country: 'Australia'
        },
        {
            code: 'BE',
            pcode: '+32',
            country: 'Belgium'
        },
        {
            code: 'BG',
            pcode: '+359',
            country: 'Bulgaria'
        },
        {
            code: 'CA',
            pcode: '+1',
            country: 'Canada'
        },
        {
            code: 'CH',
            pcode: '+41',
            country: 'Switzerland'
        },
        {
            code: 'CN',
            pcode: '+86',
            country: 'China'
        },
        {
            code: 'CY',
            pcode: '+357',
            country: 'Cyprus'
        },
        {
            code: 'CZ',
            pcode: '+420',
            country: 'Czech Republic'
        },
        {
            code: 'DE',
            pcode: '+49',
            country: 'Germany'
        },
        {
            code: 'DK',
            pcode: '+45',
            country: 'Denmark'
        },
        {
            code: 'EE',
            pcode: '+372',
            country: 'Estonia'
        },
        {
            code: 'ES',
            pcode: '+34',
            country: 'Spain'
        },
        {
            code: 'FI',
            pcode: '+358',
            country: 'Finland'
        },
        {
            code: 'FR',
            pcode: '+33',
            country: 'France'
        },
        {
            code: 'GB',
            pcode: '+44',
            country: 'United Kingdom'
        },
        {
            code: 'GR',
            pcode: '+30',
            country: 'Greece'
        },
        {
            code: 'GU',
            pcode: '+1671',
            country: 'Guam'
        },
        {
            code: 'HK',
            pcode: '+852',
            country: 'Hong Kong'
        },
        {
            code: 'HR',
            pcode: '+385',
            country: 'Croatia'
        },
        {
            code: 'HU',
            pcode: '+36',
            country: 'Hungary'
        },
        {
            code: 'IE',
            pcode: '+353',
            country: 'Ireland'
        },
        {
            code: 'IT',
            pcode: '+39',
            country: 'Italy'
        },
        {
            code: 'LT',
            pcode: '+370',
            country: 'Lithuania'
        },
        {
            code: 'LU',
            pcode: '+352',
            country: 'Luxembourg'
        },
        {
            code: 'LV',
            pcode: '+371',
            country: 'Latvia'
        },
        {
            code: 'MO',
            pcode: '+853',
            country: 'Macau'
        },
        {
            code: 'MT',
            pcode: '+356',
            country: 'Malta'
        },
        {
            code: 'MX',
            pcode: '+52',
            country: 'Mexico'
        },
        {
            code: 'MY',
            pcode: '+60',
            country: 'Malaysia'
        },
        {
            code: 'NL',
            pcode: '+31',
            country: 'Netherlands'
        },
        {
            code: 'NZ',
            pcode: '+64',
            country: 'New Zealand'
        },
        {
            code: 'PL',
            pcode: '+48',
            country: 'Poland'
        },
        {
            code: 'PR',
            pcode: '+1',
            country: 'Puerto Rico'
        },
        {
            code: 'PT',
            pcode: '+351',
            country: 'Portugal'
        },
        {
            code: 'SK',
            pcode: '+421',
            country: 'Slovakia'
        },
        {
            code: 'SE',
            pcode: '+46',
            country: 'Sweden'
        },
        {
            code: 'SG',
            pcode: '+65',
            country: 'Singapore'
        },
        {
            code: 'SI',
            pcode: '+386',
            country: 'Slovenia'
        },
        {
            code: 'SM',
            pcode: '+378',
            country: 'San Marino'
        },
        {
            code: 'TW',
            pcode: '+886',
            country: 'Taiwan'
        },
        {
            code: 'US',
            pcode: '+1',
            country: 'United States'
        },
        {
            code: 'VI',
            pcode: '+1340',
            country: 'U.S. Virgin Islands'
        },
        {
            code: 'ZA',
            pcode: '+27',
            country: 'South Africa'
        }
    ];

    let countries_obj = {};

    $.each(countries_list, function(_ind, _ele) {
        countries_obj[_ele.code] = `<span data-code='${_ele.pcode}' class="phone_code color-gray">${_ele.pcode}</span><span class='remove-country'>${_ele.country}</span>`;
    });

    $(".options").flagStrap({
        countries: countries_obj,
        buttonSize: "btn-sm",
        buttonType: "rs-main__mybtn",
        labelMargin: "5px",
        scrollable: true,
        scrollableHeight: "235px",
        listWidth: "280px",
        listStyle: "rs-main__country-list",
        placeholder: {
            value: "",
            text: "",
        },
        onSelect: function (value, element) {
            var selOption = $(element).find('option:selected').text();
            var pcode = $(selOption).data('code');
            $('#mobile').attr('phonecode', pcode);
            //console.log(pcode);
            //console.log($(element).find('option:selected').html());
            
            //code = code.split(" ")[0];
            
            $('.options').attr('data-selected-country', value);
            
        }
    });

    if ($('#offer-expire-counter').length) {

        let offerEndTime = $('#offer-expire-counter').data('endtime');
        let currentdate = Math.round(+new Date()/1000); 
        let timeDiffEvent = offerEndTime - currentdate;        
        let time = timeDiffEvent,
            tmp = time;

        if (timeDiffEvent >= 0) {

            let x = setInterval(function () {
                let c = tmp--,

                    d = (c / (24 * 60 * 60)) >> 0,
                    h = (((c - d * 24 * 60 * 60) / (60 * 60)) >> 0) + '',
                    m = (((c - (d * 24 * 60 * 60 + h * 60 * 60)) / 60) >> 0) + '',
                    s = (c - (d * 24 * 60 * 60 + h * 60 * 60 + m * 60)) + '';

                $('#offer-expire-counter').html( (d > 0 ? d + 'd ' : '') + h + 'h ' + m + 'm ' + (s.length > 1 ? '' : '0') + s + 's');

                tmp != -1 || (tmp = time);

                if (tmp == time) {
                    clearInterval(x);
                }
            }, 1000);
        }
        
    }

    //form submission

    if ($('.flavor-select').length) {	
		$('.flavor-select').change(function() {
            emailFormObj.change($, $(this));
		});
	}

    $(document).on('click', '.mvp-flavor-select', function() {
		$('.mvpflavor').addClass('hide');
		var productid = $(this).data('productid');
        //console.log(productid);
		$('.mvp-flavor-select').removeClass('active');
		$('#'+productid).removeClass('hide');
		$('.flavor-btn').find("[data-productid='" + productid + "']").addClass('active'); 	
    });

    $(document).on('click', '.pack-qty-btn', function(){
      let objAmount = $(this).parentsUntil('.rs-main__shiping-cost-update').parent();
      //console.log(objAmount);
      let type = $(this).data('qty_btn_type');
      let maxQty = $(this).data('qty');
      let currQty = parseInt($(objAmount).find('.current-qty').text());
      let currPrice = $(objAmount).find('.current-price').data('price');
      let currency = $(this).data('currency');

      if(type == 'minus' && currQty > 1) {
        currQty = currQty - 1;
        $(objAmount).find('.current-qty').text(currQty);
        $(objAmount).find('.current-price').text(currency+(currQty*currPrice).toFixed(2));
        if(currQty == 1) $(objAmount).find('button[data-qty_btn_type="minus"]').attr('disabled', 'disabled');;
        if(currQty < maxQty) $(objAmount).find('button[data-qty_btn_type="plus"]').removeAttr('disabled');
      } else if(type == 'plus' && currQty < maxQty) {
        currQty = currQty + 1;
        if(currQty == maxQty) $(objAmount).find('button[data-qty_btn_type="plus"]').attr('disabled', 'disabled');
        if(currQty <= maxQty) $(objAmount).find('button[data-qty_btn_type="minus"]').removeAttr('disabled');
        $(objAmount).find('.current-qty').text(currQty);
        $(objAmount).find('.current-price').text(currency+(currQty*currPrice).toFixed(2));
      }
      
    });

    $('#send-redeem-email').off('click').on("click", function (e) {
        //let lang = __langcode != '' && __langcode != 'en' ? '?lang='+__langcode : '';
        var $this = $(this);
		
        $('.validation-check').addClass('hide');
        var formObj = $(this).parentsUntil('.form-row').parent();
        var fname = formObj.find('input[name="email-fname"]').val();
        var lname = formObj.find('input[name="email-lname"]').val();
        var email = formObj.find('input[name="email-id"]').val();
        var phone = formObj.find('input[name="email-phone"]').val();
        var qty = formObj.find('.current-qty').length ? parseInt(formObj.find('.current-qty').text()) : 1;

        var phoneCode = formObj.find('input[name="email-phone"]').attr('phonecode');   
        if(!phoneCode) phoneCode = '+1';

        var phone_pattern = /\(?([0-9]{3})\)?([ .,:\/-]?)([0-9]{3})/; 
        var phone_pattern_sp = /[ !$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
        var isPhoneValid = false;    
        if(phone_pattern.test( phone ) && !phone_pattern_sp.test( phone )) {
            isPhoneValid = true;
        }   

        var isValidEmail = emailFormObj.validateEmail(email);    
        var countryCode = formObj.find('.rs-main__select-country').attr('data-selected-country');

		var isContactProfile = typeof $(this).attr('data-contacttype') !== 'undefined' && $(this).attr('data-contacttype') == 'profile' ? 1 : 0;
        
        if ( isContactProfile || (fname != '' && lname != '' && email != '' && isValidEmail && isPhoneValid)) {
			$('.email-submission-form').prop('disabled', true);
            //emailFormObj.overlayspin(true);
            $this.find('i').removeClass('hide');
            $this.find('img').removeClass('hide');

            const isAsync = typeof $(this).attr('data-vipaccess') !== 'undefined' && $(this).attr('data-vipaccess') ? true : false;
            
            $.ajax({
                type: "POST",
                url: omctweaktools.ajaxurl + (__langcode ? '?lang=' + __langcode : ''),
                dataType: 'json',
                async: isAsync,
                data: {
                    'action': 'mv_contact_request',
                    'fname': fname,
                    'lname': lname,
                    'email': email,
                    'phone': phone,
                    'phonecode': phoneCode,
                    'qty'  : qty,
                    'lang' : __langcode,
                    'country': countryCode
                },
                success: function (response) {

                    if (typeof response.red_url && response.red_url !== undefined && response.red_url != '') {
                        
                        const height = 760;
                        const width = 500;
                        const leftPosition = window.innerWidth / 2 - width / 2;
                        const topPosition =
                            window.innerHeight / 2 -
                            height / 2 +
                            (window.outerHeight - window.innerHeight); 
                        window.open(
                            response.red_url, // checkout link
                            'checkoutWindowRef',
                            'status=no,height=' +
                            height +
                            ',width=' +
                            width +
                            ',resizable=yes,left=' +
                            leftPosition +
                            ',top=' +
                            topPosition +
                            ',screenX=' +
                            leftPosition +
                            ',screenY=' +
                            topPosition +
                            ',toolbar=no,menubar=no,scrollbars=no,location=no,directories=no'
                        );

                    } else if(typeof response.show_thanks && response.show_thanks !== undefined && response.show_thanks != '') {
                        $('main section').addClass('hide');
                        $('main section.thank-you').removeClass('hide');  
                        emailFormObj.overlayspin(false);                      
                    } else if(typeof response.is_invalid && response.is_invalid !== undefined && response.is_invalid != '') {
                        $('main section').addClass('hide');
                        $('main section.offer-claimed').removeClass('hide');  
                        emailFormObj.overlayspin(false);                      
                    } else if(typeof response.shopketo_red_url && response.shopketo_red_url !== undefined && response.shopketo_red_url != '') {
                        window.location.href = response.shopketo_red_url;
                    } else {
                        formObj.find('#send-redeem-email').html('Error!').delay(5000).queue(function (n) {
                            formObj.find('#send-redeem-email').html('claim my trial');
                            n();
                        });
                        emailFormObj.overlayspin(false); 
                    }
                    
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(JSON.stringify(errorThrown));
                },
                complete: function() {
                    console.log('completed');
                    setTimeout(() => {
                        $this.find('i').addClass('hide');
                        $this.find('img').addClass('hide');
                    }, 1000);
                }
            });
            
        } else {
            if (fname == '') {
                formObj.find('.check-fname').removeClass('hide');
            }
            if (lname == '') {
                formObj.find('.check-lname').removeClass('hide');
            }
            if (email == '') {
                formObj.find('.check-email').removeClass('hide');
            }else if (!isValidEmail) {
                formObj.find('.check-email-valid').removeClass('hide');
            }
            if(phone == '') {
                formObj.find('.check-phone').removeClass('hide');
            } else if(!isPhoneValid) {
                formObj.find('.check-phone-valid').removeClass('hide');
            }
        }
        return false;
    });

    $('#send-redeem-email-mb').off('click').on("click", function (e) {
		 //let lang = __langcode != '' && __langcode != 'en' ? '?lang='+__langcode : '';
		 var $this = $(this);
		
		 $('.validation-check').addClass('hide');
		 var formObj = $(this).parentsUntil('.form-row').parent();
		 var fname = formObj.find('input[name="email-fname"]').val();
		 var lname = formObj.find('input[name="email-lname"]').val();
		 var email = formObj.find('input[name="email-id"]').val();
		 var phone = formObj.find('input[name="email-phone"]').val();
		 var qty = formObj.find('.current-qty').length ? parseInt(formObj.find('.current-qty').text()) : 1;
 
		 var phoneCode = formObj.find('input[name="email-phone"]').attr('phonecode');   
		 if(!phoneCode) phoneCode = '+1';
 
		 var phone_pattern = /\(?([0-9]{3})\)?([ .,:\/-]?)([0-9]{3})/; 
		 var phone_pattern_sp = /[ !$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
		 var isPhoneValid = false;    
		 if(phone_pattern.test( phone ) && !phone_pattern_sp.test( phone )) {
			 isPhoneValid = true;
		 }   
 
		 var isValidEmail = emailFormObj.validateEmail(email);    
		 var countryCode = formObj.find('.rs-main__select-country').attr('data-selected-country');
 
		 var isContactProfile = typeof $(this).attr('data-contacttype') !== 'undefined' && $(this).attr('data-contacttype') == 'profile' ? 1 : 0;
		 
		 if ( isContactProfile || (fname != '' && lname != '' && email != '' && isValidEmail && isPhoneValid)) {
			$('.email-submission-form').prop('disabled', true);
			 //emailFormObj.overlayspin(true);
			 $this.find('i').removeClass('hide');
			 $this.find('img').removeClass('hide');
 
			 const isAsync = typeof $(this).attr('data-vipaccess') !== 'undefined' && $(this).attr('data-vipaccess') ? true : false;
			 
			 $.ajax({
				 type: "POST",
				 url: omctweaktools.ajaxurl + (__langcode ? '?lang=' + __langcode : ''),
				 dataType: 'json',
				 async: isAsync,
				 data: {
					 'action': 'mv_contact_request',
					 'fname': fname,
					 'lname': lname,
					 'email': email,
					 'phone': phone,
					 'phonecode': phoneCode,
					 'qty'  : qty,
					 'lang' : __langcode,
					 'country': countryCode
				 },
				 success: function (response) {
 
					 if (typeof response.red_url && response.red_url !== undefined && response.red_url != '') {
						 
						 const height = 760;
						 const width = 500;
						 const leftPosition = window.innerWidth / 2 - width / 2;
						 const topPosition =
							 window.innerHeight / 2 -
							 height / 2 +
							 (window.outerHeight - window.innerHeight); 
						 window.open(
							 response.red_url, // checkout link
							 'checkoutWindowRef',
							 'status=no,height=' +
							 height +
							 ',width=' +
							 width +
							 ',resizable=yes,left=' +
							 leftPosition +
							 ',top=' +
							 topPosition +
							 ',screenX=' +
							 leftPosition +
							 ',screenY=' +
							 topPosition +
							 ',toolbar=no,menubar=no,scrollbars=no,location=no,directories=no'
						 );
 
					 } else if(typeof response.show_thanks && response.show_thanks !== undefined && response.show_thanks != '') {
						 $('main section').addClass('hide');
						 $('main section.thank-you').removeClass('hide');  
						 emailFormObj.overlayspin(false);                      
					 } else if(typeof response.is_invalid && response.is_invalid !== undefined && response.is_invalid != '') {
						 $('main section').addClass('hide');
						 $('main section.offer-claimed').removeClass('hide');  
						 emailFormObj.overlayspin(false);                      
					 } else if(typeof response.shopketo_red_url && response.shopketo_red_url !== undefined && response.shopketo_red_url != '') {
						 window.location.href = response.shopketo_red_url;
					 } else {
						 formObj.find('#send-redeem-email-mb').html('Error!').delay(5000).queue(function (n) {
							 formObj.find('#send-redeem-email-mb').html('claim my trial');
							 n();
						 });
						 emailFormObj.overlayspin(false); 
					 }
					 
				 },
				 error: function(jqXHR, textStatus, errorThrown) {
					 console.log(JSON.stringify(errorThrown));
				 },
				 complete: function() {
					 console.log('completed');
					 setTimeout(() => {
						 $this.find('i').addClass('hide');
						 $this.find('img').addClass('hide');
					 }, 1000);
				 }
			 });
			 
		 } else {
			 if (fname == '') {
				 formObj.find('.check-fname').removeClass('hide');
			 }
			 if (lname == '') {
				 formObj.find('.check-lname').removeClass('hide');
			 }
			 if (email == '') {
				 formObj.find('.check-email').removeClass('hide');
			 }else if (!isValidEmail) {
				 formObj.find('.check-email-valid').removeClass('hide');
			 }
			 if(phone == '') {
				 formObj.find('.check-phone').removeClass('hide');
			 } else if(!isPhoneValid) {
				 formObj.find('.check-phone-valid').removeClass('hide');
			 }
		 }
		 return false;
    });

    $('#send-expketo-email').unbind('click').on("click", function() {
        //return;

		$('.validation-check').addClass('hide');
		var fname = ''; var lname = ''; var phone =  ''; var email = '';
		var formObj = $(this).parentsUntil('form').parent();

        fname 		= formObj.find('input[name="email-fname"]').val();
        lname 		= formObj.find('input[name="email-lname"]').val();
        phone  		= formObj.find('input[name="email-phone"]').val();
        email  		= formObj.find('input[name="email-id"]').val();

        var isValidEmail = emailFormObj.validateEmail(email);

        
        var phoneCode = formObj.find('input[name="email-phone"]').attr('phonecode');   
        if(!phoneCode) phoneCode = '+1';

        var phone_pattern = /\(?([0-9]{3})\)?([ .,:\/-]?)([0-9]{3})/; 
        var phone_pattern_sp = /[ !$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
        var isPhoneValid = false;    
        if(phone_pattern.test( phone ) && !phone_pattern_sp.test( phone )) {
            isPhoneValid = true;
        }

        //var phone_pattern = /\(?([0-9]{3})\)?([ .,:\/-]?)([0-9]{3})([ .,:\/-]?)([0-9]{4})/; 
        //var isPhoneValid = phone != 'undefined' && phone != '' ? phone_pattern.test( phone ) : false;
		
		if(fname != '' && lname != '' && email != '' && isValidEmail && isPhoneValid) {
			emailFormObj.overlayspin(true);
			$.ajax({
				type: "POST",
				url: omctweaktools.ajaxurl + (__langcode ? '?lang=' + __langcode : ''),
				dataType: 'json',
				data: {
					'action': 'mv_send_email',
					'fname'	: fname,
					'lname' : lname,
					'phone' : phoneCode+phone,
					'email'	: email,
					'gresponse' : 1,

				},
				success: function (response) {
					if(response.msg == 'yes'){
						$('.form-group input').val('');
						formObj.find('button#send-expketo-email').html('Request Sent').delay(5000).queue(function(n) {
							formObj.find('button#send-expketo-email').html('continue'); n();
						});
					} else {
						formObj.find('button#send-expketo-email').html('Error!').delay(5000).queue(function(n) {
							formObj.find('button#send-expketo-email').html('continue'); n();
						});
					}
					emailFormObj.overlayspin(false);
				}
			});
		} else {
            if (fname == '') {
                formObj.find('.check-fname').removeClass('hide');
            }
            if (lname == '') {
                formObj.find('.check-lname').removeClass('hide');
            }
            if (email == '') {
                formObj.find('.check-email').removeClass('hide');
            } else if (!isValidEmail) {
                formObj.find('.check-email-valid').removeClass('hide');
            }
            if(phone == '') {
                formObj.find('.check-phone').removeClass('hide');
            } else if(!isPhoneValid) {
                formObj.find('.check-phone-valid').removeClass('hide');
            }
		}

	});

});

emailFormObj.validateEmail = function (email) {
    var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return pattern.test(jQuery.trim(email));
}

emailFormObj.overlayspin = function (display) {
    if (display == true) {
        jQuery('.omc-overlay-spinner').remove();
        jQuery('body').append('<div class="omc-overlay-spinner"> &nbsp;</div>');
        new Spinner({
            lines: 15,
            length: 10,
            width: 10,
            radius: 25,
            corners: 0.7,
            rotate: 0,
            direction: 1,
            color: '#fff',
            speed: 1,
            trail: 60,
            shadow: true,
            hwaccel: true,
            className: 'spinner',
            zIndex: 2e9,
            top: '50%',
            left: '50%'
        }).spin(jQuery('.omc-overlay-spinner')[0]);
    } else {
        jQuery('.omc-overlay-spinner').fadeOut('fast', function () {
            jQuery('.omc-overlay-spinner').remove();
        });
    }
}

emailFormObj.change = function($, obj) {
	var targetTableId = obj.val();
	var id = obj.find(':selected').data('productid');
	if ($('#'+ targetTableId).length) {
		if( targetTableId == 'keto-max-id-1' ) {
			$('#suppliment-fact-'+id).find('#keto-max-id-2').fadeOut();
			$('#suppliment-fact-'+id).find('#keto-max-id-1').fadeIn();
		} else if( targetTableId == 'keto-max-id-2' ) {
			$('#suppliment-fact-'+id).find('#keto-max-id-1').fadeOut();
			$('#suppliment-fact-'+id).find('#keto-max-id-2').fadeIn();
		}
	}
};