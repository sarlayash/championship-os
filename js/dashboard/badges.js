/* ==========================================================
   ChampionshipOS v3
   Badges Module
========================================================== */

"use strict";

/* ==========================================================
   BADGES
========================================================== */

const Badges = {

    render() {

        const container = document.getElementById("badgeCard");

        if (!container) return;

        container.className = "dashboard-card";

        container.innerHTML = `

<h2>

🏅 Achievement Badges

</h2>

<div
id="badgeContainer"
class="badges"
>

<div class="badge">

🔥 Beginner

</div>

<div class="badge">

⭐ First Login

</div>

<div class="badge">

💻 Java Explorer

</div>

</div>

`;

    },

    /* ======================================================
       LOAD FROM FIRESTORE
    ====================================================== */

    load(badges = []) {

        const container = document.getElementById("badgeContainer");

        if (!container) return;

        container.innerHTML = "";

        if (badges.length === 0) {

            container.innerHTML = `

<p>

No badges earned yet.

Complete today's challenge to earn your first badge.

</p>

`;

            return;

        }

        badges.forEach(badge => {

            const item = document.createElement("div");

            item.className = "badge";

            item.textContent = badge;

            container.appendChild(item);

        });

    },

    /* ======================================================
       ADD BADGE
    ====================================================== */

    add(name) {

        const container = document.getElementById("badgeContainer");

        if (!container) return;

        const badge = document.createElement("div");

        badge.className = "badge";

        badge.textContent = name;

        container.appendChild(badge);

    },

    /* ======================================================
       CLEAR
    ====================================================== */

    clear() {

        const container = document.getElementById("badgeContainer");

        if (container) {

            container.innerHTML = "";

        }

    }

};

export default Badges;