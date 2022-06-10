import { useLoader } from "contexts/loader-context";
import { createPortal } from "react-dom";
import classes from "./Loader.module.css";
const LoaderComponent: React.FC = () => {
    const { loader } = useLoader();
    return (
        <div className={`${classes.loader} ${classes[loader.state]}`}>
            <h1 className={classes["loader__text"]}>{loader.text}</h1>
        </div>
    );
};

export const Loader: React.FC = () => {
    return createPortal(
        <LoaderComponent />,
        document.getElementById("loader-modal") as HTMLDivElement
    );
};
