import { Card } from "components/Card";
import { useUserData } from "contexts/user-context";

export const WatchLater: React.FC = () => {
    const {
        userState: { watchlater },
    } = useUserData();
    return (
        <div className="video-card-container">
            {watchlater.length !== 0 ? (
                watchlater.map((video) => (
                    <Card key={video._id} type="later" data={video} />
                ))
            ) : (
                <h3 className="m-auto">
                    Add Videos To Watchlater to View it Here
                </h3>
            )}
        </div>
    );
};
