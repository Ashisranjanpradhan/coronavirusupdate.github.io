(function(window, document) {
   
    var l;

    function ba(a) {
        var b = 0;
        return function() {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            }
        }
    }
    var ca = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
        if (a == Array.prototype || a == Object.prototype) return a;
        a[b] = c.value;
        return a
    };

    function da(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math) return c
        }
        throw Error("Cannot find global object");
    }
    var ea = da(this);

    function fa(a, b) {
        if (b) a: {
            var c = ea;a = a.split(".");
            for (var d = 0; d < a.length - 1; d++) {
                var e = a[d];
                if (!(e in c)) break a;
                c = c[e]
            }
            a = a[a.length - 1];d = c[a];b = b(d);b != d && null != b && ca(c, a, {
                configurable: !0,
                writable: !0,
                value: b
            })
        }
    }
    fa("Symbol", function(a) {
        function b(f) {
            if (this instanceof b) throw new TypeError("Symbol is not a constructor");
            return new c(d + (f || "") + "_" + e++, f)
        }

        function c(f, g) {
            this.g = f;
            ca(this, "description", {
                configurable: !0,
                writable: !0,
                value: g
            })
        }
        if (a) return a;
        c.prototype.toString = function() {
            return this.g
        };
        var d = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_",
            e = 0;
        return b
    });
    fa("Symbol.iterator", function(a) {
        if (a) return a;
        a = Symbol("Symbol.iterator");
        for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
            var d = ea[b[c]];
            "function" === typeof d && "function" != typeof d.prototype[a] && ca(d.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function() {
                    return ha(ba(this))
                }
            })
        }
        return a
    });

    function ha(a) {
        a = {
            next: a
        };
        a[Symbol.iterator] = function() {
            return this
        };
        return a
    }

    function ia(a) {
        var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        return b ? b.call(a) : {
            next: ba(a)
        }
    }

    function n(a) {
        if (!(a instanceof Array)) {
            a = ia(a);
            for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
            a = c
        }
        return a
    }
    var ja = "function" == typeof Object.create ? Object.create : function(a) {
            function b() {}
            b.prototype = a;
            return new b
        },
        ka;
    if ("function" == typeof Object.setPrototypeOf) ka = Object.setPrototypeOf;
    else {
        var la;
        a: {
            var oa = {
                    a: !0
                },
                pa = {};
            try {
                pa.__proto__ = oa;
                la = pa.a;
                break a
            } catch (a) {}
            la = !1
        }
        ka = la ? function(a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
            return a
        } : null
    }
    var qa = ka;

    function t(a, b) {
        a.prototype = ja(b.prototype);
        a.prototype.constructor = a;
        if (qa) qa(a, b);
        else
            for (var c in b)
                if ("prototype" != c)
                    if (Object.defineProperties) {
                        var d = Object.getOwnPropertyDescriptor(b, c);
                        d && Object.defineProperty(a, c, d)
                    } else a[c] = b[c];
        a.ac = b.prototype
    }

    function ra(a, b) {
        a instanceof String && (a += "");
        var c = 0,
            d = !1,
            e = {
                next: function() {
                    if (!d && c < a.length) {
                        var f = c++;
                        return {
                            value: b(f, a[f]),
                            done: !1
                        }
                    }
                    d = !0;
                    return {
                        done: !0,
                        value: void 0
                    }
                }
            };
        e[Symbol.iterator] = function() {
            return e
        };
        return e
    }
    fa("Array.prototype.entries", function(a) {
        return a ? a : function() {
            return ra(this, function(b, c) {
                return [b, c]
            })
        }
    });
    fa("Object.entries", function(a) {
        return a ? a : function(b) {
            var c = [],
                d;
            for (d in b) Object.prototype.hasOwnProperty.call(b, d) && c.push([d, b[d]]);
            return c
        }
    });
    fa("Math.trunc", function(a) {
        return a ? a : function(b) {
            b = Number(b);
            if (isNaN(b) || Infinity === b || -Infinity === b || 0 === b) return b;
            var c = Math.floor(Math.abs(b));
            return 0 > b ? -c : c
        }
    });
    fa("Object.is", function(a) {
        return a ? a : function(b, c) {
            return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c
        }
    });
    fa("Array.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            var d = this;
            d instanceof String && (d = String(d));
            var e = d.length;
            c = c || 0;
            for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
                var f = d[c];
                if (f === b || Object.is(f, b)) return !0
            }
            return !1
        }
    });
    fa("String.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            if (null == this) throw new TypeError("The 'this' value for String.prototype.includes must not be null or undefined");
            if (b instanceof RegExp) throw new TypeError("First argument to String.prototype.includes must not be a regular expression");
            return -1 !== this.indexOf(b, c || 0)
        }
    });
    var u = this || self;

    function sa() {}

    function ta(a) {
        var b = typeof a;
        b = "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null";
        return "array" == b || "object" == b && "number" == typeof a.length
    }

    function ua(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }

    function va(a) {
        return a
    };
    var wa;

    function xa(a) {
        var b = !1,
            c;
        return function() {
            b || (c = a(), b = !0);
            return c
        }
    };

    function ya(a, b) {
        if ("string" === typeof a) return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
        for (var c = 0; c < a.length; c++)
            if (c in a && a[c] === b) return c;
        return -1
    }

    function v(a, b, c) {
        for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
    }

    function za(a, b) {
        for (var c = a.length, d = [], e = 0, f = "string" === typeof a ? a.split("") : a, g = 0; g < c; g++)
            if (g in f) {
                var h = f[g];
                b.call(void 0, h, g, a) && (d[e++] = h)
            }
        return d
    }

    function Aa(a, b, c) {
        for (var d = a.length, e = Array(d), f = "string" === typeof a ? a.split("") : a, g = 0; g < d; g++) g in f && (e[g] = b.call(c, f[g], g, a));
        return e
    }

    function Ba(a, b) {
        var c = "";
        v(a, function(d, e) {
            c = b.call(void 0, c, d, e, a)
        });
        return c
    }

    function Ca(a, b) {
        for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++)
            if (e in d && b.call(void 0, d[e], e, a)) return !0;
        return !1
    }

    function Da(a) {
        for (var b = ["x", "y", "width", "height"], c = b.length, d = "string" === typeof b ? b.split("") : b, e = 0; e < c; e++)
            if (e in d && !a.call(void 0, d[e], e, b)) return !1;
        return !0
    }

    function Ea(a, b) {
        a: {
            for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++)
                if (e in d && b.call(void 0, d[e], e, a)) {
                    b = e;
                    break a
                }
            b = -1
        }
        return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b]
    }

    function Fa(a, b) {
        return 0 <= ya(a, b)
    }

    function Ga(a) {
        return Array.prototype.concat.apply([], arguments)
    }

    function Ia(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
            return c
        }
        return []
    }

    function Ja(a, b, c) {
        return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c)
    }

    function Ka(a, b) {
        a.sort(b || La)
    }

    function La(a, b) {
        return a > b ? 1 : a < b ? -1 : 0
    }

    function Ma(a) {
        for (var b = [], c = 0; c < arguments.length; c++) {
            var d = arguments[c];
            if (Array.isArray(d))
                for (var e = 0; e < d.length; e += 8192)
                    for (var f = Ma.apply(null, Ja(d, e, e + 8192)), g = 0; g < f.length; g++) b.push(f[g]);
            else b.push(d)
        }
        return b
    }

    function Na(a, b, c) {
        return Ga.apply([], Aa(a, b, c))
    };

    function Oa(a, b, c) {
        for (var d in a) b.call(c, a[d], d, a)
    }

    function Pa(a, b) {
        var c = {},
            d;
        for (d in a) b.call(void 0, a[d], d, a) && (c[d] = a[d]);
        return c
    }

    function Qa(a) {
        var b = Ra,
            c;
        for (c in b)
            if (!a.call(void 0, b[c], c, b)) return !1;
        return !0
    }

    function Sa(a) {
        var b = [],
            c = 0,
            d;
        for (d in a) b[c++] = a[d];
        return b
    }

    function Ta(a) {
        var b = {},
            c;
        for (c in a) b[c] = a[c];
        return b
    }
    var Ua = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

    function w(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d) a[c] = d[c];
            for (var f = 0; f < Ua.length; f++) c = Ua[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    };
    var Va;

    function Wa(a, b) {
        this.h = a === Xa && b || "";
        this.g = Ya
    }
    var Ya = {},
        Xa = {};

    function Za(a) {
        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
    }

    function x(a, b) {
        return -1 != a.toLowerCase().indexOf(b.toLowerCase())
    }

    function $a(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    };
    var z;
    a: {
        var ab = u.navigator;
        if (ab) {
            var bb = ab.userAgent;
            if (bb) {
                z = bb;
                break a
            }
        }
        z = ""
    }

    function A(a) {
        return -1 != z.indexOf(a)
    };

    function cb() {
        return A("Safari") && !(db() || A("Coast") || A("Opera") || A("Edge") || A("Edg/") || A("OPR") || A("Firefox") || A("FxiOS") || A("Silk") || A("Android"))
    }

    function db() {
        return (A("Chrome") || A("CriOS")) && !A("Edge")
    };

    function eb() {
        return "opacity".replace(/\-([a-z])/g, function(a, b) {
            return b.toUpperCase()
        })
    }

    function fb(a) {
        return String(a).replace(/([A-Z])/g, "-$1").toLowerCase()
    }

    function gb(a) {
        return a.replace(/(^|[\s]+)([a-z])/g, function(b, c, d) {
            return c + d.toUpperCase()
        })
    };
    var hb = "function" === typeof Uint8Array.prototype.slice,
        ib = 0,
        jb = 0;

    function kb() {
        this.g = new Uint8Array(64);
        this.h = 0
    }
    kb.prototype.push = function(a) {
        if (!(this.h + 1 < this.g.length)) {
            var b = this.g;
            this.g = new Uint8Array(Math.ceil(1 + 2 * this.g.length));
            this.g.set(b)
        }
        this.g[this.h++] = a
    };
    kb.prototype.length = function() {
        return this.h
    };
    kb.prototype.end = function() {
        var a = this.g,
            b = this.h;
        this.h = 0;
        return hb ? a.slice(0, b) : new Uint8Array(a.subarray(0, b))
    };

    function lb(a, b) {
        for (; 127 < b;) a.push(b & 127 | 128), b >>>= 7;
        a.push(b)
    }

    function mb(a, b) {
        a.push(b >>> 0 & 255);
        a.push(b >>> 8 & 255);
        a.push(b >>> 16 & 255);
        a.push(b >>> 24 & 255)
    };

    function nb(a) {
        nb[" "](a);
        return a
    }
    nb[" "] = sa;

    function ob(a, b) {
        try {
            return nb(a[b]), !0
        } catch (c) {}
        return !1
    }

    function pb(a, b) {
        var c = qb;
        return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : c[a] = b(a)
    };
    var rb = A("Opera"),
        sb = A("Trident") || A("MSIE"),
        tb = A("Edge"),
        ub = A("Gecko") && !(x(z, "WebKit") && !A("Edge")) && !(A("Trident") || A("MSIE")) && !A("Edge"),
        vb = x(z, "WebKit") && !A("Edge"),
        wb = vb && A("Mobile");

    function xb() {
        var a = u.document;
        return a ? a.documentMode : void 0
    }
    var yb;
    a: {
        var zb = "",
            Ab = function() {
                var a = z;
                if (ub) return /rv:([^\);]+)(\)|;)/.exec(a);
                if (tb) return /Edge\/([\d\.]+)/.exec(a);
                if (sb) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
                if (vb) return /WebKit\/(\S+)/.exec(a);
                if (rb) return /(?:Version)[ \/]?(\S+)/.exec(a)
            }();Ab && (zb = Ab ? Ab[1] : "");
        if (sb) {
            var Bb = xb();
            if (null != Bb && Bb > parseFloat(zb)) {
                yb = String(Bb);
                break a
            }
        }
        yb = zb
    }
    var Db = yb,
        qb = {};

    function Eb(a) {
        return pb(a, function() {
            for (var b = 0, c = Za(String(Db)).split("."), d = Za(String(a)).split("."), e = Math.max(c.length, d.length), f = 0; 0 == b && f < e; f++) {
                var g = c[f] || "",
                    h = d[f] || "";
                do {
                    g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
                    h = /(\d*)(\D*)(.*)/.exec(h) || ["", "", "", ""];
                    if (0 == g[0].length && 0 == h[0].length) break;
                    b = $a(0 == g[1].length ? 0 : parseInt(g[1], 10), 0 == h[1].length ? 0 : parseInt(h[1], 10)) || $a(0 == g[2].length, 0 == h[2].length) || $a(g[2], h[2]);
                    g = g[3];
                    h = h[3]
                } while (0 == b)
            }
            return 0 <= b
        })
    }
    var Fb;
    if (u.document && sb) {
        var Gb = xb();
        Fb = Gb ? Gb : parseInt(Db, 10) || void 0
    } else Fb = void 0;
    var Hb = Fb;
    var Ib = {},
        Jb = null;

    function Kb(a) {
        var b;
        void 0 === b && (b = 0);
        if (!Jb) {
            Jb = {};
            for (var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), d = ["+/=", "+/", "-_=", "-_.", "-_"], e = 0; 5 > e; e++) {
                var f = c.concat(d[e].split(""));
                Ib[e] = f;
                for (var g = 0; g < f.length; g++) {
                    var h = f[g];
                    void 0 === Jb[h] && (Jb[h] = g)
                }
            }
        }
        b = Ib[b];
        c = Array(Math.floor(a.length / 3));
        d = b[64] || "";
        for (e = f = 0; f < a.length - 2; f += 3) {
            var k = a[f],
                m = a[f + 1];
            h = a[f + 2];
            g = b[k >> 2];
            k = b[(k & 3) << 4 | m >> 4];
            m = b[(m & 15) << 2 | h >> 6];
            h = b[h & 63];
            c[e++] = g + k + m + h
        }
        g = 0;
        h = d;
        switch (a.length - f) {
            case 2:
                g = a[f + 1], h = b[(g & 15) << 2] || d;
            case 1:
                a = a[f], c[e] = b[a >> 2] + b[(a & 3) << 4 | g >> 4] + h + d
        }
        return c.join("")
    };

    function Lb() {
        this.h = [];
        this.g = new kb
    }

    function Mb(a, b, c) {
        if (null != c) {
            lb(a.g, 8 * b);
            a = a.g;
            var d = c;
            c = 0 > d;
            d = Math.abs(d);
            b = d >>> 0;
            d = Math.floor((d - b) / 4294967296);
            d >>>= 0;
            c && (d = ~d >>> 0, b = (~b >>> 0) + 1, 4294967295 < b && (b = 0, d++, 4294967295 < d && (d = 0)));
            ib = b;
            jb = d;
            c = ib;
            for (b = jb; 0 < b || 127 < c;) a.push(c & 127 | 128), c = (c >>> 7 | b << 25) >>> 0, b >>>= 7;
            a.push(c)
        }
    };
    var Nb = "function" === typeof Uint8Array;

    function Ob(a, b, c) {
        return "object" === typeof a ? Nb && !Array.isArray(a) && a instanceof Uint8Array ? c(a) : Pb(a, b, c) : b(a)
    }

    function Pb(a, b, c) {
        if (Array.isArray(a)) {
            for (var d = Array(a.length), e = 0; e < a.length; e++) {
                var f = a[e];
                null != f && (d[e] = Ob(f, b, c))
            }
            Array.isArray(a) && a.wb && Qb(d);
            return d
        }
        d = {};
        for (e in a) Object.prototype.hasOwnProperty.call(a, e) && (f = a[e], null != f && (d[e] = Ob(f, b, c)));
        return d
    }

    function Rb(a) {
        return Pb(a, function(b) {
            return "number" === typeof b ? isFinite(b) ? b : String(b) : b
        }, function(b) {
            return Kb(b)
        })
    }
    var Sb = {
        wb: {
            value: !0,
            configurable: !0
        }
    };

    function Qb(a) {
        Array.isArray(a) && !Object.isFrozen(a) && Object.defineProperties(a, Sb);
        return a
    };

    function Tb(a, b, c, d) {
        Ub && (a || (a = Ub), Ub = null);
        var e = this.constructor.Zb;
        a || (a = e ? [e] : []);
        this.i = e ? 0 : -1;
        this.g = a;
        a: {
            e = this.g.length;a = -1;
            if (e && (a = e - 1, e = this.g[a], !(null === e || "object" != typeof e || Array.isArray(e) || Nb && e instanceof Uint8Array))) {
                this.j = a - this.i;
                this.h = e;
                break a
            }
            void 0 !== b && -1 < b ? (this.j = Math.max(b, a + 1 - this.i), this.h = null) : this.j = Number.MAX_VALUE
        }
        if (c)
            for (b = 0; b < c.length; b++) a = c[b], a < this.j ? (a += this.i, (e = this.g[a]) ? Qb(e) : this.g[a] = Vb) : (Wb(this), (e = this.h[a]) ? Qb(e) : this.h[a] = Vb);
        if (d && d.length)
            for (c = 0; c < d.length; c++) {
                a = b = void 0;
                e = d[c];
                for (var f = 0; f < e.length; f++) {
                    var g = e[f],
                        h = Xb(this, g);
                    null != h && (a = g, b = h, Yb(this, g, void 0))
                }
                a && Yb(this, a, b)
            }
    }
    var Ub, Vb = Object.freeze(Qb([]));

    function Wb(a) {
        var b = a.j + a.i;
        a.g[b] || (a.h = a.g[b] = {})
    }

    function Xb(a, b) {
        if (b < a.j) {
            b += a.i;
            var c = a.g[b];
            return c !== Vb ? c : a.g[b] = Qb([])
        }
        if (a.h) return c = a.h[b], c !== Vb ? c : a.h[b] = Qb([])
    }

    function Yb(a, b, c) {
        b < a.j ? a.g[b + a.i] = c : (Wb(a), a.h[b] = c)
    }

    function Zb(a, b, c) {
        0 !== c ? Yb(a, b, c) : b < a.j ? a.g[b + a.i] = null : (Wb(a), delete a.h[b]);
        return a
    }
    Tb.prototype.toJSON = function() {
        return Rb(this.g && this.g)
    };
    Tb.prototype.toString = function() {
        return this.g.toString()
    };

    function $b(a, b) {
        a = Xb(a, b);
        return null == a ? 0 : a
    };
    var ac;
    ac = ["av.default", "js", "unreleased"].slice(-1)[0];

    function bc(a) {
        this.key = a
    }

    function cc(a, b) {
        this.key = a;
        this.defaultValue = void 0 === b ? !1 : b
    }
    t(cc, bc);
    var dc = new cc("100006");
    var B = document,
        C = window;

    function ec(a, b, c) {
        c = void 0 === c ? {} : c;
        this.error = a;
        this.context = b.context;
        this.msg = b.message || "";
        this.id = b.id || "jserror";
        this.meta = c
    };
    var fc = xa(function() {
        var a = !1;
        try {
            var b = Object.defineProperty({}, "passive", {
                get: function() {
                    a = !0
                }
            });
            u.addEventListener("test", null, b)
        } catch (c) {}
        return a
    });

    function gc(a) {
        return a ? a.passive && fc() ? a : a.capture || !1 : !1
    }

    function hc(a, b, c, d) {
        return a.addEventListener ? (a.addEventListener(b, c, gc(d)), !0) : !1
    }

    function ic(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, gc(void 0))
    };
    var jc = sb || rb || vb;

    function D(a, b) {
        this.x = void 0 !== a ? a : 0;
        this.y = void 0 !== b ? b : 0
    }
    D.prototype.ceil = function() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    };
    D.prototype.floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    };
    D.prototype.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    };

    function E(a, b) {
        this.width = a;
        this.height = b
    }
    E.prototype.aspectRatio = function() {
        return this.width / this.height
    };
    E.prototype.ceil = function() {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    E.prototype.floor = function() {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    E.prototype.round = function() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };

    function kc(a) {
        return a ? new lc(F(a)) : wa || (wa = new lc)
    }

    function mc(a, b) {
        var c = b || document;
        return c.querySelectorAll && c.querySelector ? c.querySelectorAll("." + a) : nc(a, b)
    }

    function nc(a, b) {
        var c;
        var d = document;
        b = b || d;
        if (b.querySelectorAll && b.querySelector && a) return b.querySelectorAll(a ? "." + a : "");
        if (a && b.getElementsByClassName) {
            var e = b.getElementsByClassName(a);
            return e
        }
        e = b.getElementsByTagName("*");
        if (a) {
            var f = {};
            for (d = c = 0; b = e[d]; d++) {
                var g = b.className;
                "function" == typeof g.split && Fa(g.split(/\s+/), a) && (f[c++] = b)
            }
            f.length = c;
            return f
        }
        return e
    }

    function oc(a) {
        var b = a.scrollingElement ? a.scrollingElement : vb || "CSS1Compat" != a.compatMode ? a.body || a.documentElement : a.documentElement;
        a = a.parentWindow || a.defaultView;
        return sb && Eb("10") && a.pageYOffset != b.scrollTop ? new D(b.scrollLeft, b.scrollTop) : new D(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop)
    }

    function pc(a) {
        return a ? a.parentWindow || a.defaultView : window
    }

    function qc(a, b, c) {
        function d(h) {
            h && b.appendChild("string" === typeof h ? a.createTextNode(h) : h)
        }
        for (var e = 1; e < c.length; e++) {
            var f = c[e];
            if (!ta(f) || ua(f) && 0 < f.nodeType) d(f);
            else {
                a: {
                    if (f && "number" == typeof f.length) {
                        if (ua(f)) {
                            var g = "function" == typeof f.item || "string" == typeof f.item;
                            break a
                        }
                        if ("function" === typeof f) {
                            g = "function" == typeof f.item;
                            break a
                        }
                    }
                    g = !1
                }
                v(g ? Ia(f) : f, d)
            }
        }
    }

    function F(a) {
        return 9 == a.nodeType ? a : a.ownerDocument || a.document
    }

    function rc(a, b) {
        a && (a = a.parentNode);
        for (var c = 0; a;) {
            if (b(a)) return a;
            a = a.parentNode;
            c++
        }
        return null
    }

    function lc(a) {
        this.g = a || u.document || document
    }
    lc.prototype.getElementsByTagName = function(a, b) {
        return (b || this.g).getElementsByTagName(String(a))
    };
    lc.prototype.appendChild = function(a, b) {
        a.appendChild(b)
    };
    lc.prototype.append = function(a, b) {
        qc(F(a), a, arguments)
    };
    lc.prototype.canHaveChildren = function(a) {
        if (1 != a.nodeType) return !1;
        switch (a.tagName) {
            case "APPLET":
            case "AREA":
            case "BASE":
            case "BR":
            case "COL":
            case "COMMAND":
            case "EMBED":
            case "FRAME":
            case "HR":
            case "IMG":
            case "INPUT":
            case "IFRAME":
            case "ISINDEX":
            case "KEYGEN":
            case "LINK":
            case "NOFRAMES":
            case "NOSCRIPT":
            case "META":
            case "OBJECT":
            case "PARAM":
            case "SCRIPT":
            case "SOURCE":
            case "STYLE":
            case "TRACK":
            case "WBR":
                return !1
        }
        return !0
    };

    function sc() {
        return A("iPad") || A("Android") && !A("Mobile") || A("Silk")
    };
    var tc = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;

    function uc(a, b) {
        if (a) {
            a = a.split("&");
            for (var c = 0; c < a.length; c++) {
                var d = a[c].indexOf("="),
                    e = null;
                if (0 <= d) {
                    var f = a[c].substring(0, d);
                    e = a[c].substring(d + 1)
                } else f = a[c];
                b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "")
            }
        }
    };

    function vc(a) {
        try {
            return !!a && null != a.location.href && ob(a, "foo")
        } catch (b) {
            return !1
        }
    }

    function wc(a, b) {
        if (a)
            for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b.call(void 0, a[c], c, a)
    }

    function xc() {
        var a = yc;
        if (!a) return "";
        var b = /.*[&#?]google_debug(=[^&]*)?(&.*)?$/;
        try {
            var c = b.exec(decodeURIComponent(a));
            if (c) return c[1] && 1 < c[1].length ? c[1].substring(1) : "true"
        } catch (d) {}
        return ""
    };

    function G(a, b, c, d) {
        this.top = a;
        this.h = b;
        this.g = c;
        this.left = d
    }

    function zc(a) {
        return a.h - a.left
    }

    function Ac(a) {
        return a.g - a.top
    }

    function Bc(a) {
        return new G(a.top, a.h, a.g, a.left)
    }
    G.prototype.ceil = function() {
        this.top = Math.ceil(this.top);
        this.h = Math.ceil(this.h);
        this.g = Math.ceil(this.g);
        this.left = Math.ceil(this.left);
        return this
    };
    G.prototype.floor = function() {
        this.top = Math.floor(this.top);
        this.h = Math.floor(this.h);
        this.g = Math.floor(this.g);
        this.left = Math.floor(this.left);
        return this
    };
    G.prototype.round = function() {
        this.top = Math.round(this.top);
        this.h = Math.round(this.h);
        this.g = Math.round(this.g);
        this.left = Math.round(this.left);
        return this
    };

    function Cc(a, b, c) {
        b instanceof D ? (a.left += b.x, a.h += b.x, a.top += b.y, a.g += b.y) : (a.left += b, a.h += b, "number" === typeof c && (a.top += c, a.g += c));
        return a
    };

    function Dc(a, b, c) {
        a.google_image_requests || (a.google_image_requests = []);
        var d = a.document.createElement("img");
        c && (d.referrerPolicy = "no-referrer");
        d.src = b;
        a.google_image_requests.push(d)
    }

    function Ec(a) {
        if (Gc()) Dc(window, a, !0);
        else {
            var b = u.document;
            if (b.body) {
                var c = b.getElementById("goog-srcless-iframe");
                c || (c = b.createElement("IFRAME"), c.style.display = "none", c.id = "goog-srcless-iframe", b.body.appendChild(c));
                b = c
            } else b = null;
            b && b.contentWindow && Dc(b.contentWindow, a, !0)
        }
    }
    var Gc = xa(function() {
        return "referrerPolicy" in u.document.createElement("img")
    });
    var Hc = {};

    function Ic(a) {
        try {
            return a.getBoundingClientRect()
        } catch (b) {
            return {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }
        }
    };
    var Jc = !!window.google_async_iframe_id,
        Kc = Jc && window.parent || window;

    function Lc() {
        if (Jc && !vc(Kc)) {
            var a = "." + B.domain;
            try {
                for (; 2 < a.split(".").length && !vc(Kc);) B.domain = a = a.substr(a.indexOf(".") + 1), Kc = window.parent
            } catch (b) {}
            vc(Kc) || (Kc = window)
        }
        return Kc
    };

    function Mc(a, b, c) {
        try {
            a && (b = b.top);
            var d = void 0;
            var e = b;
            c = void 0 === c ? !1 : c;
            a && null !== e && e != e.top && (e = e.top);
            try {
                if (void 0 === c ? 0 : c) var f = (new E(e.innerWidth, e.innerHeight)).round();
                else {
                    var g = (e || window).document,
                        h = "CSS1Compat" == g.compatMode ? g.documentElement : g.body;
                    f = (new E(h.clientWidth, h.clientHeight)).round()
                }
                d = f
            } catch (q) {
                d = new E(-12245933, -12245933)
            }
            a = d;
            var k = oc(kc(b.document).g);
            if (-12245933 == a.width) {
                var m = a.width;
                var p = new G(m, m, m, m)
            } else p = new G(k.y, k.x + a.width, k.y + a.height, k.x);
            return p
        } catch (q) {
            return new G(-12245933, -12245933, -12245933, -12245933)
        }
    };

    function Nc(a) {
        if (!a) throw Error("functionToExecute must not be truthy.");
    };

    function Oc() {
        return /\d+\.\d+\.\d+(-.*)?/.test("1.3.3-google_20200427")
    }

    function Pc() {
        for (var a = ["1", "3", "3"], b = ["1", "0", "3"], c = 0; 3 > c; c++) {
            var d = parseInt(a[c], 10),
                e = parseInt(b[c], 10);
            if (d > e) break;
            else if (d < e) return !1
        }
        return !0
    };

    function Qc(a, b, c, d) {
        this.h = a;
        this.method = b;
        this.version = c;
        this.g = d
    }

    function Rc(a) {
        return !!a && void 0 !== a.omid_message_guid && void 0 !== a.omid_message_method && void 0 !== a.omid_message_version && "string" === typeof a.omid_message_guid && "string" === typeof a.omid_message_method && "string" === typeof a.omid_message_version && (void 0 === a.omid_message_args || void 0 !== a.omid_message_args)
    }

    function Sc(a) {
        return new Qc(a.omid_message_guid, a.omid_message_method, a.omid_message_version, a.omid_message_args)
    }

    function Tc(a) {
        var b = {};
        b = (b.omid_message_guid = a.h, b.omid_message_method = a.method, b.omid_message_version = a.version, b);
        void 0 !== a.g && (b.omid_message_args = a.g);
        return b
    };

    function Uc(a) {
        this.h = a
    };

    function Vc(a, b) {
        return a && (a[b] || (a[b] = {}))
    };

    function Wc() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
            var b = 16 * Math.random() | 0;
            return "y" === a ? (b & 3 | 8).toString(16) : b.toString(16)
        })
    };

    function Xc(a) {
        for (var b = [], c = 0; c < arguments.length; ++c) b[c] = arguments[c];
        Yc(function() {
            throw new(Function.prototype.bind.apply(Error, [null, "Could not complete the test successfully - "].concat(n(b))));
        }, function() {
            return console.error.apply(console, n(b))
        })
    }

    function Yc(a, b) {
        "undefined" !== typeof jasmine && jasmine ? a() : "undefined" !== typeof console && console && console.error && b()
    };
    var Zc = eval("this"),
        $c = function() {
            if ("undefined" !== typeof omidGlobal && omidGlobal) return omidGlobal;
            if ("undefined" !== typeof global && global) return global;
            if ("undefined" !== typeof window && window) return window;
            if ("undefined" !== typeof Zc && Zc) return Zc;
            throw Error("Could not determine global object context.");
        }();

    function ad(a) {
        try {
            return a.frames ? !!a.frames.omid_v1_present : !1
        } catch (b) {
            return !1
        }
    };

    function bd(a) {
        this.h = a;
        this.handleExportedMessage = bd.prototype.i.bind(this)
    }
    t(bd, Uc);
    bd.prototype.sendMessage = function(a, b) {
        b = void 0 === b ? this.h : b;
        if (!b) throw Error("Message destination must be defined at construction time or when sending the message.");
        b.handleExportedMessage(Tc(a), this)
    };
    bd.prototype.i = function(a, b) {
        Rc(a) && this.g && this.g(Sc(a), b)
    };

    function cd(a) {
        return null != a && "undefined" !== typeof a.top && null != a.top
    }

    function dd(a) {
        if (a === $c) return !1;
        try {
            if ("undefined" === typeof a.location.hostname) return !0
        } catch (b) {
            return !0
        }
        return !1
    };

    function ed(a, b) {
        this.h = b = void 0 === b ? $c : b;
        var c = this;
        a.addEventListener("message", function(d) {
            if ("object" === typeof d.data) {
                var e = d.data;
                Rc(e) && d.source && c.g && c.g(Sc(e), d.source)
            }
        })
    }
    t(ed, Uc);
    ed.prototype.sendMessage = function(a, b) {
        b = void 0 === b ? this.h : b;
        if (!b) throw Error("Message destination must be defined at construction time or when sending the message.");
        b.postMessage(Tc(a), "*")
    };
    var fd = ["omid", "v1_VerificationServiceCommunication"],
        gd = ["omidVerificationProperties", "serviceWindow"];

    function hd(a, b) {
        return b.reduce(function(c, d) {
            return c && c[d]
        }, a)
    };

    function H(a) {
        if (!a) {
            var b;
            "undefined" === typeof b && "undefined" !== typeof window && window && (b = window);
            b = cd(b) ? b : $c;
            var c = void 0 === c ? ad : c;
            a = [];
            var d = hd(b, gd);
            d && a.push(d);
            a.push(cd(b) ? b.top : $c);
            a: {
                a = ia(a);
                for (var e = a.next(); !e.done; e = a.next()) {
                    b: {
                        d = b;e = e.value;
                        var f = c;
                        if (!dd(e)) try {
                            var g = hd(e, fd);
                            if (g) {
                                var h = new bd(g);
                                break b
                            }
                        } catch (k) {}
                        h = f(e) ? new ed(d, e) : null
                    }
                    if (d = h) {
                        a = d;
                        break a
                    }
                }
                a = null
            }
        }
        if (this.g = a) this.g.g = this.m.bind(this);
        else if (c = (c = $c.omid3p) && "function" === typeof c.registerSessionObserver && "function" === typeof c.addEventListener ? c : null) this.h = c;
        this.i = {};
        this.j = (c = $c.omidVerificationProperties) ? c.injectionId : void 0
    }

    function id(a, b) {
        Nc(b);
        a.h ? a.h.registerSessionObserver(b, "doubleclickbygoogle.com", a.j) : a.l("addSessionListener", b, "doubleclickbygoogle.com", a.j)
    }
    H.prototype.addEventListener = function(a, b) {
        if (!a) throw Error("Value for eventType is undefined, null or blank.");
        if ("string" !== typeof a && !(a instanceof String)) throw Error("Value for eventType is not a string.");
        if ("" === a.trim()) throw Error("Value for eventType is empty string.");
        Nc(b);
        this.h ? this.h.addEventListener(a, b) : this.l("addEventListener", b, a)
    };
    H.prototype.m = function(a) {
        var b = a.method,
            c = a.h;
        a = a.g;
        if ("response" === b && this.i[c]) {
            var d = Oc() && Pc() ? a ? a : [] : a && "string" === typeof a ? JSON.parse(a) : [];
            this.i[c].apply(this, d)
        }
        "error" === b && window.console && Xc(a)
    };
    H.prototype.l = function(a, b, c) {
        for (var d = [], e = 2; e < arguments.length; ++e) d[e - 2] = arguments[e];
        this.g && (e = Wc(), b && (this.i[e] = b), d = Oc() && Pc() ? d : JSON.stringify(d), this.g.sendMessage(new Qc(e, "VerificationService." + a, "1.3.3-google_20200427", d)))
    };
    var jd = void 0;
    if (jd = void 0 === jd ? "undefined" === typeof omidExports ? null : omidExports : jd) {
        var kd = ["OmidVerificationClient"];
        kd.slice(0, kd.length - 1).reduce(Vc, jd)[kd[kd.length - 1]] = H
    };
    H.ca = void 0;
    H.g = function() {
        return H.ca ? H.ca : H.ca = new H
    };
    var ld = {
            NONE: 0,
            Jb: 1
        },
        md = {
            Ib: 0,
            Wb: 1,
            Vb: 2,
            Xb: 3
        };

    function nd() {
        this.G = 0;
        this.i = !1;
        this.h = -1;
        this.g = !1;
        this.j = 0
    }
    nd.prototype.isVisible = function() {
        return this.g ? .3 <= this.G : .5 <= this.G
    };
    var I = {
            Hb: 0,
            Kb: 1
        },
        od = {
            668123728: 0,
            668123729: 1
        },
        pd = {
            44731964: 0,
            44731965: 1
        },
        qd = {
            NONE: 0,
            Qb: 1,
            Lb: 2
        },
        rd = {
            480596784: 0,
            480596785: 1,
            21063355: 2
        };

    function sd() {
        this.g = null;
        this.j = !1;
        this.h = null
    }

    function J(a) {
        a.j = !0;
        return a
    }

    function td(a, b) {
        a.h && v(b, function(c) {
            c = a.h[c];
            void 0 !== c && a.i(c)
        })
    }

    function ud(a) {
        sd.call(this);
        this.l = a
    }
    t(ud, sd);
    ud.prototype.i = function(a) {
        var b;
        if (!(b = null !== this.g)) {
            a: {
                b = this.l;
                for (c in b)
                    if (b[c] == a) {
                        var c = !0;
                        break a
                    }
                c = !1
            }
            b = !c
        }
        b || (this.g = a)
    };

    function vd() {
        sd.call(this)
    }
    t(vd, sd);
    vd.prototype.i = function(a) {
        null === this.g && "number" === typeof a && (this.g = a)
    };

    function wd() {
        this.g = {};
        this.h = {}
    }

    function L(a, b, c) {
        a.g[b] || (a.g[b] = new ud(c));
        return a.g[b]
    }

    function M(a, b) {
        var c = a.h;
        if (null !== c && b in c) return a.h[b];
        if (a = a.g[b]) return a.g
    }

    function xd(a) {
        var b = {},
            c = Pa(a.g, function(d) {
                return d.j
            });
        Oa(c, function(d, e) {
            d = void 0 !== a.h[e] ? String(a.h[e]) : d.j && null !== d.g ? String(d.g) : "";
            0 < d.length && (b[e] = d)
        }, a);
        return b
    }

    function yd(a, b) {
        b = b.split("&");
        for (var c = b.length - 1; 0 <= c; c--) {
            var d = b[c].split("="),
                e = d[0];
            d = 1 < d.length ? parseInt(d[1], 10) : 1;
            isNaN(d) || (e = a.g[e]) && e.i(d)
        }
        return b.join("&")
    }

    function zd(a, b) {
        v(Sa(a.g), function(c) {
            return td(c, b)
        })
    }

    function Ad(a, b) {
        b && "string" === typeof b && (b = b.match(/[&;?]eid=([^&;]+)/)) && 2 === b.length && (b = decodeURIComponent(b[1]).split(","), b = Aa(b, function(c) {
            return Number(c)
        }), zd(a, b))
    };
    var Bd = !sb && !cb();

    function N(a, b) {
        if (/-[a-z]/.test(b)) return null;
        if (Bd && a.dataset) {
            if (!(!A("Android") || db() || A("Firefox") || A("FxiOS") || A("Opera") || A("Silk") || b in a.dataset)) return null;
            a = a.dataset[b];
            return void 0 === a ? null : a
        }
        return a.getAttribute("data-" + fb(b))
    }

    function Cd(a, b) {
        return /-[a-z]/.test(b) ? !1 : Bd && a.dataset ? b in a.dataset : a.hasAttribute ? a.hasAttribute("data-" + fb(b)) : !!a.getAttribute("data-" + fb(b))
    };

    function Dd() {
        this.g = this.B = null;
        this.h = "no"
    }

    function Ed(a) {
        if (!a) return !1;
        try {
            var b = a.getBoundingClientRect();
            return b && 30 <= b.height && 30 <= b.width
        } catch (c) {
            return !1
        }
    }

    function Fd(a) {
        return za(a, function(b) {
            return Ed(b)
        })
    }

    function Gd(a, b) {
        b = void 0 === b ? !0 : b;
        return za(a, function(c) {
            return "SCRIPT" != c.nodeName && (!b || "FONT" != c.nodeName)
        })
    }

    function Hd(a, b) {
        b = void 0 === b ? !0 : b;
        if (!a) return null;
        if (!a.children) return a;
        for (var c = Gd(Ia(a.children), b); c.length;) {
            var d = Fd(c);
            if (1 == d.length) return d[0];
            if (1 < d.length) break;
            c = Na(c, function(e) {
                return e.children ? Gd(Ia(e.children)) : []
            }, b)
        }
        return a
    }

    function Id() {
        var a = C.document.body;
        return Ma(Aa(["GoogleActiveViewInnerContainer"], function(b) {
            return Ia(mc(b, a))
        }))
    };

    function O() {}
    O.prototype.g = function() {
        return 0
    };
    O.prototype.i = function() {
        return 0
    };
    O.prototype.j = function() {
        return 0
    };
    O.prototype.h = function() {
        return 0
    };

    function Jd() {
        if (!Kd()) throw Error();
    }
    t(Jd, O);

    function Kd() {
        return !(!C || !C.performance)
    }
    Jd.prototype.g = function() {
        return Kd() && C.performance.now ? C.performance.now() : O.prototype.g.call(this)
    };
    Jd.prototype.i = function() {
        return Kd() && C.performance.memory ? C.performance.memory.totalJSHeapSize || 0 : O.prototype.i.call(this)
    };
    Jd.prototype.j = function() {
        return Kd() && C.performance.memory ? C.performance.memory.usedJSHeapSize || 0 : O.prototype.j.call(this)
    };
    Jd.prototype.h = function() {
        return Kd() && C.performance.memory ? C.performance.memory.jsHeapSizeLimit || 0 : O.prototype.h.call(this)
    };

    function Ld() {
        return {
            visible: 1,
            hidden: 2,
            prerender: 3,
            preview: 4,
            unloaded: 5
        }[B.visibilityState || B.webkitVisibilityState || B.mozVisibilityState || ""] || 0
    }

    function Md() {
        var a;
        B.visibilityState ? a = "visibilitychange" : B.mozVisibilityState ? a = "mozvisibilitychange" : B.webkitVisibilityState && (a = "webkitvisibilitychange");
        return a
    };

    function Nd() {}
    Nd.prototype.isVisible = function() {
        return 1 === Ld()
    };
    Nd.prototype.g = function() {
        return 0 === Ld()
    };
    Nd.prototype.j = function(a) {
        var b = Md();
        return b ? hc(B, b, a, {
            capture: !1
        }) : !1
    };
    Nd.prototype.l = function(a) {
        var b = Md();
        b && ic(B, b, a)
    };
    var Od = /^https?:\/\/(\w|-)+\.cdn\.ampproject\.(net|org)(\?|\/|$)/;

    function Pd() {
        var a = u,
            b = [],
            c = null;
        do {
            var d = a;
            if (vc(d)) {
                var e = d.location.href;
                c = d.document && d.document.referrer || null
            } else e = c, c = null;
            b.push(new Qd(e || "", d));
            try {
                a = d.parent
            } catch (f) {
                a = null
            }
        } while (a && d != a);
        d = 0;
        for (a = b.length - 1; d <= a; ++d) b[d].depth = a - d;
        d = u;
        if (d.location && d.location.ancestorOrigins && d.location.ancestorOrigins.length == b.length - 1)
            for (a = 1; a < b.length; ++a) e = b[a], e.url || (e.url = d.location.ancestorOrigins[a - 1] || "", e.pb = !0);
        return b
    }

    function Rd(a, b) {
        this.g = a;
        this.h = b
    }

    function Qd(a, b, c) {
        this.url = a;
        this.I = b;
        this.pb = !!c;
        this.depth = null
    };

    function Sd() {
        this.i = "&";
        this.h = {};
        this.j = 0;
        this.g = []
    }

    function Td(a, b) {
        var c = {};
        c[a] = b;
        return [c]
    }

    function Ud(a, b, c, d, e) {
        var f = [];
        wc(a, function(g, h) {
            (g = Vd(g, b, c, d, e)) && f.push(h + "=" + g)
        });
        return f.join(b)
    }

    function Vd(a, b, c, d, e) {
        if (null == a) return "";
        b = b || "&";
        c = c || ",$";
        "string" == typeof c && (c = c.split(""));
        if (a instanceof Array) {
            if (d = d || 0, d < c.length) {
                for (var f = [], g = 0; g < a.length; g++) f.push(Vd(a[g], b, c, d + 1, e));
                return f.join(c[d])
            }
        } else if ("object" == typeof a) return e = e || 0, 2 > e ? encodeURIComponent(Ud(a, b, c, d, e + 1)) : "...";
        return encodeURIComponent(String(a))
    }

    function Wd(a, b, c) {
        b = b + "//pagead2.googlesyndication.com" + c;
        var d = Xd(a) - c.length;
        if (0 > d) return "";
        a.g.sort(function(p, q) {
            return p - q
        });
        c = null;
        for (var e = "", f = 0; f < a.g.length; f++)
            for (var g = a.g[f], h = a.h[g], k = 0; k < h.length; k++) {
                if (!d) {
                    c = null == c ? g : c;
                    break
                }
                var m = Ud(h[k], a.i, ",$");
                if (m) {
                    m = e + m;
                    if (d >= m.length) {
                        d -= m.length;
                        b += m;
                        e = a.i;
                        break
                    }
                    c = null == c ? g : c
                }
            }
        a = "";
        null != c && (a = e + "trn=" + c);
        return b + a
    }

    function Xd(a) {
        var b = 1,
            c;
        for (c in a.h) b = c.length > b ? c.length : b;
        return 3997 - b - a.i.length - 1
    };

    function Q(a) {
        if (a.ca && a.hasOwnProperty("ca")) return a.ca;
        var b = new a;
        return a.ca = b
    };

    function Yd() {
        this.h = new Nd;
        this.g = Kd() ? new Jd : new O
    }

    function Zd() {
        R();
        var a = C.document;
        return !!(a && a.body && a.body.getBoundingClientRect && "function" === typeof C.setInterval && "function" === typeof C.clearInterval && "function" === typeof C.setTimeout && "function" === typeof C.clearTimeout)
    }

    function $d(a, b, c) {
        return C.setTimeout(b, c)
    }

    function ae(a) {
        R();
        var b = Lc() || C;
        Dc(b, a, !1)
    };

    function be() {}

    function R() {
        var a = Q(be);
        if (!a.g) {
            if (!C) throw Error("Context has not been set and window is undefined.");
            a.g = Q(Yd)
        }
        return a.g
    };

    function ce(a) {
        Tb.call(this, a)
    }
    t(ce, Tb);

    function de(a) {
        this.i = a;
        this.g = -1;
        this.h = this.j = 0
    }

    function ee(a, b) {
        return function(c) {
            for (var d = [], e = 0; e < arguments.length; ++e) d[e] = arguments[e];
            if (-1 < a.g) return b.apply(null, n(d));
            try {
                return a.g = a.i.g.g(), b.apply(null, n(d))
            } finally {
                a.j += a.i.g.g() - a.g, a.g = -1, a.h += 1
            }
        }
    };

    function fe(a, b) {
        this.h = a;
        this.i = b;
        this.g = new de(a)
    };

    function ge() {
        this.g = {}
    }

    function he() {
        var a = S().o.g[dc.key];
        if (dc instanceof cc) return "boolean" === typeof a ? a : dc.defaultValue;
        throw Error();
    };
    var ie = {
            Tb: 1,
            Yb: 2,
            Sb: 3
        },
        je, ke = new Wa(Xa, "https://pagead2.googlesyndication.com/pagead/osd.js");
    je = ke instanceof Wa && ke.constructor === Wa && ke.g === Ya ? ke.h : "type_error:Const";
    var le;
    if (void 0 === Va) {
        var me = null,
            ne = u.trustedTypes;
        if (ne && ne.createPolicy) {
            try {
                me = ne.createPolicy("goog#html", {
                    createHTML: va,
                    createScript: va,
                    createScriptURL: va
                })
            } catch (a) {
                u.console && u.console.error(a.message)
            }
            Va = me
        } else Va = me
    }(le = Va) && le.createScriptURL(je);

    function oe() {
        this.A = void 0;
        this.h = this.D = 0;
        this.C = -1;
        this.g = new wd;
        J(L(this.g, "mv", qd)).h = void 0 === rd ? null : rd;
        L(this.g, "omid", I);
        J(L(this.g, "epoh", I));
        J(L(this.g, "epph", I));
        J(L(this.g, "umt", I)).h = void 0 === od ? null : od;
        J(L(this.g, "phel", I));
        J(L(this.g, "phell", I));
        J(L(this.g, "oseid", ie));
        var a = this.g;
        a.g.sloi || (a.g.sloi = new vd);
        J(a.g.sloi);
        J(L(this.g, "ovms", md));
        J(L(this.g, "xdi", I));
        J(L(this.g, "amp", I));
        J(L(this.g, "prf", I));
        J(L(this.g, "gtx", I));
        J(L(this.g, "mvp_lv", I));
        J(L(this.g, "ssmol", I)).h = void 0 === pd ? null : pd;
        this.i = new fe(R(), this.g);
        this.m = null;
        this.j = this.l = this.u = !1;
        this.o = new ge
    }

    function S() {
        return Q(oe)
    };

    function pe() {
        var a = "https:";
        C && C.location && "http:" === C.location.protocol && (a = "http:");
        this.h = a;
        this.g = .01;
        this.i = Math.random()
    }

    function qe(a, b, c, d, e) {
        if ((d ? a.i : Math.random()) < (e || a.g)) try {
            if (c instanceof Sd) var f = c;
            else f = new Sd, wc(c, function(h, k) {
                var m = f,
                    p = m.j++;
                h = Td(k, h);
                m.g.push(p);
                m.h[p] = h
            });
            var g = Wd(f, a.h, "/pagead/gen_204?id=" + b + "&");
            g && ae(g)
        } catch (h) {}
    };
    var re = null;

    function se() {
        var a = u.performance;
        return a && a.now && a.timing ? Math.floor(a.now() + a.timing.navigationStart) : Date.now()
    }

    function te() {
        var a = void 0 === a ? u : a;
        return (a = a.performance) && a.now ? a.now() : null
    };

    function ue(a, b) {
        var c = te() || se();
        this.label = a;
        this.type = b;
        this.value = c;
        this.duration = 0;
        this.uniqueId = Math.random();
        this.slotId = void 0
    };
    var T = u.performance,
        ve = !!(T && T.mark && T.measure && T.clearMarks),
        we = xa(function() {
            var a;
            if (a = ve) {
                var b;
                if (null === re) {
                    re = "";
                    try {
                        a = "";
                        try {
                            a = u.top.location.hash
                        } catch (c) {
                            a = u.location.hash
                        }
                        a && (re = (b = a.match(/\bdeid=([\d,]+)/)) ? b[1] : "")
                    } catch (c) {}
                }
                b = re;
                a = !!b.indexOf && 0 <= b.indexOf("1337")
            }
            return a
        });

    function xe() {
        var a = Lc();
        this.h = [];
        this.i = a || u;
        var b = null;
        a && (a.google_js_reporting_queue = a.google_js_reporting_queue || [], this.h = a.google_js_reporting_queue, b = a.google_measure_js_timing);
        this.g = we() || (null != b ? b : 1 > Math.random())
    }

    function ye(a) {
        a && T && we() && (T.clearMarks("goog_" + a.label + "_" + a.uniqueId + "_start"), T.clearMarks("goog_" + a.label + "_" + a.uniqueId + "_end"))
    }
    xe.prototype.start = function(a, b) {
        if (!this.g) return null;
        a = new ue(a, b);
        b = "goog_" + a.label + "_" + a.uniqueId + "_start";
        T && we() && T.mark(b);
        return a
    };
    xe.prototype.end = function(a) {
        if (this.g && "number" === typeof a.value) {
            a.duration = (te() || se()) - a.value;
            var b = "goog_" + a.label + "_" + a.uniqueId + "_end";
            T && we() && T.mark(b);
            !this.g || 2048 < this.h.length || this.h.push(a)
        }
    };

    function ze() {
        var a = Ae;
        this.h = Be;
        this.mb = "jserror";
        this.Va = !0;
        this.Ia = null;
        this.i = this.Qa;
        this.g = void 0 === a ? null : a
    }

    function Ce(a, b, c) {
        return ee(S().i.g, function() {
            try {
                if (a.g && a.g.g) {
                    var d = a.g.start(b.toString(), 3);
                    var e = c();
                    a.g.end(d)
                } else e = c()
            } catch (g) {
                var f = a.Va;
                try {
                    ye(d), f = a.i(b, new De(Ee(g)), void 0, void 0)
                } catch (h) {
                    a.Qa(217, h)
                }
                if (!f) throw g;
            }
            return e
        })()
    }

    function Fe(a, b) {
        var c = Ge;
        return ee(S().i.g, function(d) {
            for (var e = [], f = 0; f < arguments.length; ++f) e[f] = arguments[f];
            return Ce(c, a, function() {
                return b.apply(void 0, e)
            })
        })
    }
    ze.prototype.Qa = function(a, b, c, d, e) {
        e = e || this.mb;
        try {
            var f = new Sd;
            f.g.push(1);
            f.h[1] = Td("context", a);
            b.error && b.meta && b.id || (b = new De(Ee(b)));
            if (b.msg) {
                var g = b.msg.substring(0, 512);
                f.g.push(2);
                f.h[2] = Td("msg", g)
            }
            var h = b.meta || {};
            if (this.Ia) try {
                this.Ia(h)
            } catch (Fc) {}
            if (d) try {
                d(h)
            } catch (Fc) {}
            b = [h];
            f.g.push(3);
            f.h[3] = b;
            var k = Pd(),
                m = new Qd(u.location.href, u, !1);
            b = null;
            var p = k.length - 1;
            for (d = p; 0 <= d; --d) {
                var q = k[d];
                !b && Od.test(q.url) && (b = q);
                if (q.url && !q.pb) {
                    m = q;
                    break
                }
            }
            q = null;
            var P = k.length && k[p].url;
            0 != m.depth && P && (q = k[p]);
            var K = new Rd(m, q);
            if (K.h) {
                var ma = K.h.url || "";
                f.g.push(4);
                f.h[4] = Td("top", ma)
            }
            var y = {
                url: K.g.url || ""
            };
            if (K.g.url) {
                var aa = K.g.url.match(tc),
                    na = aa[1],
                    r = aa[3],
                    Ha = aa[4];
                k = "";
                na && (k += na + ":");
                r && (k += "//", k += r, Ha && (k += ":" + Ha));
                var Cb = k
            } else Cb = "";
            y = [y, {
                url: Cb
            }];
            f.g.push(5);
            f.h[5] = y;
            qe(this.h, e, f, !1, c)
        } catch (Fc) {
            try {
                qe(this.h, e, {
                    context: "ecmserr",
                    rctx: a,
                    msg: Ee(Fc),
                    url: K && K.g.url
                }, !1, c)
            } catch (gi) {}
        }
        return this.Va
    };

    function Ee(a) {
        var b = a.toString();
        a.name && -1 == b.indexOf(a.name) && (b += ": " + a.name);
        a.message && -1 == b.indexOf(a.message) && (b += ": " + a.message);
        if (a.stack) {
            a = a.stack;
            try {
                -1 == a.indexOf(b) && (a = b + "\n" + a);
                for (var c; a != c;) c = a, a = a.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/, "$1");
                b = a.replace(/\n */g, "\n")
            } catch (d) {}
        }
        return b
    }

    function De(a) {
        ec.call(this, Error(a), {
            message: a
        })
    }
    t(De, ec);
    var Be, Ge, Ae = new xe;

    function He() {
        var a = Lc();
        a && "undefined" != typeof a.google_measure_js_timing && !a.google_measure_js_timing && (a = Ae, a.g = !1, a.h != a.i.google_js_reporting_queue && (we() && v(a.h, ye), a.h.length = 0))
    }(function() {
        Be = new pe;
        Ge = new ze;
        var a = Lc();
        a && a.document && ("complete" == a.document.readyState ? He() : Ae.g && hc(a, "load", function() {
            He()
        }))
    })();

    function Ie(a) {
        Ge.Ia = function(b) {
            v(a, function(c) {
                c(b)
            })
        }
    }

    function Je(a, b) {
        return Ce(Ge, a, b)
    }

    function Ke(a, b) {
        return Fe(a, b)
    }

    function Le(a, b) {
        qe(Be, a, b, "jserror" != a, void 0)
    }

    function Me(a, b, c, d) {
        Ge.Qa(a, b, c, d)
    };
    var Ne = Date.now(),
        Oe = -1,
        Pe = -1,
        Qe = !1;

    function U() {
        return Date.now() - Ne
    }

    function Re() {
        var a = S().A,
            b = 0 <= Pe ? U() - Pe : -1,
            c = Qe ? U() - Oe : -1;
        if (947190542 == a) return 100;
        if (79463069 == a) return 200;
        a = [2E3, 4E3];
        var d = [250, 500, 1E3];
        Me(637, Error(), .001);
        var e = b; - 1 != c && c < b && (e = c);
        for (b = 0; b < a.length; ++b)
            if (e < a[b]) {
                var f = d[b];
                break
            }
        void 0 === f && (f = d[a.length]);
        return f
    };

    function Se(a, b, c) {
        var d = new G(0, 0, 0, 0);
        this.time = a;
        this.volume = null;
        this.i = b;
        this.g = d;
        this.h = null;
        this.j = c
    };

    function Te(a, b, c, d, e, f, g) {
        this.j = a;
        this.i = b;
        this.m = c;
        this.h = d;
        this.l = e;
        this.g = f;
        this.o = g
    };
    var Ue = ["GoogleActiveViewElement", "GoogleActiveViewClass", "DfaVisibilityIdentifier"];

    function Ve(a) {
        for (var b = 0, c = a, d = 0; a && a != a.parent;) a = a.parent, d++, vc(a) && (c = a, b = d);
        return {
            I: c,
            level: b
        }
    };
    var Ra = {
        Gb: "addEventListener",
        Mb: "getMaxSize",
        Nb: "getScreenSize",
        Ob: "getState",
        Pb: "getVersion",
        Ub: "removeEventListener",
        Rb: "isViewable"
    };

    function We(a) {
        var b = a !== a.top,
            c = a.top === Ve(a).I,
            d = -1,
            e = 0;
        if (b && c && a.top.mraid) {
            d = 3;
            var f = a.top.mraid
        } else d = (f = a.mraid) ? b ? c ? 2 : 1 : 0 : -1;
        f && (f.IS_GMA_SDK || (e = 2), Qa(function(g) {
            return "function" === typeof f[g]
        }) || (e = 1));
        return {
            K: f,
            ta: e,
            Cb: d
        }
    };

    function Xe(a) {
        return (a = a.document) && "function" === typeof a.elementFromPoint
    };
    if (B && B.URL) {
        var Ye, yc = B.URL;
        Ye = !!yc && 0 < xc().length;
        Ge.Va = !Ye
    }

    function Ze(a, b, c, d) {
        var e = void 0 === e ? !1 : e;
        c = Fe(d, c);
        hc(a, b, c, {
            capture: e
        })
    };

    function $e(a) {
        var b = Math.pow(10, 2);
        return Math.floor(a * b) / b
    }

    function af() {
        var a = R().h;
        return a.g() ? -1 : a.isVisible() ? 0 : 1
    };

    function bf() {
        var a = z;
        return a ? Ca("Android TV;AppleTV;Apple TV;GoogleTV;HbbTV;NetCast.TV;Opera TV;POV_TV;SMART-TV;SmartTV;TV Store;AmazonWebAppPlatform;MiBOX".split(";"), function(b) {
            return x(a, b)
        }) || x(a, "OMI/") && !x(a, "XiaoMi/") ? !0 : x(a, "Presto") && x(a, "Linux") && !x(a, "X11") && !x(a, "Android") && !x(a, "Mobi") : !1
    }

    function cf() {
        var a = z;
        return x(a, "AppleTV") || x(a, "Apple TV") || x(a, "CFNetwork") || x(a, "tvOS")
    }

    function df() {
        var a = z;
        return x(a, "sdk_google_atv_x86") || x(a, "Android TV")
    };

    function ef() {
        this.o = !vc(C.top);
        this.l = sc() || !sc() && (A("iPod") || A("iPhone") || A("Android") || A("IEMobile"));
        var a = Pd();
        0 < a.length && null != a[a.length - 1] && null != a[a.length - 1].url && (a = a[a.length - 1].url.match(tc)[3] || null) && decodeURI(a);
        this.g = new G(0, 0, 0, 0);
        this.i = new E(0, 0);
        this.m = new E(0, 0);
        this.h = new G(0, 0, 0, 0);
        this.A = new D(0, 0);
        this.u = !1;
        this.j = !(!C || !We(C).K);
        ff(this)
    }

    function gf(a, b) {
        b && b.screen && (a.i = new E(b.screen.width, b.screen.height))
    }

    function hf(a, b) {
        var c = a.g ? new E(zc(a.g), Ac(a.g)) : new E(0, 0);
        b = void 0 === b ? C : b;
        null !== b && b != b.top && (b = b.top);
        var d = 0,
            e = 0;
        try {
            var f = b.document,
                g = f.body,
                h = f.documentElement;
            if ("CSS1Compat" == f.compatMode && h.scrollHeight) d = h.scrollHeight != c.height ? h.scrollHeight : h.offsetHeight, e = h.scrollWidth != c.width ? h.scrollWidth : h.offsetWidth;
            else {
                var k = h.scrollHeight,
                    m = h.scrollWidth,
                    p = h.offsetHeight,
                    q = h.offsetWidth;
                h.clientHeight != p && (k = g.scrollHeight, m = g.scrollWidth, p = g.offsetHeight, q = g.offsetWidth);
                k > c.height ? k > p ? (d = k, e = m) : (d = p, e = q) : k < p ? (d = k, e = m) : (d = p, e = q)
            }
            var P = new E(e, d)
        } catch (K) {
            P = new E(-12245933, -12245933)
        }
        a.m = P
    }

    function ff(a) {
        C && C.document && (a.h = Mc(!1, C, a.l), a.g = Mc(!0, C, a.l), hf(a, C), gf(a, C))
    }

    function jf() {
        if (V().u) return !0;
        var a = R().h,
            b = a.isVisible();
        a = a.g();
        return b || a
    }

    function V() {
        return Q(ef)
    };

    function kf(a) {
        this.i = a;
        this.h = 0;
        this.g = null
    }
    kf.prototype.cancel = function() {
        R();
        C.clearTimeout(this.g);
        this.g = null
    };

    function lf(a) {
        R();
        var b = S().i.g;
        a.g = $d(0, ee(b, Ke(143, function() {
            a.h++;
            a.i.sample()
        })), Re())
    };

    function mf(a, b, c) {
        this.I = a;
        this.da = void 0 === c ? "na" : c;
        this.j = [];
        this.u = !1;
        this.h = new Se(-1, !0, this);
        this.g = this;
        this.N = b;
        this.P = this.C = !1;
        this.X = "uk";
        this.W = !1;
        this.m = !0
    }
    l = mf.prototype;
    l.qa = function() {
        return this.T()
    };
    l.T = function() {
        return !1
    };
    l.ja = function() {
        return this.u = !0
    };
    l.ga = function() {
        return this.g.X
    };
    l.ha = function() {
        return this.g.P
    };

    function nf(a, b) {
        if (!a.P || (void 0 === b ? 0 : b)) a.P = !0, a.X = "w", a.N = 0, a.g != a || of (a)
    }
    l.J = function() {
        return this.g.da
    };
    l.ba = function() {
        return this.g.Ma()
    };
    l.Ma = function() {
        return {}
    };
    l.U = function() {
        return this.g.N
    };

    function pf(a, b) {
        Fa(a.j, b) || (a.j.push(b), b.va(a.g), b.O(a.h), b.ka() && (a.C = !0))
    }
    l.za = function() {
        var a = V();
        a.g = Mc(!0, this.I, a.l)
    };
    l.Aa = function() {
        gf(V(), this.I)
    };
    l.Ya = function() {
        hf(V(), this.I)
    };
    l.Za = function() {
        var a = V();
        a.h = Mc(!1, this.I, a.l)
    };

    function qf(a) {
        a = a.g;
        a.Aa();
        a.za();
        a.Za();
        a.Ya();
        a.h.g = a.h.g
    }

    function rf(a) {
        var b = U(),
            c = jf();
        return new Se(b, c, a)
    }
    l.sample = function() {};

    function sf(a) {
        a.C = a.j.length ? Ca(a.j, function(b) {
            return b.ka()
        }) : !1
    }

    function tf(a) {
        var b = Ia(a.j);
        v(b, function(c) {
            c.O(a.h)
        })
    }

    function of (a) {
        var b = Ia(a.j);
        v(b, function(c) {
            c.va(a.g)
        });
        a.g != a || tf(a)
    }
    l.va = function(a) {
        var b = this.g;
        this.g = a.U() >= this.N ? a : this;
        b !== this.g ? (this.m = this.g.m, of (this)) : this.m !== this.g.m && (this.m = this.g.m, of (this))
    };
    l.O = function(a) {
        if (a.j === this.g) {
            var b = this.h,
                c = this.C;
            if (c = a && (void 0 === c || !c || b.volume == a.volume) && b.i == a.i) {
                c = b.g;
                var d = a.g;
                c = c == d ? !0 : c && d ? c.top == d.top && c.h == d.h && c.g == d.g && c.left == d.left : !1
            }
            b = !(c && b.h == a.h);
            this.h = a;
            b && tf(this)
        }
    };
    l.ka = function() {
        return this.C
    };
    l.F = function() {
        this.W = !0
    };
    l.oa = function() {
        return this.W
    };

    function uf(a, b, c, d) {
        this.i = a;
        this.g = new G(0, 0, 0, 0);
        this.o = new G(0, 0, 0, 0);
        this.h = b;
        this.A = c;
        this.C = d;
        this.u = !1;
        this.timestamp = -1;
        this.m = new Te(b.h, this.g, new G(0, 0, 0, 0), 0, 0, U(), 0)
    }
    l = uf.prototype;
    l.F = function() {
        if (!this.oa()) {
            var a = this.h,
                b = a.j,
                c = ya(b, this);
            0 <= c && Array.prototype.splice.call(b, c, 1);
            a.C && this.ka() && sf(a);
            this.u = !0
        }
    };
    l.oa = function() {
        return this.u
    };
    l.ba = function() {
        return this.h.ba()
    };
    l.U = function() {
        return this.h.U()
    };
    l.ga = function() {
        return this.h.ga()
    };
    l.ha = function() {
        return this.h.ha()
    };
    l.va = function() {};
    l.O = function() {
        vf(this)
    };
    l.ka = function() {
        return this.C
    };

    function wf(a) {
        this.l = !1;
        this.g = a;
        this.j = sa
    }
    l = wf.prototype;
    l.U = function() {
        return this.g.U()
    };
    l.ga = function() {
        return this.g.ga()
    };
    l.ha = function() {
        return this.g.ha()
    };
    l.create = function(a, b, c) {
        var d = null;
        this.g && (d = this.ib(a, b, c), pf(this.g, d));
        return d
    };
    l.Ca = function() {
        return this.Ba()
    };
    l.Ba = function() {
        return !1
    };
    l.Na = function(a) {
        return this.g.ja() ? (pf(this.g, this), this.j = a, !0) : !1
    };
    l.va = function(a) {
        0 == a.U() && this.j(a.ga(), this)
    };
    l.O = function() {};
    l.ka = function() {
        return !1
    };
    l.F = function() {
        this.l = !0
    };
    l.oa = function() {
        return this.l
    };
    l.ba = function() {
        return {}
    };

    function xf(a, b, c) {
        this.i = void 0 === c ? 0 : c;
        this.h = a;
        this.g = null == b ? "" : b
    }

    function yf(a) {
        switch (Math.trunc(a.i)) {
            case -16:
                return -16;
            case -8:
                return -8;
            case 0:
                return 0;
            case 8:
                return 8;
            case 16:
                return 16;
            default:
                return 16
        }
    }

    function zf(a, b) {
        return a.i < b.i ? !0 : a.i > b.i ? !1 : a.h < b.h ? !0 : a.h > b.h ? !1 : typeof a.g < typeof b.g ? !0 : typeof a.g > typeof b.g ? !1 : a.g < b.g
    };

    function Af() {
        this.i = 0;
        this.g = [];
        this.h = !1
    }
    Af.prototype.add = function(a, b, c) {
        ++this.i;
        a = new xf(a, b, c);
        this.g.push(new xf(a.h, a.g, a.i + this.i / 4096));
        this.h = !0;
        return this
    };

    function Bf(a, b) {
        v(b.g, function(c) {
            a.add(c.h, c.g, yf(c))
        })
    }

    function Cf(a, b) {
        var c = void 0 === c ? 0 : c;
        var d = void 0 === d ? !0 : d;
        wc(b, function(e, f) {
            d && void 0 === e || a.add(f, e, c)
        });
        return a
    }

    function Df(a) {
        var b = Ef;
        a.h && (Ka(a.g, function(c, d) {
            return zf(d, c) ? 1 : zf(c, d) ? -1 : 0
        }), a.h = !1);
        return Ba(a.g, function(c, d) {
            d = b(d);
            return "" + c + ("" != c && "" != d ? "&" : "") + d
        })
    };

    function Ef(a) {
        var b = a.h;
        a = a.g;
        return "" === a ? b : "boolean" === typeof a ? a ? b : "" : Array.isArray(a) ? 0 === a.length ? b : b + "=" + a.join() : b + "=" + (Fa(["mtos", "tos", "p"], b) ? a : encodeURIComponent(a))
    };

    function Ff(a) {
        var b = void 0 === b ? !0 : b;
        this.g = new Af;
        void 0 !== a && Bf(this.g, a);
        b && this.g.add("v", ac, -16)
    }
    Ff.prototype.toString = function() {
        var a = "//pagead2.googlesyndication.com//pagead/gen_204",
            b = Df(this.g);
        0 < b.length && (a += "?" + b);
        return a
    };

    function Gf(a, b, c, d, e) {
        var f = [];
        if (b.length) return f = Aa(b, function(g) {
            return g + "&id=" + a
        });
        b = "//" + (e || "pagead2.googlesyndication.com") + "/activeview";
        e = [];
        c && e.push("avi=" + c);
        d && e.push("cid=" + d);
        e.push("id=" + a);
        f.push(b + "?" + e.join("&"));
        return f
    }

    function Hf(a) {
        var b = Lc() || C;
        if (!b.navigator || !b.navigator.sendBeacon) return !1;
        a = If(a.toString()).split("?");
        return b.navigator.sendBeacon(a[0], a[1])
    }

    function Jf() {
        if (ac && "unreleased" !== ac) return ac
    }

    function If(a) {
        if (/&v=[^&]+/.test(a)) return a;
        var b = Jf();
        return b ? a + "&v=" + encodeURIComponent(b) : a
    }

    function Kf(a) {
        var b = void 0 === b ? 4E3 : b;
        a = If(a.toString());
        a = a.substring(0, b);
        ae(a)
    };

    function Lf() {
        this.g = 0
    };

    function Mf() {
        this.H = this.H;
        this.ra = this.ra
    }
    Mf.prototype.H = !1;
    Mf.prototype.oa = function() {
        return this.H
    };
    Mf.prototype.F = function() {
        this.H || (this.H = !0, this.na())
    };
    Mf.prototype.na = function() {
        if (this.ra)
            for (; this.ra.length;) this.ra.shift()()
    };

    function Nf(a, b, c) {
        v(a.i, function(d) {
            var e = a.g;
            if (!d.g && (d.i(b, c), d.j())) {
                d.g = !0;
                var f = d.h(),
                    g = new Af;
                g.add("id", "av-js");
                g.add("type", "verif");
                g.add("vtype", d.l);
                d = Q(Lf);
                g.add("i", d.g++);
                g.add("adk", e);
                Cf(g, f);
                e = new Ff(g);
                Kf(e)
            }
        })
    };

    function Of() {
        this.g = this.h = this.i = 0
    }

    function Pf(a, b, c, d) {
        b && (a.i += c, a.h += c, a.g = Math.max(a.g, a.h));
        if (void 0 === d ? !b : d) a.h = 0
    };
    var Qf = [1, .75, .5, .3, 0];

    function Rf(a) {
        this.g = a = void 0 === a ? Qf : a;
        this.h = Aa(this.g, function() {
            return new Of
        })
    }

    function Sf(a) {
        return Tf(a, function(b) {
            return b.i
        }, !1)
    }

    function Uf(a) {
        return Tf(a, function(b) {
            return b.g
        }, !0)
    }

    function Vf(a, b, c, d, e, f) {
        var g = void 0 === g ? !0 : g;
        c = f ? Math.min(b, c) : c;
        for (f = 0; f < a.g.length; f++) {
            var h = a.g[f],
                k = 0 < c && c >= h;
            h = !(0 < b && b >= h) || d;
            Pf(a.h[f], g && k, e, !g || h)
        }
    }

    function Tf(a, b, c) {
        a = Aa(a.h, function(d) {
            return b(d)
        });
        return c ? a : Wf(a)
    }

    function Wf(a) {
        return Aa(a, function(b, c, d) {
            return 0 < c ? d[c] - d[c - 1] : d[c]
        })
    };

    function Xf() {
        this.h = new Rf;
        this.i = new Of;
        this.g = -1;
        this.j = new Rf([1, .9, .8, .7, .6, .5, .4, .3, .2, .1, 0])
    }

    function Yf(a) {
        return 1E3 <= a.i.g
    };
    var Zf = new G(0, 0, 0, 0);

    function $f(a, b) {
        b = ag(b);
        return 0 === b ? 0 : ag(a) / b
    }

    function ag(a) {
        return Math.max(a.g - a.top, 0) * Math.max(a.h - a.left, 0)
    }

    function bg(a, b) {
        if (!a || !b) return !1;
        for (var c = 0; null !== a && 100 > c++;) {
            if (a === b) return !0;
            try {
                a: {
                    var d = void 0;
                    if (jc && !(sb && Eb("9") && !Eb("10") && u.SVGElement && a instanceof u.SVGElement) && (d = a.parentElement)) {
                        var e = d;
                        break a
                    }
                    d = a.parentNode;e = ua(d) && 1 == d.nodeType ? d : null
                }
                if (a = e || a) {
                    var f = F(a),
                        g = f && pc(f),
                        h = g && g.frameElement;
                    h && (a = h)
                }
            }
            catch (k) {
                break
            }
        }
        return !1
    }

    function cg(a, b, c) {
        if (!a || !b) return !1;
        b = Cc(Bc(a), -b.left, -b.top);
        a = (b.left + b.h) / 2;
        b = (b.top + b.g) / 2;
        var d = Lc();
        vc(d.top) && d.top && d.top.document && (d = d.top);
        if (!Xe(d)) return !1;
        a = d.document.elementFromPoint(a, b);
        if (!a) return !1;
        b = (b = (b = F(c)) && b.defaultView && b.defaultView.frameElement) && bg(b, a);
        d = a === c;
        a = !d && a && rc(a, function(e) {
            return e === c
        });
        return !(b || d || a)
    }

    function dg(a, b, c, d) {
        return V().o ? !1 : 0 >= zc(a) || 0 >= Ac(a) ? !0 : c && d ? Je(208, function() {
            return cg(a, b, c)
        }) : !1
    };
    var eg = new G(0, 0, 0, 0);

    function fg(a, b, c) {
        Mf.call(this);
        this.position = Bc(eg);
        this.h = new Xf;
        this.$ = -2;
        this.nb = -1;
        this.gb = b;
        this.Z = null;
        this.L = !1;
        this.xa = null;
        this.ab = -1;
        this.u = c;
        this.ob = this.Fa = sa;
        this.s = new Dd;
        this.s.B = a;
        this.s.g = a;
        this.m = !1;
        this.A = {
            Sa: null,
            Ra: null
        };
        this.ia = !0;
        this.M = null;
        S().D++;
        this.i = new nd;
        this.lb = this.sa = -1;
        this.tb = 0;
        this.g = null;
        this.fb = !1;
        a = this.j = new wd;
        L(a, "od", ld);
        J(L(a, "opac", I));
        J(L(a, "sbeos", I));
        J(L(a, "prf", I));
        J(L(a, "mwt", I));
        L(a, "iogeo", I);
        (a = this.s.B) && a.getAttribute && Cd(a, "googleAvInapp") && (V().j = !0);
        1 == this.u ? (a = this.j.g.od) && a.i(1) : (a = this.j.g.od) && a.i(0)
    }
    t(fg, Mf);
    l = fg.prototype;
    l.na = function() {
        gg(this);
        this.M && this.M.F();
        this.g && this.g.F();
        delete this.h;
        delete this.Fa;
        delete this.ob;
        delete this.s.B;
        delete this.s.g;
        delete this.A;
        delete this.M;
        delete this.g;
        delete this.j;
        Mf.prototype.na.call(this)
    };

    function hg(a) {
        return a.g ? a.g.g : a.position
    }
    l.Da = function(a) {
        var b = S();
        "string" === typeof a && 0 != a.length && yd(b.g, a)
    };
    l.$a = function() {
        return !1
    };
    l.Ua = function() {
        this.L = !0
    };
    l.wa = function() {
        return this.L
    };
    l.Ta = function() {
        this.i.G = 0
    };

    function ig(a, b) {
        if (a.g) {
            if (b.J() === a.g.J()) return;
            a.g.F();
            a.g = null
        }
        b = b.create(a.s.g, a.j, a.$a());
        if (b = null != b ? b : null) a.g = b
    }

    function jg(a, b, c) {
        if (a.g) {
            vf(a.g);
            var d = a.g.m,
                e = d.j,
                f = e.g;
            if (null != d.m) {
                var g = d.i;
                a.xa = new D(g.left - f.left, g.top - f.top)
            }
            f = a.ya() ? Math.max(d.h, d.l) : d.h;
            g = {};
            null !== e.volume && (g.volume = e.volume);
            a.Z && -1 != a.gb && -1 !== d.g && -1 !== a.Z.g ? (e = d.g - a.Z.g, e = 1E4 < e ? 0 : e) : e = 0;
            a.Z = d;
            a.Wa(f, b, c, !1, g, e, d.o)
        }
    }

    function kg(a) {
        if (a.wa() && a.M) {
            var b = 1 == M(a.j, "od"),
                c = V().g,
                d = a.M,
                e = new E(zc(c), Ac(c));
            c = a.ya();
            a = {
                Db: a.g ? a.g.J() : "ns",
                xa: a.xa,
                Fb: e,
                ya: c,
                G: a.i.G,
                Eb: b
            };
            if (b = d.h) {
                vf(b);
                e = b.m;
                var f = e.j.g,
                    g = null,
                    h = null;
                null != e.m && f && (g = e.i, g = new D(g.left - f.left, g.top - f.top), h = new E(f.h - f.left, f.g - f.top));
                c = {
                    Db: b.J(),
                    xa: g,
                    Fb: h,
                    ya: c,
                    Eb: !1,
                    G: c ? Math.max(e.h, e.l) : e.h
                }
            } else c = null;
            c && Nf(d, a, c)
        }
    }
    l.Wa = function(a, b, c, d, e, f, g) {
        this.m || (this.wa() && (e = new nd, e.i = c, e.h = af(), e.G = 0 === this.ab && 1 === M(this.j, "opac") ? 0 : a, e.g = this.ma(), e.j = g, a = this.h, c = this.i, d = d && this.i.G >= (this.ma() ? .3 : .5), a.g = Math.max(a.g, e.G), Vf(a.j, e.j, c.j, e.i, f, d), Vf(a.h, e.G, c.G, e.i, f, d), d = d || c.g != e.g ? c.isVisible() && e.isVisible() : c.isVisible(), c = !e.isVisible() || e.i, Pf(a.i, d, f, c), this.gb = b, 0 < e.G && (-1 === this.sa && (this.sa = b), this.lb = b), -1 == this.nb && Yf(this.h) && (this.nb = b), -2 == this.$ && (this.$ = ag(hg(this)) ? e.G : -1), this.i = e), this.Fa(this))
    };
    l.ma = function() {
        return !1
    };
    l.ya = function() {
        return this.fb || !1
    };

    function lg(a) {
        return a.m ? 2 : Yf(a.h) ? 4 : 3
    }

    function gg(a) {
        a.s.g && (a.A.Sa && (ic(a.s.g, "mouseover", a.A.Sa), a.A.Sa = null), a.A.Ra && (ic(a.s.g, "mouseout", a.A.Ra), a.A.Ra = null))
    }

    function mg(a, b, c) {
        b && (a.Fa = b);
        c && (a.ob = c)
    };

    function ng() {
        this.i = !0;
        this.h = []
    }
    ng.prototype.isVisible = function() {
        return this.i
    };
    ng.prototype.g = function() {
        return !1
    };
    ng.prototype.j = function(a) {
        this.h.push(a);
        return !0
    };
    ng.prototype.l = function(a) {
        this.h = za(this.h, function(b) {
            return a !== b
        })
    };

    function og(a) {
        return cb() ? (a = (a = F(a)) && pc(a), !!(a && a.location && a.location.ancestorOrigins && 0 < a.location.ancestorOrigins.length && a.location.origin == a.location.ancestorOrigins[0])) : !0
    };
    var pg = "StopIteration" in u ? u.StopIteration : {
        message: "StopIteration",
        stack: ""
    };

    function qg() {}
    qg.prototype.next = function() {
        return qg.prototype.g.call(this)
    };
    qg.prototype.g = function() {
        throw pg;
    };
    qg.prototype.eb = function() {
        return this
    };

    function rg(a) {
        if (a instanceof qg) return a;
        if ("function" == typeof a.eb) return a.eb(!1);
        if (ta(a)) {
            var b = 0,
                c = new qg;
            c.g = function() {
                for (;;) {
                    if (b >= a.length) throw pg;
                    if (b in a) return a[b++];
                    b++
                }
            };
            c.next = c.g.bind(c);
            return c
        }
        throw Error("Not implemented");
    }

    function sg(a, b) {
        if (ta(a)) try {
            v(a, b, void 0)
        } catch (c) {
            if (c !== pg) throw c;
        } else {
            a = rg(a);
            try {
                for (;;) b.call(void 0, a.next(), void 0, a)
            } catch (c) {
                if (c !== pg) throw c;
            }
        }
    }

    function tg(a, b) {
        var c = 1;
        sg(a, function(d) {
            c = b.call(void 0, c, d)
        });
        return c
    }

    function ug(a, b) {
        var c = rg(a);
        a = new qg;
        a.g = function() {
            var d = c.next();
            if (b.call(void 0, d, void 0, c)) return d;
            throw pg;
        };
        a.next = a.g.bind(a);
        return a
    }

    function vg(a) {
        var b = rg(a);
        a = new qg;
        var c = 100;
        a.g = function() {
            if (0 < c--) return b.next();
            throw pg;
        };
        a.next = a.g.bind(a);
        return a
    };

    function wg(a, b) {
        this.j = b;
        this.i = null == a;
        this.h = a
    }
    t(wg, qg);
    wg.prototype.g = function() {
        if (this.i) throw pg;
        var a = this.h || null;
        this.i = null == a;
        var b;
        if (b = a) {
            b = this.j;
            if (ob(a, "parentElement") && null != a.parentElement && a != a.parentElement) var c = a.parentElement;
            else if (b) {
                var d = void 0 === d ? og : d;
                if (d(a)) try {
                    var e = F(a),
                        f = e && pc(e),
                        g = f && f.frameElement;
                    c = null == g ? null : g
                } catch (h) {
                    c = null
                } else c = null
            } else c = null;
            b = c
        }
        this.h = b;
        return a
    };
    wg.prototype.next = function() {
        return wg.prototype.g.call(this)
    };

    function xg(a) {
        var b = 1;
        a = vg(new wg(a, !0));
        a = ug(a, function() {
            return 0 < b
        });
        return tg(a, function(c, d) {
            var e = 1;
            if (ob(d, "style") && d.style) {
                var f = parseFloat;
                a: {
                    var g = F(d);
                    if (g.defaultView && g.defaultView.getComputedStyle && (g = g.defaultView.getComputedStyle(d, null))) {
                        g = g.opacity || g.getPropertyValue("opacity") || "";
                        break a
                    }
                    g = ""
                }
                if (!g) {
                    g = d.style[eb()];
                    if ("undefined" !== typeof g) d = g;
                    else {
                        g = d.style;
                        var h = Hc.opacity;
                        if (!h) {
                            var k = eb();
                            h = k;
                            void 0 === d.style[k] && (k = (vb ? "Webkit" : ub ? "Moz" : sb ? "ms" : rb ? "O" : null) + gb(k), void 0 !== d.style[k] && (h = k));
                            Hc.opacity = h
                        }
                        d = g[h] || ""
                    }
                    g = d
                }
                f = f(g);
                "number" !== typeof f || isNaN(f) || (e = f)
            }
            return b = c * e
        })
    };

    function yg() {
        this.h = !1
    }
    yg.prototype.g = function(a, b) {
        b = void 0 === b ? {} : b;
        this.h || (this.h = this.i(a, b))
    };
    yg.prototype.i = function() {
        return !1
    };

    function zg(a, b, c, d, e, f, g, h) {
        g = void 0 === g ? [] : g;
        h = void 0 === h ? [] : h;
        fg.call(this, c, d, e);
        this.Ea = b;
        this.fa = 0;
        this.W = this.R = "";
        this.C = [];
        this.S = [];
        this.P = this.bb = "";
        this.Xa = !1;
        this.vb = 4;
        this.xb = [];
        this.D = this.o = "";
        this.l = this.X = !1;
        this.Y = 0;
        this.N = this.cb = af();
        this.da = 0;
        this.ea = f;
        this.jb = !1;
        this.aa = -1;
        this.hb = g;
        this.yb = h;
        if (a = this.s.B)
            if (0 == this.fa ? this.s.B ? (b = this.s.B._adk_, b || (b = (b = N(this.s.B, "googleAvAdk")) && !/[^0-9]/.test(b) ? parseInt(b, 10) : 0)) : b = 0 : b = this.fa, this.fa = b, "" == this.R && (this.R = String(a._avi_ || "")), "" == this.W && (this.W = a._avihost_ ? String(a._avihost_) : "pagead2.googlesyndication.com"), this.C.length || (this.C = Ag(a, "_avicxn_", "googleAvCxn")), this.S.length || (this.S = Ag(a, "_avieoscxn_", "googleEOSAvCxn")), "" == this.bb && (this.bb = String(a._aviextcxn_ || N(a, "googleAvExtCxn") || "")), "" == this.P && (this.P = String(a._cid_ || "")), this.Xa || (this.Xa = !!a._imm_ || Cd(a, "googleAvImmediate")), "" == this.D && (this.D = String(a._cvu_ || N(a, "googleAvCpmav") || "")), "" == this.o && (this.o = String(N(a, "googleAvBtr") || "")), this.Da(String(a._avm_ || N(a, "googleAvMetadata") || "")), b = String(N(a, "googleAvFlags") || ""), a = S(), "string" === typeof b && 0 != b.length) {
                a = a.o;
                try {
                    var k = JSON.parse(b)[0];
                    b = "";
                    for (c = 0; c < k.length; c++) b += String.fromCharCode(k.charCodeAt(c) ^ "\u0003\u0007\u0003\u0007\b\u0004\u0004\u0006\u0005\u0003".charCodeAt(c % 10));
                    a.g = JSON.parse(b)
                } catch (m) {}
            }
        Ad(S().g, this.Ea)
    }
    t(zg, fg);

    function Ag(a, b, c) {
        return (a = String(a[b] || N(a, c) || "")) ? a.split("|") : []
    }
    l = zg.prototype;
    l.na = function() {
        delete this.xb;
        delete this.hb;
        fg.prototype.na.call(this)
    };

    function Bg(a, b, c) {
        v(a.hb, function(d) {
            return d.g(a, c, b)
        })
    }

    function Cg(a) {
        var b = {},
            c = S();
        (1 !== M(c.g, "omid") || c.j) && v(a.yb, function(d) {
            return d.g(a, b)
        })
    }
    l.wa = function() {
        return this.L && !(1 == this.da || 3 == this.da)
    };
    l.Ta = function() {
        fg.prototype.Ta.call(this)
    };
    l.Ua = function() {
        this.L || (void 0 !== this.ea && this.ea(!1, this.$), null != this.o && "" != this.o && (Ec(this.o), this.o = ""));
        fg.prototype.Ua.call(this);
        Dg(this)
    };

    function Dg(a) {
        if (a.L && u == u.top) {
            var b = u.pageYOffset;
            null != b && (a.aa = Math.max(b, a.aa));
            Bg(a, 4, {})
        }
    }
    l.Da = function(a) {
        if ("string" === typeof a && 0 != a.length) {
            var b = new wd,
                c = S();
            L(b, "omid", I);
            yd(b, a);
            b = M(b, "omid");
            null !== b && (c.g.h.omid = b);
            a = yd(this.j, a);
            c = a.split("&");
            for (b = 0; b < c.length; b++) {
                var d = c[b];
                "ts=0" == d ? this.ia = !1 : 0 == d.lastIndexOf("la=", 0) ? (d = d.split("=")[1], "0" == d ? this.Y = 2 : "1" == d && (this.Y = 1)) : 0 == d.lastIndexOf("cr=", 0) && "1" == d.split("=")[1] && (this.fb = !0)
            }
            this.i.g = this.ma();
            fg.prototype.Da.call(this, a)
        }
    };
    l.Wa = function(a, b, c, d, e, f, g) {
        var h = Yf(this.h),
            k = Math.floor(100 * this.i.G);
        this.Y = 242500 <= ag(hg(this)) ? 1 : 2;
        fg.prototype.Wa.call(this, a, b, c, d, e, f, g); - 1 == this.N && -1 != this.i.h ? this.N = this.i.h : 0 == this.N && 1 == this.i.h && (this.N = 1);
        a = Yf(this.h);
        b = Math.floor(100 * this.i.G);
        (!h && a || b != k) && void 0 !== this.ea && this.ea(a, b);
        try {
            this.ab = xg(this.s.g)
        } catch (m) {}
        Dg(this)
    };
    l.ma = function() {
        return wb ? !1 : 1 == this.Y
    };

    function Eg(a, b) {
        switch (b) {
            case 1:
                if (a.C.length) return a.C;
                break;
            case 2:
                if (a.S.length) return a.S;
                if (a.C.length) return a.C
        }
        return []
    }

    function Fg(a) {
        var b = V(),
            c = xd(a.j),
            d = b.A,
            e = hg(a);
        c.p = [e.top + d.y, e.left + d.x, e.g + d.y, e.h + d.x];
        d = a.h;
        c.tos = Sf(d.h);
        e = Uf(d.h);
        c.mtos = e;
        c.mcvt = d.i.g;
        c.rs = a.u;
        (e = 5 == a.u) || (c.ht = a.tb);
        0 <= a.sa && (c.tfs = a.sa, c.tls = a.lb);
        c.mc = $e(d.g);
        c.lte = $e(a.$);
        c.bas = a.cb;
        c.bac = a.N;
        b.o && (c["if"] = a.m ? 0 : 1);
        c.met = a.s.h;
        e && a.Ea && (c.req = encodeURIComponent(a.Ea).substring(0, 100));
        a.ma() && (c.la = "1");
        c.avms = a.g ? a.g.J() : "ns";
        a.g && w(c, a.g.ba());
        a.jb && (c.radf = "1");
        0 != a.da && (c.md = a.da);
        c.btr = null != a.o && "" != a.o ? 1 : 0;
        c.cpmav = Gg(a) ? 1 : 0;
        c.lm = a.vb;
        b = {};
        a = (b.rst = void 0, b.dlt = void 0, b.rpt = void 0, b.isd = void 0, b.msd = 0 <= a.aa ? a.aa : void 0, b);
        w(c, a);
        return c
    }

    function Gg(a) {
        return null != a.D && null != a.D.match(/\/pagead\/adview\?.*ai=.*&vt=\d+/i)
    }
    l.$a = function() {
        return !1
    };

    function W(a, b, c, d) {
        uf.call(this, a, b, c, d)
    }
    t(W, uf);
    W.prototype.La = function(a) {
        return $f(a, this.g)
    };
    W.prototype.Ka = function(a) {
        return $f(a, V().g)
    };
    W.prototype.Ja = function(a, b) {
        return $f(a, b)
    };

    function vf(a) {
        a.timestamp = U();
        if (a.i) {
            var b = a.i,
                c = a.h.g.I;
            try {
                try {
                    var d = b.getBoundingClientRect();
                    var e = new G(d.top, d.right, d.bottom, d.left)
                } catch (Ha) {
                    e = new G(0, 0, 0, 0)
                }
                var f = e.h - e.left,
                    g = e.g - e.top;
                var h = new D(0, 0),
                    k = pc(F(b));
                if (ob(k, "parent")) {
                    do {
                        if (k == c) {
                            e = b;
                            var m = F(e),
                                p = new D(0, 0);
                            d = void 0;
                            d = m ? F(m) : document;
                            var q = !sb || 9 <= Number(Hb) || "CSS1Compat" == kc(d).g.compatMode ? d.documentElement : d.body;
                            if (e != q) {
                                var P = Ic(e),
                                    K = oc(kc(m).g);
                                p.x = P.left + K.x;
                                p.y = P.top + K.y
                            }
                            var ma = p
                        } else {
                            var y = Ic(b);
                            ma = new D(y.left, y.top)
                        }
                        e = ma;
                        h.x += e.x;
                        h.y += e.y
                    } while (k && k != c && k != k.parent && (b = k.frameElement) && (k = k.parent))
                }
                var aa = h.x,
                    na = h.y;
                var r = new G(Math.round(na), Math.round(aa + f), Math.round(na + g), Math.round(aa))
            } catch (Ha) {
                r = Bc(Zf)
            }
            a.g = r
        }
        a.i && "number" === typeof a.i.videoWidth && "number" === typeof a.i.videoHeight && (r = a.i, h = new E(r.videoWidth, r.videoHeight), r = a.g, c = zc(r), f = Ac(r), g = h.width, h = h.height, 0 >= g || 0 >= h || 0 >= c || 0 >= f || (g /= h, r = Bc(r), g > c / f ? (c /= g, f = (f - c) / 2, 0 < f && (f = r.top + f, r.top = Math.round(f), r.g = Math.round(f + c))) : (f *= g, c = Math.round((c - f) / 2), 0 < c && (c = r.left + c, r.left = Math.round(c), r.h = Math.round(c + f)))), a.g = r);
        a.o = a.h.h.g;
        r = a.g;
        c = a.o;
        r = r.left <= c.h && c.left <= r.h && r.top <= c.g && c.top <= r.g ? new G(Math.max(r.top, c.top), Math.min(r.h, c.h), Math.min(r.g, c.g), Math.max(r.left, c.left)) : new G(0, 0, 0, 0);
        c = r.top >= r.g || r.left >= r.h ? new G(0, 0, 0, 0) : r;
        r = a.h.h;
        h = g = f = 0;
        0 < (a.g.g - a.g.top) * (a.g.h - a.g.left) && (dg(c, a.o, a.i, 1 == M(a.A, "od")) ? c = new G(0, 0, 0, 0) : (f = V().i, h = new G(0, f.height, f.width, 0), f = a.La(c), g = a.Ka(c), h = a.Ja(c, h)));
        c = c.top >= c.g || c.left >= c.h ? new G(0, 0, 0, 0) : Cc(c, -a.g.left, -a.g.top);
        jf() || (g = f = 0);
        a.m = new Te(r, a.g, c, f, g, a.timestamp, h)
    }
    W.prototype.J = function() {
        return this.h.J()
    };

    function Hg(a, b) {
        return b ? Ea(a.g, function(c) {
            return c.s.B == b
        }) : null
    }

    function Ig() {
        var a = X;
        return 0 == a.h.length ? a.g : 0 == a.g.length ? a.h : Ga(a.g, a.h)
    }

    function Jg() {
        var a = X;
        a.h = [];
        a.g = []
    }

    function Kg(a) {
        var b = X,
            c = [];
        v(a, function(d) {
            d.s.B && null == Hg(b, d.s.B) && (b.g.push(d), c.push(d))
        })
    }
    var X = Q(function() {
        this.h = [];
        this.g = []
    });

    function Lg() {
        this.g = this.h = null
    }

    function Mg(a, b) {
        function c(d, e) {
            b(d, e)
        }
        if (null == a.h) return !1;
        a.g = Ea(a.h, function(d) {
            return null != d && d.Ca()
        });
        a.g && (a.g.Na(c) ? qf(a.g.g) : b(a.g.g.ga(), a.g));
        return null != a.g
    };

    function Ng(a) {
        a = Og(a);
        wf.call(this, a.length ? a[a.length - 1] : new mf(C, 0));
        this.i = a;
        this.h = null
    }
    t(Ng, wf);
    l = Ng.prototype;
    l.J = function() {
        return (this.h ? this.h : this.g).J()
    };
    l.ba = function() {
        return (this.h ? this.h : this.g).ba()
    };
    l.U = function() {
        return (this.h ? this.h : this.g).U()
    };
    l.Na = function(a) {
        var b = !1;
        v(this.i, function(c) {
            c.ja() && (b = !0)
        });
        b && (this.j = a, pf(this.g, this));
        return b
    };
    l.F = function() {
        v(this.i, function(a) {
            a.F()
        });
        wf.prototype.F.call(this)
    };
    l.Ca = function() {
        return Ca(this.i, function(a) {
            return a.qa()
        })
    };
    l.Ba = function() {
        return Ca(this.i, function(a) {
            return a.T()
        })
    };
    l.ib = function(a, b, c) {
        return new W(a, this.g, b, c)
    };
    l.O = function(a) {
        this.h = a.j
    };

    function Og(a) {
        if (!a.length) return [];
        a = za(a, function(c) {
            return null != c && c.qa()
        });
        for (var b = 1; b < a.length; b++) pf(a[b - 1], a[b]);
        return a
    };

    function Pg() {};

    function Qg() {
        this.done = !1;
        this.g = {
            Ha: 0,
            Ga: 0,
            $b: 0,
            kb: 0,
            Oa: -1,
            rb: 0,
            qb: 0,
            sb: 0
        };
        this.h = null;
        this.m = !1;
        this.l = "";
        this.j = null;
        this.u = 0;
        this.i = new kf(this)
    }

    function Rg() {
        var a = Y;
        a.m || (a.m = !0, Sg(a, function(b) {
            for (var c = [], d = 0; d < arguments.length; ++d) c[d] = arguments[d];
            return a.o.apply(a, n(c))
        }), a.o())
    }
    Qg.prototype.sample = function() {
        Tg(this, Ig(), !1)
    };

    function Ug() {
        Q(Pg);
        var a = Q(Lg);
        null != a.g && a.g.g ? qf(a.g.g) : ff(V())
    }

    function Tg(a, b, c) {
        if (!a.done && (a.i.cancel(), 0 != b.length)) {
            a.j = null;
            try {
                Ug();
                var d = U(),
                    e = S();
                e.C = d;
                if (null != Q(Lg).g)
                    for (e = 0; e < b.length; e++) jg(b[e], d, c);
                else Le(a.l, {
                    strategy_not_selected: 1,
                    bin: e.h
                });
                for (d = 0; d < b.length; d++) kg(b[d]);
                ++a.g.kb;
                Vg(a)
            } finally {
                c ? v(b, function(f) {
                    return f.Ta()
                }) : lf(a.i)
            }
        }
    }

    function Sg(a, b) {
        a.h || (b = Fe(142, b), R().h.j(b) && (a.h = b))
    }
    Qg.prototype.o = function() {
        var a = jf(),
            b = U();
        a ? (Qe || (Oe = b, v(X.h, function(c) {
            return c.h.m(b, !c.l())
        })), Qe = !0) : (this.u = Wg(this, b), Qe = !1, v(X.h, function(c) {
            c.wa() && c.h.l(b)
        }));
        Tg(this, Ig(), !a)
    };

    function Xg(a, b) {
        if (!a.j || b) {
            b = C.document;
            var c = 0 <= Pe ? U() - Pe : -1,
                d = U(); - 1 == a.g.Oa && (c = d);
            var e = V(),
                f = S(),
                g = xd(f.g),
                h = Ig();
            try {
                if (0 < h.length) {
                    var k = e.g;
                    k && (g.bs = [zc(k), Ac(k)]);
                    var m = e.m;
                    m && (g.ps = [m.width, m.height]);
                    C.screen && (g.scs = [C.screen.width, C.screen.height])
                } else g.url = encodeURIComponent(C.location.href.substring(0, 512)), b.referrer && (g.referrer = encodeURIComponent(b.referrer.substring(0, 512)));
                g.tt = c;
                g.pt = Pe;
                g.bin = f.h;
                void 0 !== C.google_osd_load_pub_page_exp && (g.olpp = C.google_osd_load_pub_page_exp);
                g.deb = [1, a.g.Ha, a.g.Ga, a.g.kb, a.g.Oa, 0, a.i.h, a.g.rb, a.g.qb, a.g.sb].join("-");
                g.tvt = Wg(a, d);
                e.j && (g.inapp = 1);
                if (null !== C && C != C.top) {
                    0 < h.length && (g.iframe_loc = encodeURIComponent(C.location.href.substring(0, 512)));
                    var p = e.h;
                    g.is = [zc(p), Ac(p)]
                }
            } catch (P) {
                g.error = 1
            }
            a.j = g
        }
        a = Ta(a.j);
        k = S().i;
        if (1 == M(k.i, "prf")) {
            m = new ce;
            p = k.g;
            b = 0; - 1 < p.g && (b = p.i.g.g() - p.g);
            m = Zb(m, 1, p.j + b);
            p = k.g;
            m = Zb(m, 5, -1 < p.g ? p.h + 1 : p.h);
            m = Zb(m, 2, k.h.g.j());
            m = Zb(m, 3, k.h.g.i());
            p = Zb(m, 4, k.h.g.h());
            k = {};
            m = new Lb;
            var q = void 0 === q ? 0 : q;
            b = Xb(p, 1);
            b = null == b ? b : +b;
            q = null == b ? q : b;
            if (0 !== q && (b = q, null != b)) {
                lb(m.g, 9);
                q = m.g;
                d = b;
                d = (b = 0 > d ? 1 : 0) ? -d : d;
                if (0 === d) jb = 0 < 1 / d ? 0 : 2147483648, ib = 0;
                else if (isNaN(d)) jb = 2147483647, ib = 4294967295;
                else if (1.7976931348623157E308 < d) jb = (b << 31 | 2146435072) >>> 0, ib = 0;
                else if (2.2250738585072014E-308 > d) c = d / Math.pow(2, -1074), jb = (b << 31 | c / 4294967296) >>> 0, ib = c >>> 0;
                else {
                    e = d;
                    c = 0;
                    if (2 <= e)
                        for (; 2 <= e && 1023 > c;) c++, e /= 2;
                    else
                        for (; 1 > e && -1022 < c;) e *= 2, c--;
                    d *= Math.pow(2, -c);
                    jb = (b << 31 | c + 1023 << 20 | 1048576 * d & 1048575) >>> 0;
                    ib = 4503599627370496 * d >>> 0
                }
                mb(q, ib);
                mb(q, jb)
            }
            q = $b(p, 2);
            0 !== q && null != q && Mb(m, 2, q);
            q = $b(p, 3);
            0 !== q && null != q && Mb(m, 3, q);
            q = $b(p, 4);
            0 !== q && null != q && Mb(m, 4, q);
            q = $b(p, 5);
            if (0 !== q && null != q && (p = q, null != p))
                if (lb(m.g, 40), q = m.g, 0 <= p) lb(q, p);
                else {
                    for (b = 0; 9 > b; b++) q.push(p & 127 | 128), p >>= 7;
                    q.push(1)
                }
            q = m.g.length();
            if (0 === q) m = new Uint8Array(0);
            else {
                q = new Uint8Array(q);
                b = m.h;
                c = b.length;
                for (d = p = 0; d < c; d++) e = b[d], 0 !== e.length && (q.set(e, p), p += e.length);
                b = m.g;
                c = b.h;
                0 !== c && (q.set(b.g.subarray(0, c), p), b.h = 0);
                m.h = [q];
                m = q
            }
            k = (k.pf = Kb(m), k)
        } else k = {};
        w(a, k);
        return a
    }

    function Yg() {
        v(Ig(), function(a) {
            a.s.B && Q(Pg)
        })
    }

    function Zg() {
        var a = Q(Lg);
        if (null != a.g) {
            var b = a.g;
            v(Ig(), function(c) {
                return ig(c, b)
            })
        }
    }

    function Vg(a) {
        var b = S(),
            c = 1 === M(b.g, "llp");
        "osd" == a.l && v(X.g, function(d) {
            if (c) {
                if (1 == b.h || Yf(d.h) || d.m) {
                    var e = {};
                    Bg(d, 0, (e.r = void 0, e))
                }
            } else e = {}, Bg(d, 0, (e.r = void 0, e))
        })
    }

    function Wg(a, b) {
        a = a.u;
        Qe && (a += b - Oe);
        return a
    }

    function $g() {
        var a = Y;
        var b = void 0 === b ? function() {
            return {}
        } : b;
        Ge.mb = "av-js";
        Be.g = .01;
        Ie([function(c) {
            var d = S(),
                e = {};
            w(c, (e.bin = d.h, e.type = "error", e), xd(d.g), Xg(a), b());
            if (d = Jf()) e = {}, w(c, (e.v = encodeURIComponent(d), e))
        }])
    }
    var Y = Q(Qg);
    var ah = null;

    function bh(a) {
        var b = ah || C;
        if (!b) return "";
        var c = [];
        if (void 0 === a || !a) {
            if (!b.location || !b.location.href) return "";
            c.push("url=" + encodeURIComponent(b.location.href.substring(0, 512)))
        }
        b.document && b.document.referrer && c.push("referrer=" + encodeURIComponent(b.document.referrer.substring(0, 512)));
        return c.join("&")
    };

    function ch(a) {
        var b = {};
        b.adk = a.fa || 1;
        w(b, Fg(a));
        Y.g.Ha = C.__google_lidar_;
        var c = Xg(Y);
        w(b, c);
        c = bh(void 0 !== c.url);
        uc(c, function(d, e) {
            return b[d] = e
        });
        b.itpl = Number(N(a.s.B, "googleAvItpl")) || 0;
        return b
    };
    var dh = /(?:\[|%5B)([a-zA-Z0-9_]+)(?:\]|%5D)/g;

    function eh(a, b) {
        return a.replace(dh, function(c, d) {
            try {
                var e = null !== b && d in b ? b[d] : void 0;
                if (null == e) return c;
                e = e.toString();
                if ("" == e || !/^[\s\xa0]*$/.test(null == e ? "" : String(e))) return encodeURIComponent(e).replace(/%2C/g, ",")
            } catch (f) {}
            return c
        })
    };

    function fh(a) {
        this.h = a
    }

    function gh(a, b, c) {
        return 14 === c.u || 16 === c.u ? (c = {}, c.VIEWABILITY = b, eh(a, c)) : a + "&" + b
    }
    fh.prototype.g = function(a, b, c) {
        var d = this.h(a);
        w(d, Pa(c, function(e, f) {
            return "id" != f
        }));
        d = void 0 !== d ? Df(Cf(new Af, d)) : "";
        b = Gf(c.id, Eg(a, b), a.R, a.P, a.W);
        b = ia(b);
        for (c = b.next(); !c.done; c = b.next())
            if (c = c.value) c = gh(c, d, a), 1 == M(a.j, "sbeos") ? Hf(c) || Kf(c.toString() + "&sberr=1") : Kf(c);
        return !0
    };

    function hh() {}

    function ih(a, b, c) {
        return 14 === c.u || 16 === c.u ? (c = {}, c.VIEWABILITY = b, eh(a, c)) : a + "&" + b
    }
    hh.prototype.g = function(a, b, c) {
        var d = ch(a);
        w(d, Pa(c, function(e, f) {
            return "id" != f
        }));
        d = void 0 !== d ? Df(Cf(new Af, d)) : "";
        b = Gf(c.id, Eg(a, b), a.R, a.P, a.W);
        b = ia(b);
        for (c = b.next(); !c.done; c = b.next())
            if (c = c.value) c = ih(c, d, a), Kf(c);
        return !0
    };

    function Z(a, b) {
        this.h = !1;
        this.m = a;
        this.l = b
    }
    t(Z, yg);
    Z.prototype.i = function(a, b) {
        b.id = this.l;
        b.vs = lg(a);
        var c = "lidar2" === this.l ? 1 : 2;
        return this.j(a) ? this.m.g(a, c, b) : !1
    };
    Z.prototype.j = function() {
        return !0
    };

    function jh(a) {
        Z.call(this, a, "lidartos")
    }
    t(jh, Z);
    jh.prototype.i = function(a, b) {
        var c = "";
        a.l && (c += "a");
        a.X && (c += "c");
        b.sent = c;
        return Z.prototype.i.call(this, a, b)
    };
    jh.prototype.j = function(a) {
        return a.ia && !a.m && Yf(a.h)
    };

    function kh(a) {
        Z.call(this, a, "lidar2")
    }
    t(kh, Z);
    kh.prototype.j = function(a) {
        return a.m
    };

    function lh(a, b, c) {
        var d = bh(void 0 !== b.url);
        uc(d, function(e, f) {
            return b[e] = f
        });
        v(a, function(e, f) {
            var g = lg(e);
            if (3 != g || 5 != e.u) b.adk = e.fa || f + 1, w(b, Fg(e)), c && (b.avms = c.J()), b.vs = g, b.itpl = Number(N(e.s.B, "googleAvItpl")) || 0, f = new fh(function() {
                return Ta(b)
            }), e.ia && !e.m && Yf(e.h) ? (g = {}, f.g(e, 2, (g.id = "lidar2", g.tsf = 1, g)), e.ia = !1) : (g = {}, f.g(e, 1, (g.id = "lidar2", g)), e.l = !0)
        })
    }

    function mh(a, b) {
        v(a, function(c, d) {
            (new jh(new fh(function() {
                b.adk = c.fa || d + 1;
                w(b, Fg(c));
                b.vs = lg(c);
                b.itpl = Number(N(c.s.B, "googleAvItpl")) || 0;
                return b
            }))).g(c);
            c.ia = !1
        })
    };

    function nh(a) {
        Z.call(this, a, "lidar2")
    }
    t(nh, Z);
    nh.prototype.g = function(a, b) {
        b = void 0 === b ? {} : b;
        b.r = "v";
        Z.prototype.g.call(this, a, b);
        a.l = a.l || this.h
    };
    nh.prototype.j = function(a) {
        return Yf(a.h) && !a.l
    };
    var oh = ["FRAME", "IMG", "IFRAME"],
        ph = /^[01](px)?$/;

    function qh(a, b, c) {
        var d = !0,
            e = !0;
        d = void 0 === d ? !0 : d;
        e = void 0 === e ? !1 : e;
        var f = void 0 === f ? !1 : f;
        if (a = "string" === typeof a ? document.getElementById(a) : a) {
            c || (c = function(r, Ha, Cb) {
                r.addEventListener(Ha, Cb)
            });
            for (var g = !1, h = function(r) {
                    g || (g = !0, b(r))
                }, k, m, p = 0; p < oh.length; ++p)
                if (oh[p] == a.tagName) {
                    m = 3;
                    k = [a];
                    break
                }
            k || (k = a.querySelectorAll(oh.join(",")), m = 2);
            var q = 0,
                P = 0,
                K = a = !1;
            p = {};
            for (var ma = 0; ma < k.length; p = {
                    pa: p.pa
                }, ma++) {
                var y = k[ma];
                if (!("IMG" != y.tagName || !y.complete || y.naturalWidth && y.naturalHeight ? ph.test(y.getAttribute("width")) && ph.test(y.getAttribute("height")) : 1)) {
                    if ("IMG" == y.tagName) var aa = y.naturalWidth && y.naturalHeight ? !0 : !1;
                    else try {
                        aa = "complete" === (y.readyState ? y.readyState : y.contentWindow && y.contentWindow.document && y.contentWindow.document.readyState) ? !0 : !1
                    } catch (r) {
                        aa = void 0 === e ? !1 : e
                    }
                    if (aa) a = !0;
                    else {
                        q++;
                        p.pa = "IMG" === y.tagName;
                        var na = function(r) {
                            return function() {
                                q--;
                                q || h(m);
                                r.pa && (P--, !P && K && h(m))
                            }
                        }(p);
                        c(y, "load", na);
                        p.pa && (P++, c(y, "error", na))
                    }
                }
            }
            k = null;
            if (0 === q && !a && "complete" === u.document.readyState) m = 5;
            else if (q || !a) {
                c(u, "load", function() {
                    f && P ? K = !0 : h(4)
                });
                return
            }
            d && h(m)
        }
    };

    function rh() {
        this.g = this.i = !1;
        $g()
    }

    function sh(a) {
        a.i || (a.i = !0, Y.l = "lidar", Ze(C, "unload", function() {
            th("u")
        }, 171), 1 == M(S().g, "phell") && Ze(C, "pagehide", function() {
            th("ph")
        }, 498))
    }

    function uh() {
        return Ca(X.g, function(a) {
            return !a.l || a.ia || (0 >= ag(hg(a)) ? !1 : Gg(a) && !a.X)
        })
    }

    function vh() {
        if (!uh()) {
            Y.done = !0;
            Jg();
            var a = Y;
            a.m = !1;
            a.h && (R().h.l(a.h), a.h = null);
            a = Ig();
            for (var b, c = 0; c < a.length; ++c) b = a[c], b.s.g && gg(b);
            a = Q(Lg);
            null != a.g && (a.g.F(), a.g = null)
        }
    }

    function wh(a, b) {
        if (S().m) {
            var c = S().m;
            a.h(b, c)
        } else b.Ua()
    }

    function xh(a) {
        var b = void 0 === b ? !0 : b;
        try {
            if (a.g || Y.done) var c = !1;
            else Zd() ? c = !0 : (th("c"), c = !1);
            if (c) {
                a.g = !0;
                var d = V(),
                    e = U();
                Pe = e;
                var f = S();
                f.A = 947190542;
                ah = Ve(C).I;
                var g = Y.g;
                g.Oa = U() - e;
                g.Ga = 0;
                b && yh(a, e, a.ua());
                var h = X.g;
                g.Ga = h.length;
                C.__google_lidar_adblocks_count_ = h.length;
                if (d.j || x(z, "CrKey") || x(z, "PlayStation") || x(z, "Roku") || bf() || x(z, "Xbox") || cf() || df() || !R().h.g())
                    if (1 > h.length) th("n");
                    else {
                        Yg();
                        var k = Q(Lg);
                        if (null == k.h) {
                            var m = 1 == M(f.g, "omid") ? [new zh] : [new Ng([Q(Ah)])];
                            k.h = m
                        }
                        Mg(k, function(p, q) {
                            Bh(p, q)
                        }) ? Y.done || (Ch(), Zg(), Rg()) : d.j ? Bh("w") : Bh("i")
                    }
                else Bh("pv")
            }
        } catch (p) {
            throw Jg(), th("x"), p;
        }
    }

    function Dh(a) {
        var b = X.g;
        S().m = a;
        v(b, function(c) {
            return c.m = !0
        })
    }

    function Ch() {
        $d(R(), Ke(176, function() {
            return th("t")
        }), 36E5)
    }

    function Bh(a, b) {
        Dh(a);
        th(a, b)
    }

    function th(a, b) {
        var c = S();
        if (1 === M(c.g, "omid")) {
            if ("w" !== a && "i" !== a && !c.j) return
        } else if (c.u && !c.l) return;
        Y.i.cancel();
        if (!Y.done && (c = X.g, Tg(Y, c, !0), !Y.done)) {
            var d = za(c, function(f) {
                    return !f.l
                }),
                e = {};
            a = (e.r = a, e);
            b && w(a, b.ba());
            Y.g.Ha = C.__google_lidar_;
            e = Xg(Y, !1);
            w(a, e);
            0 == d.length || lh(d, a, b);
            mh(c, a);
            Y.done = !0
        }
    }

    function Eh(a, b, c, d) {
        var e = S(),
            f = new zg(C, "", b, d, c, sa, [], [new nh(new hh)]);
        c = e.i.g;
        mg(f, ee(c, function(g) {
            for (var h = [], k = 0; k < arguments.length; ++k) h[k] = arguments[k];
            return a.j.apply(a, n(h))
        }), ee(c, function(g) {
            for (var h = [], k = 0; k < arguments.length; ++k) h[k] = arguments[k];
            return a.h.apply(a, n(h))
        }));
        Kg([f]);
        qh(b, ee(c, function() {
            if (f && !f.oa()) {
                wh(a, f);
                if (f.s.B) {
                    var g = f.s,
                        h = !0,
                        k = !0;
                    h = void 0 === h ? !1 : h;
                    k = void 0 === k ? !1 : k;
                    g.g = g.B;
                    g.h = "mue";
                    if (!Ed(g.B)) {
                        var m = Hd(g.B),
                            p = Hd(g.B, !1);
                        Ed(p);
                        Ed(m) ? (g.g = m, g.h = "ie") : h && (k || C !== C.top) && (h = Id(), 1 == h.length && (g.g = h[0], g.h = "ce"))
                    }
                }
                a.g ? (g = Q(Lg), null != g.g && ig(f, g.g), f.s.B && Q(Pg)) : xh(a)
            }
        }), function(g, h, k) {
            Ze(g, h, k, 177)
        });
        return f
    }

    function Fh(a, b, c) {
        c = void 0 === c ? U() : c;
        sh(a);
        !b._avi_ && b.id && Oa(C[b.id + "_avData"], function(e, f) {
            f in Object.prototype || "undefined" == typeof e || (b[f] = e)
        });
        var d = Gh(b);
        return 0 == d || null != Hg(X, b) ? null : Eh(a, b, d, c)
    }
    rh.prototype.ua = function() {
        return []
    };

    function yh(a, b, c) {
        var d = [];
        v(c, function(e) {
            (e = Fh(a, e, b)) && d.push(e)
        });
        return d
    }

    function Gh(a) {
        if (!a) return 0;
        var b = N(a, "googleAvRs");
        if (null != b) switch (Number(b)) {
            case 6:
                return 5;
            case 9:
                return S().u = !0, 8;
            case 15:
                return 14;
            case 16:
                return 15;
            case 17:
                return 16;
            default:
                return 0
        }
        if (!a.id) return 0;
        a = a.id;
        return 0 == a.lastIndexOf("DfaVisibilityIdentifier", 0) ? 5 : 0 == a.lastIndexOf("YtKevlarVisibilityIdentifier", 0) ? 14 : 0 == a.lastIndexOf("YtSparklesVisibilityIdentifier", 0) ? 16 : 0
    }
    rh.prototype.h = function(a, b) {
        if (a && !Y.done && (a.m = !0, !a.l)) {
            var c = new kh(new hh),
                d = {};
            c.g(a, (d.vs = lg(a), d.r = b, d));
            a.l = c.h
        }
        vh()
    };
    rh.prototype.j = function(a) {
        a && (!Y.done && a instanceof zg && (Cg(a), !Y.done && Yf(a.h) && (0 >= ag(hg(a)) ? 0 : Gg(a) && !a.X) && a.D && (Ec(a.D), a.X = !0)), vh())
    };

    function Hh(a, b, c) {
        uf.call(this, null, a, b, c);
        this.j = this.l = null
    }
    t(Hh, W);
    l = Hh.prototype;
    l.J = function() {
        return "omid"
    };
    l.O = function(a) {
        this.g = V().h || new G(0, 0, 0, 0);
        he() && (this.l = a.h, null !== this.l && (this.j = this.l * ag(this.g)));
        W.prototype.O.call(this, a)
    };
    l.La = function(a) {
        return null !== this.l ? this.l : W.prototype.La.call(this, a)
    };
    l.Ka = function(a) {
        return null !== this.j ? (a = ag(V().g), 0 === a ? 0 : this.j / a) : W.prototype.Ka.call(this, a)
    };
    l.Ja = function(a, b) {
        return null !== this.j ? (a = ag(b), 0 === a ? 0 : this.j / a) : W.prototype.Ja.call(this, a, b)
    };
    var Ih = {},
        Jh = (Ih.notFound = !0, Ih.hidden = !0, Ih.backgrounded = !0, Ih);

    function Kh() {
        mf.call(this, C, 2, "omid");
        this.R = H.g();
        var a = H.g();
        this.Z = !(!a.g && !a.h);
        this.A = [];
        this.H = this.S = this.l = this.o = this.M = this.D = this.L = this.i = this.ea = void 0;
        this.$ = "normal";
        this.aa = this.Y = !1
    }
    t(Kh, mf);

    function Lh(a) {
        a.R.addEventListener("geometryChange", function(b) {
            Mh(397, function() {
                return Nh(a, b)
            })
        })
    }

    function Oh(a) {
        function b(c) {
            Mh(399, function() {
                return Ph(a, c)
            })
        }
        v("loaded start firstQuartile midpoint thirdQuartile complete pause resume bufferStart bufferFinish skipped volumeChange playerStateChange adUserInteraction impression".split(" "), function(c) {
            a.R.addEventListener(c, b)
        })
    }

    function Qh(a) {
        id(a.R, function(b) {
            Mh(398, function() {
                return Rh(a, b)
            })
        })
    }

    function Nh(a, b) {
        Sh(b, function(c, d, e, f) {
            e = f.viewport;
            c = V().i;
            d = V().g;
            null != e && null != e.width && null != e.height && (c = (new E(e.width, e.height)).floor(), d = (new G(0, e.width, e.height, 0)).floor());
            var g = f.adView,
                h = g.geometry,
                k = g.onScreenGeometry;
            f = new G(0, 0, 0, 0);
            e = new G(0, 0, 0, 0);
            var m = null;
            Th(k) && Th(h) && (f = (new G(k.y, k.x + k.width, k.y + k.height, k.x)).floor(), e = (new G(h.y, h.x + h.width, h.y + h.height, h.x)).floor(), he() ? m = g.percentageInView / 100 : 0 < h.width && 0 < h.height && (m = k.width * k.height / (h.width * h.height)));
            a.A = g.reasons || [];
            (g = !Ca(a.A, function(p) {
                return Jh[p]
            })) && null !== m && 0 < m && (a.aa = !0, a.Y && (S().j = !0));
            Uh(a, c, d, e, f, m, g, a.h.volume)
        })
    }

    function Ph(a, b) {
        Sh(b, function(c, d, e, f) {
            if ("impression" === e) a.Y = !0, a.aa && (S().j = !0);
            else {
                c = a.h.volume;
                d = !1;
                if (Fa(["start", "volumeChange"], e)) {
                    a: {
                        if ("number" === typeof f.deviceVolume) {
                            if ("number" === typeof f.Ab) {
                                c = f.Ab * f.deviceVolume;
                                break a
                            }
                            if ("number" === typeof f.videoPlayerVolume) {
                                c = f.videoPlayerVolume * f.deviceVolume;
                                break a
                            }
                        }
                        c = null
                    }
                    null != c && (a.h.volume = c, d = !0)
                }
                "playerStateChange" == e && null != f.state && (a.$ = f.state, d = !0);
                var g = V();
                d && Uh(a, g.i, g.g, g.h, a.h.g, a.h.h, a.h.i, c)
            }
            if ("impression" == e || "loaded" == e) f.creativeType ? a.D = f.creativeType : f.mediaType && (a.D = "video" == f.mediaType ? "video" : "native" == a.H ? "nativeDisplay" : "htmlDisplay");
            Vh(a, e)
        })
    }

    function Rh(a, b) {
        Sh(b, function(c, d, e, f) {
            if ("sessionStart" == e && f.context) {
                if (c = f.verificationParameters) c = JSON.parse(c), (c = (d = c.tracking_configuration) ? d.tracking_events : c.tracking_events) && c.verification_debug && (a.S = c.verification_debug[0]);
                a.ea = f.verificationParameters;
                a.i = f.context.app;
                a.H = f.context.adSessionType;
                a.L = f.context.accessMode;
                a.M = f.context.environment;
                f.context.omidNativeInfo && f.context.omidNativeInfo.partnerName ? a.o = f.context.omidNativeInfo.partnerName : f.context.omidJsInfo && f.context.omidJsInfo.partnerName && (a.o = f.context.omidJsInfo.partnerName);
                f.context.omidNativeInfo && f.context.omidNativeInfo.partnerVersion ? a.l = f.context.omidNativeInfo.partnerVersion : f.context.omidJsInfo && f.context.omidJsInfo.partnerVersion && (a.l = f.context.omidJsInfo.partnerVersion)
            }["sessionStart", "sessionError"].includes(e) && Vh(a, e)
        })
    }

    function Vh(a, b) {
        if (a.S) {
            var c = {};
            switch (b) {
                case "sessionStart":
                    var d = "ss";
                    break;
                case "loaded":
                    d = "oml";
                    break;
                case "start":
                    d = "ps";
                    break;
                case "impression":
                    d = "i";
                    break;
                case "sessionError":
                    d = "se"
            }
            d && (c.DEBUG_MESSAGE = d + "&opn=" + a.o + "&opv=" + a.l);
            0 < Object.entries(c).length && (a = eh(a.S, c), Kf(a))
        }
    }

    function Th(a) {
        return null != a && Da(function(b) {
            return a.hasOwnProperty(b)
        })
    }

    function Sh(a, b) {
        null != a && null != a.adSessionId && null != a.timestamp && null != a.type ? b(a.adSessionId, a.timestamp, a.type, a.data || {}) : (a = Error("OMSDK event missing some data: " + JSON.stringify(a)), Me(543, a))
    }

    function Mh(a, b) {
        try {
            b.apply()
        } catch (c) {
            Me(a, c)
        }
    }

    function Uh(a, b, c, d, e, f, g, h) {
        var k = Q(ng);
        if (k.i !== g) {
            k.i = g;
            k = ia(k.h);
            for (var m = k.next(); !m.done; m = k.next()) m = m.value, m(null)
        }
        "minimized" == a.$ && (e = new G(0, 0, 0, 0));
        k = V();
        e = e || new G(0, 0, 0, 0);
        m = rf(a);
        k.i = b;
        k.g = c;
        k.h = d;
        m.g = e;
        m.h = f;
        m.i = g;
        m.volume = h;
        a.O(m)
    }
    l = Kh.prototype;
    l.za = function() {};
    l.Aa = function() {};
    l.Ya = function() {};
    l.Za = function() {};
    l.qa = function() {
        var a = S();
        return 6 === a.h || 5 === a.h ? this.T() : 1 == M(a.g, "omid") && this.T()
    };
    l.T = function() {
        return this.Z
    };
    l.Ma = function() {
        var a = {},
            b = S();
        this.T() && M(b.g, "sloi") && (ta(this.A) && 0 < this.A.length && (a.omidr = Aa(Ja(this.A, 0, 5), function(c) {
            return String(c).slice(0, 2)
        }).join(",")), this.i && (this.i.libraryVersion && (a.omidv = this.i.libraryVersion), this.i.appId && (a.omida = this.i.appId)), this.o && (a.omidp = this.o), this.H && (a.omids = this.H.charAt(0)), this.l && (a.omidpv = this.l.substring(0, 30)), this.L && (a.omidam = this.L.charAt(0)), this.D && (a.omidct = this.D.charAt(0)), this.M && (a.omidia = "app" == this.M ? 1 : 0));
        return a
    };
    l.ja = function() {
        var a = this;
        if (this.u || !this.Z) return !this.ha();
        this.u = !0;
        Mh(391, function() {
            return Qh(a)
        });
        Mh(390, function() {
            return Lh(a)
        });
        Mh(392, function() {
            return Oh(a)
        });
        return !0
    };

    function zh() {
        wf.call(this, Q(Kh))
    }
    t(zh, wf);
    l = zh.prototype;
    l.J = function() {
        return "omid"
    };
    l.ib = function(a, b, c) {
        return new Hh(this.g, b, c)
    };
    l.Ba = function() {
        return this.g.T()
    };
    l.Ca = function() {
        return this.g.qa()
    };
    l.Na = function() {
        this.g.ja();
        return !0
    };
    l.F = function() {
        this.g.F();
        wf.prototype.F.call(this)
    };

    function Ah() {
        mf.call(this, C, 2, "mraid");
        this.D = 0;
        this.o = this.A = !1;
        this.l = null;
        this.i = We(this.I);
        this.h.g = new G(0, 0, 0, 0);
        this.H = !1
    }
    t(Ah, mf);
    l = Ah.prototype;
    l.T = function() {
        return null != this.i.K
    };
    l.Ma = function() {
        var a = {};
        this.D && (a.mraid = this.D);
        this.A && (a.mlc = 1);
        a.mtop = this.i.Cb;
        this.l && (a.mse = this.l);
        this.H && (a.msc = 1);
        a.mcp = this.i.ta;
        return a
    };
    l.V = function(a, b) {
        for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d];
        try {
            return this.i.K[a].apply(this.i.K, c)
        } catch (e) {
            Me(538, e, .01, function(f) {
                f.method = a
            })
        }
    };

    function Wh(a, b, c) {
        a.V("addEventListener", b, c)
    }
    l.ja = function() {
        var a = this;
        if (this.u) return !this.ha();
        this.u = !0;
        if (2 === this.i.ta) return this.l = "ng", nf(this), !1;
        if (1 === this.i.ta) return this.l = "mm", nf(this), !1;
        V().u = !0;
        this.I.document.readyState && "complete" == this.I.document.readyState ? Xh(this) : Ze(this.I, "load", function() {
            $d(R(), Ke(292, function() {
                return Xh(a)
            }), 100)
        }, 292);
        return !0
    };

    function Xh(a) {
        S().l = !!a.V("isViewable");
        Wh(a, "viewableChange", Yh);
        "loading" === a.V("getState") ? Wh(a, "ready", Zh) : $h(a)
    }

    function $h(a) {
        "string" === typeof a.i.K.AFMA_LIDAR ? (a.A = !0, ai(a)) : (a.i.ta = 3, a.l = "nc", nf(a))
    }

    function ai(a) {
        a.o = !1;
        var b = 1 == M(S().g, "rmmt"),
            c = !!a.V("isViewable");
        (b ? !c : 1) && $d(R(), Ke(524, function() {
            a.o || (bi(a), Me(540, Error()), a.l = "mt", nf(a))
        }), 500);
        ci(a);
        Wh(a, a.i.K.AFMA_LIDAR, di)
    }

    function ci(a) {
        var b = 1 == M(S().g, "sneio"),
            c = void 0 !== a.i.K.AFMA_LIDAR_EXP_1,
            d = void 0 !== a.i.K.AFMA_LIDAR_EXP_2;
        (b = b && d) && (a.i.K.AFMA_LIDAR_EXP_2 = !0);
        c && (a.i.K.AFMA_LIDAR_EXP_1 = !b)
    }

    function bi(a) {
        a.V("removeEventListener", a.i.K.AFMA_LIDAR, di);
        a.A = !1
    }
    l.za = function() {
        var a = V(),
            b = ei(this, "getMaxSize");
        a.g = new G(0, b.width, b.height, 0)
    };
    l.Aa = function() {
        V().i = ei(this, "getScreenSize")
    };

    function ei(a, b) {
        if ("loading" === a.V("getState")) return new E(-1, -1);
        b = a.V(b);
        if (!b) return new E(-1, -1);
        a = parseInt(b.width, 10);
        b = parseInt(b.height, 10);
        return isNaN(a) || isNaN(b) ? new E(-1, -1) : new E(a, b)
    }
    l.F = function() {
        bi(this);
        mf.prototype.F.call(this)
    };

    function Zh() {
        try {
            var a = Q(Ah);
            a.V("removeEventListener", "ready", Zh);
            $h(a)
        } catch (b) {
            Me(541, b)
        }
    }

    function di(a, b) {
        try {
            var c = Q(Ah);
            c.o = !0;
            var d = a ? new G(a.y, a.x + a.width, a.y + a.height, a.x) : new G(0, 0, 0, 0);
            var e = rf(c);
            e.g = d;
            e.volume = b;
            c.O(e)
        } catch (f) {
            Me(542, f)
        }
    }

    function Yh(a) {
        var b = S(),
            c = Q(Ah);
        a && !b.l && (b.l = !0, c.H = !0, c.l && nf(c, !0))
    };

    function fi() {
        rh.call(this)
    }
    t(fi, rh);
    l = fi.prototype;
    l.zb = function() {
        var a = this;
        if (C.__google_lidar_) {
            if (C.__google_lidar_ += 1, C.__google_lidar_adblocks_count_) {
                var b = C.__google_lidar_radf_;
                b && "function" === typeof b && b()
            }
        } else {
            C.__google_lidar_ = 1;
            sh(this);
            b = S();
            b.h = 2;
            b = b.i.g;
            C.__google_lidar_radf_ = ee(b, function(d) {
                for (var e = [], f = 0; f < arguments.length; ++f) e[f] = arguments[f];
                return a.Bb.apply(a, n(e))
            });
            var c = C.document.readyState;
            c && "complete" === c ? this.Pa() : (hc(C, "load", ee(b, function() {
                $d(R(), Ke(172, function(d) {
                    for (var e = [], f = 0; f < arguments.length; ++f) e[f] = arguments[f];
                    return a.ub.apply(a, n(e))
                }), 100)
            })), Ze(C, "DOMContentLoaded", function(d) {
                for (var e = [], f = 0; f < arguments.length; ++f) e[f] = arguments[f];
                return a.Pa.apply(a, n(e))
            }, 173))
        }
    };
    l.ub = function() {
        var a = this;
        v(X.g, function(b) {
            return wh(a, b)
        });
        this.Pa()
    };
    l.Pa = function() {
        var a = U(),
            b = this.ua();
        if (b.length)
            if (this.g) try {
                yh(this, a, b)
            } catch (c) {} else xh(this)
    };
    l.Bb = function() {
        var a = this.ua();
        if (a.length) try {
            var b = yh(this, U(), a);
            v(b, function(c) {
                c.jb = !0
            })
        } catch (c) {}
    };
    l.ua = function() {
        return Ma(Aa(Ue, function(a) {
            return Ia(mc(a, void 0))
        }))
    };
    Je(378, function(a) {
        for (var b = [], c = 0; c < arguments.length; ++c) b[c] = arguments[c];
        var d;
        return (d = Q(fi)).zb.apply(d, n(b))
    });
}).call(this, this, this.document);