/* ==========================================================
   ChampionshipOS v3
   Notifications Module
========================================================== */

"use strict";

/* ==========================================================
   NOTIFICATIONS
========================================================== */

const Notifications = {

    render() {

        const container = document.getElementById("notificationCard");

        if (!container) return;

        container.className = "dashboard-card";

        container.innerHTML = `

<h2>

🔔 Notifications

</h2>

<div id="notificationList">

<div class="notification">

<h3>

Welcome to ChampionshipOS 🎉

</h3>

<p>

Your learner account has been activated successfully.

</p>

<small>

Today

</small>

</div>

<div class="notification">

<h3>

Java DSA Championship

</h3>

<p>

Daily coding challenges will appear here every morning.

</p>

<small>

System

</small>

</div>

</div>

`;

    },

    /* ======================================================
       ADD NEW NOTIFICATION
    ====================================================== */

    add(title, message, date = "Now") {

        const list = document.getElementById("notificationList");

        if (!list) return;

        const card = document.createElement("div");

        card.className = "notification";

        card.innerHTML = `

<h3>

${title}

</h3>

<p>

${message}

</p>

<small>

${date}

</small>

`;

        list.prepend(card);

    },

    /* ======================================================
       CLEAR ALL
    ====================================================== */

    clear() {

        const list = document.getElementById("notificationList");

        if (list) {

            list.innerHTML = "";

        }

    }

};

export default Notifications;