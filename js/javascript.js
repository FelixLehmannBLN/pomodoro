 (function ($) {

    "use strict"
    // set default times at 25 and 5
    var $breakLength = 5,
        $sessionLength = 25,
        $seconds = $sessionLength*60, 
        $timeRunning = false,
        $runTimer,
        $displayTimer = $('p.time'),
        $focusParagraph = $('.focus'),
        $breakDurationSpan = $('.break-duration'),
        $sessionDurationSpan = $('.session-duration'),
        $breakButtons = $('.breakLength').children('i'),
        $sessionButtons = $('.sessionLength').children('i'),
        $countdownDiv = $('#countdown'),
        $focus = "session";
  
    // set time by clicking arrows
    function updateBreakLength () {
      var $this = $(this);
      if ($this.prop('id') == 'breakup') {
         $breakLength += 1;
      } else {
          if ($breakLength > 0){
            $breakLength -= 1;
        }
      }
      $('.break-duration').text(Math.max(0, $breakLength));
    }

    function updateSessionLength () {
      var $this = $(this);
      if ($this.prop('id') == 'sessionup') {
         $sessionLength += 1;
      } else {
          if ($sessionLength > 0) {
            $sessionLength -= 1;
          }
        }
      $seconds = Math.max(0, $sessionLength*60);
      $('.session-duration').text(Math.max(0, $sessionLength));
      $displayTimer.text(setDuration($seconds));
    }

    function setDuration (time) {
      var $t =  Number(time);
      var $h = Math.floor($t / 3600);
      var $m = Math.floor($t % 3600 / 60);
      var $s = Math.floor($t % 3600 % 60 );
      return (
        ($h > 0 ? $h+ ":" + ($m < 10 ? "0" : "") : "") + $m + ":" + ($s < 10 ? "0" : "") + $s
        );
    }

    function clickOnTimer() {
      // call function once to avoid delay, then set interval
      updateTimer(); 
      if ($timeRunning === false){
        $timeRunning = true;
        $runTimer = setInterval(function() {
          updateTimer();
        }, 1000);
        // set timerrunning to true and start the timer
      } else {
        clearInterval($runTimer);
        $timeRunning = false;
        // set timerRunning to false and stop the timer
      }
    }

    function updateTimer() {
      if ($seconds <= 0){
       toggleSession();
      }
      $seconds -= 1;
      $displayTimer.text(setDuration($seconds));    
    }

    function toggleSession() {
      if ($focus == "session") {
        $focus = "break";
        $countdownDiv.css("border", "2px solid rgb(150,0,70)" );
        $seconds = $breakLength*60;
        $focusParagraph.text("Break");
      } else {
        $focus = "session";
        $countdownDiv.css("border", "2px solid rgb(0,255,0)" );
        $seconds = $sessionLength*60;
        $focusParagraph.text("Session");
      }
    }

    function bindings () {
        $breakButtons.on('click', updateBreakLength);
        $sessionButtons.on('click', updateSessionLength);
        $countdownDiv.on('click', clickOnTimer);
    }

  $( document ).ready(function() {
    $sessionDurationSpan.text(""+$sessionLength);
    $displayTimer.text(setDuration(""+$seconds));
    $breakDurationSpan.text(""+$breakLength);
    $focusParagraph.text("Session");
    bindings();
  });

})(jQuery);