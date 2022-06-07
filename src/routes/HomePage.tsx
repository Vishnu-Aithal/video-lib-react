import { Card } from "components/Card";
import { Hero } from "components/Hero";
import "styles/home-page.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { CategoryDetails } from "types/VideoDetails";

export const HomePage: React.FC = () => {
    const [data, setData] = useState<CategoryDetails[]>([]);
    useEffect(() => {
        (async () => {
            const {
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
                        key={category._id}
                        type="category"
                        data={{ ...category, creator: category.categoryName }}
                    />
                ))}
            </div>
        </>
    );
};
