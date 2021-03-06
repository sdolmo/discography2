$('.trigger').on('click', function(){
  var state = $('.record img').css('animation-play-state');
  if (state === 'paused'){
    $('.record img').css('animation-play-state', 'running');
  } else if (state === 'running') {
    $('.record img').css('animation-play-state', 'paused');
  }
});

$('.arrow').on('click', function(){
  $('.app-content').toggleClass('clicked');
  $('.arrow').toggleClass('clicked');
  var clickedContent = $('#content').hasClass('clicked');

  if (clickedContent) {
    $('#main').fadeOut(100);
  } else {
    $('#main').fadeIn(3000);
  }
});

$('.arrow').hover(
  function() {
    var width = $('.app-content').css('width');
    if(width <= '530') {
      $(this).addClass("hover");
    } else if (width >= '100px') {
      return
    }
  }, function() {
    $(this).removeClass('hover');
  }
);
