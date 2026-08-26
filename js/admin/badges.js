/* ==========================================================
   ChampionshipOS v3
   Badges Module
========================================================== */

"use strict";

import { db } from "../auth/firestore.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const Badges = {

    async init() {

        await this.load();

    },

    async load() {

        try {

            const snapshot = await getDocs(

                collection(db,"users")

            );

            const container = document.getElementById("badgeList");

            if(!container) return;

            container.innerHTML = "";

            let count = 0;

            snapshot.forEach(doc=>{

                const user = doc.data();

                if(user.role!=="learner") return;

                count++;

                const badges =

                    (user.badges || []).join(" • ") ||

                    "No Badges";

                container.innerHTML += `

<div class="badge-card">

<h3>${user.fullName || user.name}</h3>

<p>${badges}</p>

</div>

`;

            });

            if(count===0){

                container.innerHTML="<p>No learners found.</p>";

            }

            console.log("Badges Loaded");

        }

        catch(error){

            console.error(error);

        }

    }

};

export default Badges;