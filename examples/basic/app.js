import Vue from 'vue'
import VuebRouter from 'vue-router'

// 1. Use plugin.
// This installs <router-view> and <router-link>,
// and injects $bRouter and $bRoute to all router-enabled child components
Vue.use(VuebRouter)

// 2. Define route components
const Home = { template: '<div>home</div>' }
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const Unicode = { template: '<div>unicode</div>' }

// 3. Create the router
const router = new VuebRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar },
    { path: '/é', component: Unicode }
  ]
})

// 4. Create and mount root instance.
// Make sure to inject the router.
// Route components will be rendered inside <router-view>.
new Vue({
  router,
  data: () => ({ n: 0 }),
  template: `
    <div id="app">
      <h1>Basic</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/foo">/foo</router-link></li>
        <li><router-link to="/bar">/bar</router-link></li>
        <router-link tag="li" to="/bar" :event="['mousedown', 'touchstart']">
          <a>/bar</a>
        </router-link>
        <li><router-link to="/é">/é</router-link></li>
        <li><router-link to="/é?t=%25ñ">/é?t=%ñ</router-link></li>
        <li><router-link to="/é#%25ñ">/é#%25ñ</router-link></li>
      </ul>
      <button id="navigate-btn" @click="navigateAndIncrement">On Success</button>
      <pre id="counter">{{ n }}</pre>
      <pre id="query-t">{{ $bRoute.query.t }}</pre>
      <pre id="hash">{{ $bRoute.hash }}</pre>
      <router-view class="view"></router-view>
    </div>
  `,

  methods: {
    navigateAndIncrement () {
      const increment = () => this.n++
      if (this.$bRoute.path === '/') {
        this.$bRouter.push('/foo', increment)
      } else {
        this.$bRouter.push('/', increment)
      }
    }
  }
}).$mount('#app')
