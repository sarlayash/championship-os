/* ==========================================================
   ChampionshipOS v3
   Admin Login Page
========================================================== */

"use strict";

/* ==========================================================
   IMPORT
========================================================== */

import AdminLogin from "./adminlogin.js";

/* ==========================================================
   LOGIN PAGE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const loginButton = document.getElementById("adminLoginBtn");

    const username = document.getElementById("adminUser");

    const password = document.getElementById("adminPassword");

    const error = document.getElementById("loginError");

    loginButton.addEventListener("click", () => {

        error.textContent = "";

        const user = username.value.trim();

        const pass = password.value;

        if (!user || !pass) {

            error.textContent = "Please enter Admin ID and Password.";

            return;

        }

        const success = AdminLogin.login(user, pass);

        if (!success) {

            error.textContent = "Invalid Admin ID or Password.";

            password.value = "";

            password.focus();

        }

    });

    password.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            loginButton.click();

        }

    });

});