import { useQuery } from '@tanstack/react-query';
import generalService from '../api/generalService';
import { normalizeArrayResponse } from '../utils/dataNormalization';

/**
 * SECTION: API FETCHERS
 */
export const getTestimonials = async (params = {}) => {
    const response = await generalService.getAllTestimonials(params);
    return normalizeArrayResponse(response.data, 'testimonials');
};

/**
 * Hook for fetching and managing testimonials data.
 * Return shape: { data, totalTestimonials, loading, error, refresh } — identical to the old hook.
 */
export const useTestimonials = (params) => {
    const { data, isLoading: loading, error, refetch: refresh } = useQuery({
        queryKey: ['testimonials', params],
        queryFn: async () => {
            const result = await getTestimonials(params);
            const activeItems = (Array.isArray(result) ? result : []).filter(
                (item) => item.status === 'Active'
            );
            return activeItems;
        },
    });

    return {
        data: data ?? [],
        loading,
        error,
        refresh,
    };
};

export default useTestimonials;
