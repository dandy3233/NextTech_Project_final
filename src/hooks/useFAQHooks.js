import { useQuery } from '@tanstack/react-query';
import generalService from '../api/generalService';
import { normalizeArrayResponse } from '../utils/dataNormalization';

/**
 * SECTION: API FETCHERS
 */
export const getFAQs = async (params = {}) => {
    const response = await generalService.getAllFAQs(params);
    return normalizeArrayResponse(response.data, 'faqs');
};

/**
 * Hook for fetching and managing FAQ data.
 * Return shape: { data, loading, error, refresh } — identical to the old hook.
 */
export const useFAQs = (params) => {
    const { data = [], isLoading: loading, error, refetch: refresh } = useQuery({
        queryKey: ['faqs', params],
        queryFn: () => getFAQs(params),
        select: (result) =>
            (Array.isArray(result) ? result : []).filter(
                (faq) => faq.status === 'published'
            ),
    });

    return { data, loading, error, refresh };
};

export default useFAQs;
