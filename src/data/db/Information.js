import { db } from "../../firebase";
import { OneNationality } from "./Nacionality";
import {collection, query, where, getDocs, doc} from "firebase/firestore";
import {OneLanguage} from "./Language";

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
        //docData = querySnapshot.docs[0].data();
        docData = await Promise.all(querySnapshot.docs.map(async (docRef) => {
          let data = docRef.data();

          if(data.nationality){
            data.nationality = await OneNationality(data.nationality);
          }

          if(data.language){
            data.language = await OneLanguage(data.language);
          }

          return data;
        }));
        docData = docData[0];

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