import { Card } from "components/Card/Card";
import { useUserData } from "contexts/user-context";
import { clearHistory } from "utility-functions/userHandler";
import { useAuth } from "contexts/auth-context";
import { useLoader } from "contexts/loader-context";
export const History: React.FC = () => {
    const {
        userState: { history },
        userDispatch,
    } = useUserData();
    const { showLoader, hideLoader } = useLoader();
    const {
        authState: { token },
    } = useAuth();
    return (
        <div className="video-card-container">
            {history.length !== 0 ? (
                <div className="w-100p text-end">
                    <button
                        className="btn btn--secondary"
                        onClick={() =>
                            clearHistory(
                                token!,
                                userDispatch,
                                showLoader,
                                hideLoader
                            )
                        }>
                        Clear All
                    </button>
                </div>
            ) : (
                <h3 className="m-auto">Watch Some Videos to View it Here</h3>
            )}
            {history.map((video) => (
                <Card key={video._id} type="history" data={video} />
            ))}
        </div>
    );
};
