import { Outlet } from "react-router-dom";
import Footer from "../pages/shared/Footer";
import Nav from "../pages/shared/Nav";

const App = () => {
  return (
    <>
      <Nav></Nav>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default App;