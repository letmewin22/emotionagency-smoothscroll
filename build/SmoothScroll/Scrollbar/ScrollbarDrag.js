"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollbarDrag = void 0;
const utils_1 = require("@emotionagency/utils");
class ScrollbarDrag {
    constructor(options, state) {
        this.options = options;
        this.state = state;
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
        this.events.start.forEach(name => {
            this.options.$scrollbar.addEventListener(name, this.start, {
                passive: false,
            });
        });
        this.events.end.forEach(name => {
            document.documentElement.addEventListener(name, this.end);
        });
        screen.width > 960 &&
            this.options.$scrollbar.addEventListener('click', this.update);
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
        this.state.scrollbar = true;
        const target = (0, utils_1.clamp)(this.sizes.height * (o / h), 0, this.sizes.max);
        this.state.target = target;
        setTimeout(() => (this.state.scrollbar = false), 0);
    }
    update(e) {
        var _a;
        if (!this.state.isFixed) {
            let o;
            o = e.clientY || ((_a = e.targetTouches[0]) === null || _a === void 0 ? void 0 : _a.clientY);
            this.compute(o);
        }
    }
    start() {
        this.events.move.forEach(name => {
            document.documentElement.addEventListener(name, this.update);
        });
        this.options.$thumb.classList.add('active');
    }
    end() {
        this.state.scrollbar = false;
        this.options.$thumb.classList.remove('active');
        this.events.move.forEach(name => {
            document.documentElement.removeEventListener(name, this.update);
        });
    }
    destroy() {
        this.events.start.forEach(name => {
            this.options.$scrollbar.removeEventListener(name, this.start);
        });
        this.events.end.forEach(name => {
            document.documentElement.removeEventListener(name, this.end);
        });
        this.events.move.forEach(name => {
            document.documentElement.removeEventListener(name, this.update);
        });
        this.options.$scrollbar.removeEventListener('click', this.update);
    }
}
exports.ScrollbarDrag = ScrollbarDrag;
//# sourceMappingURL=ScrollbarDrag.js.map