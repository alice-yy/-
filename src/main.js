import Vue from 'vue'
import App from './App.vue'
import {
  Button,
  Table,
  TableColumn,
  MessageBox,
  Message,
} from 'element-ui';
Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Table);
Vue.use(TableColumn);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
new Vue({
  render: h => h(App),
}).$mount('#app')