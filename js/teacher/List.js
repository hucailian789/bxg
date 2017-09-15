define([
    'jquery',
    'text!tpls/teacherList.html',
    'template',
    'teacher/show',
    'teacher/add',
    'teacher/edit'
], function ($, teacherListTip, template, teacherShow, teacherAdd, teacherEdit) {
    return function () {
        $.ajax({
            url: "/api/teacher",
            success: function (res) {
                if (res.code != 200) throw new Error(res.msg);
                var html = template.render(teacherListTip, res);
                $(".right .menu-content").html(html);

                $("div.panel")
                    //查看讲师
                    .on("click", ".btn-show", function () {
                        var tc_id = $(this).parent().attr('tc_id');
                        teacherShow(tc_id);
                    })
                    //添加讲师
                    .on("click", ".btn-add", function () {
                        teacherAdd();
                    })
                    //编辑讲师
                    .on("click", ".btn-edit", function () {
                        var tc_id = $(this).parent().attr("tc_id");
                        teacherEdit(tc_id);
                    })
                    //启用注销讲师
                    .on("click", ".btn-logout", function () {
                        var $btnlogout = $(this);
                        $.ajax({
                            url: "/api/teacher/handle",
                            type: "post",
                            data: {
                                tc_id: $(this).parent().attr("tc_id"),
                                tc_status: $(this).parent().attr("tc_status")
                            },
                            success: function (res) {
                                if (res.code != 200) throw new Error(res.msg);
                                var status = res.result.tc_status; //先用变量保存用户最新的状态值
                                //a、修改状态列文本
                                $btnlogout.parent().siblings(".td-status").html(status == 0 ? "注销" : "启用")
                                //b、修改用户状态按钮值
                                $btnlogout.html(status == 0 ? "启用" : "注销");
                                //c、修改父元素中的tc_status属性值
                                $btnlogout.parent().attr("tc_status", status);
                            }
                        })
                    })

            }
        })
    }

});