/**
 * AnySlide v 1.0
 * Copyright 2017 Anastasiia Bakai (positivecrash)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */


(function($) {

  var defaults = {

      // GENERAL
      tab: '.js-tabs-head',
      tabEl: 'a',
      content: '.js-tabs-content',
      contentEl: 'div',
      classActive: 'active',  // this class for both – tabs and content
      loadFirst: false,   // should we check if all element in content of slider is loaded. There should be a selector in parametr
      anchorSupport: true,  //it is only for NOT single content so far


      //FOR SLIDER WITH ONE BLOCK FOR CONTENT
      singleContainer: false,  // if true – all content in one selector (e.g. for parallax effects)
      classSlide: 'slide_',
      classPrevSlide: 'prevslide_',

      //FOR SLIDER THAT SETUP TO SCROLL TOP WHILE CHANGING TAB
      scrollTop: false,
      scrollTopDelay: 1000,  //how long to wait till scroll tab to top
      scrollTopSpeed: 400,   // scroll top speed
      mobileViewPort: 500,  // max width for mobile screens
      desktopOffset: 50,    // how much height from top while scrolling tab for desktop
      mobileOffset: 100,    // how much height from top while scrolling tab for mobiles

      
      // CALLBACKS
      onSliderLoad: function(index) { return true; },
      onSlideChange: function(index) { return true; }
  };



  $.fn.AnySlide = function (options) {

  
    if (this.length < 1)
            return;

    // support multiple elements
    if (this.length > 1) {
      this.each(function() {
        $(this).AnySlide(options);
      });
      return this;
    }



    // create a namespace to be used throughout the plugin
    var slider = {},

    // set a reference to slider element
    el = this,

    $w = $(window);




    var init = function() {

      // Return if slider is already initialized
      if ($(el).data('AnySlide')) { return; }


      // merge user-supplied options with the defaults
      slider.config = $.extend({}, defaults, options);

      // store tabs
      slider.tab = el.children(slider.config.tab).children(slider.config.tabEl);

      // store container for content
      slider.content = el.children(slider.config.content).children(slider.config.contentEl);

      // used if singleContainer == true
      slider.activeslide = 'init';


      //detect show tabs or not
      if (slider.tab.length > 0){
        slider.hastabs = true
      }

      //detect show content or not
      if (slider.content.length > 0){
        slider.hascontent = true
      }


      // check if there are some element that need to be preloaded
      if ( slider.config.loadFirst ){

        // get all items for checking
        var items = slider.content.find(slider.config.loadFirst);
        var itemslen = items.length;

        // hide sontent, show loader
        contentHide(0);

        
        // check loading for each item
        items.one("load", function() {

          itemslen--;

          if ( itemslen == 1){
            contentShow(500);
            setup();
          }

        }).each(function() {

          //If the src is already set, then the event is firing in the cached case, before you even get the event handler bound.  Fix:
          if(this.complete) $(this).load();

        });


      }
      // if no need to preload anything
      else{
        setup();
      }



      // Show page from start if there is a hash in the url
      if ( slider.config.anchorSupport ){

        $('html, body').animate({
            scrollTop: 0
        }, 0.2);
      }

    }



    var contentHide = function(timeout) {

        setTimeout(function(){
          // wrap content with help selector
          el.children(slider.config.content).wrapInner('<div class="anyslide-content"></div>');

          // add loader
          el.children(slider.config.content).prepend('<div class="anyslide-loader"></div>');

          // hide content selector
          slider.content.find('.anyslide-content').hide();

        }, timeout);

    }


    var contentShow = function(timeout) {

        setTimeout(function(){
          el.children(slider.config.content).find('.anyslide-loader').remove();
          el.children(slider.config.content).find('.anyslide-content').fadeIn();
        }, timeout);

    }




    var setup = function() {

      var active = getActiveSlide();

     // 1. show default slide
      show(active);

      // 2.  watch for changes and show another slide if needed
      action();

      // 3. onSliderLoad callback
      slider.config.onSliderLoad.call(el, active);

    }


    var show = function(index) {

      if ( slider.hascontent ){
        showContent(index);
      }

      if ( slider.hastabs ){
        showTab(index);
      }

      if ( slider.config.scrollTop ){
        scrollTop();
      }


      // onSlideChange callback
      slider.config.onSlideChange.call(el, index);

    }


    var scrollTop = function(){

        // set offset for better viewing
        var offset = 0;

        if ($w.width() > slider.config.mobileViewPort ){
          offset = $(el).offset().top - slider.config.desktopOffset;
        }
        else{
          offset = $(el).offset().top - slider.config.mobileOffset;
        }


        $('html, body')
          .delay(slider.config.scrollTopDelay)
          .animate({scrollTop: offset }, slider.config.scrollTopSpeed);

    }



    var action = function(){


      // If slider has tabs, detect action on tabs

      if ( slider.hastabs ){

        slider.tab.on('click', function(e){

          e.preventDefault();
          e.stopPropagation();

          setActiveIndex($(this).index());
          show(slider.activeslide);

        });
      }



    }






    var getSlideByUrl = function(){
      var hash = window.location.hash.substring(1);
      var index = 0;

      if (hash){

        slider.content.each(function(){
          if ( $(this).attr('id') == hash )
            index = $(this).index();
        });

      }

      return index;

    }




    var getActiveSlide = function() {

      if ( slider.config.anchorSupport ){
        setActiveIndex ( getSlideByUrl() );
      }
      else{
          if ( el.data('activeslide') )
            setActiveIndex ( el.data('activeslide') );
          else
            setActiveIndex(0);
      }

    

      return slider.activeslide;
    }




    var setActiveIndex = function(index) {
      slider.prevslide = slider.activeslide;
      slider.activeslide = index;

      if ( slider.config.anchorSupport ){

        // Show page from start if there is a hash in the url
        // $('html, body').animate({
        //     scrollTop: 0
        // }, 300);


        window.location.hash = slider.content.eq(index).attr('id');

      }
    }




    var showContent = function(index) {

      if ( slider.config.singleContainer ){
          slider.content
            .removeClass()
            .addClass(slider.config.classSlide+index);


          slider.content.addClass(slider.config.classPrevSlide+slider.prevslide);
            

      }
      // If there is normal content separated with some selectors (by default <div>)
      else{
        addActiveClass(slider.content, index);
      }

    }



    var showTab = function(index){
      addActiveClass(slider.tab, index);
    }





    var addActiveClass = function(object, index){

      object.each(function(){
          $(this).removeClass(slider.config.classActive);
      });

      object.eq(index).addClass(slider.config.classActive);
    }










    init();

    $(el).data('AnySlide', this);

    // returns the current jQuery object
    return this;

  };

})(jQuery);