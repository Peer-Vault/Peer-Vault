import React, { useEffect } from "react";
import Home from "./Home";
import HomeLayout from "../../pages/HomeLayout"; 
import Features2 from "./Features2";
import Features3 from "./Features3";  

const Welcome = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <HomeLayout>
        <Home /> 
        <Features3 />  
        <Features2 />
      </HomeLayout>
    </div>
  );
};

export default Welcome;
