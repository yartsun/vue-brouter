# Das Route-Objekt

Das **Route-Objekt** repräsentiert den Zustand der aktuell aktiven Route. Es enthält geparste Informationen zur aktuellen URL und den Route-Einträgen, die mit der URL gematched wurden.

Das Route-Objekt ist 'immutable' (unveränderbar). Jede erfolgreiche Navigation resultiert in einem neuen Route-Objekt.

Das Route-Objekt kann an mehreren Orten gefunden werden:

- in Komponenten als `this.$bRoute`

- in `$bRoute`-Watcher-Callbacks.

- als Rückgabewert von `router.match(location)`

- in Navigation-Guards als die ersten beiden Argumente:

  ``` js
  router.beforeEach((to, from, next) => {
    // 'to' und 'from' sind Router-Objekte
  })
  ```

- in der `scrollBehavior`-Funktion als die ersten beiden Argumente:

  ``` js
  const router = new VuebRouter({
    scrollBehavior (to, from, savedPosition) {
        // 'to' und 'from' sind Router-Objekte
    }
  })
  ```

### Eigenschaften des Router-Objekts

- **$bRoute.path**

  - Typ: `string`

    Ein String, der gleich dem Pfad der aktuellen Route ist immer als absoluter Pfad ausgegeben wird, zB. `"/foo/bar"`.

- **$bRoute.params**

  - Typ: `Object`

    Ein Objekt, welches Schlüssel/Wert-Paare von Stern- und dynamischen Segmenten enthält. Gibt es keine Parameter, ist der Wert ein leeres Objekt.

- **$bRoute.query**

  - Typ: `Object`

    Ein Objekt, welches Schlüssel/Wert-Paare des Query-Strings enthält. Für den Pfad `/foo?user=1` erhält man zum Beispiel `$bRoute.query.user == 1`. Gibt es kein Query, ist der Wert ein leeres Objekt.

- **$bRoute.hash**

  - Typ: `string`

    Der Hash der aktuellen Route (mit `#`). Gibt es keinen Hash, ist dessen Wert ein leerer String.

- **$bRoute.fullPath**

  - Typ: `string`

    Die voll umgewandelte URL inklusive Abfrage und Hash.

- **$bRoute.matched**

  - Typ: `Array<RouteRecord>`

  Ein Array von **Route-Einträgen** für alle verschachtelten Pfadsegmente der aktuellen Route. Route-Einträge sind Kopien der Objekte im Array der `routes`-Konfiguration (und deren `children`-Arrays):

  ``` js
  const router = new VuebRouter({
    routes: [
      // das folgende Objekt in ein Route-Eintrag
      { path: '/foo', component: Foo,
        children: [
          // das ist auch ein Route-Eintrag
          { path: 'bar', component: Bar }
        ]
      }
    ]
  })
  ```

  Wenn die URL `/foo/bar` ist, ist `$bRoute.matched` ein Array, welches beide geklonten Objekte von Parent nach Child sortiert enthält.

- **$bRoute.name**

  Der Name der aktuellen Route, sofern vorhanden. Siehe [Benannte Routes](../essentials/named-routes.md).
