import firebase from "firebase";
import { ref, onUnmounted } from "vue";

const firebaseConfig = {
    apiKey: "AIzaSyBlMuHlrogxf0wZChV-YVCMrcZ61w03psk",
    authDomain: "vue-crud-f2679.firebaseapp.com",
    projectId: "vue-crud-f2679",
    storageBucket: "vue-crud-f2679.appspot.com",
    messagingSenderId: "836541597841",
    appId: "1:836541597841:web:7f43603a862213ecbc1730"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const psykerCollection = db.collection("psykers");

  //CREATE FUNCTION
  export const createPsyker = psyker => {
      return usersCollection.add(psyker);
  }
  // READ/GET FUNCTION
  export const getUser = async id => {
      const psyker= await psykerCollection.doc(id).get();
      return psyker.exists ? psyker.data() : null;
  }
  // UPDATE FUNCTION
  export const updateUser = (id, psyker) => {
      return psykerCollection.doc(id).update(psyker);
  }
  // DELETE FUNCTION
  export const deleteUser = id => {
      return psykerCollection.doc(id).delete();
  }
  // REFERENCE TO PSYKERS THAT CHANGES ON UPDATE TO DB
  export const useLoadPsykers = () => {
      const psykers = ref([])
      const close = psykerCollection.onSnapshot(snapshot => {
        psykers.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      })
      onUnmounted(close);
      return psykers
  }

