/* ==========================================================
   ChampionshipOS v3
   Logout
========================================================== */

"use strict";

import Session from "./session.js";

const Logout = {

    bind(buttonId = "logoutBtn") {

        const button = document.getElementById(buttonId);

        if (!button) return;

        button.addEventListener("click", async () => {

            await Session.logout();

        });

    }

};

export default Logout;