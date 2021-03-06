# はじめに

> ガイド内のコードのサンプルは [ES2015](https://github.com/lukehoban/es6features) を使っています。

Vue.js と vue-router を使ったシングルページアプリケーションの構築は驚くほど簡単です。Vue.js のコンポーネントを使ってアプリケーションを既に構成しています。vue-router を混ぜ込むには、コンポーネントとルートをマッピングさせて vue-router にどこで描画するかを知らせるだけです。以下が基本的な例です。

> すべての example では、vue の完全バージョンを使用してテンプレートを解析可能にしています。詳細は[こちら](https://jp.vuejs.org/v2/guide/installation.html#ランタイム-コンパイラとランタイム限定の違い)を参照してください。

### HTML

``` html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- ナビゲーションに router-link コンポーネントを使う -->
    <!-- リンク先を `to` プロパティに指定します -->
    <!-- デフォルトで `<router-link>` は `<a>` タグとして描画されます -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- ルートアウトレット -->
  <!-- ルートとマッチしたコンポーネントがここへ描画されます -->
  <router-view></router-view>
</div>
```

### JavaScript

``` js
// 0. モジュールシステムを使っている場合 (例: vue-cli 経由で)、Vue と VuebRouter をインポートし、`Vue.use(VuebRouter)` を呼び出します。

// 1. ルートコンポーネントを定義します
// 他のファイルからインポートすることもできます
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. ルートをいくつか定義します
// 各ルートは 1 つのコンポーネントとマッピングされる必要があります。
// このコンポーネントは実際の `Vue.extend()`、
// またはコンポーネントオプションのオブジェクトでも構いません。
// ネストされたルートに関しては後で説明します
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. ルーターインスタンスを作成して、ルートオプションを渡します
// 追加のオプションをここで指定できますが、
// この例ではシンプルにしましょう
const router = new VuebRouter({
  routes // `routes: routes` の短縮表記
})

// 4. root となるインスタンスを作成してマウントします
// アプリケーション全体がルーターを認知できるように、
// ルーターをインジェクトすることを忘れないでください。
const app = new Vue({
  router
}).$mount('#app')

// これで開始です!
```

ルーターを注入することによって、`this.$bRouter` と同様、任意のコンポーネント内部で現在のルートを `this.$bRoute` としてアクセスすることができます:

```js
// Home.vue
export default {
  computed: {
    username () {
      // `params` が表示される
      return this.$bRoute.params.username
    }
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$bRouter.go(-1)
        : this.$bRouter.push('/')
    }
  }
}
```

ドキュメントを通して、しばしば `router` インスタンスを使用することがよくあります。`this.$bRouter` は `router` を使用するのと全く同じです。`this.$bRouter` を使用する理由は、ルーティング操作する必要がある全てのコンポーネントにルーターをインポートしたくないからです。

[動作](https://jsfiddle.net/yyx990803/xgrjzsup/) の例も確認してみてください.

`<router-link>` は対象のルートがマッチした時に自動的に `.router-link-active` が付与されるのにお気づきでしょうか。
より詳細については [API リファレンス](../api/router-link.md) をご参照ください。
