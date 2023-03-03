//读取元素样式 el:元素  attr:属性（字符串)
function getStyle(el, attr) {
    return window.getComputedStyle(el)[attr];
}

//速度回调函数
//moveFn(元素,属性,目标位置,步长,速度,回调函数)
function moveFn(el, attr, target, step, speed, callback) {
    //处理负值步长：如果元素位置<目标位置?正步长:负步长
    step = parseFloat(getStyle(el, attr)) < target ? step : -step
    //创建定时器之前先清除定时器
    clearInterval(timer)
    //创建定时器
    timer = setInterval(function () {
        //temp:临时变量 存储当前元素的属性值
        let temp = parseFloat(getStyle(el, attr))//50px
        //attrValue: 在元素当前位置上 + 步长（才可以动起来）
        let attrValue = temp + step
        //如果step是正值就执行attrVale > target||如果step是负值，就执行attralue < target
        if (attrValue > target && step > 0 || attrValue < target && step < 0) {
            //让当前位置 = 目标点位置
            attrValue = target
            //清除定时器
            clearInterval(timer)
        }
        //修改元素的属性值 运动到此结束
        el.style[attr] = attrValue + 'px'
        //如果属性值 等于 目标点位置，就清除定时器
        if (attrValue === target) {
            clearInterval(timer)
            // if(callback){
            //     callback()
            // }
            callback && callback()
        }
    }, speed)
}