const admin = require("./admin");
const moment = require("moment");

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
  return (
    await (await db.collection("family").add({ home, user })).get()
  ).data();
}

async function removeFamily(familyID) {
  await db.collection("family").doc(familyID).delete();
}

// HOME FUNCTIONS
async function getHomeList(user) {
  const familyList = await getFamilyListWithUser(user);

  const homeRefs = familyList.map((family) =>
    db.collection("home").doc(family.home)
  );
  const homeSnapshot = await db.getAll(...homeRefs);
  const homeList = homeSnapshot
    .filter((home) => home.exists)
    .map((home) => ({ id: home.id, ...home.data() }));

  return homeList;
}

async function getHome(homeID) {
  const home = db
    .collection("home")
    .doc(homeID)
    .get()
    .then((snapshot) => ({ id: snapshot.id, ...snapshot.data() }));

  return home;
}

async function addHome(home, user) {
  const newHome = await db.collection("home").add(home);
  await addFamily(newHome.id, user);
  await addSettings(newHome.id, {
    autoClockEnd: "",
    autoClockStart: "",
    autoDailyClock: [],
  });

  return (await newHome.get()).data();
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

  // REMOVE SETTINGS
  await removeSettings(homeID);

  // REMOVE ALL DATA
  (await getData(homeID)).forEach(async (data) => await removeData(data.id));

  // REMOVE HOME
  await db.collection("home").doc(homeID).delete();
}

// SETTINGS FUNCTIONS
async function getSettings(homeID) {
  let settings = {};

  await db
    .collection("homeSettings")
    .where("home", "==", homeID)
    .get()
    .then((snapshot) =>
      snapshot.forEach((s) => {
        settings = { id: s.id, ...s.data() };
      })
    );

  return settings;
}

async function addSettings(homeID, data) {
  if (!!(await getSettings(homeID))) throw new Error("Settings already exists");

  const settings = await db
    .collection("homeSettings")
    .add({ home: homeID, ...data });
  return (await settings.get()).data();
}

async function setSettings(homeID, data) {
  const settings = await db
    .collection("homeSettings")
    .where("home", "==", homeID)
    .get();

  const batch = db.batch();
  settings.forEach((s) => batch.update(s.ref, { home: homeID, ...data }));
  await batch.commit();
}

async function removeSettings(homeID) {
  const settings = await db
    .collection("homeSettings")
    .where("home", "==", homeID)
    .get();
  const batch = db.batch();
  settings.forEach((s) => batch.delete(s.ref));
  await batch.commit();
}

// DATA FUNCTIONS
async function getData(homeID, filterDate = []) {
  let allData = [];

  if (filterDate.length === 0) {
    // ALL DATA
    await db
      .collection("clock")
      .where("home", "==", homeID)
      .orderBy("clockIn")
      .get()
      .then((snapshot) => {
        snapshot.forEach((data) =>
          allData.push({
            id: data.id,
            clockIn: new Date(data.data().clockIn.seconds * 1000),
            clockOut: new Date(data.data().clockOut.seconds * 1000),
            home: data.data().home,
            notes: data.data().notes,
          })
        );
      });
  } else {
    // FILTER BY DATE
    const dateGreater = moment(filterDate[0]).hour(0).minute(0).toDate();
    const dateLesser = moment(filterDate[filterDate.length - 1])
      .hour(23)
      .minute(59)
      .toDate();

    db.collection("clock")
      .where("home", "==", homeID)
      .where("clockIn", ">=", dateGreater)
      .where("clockOut", "<=", dateLesser)
      .orderBy("clockIn")
      .get()
      .then((snapshot) =>
        snapshot.forEach((data) =>
          allData.push({
            id: data.id,
            clockIn: new Date(data.data().clockIn.seconds * 1000),
            clockOut: new Date(data.data().clockOut.seconds * 1000),
            home: data.data().home,
            notes: data.data().notes,
          })
        )
      );
  }

  return allData;
}

async function getDataWithID(dataID) {
  return (await db.collection("clock").doc(dataID).get()).data();
}

async function dataExists(homeID, date) {
  try {
    const dateGreater = moment(date).hour(0).minute(0).toDate();
    const dateLesser = moment(date).hour(23).minute(59).toDate();

    const clockData = await db
      .collection("clock")
      .where("home", "==", homeID)
      .where("clockIn", ">=", dateGreater)
      .where("clockOut", "<=", dateLesser)
      .get();

    return clockData.empty;
  } catch (error) {
    console.log("ERROR", error);
  }

  return false;
}

async function setData(data) {
  if (await dataExists(data.home, data.clockIn)) {
    throw new Error("The log for that day already exists");
  }

  const newData = await db.collection("clock").add(data);
  return (await newData.get()).data();
}

async function updateData(dataID, data) {
  await db.collection("clock").doc(dataID).update(data);
}

async function removeData(dataID) {
  await db.collection("clock").doc(dataID).delete();
}

module.exports = {
  // FAMILY
  getFamilyList,
  getFamilyListWithUser,
  addFamily,
  removeFamily,

  // HOME
  getHomeList,
  getHome,
  addHome,
  setHome,
  removeHome,

  // SETTINGS
  getSettings,
  setSettings,
  addSettings,
  removeSettings,

  // DATA
  getData,
  getDataWithID,
  dataExists,
  setData,
  updateData,
  removeData,
};
