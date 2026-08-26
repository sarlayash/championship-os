/* ============================================================
   CHAMPIONSHIP OS
   FIREBASE
============================================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {

    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    sendSignInLinkToEmail,
    signInWithEmailLink,
    isSignInWithEmailLink

} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {

    getFirestore,
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    onSnapshot,
    serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

/* ============================================================
   CONFIG
============================================================ */

const firebaseConfig = {

    apiKey: "AIzaSyDYVV-CWqRL-aKHp_lvqI6bZkI6nU8LoHw",

    authDomain: "championship-02-2026.firebaseapp.com",

    projectId: "championship-02-2026",

    storageBucket: "championship-02-2026.firebasestorage.app",

    messagingSenderId: "886718852702",

    appId: "1:886718852702:web:944ee16d2c7673ee98cecf",

    measurementId: "G-43LDXSEJGF"

};

/* ============================================================
   INITIALIZE
============================================================ */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const registrations = collection(db,"registrations");

const googleProvider = new GoogleAuthProvider();

/* ============================================================
   HELPERS
============================================================ */

function safeId(email){

    return encodeURIComponent(

        email.trim().toLowerCase()

    );

}

/* ============================================================
   GOOGLE
============================================================ */

async function googleLogin(){

    return await signInWithPopup(

        auth,

        googleProvider

    );

}

/* ============================================================
   MAGIC LINK
============================================================ */

const actionCodeSettings={

    url:window.location.href,

    handleCodeInApp:true

};

async function sendMagicLink(email){

    await sendSignInLinkToEmail(

        auth,

        email,

        actionCodeSettings

    );

    localStorage.setItem(

        "championship-email",

        email

    );

}

async function completeMagicLink(){

    if(

        !isSignInWithEmailLink(

            auth,

            window.location.href

        )

    ){

        return;

    }

    let email=localStorage.getItem(

        "championship-email"

    );

    if(!email){

        email=prompt(

            "Enter your registered email"

        );

    }

    const result=

        await signInWithEmailLink(

            auth,

            email,

            window.location.href

        );

    localStorage.removeItem(

        "championship-email"

    );

    return result;

}

/* ============================================================
   LOGOUT
============================================================ */

async function logout(){

    await signOut(auth);

}

/* ============================================================
   REGISTRATION
============================================================ */

async function registerParticipant(data){

    const record={

        name:data.name,

        email:data.email.toLowerCase(),

        college:data.college || "",

        team:data.team || "",

        registeredAt:serverTimestamp()

    };

    await setDoc(

        doc(

            registrations,

            safeId(record.email)

        ),

        record,

        {

            merge:true

        }

    );

    return record;

}

/* ============================================================
   GET PARTICIPANT
============================================================ */

async function getParticipant(email){

    const snap=await getDoc(

        doc(

            registrations,

            safeId(email)

        )

    );

    if(!snap.exists()){

        return null;

    }

    return snap.data();

}

/* ============================================================
   ALL PARTICIPANTS
============================================================ */

async function getParticipants(){

    const snapshot=

        await getDocs(registrations);

    return snapshot.docs.map(

        d=>d.data()

    );

}

/* ============================================================
   LIVE REGISTRATIONS
============================================================ */

onSnapshot(

    registrations,

    snapshot=>{

        window.firebaseRegistrations=

            snapshot.docs.map(

                doc=>({

                    id:doc.id,

                    ...doc.data()

                })

            );

        window.dispatchEvent(

            new Event(

                "firebase-registrations"

            )

        );

    }

);

/* ============================================================
   AUTH STATE
============================================================ */

onAuthStateChanged(

    auth,

    async(user)=>{

        window.currentUser=user || null;

        if(!user){

            return;

        }

        const profile=

            await getParticipant(

                user.email

            );

        window.currentParticipant=

            profile;

        window.dispatchEvent(

            new Event(

                "auth-ready"

            )

        );

    }

);

/* ============================================================
   PUBLIC API
============================================================ */

window.championship={

    auth,

    db,

    googleLogin,

    logout,

    sendMagicLink,

    completeMagicLink,

    registerParticipant,

    getParticipant,

    getParticipants

};