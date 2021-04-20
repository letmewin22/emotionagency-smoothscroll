export interface IState {
  scrolling?: boolean
  scrolled?: number
  scrollbar?: boolean
  target?: number
  isFixed?: boolean
}

export class State implements IState {
  scrolling?: boolean
  scrolled?: number
  scrollbar?: boolean
  target?: number
  isFixed?: boolean

  constructor() {
    this.scrolling = false
    this.scrolled = 0
    this.scrollbar = false
    this.target = 0
    this.isFixed = false
  }
}
