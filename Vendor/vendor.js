import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";

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
const storage = getStorage(app);

const productCollection = collection(db, "product")
const ProductForm = document.getElementById("productForm")
ProductForm.addEventListener("submit", addproduct)
window.addEventListener("load", getProduct)
window.addEventListener("load", userLogin)
const productParent = document.getElementById("productParent")
function userLogin(){
    const loginUser = JSON.parse(localStorage.getItem("user"))

    console.log(localStorage.getItem("user"))
    if (localStorage.getItem("user") === null) {
        window.location.replace("../Login/index.html")
        return
    } else {
        if (loginUser.type !== "Vendor") {
            history.back()
            return
        }
    }
}

async function getProduct() {
    console.log("getProduct")
    const getProduct = await getDocs(productCollection)
    getProduct.forEach(function (doc) {
        console.log(doc.data())
        productParent.innerHTML += `
        <div class="col-4 col-lg-4 col-md-6 col-sm-12 col-xsm-12 mt-5">
        <div class="card" style="width: 18rem;">
            <img src=${doc.data().imageUrl} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${doc.data().name}</h5>
                <p class="card-text">${doc.data().desc}</p>
                <a href="#" class="btn btn-primary">${doc.data().price}</a>
            </div>
        </div>
    </div>
        `
    })

}



async function addproduct(e) {
    try {
        e.preventDefault()
        const productName = e.target.productName.value
        const productDesc = e.target.productDesc.value
        const productPrice = e.target.productPrice.value
        const productImage = e.target.productImage
        console.log("productImage", productImage.files[0])

        const imageUrl = await uploadImage(productImage.files[0])

        const user = JSON.parse(localStorage.getItem("user"))
        const productObj = {
            name: productName,
            desc: productDesc,
            price: productPrice,
            userUid: user.uid,
            imageUrl: imageUrl.imageUrl
        }
        console.log("Add", productObj)

        await addDoc(productCollection, productObj)
        alert("Product Added Successfully")


    } catch (error) {
        alert(error.message)
    }


}




function uploadImage(file) {
    return new Promise(function (resolve, reject) {

        // Create the file metadata
        /** @type {any} */

        let imageUrl;
        const metadata = {
            contentType: 'image/jpeg'
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, 'productImages/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            function (snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },

            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                reject({
                    message: "something went wrong"
                })
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    resolve({
                        imageUrl: downloadURL
                    })
                });
            }
        );


    })
}
logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("user")
    window.location.replace("../Login/index.html")
})