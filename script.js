var todaysdate = new Date();
$(function(){
  const author = ['Me', 'Myself', 'I'];
  author.forEach(function() {
      console.log(author);
  });
  var authors = ['Me', 'Myself', 'I'];

  $('#new-message-button').click(function(){
    let author = authors[0];
    let pop = authors.shift();
    authors.push(pop);
    let currentTime = $('#timestamp').val();
    let message = $('#new-message-body').val();
    let content = `<li class="message">
                  <a class='delete' href='#'>Delete</a>
                  <h3 class="author">${author}</h3>
                  <p class="message-body">${message}</p>
                  <span class="timestamp">${todaysdate.getHours() + ":" + todaysdate.getMinutes()}</span>
                </li>`;
      `<h3 class="Me">${author}/h3>`;

    $('#conversation').append(content);
    $('#new-message-body').val("")


  $('#new-message-body').keydown(function(e) {
    var keyCode = e.which;
    if (keyCode === 13) {
  // As ASCII code for ENTER key is "13"
    $('#new-message-body').empty();
    const message = $('#new-message-body').val();
    const content = `<li class="message">
                  <a class='delete' href='#'>Delete</a>
                  <h3 class="author">${author}</h3>
                  <p class="message-body">${message}</p>
                  <span class="timestamp">${todaysdate.getHours()+ ":" + todaysdate.getMinutes()}</span>
                </li>`;
    $('#conversation').append(content);
    };

    $('#conversation').on('click', '.delete', function(e){
    const message = $('#new-message-body').val();
    const content = `<li class="message">
                  <a class='delete' href='#'>Delete</a>
                  <h3 class="author">${author}</h3>
                  <p class="message-body">${message}</p>
                  <span class="timestamp">${todaysdate.getHours()+ ":" + todaysdate.getMinutes()}</span>
                </li>`;
                $(this).parent().remove();
    e.preventDefault();
});

  });
});
});
