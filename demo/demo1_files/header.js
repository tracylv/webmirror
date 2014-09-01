// for the behavior in header
var clickedAgeGroup = false;
var clickedCityPicker = false;

// for cut header when width> 1366
// for pink rotator headline font-size auto suitable
(function ($) {

      $.cutHeader = function (option) {

            // if it is the first slide, not pink rotator
           // var slideindex = $(".rotator li.show").index();
            if($(".needCutHeader:visible").length > 0)
            {
                $("#header").css("max-width", "1366px");
                $("#nav").css("max-width", "1366px");

                // ie6
                if (! -[1, ] && !window.XMLHttpRequest && $(window).width() >= 1366 &&  $(window).scrollTop() <= 151)
                {
                    $("#header").css("width", "1366px");
                    $("#nav").css("width", "1366px");
                }
            }
            else
            {
                $("#header").css("max-width", "100%");
                $("#nav").css("max-width", "100%");

                // ie6
                if (! -[1, ] && !window.XMLHttpRequest && $(window).width() >= 1366)
                {
                    $("#header").css("width", "100%");
                    $("#nav").css("width", "100%");
                }
            }
        };
})(jQuery);


// for top rotator
(function ($) {
    var defaults =
    {
        // the duration of top rotator switching (in sec)
        duration: 4
    };

    $.fn.rotate = function (option)
    {
        var settings = $.extend(!0, {}, defaults, option);
        return this.each(function ()
        {
            var $container = $(this);
            var $parent = $container.parent();

            var timeoutid = null;
            var ishover = false;
            var isfocus = false;

            clearTimeout(timeoutid);
            timeoutid = setTimeout(function () {
                rotateNext();
            }, settings.duration * 1000);

            // when hover on the slide, stop rotate
            $container.hover(function () {
                clearTimeout(timeoutid);
                ishover = true;
            },
            function () {
              if(isfocus == false)
              {
                 clearTimeout(timeoutid);
                 timeoutid = setTimeout(function () {
                     rotateNext();
                 }, settings.duration * 1000);
              }
              ishover = false;
            });

            // when input focus in the slide, stop rotate
            $(".formContainer input, .formContainer .listContainer", $container).focus(function () {
                clearTimeout(timeoutid);
                isfocus = true;
            });

            $(".formContainer input, .formContainer .listContainer", $container).blur(function () {
              if(ishover == false)
              {
                 clearTimeout(timeoutid);
                 timeoutid = setTimeout(function () {
                     rotateNext();
                 }, settings.duration * 1000);
              }
              isfocus = false;
            });

            function rotateNext()
            {
                // rotate the header bg

                var showobj = $("li.show", $container).hide();
                var hideobj = $("li.hide", $container).fadeIn(1000);

                var index = hideobj.index();
                $(".TRPagination .selected", $parent).removeClass("selected");
                $(".TRPagination .icon", $parent).eq(index).addClass("selected");

                // for shorheader swith title text for leadsform
                if(index == 0)
                {
                    if($(".shortLeadsForm .specialTag").hasClass("specialTagOnSlide2"))
                    {
                        $(".shortLeadsForm .specialTag").addClass("hideSpecialTag");
                    }
                    else
                    {
                        $(".shortLeadsForm .specialTag").removeClass("hideSpecialTag");
                    }

                    $(".shortLeadsForm .leadsTitle2").hide();
                    $(".shortLeadsForm .leadsTitle1").show();

                    $(".withshortHeader .headerBottom").show();

                }
                else
                {
                    if($(".shortLeadsForm .specialTag").hasClass("specialTagOnSlide2"))
                    {
                        $(".shortLeadsForm .specialTag").removeClass("hideSpecialTag");
                    }
                    else
                    {
                        $(".shortLeadsForm .specialTag").addClass("hideSpecialTag");
                    }

                    $(".shortLeadsForm .leadsTitle1").hide();
                    $(".shortLeadsForm .leadsTitle2").show();

                    $(".withshortHeader .headerBottom").hide();
                }

                // switch the show/hide flag
                showobj.removeClass("show").addClass("hide");
                hideobj.removeClass("hide").addClass("show");

                // cut the header when width > 1366px
                $.cutHeader();

                // set the next time rotate
                clearTimeout(timeoutid);
                timeoutid = setTimeout(function () {
                    rotateNext();
                }, settings.duration * 1000);
            }

            $(".TRPagination .icon", $parent).click(function(){
                $this = $(this);
                if(!$this.hasClass("selected"))
                {
                    clearTimeout(timeoutid);
                    rotateNext();
                }
            });

        });
    }
})(jQuery);


// for pink rotator headline font-size auto suitable
(function ($) {
    var defaults =
    {
        // the max font-size for headline (px)
        maxFontSize: 55,

        // small the font-size
        minusStep: 2,

        // limited height of the text container
        limitHeight: 125,

        // the headline line-height
        lineHeight: 120,

        // hidden container selector,  this is for hidden headline auto font-size
        hiddenConSel: ".rotatorTrigger li.hide"
    };

    $.fn.autoFontSize = function (option){
        var settings = $.extend(!0, {}, defaults, option);
        return this.each(function (){

            var $this = $(this);
            var currentFontSize = settings.maxFontSize;
            var limitHeight = settings.limitHeight;
            var minusStep = settings.minusStep;

            // show the hidden container of pink rotator before we calculating the height
            var hiddenContainer =  $this.closest(settings.hiddenConSel);
            if( hiddenContainer.length > 0)
            {
               // make it not be seen by user
               hiddenContainer.attr("style","position: relative; left: -9999px;top:-9999px");
               hiddenContainer.show();
            }

            // set the max font-size to headline
            $this.css("font-size", currentFontSize + "px").css("line-height", settings.lineHeight + "px").css("height", "auto");

            var height = $this.height();

            // make sure the container height is in limited range
            while(height >= limitHeight)
            {
                // check if the font-size decrease to smallest
                if(currentFontSize <= minusStep)
                {
                   break;
                }

                // decrease font-size by step
                currentFontSize = currentFontSize - minusStep;
                $this.css("font-size", currentFontSize + "px");
                height = $this.height();
            }

            // if hide hidden container if it existed
            if( hiddenContainer.length > 0)
            {
               // hide the container
               hiddenContainer.attr("style"," ");
               hiddenContainer.hide();
            }

        });
    }
})(jQuery);


