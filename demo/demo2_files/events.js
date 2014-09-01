(function ($) {
    var defaults =
    {
        popupId: "#popupDialog",
        popupOption: {
            modal: true,
            draggable: false,
            resizable: false,
            autoOpen: false,
            width: 720
        },
        templateSelecter: ".template"

    };

    $.fn.initEventsList = function (option) {

        var settings = $.extend(!0, {}, defaults, option);

        return this.each(function () {

            var $container = $(this),
                $popup = $container.find(settings.popupId),
                $scrollBox = $popup.find('.txtBox'),
                $bigImg = $('#popupBigImg'),
                $smallImgList = $('#popupSmallImg'),
                template = '<li style="display:none;">' + eventsTemplate + '</li>';

            // init scroll bar
            $scrollBox.tinyscrollbar({
                thumbSize: 60,
                trackSize: 285,
                wheelLock: true
            });

            // init dialog box
            $popup.dialog(settings.popupOption);

            // init click img list event on popup
            $smallImgList.on('click', 'img', function () {
                $bigImg.attr('src', $(this).attr('src'));
            });

            // init click read more event
            $container.on('click', '.readMore', function () {

                var $parent = $(this).parent(),
                    des = $('input[name="des"]', $parent).val(),
                    imglist = $('input[name="imgs"]', $parent).val().split(','),
                    imgs;

                // left part
                for (var i = 0; i < imglist.length; i++) {
                    imgs += '<li><img class="thumbnail" src="' + imglist[i] + '"></li>';
                }
                $bigImg.attr('src', imglist[0]);
                $smallImgList.html(imgs).find('li:last').addClass('lst');
                $('#popupDate').html($('.eAbout', $parent).html());

                // right part
                $('#popupTitle').html($('.eTitle', $parent).html());
                $('#popupDes').html(des);
                $popup.dialog("open");

                // update scroll bar on popup
                $scrollBox.data("plugin_tinyscrollbar").update();
            });

            // set auto load active
            $container.attr('go', 'yes');

            $(window).scroll(function (event) {
                if ($container.attr('go') === 'yes') {
                    $.fn.initEventsList.autoLoad($container, settings, template);
                } else {
                    event.stopPropagation();
                }
            });

            $.fn.initEventsList.autoLoad($container, settings, template);

            $container.on('click', '.viewMore', function () {
                var className = $('li:last', $container).hasClass('right') ? 'left' : 'right',
                    lastYear = countryCode == 'cn' ? ($('li:last .subDate', $container).text().split('-')[0]) : ($('li:last .subDate', $container).text().split('-')[2]);
                var temp;
                var boxClass = '';

                $.ajax({
                    type: 'GET',
                    url: '/englishfirst/gud/about/events/GetEvents',
                    cache: false,
                    dataType: 'json',
                    data: {
                        id: $('li.newsData', $container).length
                    }
                }).done(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        var year = countryCode == 'cn' ? (data[i].PublishDate.split('-')[0]) : (data[i].PublishDate.split('-')[2]);
                        if (lastYear && year && lastYear != year) {
                            var yearTemp = '<li class="dateTitle clear">' + year + '</li>';
                            $(yearTemp).appendTo($('#timeLineBox')).fadeIn();
                            lastYear = year;
                            boxClass = 'firstBox';
                        }
                        else {
                            boxClass = boxClass == 'firstBox' ? 'secondBox' : (boxClass == 'secondBox' ? '' : boxClass);
                        }
                        var tempBoxClass = boxClass == '' ? boxClass : (' ' + boxClass);
                        temp = template.replace('#title#', data[i].Title)
                                       .replace('#summary#', data[i].Summary)
                                       .replace('#localtion#', data[i].Location)
                                       .replace('#eventsTime#', data[i].EventsTime)
                                       .replace('#eventsDate#', data[i].PublishDate)
                                       .replace('#masterImg#', data[i].MasterImg)
                                       .replace('#description#', data[i].Description)
                                       .replace('#imglist#', data[i].OtherImgs)
                                       .replace('#clsBox#', tempBoxClass);
                        $(temp).addClass('newsData ' + className).appendTo($('#timeLineBox')).fadeIn();
                        className = (className === 'left' ? 'right' : 'left');
                    }

                    if (data.length <= 0) {
                        $container.attr('go', 'no');
                        $('#loading').fadeOut();
                        $('#viewMore').fadeOut();
                    }
                });
            });
        });
    };

    $.fn.initEventsList.autoLoad = function ($container, settings, template) {
        var className = $('li:last', $container).hasClass('right') ? 'left' : 'right',
            reached = $(window).scrollTop() >= $(document).height() - $(window).height() - $('#footer').height(),
            lastYear = countryCode == 'cn' ? ($('li:last .subDate', $container).text().split('-')[0]) : ($('li:last .subDate', $container).text().split('-')[2]);
        var temp;
        var boxClass = '';

        if (reached) {
            $container.attr('go', 'no');
            $('#loading').fadeIn();
            $.ajax({
                type: 'GET',
                url: '/englishfirst/gud/about/events/GetEvents',
                cache: false,
                dataType: 'json',
                data: {
                    id: $('li.newsData', $container).length
                }
            }).done(function (data) {
                for (var i = 0; i < data.length; i++) {
                    var year = countryCode == 'cn' ? (data[i].PublishDate.split('-')[0]) : (data[i].PublishDate.split('-')[2]);
                    if (lastYear && year && lastYear != year) {
                        var yearTemp = '<li class="dateTitle clear">' + year + '</li>';
                        $(yearTemp).appendTo($('#timeLineBox')).fadeIn();
                        lastYear = year;
                        boxClass = 'firstBox';
                    }
                    else {
                        boxClass = boxClass=='firstBox' ? 'secondBox' : (boxClass=='secondBox' ? '' : boxClass);
                    }
                    var tempBoxClass = boxClass == '' ? boxClass : (' ' + boxClass);
                    temp = template.replace('#title#', data[i].Title)
                                   .replace('#summary#', data[i].Summary)
                                   .replace('#localtion#', data[i].Location)
                                   .replace('#eventsTime#', data[i].EventsTime)
                                   .replace('#eventsDate#', data[i].PublishDate)
                                   .replace('#masterImg#', data[i].MasterImg)
                                   .replace('#description#', data[i].Description)
                                   .replace('#imglist#', data[i].OtherImgs)
                                   .replace('#clsBox#', tempBoxClass);
                    $(temp).addClass('newsData ' + className).appendTo($('#timeLineBox')).fadeIn();
                    className = (className === 'left' ? 'right' : 'left');
                }
                $('#loading').fadeOut();

                if ($('li.newsData', $container).length < 20) {
                    $container.attr('go', 'yes');
                } else {
                    $('#viewMore').fadeIn();
                }

                if (data.length <= 0) {
                    $container.attr('go', 'no');
                    $('#loading').fadeOut();
                    $('#viewMore').fadeOut();
                }
            });
        }
    };
    $(".newsData").css("zoom", "normal");


})(jQuery);