define([
    'jquery',
    'text!tpls/courseTimeEdit.html',
    'template'
], function ($, courseTimeEditTip, template) {
    return function (ct_id, callback) {
        $.get("/api/course/chapter/edit", {
            ct_id: ct_id
        }, function (res) {
            var html = template.render(courseTimeEditTip, res.result);
            var $html = $(html).on("submit", "form", function (e) {
                e.preventDefault();
                var formData = $(this).serialize();
                console.log(formData);
                $.post("/api/course/chapter/modify", formData, function (data) {

                    if (data.code != 200) throw new Error(data.msg);
                    $html.modal("hide");
                    callback();
                })
            }).myModal();
        })
    }
});