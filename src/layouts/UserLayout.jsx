import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

const UserLayout = () => {
  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-10">
        <Header />
        <Navigation></Navigation>
      </div>
      <main><Outlet /></main>
      <Footer />
    </>
  );
};

export default UserLayout;
