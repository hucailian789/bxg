define([
    'jquery',
    'text!tpls/courseImage.html',
    'template'
], function ($, courseImageTip, template) {
    return function (id) {
        $.get("/api/course/picture", {
            cs_id: id
        }, function (res) {
            var html = template.render(courseImageTip, res.result);
            var $html = $(html);
            $(".right .menu-content").html($html);

            $("#fileCourse").uploadify({
                formData: { //额外提交的一些参数
                    cs_id: id
                },
                fileObjName: "cs_cover_original", //作为装载文件内容的name值             
                height: 30, //参数                
                swf: '../assets/uploadify/uploadify.swf', //flash文件               
                uploader: '/api/uploader/cover', //服务器地址  
                width: 120,
                fileTypeExts: '*.gif; *.jpg; *.png; *.jpeg', //指定上传文件的扩展名 
                multi: false, //指定用户一次性是否可以选择多个文件                               
                onUploadSuccess: function (file, data, response) { //等到上传成功调用该方法 
                    $(".left .list-group a[item=course]").trigger("click"); //刷新课程列表
                }
            });


        })
    }

});