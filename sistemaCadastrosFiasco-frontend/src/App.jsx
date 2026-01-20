
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import BemVindo from "./pages/BemVindo";
import { getToken } from "./apiClient";

function RotaPrivada({ children }) {
    return getToken() ? children : <Navigate to="/login" replace />;
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/bemvindo"
                    element={
                        <RotaPrivada>
                            <BemVindo />
                        </RotaPrivada>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}