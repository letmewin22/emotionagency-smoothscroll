export interface IState {
    scrolling?: boolean;
    scrolled?: number;
    scrollbar?: boolean;
    target?: number;
    isFixed?: boolean;
}
export declare class State implements IState {
    scrolling?: boolean;
    scrolled?: number;
    scrollbar?: boolean;
    target?: number;
    isFixed?: boolean;
    constructor();
}
