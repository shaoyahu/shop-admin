
import store from '@/store'
function hasPermission(value, el = false) {
  if (!Array.isArray(value)) {
    throw new Error(`需要配置权限,例如 v-permission`)
  }
  const hasAuth = value.findIndex(v => {
    return store.state.ruleNames.includes(v)
  }) != -1
  if (el && !hasAuth) {
    el.parentNode && el.parentNode.removeChild(el)
  }
  return hasAuth
}


export default {
  install(app) {
    app.directive('permission', {
      mounted(el, binding) {
        hasPermission(binding.value, el)
      },
    })
  }
}