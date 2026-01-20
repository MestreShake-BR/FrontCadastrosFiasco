import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setToken } from "../apiClient";
import 'C:/Users/Alexandre/Downloads/FrontCadastrosFiasco/sistemaCadastrosFiasco-frontend/src/pages/css/Login.css'; // Para estilos customizados

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setErro("");

        try {
            const response = await api.post("/auth/login", { email, senha });
            setToken(response.token);
            navigate("/bemvindo");
        } catch (err) {
            setErro("Email ou senha inválidos");
        }
    }

    return (
        <div className="login-container">
            <h2 className="login-title">Bem-vindo de volta!</h2>

            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    className="login-input"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <input
                    className="login-input"
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    required
                />

                {erro && <p className="error-message">{erro}</p>}

                <button className="login-btn">Entrar</button>
            </form>

            <div className="register-link">
                <p>Não tem uma conta? <a href="/cadastro">Crie uma agora</a></p>
            </div>
        </div>
    );
}