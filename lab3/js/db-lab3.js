var Lab3 = (function () {

    var pages = ["pages/main.html", "pages/manage.html", "pages/er.html", "pages/query.html", "pages/about.html"];

    var $navOptions;
    var $frame;
    
    return {
        init:function () {
            $navOptions = $("[data-page]");
            $frame = $("#page-content");

            $navOptions.click(function (event) {
                event.preventDefault();
                if (!$(this).hasClass("active")) {
                    $navOptions.removeClass("active");
                    $(this).addClass("active");
                    $frame.attr("src", pages[$(this).attr("data-page")]);
                }
            });
        }
    }
})();
