import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";


  const firebaseConfig = {
    apiKey: "AIzaSyDf5-PIh8Q4BoPLMzDt2zxLa-1XwyM9Q2s",
    authDomain: "food-app-76d42.firebaseapp.com",
    projectId: "food-app-76d42",
    storageBucket: "food-app-76d42.appspot.com",
    messagingSenderId: "627726992733",
    appId: "1:627726992733:web:7fd8654be517d966ced4b4"
  };

  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);



const formOpenBtn = document.querySelector("#form-open"),
home = document.querySelector(".home"),
formCloseBtn = document.querySelector(".form_close"),
pwShowHide = document.querySelectorAll(".pw_hide");

formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

pwShowHide.forEach(icon => {
    icon.addEventListener("click", () => {
        let getPwInput = icon.parentElement.querySelector("input");
        if(getPwInput.type === "password") {
            getPwInput.type = "text";
            icon.classList.replace("uil-eye-slash","uil-eye");
        }
        else{
            getPwInput.type = "password";
            icon.classList.replace("uil-eye","uil-eye-slash");
        }
    })
})

const signupBtn = document.querySelector("#signupBtn")
signupBtn.addEventListener("click", signUp)

async function signUp(e) {
    try {
        const fullName = document.getElementById("fullName").value
        const phoneNumber = document.getElementById("phoneNumber").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        const userType = document.getElementById("userType")

        if (!fullName || !phoneNumber || !email || !password) {
            alert("Please fill All Required Field")
            return
        }
        if (userType.selectedIndex === 0) {
            alert("Please Select User Type")
            return
        }
        const userAuth = await createUserWithEmailAndPassword(auth, email, password)
        console.log(userAuth.user.uid)
        const uid = userAuth.user.uid
        const userObj = {
            fullName,
            phoneNumber,
            email,
            accountActivate: true,
            uid,
            type: userType.value
        }
        const userRef = doc(db, "users", uid);
        const userDB = await setDoc(userRef, userObj)
        window.location.assign("../Login/index.html")
    } catch (error) {
        console.log("error", error.message)
        alert(error.message)
    }
}