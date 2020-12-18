export class CreateScrollbar {
  scrollbar: HTMLElement

  create(): HTMLElement {
    this.scrollbar = document.createElement('div')
    this.scrollbar.innerHTML = '<span class="scrollbar__thumb"></span>'

    if (document.querySelector('.scrollbar')) {
      this.scrollbar.classList.add('scrollbar', 'block-scrollbar')
      return this.scrollbar
    }

    this.scrollbar.classList.add('scrollbar')
    return this.scrollbar
  }

  append($el: HTMLElement | Element | null): void {
    if (!$el) {
      return
    }

    if (!$el.parentElement) {
      document.body.appendChild(this.scrollbar)
      return
    }

    !$el.parentElement.querySelector('.scrollbar') &&
      $el.parentElement.appendChild(this.scrollbar)
  }

  destroy(): void {
    this.scrollbar.parentElement.removeChild(this.scrollbar)
  }
}

export type TCreateScrollbar = typeof CreateScrollbar.prototype
