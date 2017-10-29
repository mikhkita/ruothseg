var isDesktop = false,
    isTablet = false,
    isSmallTablet = false,
    isMobile = false;

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

        isDesktop = isTablet = isSmallTablet = isMobile = false;

        if( myWidth > 1152 ){
            isDesktop = true;
        }else if( myWidth > 999 ){
            isTablet = true;
        }else if( myWidth > 767 ){
            isSmallTablet = true;
        }else{
            isMobile = true;
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
        nextArrow: '<div class="b-block"><div class="icon-arrow-right b-video-arrows" aria-hidden="true"></div></div>',
        prevArrow: '<div class="b-block"><div class="icon-arrow-left b-video-arrows" aria-hidden="true"></div></div>',
        speed: 800,
        autoplay: true,
        autoplaySpeed: 3000,
        adaptiveHeight: true
    });

    $('.review-slider').slick({
        dots: false,
        arrows: true,
        nextArrow: '<div class="icon-arrow-right b-rewiews-arrows" aria-hidden="true"></div>',
        prevArrow: '<div class="icon-arrow-left b-rewiews-arrows" aria-hidden="true"></div>',
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        speed: 600,
        autoplay: true,
        autoplaySpeed: 3000,
        variableWidth: true
    });

    $('.b-tour-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: false,
        infinite: false,
        arrows: true,
        speed: 600,
        nextArrow: '<div class="b-block-tour"><div class="icon-arrow-right b-tour-arrows" aria-hidden="true"></div></div>',
        prevArrow: '<div class="b-block-tour"><div class="icon-arrow-left b-tour-arrows hide" aria-hidden="true"></div></div>',
    });

    $('.b-tour-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
        //console.log(nextSlide, currentSlide, slick.slideCount);
        //если виден первый элемент, то скрыть левую стрелку
        if(currentSlide === 0){
            console.log("<-");
            $('.icon-arrow-left').addClass("hide");
        }else{
            $('.icon-arrow-left').removeClass("hide");
        }
        //если виден последний элемент, то скрыть правую стрелку
        if(slick.slideCount - currentSlide === 5){
            console.log("->");
            $('.icon-arrow-right').addClass("hide");
        }else{
            $('.icon-arrow-right').removeClass("hide");
        }
    });

    var menuTimer = null;
    $(".b-menu-cont .b-menu > li > a").hover(function(){
        clearTimeout(menuTimer);
        moveLine($(this).parent());
    }, function(){
        clearTimeout(menuTimer);

        menuTimer = setTimeout(checkMenu, 300);
    });

    function checkMenu(){
        if( $(".b-menu-cont .b-menu > li.active > a").length ){
            moveLine($(".b-menu-cont .b-menu > li.active"));
        }else{
            $(".b-menu-cont .b-line").removeClass("show");
        }
    }

    function moveLine($el){
        $(".b-menu-cont .b-line").addClass("show").css({
            "left" : $el.position().left + parseInt($el.css("padding-left").replace(/\D+/g,"")),
            "width" : $el.width()
        });
    }

    if($('.b-menu-cont .b-menu').length){
        checkMenu();

        var $window = $(window), 
            $target = $(".b-top"),
            $h = $target.offset().top; // Определяем координаты .b-top
        $window.on('scroll', function() {
            // Как далеко вниз прокрутили страницу
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            // Если прокрутили скролл ниже макушки нужного блока, включаем ему фиксацию
            if (scrollTop > $h) {
                $target.addClass("b-top-fixed");
            }else{     
                $target.removeClass("b-top-fixed");
            }
        });
    }

    if($('.foto-grid').length){
        $('.foto-grid').isotope({
            itemSelector: '.grid-item',
        }); 
    }
    
    
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