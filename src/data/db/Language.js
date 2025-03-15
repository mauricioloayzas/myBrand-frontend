import { db } from "../../firebase";
import { collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";

export async function OneLanguage(languageId = null){
  let docData = null; console.log(languageId);
  const appId = process.env.REACT_APP_APP_IDENTIFIER;

  try {
    const docRef = doc(db, "languages", languageId.toString());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      docData = docSnap.data();
    }else{
      console.log("No document found with languageId:", languageId);
    }
  }catch (error) {
    console.error("Error fetching Firestore document:", error);
  }

  return docData;
}