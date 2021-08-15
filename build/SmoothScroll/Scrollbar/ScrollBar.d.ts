import { TCreateScrollbar } from './CreateScrollbar';
import { TInactivity } from './Inactivity';
import { TScrollbarDrag } from './ScrollbarDrag';
import { IState } from '../state';
declare type TEl = HTMLElement | Element | null;
export default class Scrollbar {
    readonly $el?: TEl;
    readonly state?: IState;
    readonly raf?: any;
    $scrollbar: HTMLElement;
    $thumb: HTMLElement;
    height: number;
    max: number;
    createScrollbar: TCreateScrollbar;
    inactivity: TInactivity;
    onDrag: TScrollbarDrag;
    disconnect: () => void;
    constructor($el?: TEl, state?: IState, raf?: any);
    bounds(): void;
    init(): void;
    setHeight(): void;
    setVisibility(isActive: boolean): void;
    move(): void;
    reset(): void;
    drag(): void;
    destroy(): void;
}
export {};
