/* ============================================================
   CHAMPIONSHIP OS
   APP.JS
   PART 1
   Global Variables + Modal Engine
   ============================================================ */

"use strict";

/* ============================================================
   GLOBAL DOM REFERENCES
============================================================ */

const body = document.body;

const modal = document.getElementById("modal");
const authContent = document.getElementById("authContent");
const appShell = document.getElementById("appShell");

const liveDate = document.getElementById("liveDate");
const liveTime = document.getElementById("liveTime");

const themeToggle = document.getElementById("themeToggle");

const tourButton = document.getElementById("tourBtn");
const dashboardButton = document.getElementById("dashBtn");

/* ============================================================
   GLOBAL STATE
============================================================ */

const APP = {

    user: null,

    profile: null,

    registrations: [],

    leaderboard: [],

    darkMode: false,

    initialized: false

};

/* ============================================================
   MODAL TEMPLATES
============================================================ */

const MODALS = {

signin: `

<h2 id="modalTitle">Welcome Back</h2>

<p>
Continue with Google or your registered email.
No passwords required.
</p>

<div class="auth-buttons">

<button class="primary full" id="googleLogin">

Continue with Google

</button>

<button class="light-btn full" id="magicLogin">

Email Magic Link

</button>

<button class="dark-btn full" id="otpLogin">

Login using OTP

</button>

</div>

<p class="auth-note">

New participant?

<button
class="auth-switch"
data-open="register">

Register now

</button>

</p>

`,

register: `

<h2 id="modalTitle">

Join Championship 2026

</h2>

<p>

Register once.
Then continue using Google,
Magic Link or OTP.

</p>

<form id="registerForm">

<div class="field">

<label>Full Name</label>

<input
id="regName"
required
placeholder="Your full name">

</div>

<div class="field">

<label>Email Address</label>

<input
id="regEmail"
type="email"
required
placeholder="you@example.com">

</div>

<div class="field">

<label>College / University</label>

<input
id="regCollege"
placeholder="Your institution">

</div>

<div class="field">

<label>Team (Optional)</label>

<input
id="regTeam"
placeholder="Team name">

</div>

<button class="primary full">

Complete Registration

</button>

</form>

<p class="auth-note">

Already registered?

<button
class="auth-switch"
data-open="signin">

Sign In

</button>

</p>

`,

admin: `

<h2 id="modalTitle">

Administrator Login

</h2>

<p>

Restricted access.

</p>

<form id="adminForm">

<div class="field">

<label>Admin ID</label>

<input
id="adminId"
required>

</div>

<div class="field">

<label>Password</label>

<input
id="adminPassword"
type="password"
required>

</div>

<button class="primary full">

Open Admin Dashboard

</button>

</form>

<p
class="auth-note"
id="adminMessage">

Authorized personnel only.

</p>

`

};

/* ============================================================
   OPEN MODAL
============================================================ */

function openModal(type){

    if(!MODALS[type]) return;

    authContent.innerHTML = MODALS[type];

    modal.classList.add("show");

    body.style.overflow = "hidden";

}

/* ============================================================
   CLOSE MODAL
============================================================ */

function closeModal(){

    modal.classList.remove("show");

    body.style.overflow = "";

}

/* ============================================================
   SHOW DASHBOARD
============================================================ */

function showDashboard(){

    closeModal();

    appShell.classList.add("show");

}

/* ============================================================
   RETURN TO LANDING PAGE
============================================================ */

function closeDashboard(){

    appShell.classList.remove("show");

}

/* ============================================================
   GLOBAL CLICK EVENTS
============================================================ */

document.addEventListener("click",(event)=>{

    const openButton = event.target.closest("[data-open]");

    if(openButton){

        openModal(openButton.dataset.open);

        return;

    }

    if(event.target === modal){

        closeModal();

    }

    if(event.target.closest(".close")){

        closeModal();

    }

    if(event.target.closest("#closeApp")){

        closeDashboard();

    }

});

/* ============================================================
   ESC KEY
============================================================ */

document.addEventListener("keydown",(event)=>{

    if(event.key==="Escape"){

        closeModal();

    }

});

/* ============================================================
   CHAMPIONSHIP OS
   APP.JS
   PART 2
   Theme Toggle + Live Clock + Navigation
   ============================================================ */

"use strict";

/* ============================================================
   THEME
============================================================ */

function loadTheme() {

    const saved = localStorage.getItem("championship-theme");

    if (saved === "dark") {

        APP.darkMode = true;

        body.classList.add("night");

    }

}

function saveTheme() {

    localStorage.setItem(
        "championship-theme",
        APP.darkMode ? "dark" : "light"
    );

}

function toggleTheme() {

    APP.darkMode = !APP.darkMode;

    body.classList.toggle("night");

    saveTheme();

}

if (themeToggle) {

    themeToggle.addEventListener("click", toggleTheme);

}

loadTheme();

/* ============================================================
   LIVE IST CLOCK
============================================================ */

function updateClock() {

    const now = new Date();

    if (liveDate) {

        liveDate.textContent =
            new Intl.DateTimeFormat("en-IN", {

                timeZone: "Asia/Kolkata",

                day: "2-digit",

                month: "short",

                year: "numeric"

            })

            .format(now)

            .toUpperCase();

    }

    if (liveTime) {

        liveTime.textContent =
            new Intl.DateTimeFormat("en-GB", {

                timeZone: "Asia/Kolkata",

                hour: "2-digit",

                minute: "2-digit",

                second: "2-digit",

                hour12: false

            })

            .format(now);

    }

}

updateClock();

setInterval(updateClock, 1000);

/* ============================================================
   SMOOTH SCROLL
============================================================ */

function scrollToSection(id) {

    const section = document.querySelector(id);

    if (!section) return;

    section.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}

if (tourButton) {

    tourButton.addEventListener("click", () => {

        scrollToSection("#experience");

    });

}

/* ============================================================
   OPEN PARTICIPANT DASHBOARD
============================================================ */

if (dashboardButton) {

    dashboardButton.addEventListener("click", () => {

        showDashboard();

    });

}

/* ============================================================
   NAVIGATION LINKS
============================================================ */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const href = this.getAttribute("href");

        if (!href || href === "#") return;

        const target = document.querySelector(href);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    });

});

/* ============================================================
   SIMPLE PAGE LOADER
============================================================ */

function loadWorkspace(title, html) {

    const grid = document.querySelector(".app-grid");

    if (!grid) return;

    grid.innerHTML = `

<section class="workspace-page">

<button class="text-btn back-home">

← Dashboard

</button>

<p class="section-label">

Participant Workspace

</p>

<h1>${title}</h1>

${html}

</section>

`;

    const back = document.querySelector(".back-home");

    if (back) {

        back.addEventListener("click", () => {

            location.reload();

        });

    }

}

/* ============================================================
   INITIAL STARTUP
============================================================ */

window.addEventListener("load", () => {

    APP.initialized = true;

    console.log("ChampionshipOS initialized.");

});

/* ============================================================
   APP.JS
   PART 3A
   GOOGLE SIGN-IN
   ============================================================ */

/* ============================================================
   GOOGLE LOGIN
============================================================ */

async function googleSignIn() {

    try {

        const result = await window.championship.googleLogin();

        const user = result.user;

        APP.user = user;

        let profile = await window.championship.getParticipant(user.email);

        /* ------------------------------------------
           FIRST LOGIN
        ------------------------------------------ */

        if (!profile) {

            profile = {

                name: user.displayName || "",

                email: user.email,

                college: "",

                team: "",

                points: 0,

                rank: "-",

                reward: "",

                badges: []

            };

            await window.championship.registerParticipant(profile);

        }

        APP.profile = profile;

        window.currentParticipant = profile;

        closeModal();

        showDashboard();

    }

    catch (error) {

        console.error(error);

        alert("Google Sign-In failed.\n\n" + error.message);

    }

}

/* ============================================================
   GOOGLE BUTTON
============================================================ */

document.addEventListener("click", function (event) {

    if (!event.target.closest("#googleLogin")) return;

    googleSignIn();

});

/* ============================================================
   AUTH STATE
============================================================ */

window.addEventListener("auth-ready", async () => {

    if (!window.currentUser) return;

    APP.user = window.currentUser;

    APP.profile = window.currentParticipant;

    if (APP.profile) {

        showDashboard();

    }

});

/* ============================================================
   LOGOUT
============================================================ */

async function logout() {

    try {

        await window.championship.logout();

        APP.user = null;

        APP.profile = null;

        window.currentParticipant = null;

        appShell.classList.remove("show");

    }

    catch (error) {

        console.error(error);

    }

}

/* ============================================================
   OPTIONAL LOGOUT BUTTON
============================================================ */

document.addEventListener("click", function (event) {

    if (!event.target.closest("#logout")) return;

    logout();

});

/* ============================================================
   APP.JS
   PART 3B
   PASSWORDLESS GMAIL MAGIC LINK
   ============================================================ */

/* ============================================================
   SEND MAGIC LINK
============================================================ */

