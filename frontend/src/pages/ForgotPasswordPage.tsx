import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

import { apiRequest } from "../services/api";

function ForgotPasswordPage() {

    const [email, setEmail] =
        useState("");

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    async function handleSubmit(
        event: FormEvent
    ) {

        event.preventDefault();

        setMessage("");
        setError("");

        try {

            const response =
                await apiRequest(
                    "/api/auth/forgot-password",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            email
                        })
                    }
                );

            if (!response.ok) {

                setError(
                    "Could not send reset email."
                );

                return;
            }

            setMessage(
                "Check your email for a password reset link."
            );

        } catch {

            setError(
                "Something went wrong."
            );
        }
    }

    return (
        <div>

            <h1>Forgot Password</h1>

            <p>
                Enter your email address and
                we will send you a reset link.
            </p>

            <form onSubmit={handleSubmit}>

                <label>
                    Email
                </label>

                <br />

                <input
                    type="email"
                    value={email}
                    onChange={(event) =>
                        setEmail(
                            event.target.value
                        )
                    }
                    required
                />

                <br />
                <br />

                <button type="submit">
                    Send Reset Link
                </button>

            </form>

            {message && (
                <p>{message}</p>
            )}

            {error && (
                <p>{error}</p>
            )}

            <Link to="/login">
                Back to Login
            </Link>

        </div>
    );
}

export default ForgotPasswordPage;