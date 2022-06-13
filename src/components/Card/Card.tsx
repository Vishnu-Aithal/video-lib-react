import { CategoryDetails, VideoDetails } from "types/VideoDetails";
import { PlaylistType } from "types/Playlist";
import { CardDismiss } from "./CardDismiss";
import { CardBody } from "./CardBody";
import { CardFooter } from "./CardFooter";

interface VideoCardProps {
    type: "liked" | "history" | "later" | "listing";
    badge?: string;
    data: VideoDetails;
}
interface CategoryCardProps {
    type: "category";
    data: CategoryDetails;
    badge?: string;
}
interface PlaylistCardProps {
    type: "playlist";
    data: VideoDetails;
    badge?: string;
    playlistData: PlaylistType;
}
type CardProps = VideoCardProps | CategoryCardProps | PlaylistCardProps;

export const Card: React.FC<CardProps> = (props) => {
    const { type, badge, data } = props;

    return (
        <div className="card shadow-xs">
            {badge && <div className="card__badge">{badge}</div>}

            {type === "playlist" && (
                <CardDismiss
                    type={type}
                    data={data}
                    playlistData={props.playlistData}
                />
            )}
            {type !== "playlist" && type !== "category" && (
                <CardDismiss type={type} data={data} />
            )}

            {type === "category" && <CardBody type={type} data={data} />}
            {type !== "category" && <CardBody type={type} data={data} />}

            {type !== "category" && <CardFooter type={type} data={data} />}
            {type === "category" && <CardFooter type={type} data={data} />}
        </div>
    );
};
