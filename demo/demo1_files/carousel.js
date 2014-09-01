// for home page, game slide show
(function ($) {
    var defaults =
    {
        // the duration of one slide show if not hover  (in sec)
        duration: 10,

        // the move distance after click prev or next
        movewidth: 960,

        // one item width
        itemwidth: 245,

        // tags container
        tagsel: ".tagsCon"
    };

    $.fn.carousel = function (option) {
        var settings = $.extend(!0, {}, defaults, option);
        return this.each(function () {
            var $container = $(this);

            // get slides amount
            var length = Math.ceil($(".view li", $container).length / 4) * 4;
            var itemwidth = settings.itemwidth;

            // set width for ul
            $(".view ul", $container).width(itemwidth * length);

            // generate the dom of the circle icons
            var tagsdom = "<ul class='tags'>";

            var num = Math.ceil(length / 4);

            for (var i = 0; i < num; i++) {
                if (i == 0) {
                    tagsdom += "<li class='current'><span>&nbsp;</span></li>";
                }
                else {
                    tagsdom += "<li><span>&nbsp;</span></li>";
                }
            }

            tagsdom += "</ul>";

            // add the tags dom to page
            $(settings.tagsel, $container).html(tagsdom);

            var timeoutid;
            var current = 0;
            var next;
            var prev;
            clearTimeout(timeoutid);
            timeoutid = setTimeout(function () {
                next = current + 4;
                slideNext(next);
            }, settings.duration * 1000);

            // for next button
            $(".next", $container).click(function (event) {
                // prevent default behavior
                event.preventDefault();

                next = current + 4;
                slideNext(next);

                clearTimeout(timeoutid);
                timeoutid = setTimeout(function () {
                    next = current + 4;
                    slideNext(next);
                }, settings.duration * 1000);
            });

            // for previous button
            $(".prev", $container).click(function (event) {
                event.preventDefault();

                next = current - 4;
                slideNext(next);

                clearTimeout(timeoutid);
                timeoutid = setTimeout(function () {
                    next = current + 4;
                    slideNext(next);
                }, settings.duration * 1000);

            });

            // for mouse hover, pause functionality
            $(".view li", $container).hover(function () {
                clearTimeout(timeoutid);
            }, function () {
                clearTimeout(timeoutid);
                timeoutid = setTimeout(function () {
                    next = current + 4;
                    slideNext(next);
                }, settings.duration * 1000);
            });

            // switch to next slide
            function slideNext(next) {
                if (next == length) {
                    $(".view ul", $container).css("margin-left", itemwidth + "px");
                }

                if (next < 0) {
                    $(".view ul", $container).css("margin-left", 0 - itemwidth * length + "px");
                    next = length - 4;
                }

                next = next % length;

                $(".view ul", $container).animate({ "margin-left": 0 - itemwidth * next + "px" });
                switchTag(next);
                current = next;

                clearTimeout(timeoutid);
                timeoutid = setTimeout(function () {
                    next = current + 4;
                    slideNext(next);
                }, settings.duration * 1000);
            }

            // switch the tag icon accordingly
            function switchTag(current) {
                $(".tags li", $container).removeClass("current");
                var index = Math.ceil(current / 4);
                $(".tags li", $container).eq(index).addClass("current");
            }

        });
    }
})(jQuery);


// for partners carousel
(function ($) {
    var defaults =
    {
        //total width
        totalWidth: 1261,

        // move steps offset
        moveSteps: [0, -745, -1353]
    };

    $.fn.partnerCarousel = function (option) {
        var settings = $.extend(!0, {}, defaults, option);
        return this.each(function () {
            var $container = $(this);

            //var totalWidth = 0;
            //var $items = $(".view ul li", $container);
            //var length = $items.length;
            //for(var i=0 ; i< length; i++)
            //{
            //    totalWidth += $items.eq(i).width();
            //}

            var totalWidth = settings.totalWidth;
            var moveSteps = settings.moveSteps;
            var steps = moveSteps.length;

            $(".view ul", $container).width(totalWidth);
            $(".prevBtn", $container).addClass("inactive");

            // for next button
            $(".nextBtn", $container).click(function (event) {

                var currentStep = Math.abs(parseInt($(".view ul", $container).css("margin-left")));
                var nextStep = currentStep;
                var $this = $(this);

                for( var i = 0 ; i <= steps -1; i++)
                {
                    // if not reach the last slide
                    if(currentStep == Math.abs(moveSteps[i]) && i < steps -1 )
                    {
                        nextStep = Math.abs(moveSteps[i+1]);
                    }
                }
                
                for( var j = 0; j <= steps -1; j++)
                {
                    // after reach the last slide, make the arrow inactive
                    if(nextStep == Math.abs(moveSteps[j]) && j == steps -1)
                    {
                       $this.addClass("inactive");
                    }
                }

                $(".view ul", $container).animate({ "margin-left": 0 - nextStep + "px" });
                $(".prevBtn", $container).removeClass("inactive");

                // prevent default behavior
                event.preventDefault();
            });

            // for previous button
            $(".prevBtn", $container).click(function (event) {

                var currentStep = Math.abs(parseInt($(".view ul", $container).css("margin-left")));
                var nextStep = currentStep;
                var $this = $(this);

                for( var i = 0 ; i <= steps -1; i++)
                {
                    // if not reach the first slide
                    if(currentStep == Math.abs(moveSteps[i]) && i > 0 )
                    {
                        nextStep = Math.abs(moveSteps[i-1]);
                    }
                }

                for( var j = 0; j <= steps -1; j++)
                {
                    // after reach the last slide, make the arrow inactive
                    if(nextStep == Math.abs(moveSteps[j]) && j == 0)
                    {
                       $this.addClass("inactive");
                    }
                }

                $(".view ul", $container).animate({ "margin-left": 0 - nextStep + "px" });
                $(".nextBtn", $container).removeClass("inactive");
                
                event.preventDefault();
            });
        });
    }
})(jQuery);