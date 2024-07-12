import admin from "./admin";

// const db = admin.firestore();

export async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log("ERR", error);
    return res.status(403).send("Invalid or expired token");
  }
}

// export async function checkAuthenticityWithHome(req, res, next) {
//   const home = db
//     .collection("home")
//     .doc(req.homeID)
//     .get()
//     .then((snapshot) => ({ id: snapshot.id, ...snapshot.data() }));

//   if ((await getHomeList(user)).indexOf(home) === -1)
//     throw new Error("Unauthorized");
// }
