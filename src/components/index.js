// import PageTools from '@/components/PageTools'
// export default {
//   install(Vue) {
//     Vue.component('PageTools', PageTools)
//   }
// }

import PageTools from '@/components/PageTools'
const components = [PageTools]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}
