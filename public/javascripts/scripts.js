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
  var myID = $(this).data('id');
  $.post('/random', {id: $(this).data('id')}, function(data, textStatus, xhr) {
    console.log('rgb('+data[0]+','+data[1]+','+data[2]+')');
    console.log($('#'+myID));
    $('#'+myID).siblings('.lightvalue').css('background','rgb('+data[0]+','+data[1]+','+data[2]+')');
  });
});
$('#getUserId').on('click',function() {
  console.log('getting new user id');
  $.post('/getUserID', {data:"something something dark side"}, function(data, textStatus, xhr){
    console.log('posted to /getUserID');
  });
});
