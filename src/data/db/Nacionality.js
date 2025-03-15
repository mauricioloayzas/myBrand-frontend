import { db } from "../../firebase";
import { collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";

export async function OneNationality(nationalityId = null){
  let docData = null; console.log(nationalityId);
  const appId = process.env.REACT_APP_APP_IDENTIFIER;

  try {
    const docRef = doc(db, "nationalities", nationalityId.toString());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      docData = docSnap.data();
    }else{
      console.log("No document found with nationalityId:", nationalityId);
    }
  }catch (error) {
    console.error("Error fetching Firestore document:", error);
  }

  return docData;
}