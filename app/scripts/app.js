jQuery(document).ready(function($){
	/*====== BASICS ======*/

	var $w = $(window);
	var $d = $(document);



	/*====== DROPDOWNS ======*/

	if($('.dropdown').length > 0){

        var classShow = 'active';
       
        $('.dropdown__toggle').on('click', function(e){
            e.preventDefault();
            e.stopPropagation();


            $('.dropdown__toggle').not(this).parent('.dropdown').removeClass(classShow);
            // console.log($('.dropdown__toggle').not(this).parent('.dropdown').html());

            var $ddwrap = $(this).parent('.dropdown');

            $ddwrap.toggleClass(classShow);

            $d.on('click', function(e){
                if ( ($(e.target).closest($ddwrap).length) ) return;
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

        var scale = 100;
        var count = 0;

        $('.js-tsize-plus').removeClass('active');
        $('.js-tsize-plus span').html('');
        $('.js-tsize-minus').removeClass('active');
        $('.js-tsize-minus span').html('');

        if ( i > 0 ){
            count = parseInt(i) + 1;

            $('.js-tsize-plus').each(function(){
                $(this).addClass('active');
                $(this).find('span').html(count);
            });
        }

        if ( i < 0 ){
            count = parseInt(i) - 1;

            $('.js-tsize-minus').each(function(){
                $(this).addClass('active');
                $(this).find('span').html(count);
            });
        }

        scale = scale + 5*i;

        $('html').css('font-size', scale + '%');
    }

    function textsize_cookies_get(){
        if ( Cookies.get('textsize') )
            return Cookies.get('textsize');
        else
            return 0;
    }

    function textsize_cookies_set(i){
        Cookies.set('textsize', i, { expires: 7 });
    }


    if($('.js-tsize-plus').length > 0){
        var i = textsize_cookies_get();

        if ( i != 0 ){
            textsize_scale(i);
        }


        $('.js-tsize-plus').on('click', function(e){
            e.preventDefault();
            e.stopPropagation();

            i++;

            textsize_scale(i);
            textsize_cookies_set(i);
        });



        $('.js-tsize-minus').on('click', function(e){
            e.preventDefault();
            e.stopPropagation();

            i--;

            textsize_scale(i);
            textsize_cookies_set(i);
        });
    }




    /*====== SHOW INTRO ======*/
    if($('body.page-index').length > 0){
        if ( !Cookies.get('first') ){
            Cookies.set('first', 1);
            $('body.index').addClass('index-intro');
        }
        else
            $('body.index').removeClass('index-intro');

        if($('body.index-intro #intro-sign svg').length > 0){
            $('body.index-intro #intro-sign svg').svgAnimate();
        }

        if($('body.index-intro #intro-music').length > 0){
            $('body.index-intro #intro-music')[0].play();
        }
    }



    /*====== COOKIES MESSAGE ======*/
    console.log(Cookies.get('cookieInfo'));

    if ( !Cookies.get('cookieInfo') ){

        console.log('yes');
        
        $('#info-cookies').fadeIn();

        $('#info-cookies .i-cancel').on('click', function(e){
            e.preventDefault();
            e.stopPropagation();

            $('#info-cookies').fadeOut();

            Cookies.set('cookieInfo', 1);
        });
    }
    

});