
jQuery(function($) {

  if ($('select[name=omccountryselect]').length) {
    if ($('.btn-country-select-continue').length) {
      $('.btn-country-select-continue').click(function() {
        //omcLoadByCountry($, $(this).siblings('select[name=omccountryselect]'));
        var omcCountryLoad = $(this).siblings('select[name=omccountryselect]').val()
        if (omcCountryLoad != null && omcCountryLoad != '') { 
          omcCountryOverlaySpin(true);
          location.href = omcCountryLoad + '?lang=' + omccountryobj.active_lang;
        }
      });
    }

    if ($('select.omc-country-select').length) {
      $('select.omc-country-select').change(function() {
        //omcLoadByCountry($, $(this));
        if ($(this).val() != null && $(this).val() != '') {
          omcCountryOverlaySpin(true);
          location.href = $(this).val();
        }
      });
    }

  }

});

function omcLoadByCountry($, countrySelObj) {
  omcCountryOverlaySpin(true);
      $.ajax({
        type: "POST",
        url: omcCountryPlgAjaxURL,
        dataType: 'json',
        async: false,
        data: {
          'action': 'omc_country_site_load',
          'country_site': countrySelObj.val()
        },
        success: function(response) {
          if (response != null && response.status != null && response.status == 'ok' && response.country_site_path != null && response.country_site_path != '') {
            location.href = response.country_site_path;
          } else {
            omcCountryOverlaySpin(false);
            //omcCountryAlert()
          }
        }
      });
}

function omcCountryAlert($, header, headerclass, body) {
  $('.omc-country-modal').remove();
  $('body').append('<div class="modal fade omc-country-modal omc-alert-modal" id="omcCountryAlertModal" tabindex="-1" role="dialog" aria-labelledby="omcCountryFormModalLabel" aria-hidden="true">'
    + '<div class="modal-dialog">'
      + '<div class="modal-content">'
        + '<div class="modal-header alert '+ headerclass +'">'
          + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
          + '<h4 class="modal-title" id="omcCountryFormModalLabel">'+ header +'</h4>'
        + '</div>'
        + '<div class="modal-body">'
          + body          
        + '</div>'
        + '<div class="modal-footer">'
          + '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
        + '</div>'
      + '</div><!-- /.modal-content -->'
    + '</div><!-- /.modal-dialog -->'
  + '</div><!-- /.modal -->');
  
  $('#omcCountryAlertModal').modal({show : true});
  $('#omcCountryAlertModal').on('hidden.bs.modal', function (ev) {
    $('#omcCountryAlertModal').remove();
  });
}

function omcCountryOverlaySpin(display) {
  if (display == true) {
    jQuery('.omc-country-overlay-spinner').remove();
    jQuery('body').append('<div class="omc-country-overlay-spinner">&nbsp;</div>');
  
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
    }).spin(jQuery('.omc-country-overlay-spinner')[0]);
  } else {
    jQuery('.omc-country-overlay-spinner').fadeOut('fast', function() {
      jQuery('.omc-country-overlay-spinner').remove();
    });
  }
}
