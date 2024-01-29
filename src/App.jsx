import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import Header from "./Header";
import HeroSection from "./HeroSection";
import TaskManeger from "./task/TaskManeger";

export default function App() {
  return (
    <div className="bg-[#191D26] font-[Inter] text-white">
      <Header />
      <HeroSection />
      <TaskManeger />
      <Footer />
      <ToastContainer />
    </div>
  );
}
