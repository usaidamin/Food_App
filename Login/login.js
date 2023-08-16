import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

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

const auth = getAuth();


const formOpenBtn = document.querySelector("#open-form"),
home = document.querySelector(".home"),
formCloseBtn = document.querySelector("#close_form"),
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
 const loginBtn = document.getElementById("loginBtn")
 loginBtn.addEventListener("click",login)

 async function login(e){
    try {
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        console.log(email, password)
        loginBtn.innerHTML = `<div class="spinner-border text-light" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>`
        const userLogin = await signInWithEmailAndPassword(auth, email, password)
        console.log(userLogin)
        
        const docRef = doc(db,"users", userLogin.user.uid)
        const  docSnap = await getDoc(docRef)

        if(!docSnap.exists()){
            console.log("No Such Document")
            alert("Invalid user")
            return
        }
        const userData = docSnap.data()
        localStorage.setItem("user", JSON.stringify(userData))

        if (userData.type === "Admin") {
            window.location.replace("../Admin/admin.html")
            console.log(user)
        } else if (userData.type === "Vendor") {
            window.location.replace("../Vendor/vendor.html")

        } else if (userData.type === "Customer") {
            window.location.replace("../Customer/customer.html")

        }
    }
    catch (error) {
        console.log("error", error.message)
        loginBtn.className = "btn btn-danger"
        loginBtn.innerHTML = `Login`
        loginBtn.style.width = "100%"
        loginBtn.style.marginTop = "30px"
        loginBtn.style.padding = "10px 0"
        loginBtn.style.borderRadius = "10px"
        alert(error.message)
    }
 }
