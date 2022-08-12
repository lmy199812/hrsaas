// import PageTools from '@/components/PageTools'
// export default {
//   install(Vue) {
//     Vue.component('PageTools', PageTools)
//   }
// }

import PageTools from '@/components/PageTools'
import UploadExcel from '@/components/UploadExcel'
const components = [PageTools, UploadExcel]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}
