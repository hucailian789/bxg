define([
    'jquery',
    'text!tpls/courseAdd.html'
], function ($, courseAddTip) {
    return function () {
        var $html = $(courseAddTip);
        $html.on("submit", "form", function (e) {
            e.preventDefault();
            var formData = $(this).serialize();
            $.post('/api/course/create', formData, function () {
                $html.modal("hide");
                $(".left .list-group a[item=course]").trigger("click");
            })
        }).myModal();

    }

});