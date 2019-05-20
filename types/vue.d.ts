/**
 * Augment the typings of Vue.js
 */

import Vue from "vue";
import VuebRouter, { Route, RawLocation, NavigationGuard } from "./index";

declare module "vue/types/vue" {
  interface Vue {
    $bRouter: VuebRouter;
    $bRoute: Route;
  }
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    router?: VuebRouter;
    beforeRouteEnter?: NavigationGuard<V>;
    beforeRouteLeave?: NavigationGuard<V>;
    beforeRouteUpdate?: NavigationGuard<V>;
  }
}