async function magicLinkLogin() {

    try {

        const emailInput = document.getElementById("magicEmail")
            || document.getElementById("regEmail");

        let email = "";

        if (emailInput) {

            email = emailInput.value.trim().toLowerCase();

        }

        if (!email) {

            email = prompt("Enter your registered Gmail address");

        }

        if (!email) {

            return;

        }

        await window.championship.sendMagicLink(email);

        alert(

            "✅ Magic Link Sent\n\n" +
            "Check your Gmail inbox.\n\n" +
            "Click the link from the same browser to sign in."

        );

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}

/* ============================================================
   COMPLETE MAGIC LINK LOGIN
============================================================ */

async function completeMagicLinkLogin() {

    try {

        const result = await window.championship.completeMagicLink();

        if (!result) {

            return;

        }

        const user = result.user;

        APP.user = user;

        let profile = await window.championship.getParticipant(

            user.email

        );

        /* ----------------------------------------
           FIRST LOGIN
        ---------------------------------------- */

        if (!profile) {

            profile = {

                name: user.displayName || "",

                email: user.email,

                college: "",

                team: "",

                points: 0,

                rank: "-",

                reward: "",

                badges: []

            };

            await window.championship.registerParticipant(profile);

        }

        APP.profile = profile;

        window.currentParticipant = profile;

        showDashboard();

    }

    catch (error) {

        console.error(error);

        alert(

            "Magic Link Sign-In failed.\n\n" +

            error.message

        );

    }

}

/* ============================================================
   MAGIC LINK BUTTON
============================================================ */

document.addEventListener("click", function (event) {

    if (!event.target.closest("#magicLogin")) {

        return;

    }

    magicLinkLogin();

});

/* ============================================================
   AUTO COMPLETE
============================================================ */

window.addEventListener("load", () => {

    completeMagicLinkLogin();

});

/* ============================================================
   APP.JS
   PART 3C
   AUTHENTICATION STATE MANAGER
============================================================ */

/* ============================================================
   LOAD USER PROFILE
============================================================ */

async function loadUserProfile(email) {

    try {

        const profile = await window.championship.getParticipant(email);

        if (!profile) {

            APP.profile = null;
            return false;

        }

        APP.profile = profile;

        window.currentParticipant = profile;

        return true;

    }

    catch (error) {

        console.error(error);

        return false;

    }

}

/* ============================================================
   OPEN LEARNER PORTAL
============================================================ */

function openLearnerPortal() {

    closeModal();

    showDashboard();

}

/* ============================================================
   RESTORE SESSION
============================================================ */

async function restoreSession(user) {

    if (!user) {

        APP.user = null;
        APP.profile = null;
        return;

    }

    APP.user = user;

    const exists = await loadUserProfile(user.email);

    if (!exists) {

        await window.championship.registerParticipant({

            name: user.displayName || "",

            email: user.email,

            college: "",

            team: "",

            points: 0,

            rank: "-",

            reward: "",

            badges: []

        });

        await loadUserProfile(user.email);

    }

    openLearnerPortal();

}

/* ============================================================
   FIREBASE AUTH LISTENER
============================================================ */

window.addEventListener("auth-ready", async () => {

    if (!window.currentUser) {

        APP.user = null;
        APP.profile = null;

        return;

    }

    await restoreSession(window.currentUser);

});

/* ============================================================
   LOGOUT
============================================================ */

async function logoutUser() {

    try {

        await window.championship.logout();

        APP.user = null;

        APP.profile = null;

        window.currentParticipant = null;

        appShell.classList.remove("show");

        closeModal();

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

    catch (error) {

        console.error(error);

    }

}

/* ============================================================
   LOGOUT BUTTON
============================================================ */

document.addEventListener("click", function(event){

    if(!event.target.closest("#logout")){

        return;

    }

    logoutUser();

});

/* ============================================================
   CURRENT USER
============================================================ */

function currentUser(){

    return APP.user;

}

/* ============================================================
   CURRENT PROFILE
============================================================ */

function currentProfile(){

    return APP.profile;

}
/* ============================================================
   APP.JS
   PART 3D
   PHONE OTP AUTHENTICATION
============================================================ */

import {
    RecaptchaVerifier,
    signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

/* ============================================================
   RECAPTCHA
============================================================ */

let confirmationResult = null;
let recaptcha = null;

function initializeOTP() {

    if (recaptcha) return;

    recaptcha = new RecaptchaVerifier(
        window.championship.auth,
        "recaptcha-container",
        {
            size: "invisible"
        }
    );
}

/* ============================================================
   SEND OTP
============================================================ */

async function sendOTP(phoneNumber) {

    try {

        initializeOTP();

        confirmationResult = await signInWithPhoneNumber(
            window.championship.auth,
            phoneNumber,
            recaptcha
        );

        alert("OTP sent successfully.");

    } catch (error) {

        console.error(error);
        alert(error.message);

    }

}

/* ============================================================
   VERIFY OTP
============================================================ */

async function verifyOTP(code) {

    try {

        if (!confirmationResult) {

            alert("Please request an OTP first.");
            return;

        }

        const result = await confirmationResult.confirm(code);

        APP.user = result.user;

        let profile = await window.championship.getParticipant(result.user.phoneNumber);

        if (!profile) {

            await window.championship.registerParticipant({

                name: "",
                email: "",
                college: "",
                team: "",
                phone: result.user.phoneNumber

            });

            profile = await window.championship.getParticipant(result.user.phoneNumber);

        }

        APP.profile = profile;

        window.currentParticipant = profile;

        showDashboard();

    } catch (error) {

        console.error(error);
        alert("Invalid OTP.");
    }

}

/* ===========================================================
   PART 3D
   PHONE OTP AUTHENTICATION (Firebase)
=========================================================== */

import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

const auth = getAuth();

/* ---------------------------------------
   Invisible reCAPTCHA
----------------------------------------*/

let otpConfirmation = null;

window.addEventListener("load", () => {

    window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
            size: "invisible"
        }
    );

});

/* ---------------------------------------
   Send OTP
----------------------------------------*/

export async function sendOTP(phoneNumber) {

    try {

        otpConfirmation =
            await signInWithPhoneNumber(
                auth,
                phoneNumber,
                window.recaptchaVerifier
            );

        return {
            success: true,
            message: "OTP sent successfully."
        };

    } catch (error) {

        console.error(error);

        return {
            success: false,
            message: error.message
        };

    }

}

/* ---------------------------------------
   Verify OTP
----------------------------------------*/

export async function verifyOTP(code) {

    try {

        if (!otpConfirmation)
            throw new Error("OTP session expired.");

        const result =
            await otpConfirmation.confirm(code);

        const user = result.user;

        window.currentParticipant = {

            uid: user.uid,
            phone: user.phoneNumber,
            name: user.phoneNumber

        };

        return {

            success: true,
            user

        };

    } catch (error) {

        console.error(error);

        return {

            success: false,
            message: error.message

        };

    }

}

/* ---------------------------------------
   Sign Out
----------------------------------------*/

export async function logoutPhone() {

    await auth.signOut();

    window.currentParticipant = null;

}

/* ---------------------------------------
   Helper
----------------------------------------*/

export function isPhoneLoggedIn() {

    return auth.currentUser !== null;

}
/* ==========================================================
   ChampionshipOS
   app.js
   PART 3E
   Participant Session Engine
   ========================================================== */

window.currentParticipant = null;

/* ------------------------------
   Session Save
------------------------------ */

function saveSession(user) {
    window.currentParticipant = user;

    localStorage.setItem(
        "championship-session",
        JSON.stringify(user)
    );
}

/* ------------------------------
   Session Restore
------------------------------ */

function restoreSession() {

    try {

        const data = localStorage.getItem("championship-session");

        if (!data) return;

        window.currentParticipant = JSON.parse(data);

    } catch {

        window.currentParticipant = null;

    }

}

/* ------------------------------
   Logout
------------------------------ */

function logoutParticipant() {

    localStorage.removeItem("championship-session");

    window.currentParticipant = null;

    if (window.firebaseAuth) {
        window.firebaseAuth.logout();
    }

    location.reload();

}

/* ------------------------------
   Participant Dashboard
------------------------------ */

function openParticipantPortal(user) {

    saveSession(user);

    close();

    shell.classList.add("show");

    document.querySelector(".workspace").textContent =
        "LEARNER PORTAL";

    document.querySelector(".app-top small").textContent =
        "REGISTERED PARTICIPANT";

    document.querySelector(".app-top h2").innerHTML =
        `Welcome, ${user.name}`;

    page(
        "My Championship Dashboard",

        `
        <div class="participant-summary">

            <div>
                <small>NAME</small>
                <b>${user.name}</b>
            </div>

            <div>
                <small>EMAIL</small>
                <b>${user.email}</b>
            </div>

            <div>
                <small>TEAM</small>
                <b>${user.team || "Individual"}</b>
            </div>

        </div>

        <div class="participant-sections">

            <section class="podium workspace-list">

                <p class="section-label">
                    Championship Progress
                </p>

                <h3>
                    Welcome to ChampionshipOS
                </h3>

                <p>
                    Your assignments, leaderboard,
                    rewards, badges and certificates
                    will automatically appear here.
                </p>

            </section>

            <section class="podium workspace-list">

                <p class="section-label">
                    Rewards
                </p>

                <h3>
                    Not Assigned Yet
                </h3>

                <p>
                    Admin issued rewards will be
                    displayed here.
                </p>

            </section>

            <section class="podium workspace-list">

                <p class="section-label">
                    Certificates
                </p>

                <h3>
                    Coming Soon
                </h3>

                <p>
                    Download certificates after
                    they are released.
                </p>

            </section>

        </div>

        <br><br>

        <button
            class="primary"
            id="logoutBtn">

            Logout

        </button>

        `
    );

}

/* ------------------------------
   Auto Login
------------------------------ */

restoreSession();

if (window.currentParticipant) {

    window.addEventListener("load", () => {

        openParticipantPortal(
            window.currentParticipant
        );

    });

}

/* ------------------------------
   Logout Button
------------------------------ */

document.addEventListener("click", e => {

    if (e.target.id === "logoutBtn") {

        logoutParticipant();

    }

});
/* ==========================================================
   ChampionshipOS
   PART 4
   Registration Engine
   ========================================================== */

function registrations() {

    if (Array.isArray(window.firebaseRegistrations))
        return window.firebaseRegistrations;

    try {

        return JSON.parse(
            localStorage.getItem("championshipRegistrations") || "[]"
        );

    } catch {

        return [];

    }

}

/* ----------------------------------------------------- */

function initials(name) {

    return name
        .split(/\s+/)
        .map(word => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

}

/* ----------------------------------------------------- */

function saveRegistration(entry) {

    let list = registrations();

    const index = list.findIndex(
        p => p.email === entry.email
    );

    if (index >= 0)
        list[index] = entry;
    else
        list.push(entry);

    localStorage.setItem(
        "championshipRegistrations",
        JSON.stringify(list)
    );

}

/* ----------------------------------------------------- */

function renderLiveRegistrations() {

    const list = registrations();

    const title =
        document.querySelector(".podium-title");

    const podium =
        document.querySelector(".podium");

    if (!title || !podium)
        return;

    podium
        .querySelectorAll(".dynamic-row,.empty-live")
        .forEach(item => item.remove());

    title.innerHTML = `
        <span class="live-dot"></span>
        Live Registrations
        <small>${list.length} Registered</small>
    `;

    if (list.length === 0) {

        title.insertAdjacentHTML(
            "afterend",

            `
            <p class="empty-live">
                No registrations yet.
            </p>
            `
        );

        return;

    }

    list.forEach((person, index) => {

        title.insertAdjacentHTML(

            "afterend",

            `
            <div class="leader-row dynamic-row">

                <span class="place">
                    ${String(index + 1).padStart(2, "0")}
                </span>

                <div class="avatar blue">
                    ${initials(person.name)}
                </div>

                <div>

                    <b>${person.name}</b>

                    <small>
                        ${person.team || "Individual"}
                    </small>

                </div>

                <strong>Registered</strong>

                <em>LIVE</em>

            </div>
            `

        );

    });

}

/* ----------------------------------------------------- */

document.addEventListener(

    "submit",

    async function (e) {

        if (!e.target.matches("#registerForm"))
            return;

        e.preventDefault();

        const inputs =
            e.target.querySelectorAll("input");

        const participant = {

            name:
                inputs[0].value.trim(),

            email:
                inputs[1].value
                    .trim()
                    .toLowerCase(),

            team:
                inputs[2].value.trim(),

            registeredAt:
                new Date().toISOString()

        };

        saveRegistration(participant);

        if (window.championshipData) {

            try {

                await window.championshipData.register(
                    participant
                );

            } catch (err) {

                console.error(err);

            }

        }

        renderLiveRegistrations();

        openParticipantPortal(participant);

    },

    true

);

/* ----------------------------------------------------- */

window.addEventListener(

    "firebase-registrations",

    renderLiveRegistrations

);

/* ----------------------------------------------------- */

renderLiveRegistrations();

/* ==========================================================
   ChampionshipOS
   APP.JS
   PART 5
   LEADERBOARD ENGINE
========================================================== */

"use strict";

/* ----------------------------------------------------------
   LEADERBOARD STATE
---------------------------------------------------------- */

APP.leaderboard = [];

/* ----------------------------------------------------------
   RANDOM POINTS
---------------------------------------------------------- */

function randomPoints() {

    return Math.floor(Math.random() * 1800) + 400;

}

/* ----------------------------------------------------------
   BUILD LEADERBOARD
---------------------------------------------------------- */

function buildLeaderboard() {

    let participants = [];

    if (Array.isArray(window.firebaseRegistrations) &&
        window.firebaseRegistrations.length > 0) {

        participants = [...window.firebaseRegistrations];

    } else {

        participants = registrations();

    }

    APP.leaderboard = participants.map(person => ({

        ...person,

        points: person.points || randomPoints(),

        badges: person.badges || 0

    }));

    APP.leaderboard.sort((a, b) => b.points - a.points);

    APP.leaderboard.forEach((player, index) => {

        player.rank = index + 1;

    });

}

/* ----------------------------------------------------------
   AVATAR
---------------------------------------------------------- */

function avatarClass(rank) {

    if (rank === 1) return "yellow";

    if (rank === 2) return "blue";

    if (rank === 3) return "peach";

    return "lavender";

}

/* ----------------------------------------------------------
   RANK CHANGE
---------------------------------------------------------- */

function rankArrow(rank) {

    if (rank === 1) return "★";

    if (rank <= 5) return "↑";

    return "•";

}

/* ----------------------------------------------------------
   RENDER LEADERBOARD
---------------------------------------------------------- */

function renderLeaderboard() {

    buildLeaderboard();

    const podium = document.querySelector(".podium");

    if (!podium) return;

    podium.innerHTML = `

<div class="podium-title">

<span class="live-dot"></span>

Live Leaderboard

<small>${APP.leaderboard.length} Participants</small>

</div>

`;

    if (APP.leaderboard.length === 0) {

        podium.insertAdjacentHTML(

            "beforeend",

            `

<p class="empty-live">

Leaderboard will appear after the first participant registers.

</p>

`

        );

        return;

    }

    APP.leaderboard.forEach(player => {

        podium.insertAdjacentHTML(

            "beforeend",

            `

<div class="leader-row ${player.rank===1?"top":""}">

<span class="place">

${String(player.rank).padStart(2,"0")}

</span>

<div class="avatar ${avatarClass(player.rank)}">

${initials(player.name)}

</div>

<div>

<b>${player.name}</b>

<small>

${player.team || "Individual"}

</small>

</div>

<strong>

${player.points}

</strong>

<em>

${rankArrow(player.rank)}

</em>

</div>

`

        );

    });

    podium.insertAdjacentHTML(

        "beforeend",

        `

<button
class="full-btn"
id="refreshLeaderboard">

Refresh Leaderboard →

</button>

`

    );

}

/* ----------------------------------------------------------
   CURRENT USER RANK
---------------------------------------------------------- */

function updateCurrentRank() {

    if (!APP.profile) return;

    const panel = document.querySelector(".rank-panel");

    if (!panel) return;

    const player = APP.leaderboard.find(

        p => p.email === APP.profile.email

    );

    if (!player) return;

    panel.innerHTML = `

<p class="section-label">

Your Current Rank

</p>

<div class="rank-num">

${player.rank}

<sup>${ordinal(player.rank)}</sup>

</div>

<p>

${player.points} Championship Points

</p>

<div class="rank-bar">

<span style="width:${Math.min(player.points/30,100)}%"></span>

</div>

<button id="openLeaderboard">

View Leaderboard →

</button>

`;

}

/* ----------------------------------------------------------
   ORDINAL
---------------------------------------------------------- */

function ordinal(number) {

    if (number % 10 === 1 && number !== 11) return "st";

    if (number % 10 === 2 && number !== 12) return "nd";

    if (number % 10 === 3 && number !== 13) return "rd";

    return "th";

}

/* ----------------------------------------------------------
   FIND PARTICIPANT
---------------------------------------------------------- */

function participantRank(email) {

    return APP.leaderboard.find(

        p => p.email === email

    );

}

/* ----------------------------------------------------------
   TOP THREE
---------------------------------------------------------- */

function topThree() {

    return APP.leaderboard.slice(0,3);

}

/* ----------------------------------------------------------
   REFRESH
---------------------------------------------------------- */

function refreshLeaderboard() {

    renderLeaderboard();

    updateCurrentRank();

}

/* ----------------------------------------------------------
   EVENTS
---------------------------------------------------------- */

document.addEventListener("click", event=>{

    if(event.target.closest("#refreshLeaderboard")){

        refreshLeaderboard();

    }

});

/* ----------------------------------------------------------
   FIREBASE LIVE UPDATE
---------------------------------------------------------- */

window.addEventListener(

    "firebase-registrations",

    ()=>{

        refreshLeaderboard();

    }

);

/* ----------------------------------------------------------
   INITIALIZE
---------------------------------------------------------- */

window.addEventListener("load",()=>{

    refreshLeaderboard();

});

/* ==========================================================
   ChampionshipOS
   APP.JS
   PART 6
   BADGES • REWARDS • CERTIFICATES ENGINE
========================================================== */

"use strict";

/* ----------------------------------------------------------
   DEFAULT BADGES
---------------------------------------------------------- */

const BADGES = [

    {
        id: "starter",
        title: "Starter",
        icon: "🚀",
        rule: points => points >= 100
    },

    {
        id: "consistent",
        title: "Consistency Champion",
        icon: "🔥",
        rule: points => points >= 500
    },

    {
        id: "solver",
        title: "Problem Solver",
        icon: "🧠",
        rule: points => points >= 1000
    },

    {
        id: "warrior",
        title: "Coding Warrior",
        icon: "⚔️",
        rule: points => points >= 1500
    },

    {
        id: "champion",
        title: "Champion",
        icon: "🏆",
        rule: points => points >= 2000
    }

];

/* ----------------------------------------------------------
   ASSIGN BADGES
---------------------------------------------------------- */

function assignBadges(player){

    player.badges = [];

    BADGES.forEach(badge=>{

        if(badge.rule(player.points)){

            player.badges.push(badge);

        }

    });

}

/* ----------------------------------------------------------
   ASSIGN REWARD
---------------------------------------------------------- */

function assignReward(player){

    if(player.rank===1){

        player.reward="🥇 Championship Winner";

    }

    else if(player.rank<=3){

        player.reward="🥈 Top Performer";

    }

    else if(player.rank<=10){

        player.reward="⭐ Elite Coder";

    }

    else{

        player.reward="🎯 Participant";

    }

}

/* ----------------------------------------------------------
   CERTIFICATE
---------------------------------------------------------- */

function certificate(player){

    if(player.rank===1){

        return "Java DSA Champion";

    }

    if(player.rank<=10){

        return "Technical Excellence";

    }

    return "Championship Participation";

}

/* ----------------------------------------------------------
   PROCESS EVERY PLAYER
---------------------------------------------------------- */

function processAwards(){

    APP.leaderboard.forEach(player=>{

        assignBadges(player);

        assignReward(player);

        player.certificate=certificate(player);

    });

}

/* ----------------------------------------------------------
   RENDER BADGES
---------------------------------------------------------- */

function renderBadges(){

    if(!APP.profile) return;

    const panel=document.querySelector(".badges-panel");

    if(!panel) return;

    const player=participantRank(APP.profile.email);

    if(!player) return;

    panel.innerHTML=`

<div class="section-top">

<p class="section-label">

My Badges

</p>

<button>

${player.badges.length} Earned

</button>

</div>

<div class="badge-row">

${player.badges.map(b=>`

<div title="${b.title}">

${b.icon}

<small>

${b.title}

</small>

</div>

`).join("")}

</div>

`;

}

/* ----------------------------------------------------------
   REWARD PANEL
---------------------------------------------------------- */

function rewardCard(){

    if(!APP.profile) return;

    const player=participantRank(APP.profile.email);

    if(!player) return;

    loadWorkspace(

        "Rewards & Recognition",

        `

<div class="participant-summary">

<div>

<small>RANK</small>

<b>#${player.rank}</b>

</div>

<div>

<small>POINTS</small>

<b>${player.points}</b>

</div>

<div>

<small>BADGES</small>

<b>${player.badges.length}</b>

</div>

</div>

<div class="participant-sections">

<section class="podium">

<p class="section-label">

Reward

</p>

<h3>

${player.reward}

</h3>

<p>

Current recognition earned.

</p>

</section>

<section class="podium">

<p class="section-label">

Certificate

</p>

<h3>

${player.certificate}

</h3>

<p>

Available after championship completion.

</p>

</section>

<section class="podium">

<p class="section-label">

Achievements

</p>

<h3>

${player.badges.length}

Badge(s)

</h3>

<p>

Keep solving challenges to unlock more.

</p>

</section>

</div>

`

    );

}

/* ----------------------------------------------------------
   MENU
---------------------------------------------------------- */

document.addEventListener("click",event=>{

    const button=event.target.closest(".side-link");

    if(!button) return;

    const text=button.textContent.trim();

    if(text.includes("My badges")){

        rewardCard();

    }

});

/* ----------------------------------------------------------
   INITIALIZE
---------------------------------------------------------- */

window.addEventListener("load",()=>{

    processAwards();

    renderBadges();

});

window.addEventListener("firebase-registrations",()=>{

    processAwards();

    renderBadges();

});

/* ==========================================================
   ChampionshipOS
   APP.JS
   PART 7
   ADMIN DASHBOARD ENGINE
========================================================== */

"use strict";

/* ----------------------------------------------------------
   ADMIN CONFIG
---------------------------------------------------------- */

const ADMIN = {

    id: "admin",

    password: "championship2026"

};

/* ----------------------------------------------------------
   VERIFY ADMIN
---------------------------------------------------------- */

function adminLogin(id,password){

    if(
        id===ADMIN.id &&
        password===ADMIN.password
    ){

        openAdminDashboard();

        return true;

    }

    const message=document.getElementById("adminMessage");

    if(message){

        message.textContent="Invalid Administrator Credentials.";

        message.style.color="#d9534f";

    }

    return false;

}

/* ----------------------------------------------------------
   ADMIN DASHBOARD
---------------------------------------------------------- */

function openAdminDashboard(){

    closeModal();

    showDashboard();

    loadWorkspace(

        "Administrator Dashboard",

        `

<div class="participant-summary">

<div>

<small>PARTICIPANTS</small>

<b>${APP.leaderboard.length}</b>

</div>

<div>

<small>REGISTERED</small>

<b>${registrations().length}</b>

</div>

<div>

<small>TOP SCORE</small>

<b>${APP.leaderboard.length ? APP.leaderboard[0].points : 0}</b>

</div>

</div>

<div class="participant-sections">

<section class="podium">

<p class="section-label">

Leaderboard

</p>

<div id="adminLeaderboard"></div>

</section>

<section class="podium">

<p class="section-label">

Reward Controls

</p>

<div id="rewardControls"></div>

</section>

<section class="podium">

<p class="section-label">

Certificates

</p>

<div id="certificateControls"></div>

</section>

</div>

`

    );

    renderAdminLeaderboard();

    renderRewardControls();

    renderCertificateControls();

}

/* ----------------------------------------------------------
   ADMIN LEADERBOARD
---------------------------------------------------------- */

function renderAdminLeaderboard(){

    const container=document.getElementById("adminLeaderboard");

    if(!container) return;

    container.innerHTML="";

    APP.leaderboard.forEach(player=>{

        container.insertAdjacentHTML(

            "beforeend",

            `

<div class="leader-row">

<span class="place">

${player.rank}

</span>

<div class="avatar blue">

${initials(player.name)}

</div>

<div>

<b>${player.name}</b>

<small>${player.team || "Individual"}</small>

</div>

<strong>

${player.points}

</strong>

</div>

`

        );

    });

}

/* ----------------------------------------------------------
   REWARD CONTROLS
---------------------------------------------------------- */

function renderRewardControls(){

    const container=document.getElementById("rewardControls");

    if(!container) return;

    container.innerHTML="";

    APP.leaderboard.forEach(player=>{

        container.insertAdjacentHTML(

            "beforeend",

            `

<div class="task">

<div>

<b>${player.name}</b>

<small>${player.reward}</small>

</div>

<button
class="issueReward"
data-email="${player.email}">

Issue

</button>

</div>

`

        );

    });

}

/* ----------------------------------------------------------
   CERTIFICATE CONTROLS
---------------------------------------------------------- */

function renderCertificateControls(){

    const container=document.getElementById("certificateControls");

    if(!container) return;

    container.innerHTML="";

    APP.leaderboard.forEach(player=>{

        container.insertAdjacentHTML(

            "beforeend",

            `

<div class="task">

<div>

<b>${player.name}</b>

<small>${player.certificate}</small>

</div>

<button
class="issueCertificate"
data-email="${player.email}">

Release

</button>

</div>

`

        );

    });

}

/* ----------------------------------------------------------
   ISSUE REWARD
---------------------------------------------------------- */

function issueReward(email){

    const player=participantRank(email);

    if(!player) return;

    alert(

        "Reward issued to\n\n"+

        player.name

    );

}

/* ----------------------------------------------------------
   RELEASE CERTIFICATE
---------------------------------------------------------- */

function releaseCertificate(email){

    const player=participantRank(email);

    if(!player) return;

    alert(

        "Certificate released for\n\n"+

        player.name

    );

}

/* ----------------------------------------------------------
   ADMIN FORM
---------------------------------------------------------- */

document.addEventListener("submit",function(event){

    if(!event.target.matches("#adminForm")) return;

    event.preventDefault();

    const id=document.getElementById("adminId").value.trim();

    const password=document.getElementById("adminPassword").value;

    adminLogin(id,password);

});

/* ----------------------------------------------------------
   BUTTONS
---------------------------------------------------------- */

document.addEventListener("click",function(event){

    const reward=event.target.closest(".issueReward");

    if(reward){

        issueReward(

            reward.dataset.email

        );

    }

    const certificate=event.target.closest(".issueCertificate");

    if(certificate){

        releaseCertificate(

            certificate.dataset.email

        );

    }

});

/* ==========================================================
   ChampionshipOS
   APP.JS
   PART 8
   DAILY CHALLENGES ENGINE
========================================================== */

"use strict";

/* ----------------------------------------------------------
   CHAMPIONSHIP DAYS
---------------------------------------------------------- */

const CHAMPIONSHIP_DAYS = [

{
day:1,
title:"Java Fundamentals",
topic:"Variables • Input • Output",
points:50
},

{
day:2,
title:"Operators & Conditions",
topic:"if • switch • loops",
points:75
},

{
day:3,
title:"Arrays",
topic:"Traversal • Maximum • Minimum",
points:100
},

{
day:4,
title:"Strings",
topic:"Palindrome • Frequency",
points:100
},

{
day:5,
title:"Searching",
topic:"Linear • Binary Search",
points:120
},

{
day:6,
title:"Sorting",
topic:"Bubble • Selection",
points:150
},

{
day:7,
title:"Recursion",
topic:"Basic Problems",
points:170
},

{
day:8,
title:"Linked Lists",
topic:"Insertion • Deletion",
points:180
},

{
day:9,
title:"Stacks",
topic:"Implementation",
points:200
},

{
day:10,
title:"Queues",
topic:"Circular Queue",
points:200
},

{
day:11,
title:"Trees",
topic:"Binary Trees",
points:250
},

{
day:12,
title:"Graphs",
topic:"Traversal",
points:300
},

{
day:13,
title:"Grand Finale Hackathon",
topic:"Innovation Challenge",
points:500
}

];

/* ----------------------------------------------------------
   CURRENT DAY
---------------------------------------------------------- */

function championshipDay(){

    const today=new Date();

    const start=new Date("2026-08-26");

    const difference=Math.floor(

        (today-start)/(1000*60*60*24)

    )+1;

    return Math.min(

        Math.max(difference,1),

        13

    );

}

/* ----------------------------------------------------------
   TODAY
---------------------------------------------------------- */

function todayChallenge(){

    return CHAMPIONSHIP_DAYS[

        championshipDay()-1

    ];

}

/* ----------------------------------------------------------
   OPEN DAILY PAGE
---------------------------------------------------------- */

function openDailyChallenge(){

    const challenge=todayChallenge();

    loadWorkspace(

        "Today's Challenge",

`

<div class="participant-summary">

<div>

<small>DAY</small>

<b>${challenge.day}</b>

</div>

<div>

<small>POINTS</small>

<b>${challenge.points}</b>

</div>

<div>

<small>TOPIC</small>

<b>${challenge.topic}</b>

</div>

</div>

<section class="podium workspace-list">

<p class="section-label">

Today's Lesson

</p>

<h2>

${challenge.title}

</h2>

<p>

${challenge.topic}

</p>

<br>

<button
class="primary"
id="completeChallenge">

Mark as Completed

</button>

</section>

`

    );

}

/* ----------------------------------------------------------
   COMPLETE
---------------------------------------------------------- */

function completeChallenge(){

    if(!APP.profile) return;

    const player=participantRank(

        APP.profile.email

    );

    if(!player) return;

    const challenge=todayChallenge();

    player.points+=challenge.points;

    processAwards();

    refreshLeaderboard();

    renderBadges();

    alert(

"Congratulations!\n\n"+

"+"+challenge.points+

" Championship Points Earned."

    );

}

/* ----------------------------------------------------------
   SIDE MENU
---------------------------------------------------------- */

document.addEventListener("click",event=>{

    const side=event.target.closest(".side-link");

    if(side){

        if(

            side.textContent.includes("Daily")

        ){

            openDailyChallenge();

        }

    }

    if(

        event.target.closest("#completeChallenge")

    ){

        completeChallenge();

    }

});

/* ==========================================================
   ChampionshipOS
   APP.JS
   PART 9
   TEAM ENGINE
========================================================== */

"use strict";

/* ----------------------------------------------------------
   TEAM DATABASE
---------------------------------------------------------- */

APP.teams = [];

/* ----------------------------------------------------------
   BUILD TEAMS
---------------------------------------------------------- */

function buildTeams() {

    const map = {};

    APP.leaderboard.forEach(player => {

        const team = player.team && player.team.trim()
            ? player.team.trim()
            : "Individual";

        if (!map[team]) {

            map[team] = {

                name: team,

                members: [],

                points: 0

            };

        }

        map[team].members.push(player);

        map[team].points += player.points;

    });

    APP.teams = Object.values(map);

    APP.teams.sort((a, b) => b.points - a.points);

}

/* ----------------------------------------------------------
   TEAM RANK
---------------------------------------------------------- */

function rankTeams() {

    APP.teams.forEach((team, index) => {

        team.rank = index + 1;

    });

}

/* ----------------------------------------------------------
   TEAM PAGE
---------------------------------------------------------- */

function openTeams() {

    buildTeams();

    rankTeams();

    loadWorkspace(

        "Championship Teams",

        `

<div id="teamContainer"></div>

`

    );

    renderTeams();

}

/* ----------------------------------------------------------
   TEAM CARDS
---------------------------------------------------------- */

function renderTeams() {

    const container = document.getElementById("teamContainer");

    if (!container) return;

    container.innerHTML = "";

    APP.teams.forEach(team => {

        container.insertAdjacentHTML(

            "beforeend",

            `

<section class="podium">

<p class="section-label">

TEAM #${team.rank}

</p>

<h2>

${team.name}

</h2>

<p>

${team.members.length} Members

</p>

<h3>

${team.points} Points

</h3>

<div id="members-${team.rank}"></div>

</section>

<br>

`

        );

        const memberBox = document.getElementById(

            `members-${team.rank}`

        );

        team.members.forEach(member => {

            memberBox.insertAdjacentHTML(

                "beforeend",

                `

<div class="leader-row">

<span class="place">

${member.rank}

</span>

<div class="avatar blue">

${initials(member.name)}

</div>

<div>

<b>

${member.name}

</b>

<small>

${member.points} pts

</small>

</div>

</div>

`

            );

        });

    });

}

/* ----------------------------------------------------------
   MY TEAM
---------------------------------------------------------- */

function openMyTeam() {

    if (!APP.profile) return;

    buildTeams();

    const team = APP.teams.find(

        item => item.name === (APP.profile.team || "Individual")

    );

    if (!team) return;

    loadWorkspace(

        "My Team",

        `

<div class="participant-summary">

<div>

<small>

TEAM

</small>

<b>

${team.name}

</b>

</div>

<div>

<small>

RANK

</small>

<b>

#${team.rank}

</b>

</div>

<div>

<small>

POINTS

</small>

<b>

${team.points}

</b>

</div>

</div>

<div id="myTeamMembers"></div>

`

    );

    const members = document.getElementById("myTeamMembers");

    team.members.forEach(player => {

        members.insertAdjacentHTML(

            "beforeend",

            `

<div class="leader-row">

<span class="place">

${player.rank}

</span>

<div class="avatar yellow">

${initials(player.name)}

</div>

<div>

<b>

${player.name}

</b>

<small>

${player.points} Championship Points

</small>

</div>

</div>

`

        );

    });

}

/* ----------------------------------------------------------
   TEAM MENU
---------------------------------------------------------- */

document.addEventListener("click", event => {

    const side = event.target.closest(".side-link");

    if (!side) return;

    const text = side.textContent;

    if (text.includes("My team")) {

        openMyTeam();

    }

    if (text.includes("Teams")) {

        openTeams();

    }

});

/* ----------------------------------------------------------
   AUTO REFRESH
---------------------------------------------------------- */

window.addEventListener("firebase-registrations", () => {

    buildTeams();

    rankTeams();

});

window.addEventListener("load", () => {

    buildTeams();

    rankTeams();

});

/* ==========================================================
   ChampionshipOS
   APP.JS
   PART 10
   ANNOUNCEMENTS + NOTIFICATIONS ENGINE
========================================================== */

"use strict";

/* ----------------------------------------------------------
   ANNOUNCEMENTS
---------------------------------------------------------- */

APP.announcements = [

{
    title:"Welcome to ChampionshipOS",
    message:"Registration is now open for Java DSA Championship 2026.",
    date:"Day 1"
},

{
    title:"Daily Coding Challenge",
    message:"Today's coding challenge is now available.",
    date:"Today"
},

{
    title:"Grand Finale",
    message:"Hackathon begins on Day 13.",
    date:"Upcoming"
}

];

/* ----------------------------------------------------------
   NOTIFICATION
---------------------------------------------------------- */

function notify(title,message){

    if(!("Notification" in window)){

        alert(title + "\n\n" + message);

        return;

    }

    if(Notification.permission==="granted"){

        new Notification(title,{

            body:message,

            icon:"favicon.ico"

        });

        return;

    }

    if(Notification.permission!=="denied"){

        Notification.requestPermission()

        .then(permission=>{

            if(permission==="granted"){

                new Notification(title,{

                    body:message,

                    icon:"favicon.ico"

                });

            }

        });

    }

}

/* ----------------------------------------------------------
   OPEN ANNOUNCEMENTS
---------------------------------------------------------- */

function openAnnouncements(){

    loadWorkspace(

        "Championship Announcements",

        `

<div id="announcementList"></div>

`

    );

    renderAnnouncements();

}

/* ----------------------------------------------------------
   RENDER
---------------------------------------------------------- */

function renderAnnouncements(){

    const container=document.getElementById("announcementList");

    if(!container) return;

    container.innerHTML="";

    APP.announcements.forEach(item=>{

        container.insertAdjacentHTML(

            "beforeend",

            `

<section class="podium">

<p class="section-label">

${item.date}

</p>

<h3>

${item.title}

</h3>

<p>

${item.message}

</p>

</section>

<br>

`

        );

    });

}

/* ----------------------------------------------------------
   ADD ANNOUNCEMENT
---------------------------------------------------------- */

function addAnnouncement(title,message){

    APP.announcements.unshift({

        title,

        message,

        date:new Date().toLocaleDateString()

    });

    renderAnnouncements();

    notify(title,message);

}

/* ----------------------------------------------------------
   ADMIN BROADCAST
---------------------------------------------------------- */

function broadcastAnnouncement(){

    const title=prompt("Announcement Title");

    if(!title) return;

    const message=prompt("Announcement");

    if(!message) return;

    addAnnouncement(title,message);

}

/* ----------------------------------------------------------
   MENU EVENTS
---------------------------------------------------------- */

document.addEventListener("click",event=>{

    const side=event.target.closest(".side-link");

    if(side){

        if(side.textContent.includes("Resources")){

            openAnnouncements();

        }

    }

    if(event.target.closest("#broadcastAnnouncement")){

        broadcastAnnouncement();

    }

});

/* ----------------------------------------------------------
   AUTO WELCOME
---------------------------------------------------------- */

window.addEventListener("load",()=>{

    setTimeout(()=>{

        notify(

            "Welcome to ChampionshipOS",

            "Your championship journey starts today."

        );

    },3000);

});

/* ==========================================================
   ChampionshipOS
   APP.JS
   PART 11
   RESOURCES ENGINE
========================================================== */

"use strict";

/* ----------------------------------------------------------
   RESOURCE LIBRARY
---------------------------------------------------------- */

APP.resources = [

{
    category:"Java Basics",
    title:"Java Fundamentals Notes",
    type:"PDF",
    link:"#"
},

{
    category:"Arrays",
    title:"Array Practice Sheet",
    type:"PDF",
    link:"#"
},

{
    category:"Strings",
    title:"String Problems",
    type:"PDF",
    link:"#"
},

{
    category:"Searching",
    title:"Linear vs Binary Search",
    type:"PDF",
    link:"#"
},

{
    category:"Sorting",
    title:"Sorting Algorithms",
    type:"PDF",
    link:"#"
},

{
    category:"DSA",
    title:"Java DSA Handbook",
    type:"PDF",
    link:"#"
},

{
    category:"Practice",
    title:"100 Coding Questions",
    type:"PDF",
    link:"#"
},

{
    category:"Hackathon",
    title:"Grand Finale Guidelines",
    type:"PDF",
    link:"#"
}

];

/* ----------------------------------------------------------
   OPEN RESOURCE PAGE
---------------------------------------------------------- */

function openResources(){

    loadWorkspace(

        "Learning Resources",

        `

<div class="participant-summary">

<div>

<small>

TOTAL RESOURCES

</small>

<b>

${APP.resources.length}

</b>

</div>

<div>

<small>

CATEGORY

</small>

<b>

JAVA + DSA

</b>

</div>

<div>

<small>

ACCESS

</small>

<b>

REGISTERED

</b>

</div>

</div>

<div id="resourceContainer"></div>

`

    );

    renderResources();

}

/* ----------------------------------------------------------
   RENDER RESOURCES
---------------------------------------------------------- */

function renderResources(){

    const container=document.getElementById("resourceContainer");

    if(!container) return;

    container.innerHTML="";

    APP.resources.forEach((item,index)=>{

        container.insertAdjacentHTML(

            "beforeend",

            `

<section class="podium">

<div class="leader-row">

<div class="avatar yellow">

📘

</div>

<div>

<b>

${item.title}

</b>

<small>

${item.category}

</small>

</div>

<strong>

${item.type}

</strong>

<button
class="downloadResource"
data-id="${index}">

Open

</button>

</div>

</section>

<br>

`

        );

    });

}

/* ----------------------------------------------------------
   OPEN RESOURCE
---------------------------------------------------------- */

function openResource(id){

    const resource=APP.resources[id];

    if(!resource) return;

    if(resource.link==="#" || !resource.link){

        alert(

            "Resource\n\n"+

            resource.title+

            "\n\nwill be uploaded by Admin."

        );

        return;

    }

    window.open(

        resource.link,

        "_blank"

    );

}

/* ----------------------------------------------------------
   ADD RESOURCE
---------------------------------------------------------- */

function addResource(

    category,

    title,

    type,

    link

){

    APP.resources.push({

        category,

        title,

        type,

        link

    });

    renderResources();

}

/* ----------------------------------------------------------
   ADMIN QUICK ADD
---------------------------------------------------------- */

function adminAddResource(){

    const category=prompt("Category");

    if(!category) return;

    const title=prompt("Title");

    if(!title) return;

    const type=prompt("Type","PDF");

    const link=prompt("Download URL");

    addResource(

        category,

        title,

        type,

        link

    );

}

/* ----------------------------------------------------------
   EVENTS
---------------------------------------------------------- */

document.addEventListener("click",event=>{

    const side=event.target.closest(".side-link");

    if(side){

        if(side.textContent.includes("Resources")){

            openResources();

        }

    }

    const download=

        event.target.closest(".downloadResource");

    if(download){

        openResource(

            download.dataset.id

        );

    }

    if(event.target.closest("#addResource")){

        adminAddResource();

    }

});

/* ----------------------------------------------------------
   INITIALIZE
---------------------------------------------------------- */

window.addEventListener("load",()=>{

    console.log(

        "Resources Engine Loaded"

    );

});

/* ==========================================================
   ChampionshipOS
   APP.JS
   PART 12
   ANALYTICS & ADMIN REPORTS ENGINE
========================================================== */

"use strict";

/* ----------------------------------------------------------
   ANALYTICS
---------------------------------------------------------- */

APP.analytics = {

    totalParticipants: 0,

    totalTeams: 0,

    averageScore: 0,

    highestScore: 0,

    lowestScore: 0

};

/* ----------------------------------------------------------
   CALCULATE ANALYTICS
---------------------------------------------------------- */

function calculateAnalytics(){

    const players = APP.leaderboard;

    APP.analytics.totalParticipants = players.length;

    APP.analytics.totalTeams = APP.teams.length;

    if(players.length===0){

        APP.analytics.averageScore=0;
        APP.analytics.highestScore=0;
        APP.analytics.lowestScore=0;

        return;

    }

    let total=0;

    players.forEach(player=>{

        total+=player.points;

    });

    APP.analytics.averageScore=Math.round(

        total/players.length

    );

    APP.analytics.highestScore=

        players[0].points;

    APP.analytics.lowestScore=

        players[players.length-1].points;

}

/* ----------------------------------------------------------
   OPEN REPORTS
---------------------------------------------------------- */

function openReports(){

    calculateAnalytics();

    loadWorkspace(

        "Championship Reports",

`

<div class="participant-summary">

<div>

<small>

PARTICIPANTS

</small>

<b>

${APP.analytics.totalParticipants}

</b>

</div>

<div>

<small>

TEAMS

</small>

<b>

${APP.analytics.totalTeams}

</b>

</div>

<div>

<small>

AVERAGE SCORE

</small>

<b>

${APP.analytics.averageScore}

</b>

</div>

</div>

<div class="participant-sections">

<section class="podium">

<p class="section-label">

Highest Score

</p>

<h2>

${APP.analytics.highestScore}

</h2>

</section>

<section class="podium">

<p class="section-label">

Lowest Score

</p>

<h2>

${APP.analytics.lowestScore}

</h2>

</section>

<section class="podium">

<p class="section-label">

Top Performer

</p>

<h2>

${APP.leaderboard.length
? APP.leaderboard[0].name
: "-"}

</h2>

</section>

</div>

<br>

<button
class="primary"
id="downloadReport">

Download Report

</button>

`

    );

}

/* ----------------------------------------------------------
   CSV EXPORT
---------------------------------------------------------- */

function downloadReport(){

    let csv =

`Rank,Name,Team,Points,Badges,Reward\n`;

    APP.leaderboard.forEach(player=>{

        csv +=

`${player.rank},${player.name},${player.team || "Individual"},${player.points},${player.badges.length},"${player.reward}"\n`;

    });

    const blob = new Blob(

        [csv],

        {

            type:"text/csv"

        }

    );

    const url = URL.createObjectURL(blob);

    const link=document.createElement("a");

    link.href=url;

    link.download="Championship_Report.csv";

    link.click();

    URL.revokeObjectURL(url);

}

/* ----------------------------------------------------------
   EXPORT JSON
---------------------------------------------------------- */

function exportJSON(){

    const blob = new Blob(

        [

            JSON.stringify(

                APP.leaderboard,

                null,

                2

            )

        ],

        {

            type:"application/json"

        }

    );

    const url=URL.createObjectURL(blob);

    const link=document.createElement("a");

    link.href=url;

    link.download="championship-data.json";

    link.click();

    URL.revokeObjectURL(url);

}

/* ----------------------------------------------------------
   EVENTS
---------------------------------------------------------- */

document.addEventListener("click",event=>{

    if(event.target.closest("#downloadReport")){

        downloadReport();

    }

    if(event.target.closest("#downloadJSON")){

        exportJSON();

    }

    if(event.target.closest("#adminReports")){

        openReports();

    }

});

/* ----------------------------------------------------------
   LIVE REFRESH
---------------------------------------------------------- */

window.addEventListener("firebase-registrations",()=>{

    calculateAnalytics();

});

window.addEventListener("load",()=>{

    calculateAnalytics();

});
/* ==========================================================
   ChampionshipOS
   APP.JS
   PART 13
   ADMIN PARTICIPANT MANAGEMENT ENGINE
========================================================== */

"use strict";

/* ----------------------------------------------------------
   SEARCH PARTICIPANTS
---------------------------------------------------------- */

function searchParticipants(keyword){

    keyword = keyword.trim().toLowerCase();

    if(keyword===""){

        return APP.leaderboard;

    }

    return APP.leaderboard.filter(player=>{

        return (

            player.name.toLowerCase().includes(keyword) ||

            (player.email || "").toLowerCase().includes(keyword) ||

            (player.team || "").toLowerCase().includes(keyword)

        );

    });

}

/* ----------------------------------------------------------
   OPEN PARTICIPANT MANAGER
---------------------------------------------------------- */

function openParticipantManager(){

    loadWorkspace(

        "Participant Management",

`

<div class="participant-summary">

<div>

<small>

REGISTERED

</small>

<b>

${APP.leaderboard.length}

</b>

</div>

<div>

<small>

ACTIVE

</small>

<b>

${APP.leaderboard.length}

</b>

</div>

<div>

<small>

SEARCH

</small>

<b>

LIVE

</b>

</div>

</div>

<div class="workspace-list">

<input

type="text"

id="participantSearch"

placeholder="Search participant..."

style="width:100%;padding:12px;margin-bottom:20px;">

<div id="participantTable"></div>

</div>

`

    );

    renderParticipantTable(APP.leaderboard);

}

/* ----------------------------------------------------------
   TABLE
---------------------------------------------------------- */

function renderParticipantTable(players){

    const table=document.getElementById("participantTable");

    if(!table) return;

    table.innerHTML="";

    players.forEach(player=>{

        table.insertAdjacentHTML(

            "beforeend",

`

<div class="leader-row">

<span class="place">

${player.rank}

</span>

<div class="avatar blue">

${initials(player.name)}

</div>

<div>

<b>

${player.name}

</b>

<small>

${player.email || "-"}

</small>

</div>

<strong>

${player.points}

</strong>

<button

class="editParticipant"

data-email="${player.email}">

Edit

</button>

<button

class="deleteParticipant"

data-email="${player.email}">

Delete

</button>

</div>

`

        );

    });

}

/* ----------------------------------------------------------
   EDIT PARTICIPANT
---------------------------------------------------------- */

function editParticipant(email){

    const player=participantRank(email);

    if(!player) return;

    const points=prompt(

        "Update Points",

        player.points

    );

    if(points===null) return;

    player.points=parseInt(points);

    refreshLeaderboard();

    renderParticipantTable(APP.leaderboard);

}

/* ----------------------------------------------------------
   DELETE PARTICIPANT
---------------------------------------------------------- */

function deleteParticipant(email){

    if(

        !confirm(

            "Delete participant?"

        )

    ) return;

    APP.leaderboard=

        APP.leaderboard.filter(

            player=>player.email!==email

        );

    refreshLeaderboard();

    renderParticipantTable(APP.leaderboard);

}

/* ----------------------------------------------------------
   EVENTS
---------------------------------------------------------- */

document.addEventListener("input",event=>{

    if(

        event.target.id==="participantSearch"

    ){

        renderParticipantTable(

            searchParticipants(

                event.target.value

            )

        );

    }

});

document.addEventListener("click",event=>{

    const edit=

        event.target.closest(".editParticipant");

    if(edit){

        editParticipant(

            edit.dataset.email

        );

    }

    const del=

        event.target.closest(".deleteParticipant");

    if(del){

        deleteParticipant(

            del.dataset.email

        );

    }

});

document.addEventListener("click",event=>{

    if(

        event.target.closest("#participantManager")

    ){

        openParticipantManager();

    }

});

/* ==========================================================
   ChampionshipOS
   APP.JS
   PART 12
   Admin Authentication + Dashboard Loader
========================================================== */

"use strict";

/* ==========================================================
   ADMIN CREDENTIALS
========================================================== */

const ADMIN = {

    id: "kapiladmin",

    password: "admin123"

};

/* ==========================================================
   ADMIN LOGIN
========================================================== */

function adminLogin(id, password) {

    if (
        id === ADMIN.id &&
        password === ADMIN.password
    ) {

        localStorage.setItem(
            "championship-admin",
            "true"
        );

        openAdminDashboard();

        return true;

    }

    const message =
        document.getElementById("adminMessage");

    if (message) {

        message.textContent =
            "Invalid Admin ID or Password.";

        message.style.color = "#ff5c5c";

    }

    return false;

}

/* ==========================================================
   ADMIN DASHBOARD
========================================================== */

function openAdminDashboard() {

    closeModal();

    showDashboard();

    const grid =
        document.querySelector(".app-grid");

    if (!grid) return;

    grid.innerHTML = `

<section class="workspace-page">

<p class="section-label">
ADMIN DASHBOARD
</p>

<h1>
Championship Control Center
</h1>

<div class="participant-summary">

<div>

<small>Participants</small>

<b id="adminParticipants">0</b>

</div>

<div>

<small>Teams</small>

<b id="adminTeams">0</b>

</div>

<div>

<small>Leaderboard</small>

<b id="adminLeaderboard">0</b>

</div>

</div>

<div class="participant-sections">

<section class="podium">

<p class="section-label">
Participants
</p>

<div id="adminParticipantsList">

</div>

</section>

<section class="podium">

<p class="section-label">
Leaderboard
</p>

<div id="adminLeaderboardList">

</div>

</section>

<section class="podium">

<p class="section-label">
Controls
</p>

<button
class="primary"
id="refreshAdmin">

Refresh Data

</button>

<br><br>

<button
class="dark-btn"
id="logoutAdmin">

Logout Admin

</button>

</section>

</div>

</section>

`;

    renderAdminDashboard();

}

/* ==========================================================
   ADMIN DATA
========================================================== */

function renderAdminDashboard() {

    const registrations =
        registrations();

    const leaderboard =
        getLeaderboard();

    document.getElementById(
        "adminParticipants"
    ).textContent =
        registrations.length;

    document.getElementById(
        "adminLeaderboard"
    ).textContent =
        leaderboard.length;

    document.getElementById(
        "adminTeams"
    ).textContent =
        new Set(
            registrations.map(
                x => x.team || "Individual"
            )
        ).size;

    const list =
        document.getElementById(
            "adminParticipantsList"
        );

    list.innerHTML = "";

    registrations.forEach(person => {

        list.innerHTML += `

<div class="leader-row">

<div class="avatar blue">

${initials(person.name)}

</div>

<div>

<b>${person.name}</b>

<small>${person.email}</small>

</div>

</div>

`;

    });

    const board =
        document.getElementById(
            "adminLeaderboardList"
        );

    board.innerHTML = "";

    leaderboard.forEach(player => {

        board.innerHTML += `

<div class="leader-row">

<span class="place">

${player.rank}

</span>

<div>

<b>${player.name}</b>

<small>

${player.points} pts

</small>

</div>

</div>

`;

    });

}

/* ==========================================================
   ADMIN EVENTS
========================================================== */

document.addEventListener(
    "submit",
    function(e){

        if(
            !e.target.matches("#adminForm")
        ) return;

        e.preventDefault();

        adminLogin(

            document
                .getElementById("adminId")
                .value
                .trim(),

            document
                .getElementById("adminPassword")
                .value

        );

    },
    true
);

document.addEventListener(
    "click",
    function(e){

        if(
            e.target.id==="refreshAdmin"
        ){

            renderAdminDashboard();

        }

        if(
            e.target.id==="logoutAdmin"
        ){

            localStorage.removeItem(
                "championship-admin"
            );

            location.reload();

        }

    }
);

/* ==========================================================
   AUTO ADMIN LOGIN
========================================================== */

window.addEventListener(
    "load",
    ()=>{

        if(

            localStorage.getItem(
                "championship-admin"
            )==="true"

        ){

            openAdminDashboard();

        }

    }
);

/* ==========================================================
   ChampionshipOS
   PART 13
   Analytics + Activity Feed + Notifications
========================================================== */

"use strict";

/* ---------------------------------------------------------
   GLOBAL ACTIVITY STORE
--------------------------------------------------------- */

APP.activities = APP.activities || [];
APP.notifications = APP.notifications || [];

/* ---------------------------------------------------------
   ADD ACTIVITY
--------------------------------------------------------- */

function addActivity(type, title, details = "") {

    const activity = {

        id: Date.now(),

        type,

        title,

        details,

        time: new Date().toLocaleTimeString("en-IN"),

        created: Date.now()

    };

    APP.activities.unshift(activity);

    if (APP.activities.length > 50) {

        APP.activities.pop();

    }

    renderActivityFeed();

}

/* ---------------------------------------------------------
   NOTIFICATIONS
--------------------------------------------------------- */

function notify(message) {

    APP.notifications.unshift({

        id: Date.now(),

        text: message,

        read: false

    });

    const toast = document.createElement("div");

    toast.className = "toast-message";

    toast.textContent = message;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {

        toast.classList.add("show");

    });

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => toast.remove(), 300);

    }, 3000);

}

