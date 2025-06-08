import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer/index";
import Navigation from "../components/Navigation";
import ChatBot from "../components/ChatBot";

const UserLayout = () => {
  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-10 bg-white max-h-[125px]">
        <Header />
        <Navigation></Navigation>
      </div>
      <main className="mt-[125px]"><Outlet /></main>
      <Footer />
      <ChatBot />

    </>
  );
};

export default UserLayout;
