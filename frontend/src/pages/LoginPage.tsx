import { useState } from "react";
import type { FormEvent } from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import { apiRequest } from "../services/api";
import { saveToken } from "../auth/token";

function LoginPage() {

    const navigate = useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    async function handleSubmit(
        event: FormEvent
    ) {

        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response =
                await apiRequest(
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

                setError(
                    "Invalid email or password."
                );

                return;
            }

            const data =
                await response.json();

            saveToken(data.token);

            navigate("/dashboard");

        } catch {

            setError(
                "Something went wrong while logging in."
            );

        } finally {

            setLoading(false);
        }
    }

    return (
        <div>

            <h1>Login</h1>

            <p>
                Welcome back to the Postpartum
                Support & Observation Tracker.
            </p>

            <form onSubmit={handleSubmit}>

                <div>

                    <label htmlFor="email">
                        Email
                    </label>

                    <br />

                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(
                                event.target.value
                            )
                        }
                        required
                    />

                </div>

                <br />

                <div>

                    <label htmlFor="password">
                        Password
                    </label>

                    <br />

                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(
                                event.target.value
                            )
                        }
                        required
                    />

                </div>

                <p>
                    <Link to="/forgot-password">
                        Forgot password?
                    </Link>
                </p>

                {error && (
                    <p>{error}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Logging in..."
                        : "Log In"}
                </button>

            </form>

            <br />

            <p>
                Don't have an account?{" "}
                <Link to="/register">
                    Create Account
                </Link>
            </p>

        </div>
    );
}

export default LoginPage;