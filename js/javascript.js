 (function ($) {

    "use strict"
    // set default times at 25 and 5
    var $t, $h, $m, $s, /* variables for time units*/
        $breakLength = 5, /*default break lenght*/
        $sessionLength = 25, /*default sessions length*/
        $seconds = $sessionLength*60,
        $timeRunning = false, /* timer is on hold by default*/
        $runTimer, /* varibale for funtion expression for timer interval */
        $displayTimer = $('p.time'), 
        $focusParagraph = $('.focus'),
        $breakDurationSpan = $('.break-duration'),
        $sessionDurationSpan = $('.session-duration'),
        $breakButtons = $('.breakLength').children('i'),
        $sessionButtons = $('.sessionLength').children('i'),
        $countdownDiv = $('#countdown'),
        $resetButton = $('#resetButton'),
        $focus = "session"; 
  
    // set time by clicking arrows
    function updateBreakLength (reset) {
      var $this = $(this);
      if(reset === 'reset'){
        $breakLength = 5;
      } else if ($this.prop('id') == 'breakup') {
         $breakLength += 1;
      } else {
          if ($breakLength > 0){
            $breakLength -= 1;
        }
      }
      $breakDurationSpan.text(Math.max(0, $breakLength));
    }

    function updateSessionLength (reset) {
      var $this = $(this);
      if(reset === 'reset'){
        $sessionLength = 25;
      } else if ($this.prop('id') == 'sessionup') {
         $sessionLength += 1;
      } else {
          if ($sessionLength > 0) {
            $sessionLength -= 1;
          }
        }
      $seconds = Math.max(0, $sessionLength*60);
      $sessionDurationSpan.text(Math.max(0, $sessionLength));
      $displayTimer.text(setDuration($seconds));
    }

    function setDuration (time) {
      $t =  Number(time);
      $h = Math.floor($t / 3600);
      $m = Math.floor($t % 3600 / 60);
      $s = Math.floor($t % 3600 % 60 );
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

    function reset () {
      clearInterval($runTimer);
      $timeRunning = false;
      $focus = "session";
      updateSessionLength('reset');
      updateBreakLength('reset');
    }

    function bindings () {
        $breakButtons.on('click', updateBreakLength);
        $sessionButtons.on('click', updateSessionLength);
        $countdownDiv.on('click', clickOnTimer);
        $resetButton.on('click', reset);
    }

  $( document ).ready(function() {
    $sessionDurationSpan.text(""+$sessionLength);
    $displayTimer.text(setDuration(""+$seconds));
    $breakDurationSpan.text(""+$breakLength);
    $focusParagraph.text("Session");
    bindings();
  });

})(jQuery);