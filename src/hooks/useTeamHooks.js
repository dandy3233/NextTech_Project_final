import { useQuery } from '@tanstack/react-query';
import generalService from '../api/generalService';
import { normalizeArrayResponse, fixObjectMedia } from '../utils/dataNormalization';

/**
 * SECTION: API FETCHERS
 */
export const getTeams = async (params = {}) => {
    const response = await generalService.getAllTeams(params);
    return normalizeArrayResponse(response.data, 'teams');
};

export const getTeamById = async (id) => {
    const response = await generalService.getSingleTeam(id);
    const item = response.data?.data?.team || response.data?.team;
    return item ? fixObjectMedia(item) : null;
};

/**
 * Hook for fetching and managing teams data.
 */
export const useTeams = (params) => {
    const { data = [], isLoading: loading, error, refetch: refresh } = useQuery({
        queryKey: ['teams', params],
        queryFn: () => getTeams(params),
        select: (result) =>
            (Array.isArray(result) ? result : []).filter(
                (item) => item.status === 'Active'
            ),
    });

    return { data, loading, error, refresh };
};

/**
 * Hook for fetching single team member detail.
 */
export const useTeamDetail = (id) => {
    const { data = null, isLoading: loading, error, refetch: refresh } = useQuery({
        queryKey: ['team', id],
        queryFn: () => getTeamById(id),
        enabled: !!id && id !== 'undefined',
    });

    return { data, loading, error, refresh };
};

export const useTeam = useTeamDetail;

export default useTeams;
