import { postAdtoDb, auth, uploadImage } from '../../firebase/firebase.js'
import {  onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "../user/Auth.html";
  }
});


window.uploadAd = async function () {
  // e.preventDefault()
  const title = document.getElementById("title");
  const desc = document.getElementById("ad-desc");
  const price = document.getElementById("price");
  const image = document.getElementById("img").files[0];


  try{
    const imgResult = await uploadImage(image)
  await postAdtoDb(title.value, desc.value, price.value, imgResult)
  window.location.href = "../../index.html"
  }catch(e){
    console.log(e.message)
  }


  // var ad = new Ad(title.value, desc.value, price.value, imgResult);
  // adverts.push(ad)
  // localStorage.setItem("ads", JSON.stringify(adverts));


}



