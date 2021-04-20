import {clamp, lerp} from '@emotionagency/utils'
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

  events = {
    start: ['mousedown', 'touchstart'],
    move: ['mousemove', 'touchmove'],
    end: ['mouseup', 'touchend'],
  }

  bounds(): void {
    const methods = ['start', 'update', 'end']
    methods.forEach(fn => (this[fn] = this[fn].bind(this)))
  }

  init(): void {
    this.events.start.forEach(name => {
      this.options.$scrollbar.addEventListener(name, this.start, {
        passive: false,
      })
    })
    this.events.end.forEach(name => {
      document.documentElement.addEventListener(name, this.end)
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
    this.events.move.forEach(name => {
      document.documentElement.addEventListener(name, this.update)
    })
    this.options.$thumb.classList.add('active')
  }

  end(): void {
    this.state.scrollbar = false
    this.options.$thumb.classList.remove('active')

    this.events.move.forEach(name => {
      document.documentElement.removeEventListener(name, this.update)
    })
  }

  destroy(): void {
    this.events.start.forEach(name => {
      this.options.$scrollbar.removeEventListener(name, this.start)
    })
    this.events.end.forEach(name => {
      document.documentElement.removeEventListener(name, this.end)
    })

    this.events.move.forEach(name => {
      document.documentElement.removeEventListener(name, this.update)
    })

    this.options.$scrollbar.removeEventListener('click', this.update)
  }
}

export type TScrollbarDrag = typeof ScrollbarDrag.prototype
