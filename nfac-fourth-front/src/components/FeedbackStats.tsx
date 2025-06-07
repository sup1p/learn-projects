import { useFeedbacks } from "../store/useFeedbackStore";

const FeedbackStats = () => {
    const feedbacks = useFeedbacks();

    return (
        <div>
            <h2>
                Total Feedbacks:{" "}
                <span>{feedbacks.length}</span>
            </h2>
        </div>
    );
};

export default FeedbackStats; 