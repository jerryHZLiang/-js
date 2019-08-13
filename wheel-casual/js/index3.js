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

function fade(fromNode, toNode,callback) {
    console.group(fromNode,toNode)
    callback()
}

const c = new Carousel(document.querySelector('.carousel'), fade)
//document.querySelectorAll('.carousel').forEach(carousel => new Carousel(carousel))
