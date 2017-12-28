$(function(){
  // var currentTime= new Date($.now());

  $('#new-message-button').click(function(){
    const currentTime = $('#timestamp').val
    const message = $('#new-message-body').val();
    const content = `<li class="message">
                  <a class='delete' href='#'>Delete</a>
                  <h3 class="author">Me</h3>
                  <p class="message-body">${message}</p>
                  <span class="timestamp">${new Date($.now())}</span>
                </li>`;
    $('#conversation').append(content);
    $('#new-message-body').val("")
  });

  $('#new-message-body').keydown(function(e) {
    var keyCode = e.which;
    if (keyCode === 13) {
  // As ASCII code for ENTER key is "13"
    $('#new-message-body').empty();
    const message = $('#new-message-body').val();
    const content = `<li class="message">
                  <a class='delete' href='#'>Delete</a>
                  <h3 class="author">Me</h3>
                  <p class="message-body">${message}</p>
                  <span class="timestamp">${new Date($.now())}</span>
                </li>`;
    $('#conversation').append(content);
    };

    $('#conversation').on('click', '.delete', function(e){
    const message = $('#new-message-body').val();
    const content = `<li class="message">
                  <a class='delete' href='#'>Delete</a>
                  <h3 class="author">Me</h3>
                  <p class="message-body">${message}</p>
                  <span class="timestamp">${new Date($.now())}</span>
                </li>`;
                $(this).parent().remove();
    e.preventDefault();
});

  });
});
