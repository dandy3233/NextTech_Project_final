import { useParams } from "react-router-dom";
import { usePortfolioDetail } from "../../hooks/usePortfolioHooks";
import NotFoundMessage from "../NotFoundMessage";
import LoadingSpinner from "../LoadingSpinner";
import PortfolioHero from "./PortfolioHero";
import PortfolioDescriptionBlocks from "./PortfolioDescriptionBlocks";
import PortfolioMetaBar from "./PortfolioMetaBar";
import PortfolioGallerySlider from "./PortfolioGallerySlider";
import PortfolioRequirements from "./PortfolioRequirements";
import PortfolioResults from "./PortfolioResults";

export default function PortfolioDetail() {
  const { id } = useParams();
  const { data: project, loading, error } = usePortfolioDetail(id);

  if (loading) {
    return <LoadingSpinner text="Loading Portfolio Details..." />;
  }

  if (error || !project) {
    return <NotFoundMessage itemType="Portfolio" backPath="/portfolio" />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 xs:px-5 sm:px-6 md:px-10 lg:ml-6 xl:ml-0 lg:px-16 xl:px-20 2xl:px-28 py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20">

        <PortfolioHero src={project.thumbinal} alt={project.title} />

        <PortfolioDescriptionBlocks project={project} />

        <PortfolioMetaBar
          client={project.client}
          happingDate={project.happingDate}
          sector={project.sector}
          category={project.catagory}
        />

        <PortfolioGallerySlider images={project.images} />

        <PortfolioRequirements requirements={project.requirement} />

        <PortfolioResults
          results={[project.resultOne, project.resultTwo, project.resultThere]}
        />

      </div>
    </div>
  );
}