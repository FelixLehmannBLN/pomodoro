  
(function ($) {

    "use strict"
    // set default times at 25 and 5
    var $breakLength = 5,
        $sessionLength = 25,
        $seconds = $sessionLength*60, 
        $timeRunning = false,
        $runTimer,
        $focus = "session";
  
    // set time by clicking arrows
    function updateBreakLength (e) {
      var $this = $(this);
      if ($this.prop('id') == 'breakup') {
         $breakLength += 1;
      } else {
        $breakLength -= 1;
      }
      $('.break-duration').text(""+$breakLength);
    };

    function updateSessionLength (e) {
      var $this = $(this);
      if ($this.prop('id') == 'sessionup') {
         $sessionLength += 1;
      } else {
        $sessionLength -= 1;
      }
      $seconds = Number($sessionLength*60);
      $('.session-duration').text(""+$sessionLength);
      $('p.time').text(setDuration($seconds));
    };

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
      if ($timeRunning == false){
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
      $seconds -= 1;
      $('p.time').text(setDuration($seconds)); 
      if ($seconds == 0){
       toggleSession();
       console.log($focus);
      }   
    }
    function toggleSession() {
      if ($focus == "session") {
        $focus = "break";
        $('#countdown').css("border", "2px solid rgb(150,0,70)" );
        $seconds = $breakLength*60;
         $('.focus').text("Break");
      } else {
        $focus = "session";
        $('#countdown').css("background-color", "rgb(0,255,0)" );
        $seconds = $sessionLength*60;
        $('.focus').text("Session");
      }
    }

    function bindings () {
        // Increase or decrease timer
        $('.breakLength i').on('click', updateBreakLength);
        $('.sessionLength i').on('click', updateSessionLength);
        $('#countdown').on('click', clickOnTimer);
    }

  $( document ).ready(function() {
    $('.session-duration').text(""+$sessionLength);
    $('p.time').text(setDuration(""+$seconds));
    $('.break-duration').text(""+$breakLength);
    $('.focus').text("Session");
    bindings();
  });

})(jQuery);




    // get Time from Session Element in seconds
    // 
    // start / stop timer by clicking on circle
    // decrease timer every second by 1
    // if session timer is 0, start break
    // if break timer is 0, start next session
    // 
    // reset timer when clicking arrows
    // 
    // fast forward / "skip break" (supermode)
    // 
    // 
    // 
