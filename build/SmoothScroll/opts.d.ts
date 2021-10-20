declare type TFunc = () => void;
export declare type TRAF = {
    on: (cb: TFunc) => void;
    off: (cb: TFunc) => void;
};
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
}
export declare const getOpts: (opts: IOpts | undefined) => IOpts;
export {};
