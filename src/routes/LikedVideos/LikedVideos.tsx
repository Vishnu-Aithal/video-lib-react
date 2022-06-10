import { Card } from "components/Card/Card";
import { useUserData } from "contexts/user-context";

export const LikedVideos: React.FC = () => {
    const {
        userState: { likes },
    } = useUserData();
    return (
        <div className="video-card-container">
            {likes.length !== 0 ? (
                likes.map((video) => (
                    <Card key={video._id} type="liked" data={video} />
                ))
            ) : (
                <h3 className="m-auto">Like Some Videos to View it Here</h3>
            )}
        </div>
    );
};