// for top header to pick age group
(function ($) {

    var defaults =
    {
        // the selecter for the whole module which need to switch between show and hide.
        tagsel: ".ageTab",

        // for the sub item show class when hover on the sub item of the module.
        itemshowclass: "focus",

        // toggle a class for a specific element in the module.  one of them or both are empty will forbidden this functionality.
        clsobj: { sel: ".otherAge", cls: "selected" },

        // the delay of show or hide for touch device
        touchdelay: 400,

        // the cover selecter
        coversel: ".conblack",

        // fade in speed
        speed: 400,

        // opacity
        opacity: 0.8
    };

    $.fn.pickAgeGroup = function (options) {
        var settings = $.extend(true, {}, defaults, options);

        return this.each(function () {

            var $container = $(this);
            var selector = settings.clsobj.sel;
            var classname = settings.clsobj.cls;
            var delay = 0;

            // for touch device start
//            $container.bind("touchend", function () {

//                delay = settings.touchdelay;
//                settings.speed = 0;

//                setTimeout(function () {
//                    if ($(settings.tagsel, $container).css("display") != "none") {
//                        $(settings.tagsel, $container).css("display", "none");
//                        $(settings.coversel, $container).css("display", "none");

//                        if (selector != "" && classname != "") {
//                            $(selector, $container.parent()).removeClass(classname);
//                        }
//                    }
//                    else {
//                        $(settings.tagsel, $container).css("display", "block");
//                        $(settings.coversel, $container).css("display", "block");

//                        if (selector != "" && classname != "") {
//                            $(selector, $container.parent()).addClass(classname);
//                        }
//                    }
//                }, settings.touchdelay);
//            });
            // for touch device end

             $container.click(function (e) {

               if(clickedCityPicker == false)
               {
                 setTimeout(function () {
                     $container.find(settings.tagsel).show();
                     if (selector != "" && classname != "") {
                         $(selector, $container.parent()).addClass(classname);
                         $(settings.coversel, $container.parent()).fadeTo(settings.speed, settings.opacity);
                     }
                 }, delay);

                 clickedAgeGroup = true;
                 $(".cityPickerTrigger").css("cursor", "default");
               }

                e.stopPropagation();

             });

             $container.bind("touchend", function (ee) {
               if(clickedCityPicker == false)
               {
                 setTimeout(function () {
                     $container.find(settings.tagsel).show();
                     if (selector != "" && classname != "") {
                         $(selector, $container.parent()).addClass(classname);
                         $(settings.coversel, $container.parent()).fadeTo(settings.speed, settings.opacity);
                     }
                 }, delay);

                 clickedAgeGroup = true;
                 $(".cityPickerTrigger").css("cursor", "default");
               }

                ee.stopPropagation();
              });

            // for the whole module show or hide
            $container.hover(
             function () {

               if(clickedCityPicker == false && clickedAgeGroup == false)
               {
                 setTimeout(function () {
                     $container.find(settings.tagsel).show();
                     if (selector != "" && classname != "") {
                         $(selector, $container.parent()).addClass(classname);
                         $(settings.coversel, $container.parent()).fadeTo(settings.speed, settings.opacity);
                     }
                 }, delay);
               }
             },
             function () {
               if(clickedCityPicker == false && clickedAgeGroup == false)
               {
                 setTimeout(function () {
                     $container.find(settings.tagsel).hide();
                     if (selector != "" && classname != "") {
                         $(selector, $container.parent()).removeClass(classname);
                         $(settings.coversel, $container.parent()).hide();
                     }
                 }, delay);
               }
             });

             // for the sub item hightlight when hover
             $(settings.tagsel + " li.ageGroup", $container).hover(
             function () {
                 $(this).addClass(settings.itemshowclass);
             },
             function () {
                 $(this).removeClass(settings.itemshowclass);
             });

             // for close btn
             $(".close span", $container).click(function(event){
                  $container.find(settings.tagsel).hide();
                  if (selector != "" && classname != "") {
                      $(selector, $container.parent()).removeClass(classname);
                      $(settings.coversel, $container.parent()).hide();
                  }

                  clickedAgeGroup = false;
                  $(".cityPickerTrigger").css("cursor", "pointer");

                  event.preventDefault();
                  event.stopPropagation();

             });

             $("html").click(function(){
                $(".close span", $container).click();
                $(".cityPickerTrigger .closePopupCity .closeBtn").click();
             });


        });
    }
    $.fn.pickAgeGroup.defaults = defaults;
})(jQuery);


