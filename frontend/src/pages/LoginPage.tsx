import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { apiRequest } from "../services/api";
import { saveToken } from "../auth/token";

type LoginResponse = {
    token: string;
};

function LoginPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    async function handleSubmit(event: FormEvent) {

        event.preventDefault();

        setError("");

        const response = await apiRequest(
            "/api/auth/login",
            {
                method: "POST",

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        if (!response.ok) {
            setError("Invalid email or password.");
            return;
        }

        const data: LoginResponse =
            await response.json();

        saveToken(data.token);

        navigate("/dashboard");
    }

    return (
        <div>

            <h1>Login</h1>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        required
                    />
                </div>

                <div>
                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        required
                    />
                </div>

                {error && (
                    <p>{error}</p>
                )}

                <button type="submit">
                    Log In
                </button>

            </form>

            <p>
                Don't have an account?{" "}
                <Link to="/register">
                    Create one
                </Link>
            </p>

        </div>
    );
}

export default LoginPage;