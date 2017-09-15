define([
    'jquery',
    'text!tpls/teacherEdit.html',
    'template'
], function ($, teacherEditTip, template) {
    return function (id) {

        $.ajax({
            url: "/api/teacher/edit",
            data: {
                tc_id: id
            },
            success: function (data) {
                var html = template.render(teacherEditTip, data);

                var $html = $(html).appendTo("body").modal().on("hidden.bs.modal", function () {
                        $html.remove();
                    })
                    //绑定事件,异步代码
                    .on("submit", "form", function (e) {
                        e.preventDefault(); //把同步表单变成异步的表单

                        var formData = $(this).serialize(); //获取表单数据

                        $.ajax({
                            url: "/api/teacher/update",
                            type: "post",
                            data: formData,
                            success: function (res) {

                                if (res.code != 200) throw new Error(res.msg);
                                $html.modal('hide');

                                $(".left .list-group a[item=teacher]").trigger("click"); //当时出不来,是因为html的页面模板写错了一点,修改后就能出现
                            }
                        })
                    });

            }
        })

    }
})