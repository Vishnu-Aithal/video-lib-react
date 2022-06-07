import { NavLink } from "react-router-dom";
import { useState } from "react";
import { usePlaylists } from "contexts/playlist-context";
export const SideBar: React.FC = () => {
    const [mainCollapsed, setMainCollapsed] = useState(true);
    const [subCollapsed, setSubCollapsed] = useState(true);
    const {
        playlistsState: { playlists },
    } = usePlaylists();
    return (
        <aside
            className={`side-bar shadow-sm p-2 clr-primary ${
                !mainCollapsed ? "show" : ""
            }`}
            id="side-bar">
            <button
                className={`side-bar__toggle btn btn--icon ${
                    !mainCollapsed ? "active" : ""
                }`}
                onClick={() => setMainCollapsed((collapsed) => !collapsed)}>
                <i className="fas fa-chevron-up me-2"></i>
            </button>

            <ul
                className={`side-bar__menu side-bar__menu--main clr-black mt-4`}>
                <li className="side-bar__item my-1">
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? "side-bar__link side-bar__link--active"
                                : "side-bar__link"
                        }
                        to="/">
                        <i className="fas fa-fire-alt me-2"></i>Featured
                    </NavLink>
                </li>

                <li className="side-bar__item my-1">
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? "side-bar__link side-bar__link--active"
                                : "side-bar__link"
                        }
                        to="/browse">
                        <i className="fab fa-wpexplorer me-2"></i>Browse Videos
                    </NavLink>
                </li>
                <li className="side-bar__item my-1">
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? "side-bar__link side-bar__link--active"
                                : "side-bar__link"
                        }
                        to="/liked-videos">
                        <i className="far fa-heart me-2"></i>Liked Videos
                    </NavLink>
                </li>
                <li className="side-bar__item my-1">
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? "side-bar__link side-bar__link--active"
                                : "side-bar__link"
                        }
                        to="/history">
                        <i className="fas fa-history me-2"></i>Watch History
                    </NavLink>
                </li>
                <li className="side-bar__item my-1">
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? "side-bar__link side-bar__link--active"
                                : "side-bar__link"
                        }
                        to="/watch-later">
                        <i className="far fa-bookmark me-2"></i>Watch Later
                    </NavLink>
                </li>

                <li>
                    <div
                        className={`side-bar__item side-bar__item--header vertical-collapse-toggle ${
                            !subCollapsed ? "active" : ""
                        }`}
                        onClick={() =>
                            setSubCollapsed((collapsed) => !collapsed)
                        }>
                        <i className="far fa-list-alt me-2"></i>Playlists
                        <i className="ms-2 fas fa-chevron-right me-2"></i>
                    </div>

                    <ul
                        className={`side-bar__menu side-bar__menu--sub ${
                            !subCollapsed ? "show" : ""
                        }`}>
                        <li className="side-bar__item my-1">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? "side-bar__link side-bar__link--active"
                                        : "side-bar__link"
                                }
                                to="/playlists/all">
                                All Playlists
                            </NavLink>
                        </li>
                        {playlists.map((playlist) => (
                            <li
                                key={playlist._id}
                                className="side-bar__item my-1">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? "side-bar__link side-bar__link--active"
                                            : "side-bar__link"
                                    }
                                    to={`playlists/${playlist._id}`}>
                                    {playlist.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </aside>
    );
};
