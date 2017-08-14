jQuery(document).ready(function($){
	/*====== BASICS ======*/

	var $w = $(window);
	var $d = $(document);



	/*====== DROPDOWNS ======*/

	if($('.dropdown').length > 0){
       
        $('.dropdown__toggle').on('click', function(e){
            e.preventDefault();
            e.stopPropagation();

            var $ddwrap = $(this).parent('.dropdown');
            var classShow = 'active';

            $ddwrap.toggleClass(classShow);


            $d.on('click', function(e){
                if ( ($(e.target).closest($ddwrap.children('.dropdown__content')).length) ) return;
                $ddwrap.removeClass(classShow);
                e.stopPropagation();
            });

        });

    }




    /*====== SLIDER ======*/
    $('#index-slider').AnySlide({
		singleContainer: true,
		loadFirst: 'img',
		anchorSupport: false,
		// autoplay: true,
		autoHover: false,
		loop: true
	});
    


    /*====== INTRO ======*/
    $('#intro-sign svg').svgAnimate();

   //  setTimeout(function() {
   //      $('#intro-music')[0].play();
  	// }, 500);

  	$('#intro-music')[0].play();


});