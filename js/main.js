$(document).ready(function(){	
    function resize(){
       if( typeof( window.innerWidth ) == 'number' ) {
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || 
        document.documentElement.clientHeight ) ) {
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }
    }
    $(window).resize(resize);
    resize();

    $.fn.placeholder = function() {
        if(typeof document.createElement("input").placeholder == 'undefined') {
            $('[placeholder]').focus(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                    input.removeClass('placeholder');
                }
            }).blur(function() {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur().parents('form').submit(function() {
                $(this).find('[placeholder]').each(function() {
                    var input = $(this);
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });
            });
        }
    }
    $.fn.placeholder();

    $('.video-slider').slick({
        dots: true,
        arrows: true,
        speed: 800,
        nextArrow: '<div class="b-block"><div class="arrow-right-white" aria-hidden="true"><img class="" src="i/arrow-right-white.png"></div></div>',
        prevArrow: '<div class="b-block"><div class="arrow-left-white" aria-hidden="true"><img class="" src="i/arrow-left-white.png"></div></div>',
        adaptiveHeight: true
    });

    $('.review-slider').slick({
        dots: false,
        arrows: true,
        nextArrow: '<div class="arrow-right-dark" aria-hidden="true"><img class="" src="i/arrow-right-dark.png"></div>',
        prevArrow: '<div class="arrow-left-dark" aria-hidden="true"><img class="" src="i/arrow-left-dark.png"></div>',
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        variableWidth: true
    });

    $('.tour-item').hover(
        function(){
          $(this).children(".tour-item-hover").removeClass("tour-hide");
          $(this).children(".tour-item-default").addClass("hide");
        },
        function(){
          $(this).children(".tour-item-hover").addClass("tour-hide");
          $(this).children(".tour-item-default").removeClass("hide");
    });
    
	// var myPlace = new google.maps.LatLng(55.754407, 37.625151);
 //    var myOptions = {
 //        zoom: 16,
 //        center: myPlace,
 //        mapTypeId: google.maps.MapTypeId.ROADMAP,
 //        disableDefaultUI: true,
 //        scrollwheel: false,
 //        zoomControl: true
 //    }
 //    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 

 //    var marker = new google.maps.Marker({
	//     position: myPlace,
	//     map: map,
	//     title: "Ярмарка вакансий и стажировок"
	// });

    //  var options = {
    //     $AutoPlay: true,                                
    //     $SlideDuration: 500,                            

    //     $BulletNavigatorOptions: {                      
    //         $Class: $JssorBulletNavigator$,             
    //         $ChanceToShow: 2,                           
    //         $AutoCenter: 1,                            
    //         $Steps: 1,                                  
    //         $Lanes: 1,                                  
    //         $SpacingX: 10,                              
    //         $SpacingY: 10,                              
    //         $Orientation: 1                             
    //     }
    // };

    // var jssor_slider1 = new $JssorSlider$("slider1_container", options);

});