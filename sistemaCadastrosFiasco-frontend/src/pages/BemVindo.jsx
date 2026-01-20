
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setToken } from "../apiClient";

export default function BemVindo() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/auth/me")
            .then(res => setEmail(res.email))
            .catch(() => {
                setToken(null);
                navigate("/login", { replace: true });
            });
    }, [navigate]);

    return (
        <div style={{ padding: 40 }}>
            <h2>Bem-vindo</h2>
            <p>Usuário logado: <b>{email}</b></p>

            <button onClick={() => {
                setToken(null);
                navigate("/login");
            }}>
                Sair
            </button>
        </div>
    );
}
