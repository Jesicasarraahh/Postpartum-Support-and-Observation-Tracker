import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { apiRequest } from "../services/api";

function VerifyEmailPage() {

    const [searchParams] = useSearchParams();

    const [message, setMessage] =
        useState("Verifying your email...");

    const [success, setSuccess] =
        useState(false);

    useEffect(() => {

        async function verifyEmail() {

            const token =
                searchParams.get("token");

            if (!token) {
                setMessage(
                    "Verification token is missing."
                );
                return;
            }

            try {

                const response =
                    await apiRequest(
                        `/api/auth/verify-email?token=${encodeURIComponent(token)}`
                    );

                if (!response.ok) {

                    setMessage(
                        "This verification link is invalid or has expired."
                    );

                    return;
                }

                setSuccess(true);

                setMessage(
                    "Your email has been verified successfully!"
                );

            } catch {

                setMessage(
                    "Something went wrong while verifying your email."
                );
            }
        }

        verifyEmail();

    }, [searchParams]);

    return (
        <div>

            <h1>Email Verification</h1>

            <p>{message}</p>

            {success && (
                <div>

                    <p>
                        Your account is ready.
                        You can now log in.
                    </p>

                    <Link to="/login">
                        Go to Login
                    </Link>

                </div>
            )}

            {!success && (
                <Link to="/">
                    Return Home
                </Link>
            )}

        </div>
    );
}

export default VerifyEmailPage;