import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBmMGeMKJDnzvKkm8k1RADdiP2N632RfNs",
    authDomain: "p565-dms-7c33e.firebaseapp.com",
    projectId: "p565-dms-7c33e",
    storageBucket: "p565-dms-7c33e.appspot.com",
    messagingSenderId: "999209274554",
    appId: "1:999209274554:web:4b2c9db55c644587a88683",
    measurementId: "G-N1NT241D40"
  };

const app = initializeApp(firebaseConfig);
/* const auth = getAuth(app);

const signInWithGoogle = async()  => {
  const provider = await new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export {signInWithGoogle}; */
export default app;