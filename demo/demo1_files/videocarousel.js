// global variable
var videojsInitVideoId;

// for video carousel
(function ($) {
    var defaults =
    {
        // the carousel video list selector
        listsel: ".videoList",

        // the selector for the big play video id
        bigplayid: "efVideoPlayer1",

        // big video container
        bigvideowrap: ".videoWrap",

        // update poster
        updatePoster: 0
    };

    $.fn.videoCarousel = function (option)
    {
        var settings = $.extend(!0, {}, defaults, option);

        return this.each(function ()
        {
            var $container = $(this);

            // init the big video
            var bigVideo =_V_(settings.bigplayid);

            //after video get ended, show the poster image
            if (settings.updatePoster && $(".current .poster", $container).length > 0)
            {
                bigVideo.addEvent("ended", function () {
                    $("#" + settings.bigplayid + " .vjs-poster").css("display", "block");
                });
            }

            // after click img, then play the video on the big video container
            $(settings.listsel + " img", $container).click(function(){

                $this = $(this);
                var $itemcon = $this.closest(settings.listsel);

                // set the played video's picture to waiting img
                $(".current img", $container).attr("src",  $(".current .waitimg", $container).val());
                $(".current", $container).removeClass("current");

                // set the current image show playimg.
                $this.attr("src", $itemcon.find(".playimg").val());
                $itemcon.addClass("current");

                var videoAtrr = [];

                // add the video src to json
                if($(".flv", $itemcon).length > 0)
                {
                    var flv = $.parseJSON($(".flv", $itemcon).val());
                    videoAtrr.push(flv);
                }
                if($(".mp4", $itemcon).length > 0)
                {
                    var mp4 = $.parseJSON($(".mp4", $itemcon).val());
                    videoAtrr.push(mp4);
                }
                if($(".m4v", $itemcon).length > 0)
                {
                    var m4v = $.parseJSON($(".m4v", $itemcon).val());
                    videoAtrr.push(m4v);
                }

                // switch video
                bigVideo.pause();
                bigVideo.src(videoAtrr);

                $(settings.bigvideowrap).find(".title").html($itemcon.find(".name").text());
                $(settings.bigvideowrap).find(".txt").html($itemcon.find(".text").val());
                
                setTimeout(function(){
                   bigVideo.play();

                   //updaet poster
                   if (settings.updatePoster && $(".current .poster", $container).length > 0)
                   {
                       $(".vjs-poster", $("#" + settings.bigplayid)).attr("src", $(".current .poster", $container).val());
                   }
                }, 500);

                //return false;
            });

            // for video js control bar
            setTimeout(function () {
                $("#" + settings.bigplayid).hover(function () {
                        $(this).find(".vjs-controls").show();
                    },
                    function () {
                        $(this).find(".vjs-controls").hide();
                    });
            }, 1000);

        });
    }
})(jQuery);

// for video init
(function ($) {
   var defaults =
       {

       };

       $.fn.initVideo = function (option) {
            var settings = $.extend(!0, {}, defaults, option);

            return this.each(function () {

                // get video id
                var $this = $(this);

                var fixedPlayBtn = $this.hasClass("fixedPlayBtn");

                var videoid = $this.attr("id");

                if(videoid != null && videoid.length > 0)
                {
                    // init the video
                   videojsInitVideoId = _V_(videoid);
                }

                if(fixedPlayBtn)
                {
                    videojsInitVideoId.addEvent("play", function () {
                        // for video js control bar
                        $("#"+ videoid).find(".vjs-controls").show();
                        $("#"+ videoid).bind("mouseenter.gud", function () {
                            $(this).find(".vjs-controls").show();
                        });
                        $("#"+ videoid).bind("mouseleave.gud", function () {
                            $(this).find(".vjs-controls").hide();
                        });

                        $("#textBeforeStart").hide();
                    });
                    
                    videojsInitVideoId.addEvent("ended", function () {
                         $("#textBeforeStart").show();

                         $("#"+ videoid).unbind("mouseenter.gud");
                         $("#"+ videoid).unbind("mouseleave.gud");
                         $("#"+ videoid).find(".vjs-controls").show();
                     });
                }
                else
                {
                    // for video js control bar
                    setTimeout(function () {
                        $("#"+ videoid).hover(function () {
                            $(this).find(".vjs-controls").show();
                        },
                        function () {
                            $(this).find(".vjs-controls").hide();
                        });
                    }, 1000);
                }
            });
      }
})(jQuery);


