import Vue from 'vue'
import VuebRouter from '../../../src/index'

describe('[Vue Instance].$bRoute bindings', () => {
  describe('boundToSingleVueInstance', () => {
    it('updates $bRoute on all instances', () => {
      const router = new VuebRouter({
        routes: [
          { path: '/', component: { name: 'foo' }},
          { path: '/bar', component: { name: 'bar' }}
        ]
      })
      const app1 = new Vue({ router })
      const app2 = new Vue({ router })
      expect(app1.$bRoute.path).toBe('/')
      expect(app2.$bRoute.path).toBe('/')
      router.push('/bar')
      expect(app1.$bRoute.path).toBe('/bar')
      expect(app2.$bRoute.path).toBe('/bar')
    })
  })
})
