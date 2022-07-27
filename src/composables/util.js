
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