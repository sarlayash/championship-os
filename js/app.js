/* ==========================================================
   ChampionshipOS v3
   app.js
   Main Application Controller
========================================================== */

"use strict";

/* ==========================================================
   IMPORTS
========================================================== */

import Auth from "./auth/auth.js";

/* ==========================================================
   APPLICATION
========================================================== */

const App = {

    initialized: false,

    init() {

        if (this.initialized) return;

        this.initialized = true;

        this.bindNavigation();

        this.bindButtons();

        console.log("🏆 ChampionshipOS v3 Started");

    },

    /* ======================================================
       NAVIGATION
    ====================================================== */

    bindNavigation() {

        document
            .querySelectorAll('a[href^="#"]')
            .forEach(link => {

                link.addEventListener("click", event => {

                    const target = document.querySelector(
                        link.getAttribute("href")
                    );

                    if (!target) return;

                    event.preventDefault();

                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                });

            });

    },

    /* ======================================================
       BUTTONS
    ====================================================== */

    bindButtons() {

        const joinButton =
            document.getElementById("joinBtn");

        if (joinButton) {

            joinButton.addEventListener("click", () => {

                Auth.open();

            });

        }

        const googleButton =
            document.getElementById("startJourney");

        if (googleButton) {

            googleButton.addEventListener("click", () => {

                Auth.open();

            });

        }

    }

};

/* ==========================================================
   START
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        App.init();

    }

);

export default App;