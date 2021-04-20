"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollbarDrag = void 0;
const utils_1 = require("@emotionagency/utils");
const state_1 = require("../state");
class ScrollbarDrag {
    constructor(options) {
        this.options = options;
        this.events = {
            start: ['mousedown', 'touchstart'],
            move: ['mousemove', 'touchmove'],
            end: ['mouseup', 'touchend'],
        };
        this.bounds();
        this.init();
    }
    bounds() {
        const methods = ['start', 'update', 'end'];
        methods.forEach(fn => (this[fn] = this[fn].bind(this)));
    }
    init() {
        var _a, _b;
        this.events.start.forEach(name => {
            var _a, _b;
            (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.$scrollbar) === null || _b === void 0 ? void 0 : _b.addEventListener(name, this.start, {
                passive: false,
            });
        });
        this.events.end.forEach(name => {
            var _a, _b, _c;
            (_c = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.$scrollbar) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.addEventListener(name, this.end, {
                passive: false,
            });
        });
        document.body.addEventListener('mouseleave', this.end);
        screen.width > 960 &&
            ((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.$scrollbar) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.update));
    }
    get sizes() {
        const height = this.options.$el.scrollHeight;
        const wh = window.innerHeight;
        const max = height - wh;
        return {
            height,
            max,
        };
    }
    compute(o) {
        const h = this.options.$scrollbar.offsetHeight;
        state_1.state.scrollbar = true;
        const target = utils_1.clamp(this.sizes.height * (o / h), 0, this.sizes.max);
        state_1.state.target = utils_1.lerp(state_1.state.target, target, 0.1);
        setTimeout(() => (state_1.state.scrollbar = false), 0);
    }
    update(e) {
        let o;
        if ('ontouchstart' in document.documentElement) {
            const b = e.target.getBoundingClientRect();
            o = e.targetTouches[0].pageY - b.top;
        }
        else {
            o = e.clientY;
        }
        this.compute(o);
    }
    start() {
        this.events.move.forEach(name => {
            var _a, _b, _c;
            this.options.$thumb.classList.add('active');
            (_c = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.$el) === null || _b === void 0 ? void 0 : _b.parentNode) === null || _c === void 0 ? void 0 : _c.addEventListener(name, this.update);
        });
    }
    end() {
        state_1.state.scrollbar = false;
        this.options.$thumb.classList.remove('active');
        this.events.move.forEach(name => {
            var _a, _b, _c;
            (_c = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.$el) === null || _b === void 0 ? void 0 : _b.parentNode) === null || _c === void 0 ? void 0 : _c.removeEventListener(name, this.update);
        });
    }
    destroy() {
        var _a, _b;
        this.events.start.forEach(name => {
            var _a, _b;
            (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.$scrollbar) === null || _b === void 0 ? void 0 : _b.removeEventListener(name, this.start);
        });
        this.events.end.forEach(name => {
            var _a, _b;
            (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.$scrollbar) === null || _b === void 0 ? void 0 : _b.parentElement.removeEventListener(name, this.end);
        });
        this.events.move.forEach(name => {
            var _a, _b;
            (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.$el) === null || _b === void 0 ? void 0 : _b.parentNode.removeEventListener(name, this.update);
        });
        document.body.removeEventListener('mouseleave', this.end);
        (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.$scrollbar) === null || _b === void 0 ? void 0 : _b.removeEventListener('click', this.update);
    }
}
exports.ScrollbarDrag = ScrollbarDrag;
//# sourceMappingURL=ScrollbarDrag.js.map