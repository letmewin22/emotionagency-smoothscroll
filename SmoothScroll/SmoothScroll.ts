import VirtualScroll from 'virtual-scroll'
import {raf, resize} from '@emotionagency/utils'

import ScrollBar from './Scrollbar/ScrollBar'
import {state} from './state'

import {clamp, lerp} from '@emotionagency/utils'
import {getOpts, IOpts} from './opts'
import {isFixed} from '../isFixed'

export class SmoothScroll {
  max: number
  vs: typeof VirtualScroll
  scrollbar: typeof ScrollBar.prototype

  current = 0
  min = 0

  constructor(protected opts?: IOpts) {
    this.opts = getOpts(opts)
    this.init()
  }

  bounds(): void {
    const methods = ['resize', 'animate']
    methods.forEach(fn => (this[fn] = this[fn].bind(this)))
  }

  init(): void {
    this.bounds()

    resize.on(this.resize)

    state.target = 0
    this.max = this.maxValue
    this.scroll()

    raf.on(this.animate)
    this.scrollbar = this.opts.scrollbar && new ScrollBar()
  }

  resize(): void {
    if (!this.opts.mobile && window.innerWidth <= this.opts.breakpoint) {
      this.destroy()
    }
  }

  get maxValue(): number {
    return this.opts.el.scrollHeight - window.innerHeight
  }

  scroll(): void {
    this.vs = new VirtualScroll({...this.opts})

    this.vs.on((e: WheelEvent) => {
      if (this.canScroll) {
        state.target -= e.deltaY * this.opts.stepSize
        state.target = clamp(state.target, this.min, this.max)
      }
    })
  }

  get canScroll(): boolean {
    return !isFixed() && this.opts.el.scrollHeight > window.innerHeight
  }

  detectScrolling(): void {
    const s = state.scrollbar
    const dif = Math.abs(Math.round(state.target) - Math.round(this.current))

    if (dif >= 1 || s) {
      state.scrolling = true
    } else {
      state.scrolling = false
    }
  }

  animate(): void {
    this.detectScrolling()

    if (state.scrolling) {
      this.max = this.maxValue
      this.current = lerp(this.current, state.target, this.opts.friction)
      this.current = Math.round(this.current * 100) / 100
      this.opts.el.scrollTop = this.current
      state.scrolled = this.current
    }
  }

  reset(): void {
    state.target = 0
    this.current = 0
    this.opts.el.scrollTop = 0
  }

  destroy(): void {
    state.target = 0
    state.scrolled = 0
    state.scrolling = false
    raf.off(this.animate)
    resize.off(this.animate)
    this.vs.destroy()
    this.scrollbar.destroy()
  }
}

export type TSmoothScroll = typeof SmoothScroll.prototype
