const { initializeApp } = require("firebase/app");
const { getFirestore, collection } = require("firebase/firestore");
const admin = require("firebase-admin");
const path = require("path");

const serviceAccount = require(path.join(
  __dirname,
  "../firebaseServiceKey.json"
));

const firebaseConfig = {
  apiKey: "AIzaSyCNEZv6Vmtcmx9itvX49VtDEYnkiNbGQp4",
  authDomain: "etbu-924d9.firebaseapp.com",
  projectId: "etbu-924d9",
  storageBucket: "etbu-924d9.firebasestorage.app",
  messagingSenderId: "596061891892",
  appId: "1:596061891892:web:1f5eef37c3bb04f0dc8961",
  measurementId: "G-PS79FPP7DV",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: firebaseConfig.storageBucket,
});

const dbAdmin = admin.firestore();

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const todoCollection = collection(db, "todos");
const eventCollection = collection(db, "events");
const blogCollection = collection(db, "blogs");
const userCollection = collection(db, "users");

const checkDb = async (dbName) => {
  try {
    const collections = await dbAdmin.listCollections();
    // console.log(
    //   "Existing Collections:",
    //   collections.map((col) => col.id)
    // );
    return collections.some((col) => col.id === dbName);
  } catch (error) {
    console.error("Error checking collection existence:", error);
    return false;
  }
};

module.exports = {
  app,
  db,
  dbAdmin,
  todoCollection,
  eventCollection,
  blogCollection,
  userCollection,
  checkDb,
};
