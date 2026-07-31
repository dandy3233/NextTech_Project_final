import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import generalService from '../api/generalService';
import { normalizeArrayResponse } from '../utils/dataNormalization';

/**
 * SECTION: API FETCHERS
 */
export const getNews = async (params = {}) => {
    const response = await generalService.getAllNews(params);
    return normalizeArrayResponse(response.data, 'news');
};

export const getSingleNews = async (id) => {
    const response = await generalService.getSingleNews(id);
    const result = response.data;
    // Robustly find the news object
    let item = result?.news || result?.data?.news || result?.data || result;
    if (Array.isArray(item)) item = item[0];

    // Normalize and fix media
    const normalized = normalizeArrayResponse([item], 'news')[0];

    return normalized;
};

/**
 * useSingleNews hook for fetching a single post by ID.
 * Return shape: { post, loading, error } — identical to the old hook.
 */
export function useSingleNews(id) {
    const { data: post = null, isLoading: loading, error } = useQuery({
        queryKey: ['news', id],
        queryFn: () => getSingleNews(id),
        enabled: !!id,
    });

    return { post, loading, error };
}

/**
 * useBlog hook to handle news fetching, searching, and filtering.
 * All derived values (filteredPosts, categories, tags, recentPosts) are
 * computed with useMemo — same logic as before, just sourced from React Query.
 */
function useBlog() {
    const [searchQuery, setSearchQuery] = useState('');

    const { data: rawPosts = [], isLoading: loading, error } = useQuery({
        queryKey: ['news'],
        queryFn: () => getNews({ limit: 100, page: 1 }),
        select: (result) =>
            (Array.isArray(result) ? result : []).filter(
                (post) => post.status === 'published'
            ),
    });

    // Filter posts by search query (title, tags, or category)
    const filteredPosts = useMemo(() => {
        if (!searchQuery) return rawPosts;
        const lowerQuery = searchQuery.toLowerCase();
        return rawPosts.filter(
            (post) =>
                (post.title && post.title.toLowerCase().includes(lowerQuery)) ||
                (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))) ||
                (post.catagory && post.catagory.toLowerCase().includes(lowerQuery))
        );
    }, [searchQuery, rawPosts]);

    // Derive categories with counts from ALL posts
    const categories = useMemo(() => {
        const categoryCounts = rawPosts.reduce((acc, post) => {
            const cat = post.catagory;
            if (cat) {
                acc[cat] = (acc[cat] || 0) + 1;
            }
            return acc;
        }, {});

        return Object.entries(categoryCounts).map(([name, count]) => ({
            name,
            count,
        }));
    }, [rawPosts]);

    // Derive unique tags from ALL posts
    const tags = useMemo(() => {
        const allTags = rawPosts.reduce((acc, post) => {
            if (post.tags) {
                post.tags.forEach((tag) => acc.add(tag));
            }
            return acc;
        }, new Set());
        return Array.from(allTags).sort();
    }, [rawPosts]);

    // Get recent posts (sorted by date, take top 5)
    const recentPosts = useMemo(() => {
        return [...rawPosts]
            .sort((a, b) => new Date(b.createdDate || 0) - new Date(a.createdDate || 0))
            .slice(0, 5);
    }, [rawPosts]);

    return {
        posts: rawPosts,
        filteredPosts,
        categories,
        tags,
        recentPosts,
        searchQuery,
        setSearchQuery,
        loading,
        error,
    };
}

export default useBlog;