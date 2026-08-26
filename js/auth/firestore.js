/* ==========================================================
   ChampionshipOS v3
   Firebase Initialization
========================================================== */

"use strict";

/* ==========================================================
   FIREBASE IMPORTS
========================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

/* ==========================================================
   FIREBASE CONFIG
========================================================== */

const firebaseConfig = {

    apiKey: "AIzaSyDYVV-CWqRL-aKHp_lvqI6bZkI6nU8LoHw",

    authDomain: "championship-02-2026.firebaseapp.com",

    projectId: "championship-02-2026",

    storageBucket: "championship-02-2026.firebasestorage.app",

    messagingSenderId: "886718852702",

    appId: "1:886718852702:web:944ee16d2c7673ee98cecf",

    measurementId: "G-43LDXSEJGF"

};

/* ==========================================================
   INITIALIZE FIREBASE
========================================================== */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

/* ==========================================================
   EXPORTS
========================================================== */

export {

    app,

    auth,

    db

};

export default {

    app,

    auth,

    db

};