/* ---------------------------------------------------------
   ACTIVITY FEED
--------------------------------------------------------- */

function renderActivityFeed() {

    const feed = document.getElementById("activityFeed");

    if (!feed) return;

    feed.innerHTML = "";

    APP.activities.forEach(item => {

        feed.insertAdjacentHTML(

            "beforeend",

            `
            <div class="activity-item">

                <small>${item.time}</small>

                <b>${item.title}</b>

                <p>${item.details}</p>

            </div>
            `

        );

    });

}

/* ---------------------------------------------------------
   ANALYTICS
--------------------------------------------------------- */

function analytics() {

    const registrations = registrations();

    return {

        participants: registrations.length,

        teams: new Set(
            registrations
                .map(x => x.team)
                .filter(Boolean)
        ).size,

        averagePoints:

            APP.leaderboard.length === 0

            ? 0

            : Math.round(

                APP.leaderboard.reduce(

                    (sum, p) => sum + p.points,

                    0

                ) / APP.leaderboard.length

            ),

        highestScore:

            APP.leaderboard.length === 0

            ? 0

            : Math.max(

                ...APP.leaderboard.map(x => x.points)

            )

    };

}

/* ---------------------------------------------------------
   ANALYTICS PAGE
--------------------------------------------------------- */

function openAnalytics() {

    const stats = analytics();

    loadWorkspace(

        "Championship Analytics",

        `

        <div class="participant-summary">

            <div>

                <small>PARTICIPANTS</small>

                <b>${stats.participants}</b>

            </div>

            <div>

                <small>TEAMS</small>

                <b>${stats.teams}</b>

            </div>

            <div>

                <small>AVERAGE SCORE</small>

                <b>${stats.averagePoints}</b>

            </div>

        </div>

        <div class="participant-summary">

            <div>

                <small>HIGHEST SCORE</small>

                <b>${stats.highestScore}</b>

            </div>

        </div>

        <div
            class="podium workspace-list"
            id="activityFeed">

        </div>

        `

    );

    renderActivityFeed();

}

