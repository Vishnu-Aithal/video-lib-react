import { VideoDetails } from "./VideoDetails";

export interface PlaylistType {
    _id: string;
    title: string;
    videos: VideoDetails[];
}
