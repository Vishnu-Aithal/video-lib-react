const CardDropDownMenu = ({
    inWatchLater = false,
    addToPlaylist = () => {},
    addToWatchLater = () => {},
}) => {
    return (
        <ul className="list-group">
            <li className="list__item" onClick={addToPlaylist}>
                Add to Playlist
            </li>
            {!inWatchLater && (
                <li className="list__item" onClick={addToWatchLater}>
                    Add to Watch Later
                </li>
            )}
        </ul>
    );
};
