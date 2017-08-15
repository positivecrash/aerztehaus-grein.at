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
    if($('.card-print').length > 0){
        $('.card-print').on('click', function(e){
            e.preventDefault();
            e.stopPropagation();

            $(this).parents('section.sec').addClass('print');
            window.print();
            $(this).parents('section.sec').removeClass('print');
        });
    }



    /*====== TEXT RESIZE ======*/

    function textsize_scale(i){

        $('.js-tsize-plus').removeClass('active');
        $('.js-tsize-plus span').html('');
        $('.js-tsize-minus').removeClass('active');
        $('.js-tsize-minus span').html('');

        if ( i > 0 ){
            $('.js-tsize-plus').each(function(){
                $(this).addClass('active');
                $(this).find('span').html(i+1);
            });
        }

        if ( i < 0 ){
            $('.js-tsize-minus').each(function(){
                $(this).addClass('active');
                $(this).find('span').html(i-1);
            });
        }
    }

    function textsize_cookies_get(){
        if ( Cookies.get('textsize') == 1)
            return Cookies.get('textsize');
        else
            return 0;
    }

    function textsize_cookies_set(i){
        Cookies.set('textsize', i, { expires: 7 });
        console.log(Cookies.get('textsize'));
    }


    if($('.js-tsize-plus').length > 0){
        var scale = 100;
        var i = textsize_cookies_get();


        $('.js-tsize-plus').on('click', function(e){
            e.preventDefault();
            e.stopPropagation();

            scale += 5;
            i++;

            textsize_scale(i);
            textsize_cookies_set(i);
            $('html').css('font-size', scale + '%');
        });



        $('.js-tsize-minus').on('click', function(e){
            e.preventDefault();
            e.stopPropagation();

            scale -= 5;
            i--;

            textsize_scale(i);
            textsize_cookies_set(i);
            $('html').css('font-size', scale + '%');
        });
    }

});