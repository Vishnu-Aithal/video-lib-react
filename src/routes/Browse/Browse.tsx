import { Card } from "components/Card/Card";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { VideoDetails } from "types/VideoDetails";
import classes from "./Browse.module.css";

export const Browse: React.FC = () => {
    const categories = ["All", "Veritasium", "Kurzgesagt", "VSauce"];
    const { category } = useParams();
    const [search, setSearch] = useState("");
    const [data, setData] = useState<VideoDetails[]>([]);
    const [filteredData, setFilteredData] = useState<VideoDetails[]>([]);
    useEffect(() => {
        (async () => {
            const {
                data: { videos },
            } = await axios.get("/api/videos");
            setData(videos);
        })();
    }, []);
    useEffect(() => {
        let newFilteredData = data;
        if (typeof category === "string") {
            if (!(category.toLowerCase() === "all"))
                newFilteredData = data.filter(
                    ({ creator }) =>
                        creator.toLowerCase() === category.toLowerCase()
                );
        }
        if (search) {
            newFilteredData = newFilteredData.filter(
                ({ title, description }) => {
                    const searchTermsArray = search.toLowerCase().split(" ");
                    for (const term of searchTermsArray) {
                        if (
                            !title.toLowerCase().includes(term) &&
                            !description.toLowerCase().includes(term)
                        )
                            return false;
                    }
                    return true;
                }
            );
        }

        setFilteredData(newFilteredData);
    }, [category, data, search]);
    return (
        <>
            <div className={classes["categories-container"]}>
                {categories.map((category) => (
                    <NavLink
                        key={category}
                        className={({ isActive }) =>
                            `btn btn--link  m-2 br-2 ${
                                isActive
                                    ? "btn--primary"
                                    : "btn--outline-primary"
                            }`
                        }
                        to={`/browse/${category}`}>
                        {category}
                    </NavLink>
                ))}
                <input
                    type="text"
                    placeholder=" Search Title, Desciption"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="video-card-container">
                {filteredData.map((video) => (
                    <Card key={video._id} type="listing" data={video} />
                ))}
            </div>
        </>
    );
};
