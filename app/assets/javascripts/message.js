$(function () { 
  function buildHTML(message) {
    image = ( message.image ) ? `<img class= "low-message__image" src=${message.image} >` : "";
      var html =
      `<div class="message" data-message_id= "${message.id}" > 
        <div class="up-message"> 
          <div class="up-message__user-name"> 
            ${message.user_name} 
          </div> 
          <div class="up-message__date"> 
            ${message.created_at} 
          </div> 
        </div> 
        <div class="low-message"> 
          <p class="low-message__content"> 
            ${message.content} 
          </p> 
        </div> 
        ${image}
      </div>`
    return html;
  }
  $('#new_message').on('submit', function (e) {
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
  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        formData: { id: last_message_id }
      })
        .done(function (messages) {
          var insertHTML = '';
          $.each(messages, function (i, message) {
            insertHTML += buildHTML(message)
          })
          $('.messages').append(insertHTML);
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight }, 'fast');
          $('form')[0].reset();
        })
        .fail(function () {
          alert('error');
        });
    }
  };
  setInterval(reloadMessages, 5000);
});