import { useEffect, useState } from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import { apiRequest } from "../services/api";

import type {
    TimelineItem
} from "../types";

import "../styles/timeline.css";


function formatLabel(value: string) {

    return value
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(
            /\b\w/g,
            letter => letter.toUpperCase()
        );
}


function TimelinePage() {

    const { profileId } =
        useParams();

    const navigate =
        useNavigate();

    const [items, setItems] =
        useState<TimelineItem[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {

        async function loadTimeline() {

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
                        `/api/postpartum-profiles/${profileId}/timeline`
                    );

                if (!response.ok) {

                    setError(
                        "Could not load the timeline."
                    );

                    return;
                }

                const data:
                    TimelineItem[] =
                        await response.json();

                setItems(data);

            } catch {

                setError(
                    "Something went wrong while loading the timeline."
                );

            } finally {

                setLoading(false);
            }
        }

        loadTimeline();

    }, [profileId]);


    if (loading) {

        return (
            <div className="timeline-loading">
                Loading your timeline...
            </div>
        );
    }


    return (
        <div className="timeline-page">

            <div className="timeline-container">


                {/* HEADER */}

                <header className="timeline-header">

                    <button
                        type="button"
                        className="timeline-back-button"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        ← Back
                    </button>


                    <div className="timeline-heading">

                        <p className="timeline-eyebrow">
                            YOUR STORY OVER TIME
                        </p>

                        <h1>
                            Combined Timeline
                        </h1>

                        <p>
                            Your own check-ins and observations
                            from the people you trust, organized
                            together in one place.
                        </p>

                    </div>

                </header>


                {/* ERROR */}

                {error && (

                    <div className="timeline-error">
                        {error}
                    </div>

                )}


                {/* EMPTY */}

                {!error &&
                items.length === 0 && (

                    <section className="timeline-empty">

                        <div className="timeline-empty-icon">
                            ✦
                        </div>

                        <h2>
                            Your timeline is empty
                        </h2>

                        <p>
                            Your check-ins and trusted-circle
                            observations will appear here
                            once they are recorded.
                        </p>

                    </section>

                )}


                {/* TIMELINE */}

                {items.length > 0 && (

                    <div className="timeline-list">

                        {items.map(
                            (item, index) => {

                                const date =
                                    new Date(
                                        item.timestamp
                                    );

                                const isMother =
                                    item.type ===
                                    "MOTHER_CHECK_IN";

                                return (

                                    <div
                                        className="timeline-entry"
                                        key={`${item.type}-${index}`}
                                    >

                                        <div className="timeline-marker-column">

                                            <div
                                                className={
                                                    isMother
                                                        ? "timeline-marker mother-marker"
                                                        : "timeline-marker observation-marker"
                                                }
                                            >
                                                {isMother
                                                    ? "♡"
                                                    : "◌"}
                                            </div>

                                            {index !==
                                                items.length - 1 && (

                                                <div className="timeline-line">
                                                </div>

                                            )}

                                        </div>


                                        <article
                                            className={
                                                isMother
                                                    ? "timeline-card mother-card"
                                                    : "timeline-card observation-card"
                                            }
                                        >


                                            {/* CARD TOP */}

                                            <div className="timeline-card-top">

                                                <div>

                                                    <p className="timeline-type-label">

                                                        {isMother
                                                            ? "MOTHER CHECK-IN"
                                                            : "TRUSTED OBSERVATION"}

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


                                                <span className="timeline-time">

                                                    {date.toLocaleTimeString(
                                                        [],
                                                        {
                                                            hour: "numeric",
                                                            minute: "2-digit"
                                                        }
                                                    )}

                                                </span>

                                            </div>


                                            {isMother ? (

                                                <>


                                                    {/* MOTHER STATS */}

                                                    <div className="timeline-stats">

                                                        <div className="timeline-stat">

                                                            <span>
                                                                Sleep
                                                            </span>

                                                            <strong>
                                                                {item.sleepHours !== null
                                                                    ? `${item.sleepHours} hrs`
                                                                    : "Not entered"}
                                                            </strong>

                                                        </div>


                                                        <div className="timeline-stat">

                                                            <span>
                                                                Medication
                                                            </span>

                                                            <strong>
                                                                {item.medicationStatus
                                                                    ? formatLabel(
                                                                        item.medicationStatus
                                                                    )
                                                                    : "Not entered"}
                                                            </strong>

                                                        </div>

                                                    </div>


                                                    {/* MOODS */}

                                                    <div className="timeline-content-section">

                                                        <h3>
                                                            Mood
                                                        </h3>

                                                        <div className="timeline-tags">

                                                            {item.moods &&
                                                            item.moods.length > 0 ? (

                                                                item.moods.map(
                                                                    mood => (

                                                                        <span
                                                                            key={mood}
                                                                            className="timeline-tag mood-timeline-tag"
                                                                        >
                                                                            {formatLabel(
                                                                                mood
                                                                            )}
                                                                        </span>

                                                                    )
                                                                )

                                                            ) : (

                                                                <span className="timeline-muted">
                                                                    None selected
                                                                </span>

                                                            )}

                                                        </div>

                                                    </div>


                                                    {/* PHYSICAL */}

                                                    <div className="timeline-content-section">

                                                        <h3>
                                                            Physical Feelings
                                                        </h3>

                                                        <div className="timeline-tags">

                                                            {item.physicalFeelings &&
                                                            item.physicalFeelings.length > 0 ? (

                                                                item.physicalFeelings.map(
                                                                    feeling => (

                                                                        <span
                                                                            key={feeling}
                                                                            className="timeline-tag physical-timeline-tag"
                                                                        >
                                                                            {formatLabel(
                                                                                feeling
                                                                            )}
                                                                        </span>

                                                                    )
                                                                )

                                                            ) : (

                                                                <span className="timeline-muted">
                                                                    None selected
                                                                </span>

                                                            )}

                                                        </div>

                                                    </div>


                                                    {/* NOTES */}

                                                    {item.notes && (

                                                        <div className="timeline-note-box">

                                                            <p className="timeline-note-label">
                                                                NOTES
                                                            </p>

                                                            <p>
                                                                {item.notes}
                                                            </p>

                                                        </div>

                                                    )}

                                                </>

                                            ) : (

                                                <>


                                                    {/* OBSERVER */}

                                                    <div className="observer-row">

                                                        <div className="observer-avatar">

                                                            {item.sourceName
                                                                ? item.sourceName
                                                                    .charAt(0)
                                                                    .toUpperCase()
                                                                : "?"}

                                                        </div>

                                                        <div>

                                                            <p className="observer-name">
                                                                {item.sourceName ||
                                                                    "Trusted Observer"}
                                                            </p>

                                                            <p className="observer-relationship">
                                                                {item.relationship ||
                                                                    "Trusted Circle"}
                                                            </p>

                                                        </div>

                                                    </div>


                                                    {/* CATEGORY */}

                                                    <div className="timeline-content-section">

                                                        <h3>
                                                            Category
                                                        </h3>

                                                        <span className="timeline-category">
                                                            {item.category ||
                                                                "Observation"}
                                                        </span>

                                                    </div>


                                                    {/* OBSERVATION */}

                                                    <div className="observation-text-box">

                                                        <p className="timeline-note-label">
                                                            OBSERVATION
                                                        </p>

                                                        <p>
                                                            {item.description ||
                                                                "No description provided."}
                                                        </p>

                                                    </div>


                                                    {/* CONCERN */}

                                                    <div
                                                        className={
                                                            item.observerConcerned
                                                                ? "concern-status concerned"
                                                                : "concern-status not-concerned"
                                                        }
                                                    >

                                                        <span className="concern-dot">
                                                        </span>

                                                        {item.observerConcerned
                                                            ? "Observer marked this as concerning"
                                                            : "Observer did not mark this as concerning"}

                                                    </div>

                                                </>

                                            )}

                                        </article>

                                    </div>

                                );
                            }
                        )}

                    </div>

                )}

            </div>

        </div>
    );
}

export default TimelinePage;