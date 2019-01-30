import Vue from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate';
import router from './router';
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
Vue.use(VeeValidate);
// firebase init goes here
/*const config = {
  apiKey: "AIzaSyCTEC9MAoyUASLkPhpGhhHJ28FsHQGUpkw",
  authDomain: "vuetodoapp-af0fb.firebaseapp.com",
  databaseURL: "https://vuetodoapp-af0fb.firebaseio.com",
  projectId: "vuetodoapp-af0fb",
  storageBucket: "vuetodoapp-af0fb.appspot.com",
  messagingSenderId: "290616971984"
};
firebase.initializeApp(config)
// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const itemsCollection = db.collection('items')
export const db = firebase.firestore()
export {
  itemsCollection
}
*/
Vue.config.productionTip = false



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')