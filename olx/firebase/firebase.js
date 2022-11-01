import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import {getStorage, ref, uploadBytes, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js"


const firebaseConfig = {
  apiKey: "AIzaSyBuUtnJvMoN6JMNkqwKTqrTSTV8iZ2Y154",
  authDomain: "olx-app-48815.firebaseapp.com",
  projectId: "olx-app-48815",
  storageBucket: "olx-app-48815.appspot.com",
  messagingSenderId: "658346258097",
  appId: "1:658346258097:web:bfa86d9161faae9c913c90",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)

function signInFirebase(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

function logoutfromfirebase() {
  return signOut(auth);
}

async function signUpFirebase(userInfo) {
  const { email, password } = userInfo;
  const userCredentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await addUserToDb(userInfo, userCredentials.user.uid);

  // .then((userCredential) => {
  //     // Signed in
  //     const user = userCredential.user;
  //     // ...

  //     window.location.href = "../addForm/addForm.html"

  //     // alert('Successfully Registered')
  // })
  // .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // ..
  //     console.log('Error: ', errorMessage)
  // });
}

function addUserToDb(userInfo, uid) {
  const { email, fullname, age } = userInfo;
  return setDoc(doc(db, "users", uid), { email, fullname, age });
}

async function uploadImage(image){
  const storageRef = ref(storage, `images/${image.name}`);
  const snapshot = await uploadBytes(storageRef, image);
  const url = await getDownloadURL(snapshot.ref)
  return url
}
function postAdtoDb(title, desc, price, imgResult) {
  const userId = auth.currentUser.uid;
  return addDoc(collection(db, "ads"), {
    title,
    desc,
    price,
    imgResult,
    userId,
  });
}

async function getAds() {
  const querySnapshot = await getDocs(collection(db, "ads"));
  let ads = [];
  querySnapshot.forEach((doc) => {
    ads.push({ id: doc.id, ...doc.data() });
  });
  return ads;
}

async function adQuery(id) {
  try {
    const ad = [];
    const docRef = doc(db, "ads", id);
    const docSnap = await getDoc(docRef);
    ad.push(docSnap.data());
    return ad;
  } catch (e) {
    console.log(e.message);
  }
}

export {
  signInFirebase,
  signUpFirebase,
  postAdtoDb,
  getAds,
  auth,
  logoutfromfirebase,
  adQuery,
  uploadImage,
};
