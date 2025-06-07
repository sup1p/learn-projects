export interface Feedback {
    id: string;
    title: string;
    description: string;
    category: Category;
    votes: number;
    createdAt: Date;
    updatedAt: Date;
}

export type Category = 'UI' | 'Performance' | 'Feature';

export type SortOption = 'newest' | 'oldest' | 'most-voted' | 'least-voted';

export interface FeedbackState {
    feedbacks: Feedback[];
    sortBy: SortOption;
    filterBy: Category | 'all';
    theme: 'light' | 'dark';
}