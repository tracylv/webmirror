

// for switching between tabs
(function ($) {
    var defaults =
    {
        // tabs selector
        tabSel: ".tab",

        // for active tab
        activeClass: "active",

        // content selector
        contentSel: ".tabContents .tabContent"
    };

    $.fn.tabs = function (option) {
        var settings = $.extend(!0, {}, defaults, option);
        return this.each(function () {

            var $con = $(this);
            var tabSel = settings.tabSel;
            var activeClass = settings.activeClass;
            var contentSel = settings.contentSel;

            // bind click for tabs
            $(tabSel, $con).click(function () {

                var $this = $(this);

                // if current tab is active, return
                if ($this.hasClass(activeClass)) {
                    return;
                }

                // switch tab and corresponding content
                $(tabSel, $con).removeClass(activeClass);
                $this.addClass(activeClass);

                var index = $this.index();
                $(contentSel, $con).hide();
                $(contentSel, $con).eq(index).show();

            });

        });
    }
})(jQuery);

// for switching between tabs
(function ($) {
    var defaults =
    {
        // for container which contain schools info and leadsform
        containerSel: ".schoolsAndForm",

        // school info selector
        schoolSel: ".rotatorSchoolsInfo",

        // school page form selector
        formSel: ".schoolsFormCon"

    };

    $.fn.schoolsMap = function (option) {
        var settings = $.extend(!0, {}, defaults, option);
        return this.each(function () {

            var $con = $(settings.containerSel);
            var $schoolInfo = $(settings.schoolSel, $con);
            var $leadForm = $(settings.formSel, $con);


            // bind click for tabs
            $(this).click(function(e){
                 //check course&school
                 if(settings.stype == '3' || (settings.stype == '2' && settings.cFlag == "3")){
                    $('.formCourseList ul li[list-data="adult courses"]',$leadForm).click();
                    if($('.schoolListWrapper input.listValue',$leadForm).val() == ""){
                      //Initial school info                  
                     $('.schoolListWrapper span.listLabel',$leadForm).text(settings.name);
                     $('.schoolListWrapper input.listLabel',$leadForm).val(settings.name);
                     $('.schoolListWrapper input.listValue',$leadForm).val(settings.code);
                    }
                 } else if((settings.stype == '1' || settings.stype == '2') && ($('input.courseInput',$leadForm).val() == 'adult courses' || $('input.courseInput',$leadForm).val() == '')){
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
                    $('.formCourseList ul li[list-data="' + curPCodeTxt + '"]',$leadForm).click();
                      //Initial school info                  
                     $('.schoolListWrapper span.listLabel',$leadForm).text(settings.name);
                     $('.schoolListWrapper input.listLabel',$leadForm).val(settings.name);
                     $('.schoolListWrapper input.listValue',$leadForm).val(settings.code);
                 } else {
                      //Initial school info                  
                     $('.schoolListWrapper span.listLabel',$leadForm).text(settings.name);
                     $('.schoolListWrapper input.listLabel',$leadForm).val(settings.name);
                     $('.schoolListWrapper input.listValue',$leadForm).val(settings.code);
                 }
                 // only show school info
                 $('#schoolContactUs',$schoolInfo).attr('data-obj','{"schoolCode":"'+settings.code+'","schoolName":"'+settings.name+'","stype":"'+settings.stype+'","cflag":"'+settings.cFlag+'"}');
                 $('.name',$schoolInfo).html(settings.name);
                 $('.address',$schoolInfo).html(settings.address);
                 var weekdaysOCT=(settings.ot1 && settings.ct1) ? weekdaysTxt + ' ' + settings.ot1 + ' - ' + settings.ct1 + '<br/>' : '';
                 var saturdayOCT=(settings.ot2 && settings.ct2) ? saturdayTxt + ' ' + settings.ot2 + ' - ' + settings.ct2 + '<br/>' : '';
                 var sundayOCT=(settings.ot3 && settings.ct3) ? sundaysTxt + ' ' + settings.ot3 + ' - ' + settings.ct3 : '';
                 $('.detailInfo .time>.text',$schoolInfo).html(weekdaysOCT + saturdayOCT + sundayOCT);
                 $('.detailInfo .phoneNumber>.text',$schoolInfo).html(settings.phoneNum);
                 $('.detailInfo .direction .schoolMoreInfo',$schoolInfo).attr('id', 'topSchoolMI_' + settings.code);
                 $('.detailInfo .direction .schoolMoreInfo',$schoolInfo).attr('cFlag', settings.cFlag);
                 if(settings.marker && settings.marker.length == 1){
                    settings.marker[0].closeInfoWindow();
                 }
                 if(settings.infoWin){
                    settings.infoWin.close();
                 }
                 $schoolInfo.show();
                 $con.show();

                 // show the corresponding schools in the bottom school list
                 // should be update after backend finished, just an example here
                 //just update the selector name
                 if($(".schoolInfoList .tabContents .tabContent").length > 1){
                    var $schoolContainer;
                    var tabIndex = 1;
                    if(settings.cFlag == "3"){
                        $schoolContainer = $(".schoolInfoList .tabContents .tabContent").eq(1);
                    }else if(settings.cFlag == "0"){
                        if(settings.stype == "3"){
                            tabIndex = 1;
                        }else{
                            tabIndex = 0;
                        }
                        $schoolContainer = $(".schoolInfoList .tabContents .tabContent").eq(tabIndex);
                    }else{
                        $schoolContainer = $(".schoolInfoList .tabContents .tabContent").eq(0);
                        tabIndex = 0;
                    }
                    var $curGroup = $("#school_" + settings.code, $schoolContainer).closest(".tabContent .group").find("h3");
                    if($curGroup.length > 0 && $curGroup.attr("aria-selected") != "true"){
                        $(".schoolInfoList .tabContents .tabContent .group h3[aria-selected='true']").click();
                        $curGroup.click();
                    }
                    if($(".schoolInfoList .schoolTabs .tab").length > 0){
                        $(".schoolInfoList .schoolTabs .tab").eq(tabIndex).click();
                    }
                 }else{
                    $("#school_" + settings.code + ":hidden").closest(".tabContent .group").find("h3").click();
                 }

                 // example end

                 e.preventDefault();
                 e.stopPropagation();
            });

            // after clicked "Apply now" button, show leads form
            $(".schoolsApplyNow", $schoolInfo).click(function(e){
                 $leadForm.show();
                 // add a class for top close button container
                 $(".schoolsTop", $con).addClass("longSchoolsTop");
                 $con.addClass("longSchoolsAndForm");

                // ie6
                if (! -[1, ] && !window.XMLHttpRequest) {
                    var oldname = $(".schoolsAndForm .formContainer .inputArea .inputBox .nameInput").val();
                    if (oldname.length > 0) {
                        $(".schoolsAndForm .formContainer .inputArea .inputTag").attr("style", "display:none");
                    }
                    else {
                        $(".schoolsAndForm .formContainer .inputArea .inputTag").attr("style", "display:block");
                    }

                    $(".schoolsAndForm").focus().click();
                }


                 e.preventDefault();
            });

            // bind close button behavior
            $(".schoolsTop .closeBtn", $con).click(function(e){
                 $leadForm.hide();
                 $con.hide();
                 $(".schoolsTop", $con).removeClass("longSchoolsTop");
                 $con.removeClass("longSchoolsAndForm");
                 e.preventDefault();

                 // close the corresponding schools in the bottom school list
                 // should be update after backend finished, just an example here
                 //just update the selector name
                 $("#schoolName_school1").closest(".tabContent .group").find("h3").click();
                 // example end
            });

        });
    }
})(jQuery);


