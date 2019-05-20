import Vue from 'vue'
import VuebRouter from 'vue-router'
import axios from 'axios'
Vue.prototype.$http = axios

// 1. Use plugin.
// This installs <router-view> and <router-link>,
// and injects $bRouter and $bRoute to all router-enabled child components
Vue.use(VuebRouter)

// 2. Define route components
const Home = { template: '<div>home</div>' }
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 3. Create the router
const router = new VuebRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ]
})

// 4. Create and mount root instance.
// Make sure to inject the router.
// Route components will be rendered inside <router-view>.
global.app = new Vue({
  router,
  data: () => ({ n: 0 }),
  template: `
    <div id="app">
      <h1>Away Route</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/foo">/foo</router-link></li>
        <li><router-link to="/bar">/bar</router-link></li>
        <router-link tag="li" to="/bar" :event="['mousedown', 'touchstart']">
          <a>/bar</a>
        </router-link>
      </ul>
      <pre id="query-t">{{ $bRoute.query.t }}</pre>
      <pre id="hash">{{ $bRoute.hash }}</pre>
      <router-view class="view"></router-view>
    </div>
  `,
  methods: {
    routeChange () {
      // this.$bRouter.matcher.matchBackRoutes(this.$bRoute.path, this.routes) // Поиск роута по url
      // if (!this.$bRoute.matched[0]) this.$bRouter.replace('/404') // Роут не найден
      // if(this.$bRoute){// Роут найден
      //     // this.$bRoute.route = this.$bRouter.getParentRoute(this.$bRout.route);
      //     // this.$store.commit('setRouter',{ // Запись в vuex
      //     //     path: currentPath,
      //     //     route: this.$bRoute.route.meta.route,
      //     //     params: this.$bRoute.location.params ,
      //     //     id_field: this.$bRoute.route.meta.id_field
      //     // });
      //     this.currentComponent = this.$bRoute.component; // Смена компонента
      //     // this.key += 1; // Смена ключа компонента
      // }else{
      //     window.location = '#/404'; // Роут не найден
      // }
    },
    getRouters () {
      console.log('test')
      this.$http.post('http://127.0.0.1/FeRoutes/index', null)
        .then(res => {
          this.routes = res.data
          console.log(this.$bRouter.matcher.matchBackRoutes(this.$bRoute.path, this.routes))
        })
    }
  },
  mounted: function () {
    this.getRouters()
  }
}).$mount('#app')
