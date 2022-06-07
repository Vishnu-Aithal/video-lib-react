export const initialState = {
    playlists: [],
    modalSettings: {
        currentVideo: {},
        modalOpen: false,
    },
};

export const playlistsReducerFunction = (state, { type, payload }) => {
    switch (type) {
        case "LOAD_PLAYLISTS":
            return {
                ...state,
                playlists: payload,
            };
        case "SET_PLAYLISTS":
            return {
                ...state,
                playlists: payload,
            };

        case "SET_PLAYLIST":
            return {
                ...state,
                playlists: state.playlists.map((playlist) =>
                    playlist._id === payload._id ? payload : playlist
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
                modalSettings: { currentVideo: payload, modalOpen: true },
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
