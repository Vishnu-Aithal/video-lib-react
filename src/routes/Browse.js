import { Card } from "components/Card";
import { NavLink } from "react-router-dom";

export const Browse = () => {
    return (
        <>
            <div className="categories-container p-2">
                <NavLink
                    className={({ isActive }) =>
                        `btn btn--link  m-2 br-2 ${
                            isActive ? "btn--primary" : "btn--outline-primary"
                        }`
                    }
                    to="/browse/vetasium">
                    Veritasium
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        `btn btn--link  m-2 br-2 ${
                            isActive ? "btn--primary" : "btn--outline-primary"
                        }`
                    }
                    to="/browse/kurzgesagt">
                    Kurzgesagt
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        `btn btn--link  m-2 br-2 ${
                            isActive ? "btn--primary" : "btn--outline-primary"
                        }`
                    }
                    to="/browse/vsuace">
                    V Suace
                </NavLink>
            </div>
            <div className="video-card-container">
                <Card type="listing" />
                <Card type="listing" />
                <Card type="listing" />
                <Card type="listing" />
                <Card type="listing" />
                <Card type="listing" />
            </div>
        </>
    );
};
