import { useState } from 'react';
import TeamCard from './TeamCard';
import useTeams from '../../hooks/useTeamHooks';
import LoadingSpinner from '../LoadingSpinner';
import Pagination from '../Pagination';

const ITEMS_PER_PAGE = 8;

const TeamMembersPage = () => {
  const { data: teamMembers = [], loading, error } = useTeams({ limit: 100, page: 1 });

  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  return (
    <div className="bg-white min-h-screen">
      {/* Main Grid Content */}
      <section className="py-16 md:py-24 lg:py-28 px-6 md:px-12 lg:px-28 bg-white">
        <div className="max-w-7xl lg:max-w-[1600px] mx-auto">
          {loading ? (
            <div className="py-12">
              <LoadingSpinner text="Loading Team Members..." />
            </div>
          ) : error && teamMembers.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-gray-800">Unable to load team members</h3>
              <p className="text-gray-500 mt-2">Please try refreshing the page.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                {currentItems.map((member) => (
                  <TeamCard key={member._id || member.id} member={member} />
                ))}
              </div>
              <Pagination
                items={teamMembers}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onDataUpdate={setCurrentItems}
              />
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default TeamMembersPage;
