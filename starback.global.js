var Starback = (() => {
    var D = Object.defineProperty;
    var x = Object.getOwnPropertySymbols;
    var F = Object.prototype.hasOwnProperty
        , q = Object.prototype.propertyIsEnumerable;
    var S = (s, t, i) => t in s ? D(s, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: i
    }) : s[t] = i
        , c = (s, t) => {
            for (var i in t || (t = {}))
                F.call(t, i) && S(s, i, t[i]);
            if (x)
                for (var i of x(t))
                    q.call(t, i) && S(s, i, t[i]);
            return s
        }
        ;
    var d = (s, t) => () => (s && (t = s(s = 0)),
        t);
    var L = (s, t) => () => (t || s((t = {
        exports: {}
    }).exports, t),
        t.exports);
    function a(s, t) {
        return Math.floor(Math.random() * (t - s) + 1) + s
    }
    function l(s) {
        return s[Math.floor(Math.random() * s.length)]
    }
    function m(s) {
        return Math.sin(s * (Math.PI / 180))
    }
    function y(s) {
        return Math.cos(s * (Math.PI / 180))
    }
    var g = d(() => { }
    );
    var p, w, C = d(() => {
        g();
        p = class {
            constructor(t, i) {
                this.stars = [];
                this.config = {
                    quantity: 100,
                    direction: 100,
                    speed: [.5, .8],
                    backgroundColor: "#ccc",
                    starColor: "white",
                    starSize: [0, 3]
                };
                this.overflowSize = 10;
                this.canvas = null;
                this.ctx = null;
                this.config = c(c({}, this.config), i),
                    this.canvas = t,
                    this.ctx = t.getContext("2d")
            }
            draw() {
                for (let t = 0; t < this.stars.length; t++) {
                    let i = this.stars[t];
                    this.ctx.beginPath(),
                        this.ctx.fillStyle = this.config.starColor,
                        this.ctx.save(),
                        this.ctx.globalAlpha = i.opacity,
                        this.ctx.arc(i.x, i.y, i.size, 0, Math.PI * 2),
                        this.ctx.fill(),
                        this.ctx.restore(),
                        this.ctx.closePath()
                }
            }
            update() {
                let t = m(this.config.direction)
                    , i = y(this.config.direction);
                for (let r = 0; r < this.stars.length; r++) {
                    let h = this.stars[r];
                    if (h.x += t * h.speed,
                        h.y += i * h.speed,
                        h.x > this.canvas.width + this.overflowSize || h.x < 0 - this.overflowSize || h.y > this.canvas.height + this.overflowSize || h.y < 0 - this.overflowSize) {
                        this.stars.splice(r, 1);
                        let o, n, e;
                        i == -1 || i == 1 ? (e = 0,
                            o = a(e, this.canvas.width),
                            n = i == 1 ? 0 : this.canvas.height) : t == -1 || t == 1 ? (e = t == 1 ? 0 : this.canvas.width,
                                o = e + this.overflowSize * -t,
                                n = a(0, this.canvas.height)) : t > 0 && i > 0 ? (e = -this.overflowSize,
                                    o = l([e, a(e, this.canvas.width - this.overflowSize)]),
                                    n = o == e ? a(e, this.canvas.height - this.overflowSize) : -this.overflowSize) : t < 0 && i > 0 ? (e = -this.canvas.width + this.overflowSize,
                                        o = l([e, a(e, 0 + this.overflowSize)]),
                                        n = o == e ? a(e, 0 - this.canvas.height + this.overflowSize) : -this.overflowSize) : t < 0 && i < 0 ? (e = this.canvas.width + this.overflowSize,
                                            o = l([e, a(e, 0 + this.overflowSize)]),
                                            n = o == e ? a(e, 0 + this.overflowSize) : this.canvas.height + this.overflowSize) : t > 0 && i < 0 && (e = -this.overflowSize,
                                                o = l([e, a(e, this.canvas.width - this.overflowSize)]),
                                                n = o == e ? a(e, this.canvas.height - this.overflowSize) : this.canvas.height + this.overflowSize);
                        let A = {
                            x: o,
                            y: n
                        };
                        this.generate(1, A)
                    }
                }
            }
            generate(t, i = null) {
                if (i) {
                    let { x: r, y: h } = i
                        , o = {
                            x: r,
                            y: h,
                            size: this.randomSize(),
                            opacity: this.randomOpacity(),
                            speed: this.randomSpeed()
                        };
                    return this.stars.push(o)
                }
                for (let r = 0; r < t; r++) {
                    let h = a(0, this.canvas.width)
                        , o = a(0, this.canvas.height);
                    this.stars.push({
                        x: h,
                        y: o,
                        size: this.randomSize(),
                        opacity: this.randomOpacity(),
                        speed: this.randomSpeed()
                    })
                }
            }
            randomSize() {
                return typeof this.config.starSize == "object" ? a(this.config.starSize[0], this.config.starSize[1]) : this.config.starSize
            }
            randomOpacity() {
                let t = this.config.randomOpacity;
                return typeof t == "boolean" ? t ? (t ? Math.random() : 1).toFixed(2) : 1 : (Math.random() * (t[1] - t[0]) + t[0]).toFixed(2)
            }
            randomSpeed() {
                let t = this.config.speed;
                return Array.isArray(t),
                    Math.random() * (t[1] - t[0]) + t[0]
            }
        }
            ,
            w = p
    }
    );
    var v, b, z = d(() => {
        g();
        v = class {
            constructor(t, i) {
                this.stars = [];
                this.config = {
                    type: "line",
                    slope: {
                        x: 1,
                        y: 1
                    },
                    frequency: 10,
                    speed: 2,
                    starSize: 100,
                    starColor: ["#fb00ff", "#00dde0"],
                    spread: 1,
                    directionY: -1,
                    directionX: 1,
                    distanceX: .1,
                    quantity: 200
                };
                this.direction = 225;
                this.canvas = null;
                this.ctx = null;
                this.config = c(c({}, this.config), i),
                    this.canvas = t,
                    this.ctx = t.getContext("2d")
            }
            draw() {
                this.ctx.strokeStyle = "white",
                    this.stars.forEach(t => {
                        let i;
                        Array.isArray(this.config.starColor) ? (i = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height),
                            this.config.starColor.forEach((r, h) => i.addColorStop(h / this.config.starColor.length, r))) : i = this.config.starColor,
                            this.ctx.save(),
                            this.ctx.strokeStyle = i,
                            this.ctx.beginPath(),
                            this.ctx.moveTo(t.start.x, t.start.y),
                            this.ctx.setLineDash([this.config.starSize, t.startPoint * this.config.frequency]),
                            this.ctx.lineDashOffset = this.config.directionY * (t.progress + t.length),
                            this.ctx.quadraticCurveTo(t.curve.x, t.curve.y, t.end.x, t.end.y),
                            this.ctx.stroke(),
                            this.ctx.closePath(),
                            this.ctx.restore()
                    }
                    )
            }
            update() {
                this.stars.map((t, i) => {
                    t.progress += t.speed
                }
                )
            }
            generate() {
                for (let t = 0; t < this.config.quantity; t++) {
                    let i = a(-20, this.canvas.width)
                        , r = i <= 0 ? a(0, this.canvas.height) : 0
                        , h = 100
                        , o = i + (this.canvas.width * this.config.distanceX + this.config.spread * i * this.config.directionX)
                        , n = o - i
                        , e = this.canvas.height;
                    this.stars.push({
                        x: i,
                        y: r,
                        length: e,
                        height: h,
                        progress: 0,
                        speed: this.config.speed + Math.random() / 5,
                        lineDash: a(50, 100),
                        filter: {
                            opacity: l([a(20, 100) + "%", !1])
                        },
                        start: {
                            x: i,
                            y: r
                        },
                        curve: {
                            x: i + n * this.config.slope.x,
                            y: r + this.canvas.height * this.config.slope.y
                        },
                        startPoint: a(10, 100),
                        end: {
                            x: o,
                            y: this.canvas.height
                        }
                    })
                }
                return this.stars
            }
        }
            ,
            b = v
    }
    );
    var k, u, f, T = d(() => {
        C();
        z();
        k = {
            width: 800,
            height: 600,
            randomOpacity: !0,
            showFps: !1,
            type: "dot"
        },
            u = class {
                constructor(t, i = {}) {
                    this.config = {};
                    this.stars = null;
                    this.canvas = null;
                    this.starTypes = {
                        dot: w,
                        line: b
                    };
                    this.fps = 0;
                    this.repeat = 0;
                    this.lastCalledTime = 0;
                    this.lastGenerated = 0;
                    this.frontCallbacks = [];
                    this.behindCallbacks = [];
                    this.canvas = t instanceof HTMLCanvasElement ? t : document.querySelector(t),
                        this.ctx = this.canvas.getContext("2d"),
                        this.mergeConfig(i),
                        this.frontCallbacks = [],
                        this.behindCallbacks = [],
                        this.init()
                }
                static create(t, i = {}) {
                    return new u(t, i)
                }
                mergeConfig(t) {
                    let i = c(c({}, k), t);
                    this.config = i
                }
                init() {
                    this.canvas.setAttribute("width", this.config.width),
                        this.canvas.setAttribute("height", this.config.height),
                        this.stars = new this.starTypes[this.config.type](this.canvas, this.config),
                        this.generateStar(),
                        requestAnimationFrame(t => this.render(t))
                }
                setBackground() {
                    let t;
                    typeof this.config.backgroundColor == "string" ? t = this.config.backgroundColor : typeof this.config.backgroundColor == "object" && (t = this.ctx.createLinearGradient(this.canvas.width / 2, 0, this.canvas.width / 2, this.canvas.height),
                        this.config.backgroundColor.forEach((i, r) => {
                            t.addColorStop(r / this.config.backgroundColor.length, i)
                        }
                        )),
                        this.ctx.fillStyle = t,
                        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
                }
                draw() {
                    this.behindCallbacks.forEach(t => t(this.ctx)),
                        this.stars.draw(),
                        this.frontCallbacks.forEach(t => t(this.ctx)),
                        this.config.showFps && this.drawFps()
                }
                update() {
                    this.stars.update()
                }
                addToFront(t) {
                    this.frontCallbacks.push(t)
                }
                addToBehind(t) {
                    this.behindCallbacks.push(t)
                }
                generateStar() {
                    this.stars.generate(this.config.quantity)
                }
                drawFps() {
                    this.ctx.fillStyle = "white",
                        this.ctx.fillText(`${this.fps} fps`, 10, 10)
                }
                render(t) {
                    this.lastCalledTime || (this.lastCalledTime = t);
                    let i = t - this.lastCalledTime;
                    this.fps = Math.round(1e3 / i),
                        this.lastCalledTime = t,
                        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height),
                        this.setBackground(),
                        this.draw(),
                        this.update(),
                        requestAnimationFrame(r => this.render(r))
                }
            }
            ,
            f = u;
        f.DefaultConfig = k
    }
    );
    var P = L((J, M) => {
        T();
        M.exports = f
    }
    );
    return P();
}
)();