const Ani = (opts) => {
    const WindowHeight = window.innerHeight;
    const DocHeight = $(document).height();
    const AniItems = $(".ani");

    let _defaults = {
        aniDelay: 0.1,
        aniDelayStart: 1000,
    };

    _defaults = {
        ..._defaults,
        ...opts
    };

    // ani wave
    const AniWaveCreate = () => {
        const Wave = $(".wave");
        if (Wave.length < 1) return false;

        Wave.map((a, b) => {
            let _h = $(b).text().replace(/\s+/g, '').split("");
            _h = _h.map((v) => `<span>${v}</span>`).join("");

            $(b).html(_h);
        });
    };

    // ani type
    const AniTypeCreate = () => {
        const AniType = $(".type");
        if (AniType.length < 1) return false;

        AniType.map((a, b) => {
            let _target = $(b).find(".target");
            let _d = -_defaults.aniDelay;
            let _h = _target.text().replace(/\s+/g, '').split("");
            _h = _h.map((v) => {
                _d += _defaults.aniDelay;
                return `<span>${v}</span>`;
            }).join("");

            _target.html(_h);
            _target.css({
                'transition-duration': _d + 's'
            })
        });
    };

    // animation
    const Animation = () => {

        const CheckPos = (a, b, c) => {
            // return true if it inside screen
            return a >= b && a <= c;
        };

        let _a = 0, // time delay each other
            _b = window.pageYOffset, // scroll top page
            _c = _b + WindowHeight * 0.85; // scroll end page

        if (_b + WindowHeight >= DocHeight) {
            _c = _b + WindowHeight;
        }

        AniItems.map((ind, val) => {
            let _ = $(val);
            if (!_.hasClass("ani-pass")) {
                let _check = CheckPos(_.offset().top, _b, _c);
                console.log(_check)
                if (_check) {
                    // add class to check it is ready to show
                    _.addClass("ani-pass");
                    // set time out to add class animated
                    let _set = setTimeout(() => {
                        _.addClass("animated");
                    }, _a * 1000);
                    _a += _defaults.aniDelay;

                } else if (_.offset().top < _b) {
                    // add class if it is on top screen position
                    _.addClass("ani-pass animated");
                    //_.addClass("");
                }
            }
        });
    };

    const Init = () => {
        //create wave
        AniWaveCreate();
        //create type
        AniTypeCreate();

        $(window).on("load", () => {
            setTimeout(() => {
                Animation();
            }, _defaults.aniDelayStart);
        });

        $(window).on("scroll", () => {
            Animation();
        });
    };

    Init();
}