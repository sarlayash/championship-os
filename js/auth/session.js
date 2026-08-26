/* ==========================================================
   ChampionshipOS v3
   Session Manager
========================================================== */

"use strict";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import { auth } from "./firestore.js";

const Session = {

    user: null,

    initialize(callback = null) {

        onAuthStateChanged(auth, user => {

            this.user = user;

            if (callback) {

                callback(user);

            }

        });

    },

    getUser() {

        return this.user;

    },

    isLoggedIn() {

        return this.user !== null;

    },

    async logout() {

        await signOut(auth);

        window.location.href = "index.html";

    }

};

export default Session;