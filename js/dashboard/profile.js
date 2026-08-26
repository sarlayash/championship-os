/* ==========================================================
   ChampionshipOS v3
   Learner Profile Module
========================================================== */

"use strict";

/* ==========================================================
   PROFILE MODULE
========================================================== */

const Profile = {

    render(user) {

        const container = document.getElementById("profileCard");

        if (!container) return;

        container.className = "dashboard-card";

        container.innerHTML = `

<div class="profile-header">

<img
class="profile-photo"
src="${user.photoURL || "https://placehold.co/100x100"}"
alt="Profile"
>

<div>

<div class="profile-name">

${user.displayName || "Learner"}

</div>

<div class="profile-email">

${user.email || ""}

</div>

</div>

</div>

<div class="stats">

<div class="stat">

<h3 id="xpValue">0</h3>

<span>Total XP</span>

</div>

<div class="stat">

<h3 id="rankValue">#--</h3>

<span>Leaderboard Rank</span>

</div>

<div class="stat">

<h3 id="streakValue">0</h3>

<span>Day Streak</span>

</div>

<div class="stat">

<h3 id="badgeValue">0</h3>

<span>Badges</span>

</div>

</div>

`;

        this.loadStatistics();

    },

    /* ======================================================
       LOAD USER STATS
    ====================================================== */

    loadStatistics() {

        document.getElementById("xpValue").textContent = "0";

        document.getElementById("rankValue").textContent = "#--";

        document.getElementById("streakValue").textContent = "0";

        document.getElementById("badgeValue").textContent = "0";

    },

    /* ======================================================
       UPDATE STATS
    ====================================================== */

    update(data = {}) {

        if (document.getElementById("xpValue")) {

            document.getElementById("xpValue").textContent =
                data.xp ?? 0;

        }

        if (document.getElementById("rankValue")) {

            document.getElementById("rankValue").textContent =
                "#" + (data.rank ?? "--");

        }

        if (document.getElementById("streakValue")) {

            document.getElementById("streakValue").textContent =
                data.streak ?? 0;

        }

        if (document.getElementById("badgeValue")) {

            document.getElementById("badgeValue").textContent =
                data.badges ?? 0;

        }

    }

};

export default Profile;