// for refresh
(function ($) {
    var defaults =
    {
        // school page url format
        schoolsPartialUrl: "/englishfirst/gud/cities/"
    };

    $.fn.refreshedCityPicker = function (option) {
        var settings = $.extend(!0, {}, defaults, option);
        return this.each(function () {

            var $this = $(this);
            var schoolsPartialUrl = settings.schoolsPartialUrl;

            $this.click(function(event){

                if($this.attr("data-obj") != undefined)
                {
                    var dataobj = $.parseJSON($this.attr("data-obj"));
                    
                    // navigate to new url
                    window.location = "http://" + currDomain + schoolsPartialUrl + dataobj.cityCode + '.aspx';
                }

                event.preventDefault();
                event.stopPropagation();
            });
        });
    }
})(jQuery);



// for schools page agegroup in menu
(function ($) {
    var defaults =
    {
        selectedAgeGroupCon: ".selectedSchoolsAgeGroup",

        ageGroupListCon: ".schoolsAgeGroupList",

        schoolMenuId: "#menu-SCHOOL"
    };

    $.fn.schoolsAgeGroup = function (option) {
        var settings = $.extend(!0, {}, defaults, option);
        return this.each(function () {

            var $con = $(this);

            var $schoolmenu = $(settings.schoolMenuId);

            // if the browser is ie9 or ie10
            var isIE9above = navigator.userAgent.indexOf("MSIE") > 0 && (navigator.userAgent.indexOf("Trident/5.0") > 0 || navigator.userAgent.indexOf("Trident/6.0") > 0);

            if( $schoolmenu.length > 0)
            {
                if(isIE9above)
                {
                    $schoolmenu.width(Math.floor($schoolmenu.width()) + 1);
                }

                // update position
                var schoolleft = $schoolmenu.offset().left;
                var menuleft = $schoolmenu.closest(".navCon").offset().left;
                var left = schoolleft - menuleft + $schoolmenu.width() - $(settings.selectedAgeGroupCon, $con).width() - 4;

                // ie6
                if (! -[1, ] && !window.XMLHttpRequest) {
                    left = left + 1;
                }

                $(settings.selectedAgeGroupCon, $con).closest(".schoolsMenu").css("left", left + "px");
            }
            $(settings.selectedAgeGroupCon, $con).closest(".schoolsMenu").show();

            // dropdown list trigger
            $(settings.selectedAgeGroupCon, $con).click(function(event){

                var $list = $(settings.ageGroupListCon, $con);
                if($list.hasClass("hide"))
                {
                    $list.removeClass("hide");
                    $(this).find(".shownSchools").addClass("shownSchoolsLight");
                }
                else
                {
                    $list.addClass("hide");
                    $(this).find(".shownSchools").removeClass("shownSchoolsLight");
                }

                event.preventDefault();
                event.stopPropagation();
            });
        });
    }
})(jQuery);
