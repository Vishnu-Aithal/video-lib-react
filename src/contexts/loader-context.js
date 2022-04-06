import { useContext, createContext, useState } from "react";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
    const [loader, setLoader] = useState({ state: "hidden", text: "" });
    const showLoader = (text) => setLoader({ state: "visible", text });
    const hideLoader = () => setLoader({ state: "hidden", text: "" });
    return (
        <LoaderContext.Provider value={{ loader, showLoader, hideLoader }}>
            {children}
        </LoaderContext.Provider>
    );
};

export const useLoader = () => useContext(LoaderContext);
