import VirtualScroll from 'virtual-scroll';
import ScrollBar from './Scrollbar/ScrollBar';
import { State } from './state';
import { IOpts } from './opts';
export declare class SmoothScroll {
    protected opts?: IOpts;
    vs: typeof VirtualScroll;
    scrollbar: typeof ScrollBar.prototype;
    state: typeof State.prototype;
    max: number;
    current: number;
    min: number;
    isRendered: boolean;
    isInited: boolean;
    constructor(opts?: IOpts);
    bounds(): void;
    init(): void;
    resize(): void;
    get maxValue(): number;
    scroll(): void;
    get canScroll(): boolean;
    get isFixed(): boolean;
    set isFixed(val: boolean);
    detectScrolling(): void;
    animate(): void;
    reset(): void;
    destroy(): void;
}
export declare type TSmoothScroll = typeof SmoothScroll.prototype;
