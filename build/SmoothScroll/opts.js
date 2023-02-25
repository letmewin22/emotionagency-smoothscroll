"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOpts = exports.ScrollAxis = void 0;
var ScrollAxis;
(function (ScrollAxis) {
    ScrollAxis["x"] = "X";
    ScrollAxis["y"] = "Y";
    ScrollAxis["both"] = "BOTH";
})(ScrollAxis = exports.ScrollAxis || (exports.ScrollAxis = {}));
const getOpts = (opts) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    return {
        el: (_a = opts === null || opts === void 0 ? void 0 : opts.el) !== null && _a !== void 0 ? _a : document.querySelector('#scroll-container'),
        touchMultiplier: (_b = opts === null || opts === void 0 ? void 0 : opts.touchMultiplier) !== null && _b !== void 0 ? _b : 3.8,
        firefoxMultiplier: (_c = opts === null || opts === void 0 ? void 0 : opts.firefoxMultiplier) !== null && _c !== void 0 ? _c : 40,
        preventTouch: (_d = opts === null || opts === void 0 ? void 0 : opts.preventTouch) !== null && _d !== void 0 ? _d : true,
        scrollbar: (_e = opts === null || opts === void 0 ? void 0 : opts.scrollbar) !== null && _e !== void 0 ? _e : true,
        friction: (_f = opts === null || opts === void 0 ? void 0 : opts.friction) !== null && _f !== void 0 ? _f : 0.08,
        stepSize: (_g = opts === null || opts === void 0 ? void 0 : opts.stepSize) !== null && _g !== void 0 ? _g : 1,
        mobile: (_h = opts === null || opts === void 0 ? void 0 : opts.mobile) !== null && _h !== void 0 ? _h : true,
        breakpoint: (_j = opts === null || opts === void 0 ? void 0 : opts.breakpoint) !== null && _j !== void 0 ? _j : 960,
        passive: (_k = opts === null || opts === void 0 ? void 0 : opts.passive) !== null && _k !== void 0 ? _k : false,
        useKeyboard: (_l = opts === null || opts === void 0 ? void 0 : opts.useKeyboard) !== null && _l !== void 0 ? _l : true,
        isFixed: (_m = opts === null || opts === void 0 ? void 0 : opts.isFixed) !== null && _m !== void 0 ? _m : false,
        raf: (_o = opts === null || opts === void 0 ? void 0 : opts.raf) !== null && _o !== void 0 ? _o : null,
        clampScrollDelta: (_p = opts === null || opts === void 0 ? void 0 : opts.clampScrollDelta) !== null && _p !== void 0 ? _p : 120,
        axis: (_q = opts === null || opts === void 0 ? void 0 : opts.axis) !== null && _q !== void 0 ? _q : ScrollAxis.y,
    };
};
exports.getOpts = getOpts;
//# sourceMappingURL=opts.js.map