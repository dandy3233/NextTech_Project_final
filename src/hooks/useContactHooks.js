import { useState } from 'react';
import generalService from '../api/generalService';

export const useContactForm = () => {
    const [status, setStatus] = useState({ loading: false, error: null, success: false });

    const submitContactForm = async (formData) => {
        setStatus({ loading: true, error: null, success: false });
        try {
            await generalService.contactEmail(formData);
            setStatus({ loading: false, error: null, success: true });
            return { success: true };
        } catch (err) {
            setStatus({ 
                loading: false, 
                error: err.response?.data?.message || err.message || "Failed to send message", 
                success: false 
            });
            return { success: false, error: err };
        }
    };

    const resetStatus = () => setStatus({ loading: false, error: null, success: false });

    return { submitContactForm, status, resetStatus };
};

export default useContactForm;
