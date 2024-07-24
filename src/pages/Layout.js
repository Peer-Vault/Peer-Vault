
import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <div style={{marginTop : "50px",}}> 
      <Outlet /> 
    </div>
  );
};

export default Layout;
