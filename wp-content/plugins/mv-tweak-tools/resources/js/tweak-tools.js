var omcMvTweakScript = {};

omcMvTweakScript.overlayspin = function(display) {
    if (display == true) {
        jQuery('.omc-overlay-spinner').remove();
        jQuery('body').append('<div class="omc-overlay-spinner">&nbsp;</div>');

        new Spinner({
            lines: 15, // The number of lines to draw
            length: 10, // The length of each line
            width: 10, // The line thickness
            radius: 35, // The radius of the inner circle
            corners: 0.7, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            color: '#fff', // #rgb or #rrggbb or array of colors
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: true, // Whether to render a shadow
            hwaccel: true, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: '50%', // Top position relative to parent
            left: '50%' // Left position relative to parent
        }).spin(jQuery('.omc-overlay-spinner')[0]);
    } else {
        jQuery('.omc-overlay-spinner').fadeOut('fast', function() {
            jQuery('.omc-overlay-spinner').remove();
        });
    }
};


omcMvTweakScript.alertmodal = function($, header, headerclass, body, timeOut) {

    if ($.fn.modal) {
        $('.omc-bs-style.omc-wrap').first().find('.omc-modal').remove();
        //$('#omc-wrap-all .omc-modal').remove();
        $('.omc-bs-style.omc-wrap').first().append('<div class="modal fade omc-modal omc-alert-modal" id="omcMvTweakToolsAlertModal" tabindex="-1" role="dialog" aria-labelledby="omcMvTweakToolsAlertLabel" aria-hidden="true">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header alert ' + headerclass + '">' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '<h4 class="modal-title" id="omcMvTweakToolsAlertLabel">' + header + '</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            body +
            '</div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
            '</div>' +
            '</div><!-- /.modal-content -->' +
            '</div><!-- /.modal-dialog -->' +
            '</div><!-- /.modal -->');


        $('#omcMvTweakToolsAlertModal').modal({ show: true });
        if (timeOut > 0) setTimeout(function() { $('#omcMvRefToolsAlertModal').modal('hide'); }, timeOut);
        $('.modal-backdrop').addClass('omc-modal-backdrop omc-mv-tweak-tools-backdrop');
        $('#omcMvTweakToolsAlertModal').on('show.bs.modal', function(ev) {});
        $('#omcMvTweakToolsAlertModal').on('hidden.bs.modal', function(ev) {
            $('#omcMvTweakToolsAlertModal').remove();
        });
    } else {
        $('.omc-bs-style.omc-wrap').first().find('.omc-modal').remove();
        //$('#omc-wrap-all .omc-modal').remove();
        $('.omc-bs-style.omc-wrap').first().append(
            '<div class="modal fade omc-modal omc-alert-modal" id="omcMvTweakToolsAlertModal" tabindex="-1" role="dialog" aria-labelledby="omcMvTweakToolsAlertLabel" aria-hidden="true">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-body">' +
            body +
            '</div>' +
            '</div><!-- /.modal-content -->' +
            '</div><!-- /.modal-dialog -->' +
            '</div><!-- /.modal -->'
        );
        $("#omcMvTweakToolsAlertModal").dialog({
            modal: true,
            title: header,
            buttons: {
                Close: function() {
                    $(this).dialog("close");
                    $('#omcMvTweakToolsAlertModal').remove();
                }
            }
        });
        $('.modal-backdrop').addClass('omc-modal-backdrop omc-mv-tweak-tools-backdrop');

    }

}

jQuery(function($) {
    omcMvTweakScript.overlayspin(false);
    $('.tweak-tooltip').tooltip({
        content: function(ui) {
            return $(this).attr('title');
        }
    });


    if ($('.omctoggleswitch').length) {
        //console.log($('.omctoggleswitch').data('switchsize'));
        $('.omctoggleswitch').each(function(ind, ele) {
            var _switchSize = $(ele).data('switchsize');
            var _switchInverse = $(ele).data('switchinverse');
            var _switcOffText = $(ele).data('switchofftext');
            var _switchOnText = $(ele).data('switchontext');
            var _switcOffColor = $(ele).data('switchoffcolor');
            var _switchOnColor = $(ele).data('switchoncolor');

            //console.log(typeof _switchInverse !== 'undefined' && _switchInverse == 'false');
            $(ele).bootstrapSwitch({
                size: (typeof _switchSize !== 'undefined' && _switchSize != '' ? _switchSize : 'mini'),
                inverse: (typeof _switchInverse !== 'undefined' && _switchInverse == false ? false : true),
                offColor: (typeof _switcOffColor !== 'undefined' && _switcOffColor != '' ? _switcOffColor : 'warning'),
                offText: (typeof _switcOffText !== 'undefined' && _switcOffText != '' ? _switcOffText : 'Off'),
                onColor: (typeof _switchOnColor !== 'undefined' && _switchOnColor != '' ? _switchOnColor : 'success'),
                onText: (typeof _switchOnText !== 'undefined' && _switchOnText != '' ? _switchOnText : 'On')
            });
        });

    }
});