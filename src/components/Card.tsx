import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { CardDropDown } from "./CardDropDown";
import { useUserData } from "contexts/user-context";
import { useLoader } from "contexts/loader-context";
import { usePlaylists } from "contexts/playlist-context";
import {
    inLikes,
    inHistory,
    addToLikes,
    removeFromLikes,
    addToHistory,
    removeFromHistory,
    removeFromWatchlater,
} from "utility-functions/userHandler";
import { removeFromPlaylist } from "utility-functions/playlistHandler";
import { useAuth } from "contexts/auth-context";
import { CategoryDetails, VideoDetails } from "types/VideoDetails";
import { PlaylistType } from "types/Playlist";

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
    const navigate = useNavigate();

    const {
        userState: { likes, history },
        userDispatch,
    } = useUserData();
    const { showLoader, hideLoader } = useLoader();

    const {
        authState: { isLoggedIn, token },
    } = useAuth();

    const { playlistsDispatch } = usePlaylists();

    const [dropDown, setDropDown] = useState(false);

    const location = useLocation();

    return (
        <div className="card shadow-xs">
            {badge && <div className="card__badge">{badge}</div>}

            {type === "liked" && (
                <div
                    className="card__dismiss"
                    onClick={() =>
                        removeFromLikes(
                            token!,
                            data,
                            userDispatch,
                            showLoader,
                            hideLoader
                        )
                    }>
                    <i className="fas fa-heart clr-red"></i>
                </div>
            )}
            {type === "history" && (
                <div
                    className="card__dismiss"
                    onClick={() =>
                        removeFromHistory(
                            token!,
                            data,
                            userDispatch,
                            showLoader,
                            hideLoader
                        )
                    }>
                    <i className="far fa-trash-alt clr-white"></i>
                </div>
            )}
            {type === "later" && (
                <div
                    className="card__dismiss"
                    onClick={() =>
                        removeFromWatchlater(
                            token!,
                            data,
                            userDispatch,
                            showLoader,
                            hideLoader
                        )
                    }>
                    <i className="far fa-trash-alt clr-white"></i>
                </div>
            )}
            {type === "playlist" && (
                <div
                    className="card__dismiss"
                    onClick={() =>
                        removeFromPlaylist(
                            token!,
                            data,
                            props.playlistData,
                            playlistsDispatch,
                            showLoader,
                            hideLoader
                        )
                    }>
                    <i className="far fa-trash-alt clr-white"></i>
                </div>
            )}

            <div className="card__body p-2">
                <div className="card__img-wrapper">
                    <img
                        onClick={() =>
                            type === "category" &&
                            navigate(`browse/${data.categoryName}`)
                        }
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

            <div className="card__cta-wrapper p-2 mt-auto">
                {type === "category" ? (
                    <>
                        <button
                            className="btn btn--primary br-1 w-100p"
                            onClick={() =>
                                navigate(`browse/${data.categoryName}`)
                            }>
                            Explore Now
                        </button>
                    </>
                ) : (
                    <>
                        <a
                            href={data.url}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn--primary br-1 w-100p btn--link"
                            onClick={() => {
                                !inHistory(history, data) &&
                                    isLoggedIn &&
                                    addToHistory(token!, data, userDispatch);
                            }}>
                            Watch Now
                        </a>
                        {type !== "liked" &&
                            (inLikes(likes, data) ? (
                                <button
                                    className="btn btn--icon br-2 ms-auto ms-1"
                                    onClick={() =>
                                        removeFromLikes(
                                            token!,
                                            data,
                                            userDispatch,
                                            showLoader,
                                            hideLoader
                                        )
                                    }>
                                    <i className="fas fa-heart clr-red"></i>
                                </button>
                            ) : (
                                <button
                                    className="btn btn--icon br-2 ms-auto ms-1"
                                    onClick={() =>
                                        isLoggedIn
                                            ? addToLikes(
                                                  token!,
                                                  data,
                                                  userDispatch,
                                                  showLoader,
                                                  hideLoader
                                              )
                                            : navigate("/sign-in", {
                                                  state: {
                                                      from: location.pathname,
                                                  },
                                              })
                                    }>
                                    <i className="far fa-heart"></i>
                                </button>
                            ))}
                        <button
                            className="btn btn--icon br-2 ms-1"
                            onClick={() => {
                                setDropDown((dropdown) => !dropdown);
                            }}>
                            <i className="fas fa-ellipsis-v"></i>
                        </button>
                        {dropDown && (
                            <CardDropDown
                                dropDown={dropDown}
                                setDropDown={setDropDown}
                                video={data}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