// for top header city picker
(function ($) {

    var defaults =
    {
        // the class name which switched between clicking citypicker and close citypicker
        toggleClass: "selected",

        // the selecter for the city picker content
        contentSel: ".cpPopup",

        // the selector for the close button
        closeSel: ".closePopupCity .closeBtn",

        // own city selecter
        ownCitySel: "#mainCity a",

        // all cities list selecter
        allCitiesSel: "#cpCityList a",

        // city name label selector
        cityLabSel: ".cityLabel",

        // shool label selector,
        schoolTabSel: ".nav .navCon li#menu-SCHOOL a",

        // tel phone number selecter
        phoneLabSel: "#phonenumbertrigger-picture",

        // phone number on footer
        phoneSelOnFooter: "#footerPhone>div>span"
    };

    $.fn.cityPicker = function (options) {
        var settings = $.extend(true, {}, defaults, options);

        return this.each(function () {

            var $container = $(this);
            var className = settings.toggleClass;
            var contentSel = settings.contentSel;
            var clsBtnSel = settings.closeSel;
            var cityLabSel = settings.cityLabSel;
            var schoolTabSel = settings.schoolTabSel;
            var phoneLabSel = settings.phoneLabSel;
            var phoneSelOnFooter = settings.phoneSelOnFooter;

            // show the cities in city picker
            $container.click(function(e){

              if(clickedAgeGroup == false)
              {
                $container.addClass(className);
                $(contentSel, $container).show();

                clickedCityPicker = true;
                $(".otherAge").css("cursor", "default");
              }

              e.stopPropagation();
            });


            $container.bind("touchend", function (ee) {
              if(clickedAgeGroup == false)
              {
                $container.addClass(className);
                $(contentSel, $container).show();

                clickedCityPicker = true;
                $(".otherAge").css("cursor", "default");
              }

              ee.stopPropagation();
            });


            $container.hover(function(){
              if(clickedAgeGroup == false && clickedCityPicker == false)
              {
                $container.addClass(className);
                $(contentSel, $container).show();
              }
            },
            function(){
              if(clickedAgeGroup == false && clickedCityPicker == false)
              {
                $container.removeClass(className);
                $(contentSel, $container).hide();
              }
            });

            // for close button in city picker
            $(clsBtnSel, $container).click(function(event){
                $container.removeClass(className);
                $(contentSel, $container).hide();
                
                clickedCityPicker = false;
                $(".otherAge").css("cursor", "pointer");

                event.preventDefault();
                event.stopPropagation();
            });

            // click other place in the page close dropdown
            $("html").click(function(){
                 $(clsBtnSel, $container).click();
                 $(".otherAge .close span").click();
            });

            // bind click for Own city
            $(settings.ownCitySel, $container).click(function(event){

                if($(this).attr("data-obj") != undefined)
                {
                    var dataobj = $.parseJSON($(this).attr("data-obj"));
                    changeOwnCity(dataobj.cityCode, dataobj.cityText);
                    // close city picker
                    $(clsBtnSel, $container).click();
                }

                event.preventDefault();
                event.stopPropagation();
            });

            // for click for all city
            $(settings.allCitiesSel, $container).click(function(event){

                if($(this).attr("data-obj") != undefined)
                {
                    var dataobj = $.parseJSON($(this).attr("data-obj"));
                    changeCity(dataobj.cityCode, dataobj.cityText, dataobj.hasMore);
                }
                else if ($(this).attr("othercitylink") != undefined)
                {
                    // for other city link
                    window.open(urlEtagUpdate($(this).attr("othercitylink")));
                }

                // close city picker
                $(clsBtnSel, $container).click();
                event.preventDefault();
                event.stopPropagation();
            });


            function urlEtagUpdate(link)
            {
                if (link)
                {
                    var isAddEtag = false;
                    if (etag)
                    {
                        var reDomain;
                        var reEtag = /etag/ig;
                        if (currDomain)
                        {
                            reDomain = new RegExp(currDomain, "ig");
                        }

                        if (!reEtag.test(link) && !reDomain.test(link))
                        {
                            var reQ = /\?/g;
                            var conS = reQ.test(link) ? "&" : "?";
                            isAddEtag = true;
                            return (link + conS + "etag=" + etag);
                        }
                    }

                }
                if (!isAddEtag)
                {
                    return link;
                }
            }


            // Own city
            function changeOwnCity(cityCode, cityText)
            {
                changeCity(cityCode, cityText, "1");
            }

            // other cities except own city
            function changeCity(cityCode, cityText, hasMore) {

                // change city name label text
                $(cityLabSel, $container).html(cityText);

                // update banner
                setLandingBanner(cityCode);

                var phonePopupLink;

                phonePopupLink = tabCityLink.replace("#citycode#", cityCode);

                // change school text and url
                var schoolTab = $(schoolTabSel);
                if (schoolTab.length == 1) 
                {
                    //var newSchoolTabContent = schoolTabText.replace("#city#", cityText);
                    //if (countryCode == "ru") 
                    //{
                        //newSchoolTabContent = newSchoolTabContent.replace("#city2#", ruForms[2][cityCode]).replace("#city3#", ruForms[3][cityCode]);
                    //}
                    //schoolTab.html(newSchoolTabContent);
                    schoolTab.attr("href", phonePopupLink + '.aspx');

                    // for new course page "find a school"
                     $("#button_gudFindASchool").attr("href", phonePopupLink + '.aspx');
                }

                // update cookie
                var c = $.cookie('e1_school');
                if (c && c !=  cityCode && c.indexOf(cityCode + '_') < 0) {
                    $.cookie('e1_school', null, { domain: window.location.hostname, expires: -1, path: '/' });
                }

                var options = { domain: window.location.hostname, expires: 7, path: '/' };
                $.cookie('city', cityCode, options);
                $.cookie('e1legacy', true, options);

                //change text in TR and pink footer
                if(window.location.href.toLowerCase().indexOf("/cities/") < 0){
                     var trType = 0;
                     if($('a.slideOpenNewLink').length>0){
                         trType=1;
                     }
                     sp_callWebSvc("ChangeTRText", "{'cityCode':'" + $.cookie('city') + "','path':'" + encodeURIComponent(document.location.pathname) + "','trType':'" + trType + "'}", ChangeTRText);
                 }

                //update city in all lead form
                for (var i = 0; i < jsonRaw.CityInfos.length; i++) {
                    if (cityCode == jsonRaw.CityInfos[i].v) {
                        $('.formCityList').prev().find("span.boxLeft").text(jsonRaw.CityInfos[i].t);
                        $('.formCityList').prev().find("input.listValue").val("C;" + i);
                        $('.formCityList').prev().find("input.listLabel").val(jsonRaw.CityInfos[i].t);
                        InitForm.InitSchool($('.formSchoolList'), $('input[name="courseInput"]').val(), $('input[name="cityInput"]').val());
                        break;
                    }
                }

                // Check if it's own city
                if (menuSmartLink)
                {
                    isOwnCity = false;
                    var regexOwnCity = new RegExp(regOwnCity);
                    if (cityCode && regexOwnCity.exec(cityCode))
                    {
                        isOwnCity = true;
                    }
                }

                // for new menu bar adult link
                var adultLink = "/englishfirst/courses/adults-courses.aspx";
                if (countryCode == "cn")
                {
                    var ownCityRegex = new RegExp(regOwnCity);
                    if (cityCode && ownCityRegex.exec(cityCode))
                    {
                        adultLink = "/englishcenters/home";
                    }
                    else
                    {
                        adultLink = "/englishfirst/courses/adults/realenglish.aspx";
                    }
                }
                if (countryCode == "ru" || countryCode == "id")
                {
                    adultLink = "/englishfirst/courses/adults/realenglish.aspx";
                }

                var homeAdultLink = adultLink;
                var isEtownCity = false;
                var hasEtownSchool = false;
                if (typeof (etownCityCode) != "undefined" && etownCityCode && etownCityCode[cityCode])
                {
                    hasEtownSchool = true;
                    homeAdultLink = menuSmartLink + "?citycode=" + etownCityCode[cityCode] + "&etag=efcnhome";
                }

                // init phone number
                initPhoneBtn(isOwnCity, hasMore, cityCode, cityText);

                // City picker on home page
                if (homeGroup) {
                    if (hasEtownSchool && homeGroup == "adults")
                    {
                        document.location = homeAdultLink;
                    }
                    else
                    {
                        if (cityCode == "kazan")
                        {
                            document.location = "http://www.englishfirst.ru/EnglishFirst/landing/ru/kazan";
                        }
                        else
                        {
                            if (homeGroup == "adults" && (countryCode == "ru" || countryCode == "id"))
                            {
                                document.location = homeAdultLink;
                            }
                            else
                            {
                                document.location = homePath[homeGroup];
                            }
                        }
                    }
                }
            }



               // init phone button
               function initPhoneBtn(isOwnCity, hasMore, cityCode, cityText) {
                   var phoneText,
                       footPhoneText,phoneText2;

                    var formatPhoneNumber = function (number)
                    {
                        return "<span class=\"phonespan\">" + number + "</span>";
                    };

                    var formatPhoneName = function (name)
                    {
                        return "<span class=\"agespan\">" + name + "</span>";
                    }

                    if (customPageType == "HomePage" || hasMore == "1")
                    {
                        $(phoneLabSel).show();
                        $(phoneSelOnFooter).show();
                        //$("#leftPhoneNum:hidden").show();
                        //$(".separator:hidden").show();

                        if (countryCode == "cn")
                        {
                            var regSmart = new RegExp(regSmartCity);
                            var regMini = new RegExp(regMiniCenterCity);
                            if (isOwnCity)
                            {
                                if($(phoneLabSel).hasClass("cnseoonly")){
                                    phoneText = formatPhoneName(phoneBtnText["pa"]) + formatPhoneNumber(phoneBtnText["ps"])
                            + formatPhoneName(phoneBtnText["pk"]) + formatPhoneNumber(phoneBtnText["pt"]);
                                }else{
                                    phoneText = formatPhoneNumber(phoneBtnText["pt"]);
                                }
                                footPhoneText = '<em>' + kidsTxt + '</em><b>' + phoneBtnText["pt"] + '</b><br/><em>' + adultsTxt + '</em><b>' + phoneBtnText["ps"] + '</b>';
                            }
                            else
                            {
                                if(cityCode == hangzhoucity){ 
                                    phoneText = formatPhoneName(hangzhoucityName) + formatPhoneNumber(cityPhoneNum[hangzhoucity]) + formatPhoneName(xiaoshancityName) + formatPhoneNumber(cityPhoneNum[xiaoshancity]);
                                }else{
                                    phoneText = formatPhoneNumber(cityPhoneNum[cityCode]);
                                }

                                var seoaPhone;
                                if (regSmart.exec(cityCode))
                                {
                                    seoaPhone = phoneBtnText["ps"];
                                    footPhoneText = '<em>' + kidsTxt + '</em><b>' + cityPhoneNum[cityCode] + '</b><br/><em>' + adultsTxt + '</em><b>' + phoneBtnText["ps"] + '</b>';
                                }
                                else if (regMini.exec(cityCode))
                                {
                                    seoaPhone = phoneBtnText["pm"];
                                    footPhoneText = '<em>' + kidsTxt + '</em><b>' + cityPhoneNum[cityCode] + '</b><br/><em>' + adultsTxt + '</em><b>' + phoneBtnText["pm"] + '</b>';
                                }
                                else
                                {
                                    footPhoneText = '<em>' + kidsTxt + '</em><b>' + cityPhoneNum[cityCode] + '</b>';
                                }

                                if(cityCode != hangzhoucity && $(phoneLabSel).hasClass("cnseoonly") && typeof seoaPhone != 'undefined'){
                                    phoneText = formatPhoneName(phoneBtnText["pa"]) + formatPhoneNumber(seoaPhone)
                            + formatPhoneName(phoneBtnText["pk"]) + formatPhoneNumber(cityPhoneNum[cityCode]);
                                }
                            }
                        }
                        else if (countryCode == "ru")
                        {
                            if (cityCode != 'almetyevsk')
                            {
                                phoneText = formatPhoneNumber(phoneBtnText["pr"]);
                                footPhoneText = '<b>' + phoneBtnText["pr"] + '</b>';
                            }
                            else
                            {
                                phoneText = formatPhoneNumber(cityPhoneNum[cityCode]);
                                footPhoneText = '<b>' + cityPhoneNum[cityCode] + '</b>';
                            }
                        }
                    }

                    //Change text of phone number popup button
                    if (customPageType == "HomePage")
                    {
                        if (countryCode == "cn")
                        {
                            if (isOwnCity)
                            {
                                $(".textForOwnCity:hidden").show();
                            }else
                            {
                                $(".textForOwnCity").hide();
                            }

                            // update tel number
                            $(phoneLabSel).html(phoneText);
                            $(phoneSelOnFooter).html(footPhoneText);
                        }
                        else if (countryCode == "ru")
                        {
                            $(phoneLabSel).html(phoneText);
                            $(phoneSelOnFooter).html(footPhoneText);
                        }
                    }
                    else{
                        if (hasMore == "1")
                        {
                            if (countryCode == "cn" || countryCode == "ru")
                            {
                                $(phoneLabSel).html(phoneText);
                                $(phoneSelOnFooter).html(footPhoneText);

                                // for ru moscow two rows phone num
                                var regexMoscow2 = new RegExp(regMoscow);
                                var regexMoscowRegion2 = new RegExp(regMoscowRegion);
                                if(countryCode == "ru" && regexMoscow2.exec(cityCode) && !regexMoscowRegion2.exec(cityCode) && currProduct == "")
                                {
                                    $(".header .right .tel").addClass("moscowTwoRowsTel");
                                    if($(".header #moscowPhoneNsum").length > 0){
                                        $(".header #moscowPhoneNsum").show();
                                    }else{
                                        $(".header .right .tel").prepend('<a href="javascript:void(0)" id="moscowPhoneNsum">' + phoneText2 + '</a>');
                                    }
                                }
                                else
                                {
                                    $(".header .right .tel").removeClass("moscowTwoRowsTel");
                                    $(".header #moscowPhoneNsum").hide();
                                }
                            }
                            else if (countryCode == "id")
                            {
                                $(phoneLabSel).hide();
                                $(phoneSelOnFooter).hide();
                                //$("#leftPhoneNum:visible").hide();
                                //$(".separator:visible").hide();
                            }

                            $("#hiddenCity").attr("hasmany", "true");

                            if (countryCode == "ru")
                            {
                                $("#hiddenCity").html(phoneBtnText["c"].replace("#city#", cityText).replace("#city2#", ruForms[2][cityCode]).replace("#city3#", ruForms[3][cityCode]));
                            }
                            else
                            {
                                $("#hiddenCity").html(phoneBtnText["c"].replace("#city#", cityText));
                            }
                        }
                        else
                        {
                            $(phoneLabSel).show();
                            $(phoneSelOnFooter).show();
                            //$("#leftPhoneNum:hidden").show();

                            if (cityCode == "yogyakarta")
                            {
                                $(phoneLabSel).html(formatPhoneNumber(cityPhoneNum["yogyakarta_seturan"]));
                                $(phoneSelOnFooter).html('<b>' + cityPhoneNum["yogyakarta_seturan"] + '</b>');
                            } 
                            else
                            {
                                $(phoneLabSel).html(formatPhoneNumber(cityPhoneNum[cityCode]));
                                if (countryCode == "cn") {
                                    $(phoneSelOnFooter).html('<em>' + kidsTxt + '</em><b>' + cityPhoneNum[cityCode] + '</b>');
                                } else {
                                    $(phoneSelOnFooter).html('<b>' + cityPhoneNum[cityCode] + '</b>');
                                }
                            }

                            //$(".separator:hidden").show();

                            $("#hiddenCity").attr("hasmany", "false");
                            $("#hiddenCity").html(phoneBtnText["s"].replace("#school#", cityText));


                            // for ru moscow two rows phone num
                            var regexMoscow3 = new RegExp(regMoscow);
                            var regexMoscowRegion3 = new RegExp(regMoscowRegion);
                            if(countryCode == "ru" && regexMoscow3.exec(cityCode) && !regexMoscowRegion3.exec(cityCode) && currProduct == "")
                            {
                                $(".header .right .tel").addClass("moscowTwoRowsTel");
                                $(".header #moscowPhoneNsum").show();
                            }
                            else
                            {
                                $(".header .right .tel").removeClass("moscowTwoRowsTel");
                                $(".header #moscowPhoneNsum").hide();
                            }
                        }
                    }
                }




        });
    }
})(jQuery);

