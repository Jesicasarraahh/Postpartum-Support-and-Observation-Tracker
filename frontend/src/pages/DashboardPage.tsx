import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { removeToken } from "../auth/token";
import { apiRequest } from "../services/api";

import type {
    User,
    PostpartumProfile
} from "../types";

import "../styles/dashboard.css";

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

        const confirmed =
            window.confirm(
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

        return (
            <div className="dashboard-loading">
                Loading your support space...
            </div>
        );
    }


    const profile =
        profiles.length > 0
            ? profiles[0]
            : null;


    return (
        <div className="dashboard-page">

            <div className="dashboard-container">


                {/* TOP NAV */}

                <header className="dashboard-topbar">

                    <Link
                        to="/"
                        className="dashboard-brand"
                    >
                        Postpartum Support Tracker
                    </Link>


                    <div className="dashboard-top-actions">

                        <Link
                            to="/dashboard"
                            className="dashboard-home-link"
                        >
                            Home
                        </Link>

                        <button
                            className="logout-button"
                            onClick={handleLogout}
                        >
                            Log Out
                        </button>

                    </div>

                </header>


                {/* WELCOME */}

                <section className="dashboard-welcome">

                    <p className="dashboard-eyebrow">
                        YOUR SUPPORT SPACE
                    </p>

                    <h1>
                        Hi
                        {user
                            ? `, ${user.firstName}`
                            : ""}
                        {" "}♡
                    </h1>

                    <p>
                        Take a moment for yourself,
                        review your journey, and stay
                        connected with the people you trust.
                    </p>

                </section>


                {/* PROFILE */}

                {!profile ? (

                    <section className="profile-card">

                        <div>

                            <p className="section-label">
                                GET STARTED
                            </p>

                            <h2>
                                Create your postpartum profile
                            </h2>

                            <p>
                                Add your delivery date to begin
                                tracking check-ins and building
                                your support timeline.
                            </p>

                        </div>

                        <Link
                            to="/profile/setup"
                            className="primary-action-button"
                        >
                            Create Profile
                        </Link>

                    </section>

                ) : (

                    <>

                        <section className="profile-card">

                            <div>

                                <p className="section-label">
                                    YOUR PROFILE
                                </p>

                                <h2>
                                    Your Postpartum Journey
                                </h2>

                                <p className="profile-date-label">
                                    Delivery Date
                                </p>

                                <p className="profile-date">
                                    {new Date(
                                        profile.deliveryDate
                                        + "T00:00:00"
                                    ).toLocaleDateString(
                                        undefined,
                                        {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric"
                                        }
                                    )}
                                </p>

                            </div>

                            <div className="profile-heart">
                                ♡
                            </div>

                        </section>


                        {/* MAIN ACTIONS */}

                        <section className="dashboard-actions-section">

                            <div className="section-heading">

                                <p className="section-label">
                                    YOUR TOOLS
                                </p>

                                <h2>
                                    What would you like to do?
                                </h2>

                            </div>


                            <div className="dashboard-action-grid">


                                <Link
                                    to={`/check-in/${profile.id}`}
                                    className="action-card pink-card"
                                >

                                    <div className="action-icon">
                                        ♡
                                    </div>

                                    <div>

                                        <h3>
                                            New Check-In
                                        </h3>

                                        <p>
                                            Record your mood,
                                            sleep, medication,
                                            physical feelings,
                                            and notes.
                                        </p>

                                    </div>

                                    <span className="action-arrow">
                                        →
                                    </span>

                                </Link>


                                <Link
                                    to={`/check-ins/${profile.id}`}
                                    className="action-card peach-card"
                                >

                                    <div className="action-icon">
                                        ◷
                                    </div>

                                    <div>

                                        <h3>
                                            Check-In History
                                        </h3>

                                        <p>
                                            Look back at your
                                            previous check-ins
                                            and how you've felt.
                                        </p>

                                    </div>

                                    <span className="action-arrow">
                                        →
                                    </span>

                                </Link>


                                <Link
                                    to={`/trusted-circle/${profile.id}`}
                                    className="action-card lavender-card"
                                >

                                    <div className="action-icon">
                                        ◌
                                    </div>

                                    <div>

                                        <h3>
                                            Trusted Circle
                                        </h3>

                                        <p>
                                            Manage the people
                                            you've invited to
                                            support your journey.
                                        </p>

                                    </div>

                                    <span className="action-arrow">
                                        →
                                    </span>

                                </Link>


                                <Link
                                    to={`/timeline/${profile.id}`}
                                    className="action-card sage-card"
                                >

                                    <div className="action-icon">
                                        ✦
                                    </div>

                                    <div>

                                        <h3>
                                            Combined Timeline
                                        </h3>

                                        <p>
                                            See your check-ins
                                            and trusted-circle
                                            observations together.
                                        </p>

                                    </div>

                                    <span className="action-arrow">
                                        →
                                    </span>

                                </Link>

                            </div>

                        </section>

                    </>
                )}


                {/* DELETE ACCOUNT */}

                <section className="account-section">

                    <div>

                        <p className="danger-label">
                            ACCOUNT SETTINGS
                        </p>

                        <h2>
                            Delete your account
                        </h2>

                        <p>
                            Permanently delete your account,
                            postpartum profile, check-ins,
                            trusted circle, and related data.
                            This action cannot be undone.
                        </p>

                    </div>

                    <button
                        className="delete-account-button"
                        onClick={handleDeleteAccount}
                    >
                        Delete Account
                    </button>

                </section>


            </div>

        </div>
    );
}

export default DashboardPage;