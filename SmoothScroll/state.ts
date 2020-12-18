type TState = {
  scrolling?: boolean
  scrolled?: number
  scrollbar?: boolean
  target?: number
}

export const state: TState = {
  scrolling: false,
  scrolled: 0,
  scrollbar: false,
  target: 0
}
