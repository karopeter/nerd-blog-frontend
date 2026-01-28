import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface PostStore {
    // state 
    currentPage: number;
    searchQuery: string;
    limit: number;

    // Actions 
    setCurrentPage: (page: number) => void;
    setSearchQuery: (query: string) => void;
    setLimit: (limit: number) => void;
    resetFilters: () => void;
}

const initialState = {
    currentPage: 1,
    searchQuery: '',
    limit: 9,
};

export const usePostStore = create<PostStore>() (
    devtools(
        persist(
           (set) => ({
             ...initialState,

             setCurrentPage: (page) => 
                 set({ currentPage: page}, false, 'setCurrentPage'),


             setSearchQuery: (query) => 
                set({ searchQuery: query, currentPage: 1 }, false, 'setSearchQuery'),

             setLimit: (limit) => 
                set({ limit, currentPage: 1 }, false, 'setLimit'),

             resetFilters: () => 
                set(initialState, false, 'resetFilters'),
           }),
           {
            name: 'post-store',
            partialize: (state) => ({
              limit: state.limit,
            }),
           }
        ),
        {
         name: 'PostStore',
         enabled: process.env.NODE_ENV === 'development',
        }
    )
);