// for fixed the menu bar position, keep it always show on the top of the page visual part 
(function ($) {

var defaults =
    {
        // header selector
        //headsel: "#header",

        // for fixing the top position in case
        topfix: -1,

        // for fixing the left position in case
        leftfix: 0,

        // for the value of z-index
        index: 1000,

        // to override the module's height, -1 means no override, >=0 mean override with this value
        height: 41
    };

    $.fn.fixMenuPos = function (options) {

        var settings = $.extend(true, {}, defaults, options);

        return this.each(function () {

            var $container = $(this);

            if ($container.length > 0) {
                // get the position information
                var navp = $container.offset();
                var navh = settings.height >= 0 ? settings.height : $container.parent().height();
                var navl = $container.offset().left;

                // update position with above data
                var recnP = function () {
                    if ($(window).scrollTop() > navp.top - settings.topfix) {
                        // make sure other element not move up and down when changed menubar position 
                        $container.parent().height(navh);

                        // check if browser is ie6
                        if (!-[1,]&&!window.XMLHttpRequest) {
                            $container.css({ "top": $(window).scrollTop() - 151 , "left": 0 + settings.leftfix, "position": "absolute", "z-index": settings.index });
                            $container.parent().css({"z-index": settings.index});

                            $("#header").css("width", "100%");
                            $("#nav").css("width", "100%");
                        }
                        else {
                            $container.css({ "top": 0 + settings.topfix, "left": 0 + settings.leftfix, "position": "fixed", "z-index": settings.index });
                        }
                    }
                    else {
                        $container.css({ "position": "relative", "top": "0", "z-index": "99", "margin-top": "1px" });

                        // ie6
                        if (!-[1,]&&!window.XMLHttpRequest) {
                            $container.parent().css({"z-index": "99"});
                            $.cutHeader();
                        }
                    }
                };
                recnP();
                $(window).scroll(function () { recnP(); });

                $(window).resize(function () {
                    //navl = $(settings.headsel).offset().left;
                    recnP();
                });
            }
        });
    }
    $.fn.fixMenuPos.defaults = defaults;
})(jQuery);


