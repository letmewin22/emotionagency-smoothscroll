export class Inactivity {
  inactiveDelay = 1
  timer = 0
  ticker: ReturnType<typeof setInterval>
  interval: ReturnType<typeof setInterval>

  constructor(readonly cb: (isActive: boolean) => void) {
    this.detect = this.detect.bind(this)
    this.intervals()
  }

  get compare(): boolean {
    if (this.timer >= this.inactiveDelay) {
      return false
    }
    return true
  }

  detect(): void {
    this.cb(this.compare)
  }

  intervals(): void {
    this.ticker = setInterval(() => {
      this.timer++
    }, 1000)
    this.interval = setInterval(this.detect, 120)
  }

  reset(): void {
    this.timer = 0
  }

  destroy(): void {
    clearInterval(this.ticker)
    clearInterval(this.interval)
  }
}

export type TInactivity = typeof Inactivity.prototype
