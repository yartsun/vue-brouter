import Vue from 'vue'
import VuebRouter from 'vue-router'
import axios from 'axios'
Vue.prototype.$http = axios

// 1. Use plugin.
// This installs <router-view> and <router-link>,
// and injects $bRouter and $bRoute to all router-enabled child components
Vue.use(VuebRouter)

// 3. Create the router
const router = new VuebRouter({
  mode: 'history',
  base: __dirname,
  routes: []
})

// 4. Create and mount root instance.
// Make sure to inject the router.
// Route components will be rendered inside <router-view>.
global.app = new Vue({
  router,
  data: () => ({ n: 0, routes: [], routeMap: { }}),
  template: `
    <div id="app">
      <h1>Away Route</h1>
      <ul v-for="route in routes" :key="route.name">
        <li><router-link :to="route.path">{{route.name}}</router-link></li>
      </ul>
      <pre id="query-t">{{ $bRoute.query.t }}</pre>
      <pre id="hash">{{ $bRoute.hash }}</pre>
      <router-view class="view"></router-view>
    </div>
  `,
  watch: {
    '$bRoute.path': function (old) {
      this.routeChange()
    }
  },
  methods: {
    routeChange () {
      const result = this.$bRouter.matcher.matchBackRoutes(this.$bRoute.path, this.routes, this.routeMap) // Поиск роута по url

      this.routeMap = result

      if (!this.$bRoute.matched[0]) this.$bRouter.replace('/404') // Роут не найден
    },
    getRouters () {
      this.$http.post('http://127.0.0.1/api/FeRoutes/index', null)
        .then(res => {
          this.routes = res.data
          this.routeChange()
        })
    }
  },
  mounted: function () {
    this.getRouters()
  }
}).$mount('#app')
