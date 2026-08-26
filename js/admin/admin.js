/* ==========================================================
   ChampionshipOS v3
   Admin Controller
========================================================== */

"use strict";

/* ==========================================================
   ADMIN SECURITY
========================================================== */

import AdminLogin from "../auth/adminlogin.js";

if (!AdminLogin.isLoggedIn()) {

    window.location.href = "index.html";

}

/* ==========================================================
   IMPORT MODULES
========================================================== */

import Dashboard from "./dashboard.js";

import Tasks from "./tasks.js";

import Notifications from "./notifications.js";

import Learners from "./learners.js";

import Leaderboard from "./leaderboard.js";

import Badges from "./badges.js";

import Certificates from "./certificates.js";

import Analytics from "./analytics.js";

import Logout from "../auth/logout.js";

/* ==========================================================
   ADMIN MODULE
========================================================== */

const Admin = {

    initialized: false,

    init() {

        if (this.initialized) return;

        this.initialized = true;

        console.log("🏆 ChampionshipOS Admin Started");

        Dashboard.init();

        Tasks.init();

        Notifications.init();

        Learners.init();

        Leaderboard.init();

        Badges.init();

        Certificates.init();

        Analytics.init();

        Logout.bind("logoutBtn");

        console.log("✅ Admin Dashboard Ready");

    }

};

/* ==========================================================
   START
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        Admin.init();

    }

);

export default Admin;