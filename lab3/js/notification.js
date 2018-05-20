var Notification = (function () {
    var $notific;
    var $msgContent;

    return {
        init: function () {
            $notific = $("#notification");
            $msgContent = $("#notification h5");
        },
        success: function (msg) {
            $notific.css("background-color", "green");
            $msgContent.text(msg);
            show();
        },
        warning: function (msg) {
            $notific.css("background-color", "yellow");
            $msgContent.text(msg);
            show();
        },
        error: function (msg) {
            $notific.css("background-color", "red");
            $msgContent.text(msg);
            show();
        }
    };

    function show() {
        $notific.css({right: "-350px", opacity: 1});
        $notific.animate({right: "25px"}, 300,function () {
            setTimeout(function () {
                hide();
            }, 1500);
        })
    }

    function hide() {
        $notific.animate({opacity: 0}, 300);
    }
})();