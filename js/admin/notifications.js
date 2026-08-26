/* ==========================================================
   ChampionshipOS v3
   Notification Management
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
   NOTIFICATION MODULE
========================================================== */

const Notifications = {

    init() {

        const form = document.getElementById("notificationForm");

        if (!form) return;

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                this.send();

            }

        );

    },

    /* ======================================================
       SEND NOTIFICATION
    ====================================================== */

    async send() {

        try {

            const title =
                document.getElementById("notificationTitle").value.trim();

            const message =
                document.getElementById("notificationMessage").value.trim();

            if (!title || !message) {

                alert("Please enter title and message.");

                return;

            }

            await addDoc(

                collection(db, "notifications"),

                {

                    title,

                    message,

                    createdBy: "kapiladmin@gmail.com",

                    createdAt: serverTimestamp(),

                    status: "Published"

                }

            );

            document
                .getElementById("notificationForm")
                .reset();

            alert("📢 Notification Sent Successfully");

            console.log("Notification Published");

        }

        catch(error){

            console.error(error);

            alert(error.message);

        }

    }

};

/* ==========================================================
   EXPORT
========================================================== */

export default Notifications;