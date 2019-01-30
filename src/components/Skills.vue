<template>
  <!--In templates, can put html, vue interpolation and vue directives-->
  <div class="hello" onload="getItemsFromFirebase()">
    <div class="holder">
      <form @submit.prevent="addItemToListAndDB">
        <input
          type="text"
          placeholder="Enter a skill you have..."
          v-model="skill"
          v-validate="'min:3'"
          name="skill"
        >
        <transition
          name="alert-in"
          enter-active-class="animated flipInX"
          leave-active-class="animated flipOutX"
        >
          <p class="alert" v-if="errors.has('skill')">{{errors.first('skill')}}</p>
        </transition>
      </form>
      <ul>
        <transition-group
          name="list"
          enter-active-class="animated bounceInUp"
          leave-active-class="animated bounceOutDown"
        >
          <li v-for="(data, index) in skills" :key="index+0">
            {{data.skill}}
            <i class="fa fa-minus-circle" v-on:click="remove(index)"></i>
          </li>
        </transition-group>
      </ul>
      <p>These are the skills that you possess.</p>
    </div>
    <!--the v-on is a vue-directive-->
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "Skills",
  data() {
    return {
      skill: "", /// current item user will enter
      skills: [] // empty array for the entire list
    };
  },
  methods: {
    getItemsFromFirebase() {
      db.collection("itemsToDo")
        .get()
        .then(querySnapshot => {
          this.loading = false;
          querySnapshot.forEach(doc => {
            // iterating through all docs in the database
            let data = {
              skill: doc.data().listItem
            };
            this.skills.push(data);
          });
        });
    },
    addItemToListAndDB() {
      this.$validator.validateAll().then(result => {
        if (result) {
          // validation is sucessful
          this.skills.push({ skill: this.skill });
          db.collection("itemsToDo")
            .add({
              listItem: this.skill,
              slug: this.generateUUID()
            })
            .then(function(docRef) {
              console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
              console.error("Error adding document: ", error);
            });
          this.skill = ""; // clear the user field
        } else {
          console.log("not valid"); // invalid input
        }
      });
    },
    remove(id) {
      db.collection("itemsToDo")
        .doc(getDocAtIndexAndDB(id))
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
      this.skills.splice(id, 1); // remove from the array
    },
    getDocAtIndexAndDB: function(indexNum) {
      //TODO: chrome says this function is not defined
      nameToRemove = this.skills[indexNum];
      db.collection("itemsToDo")
        .get()
        .then(querySnapshot => {
          this.loading = false;
          querySnapshot.forEach(doc => {
            if (nameToRemove == doc.data().listItem) return doc.id;
          });
        });
    },
    generateUUID() {
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
