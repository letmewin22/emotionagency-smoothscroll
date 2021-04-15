import VirtualScroll from 'virtual-scroll';
import ScrollBar from './Scrollbar/ScrollBar';
import { IOpts } from './opts';
export declare class SmoothScroll {
    protected opts?: IOpts;
    max: number;
    vs: typeof VirtualScroll;
    scrollbar: typeof ScrollBar.prototype;
    current: number;
    min: number;
    isRendered: boolean;
    constructor(opts?: IOpts);
    bounds(): void;
    init(): void;
    resize(): void;
    get maxValue(): number;
    scroll(): void;
    get canScroll(): boolean;
    detectScrolling(): void;
    animate(): void;
    reset(): void;
    destroy(): void;
}
export declare type TSmoothScroll = typeof SmoothScroll.prototype;
