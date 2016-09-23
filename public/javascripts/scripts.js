$('#random').on('click', function() {
  console.log('clicked on random');
  $.post('/random', {random: '1'}, function(data, textStatus, xhr) {
    console.log('posted to /random');
  });
});
$('.light').on('click', function(e) {
  e.preventDefault();
  console.log($(this).data('id'));
});
$('.random').on('click', function(e) {
  e.preventDefault();
  $.post('/random', {id: $(this).data('id')}, function(data, textStatus, xhr) {
    console.log(data);
  });
});
$('#getUserId').on('click',function() {
  console.log('getting new user id');
  $.post('/getUserID', {data:"something something dark side"}, function(data, textStatus, xhr){
    console.log('posted to /getUserID');
  });
});