/* ---------------------------------------------------------
   ACTIVITY EVENTS
--------------------------------------------------------- */

window.addEventListener(

    "firebase-registrations",

    () => {

        addActivity(

            "registration",

            "New Registration",

            "Participant joined the championship."

        );

    }

);

window.addEventListener(

    "leaderboard-updated",

    () => {

        addActivity(

            "leaderboard",

            "Leaderboard Updated",

            "Rankings refreshed."

        );

    }

);

/* ---------------------------------------------------------
   SAMPLE NOTIFICATION
--------------------------------------------------------- */

window.addEventListener(

    "load",

    () => {

        notify("Welcome to ChampionshipOS.");

    }

);

/* ==========================================================
   ChampionshipOS
   PART 14
   Admin Dashboard Engine
========================================================== */

"use strict";

/* ---------------------------------------------------------
   ADMIN CONFIGURATION
--------------------------------------------------------- */

const ADMIN = {

    id: "kapiladmin",

    password: "admin123",

    loggedIn: false

};

/* ---------------------------------------------------------
   ADMIN LOGIN
--------------------------------------------------------- */

function adminLogin(id, password) {

    if (

        id === ADMIN.id &&

        password === ADMIN.password

    ) {

        ADMIN.loggedIn = true;

        notify("Administrator Login Successful");

        openAdminDashboard();

        return true;

    }

    notify("Invalid Admin Credentials");

    return false;

}

