const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.UploadNationalityData = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method not Allowed");
  }

  try {
    const nationalities = req.body; // Datos enviados en el body

    if (!Array.isArray(nationalities)) {
      return res.status(400).send("We are waiting a nationalities array");
    }

    const batch = db.batch();
    const nationalitiesRef = db.collection("nationalities");

    nationalities.forEach((nationality) => {
      const nationalityRef = nationalitiesRef.doc(nationality.id);
      batch.set(nationalityRef, nationality);
    });

    await batch.commit();
    res.status(200).send("The upload was success");
  } catch (error) {
    console.error("We have an error:", error);
    res.status(500).send("We have an error " + error);
  }
});
