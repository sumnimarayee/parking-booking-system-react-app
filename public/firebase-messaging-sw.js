importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAoL8sTBMTeMo1vBO5mhKoH4fOneCFaUAQ",
  authDomain: "parking-booking-system-c13d6.firebaseapp.com",
  projectId: "parking-booking-system-c13d6",
  storageBucket: "parking-booking-system-c13d6.appspot.com",
  messagingSenderId: "549378013589",
  appId: "1:549378013589:web:f4f6633b63dd04fcbe9e9c",
  measurementId: "G-S1XWBYS4QE",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // console.log(
  //   "[firebase-messaging-sw.js] Received background message ",
  //   payload
  // );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