/* ---------------------------------------------------------
   ADMIN FORM
--------------------------------------------------------- */

document.addEventListener("submit", function (e) {

    if (!e.target.matches("#adminForm")) return;

    e.preventDefault();

    const id =
        document.getElementById("adminId").value.trim();

    const password =
        document.getElementById("adminPassword").value;

    adminLogin(id, password);

});

/* ---------------------------------------------------------
   ADMIN DASHBOARD
--------------------------------------------------------- */

function openAdminDashboard() {

    closeModal();

    appShell.classList.add("show");

    loadWorkspace(

        "Administrator Dashboard",

        `

<div class="participant-summary">

<div>

<small>PARTICIPANTS</small>

<b id="adminParticipants">0</b>

</div>

<div>

<small>TEAMS</small>

<b id="adminTeams">0</b>

</div>

<div>

<small>LEADERBOARD</small>

<b id="adminLeaderboard">0</b>

</div>

</div>

<div class="participant-sections">

<section class="podium">

<p class="section-label">

Registrations

</p>

<div id="registrationTable"></div>

</section>

<section class="podium">

<p class="section-label">

Leaderboard

</p>

<div id="leaderboardTable"></div>

</section>

<section class="podium">

<p class="section-label">

Quick Actions

</p>

<button
class="primary"
id="refreshAdmin">

Refresh Data

</button>

<br><br>

<button
class="dark-btn"
id="exportRegistrations">

Export CSV

</button>

<br><br>

<button
class="light-btn"
id="adminLogout">

Logout Admin

</button>

</section>

</div>

`

    );

    renderAdminDashboard();

}

