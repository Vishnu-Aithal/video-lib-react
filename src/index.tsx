import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { makeServer } from "./server";
import { ContextProvider } from "contexts/composer-context";
import { BrowserRouter } from "react-router-dom";
import { ConditionalRouter } from "routes/ConditionalRouter";
import { AuthProvider } from "contexts/auth-context";
import { LoaderProvider } from "contexts/loader-context";
import { UserProvider } from "contexts/user-context";
import { PlaylistProvider } from "contexts/playlist-context";
import { ToastProvider } from "contexts/toast-context";

// Call make Server
makeServer();

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLDivElement
);

root.render(
    <ContextProvider
        contexts={[
            React.StrictMode,
            BrowserRouter,
            LoaderProvider,
            ToastProvider,
            AuthProvider,
            UserProvider,
            PlaylistProvider,
        ]}>
        <ConditionalRouter />
    </ContextProvider>
);
