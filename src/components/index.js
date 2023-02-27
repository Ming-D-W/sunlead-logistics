import MyDialog from '@/components/MyDialog/index.vue'
import EmptyImg from '@/components/EmptyImg/index.vue'
import MyStatus from '@/components/MyStatus/index.vue'

export default {
  install (Vue) {
    Vue.component(MyDialog.name, MyDialog)
    Vue.component(EmptyImg.name, EmptyImg)
    Vue.component(MyStatus.name, MyStatus)
  }
}
