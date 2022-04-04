import { Card } from "components/Card";
import { Hero } from "components/Hero";
import "styles/home-page.css";

export const HomePage = () => {
    return (
        <>
            <Hero />

            <div className="categories">
                <Card type="category" />
                <Card type="category" />
                <Card type="category" />
            </div>
        </>
    );
};
