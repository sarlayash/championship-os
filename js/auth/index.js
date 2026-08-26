/* ==========================================================
   ChampionshipOS v3
   Authentication Bootstrap
========================================================== */

"use strict";

/* ==========================================================
   IMPORTS
========================================================== */

import Session from "./session.js";

import { db } from "./firestore.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

/* ==========================================================
   SESSION BOOTSTRAP
========================================================== */

Session.initialize(async (user) => {

    const page = window.location.pathname.toLowerCase();

    const isIndex = page.endsWith("index.html") || page.endsWith("/");

    const isProfile = page.endsWith("profile.html");

    const isLearner = page.endsWith("learner.html");

    const isAdmin = page.endsWith("admin.html");

    /* ==========================================
       USER NOT LOGGED IN
    ========================================== */

    if (!user) {

        if (isLearner || isAdmin || isProfile) {

            window.location.href = "index.html";

        }

        return;

    }

    /* ==========================================
       LOAD FIRESTORE PROFILE
    ========================================== */

    let profileCompleted = false;

    try {

        const snapshot = await getDoc(
            doc(db, "users", user.uid)
        );

        if (snapshot.exists()) {

            profileCompleted =
                snapshot.data().profileCompleted === true;

        }

    }

    catch (error) {

        console.error(
            "Unable to read user profile",
            error
        );

    }

    /* ==========================================
       INDEX PAGE
    ========================================== */

    if (isIndex) {

        window.location.href = profileCompleted
            ? "learner.html"
            : "profile.html";

        return;

    }

    /* ==========================================
       BLOCK LEARNER UNTIL PROFILE COMPLETE
    ========================================== */

    if (isLearner && !profileCompleted) {

        window.location.href = "profile.html";

        return;

    }

});