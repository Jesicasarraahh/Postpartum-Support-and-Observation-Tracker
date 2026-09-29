import { useState } from "react";
import type { FormEvent } from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    apiRequest
} from "../services/api";

import "../styles/newCheckIn.css";


const moodOptions = [
    "HAPPY",
    "CALM",
    "OKAY",
    "SAD",
    "ANXIOUS",
    "IRRITABLE",
    "OVERWHELMED",
    "SCARED",
    "CONFUSED",
    "RESTLESS"
];


const physicalFeelingOptions = [
    "TIRED",
    "BLOATED",
    "HEADACHE",
    "RESTLESS",
    "LOW_APPETITE",
    "BODY_DISCOMFORT"
];


function formatLabel(value: string) {

    return value
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(
            /\b\w/g,
            letter => letter.toUpperCase()
        );
}


function NewCheckInPage() {

    const navigate = useNavigate();

    const { profileId } =
        useParams();

    const [sleepHours, setSleepHours] =
        useState("");

    const [
        medicationStatus,
        setMedicationStatus
    ] = useState("NOT_APPLICABLE");

    const [moods, setMoods] =
        useState<string[]>([]);

    const [
        physicalFeelings,
        setPhysicalFeelings
    ] = useState<string[]>([]);

    const [notes, setNotes] =
        useState("");

    const [error, setError] =
        useState("");

    const [saving, setSaving] =
        useState(false);


    function toggleMood(mood: string) {

        if (moods.includes(mood)) {

            setMoods(
                moods.filter(
                    item => item !== mood
                )
            );

        } else {

            setMoods([
                ...moods,
                mood
            ]);
        }
    }


    function togglePhysicalFeeling(
        feeling: string
    ) {

        if (
            physicalFeelings.includes(
                feeling
            )
        ) {

            setPhysicalFeelings(
                physicalFeelings.filter(
                    item =>
                        item !== feeling
                )
            );

        } else {

            setPhysicalFeelings([
                ...physicalFeelings,
                feeling
            ]);
        }
    }


    async function handleSubmit(
        event: FormEvent
    ) {

        event.preventDefault();

        if (!profileId) {

            setError(
                "Postpartum profile was not found."
            );

            return;
        }

        setError("");
        setSaving(true);

        try {

            const response =
                await apiRequest(
                    `/api/postpartum-profiles/${profileId}/check-ins`,
                    {
                        method: "POST",

                        body: JSON.stringify({

                            sleepHours:
                                sleepHours === ""
                                    ? null
                                    : Number(
                                        sleepHours
                                    ),

                            medicationStatus,

                            moods,

                            physicalFeelings,

                            notes
                        })
                    }
                );

            if (!response.ok) {

                setError(
                    "Could not save check-in."
                );

                return;
            }

            navigate("/dashboard");

        } finally {

            setSaving(false);
        }
    }


    return (
        <div className="checkin-page">

            <div className="checkin-container">


                <header className="checkin-header">

                    <button
                        type="button"
                        className="checkin-back-button"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        ← Back
                    </button>

                    <div className="checkin-heading">

                        <p className="checkin-eyebrow">
                            DAILY CHECK-IN
                        </p>

                        <h1>
                            How are you feeling today?
                        </h1>

                        <p>
                            Take a moment to check in with
                            yourself. There are no right or
                            wrong answers.
                        </p>

                    </div>

                </header>


                <form
                    className="checkin-form"
                    onSubmit={handleSubmit}
                >


                    {/* MOODS */}

                    <section className="checkin-card mood-section">

                        <div className="checkin-card-heading">

                            <div className="section-icon pink-icon">
                                ♡
                            </div>

                            <div>

                                <p className="checkin-section-label">
                                    MOOD
                                </p>

                                <h2>
                                    How are you feeling emotionally?
                                </h2>

                                <p>
                                    Select as many as you need.
                                </p>

                            </div>

                        </div>


                        <div className="option-chip-grid">

                            {moodOptions.map(
                                mood => (

                                    <button
                                        key={mood}
                                        type="button"
                                        className={
                                            moods.includes(mood)
                                                ? "option-chip mood-chip selected"
                                                : "option-chip mood-chip"
                                        }
                                        onClick={() =>
                                            toggleMood(mood)
                                        }
                                    >
                                        {formatLabel(mood)}
                                    </button>

                                )
                            )}

                        </div>

                    </section>


                    {/* SLEEP + MEDICATION */}

                    <div className="checkin-two-column">


                        <section className="checkin-card sleep-section">

                            <div className="checkin-card-heading">

                                <div className="section-icon peach-icon">
                                    ☾
                                </div>

                                <div>

                                    <p className="checkin-section-label">
                                        SLEEP
                                    </p>

                                    <h2>
                                        Rest
                                    </h2>

                                </div>

                            </div>


                            <label
                                className="checkin-input-label"
                                htmlFor="sleepHours"
                            >
                                Hours of sleep
                            </label>

                            <div className="sleep-input-wrapper">

                                <input
                                    id="sleepHours"
                                    className="checkin-number-input"
                                    type="number"
                                    min="0"
                                    max="24"
                                    step="0.5"
                                    value={sleepHours}
                                    onChange={(event) =>
                                        setSleepHours(
                                            event.target.value
                                        )
                                    }
                                    placeholder="6.5"
                                />

                                <span>
                                    hours
                                </span>

                            </div>

                        </section>


                        <section className="checkin-card medication-section">

                            <div className="checkin-card-heading">

                                <div className="section-icon lavender-icon">
                                    +
                                </div>

                                <div>

                                    <p className="checkin-section-label">
                                        MEDICATION
                                    </p>

                                    <h2>
                                        Medication status
                                    </h2>

                                </div>

                            </div>


                            <label
                                className="checkin-input-label"
                                htmlFor="medicationStatus"
                            >
                                Today's status
                            </label>

                            <select
                                id="medicationStatus"
                                className="checkin-select"
                                value={medicationStatus}
                                onChange={(event) =>
                                    setMedicationStatus(
                                        event.target.value
                                    )
                                }
                            >

                                <option value="TAKEN">
                                    Taken
                                </option>

                                <option value="NOT_TAKEN">
                                    Not Taken
                                </option>

                                <option value="NOT_APPLICABLE">
                                    Not Applicable
                                </option>

                            </select>

                        </section>

                    </div>


                    {/* PHYSICAL FEELINGS */}

                    <section className="checkin-card physical-section">

                        <div className="checkin-card-heading">

                            <div className="section-icon sage-icon">
                                ✦
                            </div>

                            <div>

                                <p className="checkin-section-label">
                                    PHYSICAL WELLBEING
                                </p>

                                <h2>
                                    How does your body feel?
                                </h2>

                                <p>
                                    Select anything you're noticing today.
                                </p>

                            </div>

                        </div>


                        <div className="option-chip-grid">

                            {physicalFeelingOptions.map(
                                feeling => (

                                    <button
                                        key={feeling}
                                        type="button"
                                        className={
                                            physicalFeelings.includes(
                                                feeling
                                            )
                                                ? "option-chip physical-chip selected"
                                                : "option-chip physical-chip"
                                        }
                                        onClick={() =>
                                            togglePhysicalFeeling(
                                                feeling
                                            )
                                        }
                                    >
                                        {formatLabel(feeling)}
                                    </button>

                                )
                            )}

                        </div>

                    </section>


                    {/* NOTES */}

                    <section className="checkin-card notes-section">

                        <div className="checkin-card-heading">

                            <div className="section-icon coral-icon">
                                ✎
                            </div>

                            <div>

                                <p className="checkin-section-label">
                                    NOTES
                                </p>

                                <h2>
                                    Anything you'd like to remember?
                                </h2>

                                <p>
                                    This is optional. Write whatever
                                    feels useful to you.
                                </p>

                            </div>

                        </div>


                        <textarea
                            className="checkin-notes"
                            value={notes}
                            onChange={(event) =>
                                setNotes(
                                    event.target.value
                                )
                            }
                            rows={6}
                            placeholder="Write a note about today..."
                        />

                    </section>


                    {error && (

                        <div className="checkin-error">
                            {error}
                        </div>

                    )}


                    <div className="checkin-actions">

                        <button
                            type="button"
                            className="checkin-cancel-button"
                            onClick={() =>
                                navigate("/dashboard")
                            }
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="checkin-save-button"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : "Save Check-In"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default NewCheckInPage;