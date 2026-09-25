

const SHARED_BANNER_IMAGE = "/BannerCoverImages/banner.jpg";

export const BANNER_CONFIGS = {
    "/aboutus": {
        title: "About Us",
        backgroundImage: SHARED_BANNER_IMAGE,
        breadcrumbs: [{ label: "Home", path: "/" }, { label: "About Us" }],
    },
    "/service": {

        title: "Our Services",
        backgroundImage: SHARED_BANNER_IMAGE,
        breadcrumbs: [{ label: "Home", path: "/" }, { label: "Services" }],
    },
    "/gallery": {
        title: "Gallery",
        backgroundImage: SHARED_BANNER_IMAGE,
        breadcrumbs: [{ label: "Home", path: "/" }, { label: "Gallery" }],
    },
    "/portfolio": {
        title: "Our Portfolio",
        backgroundImage: SHARED_BANNER_IMAGE,
        breadcrumbs: [{ label: "Home", path: "/" }, { label: "Portfolio" }],
    },
    "/certificates": {
        title: "Certificates",
        backgroundImage: SHARED_BANNER_IMAGE,
        breadcrumbs: [{ label: "Home", path: "/" }, { label: "Certificates" }],
    },
    "/news": {
        title: "News",
        backgroundImage: SHARED_BANNER_IMAGE,
        breadcrumbs: [{ label: "Home", path: "/" }, { label: "News" }],
    },
    "/contacts": {
        title: "Contact ",
        backgroundImage: SHARED_BANNER_IMAGE,
        breadcrumbs: [{ label: "Home", path: "/" }, { label: "Contact Us" }],
    },
    "/team": {
        title: "Team-Members",
        backgroundImage: SHARED_BANNER_IMAGE,
        breadcrumbs: [{ label: "Home", path: "/" }, { label: "Team" }],
    },
    "/team-members": {
        title: "Team-Members",
        backgroundImage: SHARED_BANNER_IMAGE,
        breadcrumbs: [{ label: "Home", path: "/" }, { label: "Team" }],
    },
};

export const getBannerConfig = (pathname) => {
    // Exact match (case-sensitive check first for performance if standard, but here we might want to be robust)
    if (BANNER_CONFIGS[pathname]) return BANNER_CONFIGS[pathname];

    // Case-insensitive fallback for main routes
    const normalPath = pathname.toLowerCase();
    const configKey = Object.keys(BANNER_CONFIGS).find(key => key.toLowerCase() === normalPath);
    if (configKey) return BANNER_CONFIGS[configKey];

    if (normalPath.startsWith("/news/")) {
        return {
            title: "News",
            backgroundImage: SHARED_BANNER_IMAGE,
            breadcrumbs: [
                { label: "Home", path: "/" },
                { label: "News", path: "/news" },
                { label: "News Detail" },
            ],
        };
    }

    if (normalPath.startsWith("/service/")) {
        return {
            title: "Service Detail",
            backgroundImage: SHARED_BANNER_IMAGE,
            breadcrumbs: [
                { label: "Home", path: "/" },
                { label: "Services", path: "/Service" },
                { label: "Service Detail" },
            ],
        };
    }

    if (normalPath.startsWith("/certificate/") || normalPath.startsWith("/certificates/")) {
        return {
            title: "Certificate",
            backgroundImage: SHARED_BANNER_IMAGE,
            breadcrumbs: [
                { label: "Home", path: "/" },
                { label: "Certificates", path: "/certificates" },
                { label: "Certificate Detail" },
            ],
        };
    }

    if (normalPath.startsWith("/portfolio/")) {
        return {
            title: "Our Portfolio",
            backgroundImage: SHARED_BANNER_IMAGE,
            breadcrumbs: [
                { label: "Home", path: "/" },
                { label: "Portfolio", path: "/portfolio" },
                { label: "Portfolio Detail" },
            ],
        };
    }

    if (normalPath.startsWith("/careers/")) {
        return {
            title: "Career Detail",
            backgroundImage: SHARED_BANNER_IMAGE,
            breadcrumbs: [
                { label: "Home", path: "/" },
                { label: "Careers", path: "/careers" },
                { label: "Career Detail" },
            ],
        };
    }

    return null;
};
