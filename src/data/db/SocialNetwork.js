import { db } from "../../firebase";
import { collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";

export async function OneSocialNetwork(socialNetworkId = null){
  let docData = null;
  const appId = process.env.REACT_APP_APP_IDENTIFIER;

  try {
    const docRef = doc(db, "social_networks", socialNetworkId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      docData = docSnap.data();
    }else{
      console.log("No document found with socialNetworkId:", socialNetworkId);
    }
  }catch (error) {
    console.error("Error fetching Firestore document:", error);
  }

  return docData;
}