/* ==========================================================
   ChampionshipOS v3
   Google Authentication
========================================================== */

"use strict";

/* ==========================================================
   FIREBASE AUTH
========================================================== */

import {
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import { auth, db } from "./firestore.js";

/* ==========================================================
   CONFIGURATION
========================================================== */

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

const ADMIN_EMAIL = "kapiladmin@gmail.com";

/* ==========================================================
   GOOGLE AUTH
========================================================== */

const Google = {

    async signIn() {

        console.log("🚀 Google Sign-In Started");

        try {

            const result = await signInWithPopup(
                auth,
                provider
            );

            console.log("✅ Google Authentication Successful");

            const user = result.user;

            const role =
                user.email === ADMIN_EMAIL
                    ? "admin"
                    : "learner";

            const userRef = doc(
                db,
                "users",
                user.uid
            );

            /* ==========================================
               CHECK USER
            ========================================== */

            const snapshot = await getDoc(userRef);

            if (!snapshot.exists()) {

                console.log("Creating new Firestore profile...");

                await setDoc(userRef, {

                    uid: user.uid,

                    name: user.displayName || "",

                    email: user.email || "",

                    photo: user.photoURL || "",

                    role: role,

                    profileCompleted: false,

                    xp: 0,

                    badges: [],

                    certificates: [],

                    notifications: 0,

                    tasksCompleted: 0,

                    weeklyScore: 0,

                    monthlyScore: 0,

                    createdAt: serverTimestamp(),

                    lastLogin: serverTimestamp()

                });

            }

            else {

                console.log("Existing user found.");

                await updateDoc(userRef, {

                    lastLogin: serverTimestamp()

                });

            }

            /* ==========================================
               RELOAD LATEST USER DOCUMENT
            ========================================== */

            const latestSnapshot = await getDoc(userRef);

            const profileCompleted =
                latestSnapshot.exists()
                &&
                latestSnapshot.data().profileCompleted === true;

            console.log("User Role:", role);

            console.log(
                "Profile Completed:",
                profileCompleted
            );

            /* ==========================================
               ROUTING
            ========================================== */

            if (role === "admin") {

                window.location.href = "admin.html";

                return;

            }

            if (profileCompleted) {

                window.location.href = "learner.html";

            }

            else {

                window.location.href = "profile.html";

            }

        }

        catch (error) {

            console.error(
                "Google Authentication Failed"
            );

            console.error(error);

            switch (error.code) {

                case "auth/popup-blocked":

                    alert(
                        "Please allow popups and try again."
                    );

                    break;

                case "auth/popup-closed-by-user":

                    alert(
                        "Google Sign-In was cancelled."
                    );

                    break;

                case "auth/unauthorized-domain":

                    alert(
                        "This domain is not authorized in Firebase."
                    );

                    break;

                default:

                    alert(error.message);

            }

        }

    }

};

/* ==========================================================
   EXPORT
========================================================== */

export default Google;