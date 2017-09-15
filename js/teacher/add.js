define([
    'jquery',
    'text!tpls/teacherAdd.html'

], function ($, teacherAddTip) {
    return function () {
        var $html = $(teacherAddTip);
        $html.appendTo("body").modal().on("hidden.bs.modal", function () {

            $html.find(".date-join").datetimepicker('remove'); //删除日期控件
            $(this).remove(); //希望模态框隐藏的时候，把模态框这个容器给删除
        }).on("submit", "form", function (e) {
            e.preventDefault(); //把同步表单变成异步表单
            var formData = $(this).serialize(); //获取表单数据

            $.ajax({ //发送ajax请求
                url: "/api/teacher/add",
                type: 'post',
                data: formData,
                success: function (res) {
                    if (res.code != 200) throw new Error(res.msg);
                    $html.modal("hide");
                    $(".left .list-group a[item=teacher]").trigger("click");
                }
            })
        })
        //日期插件
        $html.find(".date-join").datetimepicker({
            format: 'yyyy-mm-dd',
            weekStart: 1, //每周从周一开始
            daysOfWeekDisabled: [6, 0], //表示周六日不能选
            autoclose: true,
            minView: "month", //月视图
            language: "zh-CN",
            todayHighlight: true, //在今天这个月内，如果选中的不是今天，告诉你今天是哪一天
            todayBtn: true //显示"今天"按钮
        })
    }

});