// for fixed left banner
(function ($) {

    var defaults =
    {
        // close button selector
        closeBtn: ".close",

        // for fixing the top position in case
        topfix: 300
    };

    $.fn.fixedBanner = function (options) {

        var settings = $.extend(true, {}, defaults, options);

        return this.each(function () {

            var $container = $(this);

            if ($container.length > 0) {
                // get the position information
                var bannerpos = $container.offset();

                // update position with above data
                var resetTop = function () {
                    if ($(window).scrollTop() > bannerpos.top - settings.topfix) {

                        // check if browser is ie6
                        if (!-[1,]&&!window.XMLHttpRequest) {
                            $container.css({ "top": $(window).scrollTop() + settings.topfix });
                        }
                        else {
                            $container.css({ "top": 0 + settings.topfix, "position": "fixed" });
                        }
                    }
                    else {
                        $container.css({ "position": "absolute", "top": 0 + bannerpos.top });
                    }
                };

                resetTop();

                $(window).scroll(function () { resetTop(); });

                $(window).resize(function () {
                    resetTop();
                });

                // close button behavior
                $(settings.closeBtn, $container).click(function(){
                    $container.hide();
                });
            }
        });
    }
    $.fn.fixedBanner.defaults = defaults;
})(jQuery);

// for popup module
(function ($) {
   var defaults =
       {
          // pop up dom selector
          popupSel: ".contactUs",

          //pop up close element selector
          clsBtnSel: ".closeBtn",

          // popup option for dialog popup
          popupOption: { 
                dialogClass: "cusmPopup",
                modal: true,
                draggable: false,
                resizable:false,
                autoOpen: false,
                width: 820
             },

          callback: function(){ },
          closecallback: function(){ }
       };

       $.fn.popup = function (option) {

            var settings = $.extend(!0, {}, defaults, option);
            return this.each(function () {

                // init popup
                var $this = $(this);
                $(settings.popupSel).dialog(settings.popupOption);

                // after click trigger element, show popup
                $this.click(function(event){
                    var formType = $(this).attr('id');
                    if(formType){
                        var currentSchoolcode;
                        if(formType.indexOf('schoolMI_') == 0){
                            currentSchoolcode = formType.replace('schoolMI_','');
                            formType = 'schoolViewMore';
                        }else if (formType.indexOf('topSchoolMI_') == 0){
                            currentSchoolcode = formType.replace('topSchoolMI_','');
                            formType = 'topSchoolViewMore';
                        }
                        switch(formType){
                            case 'headerContactUs':
                                $(settings.popupSel + ' input.futureType').attr('value','GUD Contact US Top');
                                if (window.location.href.toLowerCase().indexOf("/cities/") > 0) {
                                    var curPCode = $.cookie('product');
                                    switch(curPCode){
                                          case "ksmall":
                                              $(settings.popupSel + ' .formCourseList ul li[list-data="early learners"]').click();
                                              break;
                                          case "khigh":
                                              $(settings.popupSel + ' .formCourseList ul li[list-data="kids courses"]').click();
                                              break;
                                          case "ttrail":
                                              $(settings.popupSel + ' .formCourseList ul li[list-data="teenagers"]').click();
                                              break;
                                          case "tfrunner":
                                              $(settings.popupSel + ' .formCourseList ul li[list-data="young adult courses"]').click();
                                              break;
                                          case "areal":
                                              $(settings.popupSel + ' .formCourseList ul li[list-data="adult courses"]').click();
                                              break;
                                           default:
                                              $(settings.popupSel + ' input[name="courseInput"]').val('');
                                              $(settings.popupSel + ' input[name="courseValue"]').val(courseLabel);  
                                              $(settings.popupSel + ' input[name="courseInput"]').parent().find('span.listLabel').text(courseLabel);                                          
                                              break;
                                    }
                                }
                                break;
                            case 'btmContact':
                                $(settings.popupSel + ' input.futureType').attr('value', 'GUD Contact US Bottom');
                                break;
                            case 'button_gudCourseMid':
                                $(settings.popupSel + ' input.futureType').attr('value', 'GUD-Course-mid');
                                break;
                            case 'button_gudCourseContactUs':
                                $(settings.popupSel + ' input.futureType').attr('value', 'GUD-course-contactus');
                                break;
                            case 'midContact':
                                $(settings.popupSel + ' input.futureType').attr('value', 'GUD MBE Chess');
                                break;
                            case 'mbeWhyefSignup':
                                $(settings.popupSel + ' input.futureType').attr('value', 'GUD Campaign Middle');
                                sp_callWebSvc("GetLeadFormLeftContent", "{'cityCode':'" + $.cookie('city') + "','formType':'" + formType + "','path':'" + encodeURIComponent(document.location.pathname) + "'}", InitLeadFormPopLeftContent);
                                break;
                            case 'seoQ':
                                $(settings.popupSel + ' input.futureType').attr('value', 'GUD Question');
                                break;
                            case 'seoSingleFormPop':
                            case 'seoSingleFormPop1':
                            case 'seoSingleFormPop2':
                            case 'seoSingleFormPop3':
                            case 'seoSingleFormPop4':
                                $(settings.popupSel + ' input.futureType').attr('value', 'GUD SEO text link');
                                break;
                            case 'textMid':
                                $(settings.popupSel + ' input.futureType').attr('value', 'GUD Text Middle');
                                break;
                            case 'textBtm':
                                $(settings.popupSel + ' input.futureType').attr('value', 'GUD Text Bottom');
                                break;
                            case 'schoolContactUs':
                                $(settings.popupSel + ' input.futureType').attr('value','GUD School Contact US');
                                if($(this).attr("data-obj") != undefined){
                                    var schoolContactUsObj = $.parseJSON($(this).attr("data-obj"));
                                    if(schoolContactUsObj.schoolCode != undefined && schoolContactUsObj.schoolName != undefined && schoolContactUsObj.stype != undefined){
                                         //check course&school
                                         if(schoolContactUsObj.stype == '3' || (schoolContactUsObj.stype == '2' && schoolContactUsObj.cflag == '3')){
                                            $(settings.popupSel + ' .formCourseList ul li[list-data="adult courses"]').click();
                                            if($(settings.popupSel + ' .schoolListWrapper input.listValue').val() == ""){
                                                 //add for school page which specify the school
                                                 $(settings.popupSel + ' .schoolListWrapper span.listLabel').text(schoolContactUsObj.schoolName);
                                                 $(settings.popupSel + ' .schoolListWrapper input.listLabel').val(schoolContactUsObj.schoolName);
                                                 $(settings.popupSel + ' .schoolListWrapper input.listValue').val(schoolContactUsObj.schoolCode);
                                             }
                                          } else if((schoolContactUsObj.stype == '1' || schoolContactUsObj.stype == '2') && ($(settings.popupSel + ' input.courseInput').val() == 'adult courses' || $(settings.popupSel + ' input.courseInput').val() == '')){
                                             var curPCode = $.cookie('product');
                                             var curPCodeTxt = "kids courses";
                                             switch(curPCode){
                                                 case "ksmall":
                                                    curPCodeTxt = "early learners";
                                                    break;
                                                 case "ttrail":
                                                      curPCodeTxt = "teenagers";
                                                      break;
                                                 case "tfrunner":
                                                      curPCodeTxt = "young adult courses";
                                                      break;
                                                 default:
                                                      break;
                                             }        
                                             $(settings.popupSel + ' .formCourseList ul li[list-data="' + curPCodeTxt + '"]').click();
                                             //add for school page which specify the school
                                             $(settings.popupSel + ' .schoolListWrapper span.listLabel').text(schoolContactUsObj.schoolName);
                                             $(settings.popupSel + ' .schoolListWrapper input.listLabel').val(schoolContactUsObj.schoolName);
                                             $(settings.popupSel + ' .schoolListWrapper input.listValue').val(schoolContactUsObj.schoolCode);
                                        } else {
                                            //add for school page which specify the school
                                            $(settings.popupSel + ' .schoolListWrapper span.listLabel').text(schoolContactUsObj.schoolName);
                                            $(settings.popupSel + ' .schoolListWrapper input.listLabel').val(schoolContactUsObj.schoolName);
                                            $(settings.popupSel + ' .schoolListWrapper input.listValue').val(schoolContactUsObj.schoolCode);
                                        }
                                    }
                                }
                                break;
                            case 'bottomPinkBtn':
                                var trType = 0;
                                if($('a.slideOpenNewLink').length>0){
                                    trType=1;
                                }
                                $('.rotatorPinkBtnPopup input.futureType').attr('value','GUD Bottom');
                                sp_callWebSvc("GetLeadFormLeftContent", "{'cityCode':'" + $.cookie('city') + "','formType':'" + formType + "','path':'" + encodeURIComponent(document.location.pathname) + "','trType':'" + trType + "'}", InitLeadFormPopLeftContent);
                                break;
                            case 'rotatorPinkBtn':
                                var url = $this.attr('redirecturl');
                                if (url) {
                                    var stag = $.cookie('stag');
                                    if (stag && stag != '')
                                    {
                                        url = url.indexOf('?') < 0 ? (url + '?stag=' + stag) : (url + '&stag=' + stag);
                                    }
                                    window.location.href = url;
                                    return false;
                                }
                                else {
                                    $('.rotatorPinkBtnPopup input.futureType').attr('value','GUD Campaign');
                                    sp_callWebSvc("GetLeadFormLeftContent", "{'cityCode':'" + $.cookie('city') + "','formType':'" + formType + "','path':'" + encodeURIComponent(document.location.pathname) + "'}", InitLeadFormPopLeftContent);
                                    break;
                                }
                            case 'button_toprotator':
                                var url = $this.attr('redirecturl');
                                if (url) {
                                    var stag = $.cookie('stag');
                                    if (stag && stag != '')
                                    {
                                        url = url.indexOf('?') < 0 ? (url + '?stag=' + stag) : (url + '&stag=' + stag);
                                    }
                                    window.open(url, 'newwindow');
                                    return;
                                }
                                break;
                            case 'schoolViewMore':
                                var cflag = $(this).attr('cFlag');
                                SchoolFormPopLeftContent(currentSchoolcode, settings.popupSel, cflag, 'GUD School Information');
                                break;
                            case 'topSchoolViewMore':
                                var cflag = $(this).attr('cFlag');
                                SchoolFormPopLeftContent(currentSchoolcode, settings.popupSel, cflag, 'GUD School View Direction');
                                break;
                            case 'bookFreeClassMid':
                                $('.rotatorPinkBtnPopup input.futureType').attr('value', 'GUD Campaign Middle');
                                sp_callWebSvc("GetLeadFormLeftContent", "{'cityCode':'" + $.cookie('city') + "','formType':'" + formType + "','path':'" + encodeURIComponent(document.location.pathname) + "'}", InitLeadFormPopLeftContent);
                                break;
                            default:
                                break;
                        }
                    }
                    // show popup
                    $(settings.popupSel).dialog("open");

                    //bind custom scrollbar
                    if( $(".customScrollbar", $(settings.popupSel)).length > 0)
                    {
                        $(".customScrollbar", $(settings.popupSel)).tinyscrollbar();
                        $(".customScrollbar", $(settings.popupSel)).data("plugin_tinyscrollbar").update();
                    }

                    //callback
                    settings.callback($this);

                    event.preventDefault();
                    //event.stopPropagation();

                 });

                 // bind close function for popup
                $(settings.popupSel).find(settings.clsBtnSel).click(function(event){

                     $(settings.popupSel).dialog("close");

                     //callback
                     settings.closecallback($this);

                     event.preventDefault();
                     event.stopPropagation();
                });

            });
      }
})(jQuery);



