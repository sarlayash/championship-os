/* ==========================================================
   ChampionshipOS v3
   Task Management
========================================================== */

"use strict";

/* ==========================================================
   IMPORTS
========================================================== */

import { db } from "../auth/firestore.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

/* ==========================================================
   TASK MODULE
========================================================== */

const Tasks = {

    init() {

        const form = document.getElementById("taskForm");

        if (!form) return;

        form.addEventListener(

            "submit",

            (event) => {

                event.preventDefault();

                this.publishTask();

            }

        );

    },

    /* ======================================================
       PUBLISH TASK
    ====================================================== */

    async publishTask() {

        try {

            const title =
                document.getElementById("taskTitle").value.trim();

            const description =
                document.getElementById("taskDescription").value.trim();

            const difficulty =
                document.getElementById("difficulty").value;

            const xp =
                Number(document.getElementById("xp").value);

            const deadline =
                document.getElementById("deadline").value;

            if (!title || !description) {

                alert("Please complete all required fields.");

                return;

            }

            await addDoc(

                collection(db, "tasks"),

                {

                    title,

                    description,

                    difficulty,

                    xp,

                    deadline,

                    status: "Published",

                    createdBy: "kapiladmin@gmail.com",

                    createdAt: serverTimestamp()

                }

            );

            alert("✅ Daily Task Published Successfully!");

            document.getElementById("taskForm").reset();

            console.log("Task Published");

        }

        catch (error) {

            console.error(error);

            alert(error.message);

        }

    }

};

/* ==========================================================
   EXPORT
========================================================== */

export default Tasks;