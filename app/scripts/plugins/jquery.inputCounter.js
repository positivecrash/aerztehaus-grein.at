/**
 * Input Counter v 1.0
 * Copyright 2017 Anastasiia Bakai (positivecrash)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */


(function($) {

  var defaults = {

      // GENERAL
      display: 'input',
      add: '.add',
      sub: '.sub',
      min: 1,
      max: false,

      // CALLBACKS
      onChange: function() { return true; }
  };



  $.fn.InputCounter = function (options) {

  
    if (this.length < 1)
            return;

    // support multiple elements
    if (this.length > 1) {
      this.each(function() {
        $(this).InputCounter(options);
      });
      return this;
    }



    // create a namespace to be used throughout the plugin
    var counter = {},

    // set a reference to counter container element
    el = this;




    var init = function() {

      // Return if counter container is already initialized
      if ($(el).data('InputCounter')) { return; }


      // merge user-supplied options with the defaults
      counter.config = $.extend({}, defaults, options);

      // store elements
      counter.display = el.find(counter.config.display);
      counter.add = el.find(counter.config.add);
      counter.sub = el.find(counter.config.sub);


      

      // detect actions
      var setVal;

      counter.add.on('click', function(e){
          e.preventDefault();
          setVal = addVal();

          setup(setVal);
          
      });

      counter.sub.on('click', function(e){
          e.preventDefault();
          setVal = subVal();
          
          setup(setVal);
      });


    }



    var getVal = function() {
      return parseInt(counter.display.val());
    }



    var addVal = function() {
      var val = getVal();
      var newval = val + 1;

      if($.isNumeric( counter.config.max )){
          if (newval > counter.config.max)
            return false;
          else
            return newval;
      }
      else
        return newval;
    }



    var subVal = function() {
      var val = getVal();
      var newval = val - 1;


      if($.isNumeric( counter.config.min )){

          if (newval < counter.config.min)
            return counter.config.min;
          else
            return newval;
      }
      else{
        return newval;
      }
    }



    var setup = function(setVal){

      if (setVal){

          //change inout value
          counter.display.val(setVal);

          //callback after changing
          counter.config.onChange.call(el);
        }

    }





    init();

    $(el).data('InputCounter', this);

    // returns the current jQuery object
    return this;

  };

})(jQuery);