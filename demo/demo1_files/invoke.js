// init and bind behavior when page load.
var homeGroup;
var menuSmartLink;
var isOwnCity;
var etownCityCode;
var etag;
var showPicker;
var regMoscow;
var regMoscowRegion;
var regStPetersburg;
var currProduct;

$(function () {
    // bind games slides show behavior for home page
    //$(".carousel").carousel();
    //$('.carousel .videoCarousel').bxSlider({ slideWidth: 225, slideMargin: 20, maxSlides: 4, autoHidePager: true, infiniteLoop: false, hideControlOnEnd: true });
    $('.carousel .videoCarousel').bxSlider({ slideWidth: 225, slideMargin: 20, maxSlides: 4, autoHidePager: true, infiniteLoop: false, hideControlOnEnd: true, onSlideBefore: function () { $('.videoCarousel li').css('margin-right', '18'); } });

    // bind the header bg rotate
    //$(".rotatorTrigger").rotate();

    // fixed the menubar
    $("#nav .nav").fixMenuPos();

    //pink rotator headline font-size auto suitable
    $(".pinkRotator .title .pinkTitleText").autoFontSize();

    //GOSAM-2032, learn more popup
    $("a.learnMoreTxt").learnMorePopup();

    // contact us popup
    $(".contact, #btmContact, #textMid, #textBtm, #midContact, #button_gudCourseMid, #button_gudCourseContactUs").popup({ popupSel: ".contactUs", popupOption: { width: 413 }, callback: function () {

        $(".contactUs input[type='text']:first").blur();
        $(".contactUs").click();

        // ie6
        if (! -[1, ] && !window.XMLHttpRequest) {
            var oldname = $(".contactUs .formContainer .inputArea .inputBox .nameInput").val();
            if (oldname.length > 0) {
                $(".contactUs .formContainer .inputArea .inputTag").attr("style", "display:none");
            }
            else {
                $(".contactUs .formContainer .inputArea .inputTag").attr("style", "display:block");
            }

            $(".contactUs").focus().click();
        }
    }
    });

    // contact us QA popup
    $("#seoQ, .seoSingleFormPop").popup({ popupSel: ".contactUsQA", callback: function () {

        $(".contactUsQA textarea:first").blur();
        $(".contactUsQA").click();

        // ie6
        if (! -[1, ] && !window.XMLHttpRequest) {
            var oldname = $(".contactUsQA .formContainer .inputArea .inputBox .nameInput").val();
            if (oldname.length > 0) {
                $(".contactUsQA .formContainer .inputArea .inputTag").attr("style", "display:none");
            }
            else {
                $(".contactUsQA .formContainer .inputArea .inputTag").attr("style", "display:block");
            }

            $(".contactUsQA").focus().click();
        }
    }
    });

    // rotator pink button popup
    $("#bookFreeClassMid, #bottomPinkBtn, #rotatorPinkBtn, #button_toprotator, #mbeWhyefSignup, #mbeBusinessSignup").popup({ popupSel: ".rotatorPinkBtnPopup", callback: function () {

        $(".rotatorPinkBtnPopup input:first").blur();
        $(".rotatorPinkBtnPopup").click();
        // ie6
        if (! -[1, ] && !window.XMLHttpRequest) {
            var oldname = $(".rotatorPinkBtnPopup .formContainer .inputArea .inputBox .nameInput").val();
            if (oldname.length > 0) {
                $(".rotatorPinkBtnPopup .formContainer .inputArea .inputTag").attr("style", "display:none");
            }
            else {
                $(".rotatorPinkBtnPopup .formContainer .inputArea .inputTag").attr("style", "display:block");
            }

            $(".rotatorPinkBtnPopup").focus().click();
        }

    }
    });

    // school moreInfo popup
    $(".schoolMoreInfo").popup({ popupSel: ".schoolMoreInfoPopup", callback: function () {

        $(".schoolMoreInfoPopup input:first").blur();
        $(".schoolMoreInfoPopup").click();

        // ie6
        if (! -[1, ] && !window.XMLHttpRequest) {
            var oldname = $(".schoolMoreInfoPopup .formContainer .inputArea .inputBox .nameInput").val();
            if (oldname.length > 0) {
                $(".schoolMoreInfoPopup .formContainer .inputArea .inputTag").attr("style", "display:none");
            }
            else {
                $(".schoolMoreInfoPopup .formContainer .inputArea .inputTag").attr("style", "display:block");
            }

            $(".schoolMoreInfoPopup").focus().click();
        }
    }
    });

    // init thankyou leads form
    $(".thankyouFormContainer").initThankYouLeadsForm();

    // add class "initvideo" for initilizing video if you want to
    $(".initVideo").initVideo();

    // init video carousel
    $(".videoCarousel").videoCarousel({ updatePoster: 1 });

    // switch language
    $(".language").changeLanguage();
    $("#footerMore").showMoreOnFooter();

    // bind popup video
    $(".popupVideo").popupVideo();

    // for partner carousel
    $(".partners").partnerCarousel({ totalWidth: 2078 });

    // for other age group
    $(".otherAge").pickAgeGroup();

    // for city picker
    $(".cityPickerTrigger").cityPicker();

    // tell friends
    $("#tellFriendsForm").addClickEvents();

    // Questionnaire response
    $('#qstionContainer').surveyResponse();

    //set city according to user's location
    autoSetCity();

    // for accordion
    $(".listWrap").initAccordion();

    //phone number popup
    $("#phonenumbertrigger-picture").popupPhoneNum();

    $('#seoRightPart').initRightPart();

    $('.demoSlider').bxSlider({ slideWidth: 225, slideMargin: 20, maxSlides: 4, autoHidePager: true, infiniteLoop: false, hideControlOnEnd: true });

    $('#kidsCourseSlides').bxSlider({ slideWidth: 300, slideMargin: 30, maxSlides: 5, moveSlides: 1, autoHidePager: true });

    $('#buyFranchiseForm').initFranchiseForm();

    if ($(document).width() >= 1625) {
        $('#kidsCourseSlides').css({ 'margin-left': 0 });
    }

    $('#videoTable').popupVideo({ triggerSel: '.demoSlider img', popupSel: '.demoVideoPopup', popupVideoId: 'efVideoPopup', popupOption: { dialogClass: "cusmPopup", autoOpen: false, modal: true, width: 770, draggable: false }, sourceTextTag: 'span', targetTextTag: '>p' });

    //whyef rotator popup video
    $(".whyefBigBg:first").rotatorPopupVideo();

    $('#eventsList').initEventsList({ popupId: '#dialogBox' });

    //for school page accordion
    $(".schoolInfoList .tabContent").accordion({
        icons: { header: "close", activeHeader: "open" },
        collapsible: true,
        active: false,
        heightStyle: "content",
        header: "> div.group > h3"
    });

    // for school page tabs
    $(".schoolInfoList").tabs();

    // for school page agegroup in menu
    $(".schoolsAgeGroup").schoolsAgeGroup();

    // for school page back to top
    $(".backToTopAnchor").click(function (e) { $('html, body').animate({ scrollTop: 0 }, 300); e.preventDefault(); });

    //load map
    if ($("#schoolsMapCon").length == 1) {
        if (typeof schoolPageFlag == 'undefined') {
            var cc = $.cookie('city');
            var cc1 = decodeURIComponent(window.document.location.pathname).toLowerCase();
            cc1 = cc1.substring(cc1.lastIndexOf('/') + 1).replace('.aspx', '');
            if (cc != cc1) {
                var options = { domain: window.location.hostname, expires: 7, path: '/' };
                $.cookie('city', cc1, options);
            }
        }
        var gCourseType = $.cookie('product');
        var gFlag = "0";
        switch (gCourseType) {
            case "ksmall":
            case "khigh":
            case "ttrail":
            case "tfrunner":
                gFlag = "1";
                break;
            case "areal":
                gFlag = "3";
                break;
            default:
                break;
        }
        if (countryCode == 'cn') {
            loadBaiduMap(gFlag);
        } else {
            loadGoogleMap(gFlag);
        }
        //add for link from welcome eamail, #GOSAM-1728
        if (typeof mapOpen != "undefined" && mapOpen == "true" && typeof schoolCode != "undefined") {
            if ($("#schoolMI_" + schoolCode).length > 0) {
                $("#schoolMI_" + schoolCode)[0].click();
            } else if ($("#topSchoolMI_" + schoolCode).length > 0) {
                $("#topSchoolMI_" + schoolCode)[0].click();
            }
        }

        // add a scroll down button for touch device
        $(window).load(function () {
            addScrollDownBtn();
            fixScrollDownPos();
        });
        $(window).resize(function () {
            addScrollDownBtn();
            fixScrollDownPos();
        });
        $(window).scroll(function () {
            fixScrollDownPos();
            setTimeout(function () { fixScrollDownPos(); }, 500);
            setTimeout(function () { fixScrollDownPos(); }, 1000);
            setTimeout(function () { fixScrollDownPos(); }, 1500);
            setTimeout(function () { fixScrollDownPos(); }, 2000);
        });

        function fixScrollDownPos() {
            var $mapsScrollDownCon = $(".mapsScrollDownCon");
            if ($mapsScrollDownCon.length > 0) {
                var $window = $(window);
                var distance = 650 - $window.height() - $window.scrollTop();
                if (distance >= 0) {
                    $mapsScrollDownCon.css("bottom", distance + "px");
                }
                else {
                    $mapsScrollDownCon.css("bottom", "0");
                }
            }
        }

        function addScrollDownBtn() {
            // only for touch device, when height is not enough to show the maps
            if (document.hasOwnProperty("ontouchstart") && $(window).height() <= $(window).width()) {
                if ($(".mapsScrollDownCon").length < 1) {
                    var scrollDownText = $("#schoolsMapScrollDown").val();
                    var $scrollDownDom = $("<div class='mapsScrollDownCon'><p class='scrollDown'> </p><span>" + scrollDownText + "</span></div>");

                    $scrollDownDom.find(".scrollDown").click(function (e) {
                        $('html, body').animate({ scrollTop: 650 }, 300);
                        e.preventDefault();
                    });
                    $("#schoolsMapCon").closest(".schoolRotator").append($scrollDownDom);
                }
            }
            else {
                $(".mapsScrollDownCon").remove();
            }
        }
    }

    // init leads form
    $(".formContainer").initLeadsForm();

    // for school page citypicker refresh page, only for school pages
    if (window.location.href.toLowerCase().indexOf("/cities/") > 0) {
        $("#mainCity a, #cpCityList a").refreshedCityPicker();
    }

    if (typeof schoolPageFlag != 'undefined' && schoolPageFlag) {
        $(".cityPickerTrigger").click();
    }

    // aboutef page popup
    $(".aboutEF .readMoreEF").popup({ popupSel: ".aboutEFPopup", popupOption: { width: 720} });

    // aboutef page history slides
    $(".historyEF .eventsList ul").bxSlider({ slideWidth: 158, slideMargin: 0, moveSlides: 1, maxSlides: 5, pager: false, infiniteLoop: true, hideControlOnEnd: true,
        onSliderLoad: function ($slideElement, oldIndex, newIndex) {

            // make sure there is only one active item, (remove the acitve item in the copies item)
            var $activeItems = $(".eventsList ul li.current").eq(0);
            $(".eventsList ul li").removeClass("current");
            $activeItems.addClass("current");
        },
        onSlideNext: function ($slideElement, oldIndex, newIndex) {

            //switch the active year
            var $activeItems = $(".eventsList ul li.current").eq(0);
            var $nextItem;
            $(".eventsList ul li").removeClass("current");

            // if there is a next element
            if (($activeItems.next().length > 0) && ($activeItems.next().index() < $(".eventsList ul li").length - 3)) {
                $nextItem = $activeItems.next();
            }
            else {
                $nextItem = $(".eventsList li").not(".bx-clone").eq(2);
            }

            $nextItem.addClass("current");

            // switch the event content
            $(".historyEF .history .yearText").html($nextItem.find(".years").html());
            $(".historyEF .history .eventText").html($nextItem.find(".event").val());

        },
        onSlidePrev: function ($slideElement, oldIndex, newIndex) {

            //switch the active year
            var $activeItems = $(".eventsList ul li.current").eq(0);
            var $nextItem;
            $(".eventsList ul li").removeClass("current");

            // if there is a next element
            if (($activeItems.prev().length > 0) && ($activeItems.prev().index() > 6)) {
                $nextItem = $activeItems.prev();
            }
            else {
                $nextItem = $(".eventsList li:last").prev().prev().prev();
            }

            $nextItem.addClass("current");

            // switch the event content
            $(".historyEF .history .yearText").html($nextItem.find(".years").html());
            $(".historyEF .history .eventText").html($nextItem.find(".event").val());
        }

    });

    // TV coverage page video popup
    $(".tvCoverageVideoList .popupTrigger").popup({ popupSel: ".tvCoveragePopup", targetTextTag: ".desTxt", popupOption: { width: 770 },
        callback: function ($this) {
            $parent = $this.parent();
            var videosrc = $("input:hidden", $parent).val();
            var textsrc = $(".targetTxt", $parent).html();

            $(".tvCoveragePopup").find(".tvVideoHolder").html(videosrc);
            $(".tvCoveragePopup").find(".desTxt").html(textsrc);
            $(".tvCoveragePopup").find(".tvVideoHolder").find("embed").attr("width", 650).attr("height", 368);
        },

        closecallback: function ($this) {
            $(".tvCoveragePopup").find(".tvVideoHolder").html("");
        }
    });

    // teens school banner
    $(".teensSchoolBanner").fixedBanner();

    // cut header
    $.cutHeader();
    $(window).load(function () {
        $.cutHeader();
    });
    $(window).resize(function () {
        $.cutHeader();
    });

    $(".header .right .tel").on("click", "#moscowPhoneNsum", function () {
        $("#phonenumbertrigger-picture").click();
    });

    // bind scroll down behavior for top rotator scrolldown button
    $(".rotator .scrolldownIcon").click(function () {
        $('html, body').animate({ scrollTop: 650 }, 300);
    });

    // for seo lightbox popup
    $.popupLightBox();

    // remove the volume control bar for device
    if (_V_.isAndroid() || _V_.isIOS()) {
        $("body").addClass("body_device");
    }

    if (_V_.isAndroid()) {
        $("body").addClass("body_device_android");
    }

    // for new product page "find a school now"
    $("#button_gudFindASchool").attr("href", $("#menu-SCHOOL a").attr("href"));

    // update banner
    setLandingBanner(cityCode);

    function autoSetCity() {
        var isSetCity = $.cookie("isSetCity");
        if (countryCode == "cn" && languageCode == "cs" && !isSetCity) {
            var url = "http://api.map.baidu.com/location/ip?ak=631E83D625b70eb82ee3df2195c87c92&callback=?";
            $.getJSON(url, function (data) {
                if (typeof (data) != "undefined" && typeof (data.content) != "undefined" && typeof (data.content.address_detail) != "undefined" && typeof (data.content.address_detail.city) != "undefined") {
                    var cityName = data.content.address_detail.city;
                    var cpCities = jsonRaw.CityInfos;
                    for (var i = 0; i < cpCities.length; i++) {
                        if (cityName.indexOf(cpCities[i].t) >= 0) {
                            $('.cityLabel').text(cpCities[i].t);
                            $.cookie("isSetCity", "true", { domain: window.location.hostname, path: '/' });
                            var options = { domain: window.location.hostname, expires: 7, path: '/' };
                            $.cookie('city', cpCities[i].v, options);
                            $.cookie('e1legacy', true, options);
                            $('.' + cpCities[i].v + 'City').click();
                            return;
                        }
                    }
                }
            });
        }
    }

    function loadBaiduMap(cFlag) {
        var map = new BMap.Map("schoolsMapCon");
        map.addControl(new BMap.NavigationControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT }));

        function addMarker(point, type, sc, cFlag1) {
            cFlag1 = cFlag1 || cFlag;
            if (cFlag1 == "0" || (sc != "xiaoshan" && type == "2") || type == cFlag1 || (sc == "xiaoshan" && cFlag1 == "1")) {
                var markerIconPath = sCacheSvr + "/_imgs/englishfirst/GUD/Schools/schoolsPoint.png";
                var mk = new BMap.Marker(point, { icon: new BMap.Icon(markerIconPath, new BMap.Size(30, 40)) });

                // check if browser is ie6, use another img
                if (! -[1, ] && !window.XMLHttpRequest) {
                    var markerIconPath2 = sCacheSvr + "/_imgs/englishfirst/GUD/Schools/schoolsPoint_ie6.gif";
                    mk = new BMap.Marker(point, { icon: new BMap.Icon(markerIconPath2, new BMap.Size(30, 40)) });
                }

                //mk.disableMassClear();
                map.addOverlay(mk);
                return mk;
            }

            return null;
        }

        function mkEventHandler(e) {
            var cFlag1 = e.target.extra.sflag || cFlag;
            var popUpOuterHtml = '<div class="mapsPopup schoolPoint"><div class="mapsBody"><p class="schoolName helvetica_' + languageCode + '">' + e.target.extra.SchoolName + '</p><p class="schoolAddress">' + e.target.extra.SchoolAddress + '<a href="javascript:void(null)" id="schoolMI_' + e.target.extra.SchoolCode + '" class="schoolMoreInfo">' + viewMoreTxt + '</a></p></div></div>';
            var infoWindow = new BMap.InfoWindow(popUpOuterHtml);
            e.currentTarget.addEventListener("infowindowopen", schoolsMapPopup = function () {
                // for school maps popup
                var $cMarker = $(this);
                $(".schoolRotator .schoolPoint, .schoolRotator .schoolPoint .schoolMoreInfo").schoolsMap({ marker: $cMarker, cFlag: cFlag1, code: e.target.extra.SchoolCode, stype: e.target.extra.SchoolType, name: e.target.extra.SchoolName, address: e.target.extra.SchoolAddress, phoneNum: e.target.extra.PhoneNum, ot1: e.target.extra.WeekdaysOpenTime, ct1: e.target.extra.WeekdaysCloseTime, ot2: e.target.extra.SaturdayOpenTime, ct2: e.target.extra.SaturdayColseTime, ot3: e.target.extra.SundayOpenTime, ct3: e.target.extra.SundayColseTime });
                // school moreInfo popup
                //$(".schoolRotator .schoolPoint .schoolMoreInfo").popup({ popupSel: ".schoolMoreInfoPopup" });
                var scrolltop = $(window).scrollTop();
                var x = $('.mapsPopup').offset().top;
                if (scrolltop < 170) {
                    if (x < 265) {
                        map.panBy(0, 265 - x);
                    }
                } else {
                    if (scrolltop > 410) {
                        $(window).scrollTop(410);
                        scrolltop = 410;
                    }
                    if (x < scrolltop + 100) {
                        map.panBy(0, scrolltop + 100 - x);
                    }
                }
                e.currentTarget.removeEventListener("infowindowopen", schoolsMapPopup);
            });
            e.currentTarget.openInfoWindow(infoWindow);
        }

        (function () {
            var cc2 = $.cookie('city');
            var cPoint;
            if (typeof sCoordinates != 'undefined' && typeof sCoordinates[cc2] != 'undefined') {
                cPoint = new BMap.Point(sCoordinates[cc2].split(',')[0], sCoordinates[cc2].split(',')[1]);
            }
            var sIndex;
            var sCount = 0;
            for (var i = 0; i < schoolJsonRaw.schoolInfo.length; i++) {
                var point = new BMap.Point(schoolJsonRaw.schoolInfo[i].Lng, schoolJsonRaw.schoolInfo[i].Lat);
                var mk = addMarker(point, schoolJsonRaw.schoolInfo[i].SchoolType, schoolJsonRaw.schoolInfo[i].SchoolCode);
                if (mk != null) {
                    mk.addEventListener("click", mkEventHandler);
                    mk.addEventListener("mouseover", mkEventHandler);
                    mk.extra = schoolJsonRaw.schoolInfo[i];
                    sCount++;
                    sIndex = i;
                }
            }
            if (sCount == 1) {
                cPoint = new BMap.Point(schoolJsonRaw.schoolInfo[sIndex].Lng, schoolJsonRaw.schoolInfo[sIndex].Lat);
                map.centerAndZoom(cPoint, 16);
            } else {
                if (typeof cPoint != 'undefined') {
                    map.centerAndZoom(cPoint, 12);
                } else {
                    map.centerAndZoom(cityName, 12);
                }
            }
        })();
        $(".schoolsAgeGroup .schoolsAgeGroupList li").click(function (event) {
            $(".schoolsAgeGroup .schoolsAgeGroupList").addClass("hide");
            $(".schoolsAgeGroup .selectedSchoolsAgeGroup .shownSchools").removeClass("shownSchoolsLight");
            var scourseValue = $(this).find('input.schoolsAgeGroupValue').val();
            //GOSAM-2108
            if (scourseValue == 3) {
                $(".schoolTabs .adultsTab").parents(".tab").click();
            } else {
                $(".schoolTabs .kidsTab").parents(".tab").click();
            }
            if (scourseValue != $(".schoolsAgeGroup .selectedSchoolsAgeGroup input.schoolsAgeGroupValue").val()) {
                if (typeof scourseValue == 'undefined') scourseValue = "0";
                var scourseTxt = $(this).find('a').text();
                $(".schoolsAgeGroup .selectedSchoolsAgeGroup .shownSchools").text(scourseTxt);
                $(".schoolsAgeGroup .selectedSchoolsAgeGroup .schoolsAgeGroupValue").val(scourseValue);

                resetBaiduMap(scourseValue);
            }

            event.preventDefault();
            event.stopPropagation();
        });
        function resetBaiduMap(c) {
            map.clearOverlays();
            var sIndex;
            var sCount = 0;
            for (var i = 0; i < schoolJsonRaw.schoolInfo.length; i++) {
                var point = new BMap.Point(schoolJsonRaw.schoolInfo[i].Lng, schoolJsonRaw.schoolInfo[i].Lat);
                var mk = addMarker(point, schoolJsonRaw.schoolInfo[i].SchoolType, schoolJsonRaw.schoolInfo[i].SchoolCode, c);
                if (mk != null) {
                    mk.addEventListener("click", mkEventHandler);
                    mk.addEventListener("mouseover", mkEventHandler);
                    mk.extra = $.extend(!0, { 'sflag': c }, schoolJsonRaw.schoolInfo[i]);
                    sCount++;
                    sIndex = i;
                }
            }
            if (sCount == 1) {
                var point1 = new BMap.Point(schoolJsonRaw.schoolInfo[sIndex].Lng, schoolJsonRaw.schoolInfo[sIndex].Lat);
                map.centerAndZoom(point1, 16);
            } else if (sCount > 1) {
                var cc2 = $.cookie('city');
                if (typeof sCoordinates != 'undefined' && typeof sCoordinates[cc2] != 'undefined') {
                    var cPoint = new BMap.Point(sCoordinates[cc2].split(',')[0], sCoordinates[cc2].split(',')[1]);
                    map.centerAndZoom(cPoint, 12);
                } else {
                    map.centerAndZoom(cityName, 12);
                }
            }
        }
    }
    function loadGoogleMap(cFlag) {
        var gCityCenter;
        var gCityZoom;
        var cc2 = $.cookie('city');
        if (typeof sCoordinates != 'undefined' && typeof sCoordinates[cc2] != 'undefined') {
            gCityCenter = new google.maps.LatLng(sCoordinates[cc2].split(',')[1], sCoordinates[cc2].split(',')[0]);
            gCityZoom = 10;
        } else {
            gCityCenter = new google.maps.LatLng(schoolJsonRaw.schoolInfo[0].Lat, schoolJsonRaw.schoolInfo[0].Lng);
            if (schoolJsonRaw.schoolInfo.length == 1) {
                if (countryCode == 'id') {
                    gCityZoom = 15;
                } else {
                    gCityZoom = 14;
                }
            } else {
                gCityZoom = 10;
            }
        }
        var mapOptions = {
            center: gCityCenter,
            zoom: gCityZoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            panControl: true,
            panControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL,
                position: google.maps.ControlPosition.BOTTOM_LEFT
            },
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.DEFAULT,
                position: google.maps.ControlPosition.BOTTOM_LEFT
            }
        };
        var map = new google.maps.Map(document.getElementById("schoolsMapCon"), mapOptions);
        var markers = [];
        var infowindows = [];
        function addMarker(data) {
            var markerIconPath = sCacheSvr + "/_imgs/englishfirst/GUD/Schools/schoolsPoint.png";
            var marker = new google.maps.Marker({ position: new google.maps.LatLng(data.Lat, data.Lng), icon: new google.maps.MarkerImage(markerIconPath, new google.maps.Size(30, 40)) });

            // check if browser is ie6, use another img
            if (! -[1, ] && !window.XMLHttpRequest) {
                var markerIconPath2 = sCacheSvr + "/_imgs/englishfirst/GUD/Schools/schoolsPoint_ie6.gif";
                marker = new google.maps.Marker({ position: new google.maps.LatLng(data.Lat, data.Lng), icon: new google.maps.MarkerImage(markerIconPath2, new google.maps.Size(30, 40)) });
            }

            if (cFlag == "0" || (cc2 != 'moscow' && data.SchoolType == "2") || data.SchoolType == cFlag || (cc2 == 'moscow' && data.SchoolType == "2" && cFlag == "1")) {
                marker.setMap(map);
            } else {
                marker.setMap(null);
            }
            markers.push(marker);
            return marker;
        }
        function attachEvent(marker, index, cFlag1) {
            cFlag1 = cFlag1 || cFlag;
            if (typeof infowindows[index] == 'undefined') {
                infowindows[index] = new google.maps.InfoWindow(
                    {
                        content: '<div class="mapsPopup schoolPoint"><div class="mapsBody"><p class="schoolName helvetica_' + languageCode + '">' + schoolJsonRaw.schoolInfo[index].SchoolName + '</p><p class="schoolAddress">' + schoolJsonRaw.schoolInfo[index].SchoolAddress + '<a href="javascript:void(null)" id="schoolMI_' + schoolJsonRaw.schoolInfo[index].SchoolCode + '" class="schoolMoreInfo">' + viewMoreTxt + '</a></p></div></div>'
                    });
                google.maps.event.addListener(infowindows[index], 'domready', function () {
                    var scrolltop = $(window).scrollTop();
                    var x = $('.mapsPopup').offset().top;
                    if (scrolltop < 190) {
                        if (x < 240) {
                            map.panBy(0, x - 240);
                        }
                    } else {
                        if (scrolltop > 420) {
                            $(window).scrollTop(420);
                            scrolltop = 420;
                        }
                        if (x < scrolltop + 50) {
                            map.panBy(0, x - scrolltop - 50);
                        }
                    }
                });
            }

            google.maps.event.addListener(marker, 'mouseover', function () {
                CloseGInofWindow();
                infowindows[index].open(marker.get('map'), marker);
                // for school maps popup
                $(".schoolRotator .schoolPoint, .schoolRotator .schoolPoint .schoolMoreInfo").schoolsMap({ infoWin: infowindows[index], cFlag: cFlag1, code: schoolJsonRaw.schoolInfo[index].SchoolCode, stype: schoolJsonRaw.schoolInfo[index].SchoolType, name: schoolJsonRaw.schoolInfo[index].SchoolName, address: schoolJsonRaw.schoolInfo[index].SchoolAddress, phoneNum: schoolJsonRaw.schoolInfo[index].PhoneNum, ot1: schoolJsonRaw.schoolInfo[index].WeekdaysOpenTime, ct1: schoolJsonRaw.schoolInfo[index].WeekdaysCloseTime, ot2: schoolJsonRaw.schoolInfo[index].SaturdayOpenTime, ct2: schoolJsonRaw.schoolInfo[index].SaturdayColseTime, ot3: schoolJsonRaw.schoolInfo[index].SundayOpenTime, ct3: schoolJsonRaw.schoolInfo[index].SundayColseTime });
                // school moreInfo popup
                //$(".schoolRotator .schoolPoint .schoolMoreInfo").popup({ popupSel: ".schoolMoreInfoPopup" });
            });
            google.maps.event.addListener(marker, 'click', function () {
                CloseGInofWindow();
                infowindows[index].open(marker.get('map'), marker);
                // for school maps popup
                $(".schoolRotator .schoolPoint, .schoolRotator .schoolPoint .schoolMoreInfo").schoolsMap({ infoWin: infowindows[index], cFlag: cFlag1, code: schoolJsonRaw.schoolInfo[index].SchoolCode, stype: schoolJsonRaw.schoolInfo[index].SchoolType, name: schoolJsonRaw.schoolInfo[index].SchoolName, address: schoolJsonRaw.schoolInfo[index].SchoolAddress, phoneNum: schoolJsonRaw.schoolInfo[index].PhoneNum, ot1: schoolJsonRaw.schoolInfo[index].WeekdaysOpenTime, ct1: schoolJsonRaw.schoolInfo[index].WeekdaysCloseTime, ot2: schoolJsonRaw.schoolInfo[index].SaturdayOpenTime, ct2: schoolJsonRaw.schoolInfo[index].SaturdayColseTime, ot3: schoolJsonRaw.schoolInfo[index].SundayOpenTime, ct3: schoolJsonRaw.schoolInfo[index].SundayColseTime });
                // school moreInfo popup
                //$(".schoolRotator .schoolPoint .schoolMoreInfo").popup({ popupSel: ".schoolMoreInfoPopup" });
            });
        }

        (function () {
            var sIndex;
            var sCount = 0;
            for (var i = 0; i < schoolJsonRaw.schoolInfo.length; i++) {
                var marker = addMarker(schoolJsonRaw.schoolInfo[i]);
                if (marker.map != null) {
                    attachEvent(marker, i);
                    sCount++;
                    sIndex = i;
                }
            }
            if (sCount == 1) {
                var gPoint = new google.maps.LatLng(schoolJsonRaw.schoolInfo[sIndex].Lat, schoolJsonRaw.schoolInfo[sIndex].Lng);
                map.setCenter(gPoint);
                if (countryCode == 'id') {
                    map.setZoom(15);
                } else {
                    map.setZoom(14);
                }
            }
        })();
        google.maps.event.addDomListener(map, 'click', function () {
            CloseGInofWindow();
        });
        function CloseGInofWindow() {
            if (infowindows && infowindows.length > 0) {
                for (var i = 0; i < infowindows.length; i++) {
                    if (typeof infowindows[i] != "undefined") {
                        infowindows[i].close();
                    }
                }
            }
        }
        $(".schoolsAgeGroup .schoolsAgeGroupList li").click(function (event) {
            $(".schoolsAgeGroup .schoolsAgeGroupList").addClass("hide");
            $(".schoolsAgeGroup .selectedSchoolsAgeGroup .shownSchools").removeClass("shownSchoolsLight");
            var scourseValue = $(this).find('input.schoolsAgeGroupValue').val();
            //GOSAM-2108
            if (scourseValue == 3) {
                $(".schoolTabs .adultsTab").parents(".tab").click();
            } else {
                $(".schoolTabs .kidsTab").parents(".tab").click();
            }
            if (scourseValue != $(".schoolsAgeGroup .selectedSchoolsAgeGroup input.schoolsAgeGroupValue").val()) {
                CloseGInofWindow();
                if (typeof scourseValue == 'undefined') scourseValue = "0";
                var scourseTxt = $(this).find('a').text();
                $(".schoolsAgeGroup .selectedSchoolsAgeGroup .shownSchools").text(scourseTxt);
                $(".schoolsAgeGroup .selectedSchoolsAgeGroup .schoolsAgeGroupValue").val(scourseValue);

                resetGoogleMap(scourseValue);
            }

            event.preventDefault();
            event.stopPropagation();
        });
        function resetGoogleMap(c) {
            var sIndex;
            var sCount = 0;
            for (var i = 0; i < schoolJsonRaw.schoolInfo.length; i++) {
                var st = schoolJsonRaw.schoolInfo[i].SchoolType;
                var sc1 = schoolJsonRaw.schoolInfo[i].SchoolCode;
                if (c == "0" || (cc2 != 'moscow' && st == "2") || st == c || (cc2 == 'moscow' && st == "2" && c == "1")) {
                    markers[i].setMap(map);
                    if (schoolJsonRaw.schoolInfo[i].SchoolType == "2") {
                        attachEvent(markers[i], i, c);
                    }
                    sCount++;
                    sIndex = i;
                } else {
                    markers[i].setMap(null);
                }
            }
            if (sCount == 1) {
                var gPoint = new google.maps.LatLng(schoolJsonRaw.schoolInfo[sIndex].Lat, schoolJsonRaw.schoolInfo[sIndex].Lng);
                map.setCenter(gPoint);
                if (countryCode == 'id') {
                    map.setZoom(15);
                } else {
                    map.setZoom(14);
                }
            } else if (sCount > 1) {
                var gCityCenter;
                var gCityZoom;
                var cc2 = $.cookie('city');
                if (typeof sCoordinates != 'undefined' && typeof sCoordinates[cc2] != 'undefined') {
                    gCityCenter = new google.maps.LatLng(sCoordinates[cc2].split(',')[1], sCoordinates[cc2].split(',')[0]);
                    gCityZoom = 10;
                } else {
                    gCityCenter = new google.maps.LatLng(schoolJsonRaw.schoolInfo[0].Lat, schoolJsonRaw.schoolInfo[0].Lng);
                    if (schoolJsonRaw.schoolInfo.length == 1) {
                        if (countryCode == 'id') {
                            gCityZoom = 15;
                        } else {
                            gCityZoom = 14;
                        }
                    } else {
                        gCityZoom = 10;
                    }
                }
                map.setCenter(gCityCenter);
                map.setZoom(gCityZoom);
            }
        }
    }
});


