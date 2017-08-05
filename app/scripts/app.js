jQuery(document).ready(function($){
	/*====== BASICS ======*/

	var $w = $(window);
	var $d = $(document);
	



	/*====== COPY TEXT ======*/

	// function show_msg(o_msg){
	// 	o_msg.fadeIn();

	// 	setTimeout(function(){
	//         o_msg.fadeOut();
	//     }, 3000);
	// }

	// if($('a[data-copytext]').length > 0){
	// 	$('a[data-copytext]').on('click', function(e){
	// 		e.preventDefault();
 //            e.stopPropagation();

 //            var $this = $(this);
 //            var copytext_id = $this.data('copytext');

 //            if ($this.data('copytextmsg'))
 //            	var copytext_msg = $this.data('copytextmsg');

 //            var gettext = $('#'+copytext_id).html();

 //            $('body').append('<div id="msg-copied" class="msg-floating" style="display:none;"></div>');
 //            var $msg = $('#msg-copied');

 //            clipboard.copy(gettext).then(
	// 	  		function(){

	// 		  		if(copytext_msg)
	// 		  			$msg.html(copytext_msg + ' copied to clipboard');
	// 		  		else
	// 		  			$msg.html('Copied to clipboard');

	// 		  		show_msg($msg);

 // 				},
	// 		  	function(err){

	// 		  		$msg.html('Sorry, copy to clipboard is not supported on your device').addClass('err');

	// 		  		show_msg($msg);

	// 		  	}
	// 		);
 //        });
	// }






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
    


});