import Vue from 'vue'
import VuebRouter from '../../../src/index'

Vue.use(VuebRouter)

describe('Usage in Node', () => {
  it('should be in abstract mode', () => {
    const router = new VuebRouter()
    expect(router.mode).toBe('abstract')
  })

  it('should be able to navigate without app instance', () => {
    const router = new VuebRouter({
      routes: [
        { path: '/', component: { name: 'foo' }},
        { path: '/bar', component: { name: 'bar' }}
      ]
    })
    router.push('/bar')
    expect(router.history.current.path).toBe('/bar')
  })

  it('getMatchedComponents', () => {
    const Foo = { name: 'foo' }
    const Bar = { name: 'bar' }
    const Baz = { name: 'baz' }
    const router = new VuebRouter({
      routes: [
        { path: '/', component: Foo },
        { path: '/bar', component: Bar, children: [
          { path: 'baz', component: Baz }
        ] }
      ]
    })
    expect(router.getMatchedComponents('/')).toEqual([Foo])
    expect(router.getMatchedComponents('/bar/baz')).toEqual([Bar, Baz])
  })
})
