A library that animates the native scroll value using Virtual Scroll and custom scrollbar

# Instalation

`npm i @emotionagency/smoothscroll`

or

`yarn add @emotionagency/smoothscroll`

# Usage

Basic example
```
import {SmoothScroll} from '@emotionagency/smoothscroll'

const scroll = new SmoothScroll()
```

Destroy instance

```
import {SmoothScroll} from '@emotionagency/smoothscroll'

const scroll = new SmoothScroll()

scroll.destroy()
```


## Instance options

| Option                  | Type      | Default                | Description                                                                                                                                                                                                                                                                                        |
| ----------------------- | --------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `el`                    | `object`  | `#scroll-container`             | Scroll container element.                                                                                                                                                                                                                                                                          |
| `touchMultiplier`                  | `number`  | `3.8`             | Mutiply the touch action by this modifier to make scroll faster than finger movement (Virtual Scroll API).                                                                                                        |
| `firefoxMultiplier`                | `number`| `40`                | Firefox on Windows needs a boost, since scrolling is very slow.|
| `preventTouch`                | `boolean`| `true`                |  If true, automatically call e.preventDefault on touchMove.
| `scrollbar`                | `boolean`| `true`                |  Custom scrollbar.
| `friction`                | `number`| `0.08`                |  Factor that affects the speed and smoothness of the scroll animation.
| `stepSize`                | `number`| `1`                |  A coefficient that affects the distance that will be scrolled at one time. The smaller the coefficient, the shorter the distance.
| `mobile`                | `boolean`| `true`                |  If true, it will work on mobile devices too.
| `breakpoint`                | `number`| `960`                |  If mobile is selected false, then this value indicates when the scroll will be disabled.




## Reset scroll position 

(for example, can be called when navigating between pages)

```
import {SmoothScroll} from '@emotionagency/smoothscroll'

const scroll = new SmoothScroll()

scroll.reset()
```

## Recomended styles

### Scroll Container

```
body {
  height: 100vh;
  overflow: hidden;
}

.e-fixed {
  overflow: hidden;
  overflow-x: auto;
  .scrollbar:not(.block-scrollbar) {
    display: none;
  }
  #scroll-container {
    overflow: hidden;
    overflow-x: auto;
  }
}

#scroll-container {
  overflow-y: auto;
  overflow-x: hidden;
  height: var(--vh);
}
```

### Scrollbar

```
/* Hide scrollbar for Chrome, Safari and Opera */
#scroll-container::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
#scroll-container {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.scrollbar {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10000000 !important;
  height: var(--vh);
  width: 12px;
  user-select: none;
  overflow: hidden;
  padding: 2px;
  padding-left: 0px;
  @media screen and (min-width: 960px)) {
    &:hover {
      .scrollbar__thumb {
        width: 10px;
        opacity: 0.7;
        border-radius: 10px;
        background-color: var(--accent);
      }
    }
  }
  &.hidden {
    display: none;
  }
}

.scrollbar__thumb {
  width: 6px;
  border-radius: 7px;
  pointer-events: none;
  height: 100px;
  background: #6b6b6b;
  display: block;
  position: relative;
  user-select: none;
  transition: width 0.2s ease, opacity 0.3s ease, border-radius 0.3s ease,
    background-color 0.3s ease;
  right: 0;
  opacity: 0;
  float: right;
  &.scrolling {
    opacity: 0.7;
  }
  &.active {
    width: 10px;
    opacity: 0.7;
    border-radius: 10px;
    background-color: var(--accent);
  }
}

```