describe('Creating a Message by Clicking Send (1)', function() {
  var message;
  beforeAll(function() {
    message = enterMessage('hello');
    $('#new-message-button').trigger('click');
  });
  afterAll(clearMessages);

  it('should add Message to Chat', function() {
    expect(lastMessage()).toEqual(message);
  });

  it('should clear input field', function() {
    expect($('#new-message-body').val()).toBeFalsy();
  });
});

describe('Creating a Message by Hitting Enter (2)', function() {
  var message;
  beforeAll(function() {
    message = enterMessage("hello");
    ['keydown', 'keyup', 'keypress'].forEach(function(eventType) {
      var e = $.Event(eventType);
      e.which = e.keyCode = 13;
      $('#new-message-body').trigger(e);
    });
  });
  afterAll(clearMessages);

  it('should add Message to Chat', function() {
    expect(lastMessage()).toEqual(message);
  });
});

describe('Destroying a Message(1)', function() {
   var message;
  beforeAll(function() {
    enterMessage("hello");
    $('#new-message-button').trigger('click');
    message = $('#conversation li:first-child()');
  });
  afterAll(clearMessages);

  it('Clicking "x" should delete the message', function() {
    expect($('#conversation')).toContainElement(message);
    message.children('.delete').trigger('click');
    expect($('#conversation')).not.toContainElement(message);
  });
});


describe('Timestamps for each Message (2)', function() {
  var message;
  beforeAll(function() {
    message = enterMessage("Hello!");
    $('#new-message-button').trigger('click');
  });
  afterAll(clearMessages);

  it("There is a span with class of 'timestamp' in each message", function() {
    expect(lastMessageObject()).toContainElement('span.timestamp');
  });

  it(".timestamp contains current Time in this format: HH:MM", function() {
    var date = new Date();
    var dateMatcherString = "(" + date.getHours() + ":" + date.getMinutes() + ")"
    var dateMatcher = new RegExp(dateMatcherString);
    expect(lastMessageObject().children('.timestamp').html()).toMatch(dateMatcher);
  });
});

describe("Alternates between Me/Myself/I (3)", function() {
  afterAll(clearMessages);

  it("Alternates between Me, Myself, and I", function() {
    var usernames = [];
    for(var i = 0; i < 3; i++) {
      enterMessage('Hello');
      $('#new-message-button').trigger('click');
      usernames.push(lastMessageObject().children('.author').html());
    }
    expect(usernames).toContain('Me');
    expect(usernames).toContain('Myself');
    expect(usernames).toContain('I');
  });
});

describe("I'm lonely! Button pulls in API data as a chat(5):", function() {
  beforeAll(function(done) {
     spyOn($, 'ajax').and.callThrough();
     if ($.icndb) {
      spyOn($.icndb, 'getRandomJoke').and.throwError("Don't use some fancy plugin!");
      spyOn($.icndb, 'getRandomJokes').and.throwError("Don't use some fancy plugin!");
      spyOn($.icndb, 'getNumberOfJokes').and.throwError("Don't use some fancy plugin!");
      spyOn($.icndb, 'getCategories').and.throwError("Don't use some fancy plugin!");
     }
     $('#lonely').trigger('click');
     var checkExist = setInterval(function() {
        console.log('checking!');
      if (lastMessageObject().children('.author').html() == "Internet") {
        clearInterval(checkExist);
        done();
      }
     }, 100);
  });
  afterAll(clearMessages);

  it("Clicking #lonely uses jQuery ajax, not some fancy plugin!", function() {
   expect($.ajax).toHaveBeenCalled();
  });

  it("Adds the message to chat with username 'Internet'", function() {
    console.log(lastMessageObject().children('.author').html());
    expect(lastMessageObject().children('.author').html()).toContain('Internet');
  });
});


function lastMessage() {
  return $('#conversation li').last().children('.message-body').html();
}
function lastMessageObject() {
  return $('#conversation li').last();
}
function clearMessages() {
  $('#conversation').html('');
}
function enterMessage(txt) {
  $('#new-message-body').val(txt);
  return txt;
}
