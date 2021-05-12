'use strict'
import Vue from 'vue'

import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

import moment from 'moment'
Vue.prototype.moment = moment

// Import the Auth0 configuration
import { domain, clientId, audience } from "../auth_config.json"

// Import the plugin here
import { Auth0Plugin } from "./auth"

Vue.config.productionTip = false

// API Gateway endpoint - e.g. https://2cmspxz1i4.execute-api.us-east-1.amazonaws.com
Vue.prototype.$APIurl = 'https://3srqhlsjh6.execute-api.us-east-1.amazonaws.com'

//  This is the region you selected in the SAM template deployment.
Vue.prototype.$region = 'us-east-1' // Your region

/* ===================================================
                    END CONFIGURATION
   =================================================== */

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }
})

export const bus = new Vue()

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
