(function ($) {
    $.fn.initFranchiseForm = function () {

        return this.each(function () {
            var $container = $(this);

            $(".formDropdownTrigger").click(function () {
                var dropdownCurrent = $(this).next();
                setDropDownPosition(dropdownCurrent, $(this));
                $(".formDropdown").not(dropdownCurrent).slideUp("100");
                dropdownCurrent.slideToggle("100");
                return false;
            });

            $('.sendEmail').click(function () {
                var form = $('.sendEmail').parents('form');
                if (form.valid()) {
                    form.submit();
                }
            });

            $('#popupFormCountryDropdown li').click(function () {
                $(this).text();
                var obj = $(this).parents('.formDropdown').prev();
                obj.find('span').text($(this).text());
                obj.find('input').val($(this).text());
            });

            $('#popupFormCountryDropdown li').each(function () {
                if ($(this).attr('data-value') == 'ID') {
                    $(this).click();
                }
            });

            $(".formDropdown").on("click", "li", function () {
                if ($(this).text().indexOf("----") < 0) {
                    $(this).removeClass("formDorpdownHover");
                    $("li[class*='formDorpdownSelect']").not($(this)).removeClass("formDorpdownSelect");
                    $(this).addClass("formDorpdownSelect");
                    $(".formDropdown").delay(100).slideUp("100");
                }
            });

            $(".formDropdown li").mouseover(function () {
                if ($(this).text().indexOf("----") < 0) {
                    $(this).addClass("formDorpdownHover");
                }
            });

            $(".formDropdown li").mouseout(function () {
                $(this).removeClass("formDorpdownHover");
            });

            function setDropDownPosition($dropdownCurrent, $formDropdownTrigger) {
                var dropdownTop;
                var dropdownLeft;
                if ($formDropdownTrigger.parents("form").attr("id") == "mainForm") {
                    dropdownTop = $formDropdownTrigger.position().top + 42;
                } else {
                    if ($dropdownCurrent.attr("id") == "rightFormSchoolDropdown") {
                        dropdownTop = $formDropdownTrigger.position().top + 35;
                    } else {
                        dropdownTop = $formDropdownTrigger.position().top + 44;
                    }
                }
                if (!$dropdownCurrent.hasClass("lbformDropdown")) {
                    $dropdownCurrent.css("top", dropdownTop + "px");
                    $dropdownCurrent.css("left", dropdownLeft + "px");
                }
            }
        })
    };
})(jQuery);