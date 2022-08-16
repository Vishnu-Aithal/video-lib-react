import { useAuth } from "contexts/auth-context";
import { useLoader } from "contexts/loader-context";
import { useToast } from "contexts/toast-context";
import { SetStateAction, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { VideoDetails } from "types/VideoDetails";
import { addCommenttoVideo } from "utility-functions/userHandler";
import classes from "./VideoComments.module.css";

interface VideoCommentProps {
    videoData: VideoDetails;
    setVideoData: React.Dispatch<SetStateAction<VideoDetails | null>>;
}

export const VideoComment: React.FC<VideoCommentProps> = ({
    videoData,
    setVideoData,
}) => {
    const [newComment, setNewComment] = useState("");
    const { authState } = useAuth();
    const { showLoader, hideLoader } = useLoader();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div className={classes["comments"]}>
            <h3 className={classes["comments-heading"]}>Comments</h3>

            <form
                className={classes["new-comment-form"]}
                onSubmit={async (e) => {
                    e.preventDefault();
                    if (authState.isLoggedIn) {
                        const error = await addCommenttoVideo(
                            authState.token,
                            newComment,
                            videoData._id,
                            setVideoData,
                            showLoader,
                            hideLoader
                        );
                        if (error) {
                            showToast({
                                title: "Failed to Add Comment",
                                type: "error",
                            });
                        } else {
                            setNewComment("");
                            showToast({ title: "Commented", type: "success" });
                        }
                    } else {
                        navigate("/sign-in", {
                            state: {
                                from: location.pathname,
                            },
                        });
                    }
                }}>
                <input
                    placeholder="New Comment"
                    className={classes["comment-input"]}
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                    className="btn btn--secondary br-2 ms-auto min-w-max"
                    disabled={!newComment}>
                    Add Comment
                </button>
            </form>

            {videoData.comments && videoData?.comments?.length !== 0 ? (
                videoData.comments.map((comment) => (
                    <div className={classes["comment"]}>
                        <h4>{comment.author}</h4>
                        <span className="text-gray text-sm text-end ms-2">
                            {comment.createdAt}
                        </span>
                        <p>{comment.body}</p>
                    </div>
                ))
            ) : (
                <h4 className="mx-auto">No Comments</h4>
            )}
        </div>
    );
};
