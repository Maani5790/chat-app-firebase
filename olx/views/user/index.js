import { signInFirebase, signUpFirebase} from '../../firebase/firebase.js'

window.signUp = async function () {
    //1. values get karunga
    const allInputs = document.getElementsByTagName('input')

    const email = allInputs[0].value
    const password = allInputs[1].value
    const fullname = allInputs[2].value
    const age = allInputs[3].value

    //2. firebase ka signin function call karunga
    try{
       await signUpFirebase({ email, password, fullname, age })
       window.location.href = "../../index.html"
    }catch(e){
        console.log(e.message)
    }
    //3. success alert
    //4. navigate to dashboard 
}


window.signIn = async function () {
    //1. values get karunga
    const email = document.getElementsByTagName('input')[0].value
    const password = document.getElementsByTagName('input')[1].value

    //2. firebase ka signin function call karunga
    try{
        await signInFirebase(email, password)
        window.location.href = "../../index.html"
    }catch(e){
        console.log(e.message)
    }


    //3. success alert

    //4. navigate to dashboard 
}
