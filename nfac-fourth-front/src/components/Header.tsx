import { useFeedbackActions, useSortBy, useFilterBy, useTheme } from "../store/useFeedbackStore";
import type { Category, SortOption } from "../types/feedback";
import { Sun, Moon } from "lucide-react";

const Header = () => {
    const { setSortBy, setFilterBy, toggleTheme } = useFeedbackActions();
    const sortBy = useSortBy();
    const filterBy = useFilterBy();
    const theme = useTheme();

    const categories: (Category | "all")[] = ["all", "UI", "Performance", "Feature"];
    const sortOptions: SortOption[] = ["newest", "oldest", "most-voted", "least-voted"];

    return (
        <header>
            <div>
                <div>
                    <h1>Product Feedback Board</h1>
                    <p>Welcome! Share your feedback.</p>
                </div>
                <button
                    onClick={toggleTheme}
                >
                    {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                </button>
            </div>
            <div className="flex">
                <label htmlFor="filter-by">
                    Filter by
                </label>
                <select
                    id="filter-by"
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value as Category | "all")}
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="sort-by">
                    Sort by
                </label>
                <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                >
                    {sortOptions.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt.replace("-", " ").charAt(0).toUpperCase() + opt.replace("-", " ").slice(1)}
                        </option>
                    ))}
                </select>
            </div>
        </header>
    );
};

export default Header;