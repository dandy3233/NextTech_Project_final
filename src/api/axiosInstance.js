import axios from 'axios';

// The backend server address
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;



const axiosInstance = axios.create({
    baseURL: import.meta.env.DEV ? '/api' : `${BACKEND_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Global interceptor for Server Errors (5xx) or Network Errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Check if error is a 5xx server error or a network error (no response)
        const isServerError = error.response && error.response.status >= 500;
        const isNetworkError = !error.response && error.message === 'Network Error';

        if (isServerError || isNetworkError) {
            // Prevent infinite redirect loops if we're already on the error page
            if (window.location.pathname !== '/server-error') {
                window.location.href = '/server-error';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;