// for phone number popup module
(function ($) {
   var defaults =
       {
          // pop up dom selector
          popupSel: ".popupsPhoneNum",

          //pop up close element selector
          clsBtnSel: ".closeBtn",

          // popup option for dialog popup
          popupOption: { 
                dialogClass: "phoneNumPopupCon cusmPopup",
                modal: true,
                draggable: false,
                resizable:false,
                autoOpen: false,
                width: 812
             }
       };

       $.fn.popupPhoneNum = function (option) {

            var settings = $.extend(!0, {}, defaults, option);
            return this.each(function () {

                // init popup
                var $this = $(this);

                $(settings.popupSel).dialog(settings.popupOption);
                

                // after click trigger element, show popup
                $this.click(function(event){

                    // for frontend debug, need remove these two statements after backend webservice finished
//                    $(settings.popupSel).dialog("open");
//                    $(".customScrollbar", $(settings.popupSel)).tinyscrollbar();


                    // for frontend debug, need uncomment below statement after backend webservice finished
                    showPhoneNumPop();
                    event.preventDefault();
                    event.stopPropagation();

                 });

                function loadPhoneNumPop(returnValue)
                {
                    if ($(settings.popupSel).html().trim() == "" || $(settings.popupSel).attr("city") == "" || $(settings.popupSel).attr("city") != $.cookie('city'))
                    {
                        $(settings.popupSel).html(returnValue);
                        $(settings.popupSel).attr("city", $.cookie('city'));
                    }
                     // bind close function for popup
                    $(settings.popupSel).find(settings.clsBtnSel).click(function(event){

                         $(settings.popupSel).dialog("close");
                         event.preventDefault();
                         event.stopPropagation();
                    });

                    $(settings.popupSel).dialog("open");
                    $(".customScrollbar", $(settings.popupSel)).tinyscrollbar();

                    // make the first focus element blur
                    $(settings.popupSel).find(".phonePopSchool:first").blur();
                }

                function showPhoneNumPop()
                {
                    if (customPageType == "HomePage")
                    {
                        sp_callWebSvc("GetCityPhoneNumPopContent", "{'marketCode':'" + countryCode + "', 'languageCode':'" + languageCode + "'}", loadPhoneNumPop);
                    }
                    else
                    {
                        if ($("#hiddenCity").attr("hasmany") == "true")
                        {
                            sp_callWebSvc("GetSchoolPhoneNumPopContent", "{'marketCode':'" + countryCode + "', 'languageCode':'" + languageCode + "', 'cityCode':'" + $.cookie('city') + "'}", loadPhoneNumPop);
                        }
                        else
                        {
                           window.location.href = tabCityLink.replace("#citycode#", $.cookie('city'));
                        }
                    }
                }
            });
      }
    })(jQuery);



