import PropTypes from "prop-types";
import { useCounters } from "../../hooks/useCounterHooks";
import { FaChartLine, FaBriefcase, FaAward } from 'react-icons/fa';
import { HiMiniUserGroup } from "react-icons/hi2";
import LoadingSpinner from "../LoadingSpinner";

const iconMap = {
  'HiMiniUserGroup': HiMiniUserGroup,
  'FaChartLine': FaChartLine,
  'FaBriefcase': FaBriefcase,
  'FaAward': FaAward,
};

const StatCard = ({ item }) => {
  const Icon = iconMap[item.icon] || HiMiniUserGroup;
  return (
    <div className="bg-white p-8 lg:p-9  shadow-md flex items-center gap-6  min-h-[100px] lg:min-h-[10px]  justify-start sm:justify-center w-[20rem] sm:w-[33rem] md:w-[21rem] lg:w-[14rem] lg:h-[8rem] xl:w-[21rem] xl:justify-start xl:min-h-[10rem]">

      <div className="text-6xl lg:text-[40px] text-primary flex-shrink-0 xl:text-6xl">
        <Icon />
      </div>

      <div>
        <div className="flex items-start text-3xl lg:text-xl  font-extrabold text-[#0B162C] leading-none xl:text-[2.5rem]">
          {item.value}
          <span className="text-primary text-xl lg:text-2xl font-bold ml-1 -mt-1">+</span>
        </div>
        <p className="text-[#4A5568] font-medium mt-2 text-base lg:text-[17px] leading-tight">
          {item.name}
        </p>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    icon: PropTypes.string,
  }).isRequired,
};

const CounterComponent = () => {
  const { data: statsData, loading, error } = useCounters();

  if (loading && (!statsData || statsData.length === 0)) {
    return <LoadingSpinner text="Loading Counters..." />;
  }

  return (
    <section className="py-8 lg:py-10 bg-white shadow-2xl">
      <div className="max-w-[1692px] mx-auto px-6 lg:px-10 ">

        {error && (
          <div className="text-center text-red-500 bg-red-50 p-4 rounded-lg max-w-xl mx-auto mb-4 font-semibold shadow-sm">
            {error?.response?.data?.message || error?.message || String(error)}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-9 ">
          {Array.isArray(statsData) && statsData.length > 0 ? (
            statsData.map((stat) => {
              const mappedStat = {
                ...stat,
                value: String(stat.value),
                icon: (
                  stat.name === 'Clients' ? 'HiMiniUserGroup' :
                  stat.name === 'Experiences' ? 'FaChartLine' :
                  stat.name === 'Projects' ? 'FaBriefcase' :
                  stat.name === 'Awards' ? 'FaAward' : 'HiMiniUserGroup'
                ),
              };
              return <StatCard key={stat._id} item={mappedStat} />;
            })
          ) : !error && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
              <h3 className="text-2xl font-semibold mb-2">No Counters Found</h3>
              <p>Check back later for new updates.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CounterComponent;