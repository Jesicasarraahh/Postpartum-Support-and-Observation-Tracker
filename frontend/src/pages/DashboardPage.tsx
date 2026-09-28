import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { removeToken } from "../auth/token";
import { apiRequest } from "../services/api";

import type {
    User,
    PostpartumProfile
} from "../types";

function DashboardPage() {

    const navigate = useNavigate();

    const [user, setUser] =
        useState<User | null>(null);

    const [profiles, setProfiles] =
        useState<PostpartumProfile[]>([]);

    const [loading, setLoading] =
        useState(true);

    async function loadDashboard() {

        try {

            const userResponse =
                await apiRequest("/api/users/me");

            if (!userResponse.ok) {
                removeToken();
                navigate("/login");
                return;
            }

            const userData: User =
                await userResponse.json();

            setUser(userData);

            const profileResponse =
                await apiRequest(
                    "/api/postpartum-profiles"
                );

            if (profileResponse.ok) {

                const profileData:
                    PostpartumProfile[] =
                        await profileResponse.json();

                setProfiles(profileData);
            }

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadDashboard();
    }, []);

    function handleLogout() {
        removeToken();
        navigate("/login");
    }

    async function handleDeleteAccount() {
    const confirmed = window.confirm(
        "Are you sure you want to permanently delete your account? This cannot be undone."
    );
    if (!confirmed) {
        return;
    }
    try {
        const response =
            await apiRequest(
                "/api/users/me",
                {
                    method: "DELETE"
                }
            );
        if (!response.ok) {
            alert(
                "Could not delete your account."
            );
            return;
        }
        removeToken();
        navigate("/");
    } catch {
        alert(
            "Something went wrong while deleting your account."
        );
    }
}

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>

            <header>
                <h1>Postpartum Support Tracker</h1>

                <nav>
                    <Link to="/dashboard">
                        Home
                    </Link>

                    {" | "}

                    <button onClick={handleLogout}>
                        Log Out
                    </button>
                </nav>
            </header>

            <hr />

            <main>

                <h2>
                    Welcome
                    {user
                        ? `, ${user.firstName}`
                        : ""}
                </h2>

                <p>
                    Your postpartum support space.
                </p>

                <hr />

                <section>

                    <h2>Your Postpartum Profile</h2>

                    {profiles.length === 0 ? (

                        <div>
                            <p>
                                You have not created a
                                postpartum profile yet.
                            </p>

                            <Link to="/profile/setup">
                                Create Postpartum Profile
                            </Link>
                        </div>

                    ) : (

                        <div>

                            <p>
                                Delivery date:{" "}
                                {profiles[0].deliveryDate}
                            </p>

                            <Link
                                to={
                                    `/check-in/${profiles[0].id}`
                                }
                            >
                                New Check-In
                            </Link>
                            <br />
                            <br />

                             <Link
                               to={`/check-ins/${profiles[0].id}`}
                             >
                              View Check-In History
                             </Link>

                        </div>
                    )}

                </section>

            </main>

        </div>
    );
}

export default DashboardPage;