declare type TFunc = () => void;
export declare type TRAF = {
    on: (cb: TFunc) => void;
    off: (cb: TFunc) => void;
};
export declare enum ScrollAxis {
    x = "X",
    y = "Y",
    both = "BOTH"
}
export interface IOpts {
    el?: HTMLElement | Element;
    touchMultiplier?: number;
    firefoxMultiplier?: number;
    preventTouch?: boolean;
    scrollbar?: boolean;
    friction?: number;
    stepSize?: number;
    mobile?: boolean;
    breakpoint?: number;
    passive?: boolean;
    useKeyboard?: boolean;
    isFixed?: boolean;
    raf?: TRAF;
    clampScrollDelta?: number;
    axis?: ScrollAxis;
}
export declare const getOpts: (opts: IOpts | undefined) => IOpts;
export {};
