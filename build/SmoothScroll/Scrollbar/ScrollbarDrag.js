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
            end: ['mouseup', 'touchend']
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
                passive: false
            });
        });
        this.events.end.forEach(name => {
            this.options.$scrollbar.parentElement.addEventListener(name, this.end, {
                passive: false
            });
        });
        document.body.addEventListener('mouseleave', this.end);
        screen.width > 960 &&
            this.options.$scrollbar.addEventListener('click', this.update);
    }
    compute(o) {
        const h = this.options.$scrollbar.offsetHeight;
        state_1.state.scrollbar = true;
        const target = utils_1.clamp(this.options.height * (o / h), 0, this.options.max);
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
            this.options.$thumb.classList.add('active');
            this.options.$el.parentNode.addEventListener(name, this.update);
        });
    }
    end() {
        state_1.state.scrollbar = false;
        this.options.$thumb.classList.remove('active');
        this.events.move.forEach(name => {
            this.options.$el.parentNode.removeEventListener(name, this.update);
        });
    }
    destroy() {
        this.events.start.forEach(name => {
            this.options.$scrollbar.removeEventListener(name, this.start);
        });
        this.events.end.forEach(name => {
            this.options.$scrollbar.parentElement.removeEventListener(name, this.end);
        });
        this.events.move.forEach(name => {
            this.options.$el.parentNode.removeEventListener(name, this.update);
        });
        document.body.removeEventListener('mouseleave', this.end);
        this.options.$scrollbar.removeEventListener('click', this.update);
    }
}
exports.ScrollbarDrag = ScrollbarDrag;
//# sourceMappingURL=ScrollbarDrag.js.map