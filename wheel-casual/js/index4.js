class Carousel {
    constructor(root, animation){
        this.animation = animation || ((fromNode, toNode , callback) => callback())
        this.root = root
        this.dotsCt = root.querySelector('.dots')
        this.dots = Array.from(root.querySelectorAll('.dots > span'))
        this.panels = Array.from(root.querySelectorAll('.panels > a'))
        this.pre = root.querySelector('.action .pre')
        this.next = root.querySelector('.action .next')
        this.bind()
    }

    get index(){
        return this.dots.indexOf(this.root.querySelector('.dots .active'))
    }

    get preIndex(){
       return ((this.index-1 + this.dots.length) % this.dots.length)
    }
    get nextIndex(){
        return (this.index + 1) % this.dots.length
     }

    bind(){
        this.dotsCt.onclick = e => {
            if(e.target.tagName !== 'SPAN') return
            var index = this.dots.indexOf(e.target)
            this.setPanels(index, this.index)
            this.setDots(index)
        }

        this.pre.onclick = e=>{
            this.setPanels(this.preIndex, this.index)
            //setDots放后面，以免影响前面dots的获取
            this.setDots(this.preIndex)
        }
        
        this.next.onclick = e => {
            this.setPanels(this.nextIndex, this.index)
            //setDots放后面，以免影响前面dots的获取
            this.setDots(this.nextIndex)
        }
    }
    setDots(index){
            this.dots.forEach(dot => dot.classList.remove('active'))
            this.dots[index].classList.add('active')

    }
    
    setPanels(toIndex, fromIndex){
        this.animation(this.panels[fromIndex], this.panels[toIndex],() => {
            this.panels.forEach(penel => penel.style.zIndex = 1)
            this.panels[toIndex].style.zIndex = 10
        })
    }

}

function fade(fromNode, toNode, onFinish) {
    let opcityOffset1 = 1
    let opcityOffset2 = 0
    let step = 0.04
    fromNode.style.zIndex = 10
    toNode.style.zIndex = 9

    function fromNodeAnimation(){
        if(opcityOffset1 > 0){
            opcityOffset1 -= step
            fromNode.style.opacity = opcityOffset1
            requestAnimationFrame(fromNodeAnimation)
        } else {
            fromNode.style.opacity = 0
        }
    }

    function toNodeAnimation(){
        if(opcityOffset2 < 1){
            opcityOffset2 += step
            toNode.style.opacity = opcityOffset2
            requestAnimationFrame(toNodeAnimation)
        } else {
            fromNode.style.opacity = 1
            onFinish()
        }
    }
    fromNodeAnimation()
    toNodeAnimation()
}

function slide(fromNode, toNode, onFinish) {
    fromNode.style.zIndex = 10
    toNode.style.zIndex = 10

    let width = parseInt(getComputedStyle(fromNode).width)
    let offsetX = width  // 要水平移动的距离
    let offset1 = 0;     // 第一个元素已经移动的距离
    let offset2 = 0      // 第二个元素已经移动的距离
    let step = 10        // 每次移动的距离

    toNode.style.left = width + 'px'


    function fromNodeAnimation(){
        if(offset1 < offsetX){
            fromNode.style.left = parseInt(getComputedStyle(fromNode).left) - step + 'px'
            offset1 -= step
            requestAnimationFrame(fromNodeAnimation)
        } 
    }

    function toNodeAnimation(){
        if(offset2 < offsetX){
            fromNode.style.left = parseInt(getComputedStyle(fromNode).left) - step + 'px'
            offset2 += step
            requestAnimationFrame(fromNodeAnimation)
        } else{
            onFinish()
            fromNode.style.left = 0
            toNode.style.left = 0
        }
    }
    fromNodeAnimation()
    toNodeAnimation()
}


 const c = new Carousel(document.querySelector('.carousel'), fade)
const c2 = new Carousel(document.querySelectorAll('.carousel')[1], slide)
//document.querySelectorAll('.carousel').forEach(carousel => new Carousel(carousel))
