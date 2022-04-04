import { Link } from "react-router-dom";

export const Hero = ({
    backgroundImage = "https://picsum.photos/1280/720",
}) => {
    return (
        <div
            className="hero text-center shadow-md"
            style={{ backgroundImage: `url(${backgroundImage}` }}>
            <h1 className="hero__heading heading-lg clr-white">Latest Watch</h1>
            <h3 className="hero__text heading-sm clr-green">
                Lorem Ispum Doler Amut
            </h3>
            <Link
                className="hero__btn btn btn--primary btn--lg shadow-lg my-4 mx-auto btn--link"
                to="/browse/all">
                Watch Now
            </Link>
        </div>
    );
};
