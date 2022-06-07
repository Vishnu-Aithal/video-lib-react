import { PlaylistType } from "types/Playlist";
import { VideoDetails } from "types/VideoDetails";

interface ActionsWithArray {
    type: "LOAD_PLAYLISTS" | "SET_PLAYLISTS";
    payload: PlaylistType[];
}

interface ActionWithPlaylistType {
    type: "SET_PLAYLIST";
    payload: PlaylistType;
}

interface ResetPlaylists {
    type: "RESET_PLAYLISTS";
}

interface OpenModal {
    type: "OPEN_MODAL";
    payload: { currentVideo: VideoDetails; modalOpen: true };
}
interface CloseModel {
    type: "CLOSE_MODAL";
    payload: { currentVideo: {}; modalOpen: false };
}

export type PlaylistActions =
    | ActionsWithArray
    | ResetPlaylists
    | ActionWithPlaylistType
    | OpenModal
    | CloseModel;
