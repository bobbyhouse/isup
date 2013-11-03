/*
 * up.js 0.0.1
 *
 * Send a GET to the specified server and set status based on response.
 *
 */

var up = (function (server) {

  "use strict";

  var _DEFAULT_WAIT_MS, _DEFAULT_TIMEOUT_MS, _server, _callback,
      _insert_empty_div;

  _DEFAULT_WAIT_MS = 30 * 1000;
  _DEFAULT_TIMEOUT_MS = 50;

  _server = server;

  //
  // Generate callback
  //
  _callback = (function ($element) {

    return function (jqXHR, textStatus) {
      if ( 200 <= jqXHR.status && jqXHR.status < 300) {
        $element.removeClass('down').addClass('up');
      }
      else
      {
        $element.removeClass('up').addClass('down');
      }
    }
  });


  //
  // Insert an empty DIV into the BODY only once
  //
  _insert_empty_div = function () {
    var $div, has_been_called;

    has_been_called = false;

    return function () {
      if (!has_been_called) {
        $div = $('<div class="is"/>');
        $('body').prepend($div);
      }
      return $div;
    }
  }();

  return {

    // up.server
    // Return the name of the server
    server: function () {
      return _server;
    },

    // up.poll()
    // Poll the state of the server on an interval
    poll: function ($element, seconds) {

      // Initialize undefineds with defaults
      $element = $element || _insert_empty_div();
      seconds = seconds || _DEFAULT_WAIT_MS;

      var request = function () {
        $.ajax({
          type: 'GET',
          url: _server,
          timeout: _DEFAULT_TIMEOUT_MS,
          complete: _callback($element)
        });
      };
      request();
      setInterval(request, seconds);
      return this;
    }
  };
});
