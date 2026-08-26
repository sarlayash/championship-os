/* ==========================================================
   ChampionshipOS v3
   Daily Tasks Module
========================================================== */

"use strict";

/* ==========================================================
   IMPORTS
========================================================== */

import Submission from "../submission/submission.js";

import { db } from "../auth/firestore.js";

import {
    collection,
    query,
    where,
    orderBy,
    limit,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

/* ==========================================================
   TASKS MODULE
========================================================== */

const Tasks = {

    currentTask: null,

    /* ======================================================
       RENDER
    ====================================================== */

    render() {

        const container = document.getElementById("taskCard");

        if (!container) return;

        container.className = "dashboard-card";

        container.innerHTML = `

<h2>

📚 Today's Challenge

</h2>

<h3 id="taskTitle">

Loading Challenge...

</h3>

<p id="taskDescription">

Please wait...

</p>

<p>

<b>Deadline:</b>

<span id="taskDeadline">

--

</span>

</p>

<div class="task-info">

<p>

<b>Difficulty:</b>

--

</p>

<p>

<b>Reward:</b>

--

</p>

<button

id="submitTaskButton"

class="btn-primary"

>

🚀 Submit Challenge

</button>

</div>

`;

        this.bindEvents();

        this.loadLatestTask();

    },

    /* ======================================================
       EVENTS
    ====================================================== */

    bindEvents() {

        const button = document.getElementById("submitTaskButton");

        if (!button) return;

        button.addEventListener("click", () => {

            if (!this.currentTask) {

                alert("No active challenge available.");

                return;

            }

            Submission.open(

                this.currentTask.id,

                this.currentTask.title,

                this.currentTask.xp

            );

        });

    },

    /* ======================================================
       LOAD LATEST TASK
    ====================================================== */

    async loadLatestTask() {

        try {

            const snapshot = await getDocs(

                query(

                    collection(db, "tasks"),

                    where("status", "==", "Published"),

                    orderBy("createdAt", "desc"),

                    limit(1)

                )

            );

            if (snapshot.empty) {

                document.getElementById("taskTitle").textContent =
                    "No Challenge Published";

                document.getElementById("taskDescription").textContent =
                    "Please check again later.";

                document.getElementById("taskDeadline").textContent =
                    "--";

                return;

            }

            const taskDoc = snapshot.docs[0];

            this.currentTask = {

                id: taskDoc.id,

                ...taskDoc.data()

            };

            this.update(this.currentTask);

        }

        catch (error) {

            console.error("Task Loading Error", error);

        }

    },

    /* ======================================================
       UPDATE UI
    ====================================================== */

    update(task) {

        if (!task) return;

        document.getElementById("taskTitle").textContent =
            task.title || "";

        document.getElementById("taskDescription").textContent =
            task.description || "";

        document.getElementById("taskDeadline").textContent =
            task.deadline || "--";

        const info = document.querySelector(".task-info");

        info.innerHTML = `

<p>

<b>Difficulty:</b>

${task.difficulty || "Medium"}

</p>

<p>

<b>Reward:</b>

${task.xp || 0} XP

</p>

<button

id="submitTaskButton"

class="btn-primary"

>

🚀 Submit Challenge

</button>

`;

        this.bindEvents();

    }

};

export default Tasks;