"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmoothScroll = void 0;
const virtual_scroll_1 = __importDefault(require("virtual-scroll"));
const ssr_window_1 = require("ssr-window");
const utils_1 = require("@emotionagency/utils");
const instance_js_1 = __importDefault(require("tiny-emitter/instance.js"));
const ScrollBar_1 = __importDefault(require("./Scrollbar/ScrollBar"));
const state_1 = require("./state");
const opts_1 = require("./opts");
const keyCodes_1 = require("./keyCodes");
const window = (0, ssr_window_1.getWindow)();
const document = (0, ssr_window_1.getDocument)();
class SmoothScroll {
    constructor(opts) {
        this.opts = opts;
        this.current = 0;
        this.min = 0;
        this.isRendered = false;
        this.isInited = false;
        this.opts = (0, opts_1.getOpts)(opts);
        this.state = new state_1.State();
        this.raf = this.opts.raf || utils_1.raf;
        this.state.target = opts.saveScrollPosition
            ? +window.localStorage.getItem('ess') || 0
            : 0;
        this.bounds();
        utils_1.resize.on(this.resize);
    }
    bounds() {
        const methods = ['resize', 'animate', 'onKeyDown'];
        methods.forEach(fn => (this[fn] = this[fn].bind(this)));
    }
    init() {
        var _a;
        this.max = this.maxValue;
        this.scroll();
        this.raf.on(this.animate);
        if (this.opts.scrollbar) {
            this.scrollbar = new ScrollBar_1.default(this.opts.el, this.state, this.raf);
        }
        this.isInited = true;
        this.isFixed = (_a = this.opts.isFixed) !== null && _a !== void 0 ? _a : false;
    }
    resize() {
        if (!this.opts.mobile && window.innerWidth <= this.opts.breakpoint) {
            this.isInited && this.destroy();
            this.isInited = false;
        }
        else {
            !this.isInited && this.init();
            this.isFixed = false;
        }
    }
    get maxValue() {
        return this.opts.el.scrollHeight - window.innerHeight;
    }
    scroll() {
        this.vs = new virtual_scroll_1.default(Object.assign(Object.assign({}, this.opts), { useKeyboard: false }));
        this.vs.on((e) => {
            if (this.canScroll) {
                let deltaDir = 0;
                if (this.opts.axis === opts_1.ScrollAxis.y) {
                    deltaDir = e.deltaY;
                }
                if (this.opts.axis === opts_1.ScrollAxis.x) {
                    deltaDir = e.deltaX;
                }
                if (this.opts.axis === opts_1.ScrollAxis.both) {
                    deltaDir = e.deltaY || e.deltaX;
                }
                const delta = (0, utils_1.clamp)(deltaDir, -this.opts.clampScrollDelta, this.opts.clampScrollDelta);
                this.state.target -= delta * this.opts.stepSize;
                this.state.target = (0, utils_1.clamp)(this.state.target, this.min, this.max);
                if (this.opts.saveScrollPosition) {
                    localStorage.setItem('ess', String(this.state.target));
                }
            }
        });
        if (this.opts.useKeyboard) {
            window.addEventListener('keydown', this.onKeyDown, false);
        }
    }
    on(cb) {
        instance_js_1.default.on('animate', (scrollPosition) => {
            cb(scrollPosition);
        });
    }
    get canScroll() {
        return !this.isFixed && this.opts.el.scrollHeight > window.innerHeight;
    }
    get isFixed() {
        return this.state.isFixed;
    }
    set isFixed(val) {
        this.state.isFixed = val;
        if (val) {
            this.opts.el.classList.add('e-fixed');
        }
        else {
            this.opts.el.classList.remove('e-fixed');
        }
    }
    detectScrolling() {
        const s = this.state.scrollbar;
        const dif = Math.abs(Math.round(this.state.target) - Math.round(this.current));
        if (dif >= 1 || s) {
            this.state.scrolling = true;
        }
        else {
            this.state.scrolling = false;
        }
    }
    animate() {
        this.detectScrolling();
        this.max = this.maxValue;
        if (this.state.scrolling) {
            this.current = (0, utils_1.lerp)(this.current, this.state.target, this.opts.friction);
            this.current = Math.round(this.current * 100) / 100;
            this.opts.el.scrollTop = this.current;
            this.state.scrolled = this.current;
            instance_js_1.default.emit('animate', this.current);
        }
    }
    onKeyDown(e) {
        if (this.canScroll) {
            switch (e.key) {
                case keyCodes_1.keyCodes.TAB:
                    this.state.target = document.activeElement.getBoundingClientRect().y;
                    break;
                case keyCodes_1.keyCodes.UP:
                    this.state.target -= 240;
                    break;
                case keyCodes_1.keyCodes.DOWN:
                    this.state.target += 240;
                    break;
                case keyCodes_1.keyCodes.PAGEUP:
                    this.state.target -= window.innerHeight;
                    break;
                case keyCodes_1.keyCodes.PAGEDOWN:
                    this.state.target += window.innerHeight;
                    break;
                case keyCodes_1.keyCodes.HOME:
                    this.state.target = this.min;
                    break;
                case keyCodes_1.keyCodes.END:
                    this.state.target = this.max;
                    break;
                default:
                    return;
            }
        }
        this.state.target = (0, utils_1.clamp)(this.state.target, this.min, this.max);
    }
    reset() {
        var _a;
        this.state.target = 0;
        this.current = 0;
        this.opts.el.scrollTop = 0;
        (_a = this.scrollbar) === null || _a === void 0 ? void 0 : _a.reset();
    }
    destroy() {
        this.raf.off(this.animate);
        utils_1.resize.off(this.animate);
        this.vs && this.vs.destroy();
        this.scrollbar && this.scrollbar.destroy();
        window.removeEventListener('keydown', this.onKeyDown);
    }
}
exports.SmoothScroll = SmoothScroll;
//# sourceMappingURL=SmoothScroll.js.map