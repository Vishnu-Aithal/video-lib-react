import { NavLink } from "react-router-dom";
import { useState } from "react";
export const SideBar = () => {
    const [mainCollapsed, setMainCollapsed] = useState(true);
    const [subCollapsed, setSubCollapsed] = useState(true);

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
                <i className="fas fa-chevron-up"></i>
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
                        Featured
                    </NavLink>
                </li>

                <li className="side-bar__item my-1">
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? "side-bar__link side-bar__link--active"
                                : "side-bar__link"
                        }
                        to="/browse/all">
                        Browse Videos
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
                        Liked Videos
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
                        Watch History
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
                        Watch Later
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
                        Playlists
                        <i className="ms-2 fas fa-chevron-right"></i>
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
                        <li className="side-bar__item my-1">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? "side-bar__link side-bar__link--active"
                                        : "side-bar__link"
                                }
                                to="">
                                Playlist 1
                            </NavLink>
                        </li>
                        <li className="side-bar__item my-1">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? "side-bar__link side-bar__link--active"
                                        : "side-bar__link"
                                }
                                to="">
                                Playlist 2
                            </NavLink>
                        </li>
                    </ul>
                </li>
            </ul>
        </aside>
    );
};
