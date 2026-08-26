/* ==========================================================
   ChampionshipOS v3
   Submission Review Module
========================================================== */

"use strict";

/* ==========================================================
   IMPORTS
========================================================== */

import { db } from "../auth/firestore.js";

import {
    collection,
    query,
    where,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    increment,
    arrayUnion,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

/* ==========================================================
   REVIEW MODULE
========================================================== */

const Review = {

    eventsBound: false,

    /* ======================================================
       INITIALIZE
    ====================================================== */

    async init() {

        try {

            this.bindEvents();

            await this.loadPendingSubmissions();

        }

        catch (error) {

            console.error("Review Module Error");

            console.error(error);

        }

    },

    /* ======================================================
       EVENT BINDING
    ====================================================== */

    bindEvents() {

        if (this.eventsBound) return;

        this.eventsBound = true;

        document.addEventListener(

            "click",

            event => {

                if (
                    event.target.classList.contains(
                        "approve-btn"
                    )
                ) {

                    this.approve(
                        event.target.dataset.id
                    );

                }

                if (
                    event.target.classList.contains(
                        "reject-btn"
                    )
                ) {

                    this.reject(
                        event.target.dataset.id
                    );

                }

            }

        );

    },

    /* ======================================================
       LOAD PENDING SUBMISSIONS
    ====================================================== */

    async loadPendingSubmissions() {

        const container =
            document.getElementById(
                "reviewCard"
            );

        if (!container) return;

        container.className =
            "admin-card";

        container.innerHTML = `

<h2>

📥 Pending Reviews

</h2>

`;

        const snapshot = await getDocs(

            query(

                collection(
                    db,
                    "submissions"
                ),

                where(
                    "status",
                    "==",
                    "Pending"
                )

            )

        );

        if (snapshot.empty) {

            container.innerHTML += `

<p>

No pending submissions.

</p>

`;

            return;

        }

        snapshot.forEach(documentSnapshot => {

            const data =
                documentSnapshot.data();

            container.innerHTML += `

<div class="review-card">

<h3>

${data.taskTitle}

</h3>

<p>

<b>Learner:</b>

${data.learnerName}

</p>

<p>

<b>Email:</b>

${data.email}

</p>

<p>

<b>XP Reward:</b>

${data.xp}

</p>

<p>

<a
href="${data.github}"
target="_blank">

GitHub Repository

</a>

</p>

<p>

<a
href="${data.linkedin}"
target="_blank">

LinkedIn Post

</a>

</p>

<p>

<a
href="${data.drive}"
target="_blank">

Google Drive

</a>

</p>

<p>

<b>Remarks:</b>

${data.remarks || "-"}

</p>

<div class="review-actions">

<button
class="approve-btn"
data-id="${documentSnapshot.id}">

✅ Approve

</button>

<button
class="reject-btn"
data-id="${documentSnapshot.id}">

❌ Reject

</button>

</div>

</div>

`;

        });

    },

    /* ======================================================
       APPROVE SUBMISSION
    ====================================================== */

    async approve(submissionId) {
    async approve(submissionId) {

        try {

            const submissionRef = doc(

                db,

                "submissions",

                submissionId

            );

            const submissionSnapshot = await getDoc(

                submissionRef

            );

            if (!submissionSnapshot.exists()) {

                alert("Submission not found.");

                return;

            }

            const submission =

                submissionSnapshot.data();

            const userRef = doc(

                db,

                "users",

                submission.uid

            );

            const userSnapshot = await getDoc(

                userRef

            );

            if (!userSnapshot.exists()) {

                alert("Learner not found.");

                return;

            }

            const user =

                userSnapshot.data();

            /* ==================================================
               AWARD XP
            ================================================== */

            await updateDoc(

                userRef,

                {

                    xp: increment(

                        submission.xp || 0

                    ),

                    tasksCompleted: increment(1)

                }

            );

            /* ==================================================
               FIRST SUBMISSION BADGE
            ================================================== */

            if (

                (user.tasksCompleted || 0) === 0

            ) {

                await updateDoc(

                    userRef,

                    {

                        badges: arrayUnion(

                            "🏅 First Submission"

                        )

                    }

                );

            }

            /* ==================================================
               CERTIFICATE AFTER 10 TASKS
            ================================================== */

            const completed =

                (user.tasksCompleted || 0) + 1;

            if (completed >= 10) {

                await updateDoc(

                    userRef,

                    {

                        certificates: arrayUnion(

                            "🏆 Championship Finisher"

                        )

                    }

                );

            }

            /* ==================================================
               MARK SUBMISSION APPROVED
            ================================================== */

            await updateDoc(

                submissionRef,

                {

                    status: "Approved",

                    reviewedBy: "kapiladmin",

                    reviewedAt: serverTimestamp()

                }

            );

            alert(

                `✅ Submission Approved

${submission.xp} XP Awarded Successfully.`

            );

            await this.loadPendingSubmissions();

        }

        catch (error) {

            console.error(

                "Approval Error"

            );

            console.error(error);

            alert(

                error.message

            );

        }

    },

    /* ======================================================
       REJECT SUBMISSION
    ====================================================== */

    async reject(submissionId) {
        try {

            const submissionRef = doc(

                db,

                "submissions",

                submissionId

            );

            const submissionSnapshot = await getDoc(

                submissionRef

            );

            if (!submissionSnapshot.exists()) {

                alert(

                    "Submission not found."

                );

                return;

            }

            await updateDoc(

                submissionRef,

                {

                    status: "Rejected",

                    reviewedBy: "kapiladmin",

                    reviewedAt: serverTimestamp()

                }

            );

            alert(

                "❌ Submission Rejected."

            );

            await this.loadPendingSubmissions();

        }

        catch (error) {

            console.error(

                "Rejection Error"

            );

            console.error(error);

            alert(

                error.message

            );

        }

    }

};

/* ==========================================================
   START
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        Review.init();

    }

);

/* ==========================================================
   EXPORT
========================================================== */

export default Review;