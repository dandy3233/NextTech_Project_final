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

const StatCard = ({ item, index }) => {
  const Icon = iconMap[item.icon] || HiMiniUserGroup;
  return (
    <div className={`bg-white py-7 px-6 lg:py-8 lg:px-7 shadow-[0_10px_30px_rgba(0,0,0,0.06)] rounded-xl flex items-center gap-5 w-full h-[7.5rem] lg:h-[8.5rem] xl:h-[9rem] ${index >= 2 ? 'lg:ml-4' : ''}`}>

      <div className="text-5xl lg:text-[44px] text-primary flex-shrink-0 xl:text-5xl">
        <Icon />
      </div>

      <div>
        <div className="flex items-start text-3xl lg:text-[28px] font-extrabold text-[#0B162C] leading-none xl:text-[2.2rem]">
          {item.value}
          <span className="text-primary text-xl lg:text-2xl font-bold ml-1 -mt-1">+</span>
        </div>
        <p className="text-[#4A5568] font-medium mt-2 text-sm lg:text-base leading-tight">
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
  index: PropTypes.number,
};

const CounterComponent = () => {
  const { data: statsData, loading, error } = useCounters();

  if (loading && (!statsData || statsData.length === 0)) {
    return <LoadingSpinner text="Loading Counters..." />;
  }

  return (
    <section className="py-8 lg:py-14 px-6 lg:px-[8.75rem]  bg-white shadow-2xl">
      <div className="max-w-[1692px] mx-auto">

        {error && (
          <div className="text-center text-red-500 bg-red-50 p-4 rounded-lg max-w-xl mx-auto mb-4 font-semibold shadow-sm">
            {error?.response?.data?.message || error?.message || String(error)}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-[3.25rem]">
          {Array.isArray(statsData) && statsData.length > 0 ? (
            statsData.map((stat, index) => {
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
              return <StatCard key={stat._id} item={mappedStat} index={index} />;
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