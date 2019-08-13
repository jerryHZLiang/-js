
const $ = s=>document.querySelector(s)
const $$ = s=>document.querySelectorAll(s)

//事件代理
$('.carousel .dots').onclick = function(e){
    if(e.target.tagName !== 'SPAN') return
    let index = Array.from($$('.carousel .dots span')).indexOf(e.target)
    setDots(index)
    setPanels(index)
}

$('.pre').onclick = function(e){
    let index = Array.from($$('.carousel .dots span')).indexOf($('.carousel .dots .active'))

    //避免index值为负数
    index = (index-1 + $$('.carousel .dots span').length) % $$('.carousel .dots span').length
    setDots(index)
    setPanels(index)
}

$('.next').onclick = function(e){
    let index = Array.from($$('.carousel .dots span')).indexOf($('.carousel .dots .active'))
    //避免index值为负数
    index = (index+1) % $$('.carousel .dots span').length
    setDots(index)
    setPanels(index)
}

function setDots(index){
    $$('.carousel .dots span').forEach(dot => dot.classList.remove('active'))
    $$('.carousel .dots span')[index].classList.add('active')
}

function setPanels(index){
    $$('.carousel .panels a').forEach(penel => penel.style.zIndex = 1)
    $$('.carousel .panels a')[index].style.zIndex = 10
}