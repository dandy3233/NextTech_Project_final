import { useQuery } from '@tanstack/react-query';
import generalService from '../api/generalService';
import { normalizeArrayResponse, fixObjectMedia } from '../utils/dataNormalization';

/**
 * SECTION: API FETCHERS
 */
export const fetchAllCertificates = async (params = {}) => {
    const response = await generalService.getAllCertificates(params);
    return normalizeArrayResponse(response.data, 'certificates');
};

export const getCertificateById = async (id) => {
    const response = await generalService.getSingleCertificate(id);
    const item = response.data?.data?.certificate;
    return item ? fixObjectMedia(item) : null;
};

/**
 * Hook for fetching and managing certificates list data.
 * Return shape: { data, loading, error, refresh } — identical to the old hook.
 */
export const useCertificates = (params) => {
    const { data = [], isLoading: loading, error, refetch: refresh } = useQuery({
        queryKey: ['certificates', params],
        queryFn: () => fetchAllCertificates(params),
        select: (result) =>
            (Array.isArray(result) ? result : []).filter(
                (item) => item.status === 'Active'
            ),
    });

    return { data, loading, error, refresh };
};

/**
 * Hook for fetching and managing single certificate data.
 * Return shape: { data, loading, error, refresh } — identical to the old hook.
 */
export const useCertificate = (id) => {
    const { data = null, isLoading: loading, error, refetch: refresh } = useQuery({
        queryKey: ['certificate', id],
        queryFn: () => getCertificateById(id),
        enabled: !!id && id !== 'undefined',
    });

    return { data, loading, error, refresh };
};
