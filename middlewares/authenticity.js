const admin = require("../firebase");

// FIRESTORE INSTANCE
const db = admin.firestore();

async function checkAuthenticityWithHome(req, res, next) {
  let homeUserList = [];
  await db
    .collection("family")
    .where("home", "==", req.params.id)
    .get()
    .then((snapshot) =>
      snapshot.forEach((doc) => homeUserList.push(doc.data().user))
    );

  if (homeUserList.indexOf(req.user.email) === -1)
    return res.status(401).json({ message: "Unauthorized" });

  next();
}

async function checkAuthenticityWithData(req, res, next) {
  const homeID = await db
    .collection("clock")
    .doc(req.params.id)
    .get()
    .then((snapshot) => snapshot.data().home);

  let homeUserList = [];
  await db
    .collection("family")
    .where("home", "==", homeID)
    .get()
    .then((snapshot) =>
      snapshot.forEach((doc) => homeUserList.push(doc.data().user))
    );

  if (homeUserList.indexOf(req.user.email) === -1)
    return res.status(401).json({ message: "Unauthorized" });

  next();
}

async function checkAuthenticityWithFamily(req, res, next) {
  const homeID = await db
    .collection("family")
    .doc(req.params.id)
    .get()
    .then((snapshot) => snapshot.data().home);

  let homeUserList = [];
  await db
    .collection("family")
    .where("home", "==", homeID)
    .get()
    .then((snapshot) =>
      snapshot.forEach((doc) => homeUserList.push(doc.data().user))
    );

  if (homeUserList.indexOf(req.user.email) === -1)
    return res.status(401).json({ message: "Unauthorized" });

  next();
}

module.exports = {
  checkAuthenticityWithHome,
  checkAuthenticityWithData,
  checkAuthenticityWithFamily,
};
