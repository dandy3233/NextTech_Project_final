import { useParams } from "react-router-dom";
import Faq from "../Faq Page/Faq";
import { useService, useServices } from "../../hooks/useServiceHooks";
import NotFoundMessage from "../NotFoundMessage";
import LoadingSpinner from "../LoadingSpinner";
import ServiceHeroImage from "./ServiceHeroImage";
import ServiceContentBody from "./ServiceContentBody";
import ServiceImageSlider from "./ServiceImageSlider";
import ServiceSidebar from "./ServiceSidebar";

export default function ServiceDetail() {
  const { id } = useParams();
  const { data: service, loading, error } = useService(id);
  const { data: services = [] } = useServices();

  if (loading) {
    return <LoadingSpinner text="Loading Service Details..." />;
  }

  if (error || !service) {
    return <NotFoundMessage itemType="Service" backPath="/Service" />;
  }

  return (
    <section className="py-12 xs:py-16 md:py-20 lg:py-24 bg-white">
      <div className="font-sans mx-auto px-5 xs:px-6 sm:px-10 md:px-14 lg:px-14 xl:px-20 2xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-2 xl:gap-0">

          {/* ================= LEFT CONTENT (Main) ================= */}
          <div className="lg:col-span-2 space-y-8 md:space-y-10 ml-0 lg:ml-8 xl:ml-8">
            <ServiceHeroImage src={service.imageCover} title={service.title} />
            <ServiceContentBody service={service} />
            <ServiceImageSlider images={service.images} headLine={service.headLine} />
          </div>

          {/* ================= RIGHT SIDEBAR ================= */}
          <ServiceSidebar services={services} activeId={id} />

        </div>
      </div>
      <div className="md:mt-10">
        <Faq />
      </div>
    </section>
  );
}