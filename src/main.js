import Vue from 'vue';
import App from './App.vue';
import router from './router';
import "./assets/styles/styles.css";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHatWizard, faPlus, faTrashCan, faPencil, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faHatWizard, faPlus, faTrashCan, faPencil, faFacebook, faInstagram, faTwitter, faLocationDot )

Vue.component('v-select', vSelect)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
