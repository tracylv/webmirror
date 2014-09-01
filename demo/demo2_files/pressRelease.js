(function ($) {
    // add accordion
    $.fn.initAccordion = function () {

        var $container = $(this);
        $('.txt', $container).tinyscrollbar({ thumbSize: 40 });

        var icons = {
            header: "ui-icon-circle-arrow-e",
            activeHeader: "ui-icon-circle-arrow-s"
        };

        $container.accordion({
            icons: icons,
            collapsible: true,
            active: false,
            heightStyle: "content",
            header: "> div.group > h4"
        });

        $('.group h4', $container).eq($container.attr('data-open')).click();
    };
})(jQuery);