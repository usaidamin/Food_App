import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

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

window.addEventListener("load",getProduct)

const productBody = document.getElementById("productBody");
const logoutBtn = document.getElementById("logout")

console.log(productBody)
console.log(logoutBtn)

async function getProduct(){
    const loginUser = JSON.parse(localStorage.getItem("user"))

    console.log(localStorage.getItem("user"))
    if (localStorage.getItem("user") === null) {
        window.location.replace("../index.html")
        return
    } else {
        if (loginUser.type !== "Customer") {
            history.back()
            return
        }
    }

    const docsRef = await getDocs(collection(db, "product"))
    docsRef.forEach((doc) => {
        const product = doc.data()
        if (product.type !== "Customer") {
            console.log("docs", doc.id, product)    
            const productUi = `<tr class = "text-center head">
            <td><img src=${product.imageUrl} class = "image"></td>
            <td>${product.name}</td>
            <td>${product.desc}</td>
            <td>${product.price}</td>
            <td class ="btn btn-primary mt-2">${"ORDER"}</td> 
            </tr>  `

            productBody.innerHTML += productUi
        }
    })
}

logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("user")
    window.location.replace("../index.html")
})
