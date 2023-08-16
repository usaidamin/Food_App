import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

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

window.addEventListener("load", getAllUser)


const tableBody = document.getElementById("tableBody")
const logoutBtn = document.getElementById("logoutBtn")

console.log("tableBody", tableBody)

async function getAllUser() {

    const loginUser = JSON.parse(localStorage.getItem("user"))

    console.log(localStorage.getItem("user"))
    if (localStorage.getItem("user") === null) {
        window.location.replace("../Login/index.html")
        return
    } else {
        if (loginUser.type !== "admin") {
            history.back()
            return
        }
    }

    const docsRef = await getDocs(collection(db, "users"))
    docsRef.forEach((doc) => {
        const user = doc.data()
        if (user.type !== "admin") {
            console.log("docs", doc.id, user)
            const rowUi = `<tr>
            <td>${user.fullName}</td>
            <td>${user.email}</td>
            <td>${user.phoneNumber}</td>
            <td>${user.type}</td>
            <td>${user.accountActivate ? `<div class="form-check form-switch">
            <input class="form-check-input ms-0" id=${user.uid}  onchange={handleAccountActivation(this)} type="checkbox"  checked>
          </div>` : `<div class="form-check form-switch">
          <input class="form-check-input ms-0" id=${user.uid}  onchange={handleAccountActivation(this)} type="checkbox" id="flexSwitchCheckChecked" >
        </div>`
                }</td >
             </tr > `

            tableBody.innerHTML += rowUi
        }
    })
}


async function handleAccountActivation(e) {
    console.log("handleAccountActivation", e.checked)
    console.log("handleAccountActivation", e.id)

    try {
        const userRef = doc(db, "users", e.id);
        await updateDoc(userRef, {
            accountActivate: e.checked
        })

    } catch (error) {
        alert(error.message)
        console.log(error.message)
    }
}

logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("user")
    window.location.replace("../Login/index.html")
})

window.handleAccountActivation = handleAccountActivation