/* ==========================================================
   ChampionshipOS v3
   Authentication Modal
========================================================== */

"use strict";

const MODAL_ID = "championshipAuthModal";

const Modal = {

    create() {

        if (document.getElementById(MODAL_ID)) {

            return;

        }

        const modal = document.createElement("div");

        modal.id = MODAL_ID;

        modal.className = "auth-modal";

        modal.style.display = "none";

        modal.innerHTML = `

<div class="auth-overlay">

<div class="auth-card">

<button
class="auth-close"
id="authCloseButton"
>

&times;

</button>

<div class="auth-logo">

🏆

</div>

<h2>

Welcome to ChampionshipOS

</h2>

<p>

India's Most Comprehensive Java DSA Championship

</p>

<button
id="googleSignInButton"
class="btn-primary auth-google-button"
>

Continue with Google

</button>

<p class="auth-footer">

Secure authentication powered by Google

</p>

</div>

</div>

`;

        document.body.appendChild(modal);

        this.bindEvents();

    },

    bindEvents() {

    document
        .getElementById("authCloseButton")
        .addEventListener("click", () => {

            this.close();

        });

    const googleButton = document.getElementById("googleSignInButton");

    if (googleButton) {

        import("./google.js").then(({ default: Google }) => {

            googleButton.addEventListener("click", () => {

                Google.signIn();

            });

        });

    }

},
    /* ======================================================
       OPEN MODAL
    ====================================================== */

    open() {

        this.create();

        const modal = document.getElementById(MODAL_ID);

        modal.style.display = "flex";

        requestAnimationFrame(() => {

            modal.classList.add("active");

        });

    },

    /* ======================================================
       CLOSE MODAL
    ====================================================== */

    close() {

        const modal = document.getElementById(MODAL_ID);

        if (!modal) return;

        modal.classList.remove("active");

        setTimeout(() => {

            modal.style.display = "none";

        },200);

    },

    /* ======================================================
       INITIALIZE
    ====================================================== */

    init(){

        document.addEventListener(

            "keydown",

            event=>{

                if(event.key==="Escape"){

                    this.close();

                }

            }

        );

    }

};

Modal.init();

export default Modal;
