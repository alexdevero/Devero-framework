(function() {
  // Open and Close Options Panel
  $('#options-panel .panel-button').click(function(){
    $('#options-panel').toggleClass('close-panel', 'open-panel', 800);
    $('#options-panel').toggleClass('open-panel', 'close-panel', 800);
    return false;
  });

  // Color Options
  $('.switch').click(function(){
    var title = $(this).attr('title');
    $('#color-options').attr('href', 'styles/colors/' + title + '.min.css');
    return false;
  });

  // Font Options
  $('.font').on('change' , function(){
    var value = $(this).val();
    $('html').attr('class', value);
    $('#font-option-styles').attr('href', 'styles/fonts/' + value + '.min.css');
    return false;
  });
})($);
