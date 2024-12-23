// Import the functions you need from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBAfx48Ge0UGyJDpVzMI02OuhYUyqFAd-A",
    authDomain: "fts-project-2350a.firebaseapp.com",
    projectId: "fts-project-2350a",
    storageBucket: "fts-project-2350a.appspot.com",
    messagingSenderId: "814785421417",
    appId: "1:814785421417:web:35a0e04db23fe9352582f8",
    measurementId: "G-XR70MMNGK9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Sign-up function
window.signUp = () => {
    const fullName = document.getElementById('full-name').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log('User signed up:', user);

            // Store additional information in Firestore
            await setDoc(doc(db, "users", user.uid), {
                fullName: fullName,
                phoneNumber: phoneNumber,
                email: email
            });

            alert('Sign up successful!');
            // Redirect to dashboard
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error signing up:', errorCode, errorMessage);
            alert('Error signing up: ' + errorMessage);
        });
};

// Login function
window.login = () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Logged in
            const user = userCredential.user;
            console.log('User logged in:', user);
            alert('Login successful!');
            // Redirect to dashboard
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error logging in:', errorCode, errorMessage);
            alert('Error logging in: ' + errorMessage);
        });
};
