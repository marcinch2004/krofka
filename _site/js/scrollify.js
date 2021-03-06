! function(e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], function(o) {
        return t(o, e, e.document)
    }) : "object" == typeof module && module.exports ? module.exports = t(require("jquery"), e, e.document) : t(jQuery, e, e.document)
}("undefined" != typeof window ? window : this, function(e, t, o, n) {
    "use strict";
    var r, s, i, a, c, u, l = [],
        h = [],
        f = [],
        d = [],
        p = 0,
        m = 0,
        g = 1,
        v = !1,
        y = e(t),
        w = y.scrollTop(),
        S = !1,
        H = !1,
        b = !1,
        E = !1,
        M = [],
        x = (new Date).getTime(),
        T = !0,
        D = !1,
        I = 0,
        N = "onwheel" in o ? "wheel" : o.onmousewheel !== n ? "mousewheel" : "DOMMouseScroll",
        k = {
            section: ".section",
            sectionName: "section-name",
            interstitialSection: "",
            easing: "easeOutExpo",
            scrollSpeed: 1100,
            offset: 0,
            scrollbars: !0,
            target: "html,body",
            standardScrollElements: !1,
            setHeights: !0,
            overflowScroll: !0,
            updateHash: !0,
            touchScroll: !0,
            before: function() {},
            after: function() {},
            afterResize: function() {},
            afterRender: function() {}
        };

    function L() {
        return y.height() + k.offset
    }

    function O(o, n, r, s) {
        if (m === o && (r = !1), !0 === E) return !0;
        if (h[o]) {
            if (S = !1, !0 === T && (k.afterRender(), T = !1), r && "function" == typeof k.before && !1 === k.before(o, f)) return !0;
            if (g = 1, I = l[o], !1 === T && m > o && !1 === s && d[o] && (i = L(), g = parseInt(f[o].outerHeight() / i), I = parseInt(l[o]) + (f[o].outerHeight() - i)), k.updateHash && k.sectionName && (!0 !== T || 0 !== o))
                if (history.pushState) try {
                    history.replaceState(null, null, h[o])
                } catch (e) {
                    t.console && console.warn("Scrollify warning: Page must be hosted to manipulate the hash value.")
                } else t.location.hash = h[o];
            if (m = o, n) e(k.target).stop().scrollTop(I), r && k.after(o, f);
            else {
                if (H = !0, e().velocity ? e(k.target).stop().velocity("scroll", {
                        duration: k.scrollSpeed,
                        easing: k.easing,
                        offset: I,
                        mobileHA: !1
                    }) : e(k.target).stop().animate({
                        scrollTop: I
                    }, k.scrollSpeed, k.easing), t.location.hash.length && k.sectionName && t.console) try {
                    e(t.location.hash).length && console.warn("Scrollify warning: ID matches hash value - this will cause the page to anchor.")
                } catch (e) {}
                e(k.target).promise().done(function() {
                    H = !1, T = !1, r && k.after(o, f)
                })
            }
        }
    }

    function z(e) {
        function t(t) {
            for (var o = 0, n = e.slice(Math.max(e.length - t, 1)), r = 0; r < n.length; r++) o += n[r];
            return Math.ceil(o / t)
        }
        return t(10) >= t(70)
    }
    var R = function(n) {
        function m(t) {
            e().velocity ? e(k.target).stop().velocity("scroll", {
                duration: k.scrollSpeed,
                easing: k.easing,
                offset: t,
                mobileHA: !1
            }) : e(k.target).stop().animate({
                scrollTop: t
            }, k.scrollSpeed, k.easing)
        }

        function T(t) {
            t && (w = y.scrollTop());
            var o = k.section;
            d = [], k.interstitialSection.length && (o += "," + k.interstitialSection), !1 === k.scrollbars && (k.overflowScroll = !1), i = L(), e(o).each(function(t) {
                var o = e(this);
                k.setHeights ? o.is(k.interstitialSection) ? d[t] = !1 : o.css("height", "auto").outerHeight() < i || "hidden" === o.css("overflow") ? (o.css({
                    height: i
                }), d[t] = !1) : (o.css({
                    height: o.height()
                }), k.overflowScroll ? d[t] = !0 : d[t] = !1) : o.outerHeight() < i || !1 === k.overflowScroll ? d[t] = !1 : d[t] = !0
            }), t && y.scrollTop(w)
        }

        function I(o, n) {
            var r = k.section;
            k.interstitialSection.length && (r += "," + k.interstitialSection), l = [], h = [], f = [], e(r).each(function(o) {
                var n = e(this);
                l[o] = o > 0 ? parseInt(n.offset().top) + k.offset : parseInt(n.offset().top), k.sectionName && n.data(k.sectionName) ? h[o] = "#" + n.data(k.sectionName).toString().replace(/ /g, "-") : !1 === n.is(k.interstitialSection) ? h[o] = "#" + (o + 1) : (h[o] = "#", o === e(r).length - 1 && o > 1 && (l[o] = l[o - 1] + (parseInt(e(e(r)[o - 1]).outerHeight()) - parseInt(e(t).height())) + parseInt(n.outerHeight()))), f[o] = n;
                try {
                    e(h[o]).length && t.console && console.warn("Scrollify warning: Section names can't match IDs - this will cause the browser to anchor.")
                } catch (e) {}
                t.location.hash === h[o] && (p = o, v = !0)
            }), !0 === o && O(p, !1, !1, !1)
        }

        function R() {
            return !d[p] || !((w = y.scrollTop()) > parseInt(l[p]))
        }

        function j() {
            return !d[p] || (w = y.scrollTop(), i = L(), !(w < parseInt(l[p]) + (f[p].outerHeight() - i) - 28))
        }
        D = !0, e.easing.easeOutExpo = function(e, t, o, n, r) {
            return t == r ? o + n : n * (1 - Math.pow(2, -10 * t / r)) + o
        }, a = {
            handleMousedown: function() {
                if (!0 === E) return !0;
                S = !1, b = !1
            },
            handleMouseup: function() {
                if (!0 === E) return !0;
                S = !0, b && a.calculateNearest(!1, !0)
            },
            handleScroll: function() {
                if (!0 === E) return !0;
                r && clearTimeout(r), r = setTimeout(function() {
                    if (b = !0, !1 === S) return !1;
                    S = !1, a.calculateNearest(!1, !0)
                }, 200)
            },
            calculateNearest: function(e, t) {
                w = y.scrollTop();
                for (var o, n = 1, r = l.length, s = 0, i = Math.abs(l[0] - w); n < r; n++)(o = Math.abs(l[n] - w)) < i && (i = o, s = n);
                (j() && s > p || R()) && (p = s, O(s, e, t, !1))
            },
            wheelHandler: function(o) {
                if (!0 === E) return !0;
                if (k.standardScrollElements && (e(o.target).is(k.standardScrollElements) || e(o.target).closest(k.standardScrollElements).length)) return !0;
                d[p] || o.preventDefault();
                var n = (new Date).getTime(),
                    r = (o = o || t.event).originalEvent.wheelDelta || -o.originalEvent.deltaY || -o.originalEvent.detail,
                    s = Math.max(-1, Math.min(1, r));
                if (M.length > 149 && M.shift(), M.push(Math.abs(r)), n - x > 200 && (M = []), x = n, H) return !1;
                if (s < 0) {
                    if (p < l.length - 1 && j()) {
                        if (!z(M)) return !1;
                        o.preventDefault(), H = !0, O(++p, !1, !0, !1)
                    }
                } else if (s > 0 && p > 0 && R()) {
                    if (!z(M)) return !1;
                    o.preventDefault(), H = !0, O(--p, !1, !0, !1)
                }
            },
            keyHandler: function(t) {
                return !0 === E || !1 === o.activeElement.readOnly || (!(!k.standardScrollElements || !e(t.target).is(k.standardScrollElements) && !e(t.target).closest(k.standardScrollElements).length) || !0 !== H && void(38 == t.keyCode || 33 == t.keyCode ? p > 0 && R() && (t.preventDefault(), O(--p, !1, !0, !1)) : 40 != t.keyCode && 34 != t.keyCode || p < l.length - 1 && j() && (t.preventDefault(), O(++p, !1, !0, !1))))
            },
            init: function() {
                k.scrollbars ? (y.on("mousedown", a.handleMousedown), y.on("mouseup", a.handleMouseup), y.on("scroll", a.handleScroll)) : e("body").css({
                    overflow: "hidden"
                }), y.on(N, a.wheelHandler), y.on("keydown", a.keyHandler)
            }
        }, c = {
            touches: {
                touchstart: {
                    y: -1,
                    x: -1
                },
                touchmove: {
                    y: -1,
                    x: -1
                },
                touchend: !1,
                direction: "undetermined"
            },
            options: {
                distance: 30,
                timeGap: 800,
                timeStamp: (new Date).getTime()
            },
            touchHandler: function(t) {
                if (!0 === E) return !0;
                if (k.standardScrollElements && (e(t.target).is(k.standardScrollElements) || e(t.target).closest(k.standardScrollElements).length)) return !0;
                var o;
                if (void 0 !== t && void 0 !== t.touches) switch (o = t.touches[0], t.type) {
                    case "touchstart":
                        c.touches.touchstart.y = o.pageY, c.touches.touchmove.y = -1, c.touches.touchstart.x = o.pageX, c.touches.touchmove.x = -1, c.options.timeStamp = (new Date).getTime(), c.touches.touchend = !1;
                    case "touchmove":
                        c.touches.touchmove.y = o.pageY, c.touches.touchmove.x = o.pageX, c.touches.touchstart.y !== c.touches.touchmove.y && Math.abs(c.touches.touchstart.y - c.touches.touchmove.y) > Math.abs(c.touches.touchstart.x - c.touches.touchmove.x) && (t.preventDefault(), c.touches.direction = "y", c.options.timeStamp + c.options.timeGap < (new Date).getTime() && 0 == c.touches.touchend && (c.touches.touchend = !0, c.touches.touchstart.y > -1 && Math.abs(c.touches.touchmove.y - c.touches.touchstart.y) > c.options.distance && (c.touches.touchstart.y < c.touches.touchmove.y ? c.up() : c.down())));
                        break;
                    case "touchend":
                        !1 === c.touches[t.type] && (c.touches[t.type] = !0, c.touches.touchstart.y > -1 && c.touches.touchmove.y > -1 && "y" === c.touches.direction && (Math.abs(c.touches.touchmove.y - c.touches.touchstart.y) > c.options.distance && (c.touches.touchstart.y < c.touches.touchmove.y ? c.up() : c.down()), c.touches.touchstart.y = -1, c.touches.touchstart.x = -1, c.touches.direction = "undetermined"))
                }
            },
            down: function() {
                p < l.length && (j() && p < l.length - 1 ? O(++p, !1, !0, !1) : (i = L(), Math.floor(f[p].height() / i) > g ? (m(parseInt(l[p]) + i * g), g += 1) : m(parseInt(l[p]) + (f[p].outerHeight() - i))))
            },
            up: function() {
                p >= 0 && (R() && p > 0 ? O(--p, !1, !0, !1) : g > 2 ? (i = L(), g -= 1, m(parseInt(l[p]) + i * g)) : (g = 1, m(parseInt(l[p]))))
            },
            init: function() {
                if (o.addEventListener && k.touchScroll) {
                    var e = {
                        passive: !1
                    };
                    o.addEventListener("touchstart", c.touchHandler, e), o.addEventListener("touchmove", c.touchHandler, e), o.addEventListener("touchend", c.touchHandler, e)
                }
            }
        }, u = {
            refresh: function(e, t) {
                clearTimeout(s), s = setTimeout(function() {
                    T(!0), I(t, !1), e && k.afterResize()
                }, 400)
            },
            handleUpdate: function() {
                u.refresh(!1, !1)
            },
            handleResize: function() {
                u.refresh(!0, !1)
            },
            handleOrientation: function() {
                u.refresh(!0, !0)
            }
        }, k = e.extend(k, n), T(!1), I(!1, !0), !0 === v ? O(p, !1, !0, !0) : setTimeout(function() {
            a.calculateNearest(!0, !1)
        }, 200), l.length && (a.init(), c.init(), y.on("resize", u.handleResize), o.addEventListener && t.addEventListener("orientationchange", u.handleOrientation, !1))
    };

    function j(e, t) {
        for (var o = h.length; o >= 0; o--) "string" == typeof e ? h[o] === e && (p = o, O(o, t, !0, !0)) : o === e && (p = o, O(o, t, !0, !0))
    }
    return R.move = function(t) {
        if (t === n) return !1;
        t.originalEvent && (t = e(this).attr("href")), j(t, !1)
    }, R.instantMove = function(e) {
        if (e === n) return !1;
        j(e, !0)
    }, R.next = function() {
        p < h.length && O(p += 1, !1, !0, !0)
    }, R.previous = function() {
        p > 0 && O(p -= 1, !1, !0, !0)
    }, R.instantNext = function() {
        p < h.length && O(p += 1, !0, !0, !0)
    }, R.instantPrevious = function() {
        p > 0 && O(p -= 1, !0, !0, !0)
    }, R.destroy = function() {
        if (!D) return !1;
        k.setHeights && e(k.section).each(function() {
            e(this).css("height", "auto")
        }), y.off("resize", u.handleResize), k.scrollbars && (y.off("mousedown", a.handleMousedown), y.off("mouseup", a.handleMouseup), y.off("scroll", a.handleScroll)), y.off(N, a.wheelHandler), y.off("keydown", a.keyHandler), o.addEventListener && k.touchScroll && (o.removeEventListener("touchstart", c.touchHandler, !1), o.removeEventListener("touchmove", c.touchHandler, !1), o.removeEventListener("touchend", c.touchHandler, !1)), l = [], h = [], f = [], d = []
    }, R.update = function() {
        if (!D) return !1;
        u.handleUpdate()
    }, R.current = function() {
        return f[p]
    }, R.currentIndex = function() {
        return p
    }, R.disable = function() {
        E = !0
    }, R.enable = function() {
        E = !1, D && a.calculateNearest(!1, !1)
    }, R.isDisabled = function() {
        return E
    }, R.setOptions = function(o) {
        if (!D) return !1;
        "object" == typeof o ? (k = e.extend(k, o), u.handleUpdate()) : t.console && console.warn("Scrollify warning: setOptions expects an object.")
    }, e.scrollify = R, R
});