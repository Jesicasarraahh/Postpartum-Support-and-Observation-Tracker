import { useState } from "react";
import type { FormEvent } from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import { apiRequest } from "../services/api";
import { saveToken } from "../auth/token";

import "../styles/login.css";


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
        <div className="login-page">

            <div className="login-container">


                {/* LEFT SIDE */}

                <section className="login-welcome-panel">

                    <p className="login-brand">
                        Postpartum Support Tracker
                    </p>

                    <div className="login-welcome-content">

                        <p className="login-eyebrow">
                            WELCOME BACK
                        </p>

                        <h1>
                            Your support space is here when you need it.
                        </h1>

                        <p>
                            Check in with yourself, review your journey,
                            and stay connected with the people you trust.
                        </p>

                    </div>


                    <div className="login-support-card">

                        <div className="login-support-icon">
                            ♡
                        </div>

                        <div>

                            <strong>
                                Mother-controlled
                            </strong>

                            <p>
                                You decide what to record,
                                who to invite, and what to share.
                            </p>

                        </div>

                    </div>

                </section>


                {/* RIGHT SIDE */}

                <section className="login-form-card">

                    <div className="login-form-heading">

                        <p className="login-eyebrow">
                            SIGN IN
                        </p>

                        <h2>
                            Welcome back
                        </h2>

                        <p>
                            Log in to continue to your postpartum
                            support space.
                        </p>

                    </div>


                    <form
                        className="login-form"
                        onSubmit={handleSubmit}
                    >


                        <div className="login-field">

                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(
                                        event.target.value
                                    )
                                }
                                placeholder="you@example.com"
                                required
                            />

                        </div>


                        <div className="login-field">

                            <div className="login-password-row">

                                <label htmlFor="password">
                                    Password
                                </label>

                                <Link
                                    to="/forgot-password"
                                    className="login-forgot-link"
                                >
                                    Forgot password?
                                </Link>

                            </div>

                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(
                                        event.target.value
                                    )
                                }
                                placeholder="Enter your password"
                                required
                            />

                        </div>


                        {error && (

                            <div className="login-error">
                                {error}
                            </div>

                        )}


                        <button
                            type="submit"
                            className="login-submit-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Logging in..."
                                : "Log In"}
                        </button>

                    </form>


                    <div className="login-divider">

                        <span>
                            New here?
                        </span>

                    </div>


                    <p className="login-register-text">
                        Don't have an account?
                        {" "}

                        <Link to="/register">
                            Create Account
                        </Link>
                    </p>


                    <Link
                        to="/"
                        className="login-home-link"
                    >
                        ← Back to Home
                    </Link>

                </section>


            </div>

        </div>
    );
}

export default LoginPage;