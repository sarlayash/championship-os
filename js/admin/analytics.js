/* ==========================================================
   ChampionshipOS v3
   Analytics Module
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
   ANALYTICS
========================================================== */

const Analytics = {

    async init() {

        await this.load();

    },

    async load() {

        try {

            const users = await getDocs(
                collection(db, "users")
            );

            const tasks = await getDocs(
                collection(db, "tasks")
            );

            const submissions = await getDocs(
                collection(db, "submissions")
            );

            let learners = 0;

            let totalXP = 0;

            let profilesCompleted = 0;

            let totalBadges = 0;

            let totalCertificates = 0;

            users.forEach(doc => {

                const user = doc.data();

                if (user.role === "learner") {

                    learners++;

                }

                totalXP += user.xp || 0;

                if (user.profileCompleted) {

                    profilesCompleted++;

                }

                totalBadges +=
                    (user.badges || []).length;

                totalCertificates +=
                    (user.certificates || []).length;

            });

            const completion =

                learners === 0
                    ? 0
                    : Math.round(
                        (profilesCompleted / learners) * 100
                    );

            const analytics = document.getElementById("analytics");

            if (!analytics) return;

            analytics.innerHTML = `

<div class="analytics-grid">

<div class="analytics-card">
<h3>👨‍🎓 Learners</h3>
<h1>${learners}</h1>
</div>

<div class="analytics-card">
<h3>📚 Tasks</h3>
<h1>${tasks.size}</h1>
</div>

<div class="analytics-card">
<h3>📥 Submissions</h3>
<h1>${submissions.size}</h1>
</div>

<div class="analytics-card">
<h3>⭐ Total XP</h3>
<h1>${totalXP}</h1>
</div>

<div class="analytics-card">
<h3>🏅 Badges</h3>
<h1>${totalBadges}</h1>
</div>

<div class="analytics-card">
<h3>📜 Certificates</h3>
<h1>${totalCertificates}</h1>
</div>

<div class="analytics-card">
<h3>✅ Profile Completion</h3>
<h1>${completion}%</h1>
</div>

</div>

`;

            console.log("Analytics Loaded");

        }

        catch(error){

            console.error(error);

        }

    }

};

export default Analytics;