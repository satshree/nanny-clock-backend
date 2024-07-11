const admin = require("./admin");

// FIRESTORE DATABASE INSTANCE
const db = admin.firestore();

// FAMILY FUNCTIONS
async function getFamilyList(homeID) {
  let familyList = [];

  await db
    .collection("family")
    .where("home", "==", homeID)
    .get()
    .then((snapshot) =>
      snapshot.forEach((doc) => familyList.push({ id: doc.id, ...doc.data() }))
    );

  return familyList;
}

async function getFamilyListWithUser(user) {
  let familyList = [];

  await db
    .collection("family")
    .where("user", "==", user.email)
    .get()
    .then((snapshot) =>
      snapshot.forEach((doc) => familyList.push({ id: doc.id, ...doc.data() }))
    );

  return familyList;
}

async function addFamily(home, user) {
  await db.collection("family").add({ home, user });
}

async function removeFamily(familyID) {
  await db.collection("family").doc(familyID).delete();
}

// HOME FUNCTIONS
async function getHomeList(user) {
  const familyList = await getFamilyList(user);

  const homeRefs = familyList.map((family) =>
    db.collection("home").doc(family.home)
  );
  const homeSnapshot = await db.getAll(...homeRefs);
  const homeList = homeSnapshot
    .filter((home) => home.exists)
    .map((home) => ({ id: home.id, ...home.data() }));

  return homeList;
}

async function addHome(home, user) {
  const newHome = await db.collection("home").add(home);
  await addFamily(newHome, user);
}

async function setHome(homeID, data) {
  await db.collection("home").doc(homeID).update(data);
}

async function removeHome(homeID) {
  // REMOVE ALL FAMILY
  (await getFamilyList(homeID)).forEach(async (family) => {
    try {
      await removeFamily(family.id);
    } catch (err) {
      console.log("ERR", err);
    }
  });

  // REMOVE ALL DATA

  // REMOVE HOME
  await db.collection("home").doc(homeID).delete();
}

module.exports = {
  // FAMILY
  getFamilyList,
  getFamilyListWithUser,
  addFamily,
  removeFamily,

  // HOME
  getHomeList,
  addHome,
  setHome,
  removeHome,
};
