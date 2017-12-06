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
            }else if(myHeight > resizeHeight){
                //resetHeader();
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

            if(Math.abs(myWidth/myHeight-rotation) > 0.5 || myHeight-prevHeight < 0){
                console.log("resize");
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
            }
            prevHeight = myHeight;
            rotation = myWidth/myHeight;

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
                });
            }
            $('div.tour-item').each(function() {
                $this = $(this);
                $tag = $('<a></a>');
                $tag.addClass("tour-item fancy");
                $tag.attr("href", $this.attr("data-href"));
                $tag.append($this.html());

                $this.replaceWith($tag);
            });

            fancyBind($('.tour-item.fancy'));

            if(!$('.b-hotel-foto-list').hasClass("slick-initialized")){
                $('.b-hotel-foto-list').not('.slick-initialized').slick({
                    dots: true,
                    arrows: false,
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    speed: 600,
                });
            }

            $('.b-team-detail .slick-slide').find(".b-team-detail-info").css("left", 0);

        }else{
            if($('.advantages-slider').hasClass("slick-initialized")){
                $('.advantages-slider').slick('unslick');
                setTimeout(function(){
                    $('.advantages-slider').slick('unslick');
                },100);
            }
            if($('.b-hotel-foto-list').hasClass("slick-initialized")){
                $('.b-hotel-foto-list').slick('unslick');
                $("[data-fancybox]").fancybox();
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

        //выравнивание фото на странице "Проезд"
        if($('.passage-grid-cont').length){
            if(!isMobile){

                if($('.passage-slider').hasClass("slick-initialized")){
                    $('.passage-slider').slick('unslick');
                    $("[data-fancybox]").fancybox();
                }

                //веруть столбцы (если были удалены до этого)
                if($('.passage-grid-cont .passage-grid-column').length === 0){
                    var columns = [2, 3, 3];
                    columns.forEach(function(item, i, arr) {
                        $(':not(.passage-grid-column)>.passage-grid:lt('+item+')').wrapAll('<div class="passage-grid-column">');
                    });
                }

                //расчёт высоты у фото
                $('.passage-grid').each(function(){
                    $(this).css("height", $(this).attr("data-ratio") * $(this).width());
                });

                //высота первого столбца
                var heightColumn = $('.passage-grid-column:first').height(),
                    margin = parseInt($('.passage-grid').css("margin-bottom").replace(/\D/g, ''));

                //выравнивание последнего фото в каждом столбце
                $('.passage-grid-column:not(:eq(0))').each(function(){
                    var heightTop = 0;
                    //найти высоту без последнего фото
                    $(this).children('.passage-grid:not(:last)').each(function(){
                        heightTop += $(this).height() + margin;
                    });

                    $(this).children(".passage-grid:last").css("height", heightColumn - heightTop);
                });
            }else{
                //удалить столбцы (если они есть на странице)
                if($('.passage-grid-cont .passage-grid-column').length){
                    $items = $(".passage-grid");
                    $('.passage-grid-cont').prepend($items);
                    $('.passage-grid-column').remove();

                    $('.passage-grid').each(function(){
                        $(this).css("height", $(this).attr("data-ratio") * $(this).width());
                    });
                }

                if(!$('.passage-slider').hasClass("slick-initialized")){
                    $('.passage-slider').not('.slick-initialized').slick({
                        dots: true,
                        arrows: false,
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        speed: 600,
                        //autoplay: true,
                        //autoplaySpeed: 3000,
                        adaptiveHeight: true,
                    });
                }
            }
        }
    }

    $(window).resize(resize);
    resize();

    if(isRetina && myWidth >= 550){
        $("*[data-retina]").each(function(){
            var $this = $(this),
                img = new Image(),
                src = $this.attr("data-retina");

            img.onload = function(){
                $this.css({
                    "background-image" : "url('"+src+"')"
                });
            };
            img.src = src;
        });
    }

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

    if( typeof autosize == "function" )
        autosize(document.querySelectorAll('textarea'));

    new FastClick(document.body);

    $('.video-slider').slick({
        dots: true,
        arrows: true,
        nextArrow: '<div class="b-block"><div class="icon-arrow-right b-video-arrows" aria-hidden="true"></div></div>',
        prevArrow: '<div class="b-block"><div class="icon-arrow-left b-video-arrows" aria-hidden="true"></div></div>',
        speed: 800,
        autoplay: true,
        autoplaySpeed: 3000,
        adaptiveHeight: true,
        responsive: [
            {
              breakpoint: 768,
              settings: {
                dots: false,
              }
            }
        ]
    });

    $('.review-slider').on('init', function(event, slick){
        $('.review-slider .slick-active').each(function(){
            $(this).addClass("slick-active-copy");
        });
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
        adaptiveHeight: true,
        responsive: [
            {
              breakpoint: 901,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            }
        ]
    });

    $('.review-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        if(slick.options.slidesToShow === 2){
            setTimeout(function(){
                $(".review-item[data-id='"+$(".review-item[data-slick-index='"+currentSlide+"']").attr("data-id")+"']").removeClass("slick-active-copy");
                $(".review-item[data-id='"+$(".review-item[data-slick-index='"+currentSlide+"']").attr("data-id")+"']").next().removeClass("slick-active-copy");
                $(".review-item[data-id='"+$(".review-item[data-slick-index='"+nextSlide+"']").attr("data-id")+"']").addClass("slick-active-copy");
                $(".review-item[data-id='"+$(".review-item[data-slick-index='"+nextSlide+"']").attr("data-id")+"']").next().addClass("slick-active-copy");
                deleteGallery();
            },10 );
        }else{
            setTimeout(function(){
                $(".review-item[data-id='"+$(".review-item[data-slick-index='"+currentSlide+"']").attr("data-id")+"']").removeClass("slick-active-copy");
                $(".review-item[data-id='"+$(".review-item[data-slick-index='"+nextSlide+"']").attr("data-id")+"']").addClass("slick-active-copy");
                deleteGallery();
            },10 );
        }
    });

    //Удалить галереи в копиях элементов
    function deleteGallery(){
        /*$('.slick-cloned').each(function(){
            $(this).find(".fancy-gallary").attr("data-fancybox", "");
        });*/
        $('.review-slider .slick-slide').each(function(){
            $(this).find(".fancy-gallary").attr("data-fancybox", "");
        });
        $('.review-slider .slick-active').each(function(){
            console.log("++++",$(this));
            var gallary = $(this).find(".fancy-gallary").attr("data-gallery");
            $(this).find(".fancy-gallary").attr("data-fancybox", gallary);
        });
    }

    $('.b-tour-slider').on('init', function(event, slick){
        $(this).removeClass("hide");

        setTimeout(function(){

            $('.b-tour-slider').slick('slickGoTo', parseInt($('.b-tour-slider li.active').attr("data-slick-index")), true);

            var border = Math.floor(slick.options.slidesToShow/2);
            //console.log(slick.currentSlide, slick.slideCount, border);

            if(slick.currentSlide >= border && slick.currentSlide < slick.slideCount - border){
                $('.b-tour-slider').slick('slickGoTo', parseInt($('.b-tour-slider li.active').attr("data-slick-index")), true);
                if(slick.options.slidesToShow === 2 && slick.currentSlide !== 0){
                    $('.b-tour-slider').slick('slickNext');
                }
            }else if(slick.currentSlide >= border - 1 && slick.currentSlide < slick.slideCount - (border - 1)){
                if(slick.currentSlide > border - 1){
                    $('.b-tour-slider').slick('slickGoTo', parseInt($('.b-tour-slider li.active').attr("data-slick-index")) - 1, true);
                }else{
                    $('.b-tour-slider').slick('slickGoTo', parseInt($('.b-tour-slider li.active').attr("data-slick-index")) + 1, true);
                }
                if(slick.options.slidesToShow === 2 && slick.currentSlide !== 1){
                    $('.b-tour-slider').slick('slickNext');
                }
            }else{
                if(slick.currentSlide > border - 2){
                    $('.b-tour-slider').slick('slickGoTo', parseInt($('.b-tour-slider li.active').attr("data-slick-index")) - 2, true);
                }else{
                    $('.b-tour-slider').slick('slickGoTo', parseInt($('.b-tour-slider li.active').attr("data-slick-index")) + 2, true);
                }
                if(slick.options.slidesToShow === 2 && slick.currentSlide !== 2){
                    $('.b-tour-slider').slick('slickNext');
                }
            }

            //если виден первый элемент, то скрыть левую стрелку
            if(slick.currentSlide <= border){
                console.log("<-hide");
                $('.b-block-tour .icon-arrow-left').addClass("hide");
            }else{
                console.log("<-show");
                $('.b-block-tour .icon-arrow-left').removeClass("hide");
            }

            if(slick.options.slidesToShow === 2){
                border--;
            }

            //если виден последний элемент, то скрыть правую стрелку
            if(slick.slideCount - slick.currentSlide <= border + 1){
                console.log("->hide");
                $('.b-block-tour .icon-arrow-right').addClass("hide");
            }else{
                console.log("->show");
                $('.b-block-tour .icon-arrow-right').removeClass("hide");
            }
        },10);
    });

    if($('.b-tour li').length > 5){
        console.log("11111111");
        $('.b-tour-slider').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            dots: false,
            infinite: false,
            arrows: true,
            centerMode: true,
            centerPadding: '0px',
            swipe: false,
            speed: 600,
            nextArrow: '<div class="b-block-tour"><div class="icon-arrow-right b-tour-arrows" aria-hidden="true"></div></div>',
            prevArrow: '<div class="b-block-tour"><div class="icon-arrow-left b-tour-arrows" aria-hidden="true"></div></div>',
            responsive: [
                {
                  breakpoint: 901,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 551,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                }
            ]
        });
    }else if($('.b-tour li').length > 3 && $('.b-tour li').length <= 5 && myWidth <= 900){
        console.log("22222");
        $('.b-tour-slider').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: false,
            infinite: false,
            arrows: true,
            centerMode: true,
            centerPadding: '0px',
            swipe: false,
            speed: 600,
            nextArrow: '<div class="b-block-tour"><div class="icon-arrow-right b-tour-arrows" aria-hidden="true"></div></div>',
            prevArrow: '<div class="b-block-tour"><div class="icon-arrow-left b-tour-arrows" aria-hidden="true"></div></div>',
            responsive: [
                {
                  breakpoint: 551,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                }
            ]
        });
        
    }else if($('.b-tour li').length === 3 && myWidth <= 550){
        console.log("333333");
        $('.b-tour-slider').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: false,
            infinite: false,
            arrows: true,
            centerMode: true,
            centerPadding: '0px',
            swipe: false,
            speed: 600,
            nextArrow: '<div class="b-block-tour"><div class="icon-arrow-right b-tour-arrows" aria-hidden="true"></div></div>',
            prevArrow: '<div class="b-block-tour"><div class="icon-arrow-left b-tour-arrows" aria-hidden="true"></div></div>',
        });
    }else{
        console.log("4444");
        $('.b-tour').removeClass("hide").addClass("full-width");
    }

    $('.b-tour-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){

        var border = Math.floor(slick.options.slidesToShow/2);
        console.log(currentSlide, slick.slideCount, border);

        if(slick.options.slidesToShow === 2 && currentSlide === 0){
            $('.b-block-tour .icon-arrow-left').addClass("hide");
            return;
        }
    
        //если виден первый элемент, то скрыть левую стрелку
        if(currentSlide <= border){
            console.log("<-hide");
            $('.b-block-tour .icon-arrow-left').addClass("hide");
        }else{
            console.log("<-show");
            $('.b-block-tour .icon-arrow-left').removeClass("hide");
        }

        if(slick.options.slidesToShow === 2){
            border--;
        }

        //если виден последний элемент, то скрыть правую стрелку
        if(slick.slideCount - currentSlide <= border + 1){
            console.log("->hide");
            $('.b-block-tour .icon-arrow-right').addClass("hide");
        }else{
            console.log("->show");
            $('.b-block-tour .icon-arrow-right').removeClass("hide");
        }
    });

    var teamID = 0;
    $('.team-slider li').each(function(){
        $(this).attr("data-slick-id", teamID);
        teamID++;
    });

    $('.team-slider').on('init', function(slick){
        $('.team-slider li.slick-active').addClass("slick-active-new");
        $('.team-slider li.slick-current').addClass("slick-current-new");
    });

    if($('.b-team-list li').length < 9){
        $('.team-slider').slick({
            dots: false,
            arrows: true,
            infinite: true,
            nextArrow: '<div class="b-block-team b-block-five-slides"><div class="icon-arrow-right b-team-arrows" aria-hidden="true"></div></div>',
            prevArrow: '<div class="b-block-team b-block-five-slides"><div class="icon-arrow-left b-team-arrows" aria-hidden="true"></div></div>',
            slidesToShow: 5,
            slidesToScroll: 1,
            swipe: false,
            speed: 600,
            centerMode: true,
            variableWidth: true,
            focusOnSelect: true,
            asNavFor: '.team-detail-slider',
            responsive: [
                {
                  breakpoint: 1096,
                  settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                  }
                }
            ]
        });
    }else{
        $('.team-slider').slick({
            dots: false,
            arrows: true,
            infinite: true,
            nextArrow: '<div class="b-block-team"><div class="icon-arrow-right b-team-arrows" aria-hidden="true"></div></div>',
            prevArrow: '<div class="b-block-team"><div class="icon-arrow-left b-team-arrows" aria-hidden="true"></div></div>',
            slidesToShow: 7,
            slidesToScroll: 1,
            swipe: false,
            speed: 600,
            centerMode: true,
            variableWidth: true,
            focusOnSelect: true,
            asNavFor: '.team-detail-slider',
            responsive: [
                {
                  breakpoint: 1096,
                  settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                  }
                }
            ]
        });
    }

    $('.team-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        setTimeout(function(){
            $('.team-slider li:not(.slick-current)').each(function(){
                var dataID = $(this).attr("data-slick-id");
                $('.team-slider').find("[data-slick-id='"+dataID+"']").removeClass("slick-current-new");
            });
            $('.team-slider .slick-current').each(function(){
                var dataID = $(this).attr("data-slick-id");
                $('.team-slider').find("[data-slick-id='"+dataID+"']").addClass("slick-current-new");
            });
            $('.team-slider li:not(.slick-active)').each(function(){
                var dataID = $(this).attr("data-slick-id");
                $('.team-slider').find("[data-slick-id='"+dataID+"']").removeClass("slick-active-new");
            });
            $('.team-slider li.slick-active').each(function(){
                var dataID = $(this).attr("data-slick-id");
                $('.team-slider').find("[data-slick-id='"+dataID+"']").addClass("slick-active-new");
            });
        },10);
    });

    var detailID = 0;
    $('.team-detail-slider .b-team-wrap').each(function(){
        $(this).attr("data-slick-id", detailID);
        detailID++;
    });

    $('.team-detail-slider').on('init', function(slick){
        $('.team-detail-slider .slick-center').addClass("slick-center-new slick-center-opacity");
    });

    $('.team-detail-slider').slick({
        dots: false,
        arrows: true,
        nextArrow: '<div class="b-block"><div class="icon-arrow-right b-arrows-team-detail" aria-hidden="true"></div></div>',
        prevArrow: '<div class="b-block"><div class="icon-arrow-left b-arrows-team-detail" aria-hidden="true"></div></div>',
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 600,
        centerMode: true,
        variableWidth: true,
        focusOnSelect: true,
        cssEase: 'cubic-bezier(.19,.46,.35,1)',
        asNavFor: '.team-slider',
        /*responsive: [
            {
              breakpoint: 900,
              settings: {
                //slidesToShow: 1,
                //slidesToScroll: 1
              }
            }
        ]*/
    });

    $('.team-detail-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        if(currentSlide !== nextSlide){
            $('.team-detail-slider .slick-slide:not(.slick-center)').each(function(){
                var dataID = $(this).attr("data-slick-id");
                $('.team-detail-slider').find("[data-slick-id='"+dataID+"']").removeClass("slick-center-new slick-center-opacity");
            });
            setTimeout(function(){
                $('.team-detail-slider .slick-center').each(function(){
                    var dataID = $(this).attr("data-slick-id");
                    $('.team-detail-slider').find("[data-slick-id='"+dataID+"']").addClass("slick-center-opacity");
                });
            }, 10);
        }
    });

    $('.team-detail-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
        $('.team-detail-slider .slick-center').each(function(){
            var dataID = $(this).attr("data-slick-id");
            $('.team-detail-slider').find("[data-slick-id='"+dataID+"']").addClass("slick-center-new");
        });
    });

    $('.b-team-detail .slick-slide').hover(
        function(){
            if($(this).prev().hasClass("slick-center") && $(this).prev().hasClass("slick-active")){
                $(this).find(".b-team-detail-item").addClass("hover-slide");
                $(".icon-arrow-right").addClass("hover-arrow");
            }
            if($(this).next().hasClass("slick-center") && $(this).next().hasClass("slick-active")){
                $(this).find(".b-team-detail-item").addClass("hover-slide");
                $(".icon-arrow-left").addClass("hover-arrow");
            }
        },
        function(){
            $(this).find(".b-team-detail-item").removeClass("hover-slide");
            $(".icon-arrow-right, .icon-arrow-left").removeClass("hover-arrow");
    });

    $(".icon-arrow-left.b-arrows-team-detail").hover(function(){
        $('.slick-center').prev().children(".b-team-detail-item").addClass("hover");
    }, function(){
        $('.slick-center').prev().children(".b-team-detail-item").removeClass("hover");
    }).click(function(){
        $('.slick-center').prev().children(".b-team-detail-item").removeClass("hover");
    });

    $(".icon-arrow-right.b-arrows-team-detail").hover(function(){
        $('.slick-center').next().children(".b-team-detail-item").addClass("hover");
    }, function(){
        $('.slick-center').next().children(".b-team-detail-item").removeClass("hover");
    }).click(function(){
        $('.slick-center').next().children(".b-team-detail-item").removeClass("hover");
    });

    $("body").on("mousemove", ".b-team-detail .slick-center", function(e){
        if(!isMobile){
            var offset = $(this).offset();
            var relativeX = (e.pageX - offset.left);
            var relativeY = (e.pageY - offset.top);
            if(relativeX > $(this).width() / 2){
                $('.b-team-detail .slick-slide').find(".b-team-detail-info").css("left", 0);
            }else{
                $('.b-team-detail .slick-slide').find(".b-team-detail-info").css("left", "50%");
            }
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
            "width" : $el.children().width()
        });
    }

    if($('.b-content-main').length){
        var $window = $(window),
            $targetMain = $(".b-content-main"),
            $hMain = $targetMain.offset().top;
        $window.on('scroll', function() {
            // Как далеко вниз прокрутили страницу
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            // Если прокрутили скролл ниже макушки нужного блока, включаем ему фиксацию
            if (scrollTop > $hMain){
                $('.b-top').removeClass("b-top-hide").addClass("b-top-fixed");
            }else{
                $('.b-top').addClass("b-top-hide").removeClass("b-top-fixed");
            }
            $targetMain = $(".b-content-main"),
            $hMain = $targetMain.offset().top;
        });
    }

    if($('.b-content').length){
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
    var fotoInPage = $('.foto-grid .grid-item').length;
    if(fotoInPage <= fotoCount){
        $('.foto-grid .grid-item').each(function(){
            src = $(this).children().attr("src");
            var img = new Image();
            img.src = src;
            img.child = $(this).children();
            img.onload = function(){
                this.child.attr("src", this.src);
                this.child.parent().addClass("loaded");
                fotoLoaded++;
                if(fotoLoaded === fotoInPage){
                    //показать первые *fotoCount* элементов
                    showStartFoto();
                    $('.preload-block').removeClass("preload-block-static").addClass('foto-hide');
                }
            }

        });
    }else{
        $('.foto-grid .grid-item').slice(0, fotoCount).each(function(){
            src = $(this).children().attr("src");
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
    }

    var delay = 1;
    function showStartFoto(){
        $('.foto-grid').removeClass("grid-hidden");
        $grid = $('.foto-grid').isotope({
            percentPosition: true,
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
            src = $(this).children().attr("src");
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

                fancyBind($('.fancy'));

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
            typeSpeed: 30,
            backSpeed: 10,
            backDelay: 1500,
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

    $('.chosen-container').on('click', function(){
        $('.chosen-container').children('.chosen-single').removeClass("error");
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

    function fancyBind($selector){
        $selector.each(function(){
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
    }

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