import { useState } from "react";
import { useFeedbackActions } from "../store/useFeedbackStore";
import type { Category } from "../types/feedback";

const FeedbackForm = () => {
    const { addFeedback } = useFeedbackActions();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<Category>("Feature");

    const categories: Category[] = ["UI", "Performance", "Feature"];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) {
            alert("Please fill in all fields.");
            return;
        }
        addFeedback({ title, description, category });
        setTitle("");
        setDescription("");
        setCategory("Feature");
    };

    return (
        <div>
            <h2>Add Feedback</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="A short, descriptive title"
                    />
                </div>
                <div>
                    <label htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        placeholder="Describe the feature or bug..."
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="category">
                        Category
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value as Category)}
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                >
                    Add Feedback
                </button>
            </form>
        </div>
    );
};

export default FeedbackForm;
