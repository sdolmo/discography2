$('.trigger').on('click', function(){
  $('.handle').toggleClass('clicked');
});

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
});