/* ---------------------------------------------------------
   ADMIN DATA
--------------------------------------------------------- */

function renderAdminDashboard() {

    const people = registrations();

    const teams =
        new Set(

            people

            .map(x => x.team)

            .filter(Boolean)

        ).size;

    document.getElementById("adminParticipants").textContent =
        people.length;

    document.getElementById("adminTeams").textContent =
        teams;

    document.getElementById("adminLeaderboard").textContent =
        APP.leaderboard.length;

    renderRegistrationTable();

    renderLeaderboardTable();

}

/* ---------------------------------------------------------
   REGISTRATION TABLE
--------------------------------------------------------- */

function renderRegistrationTable() {

    const container =
        document.getElementById("registrationTable");

    if (!container) return;

    container.innerHTML = "";

    registrations().forEach(person => {

        container.insertAdjacentHTML(

            "beforeend",

            `

<div class="leader-row">

<div class="avatar blue">

${initials(person.name)}

</div>

<div>

<b>${person.name}</b>

<small>${person.email}</small>

</div>

<strong>

${person.team || "Individual"}

</strong>

</div>

`

        );

    });

}

/* ---------------------------------------------------------
   LEADERBOARD TABLE
--------------------------------------------------------- */

function renderLeaderboardTable() {

    const container =
        document.getElementById("leaderboardTable");

    if (!container) return;

    container.innerHTML = "";

    APP.leaderboard.forEach(player => {

        container.insertAdjacentHTML(

            "beforeend",

            `

<div class="leader-row">

<span class="place">

${player.rank}

</span>

<div>

<b>${player.name}</b>

<small>${player.team}</small>

</div>

<strong>

${player.points}

</strong>

</div>

`

        );

    });

}

