"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmoothScroll = void 0;
const virtual_scroll_1 = __importDefault(require("virtual-scroll"));
const utils_1 = require("@emotionagency/utils");
const ScrollBar_1 = __importDefault(require("./Scrollbar/ScrollBar"));
const state_1 = require("./state");
const utils_2 = require("@emotionagency/utils");
const opts_1 = require("./opts");
class SmoothScroll {
    constructor(opts) {
        this.opts = opts;
        this.current = 0;
        this.min = 0;
        this.isRendered = false;
        this.isInited = false;
        this.opts = opts_1.getOpts(opts);
        this.state = new state_1.State();
        this.bounds();
        utils_1.resize.on(this.resize);
    }
    bounds() {
        const methods = ['resize', 'animate'];
        methods.forEach(fn => (this[fn] = this[fn].bind(this)));
    }
    init() {
        this.state.target = 0;
        this.max = this.maxValue;
        this.scroll();
        utils_1.raf.on(this.animate);
        this.scrollbar =
            this.opts.scrollbar && new ScrollBar_1.default(this.opts.el, this.state);
        this.isInited = true;
    }
    resize() {
        if (!this.opts.mobile && window.innerWidth <= this.opts.breakpoint) {
            this.isInited && this.destroy();
            this.isInited = false;
        }
        else {
            !this.isInited && this.init();
        }
    }
    get maxValue() {
        return this.opts.el.scrollHeight - window.innerHeight;
    }
    scroll() {
        this.vs = new virtual_scroll_1.default(Object.assign({}, this.opts));
        this.vs.on((e) => {
            if (this.canScroll) {
                this.state.target -= e.deltaY * this.opts.stepSize;
                this.state.target = utils_2.clamp(this.state.target, this.min, this.max);
            }
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
            this.current = utils_2.lerp(this.current, this.state.target, this.opts.friction);
            this.current = Math.round(this.current * 100) / 100;
            this.opts.el.scrollTop = this.current;
            this.state.scrolled = this.current;
        }
    }
    reset() {
        this.state.target = 0;
        this.current = 0;
        this.opts.el.scrollTop = 0;
    }
    destroy() {
        this.state.target = 0;
        this.state.scrolled = 0;
        this.state.scrolling = false;
        utils_1.raf.off(this.animate);
        utils_1.resize.off(this.animate);
        this.vs && this.vs.destroy();
        this.scrollbar && this.scrollbar.destroy();
    }
}
exports.SmoothScroll = SmoothScroll;
//# sourceMappingURL=SmoothScroll.js.map