import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'
const firebaseApp = firebase.initializeApp(firebaseConfig)
const settings = {
    timestampsInSnapshots: true
}
export default firebaseApp.firestore()

/*
export const db = firebase.firestore()
db.settings(settings)
const itemsCollection = db.collection('items')

// firebase collections
export {
    itemsCollection
}
*/