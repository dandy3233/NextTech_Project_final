import { useQuery } from '@tanstack/react-query';
import generalService from '../api/generalService';
import { normalizeArrayResponse } from '../utils/dataNormalization';

/**
 * SECTION: API FETCHERS
 */
export const getCounters = async (params = {}) => {
    const response = await generalService.getAllCounters(params);
    return normalizeArrayResponse(response.data, 'counters');
};

/**
 * Hook for fetching and managing counters data.
 * Return shape: { data, loading, error, refresh } — identical to the old hook.
 */
export const useCounters = (params) => {
    const { data = [], isLoading: loading, error, refetch: refresh } = useQuery({
        queryKey: ['counters', params],
        queryFn: () => getCounters(params),
        select: (result) => (Array.isArray(result) ? result : []),
    });

    return { data, loading, error, refresh };
};

export default useCounters;
