import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js';
import { getFirestore, collection, doc, onSnapshot, setDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDYVV-CWqRL-aKHp_lvqI6bZkI6nU8LoHw',
  authDomain: 'championship-02-2026.firebaseapp.com',
  projectId: 'championship-02-2026',
  storageBucket: 'championship-02-2026.firebasestorage.app',
  messagingSenderId: '886718852702',
  appId: '1:886718852702:web:944ee16d2c7673ee98cecf',
  measurementId: 'G-43LDXSEJGF'
};

const db = getFirestore(initializeApp(firebaseConfig));
const registrations = collection(db, 'registrations');

function safeId(email) {
  return encodeURIComponent(email.trim().toLowerCase());
}

window.championshipData = {
  async register({ name, email, team }) {
    await setDoc(doc(registrations, safeId(email)), {
      name,
      email: email.toLowerCase(),
      team: team || null,
      registeredAt: serverTimestamp()
    }, { merge: true });
    window.currentParticipant = { name, email: email.toLowerCase(), team: team || null };
  }
};

onSnapshot(registrations, snapshot => {
  window.firebaseRegistrations = snapshot.docs.map(record => ({ id: record.id, ...record.data() }));
  window.dispatchEvent(new Event('firebase-registrations'));
}, error => {
  console.error('Firestore registration feed unavailable:', error);
  window.dispatchEvent(new CustomEvent('firebase-error', { detail: error.message }));
});
