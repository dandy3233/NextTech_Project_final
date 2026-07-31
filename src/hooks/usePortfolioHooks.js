import { useQuery } from '@tanstack/react-query';
import generalService from '../api/generalService';
import { normalizeArrayResponse, fixObjectMedia } from '../utils/dataNormalization';

/**
 * SECTION: API FETCHERS
 */
export const getPortfolio = async (params = {}) => {
    const response = await generalService.getAllPortfolio(params);
    return normalizeArrayResponse(response.data, 'portfolios');
};

export const getPortfolioById = async (id) => {
    const response = await generalService.getSinglePortfolio(id);
    const item = response.data?.data?.portfolio || response.data?.portfolio;
    if (!item) return null;

    const normalized = fixObjectMedia(item);

    // Ensure `requirement` is always an array of individual strings
    if (typeof normalized.requirement === 'string') {
        // Split by ", " (comma + space) to avoid breaking numbers like 1,200+
        normalized.requirement = normalized.requirement
            .split(', ')
            .map((s) => s.trim())
            .filter(Boolean);
    } else if (Array.isArray(normalized.requirement)) {
        // Array with a single comma-joined string (e.g. ["req1, req2, req3"])
        if (
            normalized.requirement.length === 1 &&
            typeof normalized.requirement[0] === 'string' &&
            normalized.requirement[0].includes(', ')
        ) {
            normalized.requirement = normalized.requirement[0]
                .split(', ')
                .map((s) => s.trim())
                .filter(Boolean);
        }
    } else {
        normalized.requirement = [];
    }

    return normalized;
};


/**
 * Hook for fetching and managing portfolio list data.
 * Return shape: { data, loading, error, refresh } — identical to the old hook.
 */
export const usePortfolio = (params) => {
    const { data = [], isLoading: loading, error, refetch: refresh } = useQuery({
        queryKey: ['portfolio', params],
        queryFn: () => getPortfolio(params),
        select: (result) =>
            (Array.isArray(result) ? result : []).filter(
                (item) => item.status === 'Active'
            ),
    });

    return { data, loading, error, refresh };
};

/**
 * Hook for fetching and managing single portfolio data.
 * Return shape: { data, loading, error, refresh } — identical to the old hook.
 */
export const usePortfolioDetail = (id) => {
    const { data = null, isLoading: loading, error, refetch: refresh } = useQuery({
        queryKey: ['portfolio', id],
        queryFn: () => getPortfolioById(id),
        enabled: !!id && id !== 'undefined',
    });

    return { data, loading, error, refresh };
};

export default usePortfolio;
