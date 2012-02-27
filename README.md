# jQuery Char Countdown

A simple jQuery plugin that creates a character countdown similar to the one found on Twitter.  By default, the character counter changes color from green to red as the counter nears zero.  This behavior can be overridden with another callback. 

## Usage

  $("input#id").charCountdown();
  
## Parameters

  position: after or before [after]
  limit: the number of characters to limit [100]
  enforce: add maxlength to the input [false]
  className: the class that will be applied to count down [jqCharCountdown]
  suffix: the text following the countdown [chars left]
  onChange: callback to be called on change [null]
    passed: charCountdown element
            input element
            number of characters left

## Example
  
  $("input#id").charCountdown(
    {
      position: before,
      limit:    64,
      enforce:  true,
      onChange: function( charCounter, inputEl, left ){
        if (left < 5) {
          alert("You can only type "+left+" more characters!");
        }
      }
    }
  );