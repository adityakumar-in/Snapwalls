import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAls6YNcAlW54zldtQUUYq-Ki7n6uhUWTI",
    authDomain: "snapwalls-wallpaper.firebaseapp.com",
    projectId: "snapwalls-wallpaper",
    storageBucket: "snapwalls-wallpaper.appspot.com",
    messagingSenderId: "305754642684",
    appId: "1:305754642684:web:98fe3d7ca9e0ac8eb6df79",
    measurementId: "G-LXQEEM6577"
  };

let app;
let auth;
let googleProvider;
let githubProvider;

if (typeof window !== "undefined" && !getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  githubProvider = new GithubAuthProvider();
}

export { app, auth, googleProvider, githubProvider };