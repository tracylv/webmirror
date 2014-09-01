// initialize lightbox form
(function ($) {

    var defaults =
    {

    };

    $.fn.initLightboxForm = function (options) {

        var settings = $.extend(true, {}, defaults, options);
        return this.each(function () {

            var $container = $(this);

            // popup telephone icon hover behavior
            $(".telpopupFormTipIcon", $container).hover(
            function () {
                $("#lbPopupTipTel", $(this).parent()).show();
            },
            function () {
                $("#lbPopupTipTel", $(this).parent()).hide();
            });

            // popup email icon hover behavior
            $(".emailpopupFormTipIcon", $container).hover(
            function () {
                $("#lbPopupTipEmail", $(this).parent()).show();
            },
            function () {
                $("#lbPopupTipEmail", $(this).parent()).hide();
            });


            //form validation
            $(".lbgetFreeClass", $container).bind("click", function (e) {
                 var formid = $(this).parents("form").attr("id");

                 //check if other city
                 var checkCityValue = $(this).parents("form").find(".formCityValue");
                 var cityCodeArr = checkCityValue.val().split(";");
                 if (cityCodeArr[0] == "O") {
                     window.open(cityCodeArr[1]);
                     return;
                 }

                 isValidLead = true;
                 var nameFormat = /^[^\d\!\@\#\$\%\^\&\*\(\)\+\=\\\|\}\{\]\[\"\:\;\<\>\/\?]+$/;
                 var phoneFormat = /^((?!\&\#)[0-9\-\+\#\&\.() ](?!\&\#)){7,20}$/;
                 var emailFormat = /^[a-zA-Z0-9][a-zA-Z0-9\._+\-]*@([a-zA-Z0-9]+(\-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,4}$/;
                 //check name
                 var checkName = $(this).parents("form").find(".formName");
                 var nameVal = checkName.val();
                 validateField(checkName, "#lbalertName", !nameFormat.test(nameVal));

                 //check phone number
                 var checkPhone = $(this).parents("form").find(".formPhone");
                 var phoneVal = checkPhone.val();
                 validateField(checkPhone, "#lbalertPhone", !phoneFormat.test(phoneVal));

                 //check email
                 var checkEmail = $(this).parents("form").find(".formEmail");
                 var formEmail = checkEmail.val();
                 validateField(checkEmail, "#lbalertEmail", !emailFormat.test(formEmail));

                 //check course
                 var checkCourse = $(this).parents("form").find(".formCourse");
                 var checkCourseValue = $(this).parents("form").find(".formCourseValue");
                 var formCourse = $.trim(checkCourseValue.val());
                 validateField(checkCourse, "#lbalertCourse", formCourse == "");

                 //check city
                 var checkCity = $(this).parents("form").find(".formCity");
                 validateField(checkCity, "#lbalertCity", $.trim(checkCityValue.val()) == "");

                 //check school
                 var checkSchool = $(this).parents("form").find(".formSchool");
                 var checkSchoolValue = $(this).parents("form").find(".formSchoolValue");
                 var formSchool = $.trim(checkSchoolValue.val());
                 validateField(checkSchool, "#lbalertSchool", formSchool == "");

                 if ($(this).parents("form").attr("action") != "thankyou.aspx") {
                     $(this).parents("form").attr("action", "/englishfirst/gud/contact/thankyou.aspx");
                 }
                 // submit when there is no error
                 if (isValidLead) {

                     // set cookie
                     $.cookie('lightbox', "hide", { domain: window.location.hostname, expires: 14, path: '/' });

                     $("#lbformAlert").hide();
                     $("#" + formid).submit();
                 }
                 else {
                     $(".lbformDropdown", $container).hide();
                     $("#lbformAlert").show();
                 }

                 e.stopPropagation();
             });

            if (typeof String.prototype.trim !== 'function') {
                String.prototype.trim = function () {
                    return this.replace(/^\s+|\s+$/g, '');
                }
            }

            //Validate input values
            function validateField(validate, alter, check) {
                if (check) {
                    validate.parents(".lbInputNormal").addClass("errorpink");
                    $(alter).show();
                    isValidLead = false;
                } else {
                    validate.parents(".lbInputNormal").removeClass("errorpink");
                    $(alter).hide();
                };
            }

            // form list trigger
            $('.lbformDropdownTrigger', $container).click(function (e) {

                var $list = $(this).next();
                if ($list.css("display") != "block")
                {
                    $(".lbformDropdownTrigger", $container).next().hide();
                    $list.show();
                }
                else
                {
                    $list.hide();
                }

                $('#lbformAlert').hide();
                $('.lbInputNormal', $container).removeClass('errorpink');

                e.stopPropagation();
            });

            // for li click
            $('.lbformDropdown', $container).on('mouseenter', 'li', function () { $(this).addClass("formDorpdownHover"); });
            $('.lbformDropdown', $container).on('mouseleave', 'li', function () { $(this).removeClass("formDorpdownHover"); });
            $('.lbformDropdown', $container).on('click', 'li', function (e) {
                $(this).parents('.lbformDropdown').prev().find('span.listLabel').text($(this).text());
                $(this).parents('.lbformDropdown').prev().find('input.listLabel').val($(this).text());
                $(this).parents('.lbformDropdown').prev().find('input.listValue').val($(this).attr('list-data'));

                if (!$(this).parents('.lbformDropdown').hasClass('lbformSchoolDropdown')) {
                    InitForm.InitSchool($('.lbformSchoolDropdown', $container), $('input[name="courseInput"]', $container).val(), $('input[name="cityInput"]', $container).val());
                }
            });



            // hide validation box 
            $('html').click(function (e) {
                $('#lbformAlert').hide();
                $('.lbformDropdown', $container).hide();
                $('.lbInputNormal', $container).removeClass('errorpink');
            });

            $('#lbformAlert').click(function (x) {
                x.stopPropagation();
            });
        });
    }
    $.fn.initLightboxForm.defaults = defaults;
})(jQuery);

(function ($) {

    var defaults =
    {

    };

    $.popupLightBox = function (options) {

        var settings = $.extend(true, {}, defaults, options);

        // lightbox popup start
        if ($("#lightboxpopup").length > 0 && $.cookie('lightbox') != "hide") {
            var lbtimeobj = $.parseJSON($("#lightboxpopup").find("#lboptions").val());
            var lbtimeoutid;

            if (parseInt(lbtimeobj.show) > 0) {
                clearTimeout(lbtimeoutid);
                lbtimeoutid = setTimeout(function () {
                    $("body").prepend("<div class='bgcover'> </div>");
                    $(".bgcover").height($("body").height());
                    if ($(".bgcover").offset().left > 0) {
                        $(".bgcover").css("margin-left", 0 - $(".bgcover").offset().left);
                    }
                    var lbtop = $(document).scrollTop() + 400;
                    $("#lightboxpopup").css("top", lbtop);
                    $("#lightboxpopup").show();
                }, parseInt(lbtimeobj.show) * 1000);
            }

            // close button behavior
            $("#lightboxpopup .clsbtn").bind("click", function (e) {
                clearTimeout(lbtimeoutid);
                $("body").find(".bgcover").remove();
                $("#lightboxpopup").hide();

                // set cookie
                $.cookie('lightbox', "hide", { domain: window.location.hostname, expires: 14, path: '/' });

                e.stopPropagation();
            });

            // remind button behavior
            $("#lightboxpopup .remind").bind("click", function (e1) {
                $("body").find(".bgcover").remove();
                $("#lightboxpopup").hide();

                if (parseInt(lbtimeobj.remind) > 0) {
                    clearTimeout(lbtimeoutid);
                    lbtimeoutid = setTimeout(function () {
                        $("body").prepend("<div class='bgcover'> </div>");
                        $(".bgcover").height($("body").height());
                        if ($(".bgcover").offset().left > 0) {
                            $(".bgcover").css("margin-left", 0 - $(".bgcover").offset().left);
                        }
                        var lbtop = $(document).scrollTop() + 400;
                        $("#lightboxpopup").css("top", lbtop);
                        $("#lightboxpopup").show();
                    }, parseInt(lbtimeobj.remind) * 60 * 1000);
                }

                e1.stopPropagation();
            });

            // init light box form
            $("#lightboxform").initLightboxForm();
            if ($("#lbCityDropdown").length > 0) {
                InitForm.InitCity($(" #lbCityDropdown"));
                if ($('#lightboxform input[name="courseInput"]').val() != '' && $('#lightboxform input[name="cityInput"]').val() != '') {
                    InitForm.InitSchool($('#lightboxform .lbformSchoolDropdown'), $('#lightboxform input[name="courseInput"]').val(), $('#lightboxform input[name="cityInput"]').val());
                }
            }

            // fix png ie6 issue
            if (!-[1,] && !window.XMLHttpRequest) {
                DD_belatedPNG.fix('#lightboxpopup .bkimg img');
            }

        }
        // lightbox popup end

        // tiantian kv click
        $(".picturelightboxpopup").click(function(){
            $this = $(this);
            var ownlink = $this.attr("ownlink");
            var fralink = $this.attr("fralink");
            var city = $.cookie('city');
            var link = ownlink;

            var ownCityRegex = new RegExp(regOwnCity);
            if (city && ownCityRegex.exec(city))
            {
                link = ownlink;
            }
            else
            {
                link = fralink;
            }

            window.open(link);

        });

    }
})(jQuery);


