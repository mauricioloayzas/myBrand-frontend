import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import Particle from "../components/Particle";
import Socialicons from "../components/Socialicons";
import Spinner from "../components/Spinner";
import { Information } from  "../data/db/Information";

function Home({ lightMode }) {
  const [information, setInformation] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const docDataInformation = await Information();
      if(docDataInformation !== null) {
        await setInformation(docDataInformation);
      }else{
        console.log("No document found: Information");
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Home - Chester React Personal Portfolio Template</title>
        <meta
          name="description"
          content="Chester React Personal Portfolio Template Homepage"
        />
      </Helmet>
      <Suspense fallback={<Spinner />}>
        <div className="mi-home-area mi-padding-section">
          <Particle lightMode={lightMode} />
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10 col-12">
                <div className="mi-home-content">
                  <h1>
                    Hi, I am{" "}
                    <span className="color-theme">{information.name}</span>
                  </h1>
                  <p>{information.about_content}</p>
                  <Socialicons bordered />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </Layout>
  );
}

export default Home;
