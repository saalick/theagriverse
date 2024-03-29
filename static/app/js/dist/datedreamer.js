! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.datedreamer = t() : e.datedreamer = t()
}(this, (() => (() => {
    var e = {
            484: function(e) {
                e.exports = function() {
                    "use strict";
                    var e = 6e4,
                        t = 36e5,
                        n = "millisecond",
                        a = "second",
                        r = "minute",
                        i = "hour",
                        d = "day",
                        s = "week",
                        o = "month",
                        l = "quarter",
                        c = "year",
                        h = "date",
                        u = "Invalid Date",
                        m = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
                        p = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
                        f = {
                            name: "en",
                            weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
                            months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
                            ordinal: function(e) {
                                var t = ["th", "st", "nd", "rd"],
                                    n = e % 100;
                                return "[" + e + (t[(n - 20) % 10] || t[n] || t[0]) + "]"
                            }
                        },
                        _ = function(e, t, n) {
                            var a = String(e);
                            return !a || a.length >= t ? e : "" + Array(t + 1 - a.length).join(n) + e
                        },
                        v = {
                            s: _,
                            z: function(e) {
                                var t = -e.utcOffset(),
                                    n = Math.abs(t),
                                    a = Math.floor(n / 60),
                                    r = n % 60;
                                return (t <= 0 ? "+" : "-") + _(a, 2, "0") + ":" + _(r, 2, "0")
                            },
                            m: function e(t, n) {
                                if (t.date() < n.date()) return -e(n, t);
                                var a = 12 * (n.year() - t.year()) + (n.month() - t.month()),
                                    r = t.clone().add(a, o),
                                    i = n - r < 0,
                                    d = t.clone().add(a + (i ? -1 : 1), o);
                                return +(-(a + (n - r) / (i ? r - d : d - r)) || 0)
                            },
                            a: function(e) {
                                return e < 0 ? Math.ceil(e) || 0 : Math.floor(e)
                            },
                            p: function(e) {
                                return {
                                    M: o,
                                    y: c,
                                    w: s,
                                    d,
                                    D: h,
                                    h: i,
                                    m: r,
                                    s: a,
                                    ms: n,
                                    Q: l
                                } [e] || String(e || "").toLowerCase().replace(/s$/, "")
                            },
                            u: function(e) {
                                return void 0 === e
                            }
                        },
                        g = "en",
                        y = {};
                    y[g] = f;
                    var D = function(e) {
                            return e instanceof w
                        },
                        M = function e(t, n, a) {
                            var r;
                            if (!t) return g;
                            if ("string" == typeof t) {
                                var i = t.toLowerCase();
                                y[i] && (r = i), n && (y[i] = n, r = i);
                                var d = t.split("-");
                                if (!r && d.length > 1) return e(d[0])
                            } else {
                                var s = t.name;
                                y[s] = t, r = s
                            }
                            return !a && r && (g = r), r || !a && g
                        },
                        b = function(e, t) {
                            if (D(e)) return e.clone();
                            var n = "object" == typeof t ? t : {};
                            return n.date = e, n.args = arguments, new w(n)
                        },
                        x = v;
                    x.l = M, x.i = D, x.w = function(e, t) {
                        return b(e, {
                            locale: t.$L,
                            utc: t.$u,
                            x: t.$x,
                            $offset: t.$offset
                        })
                    };
                    var w = function() {
                            function f(e) {
                                this.$L = M(e.locale, null, !0), this.parse(e)
                            }
                            var _ = f.prototype;
                            return _.parse = function(e) {
                                this.$d = function(e) {
                                    var t = e.date,
                                        n = e.utc;
                                    if (null === t) return new Date(NaN);
                                    if (x.u(t)) return new Date;
                                    if (t instanceof Date) return new Date(t);
                                    if ("string" == typeof t && !/Z$/i.test(t)) {
                                        var a = t.match(m);
                                        if (a) {
                                            var r = a[2] - 1 || 0,
                                                i = (a[7] || "0").substring(0, 3);
                                            return n ? new Date(Date.UTC(a[1], r, a[3] || 1, a[4] || 0, a[5] || 0, a[6] || 0, i)) : new Date(a[1], r, a[3] || 1, a[4] || 0, a[5] || 0, a[6] || 0, i)
                                        }
                                    }
                                    return new Date(t)
                                }(e), this.$x = e.x || {}, this.init()
                            }, _.init = function() {
                                var e = this.$d;
                                this.$y = e.getFullYear(), this.$M = e.getMonth(), this.$D = e.getDate(), this.$W = e.getDay(), this.$H = e.getHours(), this.$m = e.getMinutes(), this.$s = e.getSeconds(), this.$ms = e.getMilliseconds()
                            }, _.$utils = function() {
                                return x
                            }, _.isValid = function() {
                                return !(this.$d.toString() === u)
                            }, _.isSame = function(e, t) {
                                var n = b(e);
                                return this.startOf(t) <= n && n <= this.endOf(t)
                            }, _.isAfter = function(e, t) {
                                return b(e) < this.startOf(t)
                            }, _.isBefore = function(e, t) {
                                return this.endOf(t) < b(e)
                            }, _.$g = function(e, t, n) {
                                return x.u(e) ? this[t] : this.set(n, e)
                            }, _.unix = function() {
                                return Math.floor(this.valueOf() / 1e3)
                            }, _.valueOf = function() {
                                return this.$d.getTime()
                            }, _.startOf = function(e, t) {
                                var n = this,
                                    l = !!x.u(t) || t,
                                    u = x.p(e),
                                    m = function(e, t) {
                                        var a = x.w(n.$u ? Date.UTC(n.$y, t, e) : new Date(n.$y, t, e), n);
                                        return l ? a : a.endOf(d)
                                    },
                                    p = function(e, t) {
                                        return x.w(n.toDate()[e].apply(n.toDate("s"), (l ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(t)), n)
                                    },
                                    f = this.$W,
                                    _ = this.$M,
                                    v = this.$D,
                                    g = "set" + (this.$u ? "UTC" : "");
                                switch (u) {
                                    case c:
                                        return l ? m(1, 0) : m(31, 11);
                                    case o:
                                        return l ? m(1, _) : m(0, _ + 1);
                                    case s:
                                        var y = this.$locale().weekStart || 0,
                                            D = (f < y ? f + 7 : f) - y;
                                        return m(l ? v - D : v + (6 - D), _);
                                    case d:
                                    case h:
                                        return p(g + "Hours", 0);
                                    case i:
                                        return p(g + "Minutes", 1);
                                    case r:
                                        return p(g + "Seconds", 2);
                                    case a:
                                        return p(g + "Milliseconds", 3);
                                    default:
                                        return this.clone()
                                }
                            }, _.endOf = function(e) {
                                return this.startOf(e, !1)
                            }, _.$set = function(e, t) {
                                var s, l = x.p(e),
                                    u = "set" + (this.$u ? "UTC" : ""),
                                    m = (s = {}, s[d] = u + "Date", s[h] = u + "Date", s[o] = u + "Month", s[c] = u + "FullYear", s[i] = u + "Hours", s[r] = u + "Minutes", s[a] = u + "Seconds", s[n] = u + "Milliseconds", s)[l],
                                    p = l === d ? this.$D + (t - this.$W) : t;
                                if (l === o || l === c) {
                                    var f = this.clone().set(h, 1);
                                    f.$d[m](p), f.init(), this.$d = f.set(h, Math.min(this.$D, f.daysInMonth())).$d
                                } else m && this.$d[m](p);
                                return this.init(), this
                            }, _.set = function(e, t) {
                                return this.clone().$set(e, t)
                            }, _.get = function(e) {
                                return this[x.p(e)]()
                            }, _.add = function(n, l) {
                                var h, u = this;
                                n = Number(n);
                                var m = x.p(l),
                                    p = function(e) {
                                        var t = b(u);
                                        return x.w(t.date(t.date() + Math.round(e * n)), u)
                                    };
                                if (m === o) return this.set(o, this.$M + n);
                                if (m === c) return this.set(c, this.$y + n);
                                if (m === d) return p(1);
                                if (m === s) return p(7);
                                var f = (h = {}, h[r] = e, h[i] = t, h[a] = 1e3, h)[m] || 1,
                                    _ = this.$d.getTime() + n * f;
                                return x.w(_, this)
                            }, _.subtract = function(e, t) {
                                return this.add(-1 * e, t)
                            }, _.format = function(e) {
                                var t = this,
                                    n = this.$locale();
                                if (!this.isValid()) return n.invalidDate || u;
                                var a = e || "YYYY-MM-DDTHH:mm:ssZ",
                                    r = x.z(this),
                                    i = this.$H,
                                    d = this.$m,
                                    s = this.$M,
                                    o = n.weekdays,
                                    l = n.months,
                                    c = function(e, n, r, i) {
                                        return e && (e[n] || e(t, a)) || r[n].slice(0, i)
                                    },
                                    h = function(e) {
                                        return x.s(i % 12 || 12, e, "0")
                                    },
                                    m = n.meridiem || function(e, t, n) {
                                        var a = e < 12 ? "AM" : "PM";
                                        return n ? a.toLowerCase() : a
                                    },
                                    f = {
                                        YY: String(this.$y).slice(-2),
                                        YYYY: this.$y,
                                        M: s + 1,
                                        MM: x.s(s + 1, 2, "0"),
                                        MMM: c(n.monthsShort, s, l, 3),
                                        MMMM: c(l, s),
                                        D: this.$D,
                                        DD: x.s(this.$D, 2, "0"),
                                        d: String(this.$W),
                                        dd: c(n.weekdaysMin, this.$W, o, 2),
                                        ddd: c(n.weekdaysShort, this.$W, o, 3),
                                        dddd: o[this.$W],
                                        H: String(i),
                                        HH: x.s(i, 2, "0"),
                                        h: h(1),
                                        hh: h(2),
                                        a: m(i, d, !0),
                                        A: m(i, d, !1),
                                        m: String(d),
                                        mm: x.s(d, 2, "0"),
                                        s: String(this.$s),
                                        ss: x.s(this.$s, 2, "0"),
                                        SSS: x.s(this.$ms, 3, "0"),
                                        Z: r
                                    };
                                return a.replace(p, (function(e, t) {
                                    return t || f[e] || r.replace(":", "")
                                }))
                            }, _.utcOffset = function() {
                                return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
                            }, _.diff = function(n, h, u) {
                                var m, p = x.p(h),
                                    f = b(n),
                                    _ = (f.utcOffset() - this.utcOffset()) * e,
                                    v = this - f,
                                    g = x.m(this, f);
                                return g = (m = {}, m[c] = g / 12, m[o] = g, m[l] = g / 3, m[s] = (v - _) / 6048e5, m[d] = (v - _) / 864e5, m[i] = v / t, m[r] = v / e, m[a] = v / 1e3, m)[p] || v, u ? g : x.a(g)
                            }, _.daysInMonth = function() {
                                return this.endOf(o).$D
                            }, _.$locale = function() {
                                return y[this.$L]
                            }, _.locale = function(e, t) {
                                if (!e) return this.$L;
                                var n = this.clone(),
                                    a = M(e, t, !0);
                                return a && (n.$L = a), n
                            }, _.clone = function() {
                                return x.w(this.$d, this)
                            }, _.toDate = function() {
                                return new Date(this.valueOf())
                            }, _.toJSON = function() {
                                return this.isValid() ? this.toISOString() : null
                            }, _.toISOString = function() {
                                return this.$d.toISOString()
                            }, _.toString = function() {
                                return this.$d.toUTCString()
                            }, f
                        }(),
                        $ = w.prototype;
                    return b.prototype = $, [
                        ["$ms", n],
                        ["$s", a],
                        ["$m", r],
                        ["$H", i],
                        ["$W", d],
                        ["$M", o],
                        ["$y", c],
                        ["$D", h]
                    ].forEach((function(e) {
                        $[e[1]] = function(t) {
                            return this.$g(t, e[0], e[1])
                        }
                    })), b.extend = function(e, t) {
                        return e.$i || (e(t, w, b), e.$i = !0), b
                    }, b.locale = M, b.isDayjs = D, b.unix = function(e) {
                        return b(1e3 * e)
                    }, b.en = y[g], b.Ls = y, b.p = {}, b
                }()
            },
            285: function(e) {
                e.exports = function() {
                    "use strict";
                    var e = {
                            LTS: "h:mm:ss A",
                            LT: "h:mm A",
                            L: "MM/DD/YYYY",
                            LL: "MMMM D, YYYY",
                            LLL: "MMMM D, YYYY h:mm A",
                            LLLL: "dddd, MMMM D, YYYY h:mm A"
                        },
                        t = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,
                        n = /\d\d/,
                        a = /\d\d?/,
                        r = /\d*[^-_:/,()\s\d]+/,
                        i = {},
                        d = function(e) {
                            return (e = +e) + (e > 68 ? 1900 : 2e3)
                        },
                        s = function(e) {
                            return function(t) {
                                this[e] = +t
                            }
                        },
                        o = [/[+-]\d\d:?(\d\d)?|Z/, function(e) {
                            (this.zone || (this.zone = {})).offset = function(e) {
                                if (!e) return 0;
                                if ("Z" === e) return 0;
                                var t = e.match(/([+-]|\d\d)/g),
                                    n = 60 * t[1] + (+t[2] || 0);
                                return 0 === n ? 0 : "+" === t[0] ? -n : n
                            }(e)
                        }],
                        l = function(e) {
                            var t = i[e];
                            return t && (t.indexOf ? t : t.s.concat(t.f))
                        },
                        c = function(e, t) {
                            var n, a = i.meridiem;
                            if (a) {
                                for (var r = 1; r <= 24; r += 1)
                                    if (e.indexOf(a(r, 0, t)) > -1) {
                                        n = r > 12;
                                        break
                                    }
                            } else n = e === (t ? "pm" : "PM");
                            return n
                        },
                        h = {
                            A: [r, function(e) {
                                this.afternoon = c(e, !1)
                            }],
                            a: [r, function(e) {
                                this.afternoon = c(e, !0)
                            }],
                            S: [/\d/, function(e) {
                                this.milliseconds = 100 * +e
                            }],
                            SS: [n, function(e) {
                                this.milliseconds = 10 * +e
                            }],
                            SSS: [/\d{3}/, function(e) {
                                this.milliseconds = +e
                            }],
                            s: [a, s("seconds")],
                            ss: [a, s("seconds")],
                            m: [a, s("minutes")],
                            mm: [a, s("minutes")],
                            H: [a, s("hours")],
                            h: [a, s("hours")],
                            HH: [a, s("hours")],
                            hh: [a, s("hours")],
                            D: [a, s("day")],
                            DD: [n, s("day")],
                            Do: [r, function(e) {
                                var t = i.ordinal,
                                    n = e.match(/\d+/);
                                if (this.day = n[0], t)
                                    for (var a = 1; a <= 31; a += 1) t(a).replace(/\[|\]/g, "") === e && (this.day = a)
                            }],
                            M: [a, s("month")],
                            MM: [n, s("month")],
                            MMM: [r, function(e) {
                                var t = l("months"),
                                    n = (l("monthsShort") || t.map((function(e) {
                                        return e.slice(0, 3)
                                    }))).indexOf(e) + 1;
                                if (n < 1) throw new Error;
                                this.month = n % 12 || n
                            }],
                            MMMM: [r, function(e) {
                                var t = l("months").indexOf(e) + 1;
                                if (t < 1) throw new Error;
                                this.month = t % 12 || t
                            }],
                            Y: [/[+-]?\d+/, s("year")],
                            YY: [n, function(e) {
                                this.year = d(e)
                            }],
                            YYYY: [/\d{4}/, s("year")],
                            Z: o,
                            ZZ: o
                        };

                    function u(n) {
                        var a, r;
                        a = n, r = i && i.formats;
                        for (var d = (n = a.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(t, n, a) {
                                var i = a && a.toUpperCase();
                                return n || r[a] || e[a] || r[i].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(e, t, n) {
                                    return t || n.slice(1)
                                }))
                            }))).match(t), s = d.length, o = 0; o < s; o += 1) {
                            var l = d[o],
                                c = h[l],
                                u = c && c[0],
                                m = c && c[1];
                            d[o] = m ? {
                                regex: u,
                                parser: m
                            } : l.replace(/^\[|\]$/g, "")
                        }
                        return function(e) {
                            for (var t = {}, n = 0, a = 0; n < s; n += 1) {
                                var r = d[n];
                                if ("string" == typeof r) a += r.length;
                                else {
                                    var i = r.regex,
                                        o = r.parser,
                                        l = e.slice(a),
                                        c = i.exec(l)[0];
                                    o.call(t, c), e = e.replace(c, "")
                                }
                            }
                            return function(e) {
                                var t = e.afternoon;
                                if (void 0 !== t) {
                                    var n = e.hours;
                                    t ? n < 12 && (e.hours += 12) : 12 === n && (e.hours = 0), delete e.afternoon
                                }
                            }(t), t
                        }
                    }
                    return function(e, t, n) {
                        n.p.customParseFormat = !0, e && e.parseTwoDigitYear && (d = e.parseTwoDigitYear);
                        var a = t.prototype,
                            r = a.parse;
                        a.parse = function(e) {
                            var t = e.date,
                                a = e.utc,
                                d = e.args;
                            this.$u = a;
                            var s = d[1];
                            if ("string" == typeof s) {
                                var o = !0 === d[2],
                                    l = !0 === d[3],
                                    c = o || l,
                                    h = d[2];
                                l && (h = d[2]), i = this.$locale(), !o && h && (i = n.Ls[h]), this.$d = function(e, t, n) {
                                    try {
                                        if (["x", "X"].indexOf(t) > -1) return new Date(("X" === t ? 1e3 : 1) * e);
                                        var a = u(t)(e),
                                            r = a.year,
                                            i = a.month,
                                            d = a.day,
                                            s = a.hours,
                                            o = a.minutes,
                                            l = a.seconds,
                                            c = a.milliseconds,
                                            h = a.zone,
                                            m = new Date,
                                            p = d || (r || i ? 1 : m.getDate()),
                                            f = r || m.getFullYear(),
                                            _ = 0;
                                        r && !i || (_ = i > 0 ? i - 1 : m.getMonth());
                                        var v = s || 0,
                                            g = o || 0,
                                            y = l || 0,
                                            D = c || 0;
                                        return h ? new Date(Date.UTC(f, _, p, v, g, y, D + 60 * h.offset * 1e3)) : n ? new Date(Date.UTC(f, _, p, v, g, y, D)) : new Date(f, _, p, v, g, y, D)
                                    } catch (e) {
                                        return new Date("")
                                    }
                                }(t, s, a), this.init(), h && !0 !== h && (this.$L = this.locale(h).$L), c && t != this.format(s) && (this.$d = new Date("")), i = {}
                            } else if (s instanceof Array)
                                for (var m = s.length, p = 1; p <= m; p += 1) {
                                    d[1] = s[p - 1];
                                    var f = n.apply(this, d);
                                    if (f.isValid()) {
                                        this.$d = f.$d, this.$L = f.$L, this.init();
                                        break
                                    }
                                    p === m && (this.$d = new Date(""))
                                } else r.call(this, e)
                        }
                    }
                }()
            },
            933: function(e, t, n) {
                "use strict";
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.calendarToggle = void 0;
                const r = n(255),
                    i = n(256),
                    d = a(n(484)),
                    s = a(n(285));
                d.default.extend(s.default);
                class o extends HTMLElement {
                    constructor(e) {
                        super(), this.inputPlaceholder = "Enter a date", this.options = e, this.element = e.element, this.attachShadow({
                            mode: "open"
                        }), this.init()
                    }
                    init() {
                        null != this.element ? (this.generateTemplate(), document.addEventListener("click", (e => {
                            var t;
                            this === e.target || this.contains(e.target) || null === (t = this.calendarWrapElement) || void 0 === t || t.classList.remove("active")
                        }))) : console.error("No element was provided to calendar. Initializing aborted")
                    }
                    generateTemplate() {
                        var e, t;
                        let n;
                        n = "string" == typeof this.options.selectedDate || "object" == typeof this.options.selectedDate ? (0, d.default)(this.options.selectedDate, this.options.format).format(this.options.format) : (0, d.default)().format(this.options.format);
                        const a = (0, i.calendarToggleRoot)(this.options.theme, this.options.styles, this.inputPlaceholder, n);
                        let r;
                        if ("string" == typeof this.element ? r = document.querySelector(this.element) : "object" == typeof this.element && (r = this.element), r) {
                            this.shadowRoot && (this.shadowRoot.innerHTML = a), r.append(this);
                            const n = null === (e = this.shadowRoot) || void 0 === e ? void 0 : e.querySelector(".datedreamer__calendar-toggle__calendar"),
                                i = null === (t = this.shadowRoot) || void 0 === t ? void 0 : t.querySelector("#date-input");
                            n && (this.calendarWrapElement = n), i && (this.inputElement = i, this.inputElement.addEventListener("focus", (() => {
                                var e;
                                null === (e = this.calendarWrapElement) || void 0 === e || e.classList.add("active")
                            }))), this.generateCalendar()
                        } else console.error(`Could not find ${this.element} in DOM.`)
                    }
                    generateCalendar() {
                        const e = new r.calendar(Object.assign(Object.assign({}, this.options), {
                            element: this.calendarWrapElement || "",
                            hideInputs: !0,
                            onChange: e => this.dateChangedHandler(e)
                        }));
                        this.calendarElement = e
                    }
                    dateChangedHandler(e) {
                        var t;
                        this.inputElement.value = e.detail, null === (t = this.calendarWrapElement) || void 0 === t || t.classList.remove("active"), this.options.onChange && this.options.onChange(e)
                    }
                }
                t.calendarToggle = o, customElements.define("datedreamer-calendar-toggle", o)
            },
            255: function(e, t, n) {
                "use strict";
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.calendar = void 0;
                const r = n(256),
                    i = a(n(484)),
                    d = a(n(285));
                i.default.extend(d.default);
                class s extends HTMLElement {
                    constructor(e) {
                        super(), this.calendarElement = null, this.headerElement = null, this.inputsElement = null, this.errorsElement = null, this.inputLabel = "Set a date", this.inputPlaceholder = "Enter a date", this.hideInputs = !1, this.darkMode = !1, this.hideOtherMonthDays = !1, this.errors = [], this.daysElement = null, this.selectedDate = new Date, this.displayedMonthDate = new Date, this.theme = "unstyled", this.styles = "", this.goToPrevMonth = e => {
                            this.displayedMonthDate.setMonth(this.displayedMonthDate.getMonth() - 1), this.rebuildCalendar(), this.onPrevNav && this.onPrevNav(new CustomEvent("prevNav", {
                                detail: this.displayedMonthDate
                            }))
                        }, this.goToNextMonth = e => {
                            this.displayedMonthDate.setMonth(this.displayedMonthDate.getMonth() + 1), this.rebuildCalendar(), this.onNextNav && this.onNextNav(new CustomEvent("prevNav", {
                                detail: this.displayedMonthDate
                            }))
                        }, this.setSelectedDay = e => {
                            const t = new Date(this.displayedMonthDate);
                            if (t.setDate(e), this.rangeMode) {
                                if (this.connector) {
                                    if (null !== this.connector.startDate && null !== this.connector.endDate && (this.connector.startDate = null, this.connector.endDate = null, this.connector.rebuildAllCalendars()), null == this.connector.startDate ? this.connector.startDate = new Date(t) : null == this.connector.endDate && (this.connector.endDate = new Date(t)), null !== this.connector.startDate && null !== this.connector.endDate) {
                                        if (this.connector.startDate > this.connector.endDate) {
                                            console.log("start date is larger than end date");
                                            const e = new Date(this.connector.endDate),
                                                t = new Date(this.connector.startDate);
                                            this.connector.startDate = e, this.connector.endDate = t, console.log(this.connector.startDate, this.connector.endDate)
                                        }
                                        this.connector.dateChangedCallback && this.connector.dateChangedCallback(new CustomEvent("dateChanged"))
                                    }
                                    this.connector.rebuildAllCalendars()
                                }
                            } else this.selectedDate = new Date(t), this.rebuildCalendar(), this.dateChangedCallback(this.selectedDate)
                        }, this.element = e.element, e.format && (this.format = e.format), e.theme && (this.theme = e.theme), e.styles && (this.styles = e.styles), e.iconNext && (this.iconNext = e.iconNext), e.iconPrev && (this.iconPrev = e.iconPrev), e.inputLabel && (this.inputLabel = e.inputLabel), e.inputPlaceholder && (this.inputPlaceholder = e.inputPlaceholder), e.hidePrevNav && (this.hidePrevNav = e.hidePrevNav), e.hideNextNav && (this.hideNextNav = e.hideNextNav), e.hideInputs && (this.hideInputs = e.hideInputs), e.darkMode && (this.darkMode = e.darkMode), e.rangeMode && (this.rangeMode = e.rangeMode), e.connector && (this.connector = e.connector, this.connector.calendars.push(this)), e.hideOtherMonthDays && (this.hideOtherMonthDays = e.hideOtherMonthDays), "string" == typeof e.selectedDate ? this.selectedDate = (0, i.default)(e.selectedDate, e.format).toDate() : "object" == typeof e.selectedDate && (this.selectedDate = e.selectedDate), this.attachShadow({
                            mode: "open"
                        }), this.onChange = e.onChange, this.onRender = e.onRender, this.onNextNav = e.onNextNav, this.onPrevNav = e.onPrevNav, this.displayedMonthDate = new Date(this.selectedDate), this.init()
                    }
                    init() {
                        var e, t, n, a;
                        if (null == this.element) return void console.error("No element was provided to calendar. Initializing aborted");
                        const i = (0, r.calendarRoot)(this.theme, this.styles, this.darkMode);
                        this.insertCalendarIntoSelector(i), this.headerElement = null === (e = this.shadowRoot) || void 0 === e ? void 0 : e.querySelector(".datedreamer__calendar_header"), this.daysElement = null === (t = this.shadowRoot) || void 0 === t ? void 0 : t.querySelector(".datedreamer__calendar_days"), this.inputsElement = null === (n = this.shadowRoot) || void 0 === n ? void 0 : n.querySelector(".datedreamer__calendar_inputs"), this.errorsElement = null === (a = this.shadowRoot) || void 0 === a ? void 0 : a.querySelector(".datedreamer__calendar_errors"), this.generateHeader(), this.generateInputs(), this.generateDays(), this.onRenderCallback()
                    }
                    insertCalendarIntoSelector(e) {
                        let t;
                        "string" == typeof this.element ? t = document.querySelector(this.element) : "object" == typeof this.element && (t = this.element), t ? (this.shadowRoot && (this.shadowRoot.innerHTML = e), t.append(this)) : console.error(`Could not find ${this.element} in DOM.`)
                    }
                    generateHeader() {
                        var e, t, n;
                        if (!this.hidePrevNav) {
                            const t = document.createElement("button");
                            t.classList.add("datedreamer__calendar_prev"), t.innerHTML = this.iconPrev ? this.iconPrev : r.leftChevron, t.setAttribute("aria-label", "Previous"), t.addEventListener("click", this.goToPrevMonth), null === (e = this.headerElement) || void 0 === e || e.append(t)
                        }
                        const a = document.createElement("span");
                        if (a.classList.add("datedreamer__calendar_title"), a.innerText = `${r.monthNames[this.displayedMonthDate.getMonth()]} ${this.displayedMonthDate.getFullYear()}`, null === (t = this.headerElement) || void 0 === t || t.append(a), !this.hideNextNav) {
                            const e = document.createElement("button");
                            e.classList.add("datedreamer__calendar_next"), e.innerHTML = this.iconNext ? this.iconNext : r.rightChevron, e.setAttribute("aria-label", "Next"), e.addEventListener("click", this.goToNextMonth), null === (n = this.headerElement) || void 0 === n || n.append(e)
                        }
                    }
                    generateInputs() {
                            // var e;
                            // if (this.hideInputs) return;
                            // const t = document.createElement("label");
                            // t.setAttribute("for", "date-input"), t.textContent = this.inputLabel;
                            // const n = document.createElement("div");
                            // n.classList.add("datedreamer__calendar__inputs-wrap");
                            // const a = document.createElement("input");
                            // a.id = "date-input", a.placeholder = this.inputPlaceholder, a.value = (0, i.default)(this.selectedDate).format(this.format), a.addEventListener("keyup", (e => this.dateInputChanged(e))), a.setAttribute("title", "Set a date");
                            // const r = document.createElement("button");
                            // r.innerText = "Today", r.addEventListener("click", (() => this.setDateToToday())), n.append(a, r), null === (e = this.inputsElement) || void 0 === e || e.append(t, n)
                    }
                    generateErrors() {
                        var e;
                        const t = null === (e = this.inputsElement) || void 0 === e ? void 0 : e.querySelector("input");
                        t && t.classList.remove("error"), this.errorsElement && (this.errorsElement.innerHTML = ""), this.errors.forEach((({
                            type: e,
                            message: n
                        }) => {
                            var a;
                            const r = document.createElement("span");
                            r.innerText = n, "input-error" == e && t && t.classList.add("error"), null === (a = this.errorsElement) || void 0 === a || a.append(r)
                        })), this.errors = []
                    }
                    generateDays() {
                        var e, t, n, a, i, d, s, o, l, c;
                        const h = this.selectedDate.getDate(),
                            u = this.displayedMonthDate.getMonth(),
                            m = this.displayedMonthDate.getFullYear(),
                            p = new Date(m, u + 1, 0).getDate(),
                            f = new Date(m, u, 1),
                            _ = new Date(m, u, p),
                            v = r.weekdays.indexOf(f.toString().split(" ")[0]),
                            g = 6 - r.weekdays.indexOf(_.toString().split(" ")[0]);
                        for (let r = 1; r <= v + p + g; r++)
                            if (r > v && r <= v + p) {
                                const l = document.createElement("div");
                                l.classList.add("datedreamer__calendar_day");
                                const c = document.createElement("button");
                                if (c.addEventListener("click", (() => this.setSelectedDay(r - v))), c.innerText = (r - v).toString(), c.setAttribute("type", "button"), this.rangeMode) {
                                    this.displayedMonthDate.getMonth() == (null === (t = null === (e = this.connector) || void 0 === e ? void 0 : e.startDate) || void 0 === t ? void 0 : t.getMonth()) && this.displayedMonthDate.getFullYear() == this.connector.startDate.getFullYear() && r - v == this.connector.startDate.getDate() && l.classList.add("active"), this.displayedMonthDate.getMonth() == (null === (a = null === (n = this.connector) || void 0 === n ? void 0 : n.endDate) || void 0 === a ? void 0 : a.getMonth()) && this.displayedMonthDate.getFullYear() == this.connector.endDate.getFullYear() && r - v == this.connector.endDate.getDate() && l.classList.add("active");
                                    const o = new Date(this.displayedMonthDate);
                                    o.setDate(r - v), (null === (i = this.connector) || void 0 === i ? void 0 : i.startDate) && this.connector.endDate && (null === (d = this.connector) || void 0 === d ? void 0 : d.startDate) < o && (null === (s = this.connector) || void 0 === s ? void 0 : s.endDate) > o && l.classList.add("highlight")
                                } else r == v + h && this.displayedMonthDate.getMonth() == this.selectedDate.getMonth() && this.displayedMonthDate.getFullYear() == this.selectedDate.getFullYear() && l.classList.add("active");
                                l.append(c), null === (o = this.daysElement) || void 0 === o || o.append(l)
                            } else if (r <= v) {
                            const e = document.createElement("div");
                            if (e.classList.add("datedreamer__calendar_day", "disabled"), !this.hideOtherMonthDays) {
                                const t = document.createElement("button");
                                t.innerText = new Date(m, u, 0 - (v - r)).getDate().toString(), t.setAttribute("disabled", "true"), t.setAttribute("type", "button"), e.append(t)
                            }
                            null === (l = this.daysElement) || void 0 === l || l.append(e)
                        } else if (r > v + p) {
                            const e = r - (v + g + p) + g,
                                t = document.createElement("div");
                            if (t.classList.add("datedreamer__calendar_day", "disabled"), !this.hideOtherMonthDays) {
                                const n = document.createElement("button");
                                n.innerText = new Date(m, u + 1, e).getDate().toString(), n.setAttribute("disabled", "true"), n.setAttribute("type", "button"), t.append(n)
                            }
                            null === (c = this.daysElement) || void 0 === c || c.append(t)
                        }
                    }
                    rebuildCalendar(e = !0) {
                        this.daysElement && (this.daysElement.innerHTML = ""), this.headerElement && (this.headerElement.innerHTML = ""), this.generateErrors(), this.generateDays(), this.generateHeader(), e && (this.inputsElement && (this.inputsElement.innerHTML = ""), this.generateInputs())
                    }
                    setDate(e) {
                        "string" == typeof e ? this.selectedDate = new Date(e) : "object" == typeof e && (this.selectedDate = e), this.displayedMonthDate = this.selectedDate, this.rebuildCalendar(), this.dateChangedCallback(this.selectedDate)
                    }
                    setDateToToday() {
                        this.selectedDate = new Date, this.displayedMonthDate = new Date, this.rebuildCalendar(), this.dateChangedCallback(this.selectedDate)
                    }
                    dateInputChanged(e) {
                        const t = (0, i.default)(e.target.value, this.format).toDate();
                        isNaN(t.getUTCMilliseconds()) ? (this.errors.push({
                            type: "input-error",
                            message: "The entered date is invalid"
                        }), this.generateErrors()) : (this.selectedDate = t, this.displayedMonthDate = new Date(t), this.rebuildCalendar(!1), this.dateChangedCallback(this.selectedDate))
                    }
                    dateChangedCallback(e) {
                        if (this.onChange) {
                            const t = new CustomEvent("onChange", {
                                detail: (0, i.default)(e).format(this.format)
                            });
                            this.onChange(t)
                        }
                    }
                    onRenderCallback() {
                        if (this.onRender) {
                            const e = new CustomEvent("onRender", {
                                detail: {
                                    calendar: this.calendarElement
                                }
                            });
                            this.onRender(e)
                        }
                    }
                    setDisplayedMonthDate(e) {
                        this.displayedMonthDate = e, this.rebuildCalendar()
                    }
                }
                t.calendar = s, customElements.define("datedreamer-calendar", s)
            },
            406: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.default = class {
                    constructor() {
                        this.calendars = new Array, this.startDate = null, this.endDate = null, this.pickingEndDate = null
                    }
                    rebuildAllCalendars() {
                        this.calendars.forEach((e => {
                            e.rebuildCalendar()
                        }))
                    }
                }
            },
            98: function(e, t, n) {
                "use strict";
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.range = void 0;
                const r = a(n(484)),
                    i = n(109),
                    d = n(255),
                    s = a(n(406));
                class o extends HTMLElement {
                    constructor(e) {
                        super(), this.calendar1DisplayedDate = new Date, this.calendar2DisplayedDate = new Date, this.handleDateChange = e => {
                            var t, n;
                            if (this.onChange) {
                                const e = new CustomEvent("onChange", {
                                    detail: {
                                        startDate: (0, r.default)(null === (t = this.connector) || void 0 === t ? void 0 : t.startDate).format(this.format),
                                        endDate: (0, r.default)(null === (n = this.connector) || void 0 === n ? void 0 : n.endDate).format(this.format)
                                    }
                                });
                                this.onChange(e)
                            }
                        }, this.element = e.element, this.connector = new s.default, this.styles = e.styles, this.format = e.format, this.iconPrev = e.iconPrev, this.iconNext = e.iconNext, this.onChange = e.onChange, this.onRender = e.onRender, this.theme = e.theme, this.darkMode = e.darkMode, this.connector && (this.connector.dateChangedCallback = this.handleDateChange), this.init()
                    }
                    init() {
                        this.addStyles(), this.calendar1DisplayedDate.setDate(1), this.calendar2DisplayedDate.setDate(1), this.calendar2DisplayedDate.setMonth(this.calendar2DisplayedDate.getMonth() + 1);
                        const e = document.createElement("div");
                        e.classList.add("datedreamer-range"), this.darkMode && e.classList.add("dark");
                        const t = document.createElement("div"),
                            n = document.createElement("div");
                        if (e.append(t, n), this.calendar1 = new d.calendar({
                                element: t,
                                theme: this.theme,
                                format: this.format,
                                hideInputs: !0,
                                hideNextNav: !0,
                                styles: i.calendarStyles,
                                iconPrev: this.iconPrev,
                                onPrevNav: e => this.prevHandler(e),
                                rangeMode: !0,
                                hideOtherMonthDays: !0,
                                connector: this.connector,
                                darkMode: this.darkMode
                            }), this.calendar2 = new d.calendar({
                                element: n,
                                theme: this.theme,
                                format: this.format,
                                hideInputs: !0,
                                hidePrevNav: !0,
                                styles: i.calendarStyles,
                                iconNext: this.iconNext,
                                onNextNav: e => this.nextHandler(e),
                                rangeMode: !0,
                                hideOtherMonthDays: !0,
                                connector: this.connector,
                                darkMode: this.darkMode
                            }), this.calendar2.setDisplayedMonthDate(this.calendar2DisplayedDate), this.append(e), "string" == typeof this.element) {
                            const e = document.querySelector(this.element);
                            e && e.append(this)
                        } else "object" == typeof this.element && this.element.append(this)
                    }
                    addStyles() {
                        const e = `\n            .datedreamer-range {\n                display: inline-flex;\n                box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -4px rgb(0 0 0 / 10%);\n            }\n\n            .datedreamer-range.dark {\n                background: #2c3e50;\n            }\n            ${this.styles ? this.styles : ""}\n        `,
                            t = document.createElement("style");
                        t.innerHTML = e, this.append(t)
                    }
                    prevHandler(e) {
                        this.calendar1DisplayedDate = e.detail, this.calendar2DisplayedDate.setMonth(this.calendar2DisplayedDate.getMonth() - 1), this.resetViewedDated()
                    }
                    nextHandler(e) {
                        this.calendar2DisplayedDate = e.detail, this.calendar1DisplayedDate.setMonth(this.calendar1DisplayedDate.getMonth() + 1), this.resetViewedDated()
                    }
                    resetViewedDated() {
                        var e, t;
                        null === (e = this.calendar1) || void 0 === e || e.setDisplayedMonthDate(this.calendar1DisplayedDate), null === (t = this.calendar2) || void 0 === t || t.setDisplayedMonthDate(this.calendar2DisplayedDate)
                    }
                }
                t.range = o, customElements.define("datedreamer-range", o)
            },
            256: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.litePurple = t.unstyledTheme = t.calendarToggleRoot = t.calendarRoot = t.rightChevron = t.leftChevron = t.weekdays = t.monthNames = void 0, t.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], t.weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], t.leftChevron = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>', t.rightChevron = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>', t.calendarRoot = function(e, n = "", a) {
                    return `\n  <style>\n      ${t.unstyledTheme}\n      ${"lite-purple" == e ? t.litePurple : ""}\n      \n      ${n}\n  </style>\n  
                    <div class="datedreamer__calendar_header"></div>\n 
                    <div class="datedreamer__calendar datedreamer__calendar-cust ${a ? "dark" : ""}">\n     \n      <div class="datedreamer__calendar_inputs"></div>\n      <div class="datedreamer__calendar_errors"></div>\n  \n      <div class="datedreamer__calendar_days-wrap">\n          <div class="datedreamer__calendar_days-header">\n    </div>\n  \n          <div class="datedreamer__calendar_days"></div>\n      </div>\n  </div>\n  `
                }, t.calendarToggleRoot = function(e, t = "", n, a) {
                    return `\n    <style>\n        .datedreamer__calendar-toggle {\n            position: relative;\n        }\n        .datedreamer__calendar-toggle__calendar {\n            display: none;\n            position: absolute;\n            top: 100%;\n            left: 0;\n        }\n\n        .datedreamer__calendar-toggle__calendar.active {\n            display: block;\n        }\n\n        ${"lite-purple" == e ? "\n        .datedreamer__calendar-toggle__input input {\n            font-weight: 500;\n            border-radius: 4px;\n            border: 1px solid #e9e8ec;\n            font-size: 12px;\n            background: white;\n            display: block;\n            padding: 4px 4px 4px 8px;\n            margin-right: 8px;\n        }\n        " : ""}\n\n        ${t}\n    </style>\n    <div class="datedreamer__calendar-toggle">\n        <div class="datedreamer__calendar-toggle__input">\n`
                }, t.unstyledTheme = "\n@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');\n\n.datedreamer__calendar {\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n      width: 100%;\n   box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n    background: #fff;\n    z-index: 0;\n    position: relative;\n    box-sizing: border-box;\n}\n\n.datedreamer__calendar.dark {\n  background: #2c3e50;\n}\n\n.datedreamer__calendar_header {\n    width: 100%;\n  margin-bottom:20px;\n   display: flex;\n    align-items: center;\n}\n\n.datedreamer__calendar_prev,.datedreamer__calendar_next {\n    background: #FFFFFF;\n    border: none;\n  padding:5px 10px;\n  width: 30px;\n    height: 30px;\n    text-align: center;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    color:#2d3436;\n}\n\n.dark .datedreamer__calendar_prev, .dark .datedreamer__calendar_next {\n  color: #fff;\n}\n\n.datedreamer__calendar_prev svg, .datedreamer__calendar_next svg {\n    transform: scale(1);\n}\n\n.dark .datedreamer__calendar_prev svg, .dark .datedreamer__calendar_next svg {\n  fill: #fff;\n}\n\n.datedreamer__calendar_title {\n    width: 100%;\n     display: block;\n    flex-grow: 1;\n    text-align: center;\n    color: #2d3436;\n    font-weight: 600;\n    font-size: 0.875rem;\n}\n\n.dark .datedreamer__calendar_title {\n  color: #fff;\n}\n\n.datedreamer__calendar_inputs {\n    margin-top: 12px;\n}\n\n.datedreamer__calendar_inputs label {\n  width: 100%;\n}\n\n.dark .datedreamer__calendar_inputs label {\n  color: #fff;\n}\n\n.datedreamer__calendar__inputs-wrap {\n  display: flex;\n}\n\n.datedreamer__calendar_inputs input {\n  width: 100%;\n}\n\n.datedreamer__calendar_inputs input.error {\n   border: 2px solid #d63031;\n}\n\n.datedreamer__calendar_errors {\n  margin: 8px 0;\n  color: #d63031;\n}\n\n.datedreamer__calendar_days, .datedreamer__calendar_days-header {\n     display: grid;\n    grid-template-columns: repeat(7,1fr);\n    text-align: center;\n}\n\n.datedreamer__calendar_days-header {\n  color: #2d3436;\n  font-size: 1rem;\n}\n\n.dark .datedreamer__calendar_days-header {\n  color: #fff;\n}\n\n.datedreamer__calendar_day {\n    width: 100%;\n    height: 100%;\n    display: block;\n}\n\n.datedreamer__calendar_day button {\n font-family:inherit;\n border:1px solid #f3f3f4;\n padding:10px; \n background:#FFFFFF;\n   display: block;\n    width: 100%;\n    height: 100%;\n    cursor: pointer;\n}\n\n.datedreamer__calendar_day.active button {\n   border:2px solid #4EB562;\n border-radius:6px;\n background: white ;\n    color: black;\n}\n\n.datedreamer__calendar_day.highlight button {\n  background: #236bb9;\n  color: white;\n}\n", t.litePurple = '\n.datedreamer__calendar {\n  border-radius: 8px;\n}\n\n.datedreamer__calendar_prev svg, .datedreamer__calendar_next svg {\n  transform: scale(2);\n}\n\n.datedreamer__calendar_title {\n  font-size: 12px;\n}\n\n.datedreamer__calendar_inputs input, .datedreamer__calendar_inputs button {\n  font-weight: 500;\n  border-radius: 4px;\n  border: 1px solid #e9e8ec;\n  font-size: 12px;\n  background: white;\n}\n\n.datedreamer__calendar_inputs label {\n  font-size: 12px;\n}\n\n.datedreamer__calendar_inputs input {\n  flex-grow: 1;\n  width: calc(100% - 8px);\n  display: block;\n  padding: 4px 4px 4px 8px;\n  margin-right: 8px;\n}\n\n.dark .datedreamer__calendar_inputs input {\n  background: #4b6584;\n  border: #4b6584;\n  color: #fff;\n}\n\n.datedreamer__calendar_inputs button {\n  padding: 6px 12px;\n  display: inline-block;\n  cursor: pointer;\n  color: black;\n}\n\n.dark .datedreamer__calendar_inputs button {\n  background: #4b6584;\n  border: #4b6584;\n  color: #fff;\n}\n\n.datedreamer__calendar_errors {\n  font-size: 12px;\n  font-weight: bold;\n}\n\n.datedreamer__calendar_day-header.datedreamer__calendar_day {\n  font-size: 12px;\n}\n\n.datedreamer__calendar_days {\n  margin-top: 8px;\n}\n\n.datedreamer__calendar_days .datedreamer__calendar_day {\n  margin: 2px;\n}\n\n.datedreamer__calendar_days .datedreamer__calendar_day.disabled button{\n  color: #767676;\n  cursor: default;\n  font-weight: normal;\n}\n\n.datedreamer__calendar_days .datedreamer__calendar_day.active, .datedreamer__calendar_days .datedreamer__calendar_day.highlight {\n  position: relative;\n}\n\n.datedreamer__calendar_day.highlight:before{\n  content: "";\n  width: 100%;\n  height: 100%;\n  background: #BFA9F3;\n  position: absolute;\n  display: block;\n  z-index: -1;\n  top: 50%;\n  right: 0;\n  left: 0;\n  transform: translateY(-50%);\n}\n\n\n.datedreamer__calendar_days .datedreamer__calendar_day.active:before {\n  content: "";\n  width: 100%;\n  height: 100%;\n  background: #7d56da;\n  border-radius: 2px;\n  position: absolute;\n  display: block;\n  z-index: -1;\n  top: 50%;\n  right: 0;\n  left: 0;\n  transform: translateY(-50%);\n}\n\n.datedreamer__calendar_days .datedreamer__calendar_day button {\n  background: transparent;\n  border: none;\n  padding: 5px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 12px;\n  font-weight: bold;\n  color: black;\n}\n\n.datedreamer__calendar_days .datedreamer__calendar_day.active button {\n  color: #fff;\n}\n\n.dark .datedreamer__calendar_days .datedreamer__calendar_day button {\n  color: #ecf0f1;\n}\n'
            },
            109: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.calendarStyles = void 0, t.calendarStyles = "\n    .datedreamer__calendar {\n        box-shadow: none;\n    } \n"
            }
        },
        t = {};

    function n(a) {
        var r = t[a];
        if (void 0 !== r) return r.exports;
        var i = t[a] = {
            exports: {}
        };
        return e[a].call(i.exports, i, i.exports, n), i.exports
    }
    var a = {};
    return (() => {
        "use strict";
        var e = a;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.range = e.calendarToggle = e.calendar = void 0;
        const t = n(933);
        Object.defineProperty(e, "calendarToggle", {
            enumerable: !0,
            get: function() {
                return t.calendarToggle
            }
        });
        const r = n(255);
        Object.defineProperty(e, "calendar", {
            enumerable: !0,
            get: function() {
                return r.calendar
            }
        });
        const i = n(98);
        Object.defineProperty(e, "range", {
            enumerable: !0,
            get: function() {
                return i.range
            }
        })
    })(), a
})()));