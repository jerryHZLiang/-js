/*
  events: touchstart, touchend, touchmove, tap, doubletap, swipe, pinch, rotate
 */

class Gesture {
  constructor(el) {
    this.element = typeof el === 'string' ? document.querySelector(el) : el
    this.handlers = {
      touchstart: [],
      touchend: [],
      touchmove: [],
      tap: [],
      doubletap: [],
      swipe: []
    }

    this.delta = null //第二次点击与第一次点击的时间差
    this.last = null //第二次点击的时间
    this.now = null //第一次点击的时间
    this.tapTimeout = null
    this.x1 = this.x2 = this.y1 = this.y2 = null //记录手指点击的位置
    this.preTapPosition = {
      x: null,
      y: null
    }
    this.isDoubleTap = false


    this.bind()

  }

  bind() {
    this.element.addEventListener('touchstart', event => {
      this.dispatch('touchstart', event)

      this.x1 = event.touches[0].pageX // 相对于屏幕水平方向的距离
      this.y1 = event.touches[0].pageY // 相对于屏幕顶端的距离
      this.now = Date.now(); //现在点击时的时间
      this.delta = this.last ? this.now - this.last : 0
      if (this.preTapPosition !== null) {
        this.isDoubleTap = (this.delta > 0 && this.delta <= 300 &&
          Math.abs(this.x1 - this.preTapPosition.x) < 30 &&
          Math.abs(this.y1 - this.preTapPosition.y) < 30)

        if (this.isDoubleTap) {
          clearTimeout(this.tapTimeout)
        }
      }

      this.preTapPosition.x = this.x1
      this.preTapPosition.y = this.y1
      
      this.last = this.now
    })

    this.element.addEventListener('touchmove', event => {
      this.dispatch('touchmove', event)
      this.x2 = event.touches[0].pageX
      this.y2 = event.touches[0].pageY

    })


    this.element.addEventListener('touchend', event => {
      if ((this.x2 && Math.abs(this.x1 - this.x2) > 30) ||
        (this.y2 && Math.abs(this.y1 - this.y2) > 30)) {
        let direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2)
        event.direction = direction
        this.dispatch('swipe', event)
        return
      }

      if (!this.isDoubleTap) {
        this.tapTimeout = setTimeout(() => {
          this.dispatch('tap', event)
        }, 300)
      }
      if (this.isDoubleTap) {
        this.dispatch('doubletap', event)
        this.isDoubleTap = false
      }
    })
  }

  dispatch(eventType, event) {
    this.handlers[eventType].forEach(handler => handler.call(this.element, event))
  }


  on(eventType, handler) {
    if (this.handlers[eventType]) this.handlers[eventType].push(handler)
  }

  off(eventType, handler) {
    if (this.handlers[eventType] && this.handlers[eventType].indexOf(handler) !==
      -1) {
      this.handlers[eventType].splice(this.handlers[eventType].indexOf(handler), 1)
    }
  }

  _swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
  }
}


//const log = s => document.querySelector('.log').innerText = s
let touchNode = document.querySelector('.touch')
let gesture = new Gesture(touchNode)

// gesture.on('touchstart', function (event) {
//   console.log('touchstart', event)
// })

gesture.on('doubletap', function () {
  console.log('doubleTap')
})

gesture.on('touchmove', function () {
  console.log('touchmove')
})


gesture.on('swipe', function (event) {
  console.log('swipe', event)
})