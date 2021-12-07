import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyDorhWz5YgHS_fzNMp31_3yfRQqQ8EMKjU",
    authDomain: "crwn-db-884d7.firebaseapp.com",
    projectId: "crwn-db-884d7",
    storageBucket: "crwn-db-884d7.appspot.com",
    messagingSenderId: "115548706168",
    appId: "1:115548706168:web:7537923d1d9fea7cfca48d",
    measurementId: "G-QBGB8JWHDC"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) { // check if user exist in firestore
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log("Error createing user", error.message);
        }
    }

    return userRef;
}

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;