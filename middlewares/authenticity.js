const admin = require("../firebase");
const { getHomeList } = require("../firebase/data");

const db = admin.firestore();

async function checkAuthenticityWithHome(req, res, next) {
  const home = db
    .collection("home")
    .doc(req.params.id)
    .get()
    .then((snapshot) => ({ id: snapshot.id, ...snapshot.data() }));

  if ((await getHomeList(req.user)).indexOf(home) === -1)
    throw new Error("Unauthorized");
}

module.exports = {
  checkAuthenticityWithHome,
};
