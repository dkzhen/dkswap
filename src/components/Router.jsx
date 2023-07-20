import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import { AppProvider } from "../utils/AppContext";
export default function Router() {
    return (
        <AppProvider>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </AppProvider>
    );
}
