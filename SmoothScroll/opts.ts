export interface IOpts {
  el?: HTMLElement | Element
  touchMultiplier?: number
  firefoxMultiplier?: number
  preventTouch?: boolean
  scrollbar?: boolean
  friction?: number
  stepSize?: number
  mobile?: boolean
  breakpoint?: number
  passive?: boolean
}

export const getOpts = (opts: IOpts | undefined): IOpts => {
  return {
    el: opts?.el ?? document.querySelector('#scroll-container'),
    touchMultiplier: opts?.touchMultiplier ?? 3.8,
    firefoxMultiplier: opts?.firefoxMultiplier ?? 40,
    preventTouch: opts?.preventTouch ?? true,
    scrollbar: opts?.scrollbar ?? true,
    friction: opts?.friction ?? 0.08,
    stepSize: opts?.stepSize ?? 1,
    mobile: opts?.mobile ?? true,
    breakpoint: opts?.breakpoint ?? 960,
    passive: opts?.passive ?? false,
  }
}
