import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { ConditionalRouter } from "routes/ConditionalRouter";
import { AuthProvider } from "contexts/auth-context";
import { LoaderProvider } from "contexts/loader-context";

// Call make Server
makeServer();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <LoaderProvider>
                <AuthProvider>
                    <ConditionalRouter />
                </AuthProvider>
            </LoaderProvider>
        </BrowserRouter>
    </React.StrictMode>
);
