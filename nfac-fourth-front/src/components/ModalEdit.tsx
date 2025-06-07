import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useFeedbackActions } from "../store/useFeedbackStore";
import type { Feedback, Category } from "../types/feedback";
import { X } from "lucide-react";

interface ModalEditProps {
    isOpen: boolean;
    onClose: () => void;
    feedback: Feedback;
}

const ModalEdit = ({ isOpen, onClose, feedback }: ModalEditProps) => {
    const { updateFeedback } = useFeedbackActions();
    const [title, setTitle] = useState(feedback.title);
    const [description, setDescription] = useState(feedback.description);
    const [category, setCategory] = useState<Category>(feedback.category);

    const categories: Category[] = ["UI", "Performance", "Feature"];

    useEffect(() => {
        setTitle(feedback.title);
        setDescription(feedback.description);
        setCategory(feedback.category);
    }, [feedback]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) {
            alert("Please fill in all fields.");
            return;
        }
        updateFeedback({ ...feedback, title, description, category });
        onClose();
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay />
                <Dialog.Content>
                    <Dialog.Title>Edit Feedback</Dialog.Title>
                    <Dialog.Description>
                        Make changes to your feedback here. Click save when you're done.
                    </Dialog.Description>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="edit-title">
                                Title
                            </label>
                            <input
                                id="edit-title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="edit-description">
                                Description
                            </label>
                            <textarea
                                id="edit-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="edit-category">
                                Category
                            </label>
                            <select
                                id="edit-category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value as Category)}>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <Dialog.Close asChild>
                                <button type="button">
                                    Cancel
                                </button>
                            </Dialog.Close>
                            <button type="submit">
                                Save Changes
                            </button>
                        </div>
                    </form>

                    <Dialog.Close asChild>
                        <button aria-label="Close">
                            <X size={18} />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default ModalEdit;
