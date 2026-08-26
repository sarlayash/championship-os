/* ==========================================================
   ChampionshipOS v3
   Admin Login
========================================================== */

"use strict";

const ADMIN_USERNAME = "kapiladmin";
const ADMIN_PASSWORD = "admin123";

const AdminLogin = {

    login(username, password) {

        if (
            username === ADMIN_USERNAME &&
            password === ADMIN_PASSWORD
        ) {

            sessionStorage.setItem("admin", "true");

            window.location.href = "admin.html";

            return true;

        }

        alert("Invalid Admin Credentials");

        return false;

    },

    logout() {

        sessionStorage.removeItem("admin");

        window.location.href = "index.html";

    },

    isLoggedIn() {

        return sessionStorage.getItem("admin") === "true";

    }

};

export default AdminLogin;