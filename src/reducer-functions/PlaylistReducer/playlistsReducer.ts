import { PlaylistType } from "types/Playlist";
import { VideoDetails } from "types/VideoDetails";
import { PlaylistActions } from "./playlistActionTypes";

export interface ModalOpen {
    playlists: PlaylistType[];
    modalSettings: {
        currentVideo: VideoDetails;
        modalOpen: true;
    };
}
export interface ModalClose {
    playlists: PlaylistType[];
    modalSettings: {
        currentVideo: {};
        modalOpen: false;
    };
}

export type PlaylistState = ModalOpen | ModalClose;

export const initialState: PlaylistState = {
    playlists: [],
    modalSettings: {
        currentVideo: {},
        modalOpen: false,
    },
};

export const playlistsReducerFunction = (
    state: PlaylistState,
    action: PlaylistActions
): PlaylistState => {
    const type = action.type;
    switch (type) {
        case "LOAD_PLAYLISTS":
            return {
                ...state,
                playlists: action.payload,
            };
        case "SET_PLAYLISTS":
            return {
                ...state,
                playlists: action.payload,
            };

        case "SET_PLAYLIST":
            return {
                ...state,
                playlists: state.playlists.map((playlist) =>
                    playlist._id === action.payload._id
                        ? action.payload
                        : playlist
                ),
            };

        case "RESET_PLAYLISTS":
            return {
                ...state,
                playlists: [],
            };
        case "OPEN_MODAL":
            return {
                ...state,
                modalSettings: {
                    currentVideo: action.payload,
                    modalOpen: true,
                },
            };
        case "CLOSE_MODAL":
            return {
                ...state,
                modalSettings: { currentVideo: {}, modalOpen: false },
            };

        default:
            return state;
    }
};
