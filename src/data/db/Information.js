import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function Information(){
  let docData = null;
  const appId = process.env.REACT_APP_APP_IDENTIFIER;

  try {
    const storedData = localStorage.getItem("Informations_"+appId);
    if (storedData) {
      docData = JSON.parse(storedData);
    }else{
      const informationsRef = collection(
        db,
        "Apps/"+appId+"/Informations"
      );
      const querySnapshot = await getDocs(informationsRef);
      if (!querySnapshot.empty) {
        docData = querySnapshot.docs[0].data();
        localStorage.setItem(`Informations_${appId}`, JSON.stringify(docData));
      }else{
        console.log("No document found with app_id:", appId);
      }
    }
  }catch (error) {
    console.error("Error fetching Firestore document:", error);
  }

  return docData;
}