(function ($) {
    $.fn.initRightPart = function () {
        var $container = $(this);
        
        $("#studyTipsCityDropdown ul").html(GenerateListItems());

        function GenerateListItems() {
            var cityItems = "";
            if (typeof (jsonRaw.TopCities) != "undefined") {
                for (var i = 0; i < jsonRaw.TopCities.length; i++) {
                    cityItems += "<li class='lipopupFormCity' id='" + jsonRaw.TopCities[i].v + "' >" + jsonRaw.TopCities[i].t + "</li>";
                }
            }
            cityItems += "<li class='lipopupFormCity'>---------------------------</li>";
            for (var i = 0; i < jsonRaw.CityInfos.length; i++) {
                cityItems += "<li class='lipopupFormCity' id='" + jsonRaw.CityInfos[i].v + "' >" + jsonRaw.CityInfos[i].t + "</li>";
            }
            return cityItems;
        }

        $("#textboxCity").click(function () {
            setStudyTipsDropdownPos();
            $("#studyTipsCityDropdown").slideToggle(1);
            return false;
        });

        function setStudyTipsDropdownPos() {
            var cityDropdownTop = $("#studyTipsArea").position().top + 148;
            var cityDropdownLeft = $("#studyTipsArea").position().left + 137;
            $("#studyTipsCityDropdown").css("top", cityDropdownTop + "px");
            $("#studyTipsCityDropdown").css("left", cityDropdownLeft + "px");
        }

        $("#studyTipsCityDropdown li").click(function () {
            if ($(this).text().indexOf("----") < 0) {
                $(this).removeClass("formDorpdownHover");
                $("li[class*='formDorpdownSelect']").not($(this)).removeClass("formDorpdownSelect");
                var liText = $(this).text();
                var liValue = $(this).attr("id");
                $("#studyTipsCity").text(liText);
                $("#textboxCity span.hiddenValue").text(liValue);
                $(this).addClass("formDorpdownSelect");
            }
        });

        $("#studyTipsCityDropdown").click(function () {
            $("#studyTipsCityDropdown").delay(100).slideUp("100");
        });

        $("#iskidsyes").click(function () {
            $(this).css("background-position", "-200px 50%");
            $("#studyTipsHolder").delay(200).animate({
                marginLeft: "-200px"
            },
            100);
            $("#iskids").text("1");
        });

        $("#iskidsno").click(function () {
            $(this).css("background-position", "-200px 50%");
            $("#studyTipsHolder").delay(200).animate({
                marginLeft: "-200px"
            },
            100);
            $("#iskids").text("0");
        });

        $("#getBook").click(function (e) {

            var studyTipAlertTop = $("#studyTips").offset().top + 62;
            var studyTipAlertLeft = $("#studyTips").offset().left - 115;
            //$("#studyTipsFormAlert").css("top", studyTipAlertTop + "px");
            //$("#studyTipsFormAlert").css("left", studyTipAlertLeft + "px");

            var checkEmail = $("#studyTipsEmail");
            var emailFormat = /^[a-zA-Z0-9][a-zA-Z0-9\._+\-]*@([a-zA-Z0-9]+(\-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,4}$/;
            var formEmail = checkEmail.val();
            if (!emailFormat.test(formEmail)) {
                $("#studyTipsFormAlert").show();
                $("#studyTipsFormEmailAlert").show();
            } else {
                $("#studyTipsFormEmailAlert").hide();
            };

            var checkCity = $("#studyTipsCity");
            var checkCityValue = $("#studyTipsCityValue");
            if (checkCityValue.text() == "0") {
                $("#studyTipsFormAlert").show();
                $("#studyTipsFormCityAlert").show();
            } else {
                checkCity.parent().removeClass("inputAlert");
                $("#studyTipsFormCityAlert").hide();
            };

            if (emailFormat.test(formEmail) && $("#studyTipsCityValue").text() != "0") {
                //$.ajax({
                //    type: "POST",
                //    contentType: "application/json",
                //    url: "/e1/_webservice/Studytips.asmx/StudyTipsSave",
                //    data: "{'iskids':'" + $("#iskids").text() + "', 'email':'" + $("#studyTipsEmail").val() + "', 'cityvalue':'" + $("#studyTipsCityValue").text() + "'}"
                //});
                gud_callWebSvc("Studytips.asmx/StudyTipsSave", "{'marketCode':'" + countryCode + "', 'languageCode':'" + languageCode + "', 'iskids':'" + $("#iskids").text() + "', 'email':'" + $("#studyTipsEmail").val() + "', 'cityvalue':'" + $("#studyTipsCityValue").text() + "', 'url':'" + window.location.href + "'}", null);
                $("#studyTipsFormAlert").hide();
                $("#studyTipsFrame2").delay(500).animate({ marginLeft: "-200px" }, 100);
            };
            e.stopPropagation();
        });

        function gud_callWebSvc(wsUrl, param, callback) {
            if (param == null || param == "") {
                param = "{}";
            }

            wsUrl = "/englishfirst/_webservice/" + wsUrl;
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: wsUrl,
                data: param,
                dataType: "json",
                success: callback
            });
        }

        $('html').click(function (e) { $("#studyTipsFormAlert").hide(); });
    };
})(jQuery);

//GOSAM-2032, learn more popup
(function ($) {
   var defaults =
       {
          // pop up dom selector
          popupWindow: "#learnMorePopup",
          //pop up close element selector
          closeBtn: ".closeBtn",
          // popup option for dialog popup
          popupOptions: { 
                dialogClass: "cusmPopup",
                modal: true,
                draggable: false,
                resizable:false,
                autoOpen: false,
                width: 610
             },

          callback: function(){ },
          closecallback: function(){ }
       };

    $.fn.learnMorePopup = function (option) {
        var settings = $.extend(!0, {}, defaults, option);

        return this.each(function () {
            // init popup
            var $this = $(this);
            $(settings.popupWindow).dialog(settings.popupOptions);

            $this.click(function(event){
                 var popupTitle = $(this).prev().find('span:eq(2)').text();
                 var popupContent = $(this).parent().find('input[type="hidden"]').val();
                 $(settings.popupWindow).find('.title').html(popupTitle);
                 $(settings.popupWindow).find('.content').html(popupContent);
                 $(settings.popupWindow).dialog("open");
                 //callback
                 settings.callback($this);
                 event.preventDefault();
                 //event.stopPropagation();
            });
        
        // bind close function for popup
        $(settings.popupWindow).find(settings.closeBtn).click(function(event){
             $(settings.popupWindow).dialog("close");
             
             //callback
             settings.closecallback($this);
             event.preventDefault();
             event.stopPropagation();
        });
     });
    }
})(jQuery);