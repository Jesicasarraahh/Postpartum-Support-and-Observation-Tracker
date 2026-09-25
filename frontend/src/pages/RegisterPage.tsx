import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";

function RegisterPage() {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    async function handleSubmit(event: FormEvent) {

        event.preventDefault();

        setError("");

        const response = await apiRequest(
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

            const data = await response.json();

            setError(
                data.error ||
                "Registration failed."
            );

            return;
        }

        navigate("/login");
    }

    return (
        <div>

            <h1>Create Account</h1>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>First Name</label>

                    <input
                        type="text"
                        value={firstName}
                        onChange={(event) =>
                            setFirstName(event.target.value)
                        }
                        required
                    />
                </div>

                <div>
                    <label>Last Name</label>

                    <input
                        type="text"
                        value={lastName}
                        onChange={(event) =>
                            setLastName(event.target.value)
                        }
                        required
                    />
                </div>

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
                        minLength={8}
                        required
                    />
                </div>

                {error && (
                    <p>{error}</p>
                )}

                <button type="submit">
                    Create Account
                </button>

            </form>

            <p>
                Already have an account?{" "}
                <Link to="/login">
                    Log in
                </Link>
            </p>

        </div>
    );
}

export default RegisterPage;