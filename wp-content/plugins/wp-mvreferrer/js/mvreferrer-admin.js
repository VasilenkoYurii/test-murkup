jQuery(function($) {
    if ($('.omcmvreferrersettingsform').length) {
        $('.omcmvreferrersettingsform').each(function(f_ind, f_obj) {
            $(f_obj).unbind('submit').submit(function() {
                omcMvTweakScript.overlayspin(true);
                $.ajax({
                    type: "POST",
                    url: ajaxurl,
                    dataType: 'json',
                    async: false,
                    data: omcMvTweakAdminScript.formdata($, $(f_obj), 'omcmv_referrer_settings_save'),
                    success: function(response) {
                        if (response != null && response.msg != null && response.msg != '') {
                            //console.log(response);

                            var alertHeadClass = (response.stat != null ? (response.stat == 'err' ? 'alert-danger' : (response.stat == 'crr' ? 'alert-success' : 'alert-warning')) : 'alert-warning');
                            var alertHeadText = alertHeadClass == 'alert-success' ? 'Success' : (alertHeadClass == 'alert-danger' ? 'Error' : 'Warning');
                            omcMvTweakScript.alertmodal($, alertHeadText, alertHeadClass, response.msg, 4000);

                        }
                    }
                });
                omcMvTweakScript.overlayspin(false);
                return false;

            });
        });

    }

    if ($('data-omcmvtrigger="mv_auth_check"'.length)) {

        $(document).on('click', '[data-omcmvtrigger=mv_auth_check]', function() {
            omcMvTweakScript.overlayspin(true);
            var _mvAuthLink = $(this);
            $.ajax({
                type: "POST",
                url: ajaxurl,
                dataType: 'json',
                async: false,
                data: {
                    'action': 'omcmv_auth_validation',
                    'triggerby': _mvAuthLink.data('triggerby')
                },
                success: function(response) {
                    if (response != null && response.act != null) {
                        if (response.act == 'crr') {

                        } else if (response.act == 'view' && response.html_content != null && response.html_content != '') {

                            var alertHeadClass = 'alert-info';
                            var alertHeadText = 'Auth Information';
                            omcMvTweakScript.alertmodal($, alertHeadText, alertHeadClass, response.html_content, 4000);
                        }
                    }
                }
            });
            omcMvTweakScript.overlayspin(false);
            return false;
        });
    }

});