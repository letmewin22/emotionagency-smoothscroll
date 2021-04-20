import {clamp, lerp} from '@emotionagency/utils'
import {mousedown, mousemove, mouseup} from '@emotionagency/touchmouse'
import {IState} from '../state'

type TEl = HTMLElement | Element | null

interface IEvent {
  [key: string]: any
}

interface IOptions {
  $el: TEl
  $scrollbar: HTMLElement
  $thumb: HTMLElement
}

interface ISizes {
  height: number
  max: number
}

export class ScrollbarDrag {
  constructor(public options: IOptions, readonly state?: IState) {
    this.bounds()
    this.init()
  }

  bounds(): void {
    const methods = ['start', 'update', 'end']
    methods.forEach(fn => (this[fn] = this[fn].bind(this)))
  }

  init(): void {
    mousedown.on(this.options.$scrollbar, this.start, {
      passive: false,
    })

    mouseup.on(document.documentElement, this.end, {
      passive: false,
    })

    screen.width > 960 &&
      this.options.$scrollbar.addEventListener('click', this.update)
  }

  get sizes(): ISizes {
    const height = this.options.$el.scrollHeight
    const wh = window.innerHeight
    const max = height - wh
    return {
      height,
      max,
    }
  }

  compute(o: number): void {
    const h = this.options.$scrollbar.offsetHeight
    this.state.scrollbar = true

    const target = clamp(this.sizes.height * (o / h), 0, this.sizes.max)

    this.state.target = lerp(this.state.target, target, 0.1)
    setTimeout(() => (this.state.scrollbar = false), 0)
  }

  update(e: IEvent): void {
    if (!this.state.isFixed) {
      let o: number
      if ('ontouchstart' in document.documentElement) {
        const b =
          e.target?.getBoundingClientRect() ??
          e.originalEvent?.target.getBoundingClientRect()
        o = e.pageY - b.top
      } else {
        o = e.clientY
      }
      this.compute(o)
    }
  }

  start(): void {
    console.log(this.options.$el)
    mousemove.on(document.documentElement as HTMLElement, this.update)
  }

  end(): void {
    this.state.scrollbar = false
    this.options.$thumb.classList.remove('active')

    mousemove.off(document.documentElement as HTMLElement, this.update)
  }

  destroy(): void {
    mousedown.off(this.options.$scrollbar, this.start)
    mouseup.off(document.documentElement, this.end)

    mousemove.off(document.documentElement, this.update)

    this.options.$scrollbar.removeEventListener('click', this.update)
  }
}

export type TScrollbarDrag = typeof ScrollbarDrag.prototype