// for popup video
(function ($) {
    var defaults =
        {
            // which element trigger the popup video
            triggerSel: ".popupTrigger",

            // pop up dom selector
            popupSel: ".popupVideoCon",

            // the videoId in popup dom
            popupVideoId: "popupVideoId",
          
            // popup option for dialog popup
            popupOption: { 
                modal: true,
                draggable: false,
                resizable:false,
                autoOpen: false,
                width: 768
            },

            sourceTextTag: "",
            targetTextTag: ""
        };

       $.fn.popupVideo = function (option) {
            var settings = $.extend(!0, {}, defaults, option);

            return this.each(function () {

                // get video id
                var $container = $(this);
                var videoid = settings.popupVideoId;

                if(videoid != null && videoid.length > 0)
                {
                   // init the video
                   var popupVideo = _V_(videoid);

                   $(settings.popupSel, $container).dialog(settings.popupOption);

                  // bind close function for popup
                   $(settings.popupSel).find(".closeBtn").click(function(event){

                        // for ie browsers
                        if(/msie/.test(navigator.userAgent.toLowerCase()) || /ipad|iPhone|iPod/.test(navigator.userAgent.toLowerCase()))
                        {
                           popupVideo.pause();
                        } 

                        $(settings.popupSel).dialog("close");
                   });

                   // after click trigger element, then play the video on the popup video container
                   $container.on('click', settings.triggerSel, function (event) {

                            // stop the init big Video if have
                            if(videojsInitVideoId)
                            {
                                videojsInitVideoId.pause();
                            }

                            var videoAtrr = [];
                            var $parents = $(this).parent(); 
                            // add the video src to json
                            if($(".flv", $parents).length > 0)
                            {
                                var flv = $.parseJSON($(".flv", $parents).val());
                                videoAtrr.push(flv);
                            }
                            if($(".mp4", $parents).length > 0)
                            {
                                var mp4 = $.parseJSON($(".mp4", $parents).val());
                                videoAtrr.push(mp4);
                            }
                            if($(".m4v", $parents).length > 0)
                            {
                                var m4v = $.parseJSON($(".m4v", $parents).val());
                                videoAtrr.push(m4v);
                            }

                            // switch video
                            popupVideo.pause();
                            popupVideo.src(videoAtrr);

                            // replace text on popup
                            if ($(settings.sourceTextTag, $parents).length > 0 && $(settings.targetTextTag, $(settings.popupSel)).length > 0) {
                                $(settings.targetTextTag, $(settings.popupSel)).html($(settings.sourceTextTag, $parents).text());
                            }

                            // show popup and play
                            $(settings.popupSel).dialog("open");
                            popupVideo.play();
                            //$(settings.popupSel).find(".vjs-paused").click();

                            //event.preventDefault();
                   });

                   // for video js control bar
                   setTimeout(function () {
                       $("#"+ videoid).hover(function () {
                           $(this).find(".vjs-controls").show();
                       },
                       function () {
                           $(this).find(".vjs-controls").hide();
                       });
                   }, 1000);

                }

            });
      }
})(jQuery);



// for rotator big bg popup video
(function ($) {
    var defaults =
        {
            // pop up dom selector
            popupSel: "#rotatorPopupVideo",

            // the videoId in popup dom
            popupVideoId: "rotatorPopupVideoId",

            // popup option for dialog popup
            popupOption: {
                dialogClass: "rotatorPopupVideo cusmPopup",
                modal: true,
                draggable: false,
                resizable:false,
                autoOpen: false,
                width: 770
            }
        };

       $.fn.rotatorPopupVideo = function (option) {
            var settings = $.extend(!0, {}, defaults, option);

            return this.each(function () {

                // get video id
                var $container = $(this);
                var videoid = settings.popupVideoId;

                if(videoid != null && videoid.length > 0)
                {
                   $(settings.popupSel).dialog(settings.popupOption);

                   // init the video
                   var popupVideo = _V_(videoid);

                  // bind close function for popup
                   $(settings.popupSel).find(".closeBtn").click(function(event){

                        // for ie browsers
                        if(/msie/.test(navigator.userAgent.toLowerCase()) || /ipad|iPhone|iPod/.test(navigator.userAgent.toLowerCase()))
                        {
                           popupVideo.currentTime(0);
                           popupVideo.pause();
                        }

                        $(settings.popupSel).dialog("close");
                   });

                   // after click trigger element, then play the video on the popup video container
                   $container.click(function (event) {

                        // click leadsform will not trigger popup video
                        if($(event.target).closest("#formCon").length > 0 || $(event.target).closest("#scrolldown-picture").length > 0)
                        {
                           return;
                        }

                        // show popup and play
                        $(settings.popupSel).dialog("open");
                        popupVideo.play();
                        $(settings.popupSel).find(".vjs-paused").click();

                   });

                   // for video js control bar
                   setTimeout(function () {
                       $("#"+ videoid).hover(function () {
                           $(this).find(".vjs-controls").show();
                       },
                       function () {
                           $(this).find(".vjs-controls").hide();
                       });
                   }, 1000);

                }

            });
      }
})(jQuery);