import axiosInstance from './axiosInstance';

const generalService = {
    // News
    getAllNews: (params) => axiosInstance.get('/AllNews', { params }),
    getSingleNews: (id) => axiosInstance.get(`/news/${id}`),
    searchNews: (params) => axiosInstance.get('/news/search', { params }),

    // FAQ
    getAllFAQs: (params) => axiosInstance.get('/getAllFAQs', { params }),
    getSingleFAQ: (id) => axiosInstance.get(`/getFAQS/${id}`),

    // Gallery
    getAllGallery: (params) => axiosInstance.get('/getAllgallery', { params }),
    getSingleGallery: (id) => axiosInstance.get(`/getGallery/${id}`),

    // Partners
    getAllPartners: (params) => axiosInstance.get('/GetPartners', { params }),

    // Services
    getAllServices: (params) => axiosInstance.get('/services', { params }),
    getSingleService: (id) => axiosInstance.get(`/services/${id}`),

    // Portfolio
    getAllPortfolio: (params) => axiosInstance.get('/getAllPortfolios', { params }),
    getSinglePortfolio: (id) => axiosInstance.get(`/getPortfolio/${id}`),

    // Team
    getAllTeams: (params) => axiosInstance.get('/getAllTeams', { params }),
    getSingleTeam: (id) => axiosInstance.get(`/team/${id}`),

    // Testimonials
    getAllTestimonials: (params) => axiosInstance.get('/getAllTestimonials', { params }),
    getSingleTestimonial: (id) => axiosInstance.get(`/getTestimonial/${id}`),

    // Certificates
    getAllCertificates: (params) => axiosInstance.get('/getAllCertificates', { params }),
    getSingleCertificate: (id) => axiosInstance.get(`/getCertificate/${id}`),

    // Counters
    getAllCounters: (params) => axiosInstance.get('/getAllCounters', { params }),
    getSingleCounter: (id) => axiosInstance.get(`/counters/${id}`),

    // Visitor Tracking
    recordVisit: (data) => axiosInstance.post('/visitcountes', data),

    // Contact
    contactEmail: (data) => axiosInstance.post('/contactEmail', data),
};

export default generalService;
