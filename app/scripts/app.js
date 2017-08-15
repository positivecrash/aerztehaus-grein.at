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
    if($('#intro-sign svg').length > 0){
        $('#intro-sign svg').svgAnimate();
    }

    if($('#intro-music').length > 0){

      	$('#intro-music')[0].play();

        //  setTimeout(function() {
       //      $('#intro-music')[0].play();
        // }, 500);
    }



    /*====== PRINT ======*/
    $('.card-print').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();

        $(this).parents('section.sec').addClass('print');
        window.print();
        $(this).parents('section.sec').removeClass('print');
    });


});