/* ---------------------------------------------------------
   ADMIN ACTIONS
--------------------------------------------------------- */

document.addEventListener("click", function (e) {

    if (e.target.id === "refreshAdmin") {

        renderAdminDashboard();

        notify("Dashboard Refreshed");

    }

    if (e.target.id === "adminLogout") {

        ADMIN.loggedIn = false;

        closeDashboard();

        notify("Admin Logged Out");

    }

});

/* ==========================================================
   ChampionshipOS
   PART 15
   Rewards + Badges + Certificates Engine
========================================================== */

"use strict";

/* ---------------------------------------------------------
   STORAGE
--------------------------------------------------------- */

APP.rewards = APP.rewards || [];

APP.badges = APP.badges || [];

APP.certificates = APP.certificates || [];

/* ---------------------------------------------------------
   ADD BADGE
--------------------------------------------------------- */

function awardBadge(email, badge) {

    let participant = registrations().find(

        p => p.email === email

    );

    if (!participant) return;

    participant.badges = participant.badges || [];

    if (!participant.badges.includes(badge)) {

        participant.badges.push(badge);

        saveRegistration(participant);

        notify("Badge Awarded");

    }

}

/* ---------------------------------------------------------
   ADD REWARD
--------------------------------------------------------- */

function awardReward(email, reward) {

    let participant = registrations().find(

        p => p.email === email

    );

    if (!participant) return;

    participant.reward = reward;

    saveRegistration(participant);

    notify("Reward Assigned");

}

/* ---------------------------------------------------------
   CERTIFICATE
--------------------------------------------------------- */

function issueCertificate(email) {

    let participant = registrations().find(

        p => p.email === email

    );

    if (!participant) return;

    participant.certificate = true;

    participant.certificateDate =

        new Date().toLocaleDateString("en-IN");

    saveRegistration(participant);

    notify("Certificate Released");

}

/* ---------------------------------------------------------
   MY REWARDS PAGE
--------------------------------------------------------- */

function openRewardsPage() {

    if (!window.currentParticipant) return;

    const person = registrations().find(

        p =>

        p.email ===

        window.currentParticipant.email

    );

    loadWorkspace(

        "Rewards & Recognition",

        `

<div class="participant-summary">

<div>

<small>BADGES</small>

<b>

${(person?.badges || []).length}

</b>

</div>

<div>

<small>REWARD</small>

<b>

${person?.reward || "Not Assigned"}

</b>

</div>

<div>

<small>CERTIFICATE</small>

<b>

${person?.certificate ? "Ready" : "Pending"}

</b>

</div>

</div>

<section class="podium workspace-list">

<p class="section-label">

Earned Badges

</p>

<div class="workspace-badges">

${renderBadgeHTML(person)}

</div>

</section>

<section
class="podium workspace-list">

<p class="section-label">

Certificate

</p>

<p>

${

person?.certificate

?

"Certificate available for download."

:

"Certificate will appear after championship completion."

}

</p>

</section>

`

    );

}

/* ---------------------------------------------------------
   BADGE HTML
--------------------------------------------------------- */

function renderBadgeHTML(person) {

    const badges = person?.badges || [];

    if (badges.length === 0) {

        return "<p>No badges earned yet.</p>";

    }

    return badges.map(

        badge =>

        `

<div>

🏅

<br>

${badge}

</div>

`

    ).join("");

}

/* ---------------------------------------------------------
   QUICK DEMO BADGES
--------------------------------------------------------- */

function demoBadges() {

    const list = registrations();

    if (list.length === 0) return;

    awardBadge(

        list[0].email,

        "Fast Finisher"

    );

    awardBadge(

        list[0].email,

        "Logic Master"

    );

}

/* ---------------------------------------------------------
   MENU
--------------------------------------------------------- */

document.addEventListener("click", e => {

    if (

        e.target.closest(".side-link")?.textContent

        .includes("My badges")

    ) {

        openRewardsPage();

    }

});

/* ---------------------------------------------------------
   AUTO DEMO
--------------------------------------------------------- */

window.addEventListener("load", () => {

    demoBadges();

});
/* ==========================================================
   ChampionshipOS
   PART 16
   Daily Challenge Engine
========================================================== */

"use strict";

/* ---------------------------------------------------------
   DAILY CHALLENGES
--------------------------------------------------------- */

APP.dailyChallenges = [

{
    day:1,
    title:"Java Basics",
    topic:"Variables, Input, Output",
    points:100
},

{
    day:2,
    title:"Operators & Conditions",
    topic:"if, switch",
    points:100
},

{
    day:3,
    title:"Loops",
    topic:"for, while",
    points:100
},

{
    day:4,
    title:"Arrays",
    topic:"Traversal",
    points:150
},

{
    day:5,
    title:"Advanced Arrays",
    topic:"Patterns",
    points:200
},

{
    day:6,
    title:"Strings",
    topic:"Palindrome, Frequency",
    points:200
},

{
    day:7,
    title:"Searching",
    topic:"Linear & Binary Search",
    points:250
},

{
    day:8,
    title:"Sorting",
    topic:"Bubble, Selection",
    points:250
},

{
    day:9,
    title:"Recursion",
    topic:"Basic Problems",
    points:300
},

{
    day:10,
    title:"Linked List",
    topic:"Implementation",
    points:350
},

{
    day:11,
    title:"Stack & Queue",
    topic:"Applications",
    points:350
},

{
    day:12,
    title:"Project Sprint",
    topic:"Mini Challenge",
    points:500
},

{
    day:13,
    title:"Grand Finale",
    topic:"Hackathon",
    points:1000
}

];

/* ---------------------------------------------------------
   CURRENT DAY
--------------------------------------------------------- */

APP.currentDay = 1;

/* ---------------------------------------------------------
   MARK COMPLETE
--------------------------------------------------------- */

function completeChallenge(day){

    const participant = registrations().find(

        p =>

        p.email ===

        window.currentParticipant?.email

    );

    if(!participant) return;

    participant.completed =
        participant.completed || [];

    if(participant.completed.includes(day)){

        notify("Already completed.");

        return;

    }

    participant.completed.push(day);

    const challenge =
        APP.dailyChallenges.find(

            c => c.day === day

        );

    participant.points =
        (participant.points || 0) +

        challenge.points;

    saveRegistration(participant);

    notify(

        challenge.title +

        " completed."

    );

    renderDailyChallenge();

}

/* ---------------------------------------------------------
   DAILY PAGE
--------------------------------------------------------- */

function openDailyChallenges(){

    loadWorkspace(

        "Daily Championship Journey",

        `

<div id="dailyChallengeArea">

</div>

`

    );

    renderDailyChallenge();

}

/* ---------------------------------------------------------
   RENDER
--------------------------------------------------------- */

function renderDailyChallenge(){

    const area =
        document.getElementById(

            "dailyChallengeArea"

        );

    if(!area) return;

    const item =
        APP.dailyChallenges.find(

            x =>

            x.day === APP.currentDay

        );

    area.innerHTML = `

<div class="participant-summary">

<div>

<small>DAY</small>

<b>${item.day}</b>

</div>

<div>

<small>TOPIC</small>

<b>${item.topic}</b>

</div>

<div>

<small>POINTS</small>

<b>${item.points}</b>

</div>

</div>

<section class="podium workspace-list">

<p class="section-label">

Today's Challenge

</p>

<h2>

${item.title}

</h2>

<p>

Complete today's coding assignment
to unlock championship points.

</p>

<br>

<button

class="primary"

id="completeChallenge"

data-day="${item.day}"

>

Mark Completed

</button>

</section>

`;

}

/* ---------------------------------------------------------
   COMPLETE BUTTON
--------------------------------------------------------- */

document.addEventListener(

    "click",

    function(e){

        if(

            e.target.id !==

            "completeChallenge"

        ) return;

        completeChallenge(

            Number(

                e.target.dataset.day

            )

        );

    }

);

/* ---------------------------------------------------------
   SIDEBAR
--------------------------------------------------------- */

document.addEventListener(

    "click",

    function(e){

        const btn =

        e.target.closest(".side-link");

        if(!btn) return;

        if(

            btn.textContent.includes(

                "Daily"

            )

        ){

            openDailyChallenges();

        }

    }

);

/* ---------------------------------------------------------
   NEXT DAY
--------------------------------------------------------- */

function nextChallengeDay(){

    APP.currentDay++;

    if(

        APP.currentDay >

        APP.dailyChallenges.length

    ){

        APP.currentDay =

        APP.dailyChallenges.length;

    }

    renderDailyChallenge();

}

/* ---------------------------------------------------------
   PREVIOUS DAY
--------------------------------------------------------- */

function previousChallengeDay(){

    APP.currentDay--;

    if(APP.currentDay < 1){

        APP.currentDay = 1;

    }

    renderDailyChallenge();

}
/* ==========================================================
   ChampionshipOS
   PART 17
   Quiz Engine
========================================================== */

"use strict";

/* ---------------------------------------------------------
   QUIZ DATABASE
--------------------------------------------------------- */

APP.quizzes = {

1:[
{
question:"Which keyword creates an object in Java?",
options:["this","new","class","static"],
answer:1
},
{
question:"Which method starts a Java program?",
options:["run()","start()","main()","execute()"],
answer:2
}
],

2:[
{
question:"Which operator compares values?",
options:["=","==","===","!="],
answer:1
},
{
question:"Which statement handles multiple conditions?",
options:["for","switch","continue","break"],
answer:1
}
],

3:[
{
question:"Which loop always executes at least once?",
options:["for","while","do while","foreach"],
answer:2
}
],

4:[
{
question:"Arrays store...",
options:[
"Multiple values",
"Single value",
"Objects only",
"Characters only"
],
answer:0
}
],

5:[
{
question:"Time Complexity of Linear Search?",
options:[
"O(1)",
"O(log n)",
"O(n)",
"O(n²)"
],
answer:2
}
]

};

/* ---------------------------------------------------------
   QUIZ STATE
--------------------------------------------------------- */

APP.quiz = {

day:1,

index:0,

score:0

};

/* ---------------------------------------------------------
   OPEN QUIZ
--------------------------------------------------------- */

