$('#random').on('click', function() {
  console.log('clicked on random');
  $.post('/random', {random: '1'}, function(data, textStatus, xhr) {
    console.log('posted to /random');
  });

})
