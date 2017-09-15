define([
    'jquery'

], function ($) {

    $.fn.myModal = function () {
        var $thml = this.appendTo("body").modal().on("hidden.bs.modal", function () {
            $thml.remove();
        });
        return this; //支持链式编程
    }

});