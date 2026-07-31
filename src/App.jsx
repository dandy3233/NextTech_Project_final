import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
// import axios from "axios";
import generalService from "./api/generalService";


import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Portfolio from "./pages/Portfolio";
import PortfolioDetail from "./pages/PortfolioDetail";
import ServiceDetails from "./pages/ServiceDetail";
import ServicesPage from "./pages/Service";
import Gallery from "./pages/Gallery";
import Certificates from "./pages/Certificates";
import CertificateDetail from "./pages/CertificateDetail";
import BlogDetail from "./pages/NewsDetail";
import News from "./pages/News";
import PageNotFound from "./pages/PageNotFound";
import ServerError from "./pages/ServerError";
import Contact from "./pages/Contacts";





import FingerprintJS from '@fingerprintjs/fingerprintjs';

function App() {

  useEffect(() => {
    const countVisitor = async () => {
      try {
        // Initialize FingerprintJS
        const fpPromise = FingerprintJS.load();
        const fp = await fpPromise;

        // Get the visitor identifier
        const result = await fp.get();
        const visitorId = result.visitorId;

        // Optionally still save/load from localStorage for speed, 
        // but the Fingerprint ID will be the same across browsers.
        localStorage.setItem("visitorId", visitorId);

        await generalService.recordVisit({ visitorId });
      } catch (error) {
        console.log("Visitor count error:", error);
      }
    };

    countVisitor();
  }, []);
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<AppLayout />}>
          {/* <Route index element={<Navigate replace to="/" />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="aboutus" element={<AboutUs />} />

          <Route path="portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<PortfolioDetail />} />

          <Route path="Service" element={<ServicesPage />} />
          <Route path="/service/:id" element={<ServiceDetails />} />

          <Route path="gallery" element={<Gallery />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="/certificate/:id" element={<CertificateDetail />} />
          <Route path="/news/:id" element={<BlogDetail />} />
          <Route path="news" element={<News />} />
          <Route path="contacts" element={<Contact />} />
        </Route>


        <Route path="*" element={<PageNotFound />} />
        <Route path="/server-error" element={<ServerError />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;