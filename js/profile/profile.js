/* ==========================================================
   ChampionshipOS v3
   Profile Completion Controller
========================================================== */

"use strict";

/* ==========================================================
   IMPORTS
========================================================== */

import { auth, db } from "../auth/firestore.js";

import {
    doc,
    updateDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

/* ==========================================================
   PROFILE MODULE
========================================================== */

const Profile = {

    currentUser: null,

    initialized: false,

    /* ======================================================
       INITIALIZE
    ====================================================== */

    init() {

        if (this.initialized) return;

        this.initialized = true;

        onAuthStateChanged(auth, (user) => {

            if (!user) {

                window.location.href = "index.html";

                return;

            }

            this.currentUser = user;

            this.prefill(user);

            this.bindEvents();

        });

    },

    /* ======================================================
       PREFILL
    ====================================================== */

    prefill(user) {

        const name = document.getElementById("fullName");

        const preview = document.getElementById("profilePreview");

        if (name) {

            name.value = user.displayName || "";

        }

        if (preview && user.photoURL) {

            preview.src = user.photoURL;

        }

    },

    /* ======================================================
       EVENTS
    ====================================================== */

    bindEvents() {

        const upload = document.getElementById("profilePhoto");

        if (upload) {

            upload.addEventListener("change", (event) => {

                const file = event.target.files[0];

                if (!file) return;

                const reader = new FileReader();

                reader.onload = (e) => {

                    document.getElementById(
                        "profilePreview"
                    ).src = e.target.result;

                };

                reader.readAsDataURL(file);

            });

        }

        const form = document.getElementById("profileForm");

        if (form) {

            form.addEventListener("submit", (event) => {

                event.preventDefault();

                this.save();

            });

        }

    },

    /* ======================================================
       VALIDATION
    ====================================================== */

    validate() {

        const required = [

            "fullName",

            "mobile",

            "college",

            "branch",

            "year",

            "github",

            "linkedin",

            "leetcode",

            "gfg",

            "domain"

        ];

        for (const id of required) {

            const field = document.getElementById(id);

            if (!field || field.value.trim() === "") {

                alert("Please complete all required fields.");

                field?.focus();

                return false;

            }

        }

        return true;

    },

    /* ======================================================
       SAVE PROFILE
    ====================================================== */

    async save() {

        if (!this.validate()) return;

        const button = document.querySelector(
            "#profileForm button"
        );

        try {

            button.disabled = true;

            button.textContent = "Saving...";

            await updateDoc(

                doc(db, "users", this.currentUser.uid),

                {

                    fullName:
                        document.getElementById("fullName").value.trim(),

                    mobile:
                        document.getElementById("mobile").value.trim(),

                    college:
                        document.getElementById("college").value.trim(),

                    branch:
                        document.getElementById("branch").value.trim(),

                    year:
                        document.getElementById("year").value.trim(),

                    github:
                        document.getElementById("github").value.trim(),

                    linkedin:
                        document.getElementById("linkedin").value.trim(),

                    leetcode:
                        document.getElementById("leetcode").value.trim(),

                    gfg:
                        document.getElementById("gfg").value.trim(),

                    preferredDomain:
                        document.getElementById("domain").value,

                    xp: 500,

                    badges: [

                        "🏅 Profile Champion"

                    ],

                    profileCompleted: true,

                    updatedAt: serverTimestamp()

                }

            );

            alert(

                "🎉 Congratulations!\n\nYour profile has been completed.\n\n+500 XP Awarded!"

            );

            window.location.href = "learner.html";

        }

        catch (error) {

            console.error(error);

            alert(

                "Unable to save your profile.\n\n" +

                error.message

            );

        }

        finally {

            button.disabled = false;

            button.textContent = "Complete Profile (+500 XP)";

        }

    }

};

/* ==========================================================
   START
========================================================== */

Profile.init();

export default Profile;