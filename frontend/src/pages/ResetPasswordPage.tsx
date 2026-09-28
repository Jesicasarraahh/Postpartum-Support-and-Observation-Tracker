import { useState } from "react";
import type { FormEvent } from "react";

import {
    Link,
    useSearchParams
} from "react-router-dom";

import { apiRequest } from "../services/api";

function ResetPasswordPage() {

    const [searchParams] =
        useSearchParams();

    const token =
        searchParams.get("token");

    const [newPassword, setNewPassword] =
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

        if (!token) {

            setError(
                "Reset token is missing."
            );

            return;
        }

        try {

            const response =
                await apiRequest(
                    "/api/auth/reset-password",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            token,
                            newPassword
                        })
                    }
                );

            if (!response.ok) {

                setError(
                    "Could not reset password."
                );

                return;
            }

            setMessage(
                "Password reset successfully."
            );

        } catch {

            setError(
                "Something went wrong."
            );
        }
    }

    return (
        <div>

            <h1>Reset Password</h1>

            <form onSubmit={handleSubmit}>

                <label>
                    New Password
                </label>

                <br />

                <input
                    type="password"
                    value={newPassword}
                    onChange={(event) =>
                        setNewPassword(
                            event.target.value
                        )
                    }
                    required
                />

                <br />
                <br />

                <button type="submit">
                    Reset Password
                </button>

            </form>

            {message && (
                <div>

                    <p>{message}</p>

                    <Link to="/login">
                        Go to Login
                    </Link>

                </div>
            )}

            {error && (
                <p>{error}</p>
            )}

        </div>
    );
}

export default ResetPasswordPage;