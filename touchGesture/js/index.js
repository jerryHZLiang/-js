/*
  events: touchstart, touchend, touchmove, tap, doubletap, swipe, pinch, rotate
 */

class Gesture {
 constructor(node) {
   this.node = node
  this.handlers = {touchstart:[], touchend: [], touchmove: [], tap:[], doubletap:[],swipe:[]}
  this.bind()

 }

 bind(){
  this.node.ontouchstart = (e)=>{
    //if(xxx)
    this.dispatch('touchstart', e)
  }
  this.node.ontouchmove = ()=>{
    this.dispatch('touchmove', e)

  }
  this.node.ontouchend = ()=>{
    this.dispatch('touchend', e)

  }
 }

 dispatch(eventType, e){
   this.handlers[eventType].forEach(handler => handler.call(this.node, e))
 }


 on(eventType, handler) {
  this.handlers[eventType].push(handler)
 }
}


 //const log = s => document.querySelector('.log').innerText = s
 let touchNode = document.querySelector('.touch')
 let gesture =  new Gesture(touchNode)

gesture.on('touchstart',function (e) {
  console.log('touchstart',e)
  })
//gesture.on('tap',fn2)






//  gesture.on('tap', function(){
   
//    log('tap')
//  })

//  gesture.on('doubletap', function () {
//    log('doubleTap')
//    })

   
//  gesture.on('swipe', function (e) {
//   console.log('swipe',e)
//   })

// class Gesture {
//   constructor(el) {
//     this.element = typeof el === 'string' ? document.querySelector(el) : el;
//     this.handlers = { touchstart: [], touchend: [], touchmove: [], tap: [], doubletap: [], pinch: [], rotate: [],  swipe: [], pressMove: [] }

//     this.delta = null
//     this.last = null
//     this.now = null
//     this.tapTimeout = null
//     this.x1 = this.x2 = this.y1 = this.y2 = null
//     this.preTapPosition = {x: null, y: null}
//     this.isDoubleTap = false
    
//     this.bind()
//   }
  
//   dispatch(type, evt) {
//     this.handlers[type].forEach(handler => handler.call(this.element, evt))
//   }
  
//   bind() {
//     this.element.addEventListener('touchstart', evt => {
//       this.dispatch('touchstart', evt)
      
//       this.x1 = evt.touches[0].pageX
//       this.y1 = evt.touches[0].pageY  
//       this.now = Date.now()
//       this.delta = this.last ? this.now - this.last : 0
  
//       if(this.preTapPosition !== null) {
//         this.isDoubleTap = (this.delta > 0 && this.delta <= 300 
//                             && Math.abs(this.x1 - this.preTapPosition.x) < 30 
//                             && Math.abs(this.y1 - this.preTapPosition.y) < 30)
//         if(this.isDoubleTap) {
//           clearTimeout(this.tapTimeout)
//         }
        
//       }
      
//       this.preTapPosition.x = this.x1
//       this.preTapPosition.y = this.y1
      
//       this.last = this.now

//     })
    
//     this.element.addEventListener('touchmove', evt => {
//       this.dispatch('touchmove', evt)
//       this.x2 = evt.touches[0].pageX
//       this.y2 = evt.touches[0].pageY
//     })

//     this.element.addEventListener('touchend', evt => { 
//       if ((this.x2 && Math.abs(this.x1 - this.x2) > 30) ||
//           (this.y2 && Math.abs(this.y1 - this.y2) > 30)) {
//         let direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2)
//         evt.direction = direction
//         this.dispatch('swipe', evt)
//         return 
//       }    
      
//       if(!this.isDoubleTap) {
//         this.tapTimeout = setTimeout(() => {
//           this.dispatch('tap', evt)
//         }, 300)
//       }
      
//       if(this.isDoubleTap) {
//         this.dispatch('doubletap', evt)
//         this.isDoubleTap = false
//       }
//     })
    
    
//   }
  
//   on(type, handler) {
//     if(this.handlers[type]) {
//       this.handlers[type].push(handler)
//     }
//   }
  
//   off(type, handler) {
//     if(this.handlers[type] && this.handlers[type].indexOf(handler) !== -1) {
//       this.handlers[type].splice(this.handlers[type].indexOf(handler), 1)
//     } 
//   }
  
//   _swipeDirection(x1, x2, y1, y2) {
//     return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
//   }
// }


//  const log = s => document.querySelector('.log').innerText = s
//  const gesture =  new Gesture('.touch')
//  gesture.on('tap', function(){
   
//    log('tap')
//  })

//  gesture.on('doubletap', function () {
//    log('doubleTap')
//    })

   
//  gesture.on('swipe', function (e) {
//   console.log('swipe',e)
//   })