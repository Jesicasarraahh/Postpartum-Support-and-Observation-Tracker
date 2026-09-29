import { useEffect, useState } from "react";

import {
    Link,
    useNavigate,
    useParams
} from "react-router-dom";

import { apiRequest } from "../services/api";

import type {
    CheckIn
} from "../types";

import "../styles/checkInHistory.css";


function formatLabel(value: string) {

    return value
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(
            /\b\w/g,
            letter => letter.toUpperCase()
        );
}


function CheckInHistoryPage() {

    const { profileId } =
        useParams();

    const navigate =
        useNavigate();

    const [checkIns, setCheckIns] =
        useState<CheckIn[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {

        async function loadCheckIns() {

            if (!profileId) {

                setError(
                    "Postpartum profile was not found."
                );

                setLoading(false);

                return;
            }

            try {

                const response =
                    await apiRequest(
                        `/api/postpartum-profiles/${profileId}/check-ins`
                    );

                if (!response.ok) {

                    setError(
                        "Could not load check-in history."
                    );

                    return;
                }

                const data:
                    CheckIn[] =
                        await response.json();

                setCheckIns(data);

            } catch {

                setError(
                    "Something went wrong while loading your check-ins."
                );

            } finally {

                setLoading(false);
            }
        }

        loadCheckIns();

    }, [profileId]);


    if (loading) {

        return (
            <div className="history-loading">
                Loading your check-ins...
            </div>
        );
    }


    return (
        <div className="history-page">

            <div className="history-container">


                {/* HEADER */}

                <header className="history-header">

                    <button
                        className="history-back-button"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        ← Back
                    </button>


                    <div className="history-heading">

                        <p className="history-eyebrow">
                            YOUR JOURNEY
                        </p>

                        <h1>
                            Check-In History
                        </h1>

                        <p>
                            Look back at how you've been
                            feeling and the moments you've
                            chosen to record.
                        </p>

                    </div>

                </header>


                {/* ERROR */}

                {error && (

                    <div className="history-error">
                        {error}
                    </div>

                )}


                {/* EMPTY STATE */}

                {!error &&
                checkIns.length === 0 && (

                    <section className="history-empty">

                        <div className="history-empty-icon">
                            ♡
                        </div>

                        <h2>
                            No check-ins yet
                        </h2>

                        <p>
                            Your completed check-ins will
                            appear here once you begin
                            recording your postpartum journey.
                        </p>

                        <Link
                            to={`/check-in/${profileId}`}
                            className="history-new-button"
                        >
                            Complete Your First Check-In
                        </Link>

                    </section>

                )}


                {/* HISTORY */}

                {checkIns.length > 0 && (

                    <div className="history-list">

                        {checkIns.map(
                            (checkIn, index) => {

                                const date =
                                    new Date(
                                        checkIn.createdAt
                                    );

                                return (

                                    <article
                                        key={checkIn.id}
                                        className={
                                            index % 3 === 0
                                                ? "history-card history-pink"
                                                : index % 3 === 1
                                                    ? "history-card history-peach"
                                                    : "history-card history-lavender"
                                        }
                                    >

                                        <div className="history-card-header">

                                            <div>

                                                <p className="history-card-label">
                                                    CHECK-IN
                                                </p>

                                                <h2>
                                                    {date.toLocaleDateString(
                                                        undefined,
                                                        {
                                                            month: "long",
                                                            day: "numeric",
                                                            year: "numeric"
                                                        }
                                                    )}
                                                </h2>

                                            </div>

                                            <div className="history-time">
                                                {date.toLocaleTimeString(
                                                    [],
                                                    {
                                                        hour: "numeric",
                                                        minute: "2-digit"
                                                    }
                                                )}
                                            </div>

                                        </div>


                                        {/* QUICK STATS */}

                                        <div className="history-stats">

                                            <div className="history-stat">

                                                <span className="history-stat-label">
                                                    Sleep
                                                </span>

                                                <strong>
                                                    {checkIn.sleepHours !== null
                                                        ? `${checkIn.sleepHours} hrs`
                                                        : "Not entered"}
                                                </strong>

                                            </div>


                                            <div className="history-stat">

                                                <span className="history-stat-label">
                                                    Medication
                                                </span>

                                                <strong>
                                                    {checkIn.medicationStatus
                                                        ? formatLabel(
                                                            checkIn.medicationStatus
                                                        )
                                                        : "Not entered"}
                                                </strong>

                                            </div>

                                        </div>


                                        {/* MOODS */}

                                        <div className="history-section">

                                            <h3>
                                                Mood
                                            </h3>

                                            <div className="history-tags">

                                                {checkIn.moods &&
                                                checkIn.moods.length > 0 ? (

                                                    checkIn.moods.map(
                                                        mood => (

                                                            <span
                                                                key={mood}
                                                                className="history-tag mood-tag"
                                                            >
                                                                {formatLabel(
                                                                    mood
                                                                )}
                                                            </span>

                                                        )
                                                    )

                                                ) : (

                                                    <span className="history-none">
                                                        None selected
                                                    </span>

                                                )}

                                            </div>

                                        </div>


                                        {/* PHYSICAL FEELINGS */}

                                        <div className="history-section">

                                            <h3>
                                                Physical Feelings
                                            </h3>

                                            <div className="history-tags">

                                                {checkIn.physicalFeelings &&
                                                checkIn.physicalFeelings.length > 0 ? (

                                                    checkIn
                                                        .physicalFeelings
                                                        .map(
                                                            feeling => (

                                                                <span
                                                                    key={feeling}
                                                                    className="history-tag physical-tag"
                                                                >
                                                                    {formatLabel(
                                                                        feeling
                                                                    )}
                                                                </span>

                                                            )
                                                        )

                                                ) : (

                                                    <span className="history-none">
                                                        None selected
                                                    </span>

                                                )}

                                            </div>

                                        </div>


                                        {/* NOTES */}

                                        <div className="history-notes">

                                            <p className="history-notes-label">
                                                NOTES
                                            </p>

                                            <p>
                                                {checkIn.notes
                                                    ? checkIn.notes
                                                    : "No notes added for this check-in."}
                                            </p>

                                        </div>

                                    </article>

                                );
                            }
                        )}

                    </div>

                )}

            </div>

        </div>
    );
}

export default CheckInHistoryPage;