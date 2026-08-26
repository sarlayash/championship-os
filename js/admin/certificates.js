/* ==========================================================
   ChampionshipOS v3
   Certificates Module
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
   CERTIFICATES
========================================================== */

const Certificates = {

    async init() {

        await this.load();

    },

    async load() {

        try {

            const snapshot = await getDocs(

                collection(db,"users")

            );

            const container = document.getElementById(

                "certificateList"

            );

            if(!container) return;

            container.innerHTML = "";

            let count = 0;

            snapshot.forEach(doc=>{

                const user = doc.data();

                if(user.role!=="learner") return;

                count++;

                const certificates =

                    (user.certificates || []).join(" • ") ||

                    "No Certificates";

                container.innerHTML += `

<div class="certificate-card">

<h3>${user.fullName || user.name || "Learner"}</h3>

<p>${certificates}</p>

</div>

`;

            });

            if(count===0){

                container.innerHTML="<p>No learners found.</p>";

            }

            console.log("Certificates Loaded");

        }

        catch(error){

            console.error(error);

        }

    }

};

export default Certificates;