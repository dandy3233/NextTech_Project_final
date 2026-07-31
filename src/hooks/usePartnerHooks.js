import { useQuery } from '@tanstack/react-query';
import generalService from '../api/generalService';
import { normalizeArrayResponse } from '../utils/dataNormalization';

/**
 * Hook for fetching and managing partners data.
 * Return shape: { data, totalPartners, loading, error, refresh } — identical to the old hook.
 */
export const usePartners = (params) => {
    const { data, isLoading: loading, error, refetch: refresh } = useQuery({
        queryKey: ['partners', params],
        queryFn: async () => {
            const response = await generalService.getAllPartners(params);
            const result = normalizeArrayResponse(response.data, 'partners');
            const activePartners = (Array.isArray(result) ? result : []).filter(
                (item) => item.status === 'Active'
            );
            return {
                items: activePartners,
                total: Number(response.data?.totalPartners ?? 0),
            };
        },
    });

    return {
        data: data?.items ?? [],
        totalPartners: data?.total ?? 0,
        loading,
        error,
        refresh,
    };
};

export default usePartners;
