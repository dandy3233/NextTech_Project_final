import { useQuery } from '@tanstack/react-query';
import generalService from '../api/generalService';
import { normalizeArrayResponse } from '../utils/dataNormalization';

/**
 * SECTION: API FETCHERS
 */
export const getTeams = async (params = {}) => {
    const response = await generalService.getAllTeams(params);
    return normalizeArrayResponse(response.data, 'teams');
};

/**
 * Hook for fetching and managing team data.
 * Return shape: { data, loading, error, refresh } — identical to the old hook.
 */
export const useTeams = (params) => {
    const { data = [], isLoading: loading, error, refetch: refresh } = useQuery({
        queryKey: ['teams', params],
        queryFn: () => getTeams(params),
        select: (result) => (Array.isArray(result) ? result : []),
    });

    return { data, loading, error, refresh };
};

export default useTeams;
