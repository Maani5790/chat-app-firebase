import {adQuery} from '../../firebase/firebase.js';

const url = new URLSearchParams(window.location.search);
const id = url.get("id")

async function showAdPage(){
    try{
    const result = await adQuery(id)
    console.log(result)
    const div = document.getElementById("page")
    div.innerHTML = `
    <img src="${result[0].imgResult}" alt="">
        <h1>${result[0].title}</h1>
        <h2>${result[0].price}</h2>
        <h3>${result[0].desc}</h3>
        `
    }catch(e){
        console.log(e.message)
    }
}

showAdPage();