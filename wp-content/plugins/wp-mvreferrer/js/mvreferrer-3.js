var mvReferrerScript = {};
jQuery(function($) {
		
  	$(document).on('click', '[data-omcmvtrigger=mv_logout_referrer]', function() {
        omcMvTweakScript.overlayspin(true);
				$.ajax({
            type: "POST",
            url: omctweaktools.ajaxurl,
            dataType: 'json',
            async: false,
            data: {
                'action': 'omcmv_referrer_logout'
            },
            success: function(response) {
                 omcMvTweakScript.overlayspin(false);
                 location.href = omctweaktools.referrer_logout_page;             
            }
        });
        
    });


    $(document).on('click', '[data-omcmvtrigger=mv_referrer_modal]', function() {

        var omcMvPopId = $(this).data('targetmodal');
        var omcMvPopTriggerBy = $(this).data('triggerby');
        var omcMvPopRedirectURL = $(this).data('redirectlink') != null ? $(this).data('redirectlink') : '';

        $(omcMvPopId).modal({
            show: true,
            keyboard: true
        });
        $(omcMvPopId).on('shown.bs.modal', function(e) {
            $(omcMvPopId).find('[name=omcmvpoptriggerby]').val(omcMvPopTriggerBy);
            $(omcMvPopId).find('[name=omcmvpopredirect]').val(omcMvPopRedirectURL);
            $(omcMvPopId).find('[name=referring_id]').trigger('focus');
        });
        $(omcMvPopId).on('hide.bs.modal', function(e) {
            $(omcMvPopId).find('[name=omcmvpoptriggerby]').val('');
            $(omcMvPopId).find('[name=omcmvpopredirect]').val('');
        });
        $('.modal-backdrop').addClass('omc-modal-backdrop omc-mv-tweak-tools-backdrop');
        return false;
    });


    if ($('#mv_referrer_validate_form').length) {
        var refErrMsg = $($('.ref-err-msg-txt')[0]).text();
        var mvRefIdCheckForm = $('#mvReferrerIdValidateForm');
        var mvReferrerId = '';
        $('#mv_referrer_validate_form').submit(function() {
            mvRefIdCheckForm = $(this);
            omcMvTweakScript.overlayspin(true);
            mvReferrerId = mvRefIdCheckForm.find('input[name=referring_id]').val();
            $.ajax({
                type: "POST",
                url: omctweaktools.ajaxurl,
                dataType: 'json',
                async: false,
                data: {
                    'action': 'omcmv_referrer_validation',
                    'refid': mvReferrerId,
                    'triggerby': mvRefIdCheckForm.find('input[name=omcmvpoptriggerby]').val(),
                    'redirectlink': mvRefIdCheckForm.find('input[name=omcmvpopredirect]').val()
                },
                success: function(response) {
                    if (response != null && response.act != null) {    
                      
                      	if(response.act == 'confirm_referrer'){
                          var confirmPopUp = $('#mv-referrer-confirm-modal-pop');
                          var omcMvPopId = $('#mv_referring_member_pop');
                        	$('#mv_referring_member_pop').modal('hide');
                          $('#mv-referrer-confirm-modal-pop .modal-body').html(response.refInfoPopHtml);
                        	$(confirmPopUp).modal({
                            show: true,
                            keyboard: true
                        	});
                          $(confirmPopUp).on('shown.bs.modal', function(e) {
                            
                            $('.ref-confirm-yes').on('click', function(){                         
                              $(confirmPopUp).modal('hide');
                              location.href = response.redirectlink;
                            });
                            
                            $('.ref-confirm-no').on('click', function(){
                              
                              $(omcMvPopId).find('input[name=referring_id]').val('');
                              $(omcMvPopId).find('.mv-ref-err-pop-msg').remove();
                              $(confirmPopUp).modal('hide');
                              $(omcMvPopId).modal({
                                  show: true,
                                  keyboard: true
                              });
                              
                            	$(omcMvPopId).on('shown.bs.modal', function(e) {
                               	$(omcMvPopId).find('input[name=referring_id]').focus();
                               	$(omcMvPopId).find('[name=omcmvpoptriggerby]').val('validate_confirm_referrer');
                            	});   
                              
                          	});  
                            
                          });
                        }
                      
                      
                        if (response.act == 'referrer_login') { //console.log(mvRefIdCheckForm.find('.modal-body'));
                            $('#mv_referring_member_pop').modal('hide');
                            var mvreferrerloginpage = mvRefIdCheckForm.find('input[name=omcmvauthredirect]').val();

                            mvreferrerloginpage = typeof mvreferrerloginpage !== 'undefined' && mvreferrerloginpage != null && mvreferrerloginpage != '' ? mvreferrerloginpage : omctweaktools.referrer_login_page;

                            mvreferrerloginpage = typeof response.redirectlink !== 'undefined' && response.redirectlink != null && response.redirectlink != '' ? response.redirectlink : mvreferrerloginpage;

                            if (typeof mvreferrerloginpage !== 'undefined' && mvreferrerloginpage != null && mvreferrerloginpage != '') {
                                location.href = mvreferrerloginpage.replace(/<referrer_id>/, mvReferrerId);
                            }

                        } else if (response.act == 'view' && response.html_content != null && response.html_content != '') { console.log(mvRefIdCheckForm.find('.modal-body'));
                            $('#mv_referring_member_pop').modal('hide'); 
                            var alertHeadClass = 'alert-info';
                            var alertHeadText = 'Referrer Information';
                            omcMvTweakScript.alertmodal($, alertHeadText, alertHeadClass, response.html_content, 4000);
                        } else if(response.act == 'err' && response.msg != null && response.msg != '') {
                            console.log(response.msg);
                            //$('#mv_referring_member_pop').find('.ref-err-msg-txt').remove();
                            $('#mv_referring_member_pop').find('.ref-err-msg-txt').text(response.msg);
                            $('#mv_referring_member_pop').find('.ref-err-msg-txt').removeClass('hide');
                        } else if(response.act == 'redirect' && response.redirectlink != ''){
                            location.href = response.redirectlink;
                        }
                         
                    } else {                
                        
                        refErrMsg = refErrMsg != '' ? refErrMsg : (response.msg != null ? response.msg : '');
                        console.log(refErrMsg);
                        //$('#mv_referring_member_pop').find('.ref-err-msg-txt').remove();
                        $('#mv_referring_member_pop').find('.ref-err-msg-txt').text(refErrMsg);
                        $('#mv_referring_member_pop').find('.ref-err-msg-txt').removeClass('hide');
                        //mvRefIdCheckForm.find('.mv-ref-pop-msg').remove();
                        //mvRefIdCheckForm.find('input[name=referring_id]').after('<span class="omc-red mv-ref-msg mv-ref-pop-msg">' + refErrMsg + '</span>');                     
                    }
                }
            });
            omcMvTweakScript.overlayspin(false);
            return false;
        });
    }


    /***** load referrer menubar *******/

    mvReferrerScript.load_referrer_menu_load($);
    mvReferrerScript.load_referrer_menu_info($);
    mvReferrerScript.load_referrer_menubar($);


});

