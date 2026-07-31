import { BACKEND_URL } from '../api/axiosInstance';

/**
 * Normalizes an image URL from the backend.
 * All backend images are served under /Public/Images/...
 * e.g. "/Public/Images/Certificates/file.jpg" → "http://192.168.1.16:8000/Public/Images/Certificates/file.jpg"
 */
export const fixImageUrl = (url) => {
    if (!url || typeof url !== 'string' || url.startsWith('http') || url.startsWith('blob:') || url.startsWith('data:')) {
        return url;
    }

    // Normalize backslashes and duplicate slashes
    let cleaned = url.replace(/\\/g, '/').replace(/\/+/g, '/');
    if (!cleaned.startsWith('/')) cleaned = '/' + cleaned;

    // Use relative path in DEV so Vite proxy handles it (avoids WSL/Docker IP reachability issues)
    if (import.meta.env.DEV) {
        return cleaned;
    }

    // In production, prepend the backend origin
    return `${BACKEND_URL}${cleaned}`;
};

/**
 * Recursively scans an object for media URLs and fixes them.
 */
export const fixObjectMedia = (obj) => {
    if (!obj || typeof obj !== 'object') {
        if (typeof obj === 'string' && (
            obj.match(/\.(jpg|jpeg|png|gif|svg|webp|avif)$/i) ||
            obj.toLowerCase().includes('public/')
        )) {
            return fixImageUrl(obj);
        }
        return obj;
    }

    const newObj = Array.isArray(obj) ? [...obj] : { ...obj };
    for (const key in newObj) {
        const val = newObj[key];
        const isMediaKey = ['image', 'icon', 'logo', 'cover', 'avatar', 'src', 'url', 'banner', 'hero', 'thumbnail', 'pic', 'photo', 'file']
            .some(k => key.toLowerCase().includes(k));
        if (typeof val === 'string' && (isMediaKey || val.match(/\.(jpg|jpeg|png|gif|svg|webp|avif)$/i))) {
            newObj[key] = fixImageUrl(val);
        } else if (Array.isArray(val)) {
            newObj[key] = val.map(item => fixObjectMedia(item));
        } else if (val && typeof val === 'object') {
            newObj[key] = fixObjectMedia(val);
        }
    }
    return newObj;
};

/**
 * Formats a date string or object into "Month YYYY" (e.g., November 2023).
 */
export const formatMonthYear = (dateInput) => {
    if (!dateInput) return '';
    try {
        const date = new Date(dateInput);
        if (isNaN(date.getTime())) return String(dateInput);
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    } catch {
        return String(dateInput);
    }
};

/**
 * Formats a date string or object into "DD MMM YYYY" (e.g., 05 Feb 2026).
 */
export const formatDate = (dateInput) => {
    if (!dateInput) return '';
    try {
        const date = new Date(dateInput);
        if (isNaN(date.getTime())) return String(dateInput);
        const day = String(date.getDate()).padStart(2, '0');
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${day} ${months[date.getMonth()]} ${date.getFullYear()}`;
    } catch {
        return String(dateInput);
    }
};

/**
 * Formats a date string or object into "Month DD, YYYY" (e.g., February 05, 2026).
 */
export const formatLongDate = (dateInput) => {
    if (!dateInput) return '';
    try {
        const date = new Date(dateInput);
        if (isNaN(date.getTime())) return String(dateInput);
        const day = String(date.getDate()).padStart(2, '0');
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        return `${months[date.getMonth()]} ${day}, ${date.getFullYear()}`;
    } catch {
        return String(dateInput);
    }
};


// ---------------------------------------------------------------------------

export const normalizeDataFields = (item) => {
    return item;
};

// ---------------------------------------------------------------------------

/**
 * Extracts the first array-valued property from an API response.
 * Checks the hinted `key` first, then falls back dynamically — no
 * hardcoded entity key list needed.
 *
 * @param {*}      result - Raw API response
 * @param {string} key    - Preferred array key hint (e.g. 'testimonials')
 */
const extractArray = (result, key) => {
    if (Array.isArray(result)) return result;
    if (!result || typeof result !== 'object') return [];

    // 1. Prioritize the hinted key at the root
    if (Array.isArray(result[key])) return result[key];

    // 2. Check inside a nested `data` wrapper
    if (result.data) {
        if (Array.isArray(result.data)) return result.data;
        if (Array.isArray(result.data[key])) return result.data[key];
    }

    // 3. Dynamic fallback: return the first array-valued property found
    for (const k of Object.keys(result)) {
        if (Array.isArray(result[k])) return result[k];
    }

    return [];
};

/**
 * Normalizes an API list response: extracts the array, normalizes all
 * fields, and fixes media URLs.
 *
 * @param {*}      result - Raw API response data
 * @param {string} key    - Preferred array key hint (e.g. 'testimonials')
 */
export const normalizeArrayResponse = (result, key) => {
    const rawArray = extractArray(result, key);
    return rawArray.map(item => fixObjectMedia(normalizeDataFields(item)));
};
