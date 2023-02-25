"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inactivity = void 0;
class Inactivity {
    constructor(cb) {
        this.cb = cb;
        this.inactiveDelay = 1;
        this.timer = 0;
        this.detect = this.detect.bind(this);
        this.intervals();
    }
    get compare() {
        if (this.timer >= this.inactiveDelay) {
            return false;
        }
        return true;
    }
    detect() {
        this.cb(this.compare);
    }
    intervals() {
        this.ticker = setInterval(() => {
            this.timer++;
        }, 1000);
        this.interval = setInterval(this.detect, 120);
    }
    reset() {
        this.timer = 0;
    }
    destroy() {
        clearInterval(this.ticker);
        clearInterval(this.interval);
    }
}
exports.Inactivity = Inactivity;
//# sourceMappingURL=Inactivity.js.map