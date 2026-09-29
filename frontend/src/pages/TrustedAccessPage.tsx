import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import {
    useSearchParams
} from "react-router-dom";

import {
    apiRequest
} from "../services/api";

import "../styles/trustedAccess.css";


type TrustedAccess = {

    trustedCircleMemberId: number;

    name: string;

    relationship: string;

    postpartumProfileId: number;
};


function TrustedAccessPage() {

    const [searchParams] =
        useSearchParams();

    const token =
        searchParams.get("token");

    const [access, setAccess] =
        useState<TrustedAccess | null>(null);

    const [category, setCategory] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [
        observerConcerned,
        setObserverConcerned
    ] =
        useState(false);

    const [observedAt, setObservedAt] =
        useState("");

    const [error, setError] =
        useState("");

    const [message, setMessage] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);


    useEffect(() => {

        async function validateAccess() {

            if (!token) {

                setError(
                    "Trusted-circle access token is missing."
                );

                setLoading(false);

                return;
            }

            try {

                const response =
                    await apiRequest(
                        `/api/trusted-access?token=${encodeURIComponent(token)}`
                    );

                if (!response.ok) {

                    setError(
                        "This trusted-circle access link is invalid or expired."
                    );

                    return;
                }

                const data:
                    TrustedAccess =
                        await response.json();

                setAccess(data);

            } catch {

                setError(
                    "Something went wrong while opening this invitation."
                );

            } finally {

                setLoading(false);
            }
        }

        validateAccess();

    }, [token]);


    async function handleSubmit(
        event: FormEvent
    ) {

        event.preventDefault();

        if (!token) {
            return;
        }

        setError("");
        setMessage("");
        setSaving(true);

        try {

            const response =
                await apiRequest(
                    `/api/trusted-access/observations?token=${encodeURIComponent(token)}`,
                    {
                        method: "POST",

                        body: JSON.stringify({

                            category,

                            description,

                            observerConcerned,

                            observedAt:
                                observedAt.length === 16
                                    ? `${observedAt}:00`
                                    : observedAt
                        })
                    }
                );

            if (!response.ok) {

                setError(
                    "Could not save observation."
                );

                return;
            }

            setCategory("");

            setDescription("");

            setObserverConcerned(false);

            setObservedAt("");

            setMessage(
                "Observation submitted successfully."
            );

        } catch {

            setError(
                "Something went wrong while submitting the observation."
            );

        } finally {

            setSaving(false);
        }
    }


    if (loading) {

        return (
            <div className="trusted-access-loading">
                Opening your trusted-circle invitation...
            </div>
        );
    }


    if (error && !access) {

        return (
            <div className="trusted-access-page">

                <div className="trusted-access-container">

                    <section className="trusted-access-invalid">

                        <div className="invalid-icon">
                            !
                        </div>

                        <p className="trusted-access-eyebrow">
                            TRUSTED CIRCLE
                        </p>

                        <h1>
                            This link could not be opened
                        </h1>

                        <p>
                            {error}
                        </p>

                    </section>

                </div>

            </div>
        );
    }


    return (
        <div className="trusted-access-page">

            <div className="trusted-access-container">


                {/* BRAND */}

                <header className="trusted-access-header">

                    <p className="trusted-access-brand">
                        Postpartum Support Tracker
                    </p>

                    <div className="trusted-access-heading">

                        <p className="trusted-access-eyebrow">
                            TRUSTED CIRCLE
                        </p>

                        <h1>
                            Share an Observation
                        </h1>

                        <p>
                            Record something you personally observed
                            to help create a clearer picture over time.
                        </p>

                    </div>

                </header>


                {/* SUPPORTER CARD */}

                {access && (

                    <section className="supporter-card">

                        <div className="supporter-avatar">
                            {access.name
                                .charAt(0)
                                .toUpperCase()}
                        </div>

                        <div className="supporter-details">

                            <p className="supporter-label">
                                YOU'RE SUPPORTING AS
                            </p>

                            <h2>
                                Welcome, {access.name}
                            </h2>

                            <span className="supporter-relationship">
                                {access.relationship}
                            </span>

                        </div>

                        <div className="supporter-heart">
                            ♡
                        </div>

                    </section>

                )}


                {/* GUIDANCE */}

                <section className="trusted-guidance-card">

                    <div className="guidance-icon">
                        ✦
                    </div>

                    <div>

                        <h3>
                            Keep your observation factual
                        </h3>

                        <p>
                            Record only what you personally noticed.
                            This space is for sharing observations,
                            not diagnosing or interpreting what they mean.
                        </p>

                    </div>

                </section>


                {/* FORM */}

                <section className="trusted-observation-card">

                    <div className="observation-card-heading">

                        <p className="trusted-access-eyebrow">
                            NEW OBSERVATION
                        </p>

                        <h2>
                            What did you notice?
                        </h2>

                        <p>
                            Add the details below as clearly
                            and simply as you can.
                        </p>

                    </div>


                    <form
                        className="trusted-observation-form"
                        onSubmit={handleSubmit}
                    >


                        {/* CATEGORY */}

                        <div className="trusted-access-field">

                            <label htmlFor="observationCategory">
                                Observation Category
                            </label>

                            <select
                                id="observationCategory"
                                value={category}
                                onChange={(event) =>
                                    setCategory(
                                        event.target.value
                                    )
                                }
                                required
                            >

                                <option value="">
                                    Select category
                                </option>

                                <option value="Mood / Behavior">
                                    Mood / Behavior
                                </option>

                                <option value="Sleep">
                                    Sleep
                                </option>

                                <option value="Eating / Appetite">
                                    Eating / Appetite
                                </option>

                                <option value="Medication">
                                    Medication
                                </option>

                                <option value="Communication">
                                    Communication
                                </option>

                                <option value="Physical Wellbeing">
                                    Physical Wellbeing
                                </option>

                                <option value="Other">
                                    Other
                                </option>

                            </select>

                        </div>


                        {/* DESCRIPTION */}

                        <div className="trusted-access-field">

                            <label htmlFor="observationDescription">
                                What did you observe?
                            </label>

                            <textarea
                                id="observationDescription"
                                rows={6}
                                value={description}
                                onChange={(event) =>
                                    setDescription(
                                        event.target.value
                                    )
                                }
                                placeholder="Describe only what you personally observed..."
                                required
                            />

                        </div>


                        {/* DATE */}

                        <div className="trusted-access-field">

                            <label htmlFor="observedAt">
                                When did you observe this?
                            </label>

                            <input
                                id="observedAt"
                                type="datetime-local"
                                value={observedAt}
                                onChange={(event) =>
                                    setObservedAt(
                                        event.target.value
                                    )
                                }
                                required
                            />

                        </div>


                        {/* CONCERN */}

                        <label
                            className={
                                observerConcerned
                                    ? "concern-box concern-box-selected"
                                    : "concern-box"
                            }
                        >

                            <input
                                type="checkbox"
                                checked={observerConcerned}
                                onChange={(event) =>
                                    setObserverConcerned(
                                        event.target.checked
                                    )
                                }
                            />

                            <div className="concern-box-content">

                                <strong>
                                    I am concerned about this observation
                                </strong>

                                <span>
                                    Select this if what you observed
                                    caused you concern.
                                </span>

                            </div>

                        </label>


                        {/* MESSAGES */}

                        {message && (

                            <div className="trusted-access-success">
                                {message}
                            </div>

                        )}


                        {error && (

                            <div className="trusted-access-error">
                                {error}
                            </div>

                        )}


                        <button
                            type="submit"
                            className="trusted-observation-submit"
                            disabled={saving}
                        >
                            {saving
                                ? "Submitting..."
                                : "Submit Observation"}
                        </button>


                    </form>

                </section>


                {/* FOOTER NOTE */}

                <p className="trusted-access-footer-note">
                    Your observation will be added to the
                    postpartum timeline with your name and relationship.
                </p>


            </div>

        </div>
    );
}

export default TrustedAccessPage;