import { useAuth } from "contexts/auth-context";
import { useUserData } from "contexts/user-context";
import { useNavigate } from "react-router-dom";
import { CategoryDetails, VideoDetails } from "types/VideoDetails";
import { addToHistory, inHistory } from "utility-functions/userHandler";

interface VideoCardBodyProps {
    type: "liked" | "history" | "later" | "listing" | "playlist";
    data: VideoDetails;
}
interface CategoryCardBodyProps {
    type: "category";
    data: CategoryDetails;
}

type CardBodyProps = VideoCardBodyProps | CategoryCardBodyProps;

export const CardBody: React.FC<CardBodyProps> = ({ type, data }) => {
    const navigate = useNavigate();
    return (
        <div className="card__body p-2">
            <div className="card__img-wrapper">
                <img
                    onClick={() => {
                        if (type === "category") {
                            navigate(`browse/${data.categoryName}`);
                        } else {
                            navigate(`/watch/${data._id}`);
                        }
                    }}
                    className="card__img"
                    src={data.img.src}
                    alt={data.img.alt}></img>
            </div>

            <div className="card__text-wrapper">
                {type !== "category" && (
                    <h3 className="card__heading">{data.title}</h3>
                )}
                <p className="text-semi-bold text-gray">{`by ${data.creator}`}</p>

                <p className="mt-3">
                    {data.description.length > 100
                        ? data.description.substring(0, 100) + "..."
                        : data.description}
                </p>
            </div>
        </div>
    );
};
