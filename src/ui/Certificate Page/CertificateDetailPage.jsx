import { useParams } from "react-router-dom";
import { useCertificate } from "../../hooks/useCertificateHooks";
import CertificateHero from "./Cert_ImageSlider";
import CertificateContent from "./Cert_Title&desc";
import CertificateInfo from "./CertInfo";
import NotFoundMessage from "../NotFoundMessage";
import { formatDate } from "../../utils/dataNormalization";
import LoadingSpinner from "../LoadingSpinner";

export default function CertificateDetailPage() {
  const { id } = useParams();
  const { data: certificate, loading, error } = useCertificate(id);

  if (!id || id === 'undefined') {
    return <NotFoundMessage itemType="Certificate" backPath="/certificates" />;
  }

  if (loading) return (
    <LoadingSpinner text="Loading certificate details..." />
  );

  if (error || !certificate) {
    return <NotFoundMessage itemType="Certificate" backPath="/certificates" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 2xl:px-7 pb-8 py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24">
      <div className=" mx-[1%] sm:mx-[5.45%]">
        {/* Hero Slider */}
        <div className="w-full lg:w-full">
          <CertificateHero
            certificateImage={certificate.certificateImage}
            certificateImages={certificate.certificateImages}
            title={certificate.certificateName}
          />
        </div>
        {/* Right Column */}
        <div className="flex flex-col lg:flex-row  justify-between gap-x-5 2xl:gap-x-10 ">
          <CertificateContent
            certificateName={certificate.certificateName}
            certificateDescription={certificate.certificateDescription}
          />
          <CertificateInfo
            certificateFrom={certificate.certificateFrom}
            project={certificate.project}
            catagory={certificate.catagory}
            IssueDate={formatDate(certificate.IssueDate)}
          />
        </div>
      </div>
    </div>
  );
}
