import { Link } from "react-router-dom";
export const NotFound = () => {
    return (
        <div>
            <h1 className="heading-xl text-center mt-6 clr-red">
                404 Not Found
            </h1>
            <Link
                to="/"
                replace
                className="btn btn--lg btn--secondary btn--link mt-6 mx-auto d-block w-fit">
                Back To Home Page
            </Link>
        </div>
    );
};
