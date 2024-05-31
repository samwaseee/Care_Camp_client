import { Outlet } from "react-router-dom";
import Footer from "./pages/home/shared/Footer";
import Nav from "./pages/home/shared/Nav";

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