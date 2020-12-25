declare type TEl = HTMLElement | Element | null;
interface IEvent {
    [key: string]: any;
}
interface IOptions {
    $el: TEl;
    $scrollbar: HTMLElement;
    $thumb: HTMLElement;
}
interface ISizes {
    height: number;
    max: number;
}
export declare class ScrollbarDrag {
    options: IOptions;
    events: {
        start: string[];
        move: string[];
        end: string[];
    };
    constructor(options: IOptions);
    bounds(): void;
    init(): void;
    get sizes(): ISizes;
    compute(o: number): void;
    update(e: IEvent): void;
    start(): void;
    end(): void;
    destroy(): void;
}
export declare type TScrollbarDrag = typeof ScrollbarDrag.prototype;
export {};