// update landing banner in product page now
function setLandingBanner(cityCode) {
    var $landingBanner = $(".landingBanner");
    var $landingBannerImg = $("#landingBannerImg");
    var $landingBannerlink = $("#landingBannerlink");

    if ($landingBanner.length > 0 && $landingBannerImg.length > 0 && $landingBannerlink.length > 0) {

        var bannerImgObj = $.parseJSON($("#landingBannerImg").val());
        var bannerLinkObj = $.parseJSON($("#landingBannerlink").val());
        var keystr = countryCode;
        var bannerRegexOwnCity;

        // for agegroup
        if (currProduct == "ksmall" || currProduct == "khigh")
        {
            keystr += "_kids";
        }
        else if (currProduct == "ttrail" || currProduct == "tfrunner")
        {
            keystr += "_teens";
        }
        else if (currProduct == "areal")
        {
            keystr += "_adults";
        }

        // for own or franchise
        if (countryCode == "cn")
        {
            bannerRegexOwnCity = new RegExp(regOwnCity);
        }
        else if (countryCode == "ru")
        {
            bannerRegexOwnCity = new RegExp(regOwnCityRU);
        }
        else if (countryCode == "id")
        {
            bannerRegexOwnCity = new RegExp(regOwnCityID);
        }

        if (cityCode && bannerRegexOwnCity.exec(cityCode)) {
            keystr += "_own";
        }
        else {
            keystr += "_fra";
        }


        // get right banner and link
        var banner1img = bannerImgObj["banner1"][keystr].img;
        var banner1link = bannerLinkObj["banner1"][keystr].link;
        var banner2img = bannerImgObj["banner2"][keystr].img;
        var banner2link = bannerLinkObj["banner2"][keystr].link;

        // append stag to the url
        var stag = $.cookie("stag");
        if(stag)
        {
            if (banner1link.indexOf("?") > 0) {
                banner1link += "&stag=" + stag;
            }
            else {
                banner1link += "?stag=" + stag;
            }

            if (banner2link.indexOf("?") > 0) {
                banner2link += "&stag=" + stag;
            }
            else {
                banner2link += "?stag=" + stag;
            }
        }

        // set banner and link
        $(".banner1", $landingBanner).attr("href", banner1link);
        $(".banner1 img", $landingBanner).attr("src", banner1img);

        $(".banner2", $landingBanner).attr("href", banner2link);
        $(".banner2 img", $landingBanner).attr("src", banner2img);
    }
}
