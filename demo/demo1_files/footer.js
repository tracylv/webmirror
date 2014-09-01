(function ($) {
    
    // change language of the website
    $.fn.changeLanguage = function () {
        return $(this).click(function () {
            var lng = $(this).attr("data-language") == "cs" ? "en" : "cs";
            var location = String(document.location);
            var pos = location.lastIndexOf("#");
            if (pos >= 0) {
                location = location.substring(0, pos);
            }
            location = location.replace(/(&)?lng=[^&]*/, "").replace(/\?$|(\?)&/, "$1");
            document.location = location + (/\?/.test(location) ? "&" : "?") + "lng=" + lng;
        });
    };

    $.fn.showMoreOnFooter = function () {
        return $(this).click(function () {
            $(this).next('ul').toggle(200);
        });
    };
})(jQuery);