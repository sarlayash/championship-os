/* ==========================================================
   ChampionshipOS v3
   Authentication Controller
========================================================== */

"use strict";

/* ==========================================================
   IMPORTS
========================================================== */

import Modal from "./modal.js";
import Google from "./google.js";

/* ==========================================================
   AUTH CONTROLLER
========================================================== */

const Auth = {

    initialized: false,

    init() {

        if (this.initialized) return;

        this.initialized = true;

        console.log("Authentication Ready");

    },

    /* ======================================================
       OPEN AUTH MODAL
    ====================================================== */

    open() {

        Modal.open();

    },

    /* ======================================================
       CLOSE AUTH MODAL
    ====================================================== */

    close() {

        Modal.close();

    },

    /* ======================================================
       GOOGLE SIGN IN
    ====================================================== */

    async signInWithGoogle() {

        try {

            await Google.signIn();

        }

        catch(error){

            console.error(error);

            alert(error.message);

        }

    }

};

Auth.init();

export default Auth;