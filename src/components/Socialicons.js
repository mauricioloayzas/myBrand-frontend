import React, {useState, useEffect} from "react";
import axios from 'axios';
import LineIcon from 'react-lineicons';
import {SocialLink} from "../data/db/SocialLink";

function Socialicons(props){
  const [socialLinks, setSocialLinks] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const docDataSocialLink = await SocialLink();
      if(docDataSocialLink !== null){
        await setSocialLinks(docDataSocialLink);
      }else{
        console.log("No document found: social network");
      }
    };

    fetchData();
  }, [])

  return (
    <ul className={props.bordered ? 'mi-socialicons mi-socialicons-bordered' : 'mi-socialicons'}>
      {Array.isArray(socialLinks) && socialLinks.length > 0 ? (
        socialLinks.map((link, index) => {
          const networkName = link?.social_network?.name;

          return (
            networkName === "GitHub" || networkName === "Facebook" || networkName === "Linkedin"
            || networkName === "Instagram" || networkName === "Threads"
          ) ? (
            <li key={index}>
              <a rel="noopener noreferrer" target="_blank" href={link.url}>
                <LineIcon name={networkName.toLowerCase()} />
              </a>
            </li>
          ) : null;
        })
      ) : (
        <p>No social links available</p>
      )}
    </ul>
  );
}

export default Socialicons;