mvReferrerScript.load_referrer_menu_load = function($) {
    if ($('.mv-referrer-menu-load').length) {
        $.ajax({
            type: "POST",
            url: omctweaktools.ajaxurl,
            dataType: 'json',
            async: false,
            data: {
                'action': 'omcmv_referrer_menu'
            },
            success: function(response) {
                if (response != null && response.act != null && response.act == 'crr' && response.html_content != null && response.html_content != '') {
                    $('.mv-referrer-menu-load').html(response.html_content);
                }
            }
        });
    }
}

mvReferrerScript.load_referrer_menu_info = function($) {
    if ($('.mv-load-referrer-menu-info').length) {
        $.ajax({
            type: "POST",
            url: omctweaktools.ajaxurl,
            dataType: 'json',
            async: false,
            data: {
                'action': 'omcmv_referrer_info'
            },
            success: function(response) {
                if (response != null && response.act != null && response.act == 'crr' && response.html_content != null && response.html_content != '') {
                    $('.mv-load-referrer-menu-info').html(response.html_content);
                }
              	if(response != null && response.act != null && response.act == 'crr' && response.refInfoPopHtml != null && response.refInfoPopHtml != ''){
                  $('.mv-referrer-confirm-modal-pop .modal-body').html(response.refInfoPopHtml);
                }
            }
        });
    }
}


mvReferrerScript.load_referrer_menubar = function($) {
    if (typeof omctweaktools.is_admin !== 'undefined' && omctweaktools.is_admin == 'no') {
        $.ajax({
            type: "POST",
            url: omctweaktools.ajaxurl,
            dataType: 'json',
            async: false,
            data: {
                'action': 'omcmv_referrer_menubar'
            },
            success: function(response) {
                if (response != null && response.act != null && response.act == 'crr' && response.html_content != null && response.html_content != '') {
                    $('body .mv-referrer-menubar').remove();
                    $('body').prepend(response.html_content);
                }
            }
        });
    }
}