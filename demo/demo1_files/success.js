function addTableRow(table) {
    var id = $(table).find('tr').length - 1;
    var $tr = $(table).find('tr:last').clone();
    var $input = $tr.find('input');

    $input.attr('name', function () {
        var parts = this.name.match(/(\D+)(\d+)$/);
        $tr.find('#FriendNum').text(id);
        return parts[1] + id;
    });

    $input.attr('id', function () {
        var parts = this.id.match(/(\D+)(\d+)$/);
        return parts[1] + id;
    });

    $input.val("");

    $(table).append($tr);
    return true;
};

(function ($) {
    $.fn.addClickEvents = function () {

        return this.each(function () {
            var $con = $(this);
            var emailFormat = /^[a-zA-Z0-9][a-zA-Z0-9\._+\-]*@([a-zA-Z0-9]+(\-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,4}$/;

            $('#btnMoreFiends', $con).click(function () {
                addTableRow($('#tblFriends'));
            });

             $("#btnSkipForm", $con).click(function () {
                 $('#tellFriendsForm').attr("action", "/englishfirst/gud/contact/success.aspx");
                 $('#tellFriendsForm').submit();
                 //return false;
             });

            $("#btnSendEmail", $con).click(function () {
                var i = 1;
                var formEmail;
                var isValid = true;
                while ($("#FriendEmail" + i).length > 0) {
                    var formEmail = $("#FriendEmail" + i);
                    if (formEmail.val() !='' && !emailFormat.test(formEmail.val())) {
                        //formEmail.parent().addClass("inputAlert");
                        $("#friendEmailErr").show();
                        isValid = false;
                    }
                    else {
                        formEmail.parent().removeClass("inputAlert");
                    }
                    i = i + 1;
                }
                if (isValid) {
                    $("#friendEmailErr").hide();
                    $('#tellFriendsForm').attr("action", "/englishfirst/gud/contact/success.aspx");
                    $('#tellFriendsForm').submit();
                }
                //return false;
            });
        })
    };
})(jQuery);

//for survey
var surveyFunc = {
    GetValue: function (qrow) {
        var type = qrow.attr('data-typeid');
        var answers = '';
        if (type == "1" || type == "2") {
            $.each(qrow.find('.answer input:checked'), function (index, row) {
                answers += $(row).val() + ',';
            });
            answers = answers.slice(0, answers.length - 1);
        } else if (type == "3") {
            answers = qrow.find('.answer select').val();
        } else {
            answers = qrow.find('.answer textarea').val();
        }
        return answers;
    },

    Serilize: function (isSubmit) {

        var response = {
            LeadId: $('input[name="LeadId"]').val(),
            SurveyId: Survey.SurveyId,
            Country: countryCode,
            Language: languageCode,
            City: cityCode,
            CourseLevel: $('#formCourseValue').val(),
            ProductCode: $.cookie('product'),
            UserQuitMode: isSubmit ? 1 : 2
        };

        if (response.UserQuitMode == 1) {

            response.QuestionAnswers = [];

            var rows = $('#qstionContainer').find('.question');
            $.each(rows, function (index, row) {
                var $row = $(row);
                var value = surveyFunc.GetValue($row);
                if (value) {
                    response.QuestionAnswers.push({
                        QuestionId: $row.attr('data-qid'),
                        QuestionTypeId: $row.attr('data-typeid'),
                        Answer: value
                    });
                }
            });
        }

        return response;
    },

    SubmitResponse: function (isSubmit, form) {

        var survey = this.Serilize(isSubmit);

        $.ajax(
            {
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                url: '/englishfirst/_webservice/Questionnaire.asmx/Save',
                data: "{'qdata':'" + JSON.stringify(survey) + "'}",
                dataType: 'json',
                success: function (data) {
                    form.dialog('close');

                    var options = { domain: window.location.hostname, expires: 1, path: '/' };
                    $.cookie('answeredLead', survey.LeadId, options);
                },
                error: function (data) {
                    form.dialog('close');
                }
            });
    }
};
(function ($) {
    $.fn.surveyResponse = function () {

        return this.each(function () {
            var form = $('<form id="previewform" class="hide"></form>');
            form.appendTo($('body'));
            $('#qstionContainer').appendTo(form).removeClass("hide");
              
            $.validator.setDefaults({
                ignore: []
            });
            $.validator.addMethod("atleastone", function (value, element) {
                return $(element).parents(".chkListWrapper").last().find("input:checked").length > 0 || $(element).parents(".chkListWrapper").last().find("span.jquery-checkbox-checked1").length > 0;
            }, Survey.ErrorMessages.Required);

            $.extend($.validator.messages, { required: Survey.ErrorMessages.Required, maxlength: Survey.ErrorMessages.Maxlength });
            $('.chkListWrapper input').click(function () {
                if($(this).attr('type') == 'radio' && !$(this).next().hasClass('jquery-checkbox-checked1')){
                    $(this).next().addClass('jquery-checkbox-checked1');
                }
                $(this).parents('.chkListWrapper').last().find('.atleastone').valid();
            });
            form.validate({
                onsubmit: false,
                errorPlacement: function (error, element) {
                    error.appendTo(element.parents('.answers').last());
                }
            });
            
            $('#qstionContainer span.btntext').click(function () {
                if (form.valid()) {
                    if (!Survey.IsPreview) {
                        surveyFunc.SubmitResponse(true, form);
                    } else {
                        form.dialog('close');
                    }
                }
            });

            $('#qstionContainer .closeQuestionnaire').click(function () {
                if (!Survey.IsPreview) {
                    surveyFunc.SubmitResponse(false, form);
                } else {
                    form.dialog('close');
                }
            });
            if($('input[name="qstionContainerEmpty"]').length ==0){
                form.dialog({ width: 820, modal: true });
                $(".ui-dialog-titlebar").hide()

                $('input:checkbox:not([safari])').checkbox();
                $('input[safari]:checkbox').checkbox({ cls: 'jquery-safari-checkbox' });
                $('input:radio').checkbox();
            }
        })
    };
})(jQuery);
    