
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setToken } from "../apiClient";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setErro("");

        try {
            const data = await api.post("/auth/login", { email, senha });
            setToken(data.token);
            navigate("/bemvindo");
        } catch {
            setErro("Email ou senha inválidos");
        }
    }

    return (
        <div style={{ padding: 40 }}>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                /><br/>

                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                /><br/>

                {erro && <p style={{ color: "red" }}>{erro}</p>}

                <button>Entrar</button>
            </form>
        </div>
    );
}
