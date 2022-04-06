import { Card } from "components/Card";
import { Hero } from "components/Hero";
import "styles/home-page.css";
import { useState, useEffect } from "react";
import axios from "axios";

export const HomePage = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        (async () => {
            const {
                status,
                data: { categories },
            } = await axios.get("/api/categories");
            setData(categories);
        })();
    }, []);
    return (
        <>
            <Hero />

            <div className="categories">
                {data.map((category) => (
                    <Card
                        key={category.id}
                        type="category"
                        data={{ ...category, creator: category.categoryName }}
                    />
                ))}
            </div>
        </>
    );
};
