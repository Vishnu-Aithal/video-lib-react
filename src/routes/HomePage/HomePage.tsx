import { Card } from "components/Card/Card";
import { Hero } from "components/Hero/Hero";
import classes from "./HomePage.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { CategoryDetails } from "types/VideoDetails";

export const HomePage: React.FC = () => {
    const [data, setData] = useState<CategoryDetails[]>([]);
    useEffect(() => {
        (async () => {
            const {
                data: { categories },
            } = await axios.get(
                `https://${process.env.REACT_APP_BACKEND_URL}/api/categories`
            );
            setData(categories);
        })();
    }, []);
    return (
        <>
            <Hero />

            <div className={classes["categories"]}>
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
