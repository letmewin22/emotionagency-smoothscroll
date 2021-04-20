"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateScrollbar = void 0;
class CreateScrollbar {
    create() {
        this.scrollbar = document.createElement('div');
        this.scrollbar.innerHTML = '<span class="scrollbar__thumb"></span>';
        if (document.querySelector('.scrollbar')) {
            this.scrollbar.classList.add('scrollbar', 'block-scrollbar');
            return this.scrollbar;
        }
        this.scrollbar.classList.add('scrollbar');
        return this.scrollbar;
    }
    append($el) {
        if (!$el) {
            return;
        }
        if (!$el.parentElement) {
            document.body.appendChild(this.scrollbar);
            return;
        }
        $el.appendChild(this.scrollbar);
    }
    destroy() {
        this.scrollbar.parentElement.removeChild(this.scrollbar);
    }
}
exports.CreateScrollbar = CreateScrollbar;
//# sourceMappingURL=CreateScrollbar.js.map