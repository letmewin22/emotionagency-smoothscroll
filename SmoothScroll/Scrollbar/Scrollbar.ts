import {CreateScrollbar, TCreateScrollbar} from './CreateScrollbar'
import {Inactivity, TInactivity} from './Inactivity'
import {ScrollbarDrag, TScrollbarDrag} from './ScrollbarDrag'

import {IState} from '../state'
import {TRAF} from '../opts'

type TEl = HTMLElement | Element | null

export default class Scrollbar {
  $scrollbar: HTMLElement
  $thumb: HTMLElement
  height: number
  max: number
  createScrollbar: TCreateScrollbar
  inactivity: TInactivity
  onDrag: TScrollbarDrag
  disconnect: () => void

  constructor(
    readonly $el?: TEl,
    readonly state?: IState,
    readonly raf?: TRAF
  ) {
    this.$el = $el || document.querySelector('#scroll-container')
    this.bounds()

    this.createScrollbar = new CreateScrollbar()
    this.inactivity = new Inactivity(this.setVisibility)

    this.init()
  }

  bounds(): void {
    const methods = ['setHeight', 'move', 'setVisibility']
    methods.forEach(fn => (this[fn] = this[fn].bind(this)))
  }

  init(): void {
    this.$scrollbar = this.createScrollbar.create()
    this.$thumb = this.$scrollbar.querySelector('.scrollbar__thumb')
    this.createScrollbar.append(this.$el)

    this.$scrollbar.addEventListener('mouseenter', this.inactivity.reset)

    this.raf.on(this.move)
    this.drag()
  }

  setHeight(): void {
    this.height = this.$el.scrollHeight

    const wh = window.innerHeight
    let thumbH = wh * (wh / this.height)

    this.max = this.height - wh

    if (this.height === wh) thumbH = 0

    this.$thumb.style.height = thumbH + 'px'
  }

  setVisibility(isActive: boolean): void {
    if (!isActive) {
      this.$thumb.classList.remove('scrolling')
      return
    }
    this.$thumb.classList.add('scrolling')
  }

  move(): void {
    this.state.isFixed
      ? this.$scrollbar.classList.add('hidden')
      : this.$scrollbar.classList.remove('hidden')

    if (this.state.scrolling) {
      const ch = document.documentElement.clientHeight

      this.$thumb.classList.add('scrolling')
      const scrollPos = this.state.scrolled
      const percent = (100 * scrollPos) / (this.height - ch)

      this.$thumb.style.top = percent.toFixed(2) + '%'
      this.$thumb.style.transform = `translateY(-${percent.toFixed(2)}%)`
    }

    this.setHeight()
  }

  reset(): void {
    this.setHeight()
    this.$thumb.style.top = '0%'
    this.$thumb.style.transform = 'translateY(0%)'
  }

  drag(): void {
    this.onDrag = new ScrollbarDrag(
      {
        $el: this.$el,
        $thumb: this.$thumb,
        $scrollbar: this.$scrollbar
      },
      this.state
    )
  }

  destroy(): void {
    this.onDrag && this.onDrag.destroy()
    this.$scrollbar &&
      this.$scrollbar.removeEventListener('mouseenter', this.inactivity.reset)
    this.createScrollbar && this.createScrollbar.destroy()
    this.inactivity && this.inactivity.destroy()
  }
}
