$(document).ready(function(){

    var isDesktop = false,
    isTablet = false,
    isSmallTablet = false,
    isMobile = false,
    isRetina = retina();

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
        console.log(myHeight);
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

    function retina(){
        var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
            (min--moz-device-pixel-ratio: 1.5),\
            (-o-min-device-pixel-ratio: 3/2),\
            (min-resolution: 1.5dppx)";
        if (window.devicePixelRatio > 1)
            return true;
        if (window.matchMedia && window.matchMedia(mediaQuery).matches)
            return true;
        return false;
    }

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
        responsive: [
            {
              breakpoint: 900,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        ]
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
        responsive: [
            {
              breakpoint: 900,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1
              }
            }
        ]
    });

    $('.b-tour-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
        console.log(slick.slideCount, currentSlide);
        //если виден первый элемент, то скрыть левую стрелку
        if(currentSlide === 0){
            console.log("<-");
            $('.icon-arrow-left').addClass("hide");
        }else{
            $('.icon-arrow-left').removeClass("hide");
        }
        //если виден последний элемент, то скрыть правую стрелку
        if(slick.slideCount - currentSlide === $('.slick-slide.slick-active').length){
            console.log("->hide");
            $('.icon-arrow-right').addClass("hide");
        }else{
            console.log("->show");
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


    var fotoCount = 10,
        fotoLoaded = 0;
    //загрузить первые *fotoCount* элементов
    $('.grid-item').slice(0, fotoCount).each(function(){
        if( isRetina || isMobile || isSmallTablet ){
            src = $(this).children().attr("data-retina-image");
        }else{
            src = $(this).children().attr("data-image");
        }
        var img = new Image();
        img.src = src;
        img.child = $(this).children();
        img.onload = function(){
            this.child.attr("src", this.src);
            this.child.parent().addClass("loaded");
            fotoLoaded++;
            if(fotoLoaded >= fotoCount){
                //показать первые *fotoCount* элементов
                showStartFoto();
                //Грузить остальные
                showNextFoto();
            }
        }

    });

    var delay = 1;
    function showStartFoto(){
        $grid = $('.foto-grid').isotope({
            itemSelector: '.grid-item.loaded',
            masonry: {
                columnWidth: '.grid-item'
            }
        });
        $('.foto-grid').addClass("foto-grid-transform");
        $('.preload-block').addClass("preload-block-static");
        //$('.foto-grid').removeClass('foto-hide').addClass('foto-show');
        $('.loaded').each(function(){
            var el = this;
            setTimeout(function(){
                $(el).removeClass('foto-hide').addClass('foto-show');
                console.log("showStartFoto");
            }, 100 * delay);
            delay++;
        });
    }

    function showNextFoto(){
        setTimeout(function(){
            $('.grid-item.foto-hide').each(function(){
            if( isRetina || isMobile || isSmallTablet ){
                src = $(this).children().attr("data-retina-image");
            }else{
                src = $(this).children().attr("data-image");
            }
            var img = new Image();
            img.src = src;
            img.child = $(this).children();
            img.onload = function(){
                this.child.attr("src", this.src);
                this.child.parent().addClass("loaded");
                fotoLoaded++;
                this.child.parent().removeClass('foto-hide').addClass('foto-show');
                console.log("showNextFoto");
                $grid.isotope( 'appended', this.child.parent() );
                if($('.grid-item.foto-hide').length === 0){
                    $('.preload-block').removeClass("preload-block-static").addClass('foto-hide');
                }
            }
        });
        }, 1000);

        
    }

     $("body").on("click", ".ajax-more", function(){
        console.log("click");
        $.ajax({
            type: 'post',
            url: $(this).attr("href"),
            success: function(html){
                var $html = $(html);

                $(".scroll-to").removeClass("scroll-to");
                $html.find(".b-review").eq(0).addClass("scroll-to");

                console.log($(".b-reviews").find(".b-btn-show-more"));
                $(".b-reviews").find(".b-btn-show-more").remove();
                $(".b-reviews").append($html.html());

                $("body, html").animate({
                    scrollTop : $(".b-review.scroll-to").offset().top - 86 - 16
                }, 300);
                //History.replaceState(null , null, $html.attr("data-url"));
            },
            error: function(){
                alert("Ошибка запроса");
            },
            complete: function(){
                
            }
        });

        return false;
    });
     
    $('.b-header').parallax({
        imageSrc: $('.b-header').attr("data-img"),
        speed: 0.5,
    });

    $('.wrapper').append($('.parallax-mirror'));

    /*if($('.foto-grid').length){
        $('.foto-grid').isotope({
            itemSelector: '.grid-item',
        }); 
    }*/
    
    
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