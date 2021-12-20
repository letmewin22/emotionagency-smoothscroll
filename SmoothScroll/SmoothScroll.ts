import VirtualScroll from 'virtual-scroll'
import {raf, resize} from '@emotionagency/utils'
import {clamp, lerp} from '@emotionagency/utils'

import ScrollBar from './Scrollbar/ScrollBar'
import {State} from './state'

import {getOpts, IOpts} from './opts'

export class SmoothScroll {
  vs: typeof VirtualScroll.prototype
  scrollbar: typeof ScrollBar.prototype
  state: typeof State.prototype

  max: number
  raf: any
  current = 0
  min = 0
  isRendered = false
  isInited = false

  constructor(protected opts?: IOpts) {
    this.opts = getOpts(opts)
    this.state = new State()
    this.raf = this.opts.raf || raf
    this.bounds()
    resize.on(this.resize)
  }

  bounds(): void {
    const methods = ['resize', 'animate']
    methods.forEach(fn => (this[fn] = this[fn].bind(this)))
  }

  init(): void {
    this.state.target = 0
    this.max = this.maxValue
    this.scroll()

    this.raf.on(this.animate)

    if (this.opts.scrollbar) {
      this.scrollbar = new ScrollBar(this.opts.el, this.state, this.raf)
    }

    this.isInited = true
    this.isFixed = this.opts.isFixed ?? false
  }

  resize(): void {
    if (!this.opts.mobile && window.innerWidth <= this.opts.breakpoint) {
      this.isInited && this.destroy()
      this.isInited = false
    } else {
      !this.isInited && this.init()
    }
  }

  get maxValue(): number {
    return this.opts.el.scrollHeight - window.innerHeight
  }

  scroll(): void {
    this.vs = new VirtualScroll({...this.opts})

    this.vs.on((e: WheelEvent) => {
      if (this.canScroll) {
        this.state.target -= e.deltaY * this.opts.stepSize
        this.state.target = clamp(this.state.target, this.min, this.max)
      }
    })
  }

  get canScroll(): boolean {
    return !this.isFixed && this.opts.el.scrollHeight > window.innerHeight
  }

  get isFixed(): boolean {
    return this.state.isFixed
  }

  set isFixed(val: boolean) {
    this.state.isFixed = val
    if (val) {
      this.opts.el.classList.add('e-fixed')
    } else {
      this.opts.el.classList.remove('e-fixed')
    }
  }

  detectScrolling(): void {
    const s = this.state.scrollbar
    const dif = Math.abs(
      Math.round(this.state.target) - Math.round(this.current)
    )

    if (dif >= 1 || s) {
      this.state.scrolling = true
    } else {
      this.state.scrolling = false
    }
  }

  animate(): void {
    this.detectScrolling()

    this.max = this.maxValue
    if (this.state.scrolling) {
      this.current = lerp(this.current, this.state.target, this.opts.friction)
      this.current = Math.round(this.current * 100) / 100
      this.opts.el.scrollTop = this.current
      this.state.scrolled = this.current
    }
  }

  reset(): void {
    this.state.target = 0
    this.current = 0
    this.opts.el.scrollTop = 0
    this.scrollbar?.reset()
  }

  destroy(): void {
    this.raf.off(this.animate)
    resize.off(this.animate)
    this.vs && this.vs.destroy()
    this.scrollbar && this.scrollbar.destroy()
  }
}

export type TSmoothScroll = typeof SmoothScroll.prototype
