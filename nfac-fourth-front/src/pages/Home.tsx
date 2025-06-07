import FeedbackForm from "../components/FeedbackForm";
import FeedbackList from "../components/FeedbackList";
import FeedbackStats from "../components/FeedbackStats";
import Header from "../components/Header";

const Home = () => {
    return (
        <div>
            <Header />
            <FeedbackStats />
            <FeedbackForm />
            <FeedbackList />
        </div>
    );
};

export default Home;
