/* ==========================================================
   ChampionshipOS v3
   Task Submission Module
========================================================== */

"use strict";

/* ==========================================================
   IMPORTS
========================================================== */

import { auth, db } from "../auth/firestore.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

/* ==========================================================
   SUBMISSION MODULE
========================================================== */

const Submission = {

    currentUser: null,

    currentTask: null,

    init() {

        onAuthStateChanged(auth, user => {

            if (!user) {

                window.location.href = "index.html";

                return;

            }

            this.currentUser = user;

            this.bindEvents();

        });

    },

    bindEvents() {

        const form = document.getElementById("submissionForm");

        if (!form) return;

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                this.submitTask();

            }

        );

    },

    open(taskId, title, xp) {

        this.currentTask = {

            taskId,

            title,

            xp

        };

        document.getElementById("taskTitle").innerText = title;

        document
            .getElementById("submissionModal")
            .classList.add("show");

    },

    close() {

        document
            .getElementById("submissionModal")
            .classList.remove("show");

        document
            .getElementById("submissionForm")
            .reset();

    },

    /* ======================================================
       URL VALIDATION
    ====================================================== */

    validGithub(url) {

        return /^https:\/\/(www\.)?github\.com\/.+/i.test(url);

    },

    validLinkedIn(url) {

        return /^https:\/\/(www\.)?linkedin\.com\/.+/i.test(url);

    },

    validDrive(url) {

        return /^https:\/\/drive\.google\.com\/.+/i.test(url);

    },

    /* ======================================================
       SUBMIT TASK
    ====================================================== */

    async submitTask() {

        try {

            const github =
                document.getElementById("githubUrl").value.trim();

            const linkedin =
                document.getElementById("linkedinUrl").value.trim();

            const drive =
                document.getElementById("driveUrl").value.trim();

            const remarks =
                document.getElementById("remarks").value.trim();

            if (!this.validGithub(github)) {

                alert("Enter a valid GitHub URL.");

                return;

            }

            if (!this.validLinkedIn(linkedin)) {

                alert("Enter a valid LinkedIn URL.");

                return;

            }

            if (!this.validDrive(drive)) {

                alert("Enter a valid Google Drive URL.");

                return;

            }

            await addDoc(

                collection(db, "submissions"),

                {

                    uid: this.currentUser.uid,

                    learnerName:

                        this.currentUser.displayName || "",

                    email:

                        this.currentUser.email || "",

                    taskId:

                        this.currentTask.taskId,

                    taskTitle:

                        this.currentTask.title,

                    github,

                    linkedin,

                    drive,

                    remarks,

                    xp:

                        this.currentTask.xp,

                    status: "Pending",

                    submittedAt:

                        serverTimestamp()

                }

            );

            alert("🎉 Task Submitted Successfully!\n\nWaiting for Admin Review.");

            this.close();

        }

        catch (error) {

            console.error(error);

            alert(error.message);

        }

    }

};

/* ==========================================================
   START
========================================================== */

Submission.init();

export default Submission;