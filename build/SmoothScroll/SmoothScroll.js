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
const isFixed_1 = require("../isFixed");
class SmoothScroll {
    constructor(opts) {
        this.opts = opts;
        this.current = 0;
        this.min = 0;
        this.opts = opts_1.getOpts(opts);
        this.init();
    }
    bounds() {
        const methods = ['resize', 'animate'];
        methods.forEach(fn => (this[fn] = this[fn].bind(this)));
    }
    init() {
        this.bounds();
        utils_1.resize.on(this.resize);
        state_1.state.target = 0;
        this.max = this.maxValue;
        this.scroll();
        utils_1.raf.on(this.animate);
        this.scrollbar = this.opts.scrollbar && new ScrollBar_1.default();
    }
    resize() {
        if (!this.opts.mobile && window.innerWidth <= this.opts.breakpoint) {
            this.destroy();
        }
    }
    get maxValue() {
        return this.opts.el.scrollHeight - window.innerHeight;
    }
    scroll() {
        this.vs = new virtual_scroll_1.default(Object.assign({}, this.opts));
        this.vs.on((e) => {
            if (this.canScroll) {
                state_1.state.target -= e.deltaY * this.opts.stepSize;
                state_1.state.target = utils_2.clamp(state_1.state.target, this.min, this.max);
            }
        });
    }
    get canScroll() {
        return !isFixed_1.isFixed() && this.opts.el.scrollHeight > window.innerHeight;
    }
    detectScrolling() {
        const s = state_1.state.scrollbar;
        const dif = Math.abs(Math.round(state_1.state.target) - Math.round(this.current));
        if (dif >= 1 || s) {
            state_1.state.scrolling = true;
        }
        else {
            state_1.state.scrolling = false;
        }
    }
    animate() {
        this.detectScrolling();
        if (state_1.state.scrolling) {
            this.max = this.maxValue;
            this.current = utils_2.lerp(this.current, state_1.state.target, this.opts.friction);
            this.current = Math.round(this.current * 100) / 100;
            this.opts.el.scrollTop = this.current;
            state_1.state.scrolled = this.current;
        }
    }
    reset() {
        state_1.state.target = 0;
        this.current = 0;
        this.opts.el.scrollTop = 0;
    }
    destroy() {
        state_1.state.target = 0;
        state_1.state.scrolled = 0;
        state_1.state.scrolling = false;
        utils_1.raf.off(this.animate);
        utils_1.resize.off(this.animate);
        this.vs && this.vs.destroy();
        this.scrollbar && this.scrollbar.destroy();
    }
}
exports.SmoothScroll = SmoothScroll;
//# sourceMappingURL=SmoothScroll.js.map