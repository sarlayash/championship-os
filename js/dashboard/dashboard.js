/* ==========================================================
   ChampionshipOS v3
   Learner Dashboard Controller
========================================================== */

"use strict";

/* ==========================================================
   IMPORTS
========================================================== */

import { auth } from "../auth/firestore.js";
import Logout from "../auth/logout.js";

import Profile from "./profile.js";
import Notifications from "./notifications.js";
import Tasks from "./tasks.js";
import Badges from "./badges.js";
import Certificates from "./certificates.js";

/* ==========================================================
   DASHBOARD
========================================================== */

const Dashboard = {

    initialized: false,

    init() {

        if (this.initialized) return;

        this.initialized = true;

        auth.onAuthStateChanged(user => {

            if (!user) {

                window.location.href = "index.html";

                return;

            }

            Profile.render(user);

            Notifications.render(user);

            Tasks.render(user);

            Badges.render(user);

            Certificates.render(user);

            Logout.bind("logoutBtn");

            console.log("Learner Dashboard Loaded");

        });

    }

};

document.addEventListener(

    "DOMContentLoaded",

    () => Dashboard.init()

);

export default Dashboard;