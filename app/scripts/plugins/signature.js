(function($) {
  $.fn.svgAnimate = function (options) {

  
    if (this.length < 1)
            return;

    // support multiple elements
    if (this.length > 1) {
      this.each(function() {
        $(this).svgAnimate(options);
      });
      return this;
    }



    // create a namespace to be used throughout the plugin
    var svg = {},

    // set a reference to svg element
    el = this,

    $w = $(window);



    var setup = function() {
      init();

      setTimeout(function() {
        animate();
      }, 500);
    }



    var init = function() {

      // svg.shouldStopExecution = 0;

      // Return if svg is already initialized
      if ($(el).data('svgAnimate')) { return; }


      var delay, i, len, length, path, paths, previousStrokeLength, results, speed;
      paths = $(el).find('path, circle, rect');
      delay = 0;
      results = [];

      for (i = 0, len = paths.length; i < len; i++) {

        if (svg.shouldStopExecution == 1){ break; }
        path = paths[i];
        length = path.getTotalLength();
        previousStrokeLength = speed || 0;
        speed = length < 20 ? 10 : Math.floor(length);
        delay += previousStrokeLength + 100;
        results.push($(path).css('transition', 'none').attr('data-length', length).attr('data-speed', speed).attr('data-delay', delay).attr('stroke-dashoffset', length).attr('stroke-dasharray', length + ',' + length));
      }

      svg.shouldStopExecution = 1;

    }

    var animate = function() {
      var delay, i, len, length, path, paths, results, speed;
      // paths = $('path, circle, rect', el);
      paths = $(el).find('path, circle, rect');
      results = [];
      for (i = 0, len = paths.length; i < len; i++) {
        
        if (svg.shouldStopExecution == 2){break;}
        path = paths[i];
        length = $(path).attr('data-length');
        speed = $(path).attr('data-speed');
        delay = $(path).attr('data-delay');
        results.push($(path).css('transition', 'stroke-dashoffset ' + speed + 'ms ' + delay + 'ms linear').attr('stroke-dashoffset', '0'));
      }

      svg.shouldStopExecution = 2;
    }


    setup();

    $(el).data('svgAnimate', this);

    // returns the current jQuery object
    return this;

  };


})(jQuery);