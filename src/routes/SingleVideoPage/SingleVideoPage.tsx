import { useEffect, useState } from "react";

import { VideoDetails } from "types/VideoDetails";
import classes from "./SingleVideoPage.module.css";
import axios from "axios";
import ReactPlayer from "react-player";

import { useLoader } from "contexts/loader-context";
import { useParams } from "react-router-dom";
import { SingleVideoPageButtons } from "./SingleVideoPageButtons";
import { Card } from "components/Card/Card";

export const SingleVideoPage: React.FC = () => {
    const { videoId } = useParams();
    const [videoData, setVideoData] = useState<VideoDetails | null>(null);
    const [moreVideos, setMorevideos] = useState<VideoDetails[] | null>(null);
    const [error, setError] = useState(false);

    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        (async () => {
            try {
                const videoIdURI = encodeURI(videoId!);
                showLoader("Fetching Video");
                const response = await axios.get(`/api/video/${videoIdURI}`);
                setVideoData(response.data.video);
                const {
                    data: { videos },
                } = (await axios.get("/api/videos")) as {
                    data: { videos: VideoDetails[] };
                };
                const sameCreatorVideos = videos.filter(
                    (video) => video.creator === videoData?.creator
                );
                setMorevideos(sameCreatorVideos);
            } catch (error) {
                setError(true);
            } finally {
                hideLoader();
            }
        })();
    }, [videoId, showLoader, hideLoader, videoData?.creator]);
    console.log(moreVideos);
    return videoData && moreVideos ? (
        <div className={classes["page-container"]}>
            <div className={classes["video-container"]}>
                <ReactPlayer
                    url={videoData.url}
                    width="854px"
                    height="480px"
                    controls
                    style={{ maxWidth: "100%", maxHeight: "55vh" }}
                />
                <div className={classes["video-footer"]}>
                    <h1 className="text-lg text-bold">{videoData.title}</h1>
                    <SingleVideoPageButtons videoData={videoData} />
                </div>
                <h3 className={classes["comments"]}>Comments</h3>
            </div>
            <div className={classes["more-videos"]}>
                <h2>Explore More</h2>
                {moreVideos.map((video) => (
                    <Card type="listing" data={video} key={video._id} />
                ))}
            </div>
        </div>
    ) : (
        <h3 className="text-center mt-4">
            {error
                ? "Could not Load Video, Incorrect Url or Network Error"
                : ""}
        </h3>
    );
};
