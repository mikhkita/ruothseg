$(document).ready(function(){

    var isDesktop = false,
    isTablet = false,
    isSmallTablet = false,
    isMobile = false,
    rotation = 0,
    prevHeight = 10000,
    isRetina = retina();

    var resizeHeight = 744,
        minHeight = 600;

    function resetHeader(){
        $('.b-main-header').css({
            "margin-bottom": "",
            "height": "",
        });
        $('.header-back').css("height", "");
        $('.b-header-block').css({
            "top": "",
            "padding-top": "",
            "padding-bottom": "",
            "height": "",
        });
        $('.b-header-content').css("margin-bottom", "");
    }

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

        if( myWidth > 1199 ){
            isDesktop = true;
        }else if( myWidth > 767 ){
            isTablet = true;
        }else{
            isMobile = true;
        }

        /*if($(".b-main-header").length && isMobile){
            if( Math.abs(myWidth/myHeight-rotation) > 0.5 || myHeight-prevHeight < 0 || !isMobile ){
                $(".b-main-header, .header-back, .b-header-block").css({
                    "height" : myHeight - $(".b-main-header").height();
                });
            }
            prevHeight = myHeight;
            rotation = myWidth/myHeight;
        }*/

        //сжатие отступов в хедере
        if($(".b-main-header").length && !isMobile){
            console.log(myHeight);

            resetHeader();

            if(myHeight <= resizeHeight && myHeight >= minHeight){
                var paddingBottom = 70;
                var topHeight = myHeight - resizeHeight + 60 > 30 ? myHeight - resizeHeight + 60 : 0;
                $('.b-header-block').css("top", topHeight);

                //console.log(myHeight);
                //console.log(resizeHeight);
                if(topHeight === 0){
                    paddingBottom = 0;
                    paddings = myHeight/3 - resizeHeight/3 + 85 > 40 ? myHeight/3 - resizeHeight/3 + 85 : 40;
                    $('.b-header-block').css({
                        "padding-top": paddings,
                        "padding-bottom": paddings,
                        "height": "100%",
                    });
                    $('.b-header-content').css("margin-bottom", paddings/1.2);
                    $('.b-main-header').css("margin-bottom", topHeight);
                }

                var blockHeight = myHeight > minHeight ? resizeHeight - topHeight : minHeight;
                $('.header-back').css("height", myHeight - paddingBottom);
                /*$('.header-back').addClass("compress-header");
                $('.b-header-block').addClass("compress-header");
                $('.b-header-content').addClass("compress-header");*/
            }else if(myHeight > resizeHeight){
                
                //resetHeader();

                /*$('.header-back').removeClass("compress-header");
                $('.b-header-block').removeClass("compress-header");
                $('.b-header-content').removeClass("compress-header");*/
            }else if(myHeight < minHeight){
                $('.b-header-block').css("top", 0);
                $('.header-back').css("height", minHeight);
                $('.b-header-block').css({
                    "padding-top": 40,
                    "padding-bottom": 40,
                    "height": "100%",
                });
                $('.b-header-content').css("margin-bottom", 25);
                $('.b-main-header').css("margin-bottom", 0);  
            }
        }

        if($(".b-main-header").length && isMobile){
            if(myHeight > 680){
                $(".b-main-header, .header-back, .b-header-block").css({
                    "height" : 680
                });
            }else if(myHeight <= 680 && myHeight >= 500){
                $(".b-main-header, .header-back, .b-header-block").css({
                    "height" : myHeight
                });
            }else if(myHeight < 500){
                $(".b-main-header, .header-back, .b-header-block").css({
                    "height" : 500
                });
            }

            $('.b-header-block').css({
                "padding-top": "",
                "padding-bottom": "",
            });
        }

        if(isMobile){
            if(!$('.advantages-slider').hasClass("slick-initialized")){
                $('.advantages-slider').not('.slick-initialized').slick({
                    dots: false,
                    arrows: true,
                    nextArrow: '<div class="icon-arrow-right b-advantages-arrows" aria-hidden="true"></div>',
                    prevArrow: '<div class="icon-arrow-left b-advantages-arrows" aria-hidden="true"></div>',
                    infinite: true,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    speed: 600,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    responsive: [
                        {
                          breakpoint: 620,
                          settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                          }
                        }
                    ]
                }).addClass("slider-on");
            }
            $('div.tour-item').each(function() {
                $this = $(this);
                $tag = $('<a></a>');
                $tag.addClass("tour-item");
                $tag.attr("href", $this.attr("data-href"));
                $tag.append($this.html());

                $this.replaceWith($tag);
            });

        }else{
            if($('.advantages-slider').hasClass("slick-initialized")){
                $('.advantages-slider').slick('unslick');
            }
            $('a.tour-item').each(function() {
                $this = $(this);
                $tag = $('<div></div>');
                $tag.addClass("tour-item");
                $tag.attr("data-href", $this.attr("href"));
                $tag.append($this.html());

                $this.replaceWith($tag);
            });
        }

        if($('.b-menu-cont .b-menu').length && !isMobile){
            checkMenu();
        }

        $('.call-bubble').addClass("bubble-hide");
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

    if(isMobile){
        //пропустить анимацию b-block-advantages на мобиле
        $('.advantage-item').each(function(){
            $(this).addClass("fadeIn-show");
        });
    }

    new FastClick(document.body);

    $('.video-slider').slick({
        dots: true,
        arrows: true,
        nextArrow: '<div class="b-block"><div class="icon-arrow-right b-video-arrows" aria-hidden="true"></div></div>',
        prevArrow: '<div class="b-block"><div class="icon-arrow-left b-video-arrows" aria-hidden="true"></div></div>',
        speed: 800,
        //autoplay: true,
        autoplaySpeed: 3000,
        adaptiveHeight: true,
        responsive: [
            {
              breakpoint: 767,
              settings: {
                dots: false,
              }
            }
        ]
    });

    $('.review-slider').on('init', function(event, slick){
        deleteGallery();
    });

    $('.review-slider').slick({
        dots: false,
        arrows: true,
        nextArrow: '<div class="icon-arrow-right b-rewiews-arrows" aria-hidden="true"></div>',
        prevArrow: '<div class="icon-arrow-left b-rewiews-arrows" aria-hidden="true"></div>',
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        speed: 600,
        //autoplay: true,
        autoplaySpeed: 3000,
        adaptiveHeight: true,
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

    $('.review-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        if(slick.options.slidesToShow === 2){
            setTimeout(function(){
                $(".review-item[data-id='"+$(".review-item[data-slick-index='"+currentSlide+"']").attr("data-id")+"']").removeClass("slick-active");
                $(".review-item[data-id='"+$(".review-item[data-slick-index='"+currentSlide+"']").attr("data-id")+"']").next().removeClass("slick-active");
                $(".review-item[data-id='"+$(".review-item[data-slick-index='"+nextSlide+"']").attr("data-id")+"']").addClass("slick-active");
                $(".review-item[data-id='"+$(".review-item[data-slick-index='"+nextSlide+"']").attr("data-id")+"']").next().addClass("slick-active");
            },10 );
        }else{
            setTimeout(function(){
                $(".review-item[data-id='"+$(".review-item[data-slick-index='"+currentSlide+"']").attr("data-id")+"']").removeClass("slick-active");
                $(".review-item[data-id='"+$(".review-item[data-slick-index='"+nextSlide+"']").attr("data-id")+"']").addClass("slick-active");
            },10 );
        }
        deleteGallery();
    });

    //Удалить галереи в копиях элементов
    function deleteGallery(){
        $('.slick-cloned').each(function(){
            $(this).find(".fancy-gallary").attr("data-fancybox", "");
        });
    }

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
            },
            {
              breakpoint: 550,
              settings: {
                slidesToShow: 2,
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

    if($('.b-content-main').length){
        var $window = $(window);

        $window.on('scroll', function() {
            var $targetMain = $(".b-content-main"),
                $hMain = $targetMain.offset().top;
            // Как далеко вниз прокрутили страницу
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            // Если прокрутили скролл ниже макушки нужного блока, включаем ему фиксацию
            if (scrollTop > $hMain) {
                $('.b-top').removeClass("b-top-hide");
            }else{     
                $('.b-top').addClass("b-top-hide");
            }
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

    /*if($('.passage-grid').length){
        $('.passage-grid').isotope({
            //percentPosition: true,
            itemSelector: '.grid-item',
            masonry: {
                columnWidth: '.grid-item'
            }
        });
    }*/

    var fotoCount = 10,
        fotoLoaded = 0;
    //загрузить первые *fotoCount* элементов
    $('.foto-grid .grid-item').slice(0, fotoCount).each(function(){
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
                $(".b-reviews").find(".b-btn-show-more").parents(".b-center-block").remove();
                $(".b-reviews").append($html.html());

                readMoreShow();

                $(".fancy").each(function(){
                    var $popup = $($(this).attr("href")),
                        $this = $(this);
                    $this.fancybox({
                        padding : 0,
                        content : $popup,
                        helpers: {
                            overlay: {
                                locked: true 
                            }
                        },
                        beforeShow: function(){
                            $(".fancybox-wrap").addClass("beforeShow");
                            $popup.find(".custom-field").remove();
                            if( $this.attr("data-value") ){
                                var name = getNextField($popup.find("form"));
                                $popup.find("form").append("<input type='hidden' class='custom-field' name='"+name+"' value='"+$this.attr("data-value")+"'/><input type='hidden' class='custom-field' name='"+name+"-name' value='"+$this.attr("data-name")+"'/>");
                            }
                            if( $this.attr("data-beforeShow") && customHandlers[$this.attr("data-beforeShow")] ){
                                customHandlers[$this.attr("data-beforeShow")]($this);
                            }
                        },
                        afterShow: function(){
                            $(".fancybox-wrap").removeClass("beforeShow");
                            $(".fancybox-wrap").addClass("afterShow");
                            if( $this.attr("data-afterShow") && customHandlers[$this.attr("data-afterShow")] ){
                                customHandlers[$this.attr("data-afterShow")]($this);
                            }
                            $popup.find("input[type='text'],input[type='number'],textarea").eq(0).focus();
                        },
                        beforeClose: function(){
                            $(".fancybox-wrap").removeClass("afterShow");
                            $(".fancybox-wrap").addClass("beforeClose");
                            if( $this.attr("data-beforeClose") && customHandlers[$this.attr("data-beforeClose")] ){
                                customHandlers[$this.attr("data-beforeClose")]($this);
                            }
                        },
                        afterClose: function(){
                            $(".fancybox-wrap").removeClass("beforeClose");
                            $(".fancybox-wrap").addClass("afterClose");
                            if( $this.attr("data-afterClose") && customHandlers[$this.attr("data-afterClose")] ){
                                customHandlers[$this.attr("data-afterClose")]($this);
                            }
                        }
                    });
                });

                $('.b-btn-read-more').on('click', function(){
                    //скопировать инфу в popup
                    $("#b-popup-review").find(".b-review").remove();
                    $(this).parents(".b-review").clone().prependTo("#b-popup-review");
                    //удалить копии фотографий Fancybox
                    $gallery = $('#b-popup-review').find(".fancy-gallary");
                    var galleryName = $gallery.eq(0).attr("data-fancybox");
                    $gallery.attr("href", "#").removeAttr("data-fancybox");
                    $('#b-popup-review .foto-with-tour.fancy-gallary').on('click', function(e){
                        e.preventDefault();
                        $('.foto-with-tour[data-fancybox="'+galleryName+'"]').click();
                    });
                });

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

    if($('#typed-show').length){
        var typed = new Typed("#typed-show", {
            stringsElement: '#typed-strings',
            typeSpeed: 50,
            backSpeed: 50,
            backDelay: 2500,
            fadeOut: true,
            loop: true
        });
    }

    $('.b-btn-call').on('click', function(){
        $('.call-bubble').toggleClass("bubble-hide");
    });

    $(document).on('click', function(e){
        var container = $('.call-bubble, .b-mobile-call');
        if (container.has(e.target).length === 0){
            container.addClass("bubble-hide");
        }
    });

    $(document).on("touchstart", ".outer-nav a", function(event) {
        $(this).addClass("nav-touch");
    });

    $(document).on("touchend touchmove", ".outer-nav a", function(event) {
        $(this).removeClass("nav-touch");
    });

    //увеличить количество
    $('.add-count').on('click', function(){
        $input = $('.persons-count');
        var count = parseInt($input.val()) + 1;
        count = count > 99 || isNaN(count) === true ? 99 : count;
        $input.val(count);
        $input.change();
    });

    //уменьшить количество
    $('.reduce-count').on('click', function(){
        $input = $('.persons-count');
        var count = parseInt($input.val()) - 1;
        count = count < 1 || isNaN(count) === true ? 1 : count;
        $input.val(count);
        $input.change();
    });

    $('.persons-count, .b-popup .select-tour').on('change input', function(){
        if($('.persons-count').val() != "" && $('.b-popup .select-tour').val() != ""){
            var discount = 0;
            var price = parseInt($(".b-popup .select-tour option:selected").attr("data-price"));
            var persons = parseInt($('.persons-count').val());
            if(parseInt($('.persons-count').val()) >= 4){
                discount = persons * price * 0.05;
                $('.b-btn-discount').removeClass("hide");
            }else{
                $('.b-btn-discount').addClass("hide");
            }
            var res = price * persons - discount;
            res = String(res.toFixed(0)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
            $('.total-cost').text(res + ' руб.');
        }else{
            $('.total-cost').text('0 руб.');
            $('.b-btn-discount').addClass("hide");
        }
    });

    $('.persons-count').change();

    //скрывать кнопку "Читать полностью"
    if($('.b-reviews').length){
        readMoreShow();
    }

    function readMoreShow(){
        $('.b-review').each(function() {
            var wrapHeight = $(this).find(".b-review-wrap").height();
            var textHeight = $(this).find(".b-review-text").height();
            if(wrapHeight < textHeight){
                $(this).find(".b-btn-read-more").removeClass("hide");
            }
        });
    }

    $('.b-btn-read-more').on('click', function(){
        //скопировать инфу в popup
        $("#b-popup-review").find(".b-review").remove();
        $(this).parents(".b-review").clone().prependTo("#b-popup-review");
        //удалить копии фотографий Fancybox
        $gallery = $('#b-popup-review').find(".fancy-gallary");
        var galleryName = $gallery.eq(0).attr("data-fancybox");
        $gallery.attr("href", "#").removeAttr("data-fancybox");
        $('#b-popup-review .foto-with-tour.fancy-gallary').on('click', function(e){
            e.preventDefault();
            $('.foto-with-tour[data-fancybox="'+galleryName+'"]').click();
        });
    });

    $('.select-tour').chosen({
        width: '50%',
        disable_search_threshold: 10000
    });

    $("[data-fancybox]").fancybox({
        arrows : true,
        animationEffect : "zoom",
        transitionEffect : "zoom-in-out",
        buttons : [
            'slideShow',
            'fullScreen',
            'thumbs',
            'download',
        ],
    });

    //клик по кнопке "Забронировать тур" в конкретном туре
    $('.b-btn-tour-item').on('click', function(){
        var tourID = $(this).parents(".tour-item").attr("data-id");
        $(".b-popup .select-tour option[value=" + tourID + "]").prop('selected', true).trigger("chosen:updated");
        $('.persons-count').change();
    });

    //клик по кнопке "Забронировать тур" в хедере
    $('.b-btn-tour').on('click', function(){
        $(".b-popup .select-tour option[value='']").prop('selected', true).trigger("chosen:updated");
        $('.persons-count').change();
    });



    /*$('.b-header').parallax({
        imageSrc: $('.b-header').attr("data-img"),
        speed: 0.5,
    });*/

    /*if($('.b-header').length){
         $('.wrapper').append($('.parallax-mirror'));
    }*/

    /*$(window).resize(function(){
        console.log("234");
        $('.b-header-block').parallax({
            imageSrc: 'i/header-block.jpg',
            speed: 0.5,
        });
    });*/

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