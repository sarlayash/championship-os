/* ==========================================================
   ChampionshipOS v3
   Certificate Engine
========================================================== */

"use strict";

/* ==========================================================
   IMPORTS
========================================================== */

import { auth, db } from "../auth/firestore.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

/* ==========================================================
   CERTIFICATE ENGINE
========================================================== */

const CertificateEngine = {

    currentUser: null,

    init() {

        onAuthStateChanged(

            auth,

            async user => {

                if (!user) return;

                this.currentUser = user;

                await this.loadCertificates();

            }

        );

    },

    /* ======================================================
       LOAD CERTIFICATES
    ====================================================== */

    async loadCertificates() {

        const container =

            document.getElementById(

                "earnedCertificates"

            );

        if (!container) return;

        container.className = "dashboard-card";

        container.innerHTML = `

<h2>

📜 Earned Certificates

</h2>

`;

        const snapshot = await getDoc(

            doc(

                db,

                "users",

                this.currentUser.uid

            )

        );

        if (!snapshot.exists()) {

            container.innerHTML += "<p>No certificates.</p>";

            return;

        }

        const user = snapshot.data();

        const certificates =

            user.certificates || [];

        if (certificates.length === 0) {

            container.innerHTML += `

<p>

No certificates earned yet.

</p>

`;

            return;

        }

        /* ======================================================
           RENDER CERTIFICATES
        ====================================================== */

        certificates.forEach(certificate => {

            container.innerHTML += `

<div class="certificate-card">

    <div class="certificate-title">

        ${certificate.title}

    </div>

    <div class="certificate-level">

        ${certificate.level}

    </div>

    <div class="certificate-date">

        📅 Issued :

        ${certificate.date || "Recently"}

    </div>

    <p style="margin-top:15px;line-height:1.7;">

        Congratulations!

        You successfully achieved the

        <b>${certificate.title}</b>

        milestone in ChampionshipOS.

    </p>

</div>

`;

        });

    },

};

/* ==========================================================
   START
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        CertificateEngine.init();

    }

);

/* ==========================================================
   EXPORT
========================================================== */

export default CertificateEngine;