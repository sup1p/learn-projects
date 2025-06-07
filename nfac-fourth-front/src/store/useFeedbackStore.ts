import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidv4 } from 'uuid';
import type { Feedback, Category, SortOption, FeedbackState } from '../types/feedback';

interface FeedbackActions {
    addFeedback: (feedback: Pick<Feedback, 'title' | 'description' | 'category'>) => void;
    deleteFeedback: (id: string) => void;
    updateFeedback: (updatedFeedback: Feedback) => void;
    voteFeedback: (id: string) => void;
    setSortBy: (option: SortOption) => void;
    setFilterBy: (category: Category | 'all') => void;
    toggleTheme: () => void;
}

type StoreState = FeedbackState & { actions: FeedbackActions };

export const useFeedbackStore = create<StoreState>()(
    devtools(
        persist(
            immer((set) => ({
                feedbacks: [],
                sortBy: 'newest',
                filterBy: 'all',
                theme: 'light',
                actions: {
                    addFeedback: (feedback) =>
                        set((state) => {
                            const newFeedback: Feedback = {
                                ...feedback,
                                id: uuidv4(),
                                votes: 0,
                                createdAt: new Date(),
                                updatedAt: new Date(),
                            };
                            state.feedbacks.push(newFeedback);
                        }),
                    deleteFeedback: (id) =>
                        set((state) => {
                            state.feedbacks = state.feedbacks.filter((f) => f.id !== id);
                        }),
                    updateFeedback: (updatedFeedback) =>
                        set((state) => {
                            const index = state.feedbacks.findIndex((f) => f.id === updatedFeedback.id);
                            if (index !== -1) {
                                state.feedbacks[index] = {
                                    ...updatedFeedback,
                                    updatedAt: new Date(),
                                };
                            }
                        }),
                    voteFeedback: (id) =>
                        set((state) => {
                            const feedback = state.feedbacks.find((f) => f.id === id);
                            if (feedback) {
                                feedback.votes += 1;
                            }
                        }),
                    setSortBy: (option) =>
                        set((state) => {
                            state.sortBy = option;
                        }),
                    setFilterBy: (category) =>
                        set((state) => {
                            state.filterBy = category;
                        }),
                    toggleTheme: () =>
                        set((state) => {
                            state.theme = state.theme === 'light' ? 'dark' : 'light';
                        }),
                },
            })),
            {
                name: 'feedback-storage',
                // partialize avoids storing actions in localStorage
                partialize: (state) =>
                    Object.fromEntries(
                        Object.entries(state).filter(([key]) => !['actions'].includes(key))
                    ),
            }
        )
    )
);

// Selectors
export const useFeedbacks = () => useFeedbackStore((state) => state.feedbacks);
export const useFeedbackActions = () => useFeedbackStore((state) => state.actions);
export const useTheme = () => useFeedbackStore((state) => state.theme);
export const useSortBy = () => useFeedbackStore((state) => state.sortBy);
export const useFilterBy = () => useFeedbackStore((state) => state.filterBy);
