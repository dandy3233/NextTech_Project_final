import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import Button from '../Button';
import TeamCard from '../Team Page/TeamCard';
import useTeams from '../../hooks/useTeamHooks';
import { teamSectionHeaderData } from '../../data/TeamPageData';

/* ─── Executive rank order ─────────────────────────────────────────────────
   Lower index = higher priority. Matching is case-insensitive and uses
   "includes" so "Chief Executive Officer" and "CEO" both match "ceo".
──────────────────────────────────────────────────────────────────────────── */
const EXECUTIVE_RANK = [
  'ceo',        // Chief Executive Officer
  'coo',        // Chief Operating Officer
  'cfo',        // Chief Financial Officer
  'cto',        // Chief Technology Officer
  'cmo',        // Chief Marketing Officer
  'cpo',        // Chief Product Officer
  'cso',        // Chief Strategy Officer
  'chro',       // Chief Human Resources Officer
  'cio',        // Chief Information Officer
  'cdo',        // Chief Data Officer
  'president',
  'chairman',
  'founder',
  'co-founder',
  'director',
  'vice president',
  'vp',
  'manager',
];

const getRank = (specialty = '') => {
  const lower = specialty.toLowerCase();
  const idx = EXECUTIVE_RANK.findIndex((keyword) => lower.includes(keyword));
  return idx === -1 ? EXECUTIVE_RANK.length : idx;
};

const TeamSection = () => {
  const { data: teamMembers = [], loading } = useTeams({ limit: 100, page: 1 });

  /* Sort by executive rank and take the top 4 */
  const safeMembers = Array.isArray(teamMembers) ? teamMembers : [];
  const displayedMembers = [...safeMembers]
    .sort((a, b) => getRank(a.specialty) - getRank(b.specialty))
    .slice(0, 4);

  return (
    <section className="py-12 md:py-20 lg:py-24 px-6 md:px-7 lg:px-[2rem] xl:px-[7rem] 2xl:px-[6.75rem] bg-white">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-14 gap-6">
          <div className="text-left">
            <span className="text-[#00AEEF] font-semibold lg:ml-2 text-base lg:text-xl tracking-normal">
              {teamSectionHeaderData.subtitle}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-normal text-[#0B162C] mt-2 lg:mt-6 lg:ml-3 max-w-lg">
              <span className="block">
                {teamSectionHeaderData.mainHeading.split(' ').slice(0, -1).join(' ')}
              </span>
              <span className="block mt-2 lg:mt-8">
                {teamSectionHeaderData.mainHeading.split(' ').slice(-1)}
              </span>
            </h2>
          </div>

          <div className="flex-shrink-0">
            <Button
              as={Link}
              to={teamSectionHeaderData.buttonLink}
              variant="primary"
              size="lg"
              iconAfter={IoIosArrowForward}
            >
              {teamSectionHeaderData.buttonText}
            </Button>
          </div>
        </div>

        {/* Team Members Grid — Staggered layout (cols 1 & 3 high, cols 2 & 4 low) */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
            {[1, 2, 3, 4].map((n, idx) => (
              <div
                key={n}
                className={`animate-pulse flex flex-col space-y-4 ${
                  idx % 2 === 1 ? 'lg:mt-20' : 'lg:mt-0'
                }`}
              >
                <div className="bg-gray-200 aspect-[317/405] rounded-xl w-full" />
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:mt-20 lg:gap-8 xl:gap-11 px-2 xl:px-0 items-start pb-8 lg:pb-14">
            {displayedMembers.map((member, index) => (
              <div
                key={member._id || member.id || index}
                className={index % 2 === 1 ? 'lg:mt-20' : 'lg:mt-0'}
              >
                <TeamCard member={member} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;

