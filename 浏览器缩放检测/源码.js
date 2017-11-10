var WebpageZoomDetect = function() {
    "use strict";
    var e, t = function() {
        var e = !0
          , t = function() {
            return Math.round(screen.deviceXDPI / screen.logicalXDPI * 100) / 100
        }
          , n = function() {
            return Math.round(document.documentElement.offsetHeight / window.innerHeight * 100) / 100
        }
          , i = function() {
            var e = window.top.outerWidth / window.top.innerWidth;
            return Math.round(100 * e) / 100
        }
          , o = function(e) {
            var t, n, i = [".-wzd-zoomdetect {", "text-decoration: none", "}", "@media only screen and (-o-min-device-pixel-ratio: ", e, "/1),", "only screen and (min--moz-device-pixel-ratio: ", e, "), ", "only screen and (-webkit-min-device-pixel-ratio: ", e, "), ", "only screen and (min-resolution: 240dpi), ", "only screen and (min-resolution: 2dppx) {", ".-wzd-zoomdetect {", "text-decoration: underline", "}", "}"].join(""), o = !1;
            try {
                n = $("<div>a</div>").hide().addClass("-wzd-zoomdetect").appendTo("body"),
                t = $('<style type="text/css">' + i + "</style>"),
                t.insertBefore(n),
                o = "underline" == n.css("text-decoration"),
                n.remove(),
                t.remove()
            } catch (r) {}
            return o
        }
          , r = function() {
            var e = .01
              , t = function(n, i, r) {
                var a = (n + i) / 2;
                return 0 >= r || e > i - n ? a : o(a) ? t(a, i, r - 1) : t(n, a, r - 1)
            };
            return t(0, 5, 10)
        }
          , a = {
            detected: !1,
            retina: !1
        }
          , d = function() {
            return a.detected ? a.retina : (a = {
                detected: !0,
                retina: o(2)
            },
            a.retina)
        }
          , c = function() {
            var o = 1
              , a = navigator.userAgent.toLowerCase();
            return isNaN(screen.logicalXDPI) || isNaN(screen.systemXDPI) ? window.navigator.msMaxTouchPoints ? o = n() : /webkit/i.test(a) || /opera/i.test(a) ? o = i() : /firefox/i.test(a) ? d() ? (o = 1,
            e = !1) : o = r() : parseInt(window.top.outerWidth, 10) ? o = i() : e = !1 : o = t(),
            o
        }
          , s = function() {
            return c(),
            e
        };
        return {
            support: s,
            detect: c
        }
    }(), n = {
        get: function(e) {
            var t = new RegExp("(^| )" + e + "=([^;/]*)([^;$]*)(;|$)")
              , n = t.exec(document.cookie);
            return n ? n[2] || null : null
        },
        set: function(e) {
            var t = new Date;
            t.setTime(t.getTime() + 158112e5),
            document.cookie = e.key + "=" + e.value + (e.path ? "; path=" + ("./" == e.path ? "" : e.path) : "/") + (t ? "; expires=" + t.toGMTString() : "") + (e.domain ? "; domain=" + e.domain : "") + (e.secure ? "; secure" : "")
        }
    }, i = !1, o = function() {
        var i = ['<div class="mod-zoomdetect">', "<div>", '<i class="icon-info"></i>', '<span class="wzd-txt">#text#</span>', '<div class="never-tip">', '<a href="#" class="wzd-nevertip" title="' + IOT.tr("永久不再提示") + '">' + IOT.tr("不再提示") + "</a>", '<a href="#" class="wzd-btnclose icon-cancel" title="' + IOT.tr("关闭") + '"></a>', "</div>", "</div>", "</div><div></div>"].join("")
          , o = ""
          , r = t.detect();
        if (r = .95 > r ? r : r > 1.05 ? r : 1,
        1 == r)
            o = IOT.tr("您的浏览器目前处于正常比例！"),
            $(".content ").css("padding-top", "70px");
        else {
            var d = IOT.tr(r > 1 ? "放大" : "缩小")
              , c = navigator.platform.toLowerCase().indexOf("mac") > -1 ? "command" : "Ctrl";
            o = IOT.tr("您的浏览器处于") + '<q class="x-tip">' + d + "</q>" + IOT.tr("状态，") + d + IOT.tr("比例为") + String(100 * r).substr(0, 6) + "%，" + IOT.tr("将会导致显示不正常，您可以用键盘按") + '<q class="x-key">' + c + IOT.tr("+数字0") + "</q>" + IOT.tr("恢复正常比例。"),
            $(".content ").css("padding-top", "110px")
        }
        {
            var s = $(".mod-zoomdetect");
            $(".mod-zoomdetect .wzd-close")
        }
        if (s[0]) {
            var l = parseFloat(s.attr("data-ratio"), 10);
            l != r && s.attr("data-ratio", r).find(".wzd-txt").html(o)
        } else
            s = $(i.replace("#text#", o)).prependTo("body .header").attr("data-ratio", r).hide(),
            s.find(".wzd-btnclose,.wzd-nevertip").click(function(t) {
                s.slideUp(200),
                void 0 != e && a(),
                $(this).hasClass("wzd-nevertip") && n.set({
                    key: "_wzd_nevertip_",
                    value: 1
                }),
                t.stopPropagation(),
                t.preventDefault()
            });
        1 == r ? s.slideUp(200) : s.slideDown(200)
    }, r = function(d) {
        d = d || {},
        i || (i = !0,
        t.support() && (0 != d.always ? n.get("_wzd_nevertip_") || (e = window.setInterval(o, d.interval || 500)) : o(),
        $(window).blur(function() {
            a()
        }).focus(function() {
            r()
        })))
    }, a = function() {
        void 0 != e && (window.clearInterval(e),
        i = !1),
        $(".content ").css("padding-top", "70px")
    };
    return {
        version: "1.2",
        start: r,
        stop: a
    }
}();