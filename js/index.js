;
(function () {
    const Nav = $(".nav");
    const ToTop = $(".to-top");

    const Goto = (tar, timed) => {
        $('html').animate({
            scrollTop: tar
        }, timed);
    }
    $(window).on("scroll", function () {
        let _pageY = window.pageYOffset;


        if (_pageY > 0) {
            Nav.addClass("active");

        } else {
            Nav.removeClass("active");
        }
        if (_pageY > 100) {
            ToTop.addClass("active");

        } else {
            ToTop.removeClass("active");
        }
    });

    ToTop.on("click", function () {
        let _pageY = window.pageYOffset;
        Goto(0, _pageY * 0.25);
    });

    const NavToggler = $(".nav-toggler");
    const NavMenu = $(".nav-menu");
    const NavMenuMask = $(".nav-menu-mask");

    const NavTogglerMenu = (e) => {
        if (e) {
            NavMenu.removeClass("open");
            NavToggler.removeClass("open");
        } else {
            NavMenu.addClass("open");
            NavToggler.addClass("open");
        }
    }
    NavMenuMask.on("click", function () {
        NavTogglerMenu(true);
    });
    NavToggler.on("click", function () {
        const _ = $(this);
        _.hasClass("open") ? NavTogglerMenu(true) : NavTogglerMenu(false);
    });
})()