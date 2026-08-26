/* ==========================================================
   ChampionshipOS v3
   Leaderboard
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
   LEADERBOARD
========================================================== */

const Leaderboard = {

    async init() {

        await this.load();

    },

    async load() {

        try {

            const snapshot = await getDocs(

                collection(db, "users")

            );

            const learners = [];

            snapshot.forEach(doc => {

                const user = doc.data();

                if (user.role !== "learner") return;

                learners.push(user);

            });

            learners.sort(

                (a,b)=>

                    (b.xp || 0) -

                    (a.xp || 0)

            );

            const board =

                document.getElementById("leaderboard");

            if (!board) return;

            board.innerHTML = "";

            learners.slice(0,10).forEach(

                (user,index)=>{

                    board.innerHTML += `

<div class="leaderboard-row">

<div>

<b>#${index+1}</b>

${user.fullName || user.name || "Learner"}

</div>

<div>

⭐ ${user.xp || 0} XP

</div>

</div>

`;

                }

            );

            if(learners.length===0){

                board.innerHTML="<p>No learners yet.</p>";

            }

            console.log("Leaderboard Loaded");

        }

        catch(error){

            console.error(error);

        }

    }

};

export default Leaderboard;