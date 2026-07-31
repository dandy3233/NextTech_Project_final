import { useQuery } from '@tanstack/react-query';
import generalService from '../api/generalService';
import { normalizeArrayResponse } from '../utils/dataNormalization';

/**
 * SECTION: API FETCHERS
 * These are kept as standalone async functions so they can be reused
 * outside of React (e.g. prefetching, tests).
 */
export const getGallery = async (params = {}) => {
    const response = await generalService.getAllGallery(params);
    return normalizeArrayResponse(response.data, 'gallery');
};

/**
 * Hook for fetching and managing gallery data.
 * Return shape: { data, loading, error, refresh } — identical to the old hook.
 */
export const useGallery = (params) => {
    const { data = [], isLoading: loading, error, refetch: refresh } = useQuery({
        queryKey: ['gallery', params],
        queryFn: () => getGallery(params),
        select: (result) =>
            (Array.isArray(result) ? result : []).filter(
                (item) => item.status === 'Active'
            ),
    });

    return { data, loading, error, refresh };
};

export default useGallery;
