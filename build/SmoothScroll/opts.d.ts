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
    raf?: () => void | null;
}
export declare const getOpts: (opts: IOpts | undefined) => IOpts;
