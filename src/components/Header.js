import axios from "axios";
import React, { useEffect, useState } from "react";
import LineIcon from "react-lineicons";
import { Link, NavLink } from "react-router-dom";
import { Image } from "./common/Image";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function Header() {
  const [information, setInformation] = useState("");
  const [navigationToggler, setNavigationToggler] = useState(false);
  const appId = process.env.REACT_APP_APP_IDENTIFIER;

  const handleNavigationToggler = () => {
    setNavigationToggler(!navigationToggler);
  };

  useEffect(() => {
    //axios.get("/api/information").then((response) => {
      //setInformation(response.data);
    //});

    const fetchData = async () => {
      try {
        const informationsRef = collection(
            db,
            "Apps/"+appId+"/Informations"
        );
        const querySnapshot = await getDocs(informationsRef);

        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data(); // Get the first matching document
          setInformation(docData);
        } else {
          console.log("Apps/"+appId+"/Informations");
          console.log("No document found with app_id:", appId);
        }
      } catch (error) {
        console.error("appIdentifier:", appId);
        console.error("Error fetching Firestore document:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <nav className={navigationToggler ? "mi-header is-visible" : "mi-header"}>
      <button onClick={handleNavigationToggler} className="mi-header-toggler">
        {!navigationToggler ? (
          <LineIcon name="menu" />
        ) : (
          <LineIcon name="close" />
        )}
      </button>
      <div className="mi-header-inner">
        <div className="mi-header-image">
          <Link to="/">
            <Image
              src={information.brand_image}
              placeholder="/images/about-image-placeholder.png"
              alt="brandimage"
            />
          </Link>
        </div>

        <ul className="mi-header-menu">
          <li>
            <NavLink to="/" end>
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/about">
              <span>About</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/resume">
              <span>Resume</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/portfolios">
              <span>Portfolios</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/blogs">
              <span>Blogs</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact">
              <span>Contact</span>
            </NavLink>
          </li>
        </ul>
        <p className="mi-header-copyright">
          &copy; {new Date().getFullYear()}{" "}
          <b>
            <a
              rel="noopener noreferrer"
              href="#"
            >
              Mauloasan.
            </a>
          </b>
        </p>
      </div>
    </nav>
  );
}

export default Header;
