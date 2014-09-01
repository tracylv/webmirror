
var otherCity;

if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    }
}

Array.prototype.contains = function (e) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == e) {
            return true;
        }
    }
    return false;
}
Array.prototype.indexof = function (e) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == e) {
            return i;
        }
    }
    return -1;
}
var ValidateForm = {
    nameInputFormat: /^[^\d\!\@\#\$\%\^\&\*\(\)\+\=\\\|\}\{\]\[\"\:\;\<\>\/\?]+$/,
    phoneInputFormat: /^((?!\&\#)[0-9\-\+\#\&\.() ](?!\&\#)){7,20}$/,
    emailInputFormat: /^[a-zA-Z0-9][a-zA-Z0-9\._+\-]*@([a-zA-Z0-9]+(\-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,4}$/,

    ThankyouCheckTextBox: function (txtObj, $con) {
        var checkResult = (txtObj.val().trim() != "") && (this[txtObj.attr('name') + "Format"].test(txtObj.val()));
        if (checkResult) {
            txtObj.next().addClass('hide');
        } else {
            txtObj.next().removeClass('hide');
        }
        return checkResult;
    },
    CheckTextBox: function (txtObj, $con) {
        var checkResult = (txtObj.val().trim() != "") && (this[txtObj.attr('name') + "Format"].test(txtObj.val()));
        if (checkResult) {
            txtObj.parent().removeClass('error').addClass('correct').find(".validationIcon").addClass("validationIconCorrect");
            $("." + txtObj.attr('name') + "Msg").removeClass('show');
        } else {
            txtObj.parent().removeClass('correct').addClass('error').find(".validationIcon").removeClass("validationIconCorrect");
            $("." + txtObj.attr('name') + "Msg").addClass('show');
        }
        //ShowFormMessage($con);
        //CheckAllOk();

        // check if all fields are correct
        if (txtObj.closest(".formContainer").find(".correct").length == 6) {
            $('.errorMsg', $con).hide();
        }

        return checkResult;
    },
    ThankyouCheckList: function (listObj) {
        var checkResult = (listObj.find('input.hiddenValue').val() != "");
        if (checkResult) {
            listObj.find('p.confirmErr').addClass('hide');
        } else {
            listObj.find('p.confirmErr').removeClass('hide');
        }

        return checkResult;
    },
    CheckList: function (listObj, $con) {
        var checkResult = (listObj.find('input.listLabel').val() != "") && (listObj.find('input.listValue').val() != "");
        if (checkResult) {
            listObj.removeClass('error').addClass('correct');
            $(listObj.attr('idx')).removeClass('show');
        } else {
            listObj.removeClass('correct').addClass('error');
            $(listObj.attr('idx')).addClass('show');
        }
        //ShowFormMessage($con);
        //CheckAllOk();

        // check if all fields are correct
        if (listObj.closest(".formContainer").find(".errorMsg .show").length == 0) {
            $('.errorMsg', $con).hide();
        }

        return checkResult;
    },
    ThankyouCheckName: function ($con) {
        return this.ThankyouCheckTextBox($('.formName', $con), $con);
    },
    CheckName: function ($con) {
        return this.CheckTextBox($('.nameInput', $con), $con);
    },
    ThankyouCheckPhone: function ($con) {
        return this.ThankyouCheckTextBox($('.formPhone', $con), $con);
    },
    CheckPhone: function ($con) {
        return this.CheckTextBox($('.phoneInput', $con), $con);
    },
    ThankyouCheckEmail: function ($con) {
        return this.ThankyouCheckTextBox($('.formEmail', $con), $con);
    },
    CheckEmail: function ($con) {
        return this.CheckTextBox($('.emailInput', $con), $con);
    },
    ThankyouCheckCourse: function ($con) {
        return this.ThankyouCheckList($('.formCourseValue', $con).parents('.listBorder'), $con);
    },
    CheckCourse: function ($con) {
        return this.CheckList($('.courseInput', $con).parents('.listBorder'), $con);
    },
    ThankyouCheckCity: function ($con) {
        return this.ThankyouCheckList($('.formCityValue', $con).parents('.listBorder'), $con);
    },
    CheckCity: function ($con) {
        return this.CheckList($('.cityInput', $con).parents('.listBorder'), $con);
    },
    ThankyouCheckSchool: function ($con) {
        return this.ThankyouCheckList($('.formSchoolValue', $con).parents('.listBorder'), $con);
    },
    CheckSchool: function ($con) {
        return this.CheckList($('.schoolInput', $con).parents('.listBorder'), $con);
    },
    ThankyouCheckAll: function ($con) {
        return this.ThankyouCheckName($con) & this.ThankyouCheckPhone($con) & this.ThankyouCheckEmail($con) & this.ThankyouCheckCourse($con) & this.ThankyouCheckCity($con) & this.ThankyouCheckSchool($con);
    },
    CheckAll: function ($con) {
        return this.CheckName($con) & this.CheckPhone($con) & this.CheckEmail($con) & this.CheckCourse($con) & this.CheckCity($con) & this.CheckSchool($con);
    }

};

var InitForm = {
    ThankyouInitCity: function (cityList, currCityCode) {
        currCityCode = currCityCode ? currCityCode : "";
        var cityItems = "";
        for (var i = 0; i < jsonRaw.TopCities.length; i++) {
            if (currCityCode == ('T;' + i)) {
                cityList.prev().find("span.listLabel").text(jsonRaw.TopCities[i].t);
            }
            cityItems += "<li list-data='T;" + i + "'>" + jsonRaw.TopCities[i].t + "</li>";
        }

        for (var i = 0; i < jsonRaw.CityInfos.length; i++) {
            if (currCityCode == ('C;' + i)) {
                cityList.prev().find("span.listLabel").text(jsonRaw.CityInfos[i].t);
            }
            cityItems += "<li list-data='C;" + i + "'>" + jsonRaw.CityInfos[i].t + "</li>";
        }
        if (cityItems != "") {
            cityItems = "<ul>" + cityItems + "</ul>";
        }
        else {
            return;
        }
        cityList.html(cityItems);
    },

    InitCity: function (cityList) {
        var currCityCode = $.cookie('city');
        var cityItems = "";
        for (var i = 0; i < jsonRaw.TopCities.length; i++) {
            cityItems += "<li list-data='T;" + i + "'>" + jsonRaw.TopCities[i].t + "</li>";
        }

        for (var i = 0; i < jsonRaw.CityInfos.length; i++) {
            if (currCityCode == jsonRaw.CityInfos[i].v) {
                cityList.prev().find("span.boxLeft").text(jsonRaw.CityInfos[i].t);
                cityList.prev().find("input.listValue").val("C;" + i);
                cityList.prev().find("input.listLabel").val(jsonRaw.CityInfos[i].t);
            }
            cityItems += "<li list-data='C;" + i + "'>" + jsonRaw.CityInfos[i].t + "</li>";
        }
        if (cityItems != "") {

            // check if need show other city
            //            if (othercitytext != undefined) {
            //                cityItems += "<li list-data='O;" + othercitylink + "'>" + othercitytext + "</li>";
            //            }

            cityItems = "<ul>" + cityItems + "</ul>";
        }
        else {
            return;
        }
        cityList.html(cityItems);
    },

    InitSchool: function (schoolList, courseValue, cityValue, schoolValue) {
        schoolList.prev().find("input.listLabel").val("");
        schoolList.prev().find("input.listValue").val("");

        schoolValue = (typeof schoolValue == 'undefined') ? '' : schoolValue;
        var schoolLabel = schoolList.prev().find("span.listLabel");
        var regexOwnCity = new RegExp(regOwnCity);
        var regexAdultCourse = new RegExp(regAdultCourse);
        var regexCLTCourse = new RegExp(regCLTCourse);
        var regexCourseTypeCity = new RegExp(regCourseTypeCity);
        var regexTeensCourse = new RegExp(regTeensCourse);
        var regexFRCourse = new RegExp(regFRCourse);
        var regexTeensSchool = new RegExp(regTeensSchool);
        var isOwnCityCode = false;
        var isCLTCourse = false;
        var isAdultCourse = false;
        var isTeensCourse = false;
        var schoolType;
        var cityInfo;

        if (courseValue != "" && cityValue != "") {
            var cityCodeArr = cityValue.split(";");
            if (cityCodeArr[0] == "T") {
                cityInfo = jsonRaw.TopCities[parseInt(cityCodeArr[1])];
            }
            else if (cityCodeArr[0] == "C") {
                cityInfo = jsonRaw.CityInfos[parseInt(cityCodeArr[1])];
            }
            else {
                schoolList.parent().hide();
                return;
            }

            var cityCode = cityInfo.v.replace("#", "").toLowerCase();

            if (otherCity == cityCode) {
                schoolList.parent().hide();
                schoolList.prev().find("input.listValue").val(cityCode);
                schoolList.prev().find("input.listLabel").val(cityCode);
                return;
            }

            if (specialCities.contains(cityCode) && regexAdultCourse.exec(courseValue)) {
                schoolList.parent().hide();
                var schoolName = specialSchools[specialCities.indexof(cityCode)];
                schoolList.prev().find("input.listValue").val(schoolName);
                schoolList.prev().find("input.listLabel").val(schoolName);
                return;
            }
            if (regexOwnCity.exec(cityCode)) {
                isOwnCityCode = true;
            }

            if (regexAdultCourse.exec(courseValue)) {
                isAdultCourse = true;
                if (!adultsSchoolsOpt || $.trim(adultsSchoolsOpt) == "") {
                    adultsSchoolsOpt = allSchoolsOpt;
                }
                schoolLabel.text(adultsSchoolsOpt);
            } else {
                if (!kidsSchoolsOpt || $.trim(kidsSchoolsOpt) == "") {
                    kidsSchoolsOpt = allSchoolsOpt;
                }
                schoolLabel.text(kidsSchoolsOpt);
            }

            if (regexTeensCourse.exec(courseValue)) {
                isTeensCourse = true;
            }

            var schoolItems = "";
            var currentSchoolTxt;
            if (cityInfo.s == null)//for city has one school
            {
                currentSchoolTxt = cityInfo.t;
                if (regexCourseTypeCity.exec(cityInfo.v) && !regexAdultCourse.exec(courseValue) && !regexFRCourse.exec(courseValue)) {
                    schoolLabel.text(allSchoolsOpt);
                    schoolItems += "<li list-data>" + noSchoolsOpt + "</li>";
                } else {
                    schoolItems += "<li list-data='" + cityInfo.v + "'>" + cityInfo.t + "</li>";
                }
            } else {//for city has multiple schools
                schoolType = cityInfo.s[0].c;
                if (schoolType == "2") {
                    schoolLabel.text(allSchoolsOpt);
                } else {
                    if (regexAdultCourse.exec(courseValue)) {
                        isAdultCourse = true;
                        schoolLabel.text(adultsSchoolsOpt);
                    } else {
                        schoolLabel.text(kidsSchoolsOpt);
                    }
                }
                for (var j = 0; j < cityInfo.s.length; j++) {
                    if (cityInfo.s[j].v == schoolValue) {
                        currentSchoolTxt = cityInfo.s[j].t;
                    }
                    schoolType = cityInfo.s[j].c;
                    if (schoolType == "2" || (schoolType == "1" && !isAdultCourse) || (schoolType == "3" && isAdultCourse)) {
                        if (regexTeensSchool.exec(cityInfo.s[j].v) && isTeensCourse == false) {
                        }
                        else {
                            schoolItems += "<li list-data='" + cityInfo.s[j].v + "'>" + cityInfo.s[j].t + "</li>";
                        }
                    }
                }
            }

            if (schoolValue != '' && typeof currentSchoolTxt != 'undefined') {
                schoolList.prev().find("input.listValue").val(schoolValue);
                schoolList.prev().find("span.listLabel").text(currentSchoolTxt);
            }

            if (schoolItems != "") {
                schoolItems = "<ul>" + schoolItems + "</ul>"
            }
            schoolList.html(schoolItems);

            if (schoolList.find('li').length <= 1) {
                schoolList.prev().find('span.listLabel').text(schoolList.find('li').text());
                schoolList.prev().find('input.listLabel').val(schoolList.find('li').text());
                schoolList.prev().find('input.listValue').val(schoolList.find('li').attr('list-data'));

                schoolList.prev().removeClass('formListTrigger').removeClass('pointer').find('span.listArrow').css('display', 'none');
                if (schoolList.attr('id') == 'popupFormSchoolDropdown') {
                    schoolList.prev().removeClass('formDropdownTriggerf')
                }
                ValidateForm.CheckList(schoolList.parent());
            } else {
                schoolList.prev().addClass('formListTrigger').addClass('pointer').find('span.listArrow').css('display', 'block');
                if (schoolList.attr('id') == 'popupFormSchoolDropdown') {
                    schoolList.prev().addClass('formDropdownTriggerf')
                }
                schoolList.parent().removeClass('error').removeClass('correct');
                $(schoolList.parent().attr('idx')).removeClass('show');
                //ShowFormMessage($con);
            }
            schoolList.parent().show();
        }
    },

    InitErrorMsg: function ($con) {
        $('.nameInputMsg', $con).text(firstNameErr);
        $('.phoneInputMsg', $con).text(phoneErr);
        $('.emailInputMsg', $con).text(emailErr);
        $('.courseInputMsg', $con).text(courseErr);
        $('.cityInputMsg', $con).text(cityErr);
        $('.schoolInputMsg', $con).text(schoolErr);
    }
};

var InitEvent = {

    ShowTip: function ($con) {
        $(".tipIcon", $con).hover(
            function () {
                var tipbox = $(this).next('.popTipBox');
                tipbox.show();
            },
            function () {
                $('.popTipBox', $con).hide();
            }
        );
    },

    ThankyouClickListBtn: function ($con) {
        //var hasActiveList = false;
        $('html').click(function () {
            //            if (!hasActiveList) {
            //                ValidateForm.ThankyouCheckList($('.listActive', $con).parent());
            //                $('.formDropdownTrigger', $con).next().removeClass('listActive');
            //            }
            //            hasActiveList = false;

            $('.formDropdownTrigger', $con).next().removeClass('listActive');

        });
        $con.on('click', '.formDropdownTriggerf', function (e) {

            // reset flag for focus
            $(this).attr("isclick", "false");

            var list = $(this).next();
            list.css("top", ($(this).position().top + 44) + "px");
            $(this).find('p.confirmErr').addClass('hide');
            if (list.hasClass('listActive')) {
                list.removeClass('listActive');
                ValidateForm.CheckList($(this).parent());
            } else {
                ValidateForm.CheckList($('.listActive', $con).parent());
                $('.listActive', $con).removeClass('listActive');
                // ChangePosition(list);
                list.addClass('listActive');
            }
            //hasActiveList = true;

            e.stopPropagation();
        });

        $('#ConfirmationForm').change(function () {
            // modify value                
            $('.modified').attr('value', 'true');
        });
    },

    ClickListBtn: function ($con) {
        //var hasActiveList = false;
        $('html').click(function () {
            //            if (!hasActiveList) {
            //                ValidateForm.CheckList($('.listActive', $con).parent());
            //                $('.formListTrigger', $con).next().removeClass('listActive');
            //            }
            //            hasActiveList = false;

            $('.formListTrigger', $con).next().removeClass('listActive');

        });
        $con.on('click', '.formListTrigger', function (e) {

            // reset flag for focus
            $(this).attr("isclick", "false");

            var list = $(this).next();
            list.parent().removeClass('error').removeClass('correct');
            if (list.hasClass('listActive')) {
                list.closest(".schoolListWrapper").removeClass("schoolListWrapperUp");
                list.removeClass('listActive');
                ValidateForm.CheckList($(this).parent());
            } else {
                ValidateForm.CheckList($('.listActive', $con).parent());
                $('.listActive', $con).removeClass('listActive');
                list.addClass('listActive');
                setDropDownPos(list, $(this));
            }
            //hasActiveList = true;

            e.stopPropagation();
        });
    },

    ThankyouClickListDetail: function ($con) {
        $('.formDropdown', $con).on('mouseenter', 'li', function () { $(this).addClass("formDorpdownHover"); });
        $('.formDropdown', $con).on('mouseleave', 'li', function () { $(this).removeClass("formDorpdownHover"); });
        $('.formDropdown', $con).on('click', 'li', function (e) {
            $(this).parents('.formDropdown').prev().find('span.listLabel').text($(this).text());
            $(this).parents('.formDropdown').prev().find('input.hiddenValue').val($(this).attr('list-data'));

            if (!$(this).parents('.formDropdown').hasClass('schoolDropDownList')) {
                InitForm.InitSchool($('.schoolDropDownList', $con), $('input[name="courseInput"]', $con).val(), $('input[name="cityInput"]', $con).val());
            }

            ValidateForm.ThankyouCheckList($(this).parents('.listBorder'));
            $(this).parents('.formDropdown').removeClass('listActive');
            $('.modified').attr('value', 'true');
            e.stopPropagation();
        });
    },

    ClickListDetail: function ($con) {
        $('.listBody', $con).on('mouseenter', 'li', function () { $(this).addClass("formDorpdownHover"); });
        $('.listBody', $con).on('mouseleave', 'li', function () { $(this).removeClass("formDorpdownHover"); });
        $('.listBody', $con).on('click', 'li', function (e) {
            $(this).parents('.listBody').prev().find('span.listLabel').text($(this).text());
            $(this).parents('.listBody').prev().find('input.listLabel').val($(this).text());
            $(this).parents('.listBody').prev().find('input.listValue').val($(this).attr('list-data'));

            if (!$(this).parents('.listBody').hasClass('formSchoolList')) {
                InitForm.InitSchool($('.formSchoolList', $con), $('input[name="courseInput"]', $con).val(), $('input[name="cityInput"]', $con).val());
            }

            ValidateForm.CheckList($(this).parents('.listBorder'));
            $(this).parents('.listBody').removeClass('listActive');
            e.stopPropagation();
        });
    },

    ThankyouTextBox: function ($con) {
        $('input:text', $con).focusin(function () {
            $(this).next().addClass('hide');
        }).focusout(function () {
            ValidateForm.ThankyouCheckTextBox($(this), $con);
        });

        $('input:text', $con).click(function (e) {
            e.stopPropagation();
        });
    },

    TextBox: function ($con) {
        $('input:text', $con).focusin(function () {
            $(this).parent('span').removeClass('error').removeClass('correct').addClass('active').find(".validationIcon").removeClass("validationIconCorrect");
        }).focusout(function () {
            $(this).parent().removeClass('active');
            ValidateForm.CheckTextBox($(this), $con);
        });

        $('input:text', $con).click(function (e) {
            e.stopPropagation();
        });
    },

    ThankyouSubmit: function ($con) {
        $('.getFreeClass', $con).click(function (e) {
            var formObj = $(this).parents("form");
            formObj.attr("action", "/englishfirst/gud/contact/tellfriends.aspx");

            //check if other city
            var checkCityValue = $(this).parents("form").find("input[name='cityInput']");
            var cityCodeArray = checkCityValue.val().split(";");
            if (cityCodeArray[0] == "O") {

                window.open(cityCodeArray[1]);
                return;
            }

            if (ValidateForm.ThankyouCheckAll($con)) {
                formObj.submit();
            }

            e.stopPropagation();
        });
    },

    Submit: function ($con) {
        $('.formBtn', $con).click(function (e) {
            var formObj = $(this).parents("form");
            //            if (formObj.attr("action") != "thankyou.aspx") {
            //                formObj.attr("action", "/englishfirst/gud/contact/thankyou");
            //            }
            formObj.attr("action", "/englishfirst/gud/contact/thankyou.aspx");
            //check if other city
            var checkCityValue = $(this).parents("form").find(".cityInput");
            var cityCodeArray = checkCityValue.val().split(";");
            if (cityCodeArray[0] == "O") {

                window.open(cityCodeArray[1]);
                return;
            }

            if (ValidateForm.CheckAll($con)) {
                formObj.submit();
            } else {
                ShowFormMessage($con);
            }

            e.stopPropagation();
        });

        // hide validation box
        $('html').click(function () {
            $('.errorMsg', $con).hide();
            $con.find(".error").removeClass("error");
            $('.errorMsg .msgMiddle ul li', $con).removeClass("show");
        });

        $('.errorMsg', $con).click(function (x) {
            x.stopPropagation();
        });
    }
};

var ShowFormMessage = function ($con) {
    var msgBox = $('.errorMsg', $con);
    msgBox.hide().show();
    if (msgBox.find('.show').length > 0) {
        var inputId = msgBox.find('.show:first').attr('class').replace('Msg', '');
        msgBox.css('top', $('.' + inputId).attr('data-y') + 'px');
        msgBox.show();
        msgBox.find('.show').removeClass('last');
        msgBox.find('.show:last').addClass('last');
    } else {
        msgBox.hide();
    }
};


var setDropDownPos = function ($list, $trigger) {
    var maxH = $(window).height() + $(window).scrollTop();
    var maxDropDownH = $trigger.offset().top + $trigger.height() + $list.height();

    if (maxDropDownH > maxH) {
        $list.closest(".schoolListWrapper").addClass("schoolListWrapperUp");
        $list.addClass("listActiveUp");
    }
    else {
        $list.closest(".schoolListWrapper").removeClass("schoolListWrapperUp");
        $list.removeClass("listActiveUp");
    }

};


// Hinttext for Name input, Telephone input and Email input
(function ($) {

    var defaults =
    {
        // the hint text selector
        textSel: ".inputTag",

        // the input area selector
        inputSel: ".inputContent"
    };

    $.fn.hintText = function (options) {

        var settings = $.extend(true, {}, defaults, options);
        return this.each(function () {

            var $container = $(this);

            $container.click(function () {

                // hide hint text
                $(settings.textSel, $container.parent()).hide();

                // the input area get focus
                $(settings.inputSel, $container).focus();
            });

            // in case, click on the hint text
            $(settings.textSel, $container.parent()).click(function (event) {

                // hide hint text
                $(settings.textSel, $container.parent()).hide();

                // the input area get focus
                $(settings.inputSel, $container).focus();

                event.stopPropagation();
            });

            // when input area is blur, if input value is null then show hint text , or else don't show hint text
            $(settings.inputSel, $container).blur(function () {

                var inputval = $(settings.inputSel, $container).val().trim();

                if (inputval == "" || inputval == null) {
                    $(settings.textSel, $container.parent()).show();
                }
            });

            // input area get focus , hide the hint text
            $(settings.inputSel, $container).focus(function () {
                $(settings.textSel, $container.parent()).hide();
            });

        });
    }
    $.fn.hintText.defaults = defaults;
})(jQuery);


// for init leadsform 
(function ($) {
    var defaults =
    {

    };

    $.fn.initLeadsForm = function (option) {
        var settings = $.extend(!0, {}, defaults, option);
        return this.each(function () {
            var $container = $(this);

            InitForm.InitCity($('.formCityList', $container));
            if ($('input[name="courseInput"]', $container).val() != '' && $('input[name="cityInput"]', $container).val() != '') {
                InitForm.InitSchool($('.formSchoolList', $container), $('input[name="courseInput"]', $container).val(), $('input[name="cityInput"]', $container).val());
            }
            InitForm.InitErrorMsg($('.errorMsg', $container));
            InitEvent.ShowTip($container);
            InitEvent.ClickListBtn($container);
            InitEvent.ClickListDetail($container);
            InitEvent.TextBox($container);
            InitEvent.Submit($container);
            //InitEvent.Policy();
            //InitEvent.Window();

            $('.listBody', $container).on('mousewheel DOMMouseScroll', 'ul', function (e) {
                var scrollTo = null;

                if (e.type == 'mousewheel') {
                    scrollTo = (e.originalEvent.wheelDelta * -1);
                }
                else if (e.type == 'DOMMouseScroll') {
                    scrollTo = 40 * e.originalEvent.detail;
                }

                if (scrollTo) {
                    e.preventDefault();
                    $(this).scrollTop(scrollTo + $(this).scrollTop());
                }
            });

            // bind hintText functionality for Name and Tel and Email input
            $(".inputArea .inputBox", $container).hintText();

            // bind behavior for checkbox
            $(".moreInfoDisplay", $container).click(function () { $(this).toggleClass("selected"); $("#moreInfo", $container).click(); });

            // for click history back button bug
            $(window).load(function () {
                var oldname = $container.find(".inputArea .inputBox .nameInput").val();
                if (oldname.length > 0) {
                    $container.find(".inputArea .inputTag").hide();
                }

                //ie6
                if (! -[1, ] && !window.XMLHttpRequest) {
                    $container.find(".inputArea .inputBox .tipIcon").addClass("tipIconIE6");
                    if (oldname.length > 0) {
                        $container.find(".inputArea .inputTag").attr("style", "display:none");
                    }
                    else {
                        $container.find(".inputArea .inputTag").attr("style", "display:block");
                    }
                }

            });

            // for RU email validation
            if (typeof countryCode != "undefined" && countryCode == "ru") {
                $("input[name='phoneInput']", $container).mask("+7(999)999-9999");
            }

            // add dropdown to tab index
            $(".listContainer", $container).attr("tabIndex", "0");
            $(".formBtnText", $container).attr("tabIndex", "0");

            $(".listContainer", $container).mousedown(function () {

                 // set up flag for focus
                 $(this).attr("isclick", "true");
            });

            $(".listContainer", $container).focus(function () {
                 $("li.formDorpdownHover" , $(this).next()).removeClass("formDorpdownHover");

                 // get flag for click
                 if($(this).attr("isclick") != "true" && !$(this).next().hasClass('listActive'))
                 {
                    $(this).click();
                 }
            });

            $(".listContainer", $container).keydown(function(event){ 

                var $list = $(this).next();
                var conheight = $list.height();
                var currscrolltop = $list.find("ul").scrollTop();

                if($list.css("display") != "block")
                {
                   return;
                }

                // press Enter key
                if(event.which == 13)
                {
                    var $select = $("li.formDorpdownHover" , $list);
                    $select.removeClass("formDorpdownHover");
                    $select.click();
                }

                // press Up key
                if(event.which == 38)
                {
                    var $prev = $("li.formDorpdownHover" , $list).prev();
                    if( $prev.length > 0)
                    {
                        $("li.formDorpdownHover" , $list).removeClass("formDorpdownHover");
                        $prev.eq(0).addClass("formDorpdownHover");

                        var prevpos = $prev.position();
                        if(prevpos.top <=0)
                        {
                            $list.find("ul").scrollTop(currscrolltop + prevpos.top);
                        }
                        else if(prevpos.top + $prev.height() >= conheight)
                        {
                            $list.find("ul").scrollTop(currscrolltop + prevpos.top - conheight + $prev.height());
                        }
                    }

                    if($("li.formDorpdownHover" , $list).length == 0)
                    {
                        $("li:last" , $list).addClass("formDorpdownHover");
                        $list.find("ul").scrollTop(1000);
                    }

                    return false;
                }

                // press Down key
                if(event.which == 40)
                {
                    var $next = $("li.formDorpdownHover" , $list).next();
                    if( $next.length > 0)
                    {
                        $("li.formDorpdownHover" , $list).removeClass("formDorpdownHover");
                        $next.eq(0).addClass("formDorpdownHover");

                        var nextpos = $next.position();
                        if(nextpos.top <=0)
                        {
                            $list.find("ul").scrollTop(currscrolltop + nextpos.top);
                        }
                        else if(nextpos.top + $next.height() >= conheight)
                        {
                            $list.find("ul").scrollTop(currscrolltop + nextpos.top - conheight + $next.height());
                        }
                    }

                    if($("li.formDorpdownHover" , $list).length == 0)
                    {
                        $("li:first" , $list).addClass("formDorpdownHover");
                        $list.find("ul").scrollTop(0);
                    }
                    return false;
                }

                // press Tab
                if(event.which == 9)
                {
                    if ($list.hasClass('listActive'))
                    {
                         $list.closest(".schoolListWrapper").removeClass("schoolListWrapperUp");
                         $list.removeClass('listActive');
                    }
                }
            });

            //submit button
            $(".formBtnText", $container).keydown(function(event){ 
                
                // press Enter key
                if(event.which == 13)
                {
                    $(this).click();
                }
            });


        });
    }
})(jQuery);

//for init thank you lead form
(function ($) {
    var defaults = {};

    $.fn.initThankYouLeadsForm = function (option) {
        var settings = $.extend(!0, {}, defaults, option);
        return this.each(function () {
            var $container = $(this);

            InitForm.ThankyouInitCity($('#popupFormCityDropdown', $container), $('input[name="cityInput"]').val());
            if ($('input[name="courseInput"]', $container).val() != '' && $('input[name="cityInput"]', $container).val() != '') {
                InitForm.InitSchool($('#popupFormSchoolDropdown', $container), $('input[name="courseInput"]', $container).val(), $('input[name="cityInput"]', $container).val(), $('input[name="schoolInput"]').val());
            }
            InitEvent.ThankyouClickListBtn($container);
            InitEvent.ThankyouClickListDetail($container);
            InitEvent.ThankyouTextBox($container);
            InitEvent.ThankyouSubmit($container);
        });
    }
})(jQuery);
