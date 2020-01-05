import Vue from 'vue'
// vue-quill-editor富文本编辑器
import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
Vue.use(VueQuillEditor)

export default {
    install(Vue){
        Vue.component('quill-editor', quillEditor) // 全局注册富文本
    }
}