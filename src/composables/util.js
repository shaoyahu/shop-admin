
// 将所有和消息通知的方法都封装在这个文件里

import { ElNotification, ElMessage, ElMessageBox } from 'element-plus'
import nprogress from 'nprogress'

// 提示
export function toast(message, type = 'success', dangerouslyUseHTMLString = true) {
  ElNotification({
    message,
    type,
    dangerouslyUseHTMLString,
    duration: 2000
  })
}

// 对话框
export function showModal(content = '提示内容', type = 'warning', title = '') {
  return ElMessageBox.confirm(
    content,
    title,
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type,
    }
  )
}

// 显示全屏loading
export function showFullLoading() {
  nprogress.start()
}

// 隐藏全屏loading
export function hideFullLoading() {
  nprogress.done()
}

// 弹出输入消息确定框
export function showPrompt(tip, value = '', title = '') {
  return ElMessageBox.prompt(tip, title, {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputValue: value
  })
}

// 将query对象转成url参数
export function queryParams(query) {
  let q = []
  for (const key in query) {
    if (query[key]) {
      q.push(`${key}=${encodeURIComponent(query[key])}`)
    }
  }
  let r = q.join('&')
  r = r ? ('?' + r) : ''
  return r
}

// 上移
export function useArrayMoveUp(arr, index) {
  swapArray(arr, index, index - 1)
}

// 下移
export function useArrayMoveDown(arr, index) {
  swapArray(arr, index, index + 1)
}


function swapArray(arr, index1, index2) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0]
  return arr
}

// sku排序算法
export function cartesianProductof() {
  return Array.prototype.reduce.call(arguments, function (a, b) {
    var ret = []
    a.forEach(function (a) {
      b.forEach(function (b) {
        ret.push(a.concat([b]));
      })
    })
    return ret;
  }, [
    []
  ])
}