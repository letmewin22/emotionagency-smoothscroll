import { TCreateScrollbar } from './CreateScrollbar';
import { TInactivity } from './Inactivity';
import { TScrollbarDrag } from './ScrollbarDrag';
declare type TEl = HTMLElement | Element | null;
export default class Scrollbar {
    readonly $el?: TEl;
    $scrollbar: HTMLElement;
    $thumb: HTMLElement;
    height: number;
    max: number;
    createScrollbar: TCreateScrollbar;
    inactivity: TInactivity;
    onDrag: TScrollbarDrag;
    disconnect: () => void;
    constructor($el?: TEl);
    bounds(): void;
    init(): void;
    setHeight(): void;
    setVisibility(isActive: boolean): void;
    move(): void;
    drag(): void;
    destroy(): void;
}
export {};
