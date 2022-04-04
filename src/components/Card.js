import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Card = ({
    type,
    badge,
    data = {
        _id: 123456,
        category: "dummy",
        description: "Lorem Ipsum Doler Amut",
        img: { src: "https://picsum.photos/1280/720", alt: "random" },
        title: "Title",
        creator: "Creator",
    },
    removeFromLikedVideos = () => {},
    removeFromHistory = () => {},
    removeFromPlaylist = () => {},
    removeFromWatchLater = () => {},
    likeToggle = () => {},
}) => {
    const navigate = useNavigate();
    const [dropDownActive, setDropDownActive] = useState(false);
    return (
        <div className="card shadow-xs">
            {badge && <div className="card__badge">{badge}</div>}

            {type === "liked" && (
                <div
                    className="card__dismiss"
                    onClick={() => removeFromLikedVideos()}>
                    <i className="far fa-heart clr-white"></i>
                </div>
            )}
            {type === "history" && (
                <div
                    className="card__dismiss"
                    onClick={() => removeFromHistory()}>
                    <i className="far fa-trash-alt clr-white"></i>
                </div>
            )}
            {type === "later" && (
                <div
                    className="card__dismiss"
                    onClick={() => removeFromWatchLater()}>
                    <i className="far fa-trash-alt clr-white"></i>
                </div>
            )}
            {type === "playlist" && (
                <div
                    className="card__dismiss"
                    onClick={() => removeFromPlaylist()}>
                    <i className="far fa-trash clr-white"></i>
                </div>
            )}

            <div className="card__body p-2">
                <div className="card__img-wrapper">
                    <img
                        className="card__img"
                        src={data.img.src}
                        alt={data.img.alt}></img>
                </div>

                <div className="card__text-wrapper">
                    <h3 className="card__heading">{data.title}</h3>
                    <p className="text-semi-bold text-gray">{`by ${data.creator}`}</p>
                    <p className="mt-3">{data.description}</p>
                </div>
            </div>

            <div className="card__cta-wrapper p-2">
                {type === "category" ? (
                    <>
                        <button
                            className="btn btn--primary br-1 w-100p"
                            onClick={() => navigate(``)}>
                            Explore Now
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="btn btn--primary br-1 w-100p"
                            onClick={() => navigate(``)}>
                            Watch Now
                        </button>
                        {type !== "liked" && (
                            <button
                                className="btn btn--icon br-2 ms-auto ms-1"
                                onClick={() => likeToggle}>
                                <i className="far fa-heart"></i>
                            </button>
                        )}
                        <button className="btn btn--icon br-2 ms-1">
                            <i className="fas fa-ellipsis-v"></i>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
