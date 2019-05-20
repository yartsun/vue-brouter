import Vue from 'vue'
import VuebRouter from '../../../src/index'

Vue.use(VuebRouter)

describe('custom query parse/stringify', () => {
  it('should work', () => {
    const router = new VuebRouter({
      parseQuery: () => ({ foo: 1 }),
      stringifyQuery: () => '?foo=1'
    })

    router.push('/?bar=2')

    expect(router.currentRoute.query).toEqual({ foo: 1 })
    expect(router.currentRoute.fullPath).toEqual('/?foo=1')
  })
})
