import { useMemo } from "react";
import { useFeedbacks, useSortBy, useFilterBy } from "../store/useFeedbackStore";
import FeedbackItem from "./FeedbackItem";
import type { Feedback } from "../types/feedback";

const FeedbackList = () => {
    const feedbacks = useFeedbacks();
    const sortBy = useSortBy();
    const filterBy = useFilterBy();

    const processedFeedbacks = useMemo(() => {
        let result: Feedback[] = [...feedbacks];

        // Filtering
        if (filterBy !== "all") {
            result = result.filter((f) => f.category === filterBy);
        }

        // Sorting
        switch (sortBy) {
            case "newest":
                result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case "oldest":
                result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                break;
            case "most-voted":
                result.sort((a, b) => b.votes - a.votes);
                break;
            case "least-voted":
                result.sort((a, b) => a.votes - b.votes);
                break;
        }

        return result;
    }, [feedbacks, sortBy, filterBy]);

    if (processedFeedbacks.length === 0) {
        return (
            <div>
                <h3>No feedback yet.</h3>
                <p>Be the first to add one!</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Feedback List</h2>
            <div>
                {processedFeedbacks.map((feedback) => (
                    <FeedbackItem key={feedback.id} feedback={feedback} />
                ))}
            </div>
        </div>
    );
};

export default FeedbackList;
