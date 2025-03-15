import { db } from "../../firebase";
import { OneSocialNetwork } from "./SocialNetwork";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function SocialLink(){
  let docData = null;
  const appId = process.env.REACT_APP_APP_IDENTIFIER;

  try {
    const storedData = localStorage.getItem("social_links_"+appId);
    if (storedData) {
      docData = JSON.parse(storedData);
    }else{
      const socialNetworksRef = collection(
        db,
        "Apps/"+appId+"/social_links"
      );
      const querySnapshot = await getDocs(socialNetworksRef);
      if (!querySnapshot.empty) {
        docData = await Promise.all(querySnapshot.docs.map(async (docRef) => {
          let data = docRef.data();

          if(data.social_network){
            data.social_network = await OneSocialNetwork(data.social_network);
          }

          return data;
        }));

        localStorage.setItem(`social_links_${appId}`, JSON.stringify(docData));
      }else{
        console.log("No document found with app_id:", appId);
      }
    }
  }catch (error) {
    console.error("Error fetching Firestore document:", error);
  }

  return docData;
}