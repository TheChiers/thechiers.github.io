(function($){
"use strict";

    var configuration = {
        flickr : {
            userId: '20917376@N04',
            limit: 9
        },
        slyScroll : {
            horizontal: false,
            itemNav: 'top',
            smart: 1,
            activateOn: 'click',
            mouseDragging: 0,
            touchDragging: 1,
            releaseSwing: 1,
            startAt: 0,
            scrollBy: 100,
            speed: 450,
            elasticBounds: 1,
            easing: 'swing',
            dragHandle: 1,
            dynamicHandle: 1,
        }
    }

    $(document).ready(function(){
        // Cached DOM elements;
        var body = $('#body'),
            leftMenu = $('#left-menu'),
            rightMenu = $('#right-menu'),
            wrapper = $('#wrapper'),
            imgList = $("#img-list"),
            oneTimeSlider = $('.one-time-slider', '#main'),
            btnShare = $('#btn-share'),
            socialList = $('#social-list'),
            oneCol = $("li .one-col", "#col-list"),
            twoCol = $("li .two-col", "#col-list"),
            threeCol = $("li .three-col", "#col-list"),
            opener = $('#nav li > .opener'),
            photoGallery = $('#photo-gallery');


        var isLeftOpened = false,
            isRightOpened = false,
            initLeftSidebar,
            initRightSidebar,
            sly;

        $('#flickr-photo-list').jflickrfeed({
            limit: configuration.flickr.limit,
            qstrings: {
                id: configuration.flickr.userId
            },
            itemTemplate: 
                '<li>' +
                        '<img src="{{image_s}}" alt="{{title}}" />' +
                '</li>'
        });

        var getUrlParameter = function(sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        };

        var closeAll = function() {
            body.removeClass('sidebar-open sidebar-right-open sidebar-left-open');
        };

        photoGallery.slick({
            infinite: true,
            initialSlide: parseInt(getUrlParameter('slide'), 10) || 0
        });
            
        leftMenu.on('click', function(){
            closeAll();
            
            if(!isLeftOpened){
                body.addClass('sidebar-open sidebar-left-open');
            }
            
            isLeftOpened = !isLeftOpened;
            isRightOpened = false;

            return false;
        });
            
        rightMenu.on('click', function(){
            closeAll();    

            setTimeout(initRightSidebar, 800);

            if(!isRightOpened)
            body.addClass('sidebar-open sidebar-right-open');
            
            isRightOpened = !isRightOpened;
            isLeftOpened = false;

            return false;
        });
            
        wrapper.on('click', function(){
            isRightOpened = false;
            isLeftOpened = false;
            
            closeAll();
        });

        oneTimeSlider.slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true
        });

        oneCol.on('click', function(){
            imgList.addClass("one-column");
            imgList.removeClass("two-column");
            imgList.removeClass("three-column");

            return false;
        });

        twoCol.on('click', function(){
            imgList.addClass("two-column");
            imgList.removeClass("one-column");
            imgList.removeClass("three-column");

            return false;
        });

        threeCol.on('click', function(){
            imgList.addClass("three-column");
            imgList.removeClass("one-column");
            imgList.removeClass("two-column");

            return false;
        });

        $("a", "#col-list").on('click', function(){
            $('.col-list a').removeClass("active");
            $(this).toggleClass("active");

            return false;
        });

        opener.on('click', function(){
            $(this).closest('#nav li').find('.drop-nav').slideToggle(500, function(){
                $(this).closest('#nav li').toggleClass('active');
            });

            setTimeout(initLeftSidebar, 800);

            return false;
        });

        btnShare.on('click', function(){
            $(this).toggleClass("active");
            socialList.toggle();
            socialList.toggleClass("active");

            return false;
        });

        $(window).resize(function(){
            var height = $(this).height() - $("#header").height()
            $('#photo-gallery div').height(height);    
        });

        $(window).resize(function(){
            var height = $(this).height()
            $('#sidebar-right').height(height);
            
            initLeftSidebar();
            initRightSidebar();
        });

        $(window).load(function(){
            initLeftSidebar();
            initRightSidebar();
        });

        $('input, textarea').placeholder();

        initLeftSidebar = function() {
            if('sly' in $.fn){
                var sidebar = $('.scrollable', '#sidebar-left');

                for (var i = 0 ; i < sidebar.length ; i++) {
                    var element = sidebar[i];
                    var $frame = $(element).find('.scrollbar-text');
                    var $wrap = $frame.parent();
                    $frame.sly(
                        $.extend(
                            { scrollBar: $wrap.find('.scrollbar') },
                            configuration.slyScroll
                            )
                        );

                    $frame.sly('reload');
                    
                    var scrolText = parseInt($('.scrollbar-text', element).outerHeight(), 10);
                    var containerText = parseInt($(element).outerHeight(), 10);
                    
                    if (scrolText>=containerText) {
                        $('.scrollbar', element).show();
                    } else {
                        $('.scrollbar', element).hide();
                    }
                };
            }
        };

        initRightSidebar = function() {
            if('sly' in $.fn){
                var sidebar = $('.scrollable02', '#sidebar-right');

                for (var i = 0 ; i < sidebar.length ; i++) {
                    var element = sidebar[i];
                    var $frame = $(element).find('.scrollbar-text02');
                    var $wrap = $frame.parent();
                    $frame.sly(
                        $.extend(
                            { scrollBar: $wrap.find('.scrollbar02') },
                            configuration.slyScroll
                            )
                        );

                    $frame.sly('reload');
                    
                    var scrolText = parseInt($('.scrollbar-text02', element).outerHeight(), 10);
                    var containerText = parseInt($(element).outerHeight(), 10);
                    
                    if (scrolText>=containerText) {
                        $('.scrollbar02', element).show();
                    } else {
                        $('.scrollbar02', element).hide();
                    }
                };
            }
        };
       
        $(window).resize();
        initLeftSidebar();
        initRightSidebar(); 
    });
}(window.jQuery || window.$ || jQuery || $));