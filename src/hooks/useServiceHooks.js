import { useQuery } from '@tanstack/react-query';
import generalService from '../api/generalService';
import { normalizeArrayResponse, fixObjectMedia } from '../utils/dataNormalization';

/**
 * SECTION: API FETCHERS
 */
export const getServices = async (params = {}) => {
    const response = await generalService.getAllServices(params);
    const items = normalizeArrayResponse(response.data, 'services');
    // Map MongoDB's _id to id so components can always use item.id
    const mapped = items.map(item => ({ ...item, id: item._id }));
    // Filter to only show published (active) services
    return mapped.filter(item => item.status === 'active');
};

export const getServiceById = async (id) => {
    const response = await generalService.getSingleService(id);
    // Backend returns: { status, data: { service: {...} } }
    const item = response.data?.data?.service;
    // Map MongoDB's _id to id
    return item ? fixObjectMedia({ ...item, id: item._id }) : null;
};

/**
 * Hook for fetching and managing services data.
 * Return shape: { data, loading, error, refresh } — identical to the old hook.
 */
export const useServices = (params) => {
    const { data = [], isLoading: loading, error, refetch: refresh } = useQuery({
        queryKey: ['services', params],
        queryFn: () => getServices(params),
    });

    return { data, loading, error, refresh };
};

/**
 * Hook for fetching and managing single service data.
 * Return shape: { data, loading, error, refresh } — identical to the old hook.
 */
export const useService = (id) => {
    const { data = null, isLoading: loading, error, refetch: refresh } = useQuery({
        queryKey: ['service', id],
        queryFn: () => getServiceById(id),
        enabled: !!id && id !== 'undefined',
    });

    return { data, loading, error, refresh };
};

export default useServices;