function sp_callWebSvc(wsUrl, param, callback) {
    if (param == null || param == "") {
        param = "{}";
    }

    wsUrl = "/englishfirst/api/AjaxService/" + wsUrl;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: wsUrl,
        data: param,
        dataType: "json",
        success: callback
    });
}
function ChangeTRText(data) {
    var pinkFooterTitle;
    if ($('ul.rotatorTrigger .pinkRotator').length == 1) {
        pinkFooterTitle = data.title;
        $('ul.rotatorTrigger .pinkRotator').find('div.title .pinkTitleText').text(data.title);
        $('ul.rotatorTrigger .pinkRotator').find('div.description p').text(data.subTitle);
        $('ul.rotatorTrigger .pinkRotator').find('#rotatorPinkBtn').text(data.btnTxt);
        
        if($('ul.rotatorTrigger .pinkRotator a#rotatorPinkBtn').attr('redirecturl') != undefined){
            ChangeRedirectURL($('ul.rotatorTrigger .pinkRotator a#rotatorPinkBtn'));
        }
    } else if ($('ul.shortRotator a.slideOpenNewLink').length == 1) {
        pinkFooterTitle = data.leadsTitle;
        $('ul.shortRotator a.slideOpenNewLink').find('div.headline p.headlineText').text(data.title);
        $('ul.shortRotator a.slideOpenNewLink').find('p.subTitle').text(data.subTitle);
        if ($('ul.shortRotator a.slideOpenNewLink').find('p.description').length == 3) {
            if (data.desc3 == undefined || data.desc3 == null || data.desc3 == '') {
                data.desc3 = '';
            } else {
                data.desc3 = '- ' + data.desc3;
            }
            if (data.desc2 == undefined || data.desc2 == null || data.desc2 == '') {
                data.desc2 = data.desc3;
                data.desc3 = '';
            } else {
                data.desc2 = '- ' + data.desc2;
            }
            $('ul.shortRotator a.slideOpenNewLink').find('p.description:eq(0)').text('- ' + data.desc1);
            $('ul.shortRotator a.slideOpenNewLink').find('p.description:eq(1)').text(data.desc2);
            $('ul.shortRotator a.slideOpenNewLink').find('p.description:eq(2)').text(data.desc3);
        }
        if($('ul.shortRotator a.slideOpenNewLink').attr('redirecturl') != undefined){
            ChangeRedirectURL($('ul.shortRotator a.slideOpenNewLink'));
        }
        //update leads title
        if ($('.shortLeadsFormCon p.acLeadsTitle').length == 1) {
            $('.shortLeadsFormCon p.acLeadsTitle').text(data.leadsTitle);
        }
        //update leads subtitle
        if ($('.shortLeadsFormCon p.acLeadsSubTitle').length == 1) {
            $('.shortLeadsFormCon p.acLeadsSubTitle').text(data.leadsSubTitle);
        }
    }
    if($('#bottomPinkBtn').length == 1){
        $('#bottomPinkBtn').text(data.btnTxt);
        $('#bottomPinkBtn').parent().parent().find('h4.title').text(pinkFooterTitle);
    }

    //pink rotator headline font-size auto suitable
    $(".pinkRotator .title .pinkTitleText").autoFontSize();
}
function InitLeadFormPopLeftContent(data){
    $(data.containerId + ' .title h4').html(data.title);
    $(data.containerId + ' .overview').html('<p>' + data.content + '</p>');
    $(data.containerId + ' .scrollbarAnchor .txt').tinyscrollbar();
    $(data.containerId + ' .scrollbarAnchor .txt').data("plugin_tinyscrollbar").update();
}
function SchoolFormPopLeftContent(schoolcode, container, cflag, formType){
    $(container + ' input.futureType').attr('value', formType);
    if(typeof cflag == 'undefined') cflag = "0";
    var name='';
    var address='';
    var timeTxt='';
    var phone = '';
    var opt1='',opt2='',opt3='';
    var des1 = '', des2 = '', des3 = '';
    var stype = 0;
    if(schoolJsonRaw && schoolJsonRaw.schoolInfo){
        for (var i = 0; i < schoolJsonRaw.schoolInfo.length; i++) {
            if(schoolJsonRaw.schoolInfo[i].SchoolCode == schoolcode){
                name=schoolJsonRaw.schoolInfo[i].SchoolName;
                stype = schoolJsonRaw.schoolInfo[i].SchoolType;
                address=schoolJsonRaw.schoolInfo[i].SchoolAddress;
                phone=schoolJsonRaw.schoolInfo[i].PhoneNum;
                opt1=schoolJsonRaw.schoolInfo[i].Option1;
                des1=schoolJsonRaw.schoolInfo[i].Direction1;
                opt2=schoolJsonRaw.schoolInfo[i].Option2;
                des2=schoolJsonRaw.schoolInfo[i].Direction2;
                opt3=schoolJsonRaw.schoolInfo[i].Option3;
                des3=schoolJsonRaw.schoolInfo[i].Direction3;
                var ot1=schoolJsonRaw.schoolInfo[i].WeekdaysOpenTime;
                var ct1=schoolJsonRaw.schoolInfo[i].WeekdaysCloseTime;
                var ot2=schoolJsonRaw.schoolInfo[i].SaturdayOpenTime;
                var ct2=schoolJsonRaw.schoolInfo[i].SaturdayColseTime;
                var ot3=schoolJsonRaw.schoolInfo[i].SundayOpenTime;
                var ct3=schoolJsonRaw.schoolInfo[i].SundayColseTime;

                 var weekdaysOCT=(ot1 && ct1) ? weekdaysTxt + ' ' + ot1 + ' - ' + ct1 + '<br/>' : '';
                 var saturdayOCT=(ot2 && ct2) ? saturdayTxt + ' ' + ot2 + ' - ' + ct2 + '<br/>' : '';
                 var sundayOCT=(ot3 && ct3) ? sundaysTxt + ' ' + ot3 + ' - ' + ct3 : '';

                 timeTxt = weekdaysOCT + saturdayOCT + sundayOCT;
                 break;
            }
        }
     }
     //check course&school
     if(stype == '3' || (stype == '2' && cflag == "3")){
        $(container + ' .formCourseList ul li[list-data="adult courses"]').click();
        if($(container + ' .schoolListWrapper input.listValue').val() == ""){
             //add for school page which specify the school
             $(container + ' .schoolListWrapper span.listLabel').text(name);
             $(container + ' .schoolListWrapper input.listLabel').val(name);
             $(container + ' .schoolListWrapper input.listValue').val(schoolcode);
         }
      } else if((stype == '1' || stype == '2') && ($(container + ' input.courseInput').val() == 'adult courses' || $(container + ' input.courseInput').val() == '')){
         var curPCode = $.cookie('product');
         var curPCodeTxt = "kids courses";
         switch(curPCode){
             case "ksmall":
                curPCodeTxt = "early learners";
                break;
             case "ttrail":
                  curPCodeTxt = "teenagers";
                  break;
             case "tfrunner":
                  curPCodeTxt = "young adult courses";
                  break;
             default:
                  break;
         }        
         $(container + ' .formCourseList ul li[list-data="' + curPCodeTxt + '"]').click();
         //add for school page which specify the school
         $(container + ' .schoolListWrapper span.listLabel').text(name);
         $(container + ' .schoolListWrapper input.listLabel').val(name);
         $(container + ' .schoolListWrapper input.listValue').val(schoolcode);
    } else {
         //add for school page which specify the school
         $(container + ' .schoolListWrapper span.listLabel').text(name);
         $(container + ' .schoolListWrapper input.listLabel').val(name);
         $(container + ' .schoolListWrapper input.listValue').val(schoolcode);
    }
    $(container + ' .title>h4').html(name);
    $(container + ' p.address').html(address);
    $(container + ' .detailInfo .time>.text').html(timeTxt);
    $(container + ' .detailInfo .phoneNumber>.text').html(phone);
    $(container + ' .detailInfo .directionDetail').empty().remove();
    if(opt1 && opt1 != '' && des1 && des1 != ''){
        $(container + ' .detailInfo').append('<div class="directionDetail"><p class="label">' + opt1 + '</p><p class="text">' + des1 + '</p></div>');
    }
    if(opt2 && opt2 != '' && des2 && des2 != ''){
        $(container + ' .detailInfo').append('<div class="directionDetail"><p class="label">' + opt2 + '</p><p class="text">' + des2 + '</p></div>');
    }
    if(opt3 && opt3 != '' && des3 && des3 != ''){
        $(container + ' .detailInfo').append('<div class="directionDetail"><p class="label">' + opt3 + '</p><p class="text">' + des3 + '</p></div>');
    }
    var $lastDirectionDetail = $(container + ' .detailInfo .directionDetail:last');
    if ($lastDirectionDetail)
    {
        $lastDirectionDetail.attr('class', 'directionDetail last');
        $lastDirectionDetail.find('.text').attr('class', 'text last');
    }
}
function ChangeRedirectURL(obj){
    var curCity = $.cookie('city');
    var curAgeGroup = $.cookie('AgeGroup');
    var regexOwnCityAll = new RegExp(owncityRegAllCountry);
    if(regexOwnCityAll.test(curCity)){
        if(curAgeGroup == 'kids'){
            obj.attr('redirecturl', trRedirectURL_K_O)
        }else if(curAgeGroup == 'teens'){
            obj.attr('redirecturl', trRedirectURL_T_O)
        } else if(curAgeGroup == 'adults'){
            obj.attr('redirecturl', trRedirectURL_A_O)
        }
    } else{
        if(curAgeGroup == 'kids'){
            obj.attr('redirecturl', trRedirectURL_K_F)
        }else if(curAgeGroup == 'teens'){
            obj.attr('redirecturl', trRedirectURL_T_F)
        } else if(curAgeGroup == 'adults'){
            obj.attr('redirecturl', trRedirectURL_A_F)
        }
    }
}
