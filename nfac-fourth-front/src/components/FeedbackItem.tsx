import { useState } from "react";
import type { Feedback } from "../types/feedback";
import { useFeedbackActions } from "../store/useFeedbackStore";
import { ThumbsUp, Trash2, Edit } from "lucide-react";
import ModalEdit from "./ModalEdit";

interface FeedbackItemProps {
    feedback: Feedback;
}

const FeedbackItem = ({ feedback }: FeedbackItemProps) => {
    const { voteFeedback, deleteFeedback } = useFeedbackActions();
    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
            <div>
                <div>
                    <div>
                        <h3>{feedback.title}</h3>
                        <span>
                            {feedback.category}
                        </span>
                    </div>
                    <p>{feedback.description}</p>
                    <p>
                        Created: {new Date(feedback.createdAt).toLocaleString()}
                    </p>
                </div>
                <div>
                    <div>
                        <span>{feedback.votes}</span>
                        <button
                            onClick={() => voteFeedback(feedback.id)}
                            aria-label="Vote up"
                        >
                            <ThumbsUp size={18} />
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => setIsEditing(true)}
                            aria-label="Edit"
                        >
                            <Edit size={18} />
                        </button>
                        <button
                            onClick={() => deleteFeedback(feedback.id)}
                            aria-label="Delete"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            </div>
            {isEditing && (
                <ModalEdit
                    feedback={feedback}
                    isOpen={isEditing}
                    onClose={() => setIsEditing(false)}
                />
            )}
        </>
    );
};

export default FeedbackItem;
