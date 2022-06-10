import { CardDropDown } from "components/CardDropDown/CardDropDown";
import { useAuth } from "contexts/auth-context";
import { useLoader } from "contexts/loader-context";
import { useToast } from "contexts/toast-context";
import { useUserData } from "contexts/user-context";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CategoryDetails, VideoDetails } from "types/VideoDetails";
import {
    addToHistory,
    addToLikes,
    inHistory,
    inLikes,
    removeFromLikes,
} from "utility-functions/userHandler";

interface VideoCardFooterProps {
    type: "liked" | "history" | "later" | "listing" | "playlist";
    data: VideoDetails;
}
interface CategoryCardFooterProps {
    type: "category";
    data: CategoryDetails;
}

type CardFooterProps = VideoCardFooterProps | CategoryCardFooterProps;

export const CardFooter: React.FC<CardFooterProps> = ({ type, data }) => {
    const [dropDown, setDropDown] = useState(false);
    const {
        userState: { likes, history },
        userDispatch,
    } = useUserData();
    const navigate = useNavigate();
    const {
        authState: { isLoggedIn, token },
    } = useAuth();
    const { showLoader, hideLoader } = useLoader();
    const { showToast } = useToast();
    const location = useLocation();
    const handleError = (
        error: unknown,
        successMessage: string,
        errorMessage: string
    ) => {
        if (error) {
            showToast({ title: errorMessage, type: "error" });
        } else {
            showToast({ title: successMessage, type: "success" });
        }
    };
    return (
        <div className="card__cta-wrapper p-2 mt-auto">
            {type === "category" ? (
                <>
                    <button
                        className="btn btn--primary br-1 w-100p"
                        onClick={() => navigate(`browse/${data.categoryName}`)}>
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
                            if (!inHistory(history, data) && isLoggedIn) {
                                addToHistory(token!, data, userDispatch);
                            }
                        }}>
                        Watch Now
                    </a>
                    {type !== "liked" &&
                        (inLikes(likes, data) ? (
                            <button
                                className="btn btn--icon br-2 ms-auto ms-1"
                                onClick={async () => {
                                    const error = await removeFromLikes(
                                        token!,
                                        data,
                                        userDispatch,
                                        showLoader,
                                        hideLoader
                                    );
                                    handleError(
                                        error,
                                        "Removed from Likes",
                                        "Failed to Remove from likes"
                                    );
                                }}>
                                <i className="fas fa-heart clr-red"></i>
                            </button>
                        ) : (
                            <button
                                className="btn btn--icon br-2 ms-auto ms-1"
                                onClick={async () => {
                                    if (isLoggedIn) {
                                        const error = await addToLikes(
                                            token!,
                                            data,
                                            userDispatch,
                                            showLoader,
                                            hideLoader
                                        );
                                        handleError(
                                            error,
                                            "Added to Likes",
                                            "Failed to Add to Likes"
                                        );
                                    } else {
                                        navigate("/sign-in", {
                                            state: {
                                                from: location.pathname,
                                            },
                                        });
                                    }
                                }}>
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
    );
};
