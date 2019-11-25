$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="up-message">
           <div class="up-message__user-name">
             ${message.user_name}
           </div>
           <div class="up-message__date">
             ${message.date}
           </div>
         </div>
         <div class="low-message">
           <p class="low-message__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="up-message">
           <div class="up-message__user-name">
             ${message.user_name}
           </div>
           <div class="up-message__date">
             ${message.date}
           </div>
         </div>
         <div class="low-message">
           <p class="low-message__content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }
  $('form').on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function (data) {
        var html = buildHTML(data);
        $('.messages').append(html);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight }, 'fast');
        $('form')[0].reset();
    })
      .fail(function () {
        alert('error');
      });
    return false;
  });
});