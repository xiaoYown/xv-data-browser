import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import Entry from '@/utils/entry';
import InstallKeyMapsEvents from '@/core/events/key-maps';
import InstallMouseMapsEvents from '@/core/events/mouse-maps';

// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
// Vue.use(Antd);

import {
  Layout,
  Button,
  Form,
  Input
} from 'ant-design-vue';

// 全局注册键盘事件
Vue.use(InstallKeyMapsEvents);
// 全局注册鼠标事件
Vue.use(InstallMouseMapsEvents);

const { Header, Sider, Content, Footer } = Layout;
const { Item } = Form;

Vue.component(Layout.name, Layout);
Vue.component(Header.name, Header);
Vue.component(Content.name, Content);
Vue.component(Footer.name, Footer);
Vue.component(Sider.name, Sider);
Vue.component(Button.name, Button);
Vue.component(Form.name, Form);
Vue.component(Item.name, Item);
Vue.component(Input.name, Input);

Vue.config.productionTip = false;

const vm = Entry({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

if (module.hot) {
  module.hot.accept();
}

export default vm;
