/* ==========================================================
   ChampionshipOS v3
   Admin Dashboard Module
========================================================== */

"use strict";

/* ==========================================================
   IMPORTS
========================================================== */

import { db } from "../auth/firestore.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

/* ==========================================================
   DASHBOARD MODULE
========================================================== */

const Dashboard = {

    async init() {

        console.log("📊 Loading Admin Dashboard...");

        await this.loadCounts();

    },

    /* ======================================================
       LOAD DASHBOARD COUNTS
    ====================================================== */

    async loadCounts() {

        try {

            const usersSnapshot =
                await getDocs(
                    collection(db, "users")
                );

            const tasksSnapshot =
                await getDocs(
                    collection(db, "tasks")
                );

            const submissionsSnapshot =
                await getDocs(
                    collection(db, "submissions")
                );

            let learnerCount = 0;

            let totalXP = 0;

            usersSnapshot.forEach(doc => {

                const data = doc.data();

                if (data.role === "learner") {

                    learnerCount++;

                }

                totalXP += data.xp || 0;

            });

            document.getElementById(
                "totalLearners"
            ).textContent = learnerCount;

            document.getElementById(
                "totalTasks"
            ).textContent = tasksSnapshot.size;

            document.getElementById(
                "pendingReviews"
            ).textContent = submissionsSnapshot.size;

            document.getElementById(
                "xpIssued"
            ).textContent = totalXP;

            console.log("✅ Dashboard Loaded");

        }

        catch (error) {

            console.error(

                "Dashboard Error",

                error

            );

        }

    }

};

/* ==========================================================
   EXPORT
========================================================== */

export default Dashboard;