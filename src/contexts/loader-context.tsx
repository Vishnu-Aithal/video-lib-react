import React, { useContext, createContext, useState, useCallback } from "react";

type ShowLoader = (text: string) => void;
type HideLoader = () => void;
interface LoaderContextValue {
    loader: Loader;
    showLoader: ShowLoader;
    hideLoader: HideLoader;
}

interface Loader {
    state: "hidden" | "visible";
    text: string;
}

const LoaderContext = createContext<LoaderContextValue>({
    loader: { state: "hidden", text: "" },
    showLoader: () => {},
    hideLoader: () => {},
});

export const LoaderProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [loader, setLoader] = useState<Loader>({ state: "hidden", text: "" });
    const showLoader: ShowLoader = useCallback(
        (text) => setLoader({ state: "visible", text }),
        []
    );
    const hideLoader: HideLoader = useCallback(
        () => setLoader({ state: "hidden", text: "" }),
        []
    );
    return (
        <LoaderContext.Provider value={{ loader, showLoader, hideLoader }}>
            {children}
        </LoaderContext.Provider>
    );
};

export const useLoader = () => useContext(LoaderContext);