function openQuiz(day){

    APP.quiz.day = day;

    APP.quiz.index = 0;

    APP.quiz.score = 0;

    loadWorkspace(

        "Daily Quiz",

        `

<div id="quizArea"></div>

`

    );

    renderQuestion();

}

/* ---------------------------------------------------------
   CURRENT QUESTION
--------------------------------------------------------- */

function renderQuestion(){

    const area =
        document.getElementById("quizArea");

    if(!area) return;

    const questions =
        APP.quizzes[APP.quiz.day] || [];

    if(APP.quiz.index >= questions.length){

        finishQuiz();

        return;

    }

    const q =
        questions[APP.quiz.index];

    area.innerHTML = `

<section class="podium workspace-list">

<p class="section-label">

QUESTION

${APP.quiz.index+1}

OF

${questions.length}

</p>

<h2>${q.question}</h2>

<div class="quiz-options">

${q.options.map((option,index)=>`

<button

class="light-btn quiz-option"

data-answer="${index}"

>

${option}

</button>

`).join("")}

</div>

</section>

`;

}

/* ---------------------------------------------------------
   ANSWER
--------------------------------------------------------- */

function answerQuestion(choice){

    const questions =
        APP.quizzes[APP.quiz.day];

    const current =
        questions[APP.quiz.index];

    if(choice===current.answer){

        APP.quiz.score++;

    }

    APP.quiz.index++;

    renderQuestion();

}

/* ---------------------------------------------------------
   FINISH QUIZ
--------------------------------------------------------- */

function finishQuiz(){

    const total =
        APP.quizzes[APP.quiz.day].length;

    const earned =
        APP.quiz.score*50;

    const participant =
        registrations().find(

            x=>x.email===window.currentParticipant?.email

        );

    if(participant){

        participant.points=
            (participant.points||0)+earned;

        saveRegistration(participant);

    }

    loadWorkspace(

        "Quiz Completed",

        `

<section class="podium workspace-list">

<h1>

Quiz Finished

</h1>

<p>

Score

<b>

${APP.quiz.score}

/

${total}

</b>

</p>

<p>

Points Earned

<b>

${earned}

</b>

</p>

<br>

<button

class="primary"

id="backDashboard"

>

Return Dashboard

</button>

</section>

`

    );

    notify("Quiz Completed");

}

/* ---------------------------------------------------------
   EVENTS
--------------------------------------------------------- */

document.addEventListener("click",function(e){

    if(e.target.classList.contains("quiz-option")){

        answerQuestion(

            Number(

                e.target.dataset.answer

            )

        );

    }

    if(e.target.id==="backDashboard"){

        location.reload();

    }

});

/* ---------------------------------------------------------
   SIDEBAR
--------------------------------------------------------- */

document.addEventListener("click",function(e){

    const item =
        e.target.closest(".side-link");

    if(!item) return;

    if(

        item.textContent.includes("Challenges")

    ){

        openQuiz(APP.currentDay);

    }

});
/* ==========================================================
   ChampionshipOS
   PART 18
   Assignment Submission Engine
========================================================== */

"use strict";

/* ---------------------------------------------------------
   STORAGE
--------------------------------------------------------- */

APP.submissions = APP.submissions || [];

/* ---------------------------------------------------------
   LOAD SUBMISSIONS
--------------------------------------------------------- */

function loadSubmissions(){

    try{

        APP.submissions = JSON.parse(

            localStorage.getItem(

                "championship-submissions"

            ) || "[]"

        );

    }

    catch{

        APP.submissions = [];

    }

}

/* ---------------------------------------------------------
   SAVE SUBMISSIONS
--------------------------------------------------------- */

function saveSubmissions(){

    localStorage.setItem(

        "championship-submissions",

        JSON.stringify(APP.submissions)

    );

}

/* ---------------------------------------------------------
   OPEN SUBMISSION PAGE
--------------------------------------------------------- */

function openSubmissionPage(){

    const participant =

        window.currentParticipant;

    if(!participant) return;

    loadWorkspace(

        "Assignment Submission",

        `

<section class="workspace-list podium">

<p class="section-label">

DAY ${APP.currentDay}

ASSIGNMENT

</p>

<div class="field">

<label>Problem Name</label>

<input
id="assignmentTitle"
placeholder="Example : Two Sum"/>

</div>

<div class="field">

<label>GitHub Repository</label>

<input
id="githubLink"
placeholder="https://github.com/..."/>

</div>

<div class="field">

<label>Code</label>

<textarea
id="solutionCode"
placeholder="Paste Java solution here"></textarea>

</div>

<div class="field">

<label>Notes</label>

<textarea
id="solutionNotes"
placeholder="Approach / Complexity"></textarea>

</div>

<button
class="primary"
id="submitAssignment">

Submit Assignment

</button>

</section>

`

    );

}

/* ---------------------------------------------------------
   SAVE ASSIGNMENT
--------------------------------------------------------- */

function submitAssignment(){

    const participant =

        window.currentParticipant;

    if(!participant) return;

    const submission={

        email:participant.email,

        day:APP.currentDay,

        title:

        document

        .getElementById(

            "assignmentTitle"

        ).value.trim(),

        github:

        document

        .getElementById(

            "githubLink"

        ).value.trim(),

        code:

        document

        .getElementById(

            "solutionCode"

        ).value,

        notes:

        document

        .getElementById(

            "solutionNotes"

        ).value,

        submittedAt:

        new Date()

        .toLocaleString("en-IN")

    };

    APP.submissions =

    APP.submissions.filter(

        item=>

        !(

            item.email===submission.email &&

            item.day===submission.day

        )

    );

    APP.submissions.push(submission);

    saveSubmissions();

    notify(

        "Assignment Submitted Successfully"

    );

}

/* ---------------------------------------------------------
   MY SUBMISSIONS
--------------------------------------------------------- */

function openMySubmissions(){

    loadSubmissions();

    const participant =

        window.currentParticipant;

    const mine=

        APP.submissions.filter(

            x=>

            x.email===participant.email

        );

    loadWorkspace(

        "My Submissions",

        `

<div id="submissionList"></div>

`

    );

    const list=

    document.getElementById(

        "submissionList"

    );

    if(!mine.length){

        list.innerHTML=`

<p>

No assignments submitted yet.

</p>

`;

        return;

    }

    mine.forEach(item=>{

        list.insertAdjacentHTML(

            "beforeend",

            `

<section class="podium workspace-list">

<p class="section-label">

DAY ${item.day}

</p>

<h3>

${item.title}

</h3>

<p>

<b>GitHub</b>

<br>

${item.github || "-"}

</p>

<p>

<b>Submitted</b>

<br>

${item.submittedAt}

</p>

</section>

`

        );

    });

}

/* ---------------------------------------------------------
   EVENTS
--------------------------------------------------------- */

document.addEventListener(

    "click",

    function(e){

        if(

            e.target.id===

            "submitAssignment"

        ){

            submitAssignment();

        }

    }

);

/* ---------------------------------------------------------
   SIDEBAR
--------------------------------------------------------- */

document.addEventListener(

    "click",

    function(e){

        const btn=

        e.target.closest(

            ".side-link"

        );

        if(!btn) return;

        if(

            btn.textContent.includes(

                "Resources"

            )

        ){

            openSubmissionPage();

        }

    }

);

/* ---------------------------------------------------------
   INITIALIZE
--------------------------------------------------------- */

loadSubmissions();
/* ==========================================================
   ChampionshipOS
   PART 19
   Resources Library
========================================================== */

"use strict";

/* ---------------------------------------------------------
   RESOURCE DATABASE
--------------------------------------------------------- */

APP.resources = [

{
    id:1,
    category:"Java",
    title:"Java Basics Notes",
    type:"PDF",
    link:"#"
},

{
    id:2,
    category:"Arrays",
    title:"Array Cheat Sheet",
    type:"PDF",
    link:"#"
},

{
    id:3,
    category:"Strings",
    title:"String Programs",
    type:"PDF",
    link:"#"
},

{
    id:4,
    category:"Searching",
    title:"Linear vs Binary Search",
    type:"PDF",
    link:"#"
},

{
    id:5,
    category:"Sorting",
    title:"Sorting Algorithms",
    type:"PDF",
    link:"#"
},

{
    id:6,
    category:"DSA",
    title:"100 Coding Problems",
    type:"PDF",
    link:"#"
},

{
    id:7,
    category:"Projects",
    title:"Java Mini Projects",
    type:"ZIP",
    link:"#"
},

{
    id:8,
    category:"Interview",
    title:"Top Interview Questions",
    type:"PDF",
    link:"#"
}

];

/* ---------------------------------------------------------
   PERSONAL NOTES
--------------------------------------------------------- */

function loadNotes(){

    return localStorage.getItem(

        "championship-notes"

    ) || "";

}

function saveNotes(text){

    localStorage.setItem(

        "championship-notes",

        text

    );

}

/* ---------------------------------------------------------
   OPEN RESOURCE LIBRARY
--------------------------------------------------------- */

function openResources(){

    loadWorkspace(

        "Learning Resources",

        `

<div class="participant-summary">

<div>

<small>

TOTAL RESOURCES

</small>

<b>

${APP.resources.length}

</b>

</div>

<div>

<small>

CATEGORY

</small>

<b>

JAVA + DSA

</b>

</div>

<div>

<small>

ACCESS

</small>

<b>

UNLIMITED

</b>

</div>

</div>

<div id="resourceList">

</div>

<br>

<section class="podium workspace-list">

<p class="section-label">

My Notes

</p>

<textarea

id="personalNotes"

placeholder="Write your revision notes here..."

>

${loadNotes()}

</textarea>

<br><br>

<button

class="primary"

id="saveNotes"

>

Save Notes

</button>

</section>

`

    );

    renderResources();

}

/* ---------------------------------------------------------
   RESOURCE LIST
--------------------------------------------------------- */

function renderResources(){

    const list =

    document.getElementById(

        "resourceList"

    );

    if(!list) return;

    list.innerHTML="";

    APP.resources.forEach(resource=>{

        list.insertAdjacentHTML(

            "beforeend",

            `

<section class="podium workspace-list">

<p class="section-label">

${resource.category}

</p>

<h3>

${resource.title}

</h3>

<p>

Type :

<b>

${resource.type}

</b>

</p>

<br>

<button

class="light-btn resource-download"

data-id="${resource.id}"

>

Open Resource

</button>

</section>

`

        );

    });

}

/* ---------------------------------------------------------
   DOWNLOAD RESOURCE
--------------------------------------------------------- */

function downloadResource(id){

    const resource =

    APP.resources.find(

        item=>item.id===id

    );

    if(!resource) return;

    notify(

        resource.title +

        " opened."

    );

    if(

        resource.link &&

        resource.link !== "#"

    ){

        window.open(

            resource.link,

            "_blank"

        );

    }

}

/* ---------------------------------------------------------
   SAVE NOTES
--------------------------------------------------------- */

document.addEventListener(

    "click",

    function(e){

        if(

            e.target.id===

            "saveNotes"

        ){

            saveNotes(

                document

                .getElementById(

                    "personalNotes"

                ).value

            );

            notify(

                "Notes Saved"

            );

        }

        if(

            e.target.classList.contains(

                "resource-download"

            )

        ){

            downloadResource(

                Number(

                    e.target.dataset.id

                )

            );

        }

    }

);

/* ---------------------------------------------------------
   SIDEBAR ROUTING
--------------------------------------------------------- */

document.addEventListener(

    "click",

    function(e){

        const item=

        e.target.closest(

            ".side-link"

        );

        if(!item) return;

        if(

            item.textContent.includes(

                "Resources"

            )

        ){

            openResources();

        }

    }

);