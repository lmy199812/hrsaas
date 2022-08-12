export const imgError = {
  // 当被绑定的元素插入dom时
  // 令绑定的元素插入dom时，图片数据还没有请求回来
  inserted: function (el, { value }) {
    // 监听dom img 图片加载失败的事件
    if (!el.src) {
      // console.log(el.src)
      // console.log(value)
      el.src = value
    } else {
      // 聚焦元素
      el.onerror = function () {
        el.src = value
      }
    }
  },
  
  // 指令所绑定的元素更新时触发
  update(el, { value }) {
    el.src = value
  }
}
export const aa = {
  inserted() {}
}

export const bb = {
  inserted() {}
}
