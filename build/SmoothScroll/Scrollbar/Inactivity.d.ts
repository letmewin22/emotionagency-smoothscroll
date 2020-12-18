export declare class Inactivity {
    readonly cb: (isActive: boolean) => void;
    inactiveDelay: number;
    timer: number;
    ticker: ReturnType<typeof setInterval>;
    interval: ReturnType<typeof setInterval>;
    constructor(cb: (isActive: boolean) => void);
    get compare(): boolean;
    detect(): void;
    intervals(): void;
    reset(): void;
    destroy(): void;
}
export declare type TInactivity = typeof Inactivity.prototype;
