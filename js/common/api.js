/*
封装ajax请求


*/

define([
    'jquery'

], function ($) {

    return { //多个值,用对象
        ajax: function (url, type, data, callback) {
            $.ajax({
                url: "/api/" + url,
                type: type,
                data: data,
                success: function (result) {
                    if (result.code != 200) throw new Error(result.msg);

                    callback(result); //回调函数,只要执行了才会调用
                },
                error: function (res) {
                    throw new Error(res);
                }
            })
        },
        get: function (url, data, callback) {
            this.ajax(url, "get", data, callback);
        },
        post: function (url, data, callback) {
            this.ajax(url, "post", data, callback);
        }
    }

});