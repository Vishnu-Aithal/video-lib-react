import { Card } from "components/Card";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { VideoDetails } from "types/VideoDetails";

export const Browse: React.FC = () => {
    const categories = ["All", "Veritasium", "Kurzgesagt", "VSauce"];
    const { category } = useParams();
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
        if (typeof category === "string") {
            category.toLowerCase() === "all"
                ? setFilteredData(data)
                : setFilteredData(
                      data.filter(
                          ({ creator }) =>
                              creator.toLowerCase() === category.toLowerCase()
                      )
                  );
        }
    }, [category, data]);
    return (
        <>
            <div className="categories-container p-2">
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
            </div>
            <div className="video-card-container">
                {filteredData.map((video) => (
                    <Card key={video._id} type="listing" data={video} />
                ))}
            </div>
        </>
    );
};
