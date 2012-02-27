/*
 *  jQuery Char Countdown
 *  Creates a Twitter-like counter on an input
 *  Author: Dan Karney @KarneAsada
 *  Date: 2012-02-24
 *
 *  Options:
 *    position: after or before
 *    limit: the number of characters to limit
 *    enforce: add maxlength to the input
 *    className: the class that will be applied to count down
 *    suffix: the text following the countdown
 *    onChange: callback to be called on change
 *    - passed: charCountdown element
 *          	input element
 *          	# of characters left
 */

;(function ( $, window, document, undefined ) {
    
  // Create the defaults once
  var pluginName = "charCountdown"
    , defaults = {
          position:   "after"
        , limit:      100
        , enforce:    false
        , className:  "jqCharCountdown"
        , suffix:     "chars left"
        , onChange:   null
      };

  // The actual plugin constructor
  function Plugin( element, options ) {
    this.element = element;

    this.options = $.extend( {}, defaults, options) ;
        
    this._defaults = defaults;
    this._name = pluginName;
        
    this.init();
  }

  Plugin.prototype.init = function () {

    var self = this
      , o  = this.options
      , el = $(this.element)
      ;

    // Add maxlength if not already set
    if (o.enforce) {
      el.attr("maxlength", o.limit);
    }
        
    // Add counter
    var counter = $("<span>")
                    .addClass(o.className)
                    ;
      
    switch( o.position ) {
      case "before":
        el.before( counter );
        break;
     default:
        el.after( counter );
        break;
    }
        
    // Bind change events
    el.bind("keyup", function(){

      counter.text( (o.limit - el.val().length)
            + (o.suffix.length
          ? " " + o.suffix
          : ""
          ));

      if (o.onChange != null && typeof o.onChange == "function") {
        o.onChange( counter, el, o.limit - el.val().length );
      } else {
        // Set counter color
        var limitPercentage = el.val().length < o.limit
                           ? (o.limit - el.val().length) /  o.limit
                           : 0;
        // Use HSL hues to modulate color and convert to rgb
        var rgb = hslToRgb( limitPercentage * 120 / 360, 1, 0.4 );
        counter.css("color", "rgb(" + rgb.join(",") + ")");
        
        // Change background color of input
        // var bgRbg = hslToRgb( limitPercentage * 120 / 360, 1, 0.9 );
        // el.css("background-color", "rgb(" + bgRbg.join(",") + ")");
      }
    });
    
    el.trigger("keyup");                       
  };
      
  // Convert HSL value to RGB
  function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
      r = g = b = l; // achromatic
    }else{
      function hue2rgb(p, q, t){
        if(t < 0) t += 1;
        if(t > 1) t -= 1;
        if(t < 1/6) return p + (q - p) * 6 * t;
        if(t < 1/2) return q;
        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      }

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
  }

  // A really lightweight plugin wrapper around the constructor, 
  // preventing against multiple instantiations
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
      }
    });
  }

})(jQuery, window, document);