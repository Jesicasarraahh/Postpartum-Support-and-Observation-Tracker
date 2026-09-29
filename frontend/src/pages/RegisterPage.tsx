import { useState } from "react";
import type { FormEvent } from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import { apiRequest } from "../services/api";

import "../styles/register.css";


function RegisterPage() {

    const navigate = useNavigate();

    const [firstName, setFirstName] =
        useState("");

    const [lastName, setLastName] =
        useState("");

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
                    "/api/auth/register",
                    {
                        method: "POST",

                        body: JSON.stringify({
                            firstName,
                            lastName,
                            email,
                            password
                        })
                    }
                );

            if (!response.ok) {

                const data =
                    await response.json();

                setError(
                    data.error ||
                    "Registration failed."
                );

                return;
            }

            navigate("/login");

        } catch {

            setError(
                "Something went wrong while creating your account."
            );

        } finally {

            setLoading(false);
        }
    }


    return (
        <div className="register-page">

            <div className="register-container">


                {/* LEFT SIDE */}

                <section className="register-welcome-panel">

                    <p className="register-brand">
                        Postpartum Support Tracker
                    </p>

                    <div className="register-welcome-content">

                        <p className="register-eyebrow">
                            CREATE YOUR SPACE
                        </p>

                        <h1>
                            Build a support system around your postpartum journey.
                        </h1>

                        <p>
                            Create your account to begin
                            recording check-ins, inviting trusted
                            people, and organizing observations
                            in one place.
                        </p>

                    </div>


                    <div className="register-support-grid">

                        <div className="register-support-item">

                            <span className="register-support-icon pink-support">
                                ♡
                            </span>

                            <div>

                                <strong>
                                    Check in with yourself
                                </strong>

                                <p>
                                    Record your mood, sleep,
                                    physical feelings, and notes.
                                </p>

                            </div>

                        </div>


                        <div className="register-support-item">

                            <span className="register-support-icon lavender-support">
                                ◌
                            </span>

                            <div>

                                <strong>
                                    Invite people you trust
                                </strong>

                                <p>
                                    Build a trusted circle that
                                    can contribute observations.
                                </p>

                            </div>

                        </div>


                        <div className="register-support-item">

                            <span className="register-support-icon sage-support">
                                ✦
                            </span>

                            <div>

                                <strong>
                                    Keep everything together
                                </strong>

                                <p>
                                    View check-ins and observations
                                    together in one timeline.
                                </p>

                            </div>

                        </div>

                    </div>

                </section>


                {/* RIGHT SIDE */}

                <section className="register-form-card">

                    <div className="register-form-heading">

                        <p className="register-eyebrow">
                            GET STARTED
                        </p>

                        <h2>
                            Create your account
                        </h2>

                        <p>
                            It only takes a moment to set up
                            your postpartum support space.
                        </p>

                    </div>


                    <form
                        className="register-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="register-name-grid">

                            <div className="register-field">

                                <label htmlFor="firstName">
                                    First Name
                                </label>

                                <input
                                    id="firstName"
                                    type="text"
                                    value={firstName}
                                    onChange={(event) =>
                                        setFirstName(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Jesica"
                                    required
                                />

                            </div>


                            <div className="register-field">

                                <label htmlFor="lastName">
                                    Last Name
                                </label>

                                <input
                                    id="lastName"
                                    type="text"
                                    value={lastName}
                                    onChange={(event) =>
                                        setLastName(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Sarah"
                                    required
                                />

                            </div>

                        </div>


                        <div className="register-field">

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


                        <div className="register-field">

                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(
                                        event.target.value
                                    )
                                }
                                placeholder="At least 8 characters"
                                minLength={8}
                                required
                            />

                            <p className="register-password-help">
                                Use at least 8 characters.
                            </p>

                        </div>


                        {error && (

                            <div className="register-error">
                                {error}
                            </div>

                        )}


                        <button
                            type="submit"
                            className="register-submit-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating Account..."
                                : "Create Account"}
                        </button>

                    </form>


                    <div className="register-divider">

                        <span>
                            Already registered?
                        </span>

                    </div>


                    <p className="register-login-text">
                        Already have an account?
                        {" "}

                        <Link to="/login">
                            Log In
                        </Link>
                    </p>


                    <Link
                        to="/"
                        className="register-home-link"
                    >
                        ← Back to Home
                    </Link>

                </section>


            </div>

        </div>
    );
}

export default RegisterPage;