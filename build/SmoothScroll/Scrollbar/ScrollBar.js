"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ssr_window_1 = require("ssr-window");
const CreateScrollbar_1 = require("./CreateScrollbar");
const Inactivity_1 = require("./Inactivity");
const ScrollbarDrag_1 = require("./ScrollbarDrag");
const window = (0, ssr_window_1.getWindow)();
const document = (0, ssr_window_1.getDocument)();
class Scrollbar {
    constructor($el, state, raf) {
        this.$el = $el;
        this.state = state;
        this.raf = raf;
        this.$el = $el || document.querySelector('#scroll-container');
        this.bounds();
        this.createScrollbar = new CreateScrollbar_1.CreateScrollbar();
        this.inactivity = new Inactivity_1.Inactivity(this.setVisibility);
        this.init();
    }
    bounds() {
        const methods = ['setHeight', 'move', 'setVisibility'];
        methods.forEach(fn => (this[fn] = this[fn].bind(this)));
    }
    init() {
        this.$scrollbar = this.createScrollbar.create();
        this.$thumb = this.$scrollbar.querySelector('.scrollbar__thumb');
        this.createScrollbar.append(this.$el);
        this.$scrollbar.addEventListener('mouseenter', this.inactivity.reset);
        this.raf.on(this.move);
        this.drag();
    }
    setHeight() {
        this.height = this.$el.scrollHeight;
        const wh = window.innerHeight;
        let thumbH = wh * (wh / this.height);
        this.max = this.height - wh;
        if (this.height === wh)
            thumbH = 0;
        this.$thumb.style.height = thumbH + 'px';
    }
    setVisibility(isActive) {
        if (!isActive) {
            this.$thumb.classList.remove('scrolling');
            return;
        }
        this.$thumb.classList.add('scrolling');
    }
    move() {
        this.state.isFixed
            ? this.$scrollbar.classList.add('hidden')
            : this.$scrollbar.classList.remove('hidden');
        if (this.state.scrolling) {
            const ch = document.documentElement.clientHeight;
            this.$thumb.classList.add('scrolling');
            const scrollPos = this.state.scrolled;
            const percent = (100 * scrollPos) / (this.height - ch);
            this.$thumb.style.top = percent.toFixed(2) + '%';
            this.$thumb.style.transform = `translateY(-${percent.toFixed(2)}%)`;
        }
        this.setHeight();
    }
    reset() {
        this.setHeight();
        this.$thumb.style.top = '0%';
        this.$thumb.style.transform = 'translateY(0%)';
    }
    drag() {
        this.onDrag = new ScrollbarDrag_1.ScrollbarDrag({
            $el: this.$el,
            $thumb: this.$thumb,
            $scrollbar: this.$scrollbar,
        }, this.state);
    }
    destroy() {
        this.onDrag && this.onDrag.destroy();
        this.$scrollbar &&
            this.$scrollbar.removeEventListener('mouseenter', this.inactivity.reset);
        this.createScrollbar && this.createScrollbar.destroy();
        this.inactivity && this.inactivity.destroy();
    }
}
exports.default = Scrollbar;
//# sourceMappingURL=ScrollBar.js.map