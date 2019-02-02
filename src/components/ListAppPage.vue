<template>
  <!--In templates, can put html, vue interpolation ({{stuff}})  and vue directives-->
  <div class="hello" onload="getItemsFromFirebase()">
    <div class="holder">
      <form @submit.prevent="addItemToListAndFirestore">
        <input
          type="text"
          placeholder="Enter a pending task..."
          v-model="itemName"
          v-validate="'min:3'"
          name="itemName"
        >
        <transition
          name="alert-in"
          enter-active-class="animated flipInX"
          leave-active-class="animated flipOutX"
        >
          <p class="alert" v-if="errors.has('itemName')">{{errors.first('itemName')}}</p>
        </transition>
      </form>
      <ul>
        <transition-group
          name="list"
          enter-active-class="animated bounceInUp"
          leave-active-class="animated bounceOutDown"
        >
          <li v-for="(data, index) in localList" :key="index+0">
            {{data.itemName}}
            <!--  data is the object, .itemName is the string in the object -->
            <i class="fa fa-trash" v-on:click="remove(index)"></i>
          </li>
        </transition-group>
      </ul>
      <p>This is your current to-do list.</p>
    </div>
    <!-- A v-on type things are a vue-directive-->
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "ListAppPage",
  data() {
    return {
      itemName: "", /// current item user will enter
      localList: [] // empty array for the entire list of item objects
    };
  },
  methods: {
    getItemsFromFirebase() {
      db.collection("itemsToDo")
        .get()
        .then(querySnapshot => {
          // querySnapshot is the firebase object for the database as it is when this function is called
          // https://firebase.google.com/docs/reference/js/firebase.firestore.QuerySnapshot
          this.loading = false;
          querySnapshot.forEach(doc => {
            // iterating through all docs in the database
            let data = {
              // our own custom object
              idInFirestore: doc.id,
              itemName: doc.data().listItem
            };
            this.localList.push(data);
          });
          console.log(querySnapshot.docs[1].data()); // gets 1st doc from firebase collection
          for (var item in this.localList) {
            console.log(this.localList[item]);
          }
        });
    },
    addItemToListAndFirestore() {
      this.$validator.validateAll().then(result => {
        if (result) {
          // validation is sucessful
          this.localList.push({ itemName: this.itemName });
          db.collection("itemsToDo")
            .add({
              listItem: this.itemName,
              slug: this.generateUUID()
            })
            .then(function(docRef) {
              console.log("Document written to firestore with ID: ", docRef.id);
            })
            .catch(function(error) {
              console.error("Error adding document to firestore: ", error);
            });
          this.itemName = ""; // clear the user field
        } else {
          console.log("not valid"); // invalid input
        }
      });
    },
    /*
    getDocAtIndexAndDB(nameToRemove) {
      //TODO: chrome says this function is not defined
      db.collection("itemsToDo")
        .get()
        .then(querySnapshot => {
          this.loading = false;
          querySnapshot.forEach(doc => {
            console.log(doc.data().listItem);
            if (nameToRemove == doc.data().listItem) return doc.id;
          });
        });
    },
    */

    remove(id) {
      //console.log(this.localList[id]);
      db.collection("itemsToDo")
        .doc(this.localList[id].idInFirestore) //.doc("macWrmsjwtEJctYShm7g") //getDocAtIndexAndDB(this.localList[id].itemName)
        // since we store the docId in our array of objects now, we can just use it from there instead of searching through Firebase for the document that contains our string
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
      this.localList.splice(id, 1); // remove from the local array
    },
    generateUUID() {
      // just a function to attach a identifier to each document in the collection in Firebase
      let d = new Date().getTime();
      let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function(c) {
          let r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
      return uuid;
    }
  },
  beforeMount() {
    // as soon as the page starts to load, we will call this function
    this.getItemsFromFirebase();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
.holder {
  background: #fff;
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

ul li {
  padding: 20px;
  font-size: 1.3em;
  background-color: #e0edf4;
  border-left: 5px solid #3eb3f6;
  margin-bottom: 2px;
  color: #3e5252;
}

p {
  text-align: center;
  padding: 30px 0;
  color: gray;
}

.container {
  box-shadow: 0px 0px 40px lightgray;
}
input {
  width: calc(100% - 40px);
  border: 0;
  padding: 20px;
  font-size: 1.3em;
  background-color: #323333;
  color: #687f7f;
}
.alert {
  background: #fdf2ce;
  font-weight: bold;
  display: inline-block;
  padding: 5px;
  margin-top: -20px;
}
i {
  float: right;
  cursor: pointer;
}
</style>
