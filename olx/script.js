import { getAds, auth, logoutfromfirebase } from "../../firebase/firebase.js";
// import { adPage } from "./views/details/details.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

loadAds();


let login = document.getElementById("login");
let logout = document.getElementById("logout");

onAuthStateChanged(auth, (user) => {
  if (user) {
    logout.style.display = "block";
    login.style.display = "none";
    console.log(user);
  } else {
    login.style.display = "block";
    logout.style.display = "none";
  }
});

window.logout = async function () {
  try {
    await logoutfromfirebase();
  } catch (e) {
    console.log(e.message);
  }
};

var row = document.getElementById("row");

var modal;
window.toggleModal = function (event) {
  modal = event.target.nextElementSibling;
  // console.log(event.target.nextElementSibling)
  modal.classList.toggle("show-modal");
};

function windowOnClick(event) {
  if (event.target == modal) {
    event.target.classList.toggle("show-modal");
  }
}

window.addEventListener("click", windowOnClick);

async function showAds() {
  try {
    const ads = await getAds();
    if (ads.length == 0) {
      console.log("No Ads");
      row.innerHTML = `<h1 style="margin: 0 auto;">No Ads</h1> `;
    }
    // console.log(ads[1])
    for (let item of ads) {
      row.insertAdjacentHTML(
        "afterBegin",
        `
        <div class="card-parent" onclick="goToDetail('${item.id}')">
              <div class="card">
                  <div class="start">
                      <button>featured</button>
                      <img src="${item.imgResult}" >
                      <i class="far fa-heart"></i>
                  </div>
              </div>
              <div class="card-child">
                  <h4>${item.price}</h4>
                  <h3>${item.title}</h3>
                  <button onclick="toggleModal(event)" class="view-ad button-3 trigger">View Ad</button>
                  
                      
                          </div>
                  </div>
              
          </div>`
      );
    }
  } catch (e) {
    console.log(e.message);
  }
}

async function loadAds() {
  await showAds();
  // let adCards = document.querySelectorAll(".card-parent");
  // for(let i = 0; i < adCards.length; i++){
  //   adCards[i].addEventListener('click', adPage)
  // }  
}


window.goToDetail = async function(id){
  console.log(id)
  location.href = `./views/details/details.html?id=${id}`
}