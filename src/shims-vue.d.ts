

declare module '*.vue' {
  import Vue from 'vue';
  import {Message} from 'iview';
  interface Vues {
    /**
     * 全局提示
     */
    $Message: Message;

  }
  export default Vue;
}



// declare module 'vue/types/vue' {
//   import {Message} from 'iview';
//   import {Route} from 'vue-router';
//   import {VueRouter} from 'vue-router/types/router';
//   import {Store} from 'vuex';
//   interface Vue {
//     /**
//      * 全局提示
//      */
//     $Message: Message;
//     $router: VueRouter; // 这表示this下有这个东西
//     $route: Route;
//     // @ts-ignore
//     $store: Store;
//   }
// }
