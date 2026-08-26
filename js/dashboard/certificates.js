/* ==========================================================
   ChampionshipOS v3
   Certificates Module
========================================================== */

"use strict";

/* ==========================================================
   CERTIFICATES
========================================================== */

const Certificates = {

    render() {

        const container = document.getElementById("certificateCard");

        if (!container) return;

        container.className = "dashboard-card";

        container.innerHTML = `

<h2>

🎓 Certificates

</h2>

<div
id="certificateContainer"
>

<div class="certificate">

<h3>

Welcome Certificate

</h3>

<p>

Congratulations on joining ChampionshipOS.

</p>

<a
href="#"
target="_blank"
>

Download

</a>

</div>

</div>

`;

    },

    /* ======================================================
       LOAD CERTIFICATES
    ====================================================== */

    load(certificates = []) {

        const container = document.getElementById(

            "certificateContainer"

        );

        if (!container) return;

        container.innerHTML = "";

        if (certificates.length === 0) {

            container.innerHTML = `

<p>

No certificates available yet.

Complete challenges to unlock certificates.

</p>

`;

            return;

        }

        certificates.forEach(certificate => {

            const card = document.createElement("div");

            card.className = "certificate";

            card.innerHTML = `

<h3>

${certificate.title}

</h3>

<p>

Issued :

${certificate.date}

</p>

<a
href="${certificate.url}"
target="_blank"
>

Download Certificate

</a>

`;

            container.appendChild(card);

        });

    },

    /* ======================================================
       ADD CERTIFICATE
    ====================================================== */

    add(title, url, date) {

        const container = document.getElementById(

            "certificateContainer"

        );

        if (!container) return;

        const card = document.createElement("div");

        card.className = "certificate";

        card.innerHTML = `

<h3>

${title}

</h3>

<p>

Issued :

${date}

</p>

<a
href="${url}"
target="_blank"
>

Download Certificate

</a>

`;

        container.appendChild(card);

    },

    /* ======================================================
       CLEAR
    ====================================================== */

    clear() {

        const container = document.getElementById(

            "certificateContainer"

        );

        if (container) {

            container.innerHTML = "";

        }

    }

};

export default Certificates;