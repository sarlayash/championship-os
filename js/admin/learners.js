/* ==========================================================
   ChampionshipOS v3
   Learners Management
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
   LEARNERS MODULE
========================================================== */

const Learners = {

    async init() {

        await this.load();

    },

    /* ======================================================
       LOAD LEARNERS
    ====================================================== */

    async load() {

        try {

            const snapshot = await getDocs(

                collection(db, "users")

            );

            const container =

                document.getElementById("submissionList");

            if (!container) return;

            container.innerHTML = "";

            let count = 0;

            snapshot.forEach(doc => {

                const user = doc.data();

                if (user.role !== "learner") return;

                count++;

                container.innerHTML += `

<div class="learner-card">

<h3>${user.fullName || user.name || "Unnamed Learner"}</h3>

<p><strong>Email:</strong> ${user.email || "-"}</p>

<p><strong>College:</strong> ${user.college || "-"}</p>

<p><strong>Branch:</strong> ${user.branch || "-"}</p>

<p><strong>XP:</strong> ${user.xp || 0}</p>

<p><strong>Tasks Completed:</strong> ${user.tasksCompleted || 0}</p>

</div>

`;

            });

            if (count === 0) {

                container.innerHTML =

                    "<p>No learners registered yet.</p>";

            }

            console.log("Learners Loaded");

        }

        catch(error){

            console.error(error);

        }

    }

};

/* ==========================================================
   EXPORT
========================================================== */

export default Learners;