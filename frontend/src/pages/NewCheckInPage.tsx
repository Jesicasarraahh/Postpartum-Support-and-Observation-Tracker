import {
    useState
} from "react";

import type {
    FormEvent
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    apiRequest
} from "../services/api";

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
        <div>

            <h1>New Check-In</h1>

            <form onSubmit={handleSubmit}>

                <section>

                    <h2>How are you feeling?</h2>

                    {moodOptions.map(
                        mood => (
                            <label
                                key={mood}
                                style={{
                                    display: "block"
                                }}
                            >

                                <input
                                    type="checkbox"
                                    checked={
                                        moods.includes(
                                            mood
                                        )
                                    }
                                    onChange={() =>
                                        toggleMood(
                                            mood
                                        )
                                    }
                                />

                                {" "}
                                {mood}

                            </label>
                        )
                    )}

                </section>

                <br />

                <section>

                    <h2>Sleep</h2>

                    <label>
                        Hours of sleep:
                    </label>

                    <br />

                    <input
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
                    />

                </section>

                <br />

                <section>

                    <h2>Medication</h2>

                    <select
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

                <br />

                <section>

                    <h2>Physical Feelings</h2>

                    {physicalFeelingOptions.map(
                        feeling => (
                            <label
                                key={feeling}
                                style={{
                                    display: "block"
                                }}
                            >

                                <input
                                    type="checkbox"
                                    checked={
                                        physicalFeelings
                                            .includes(
                                                feeling
                                            )
                                    }
                                    onChange={() =>
                                        togglePhysicalFeeling(
                                            feeling
                                        )
                                    }
                                />

                                {" "}
                                {feeling}

                            </label>
                        )
                    )}

                </section>

                <br />

                <section>

                    <h2>Notes</h2>

                    <textarea
                        value={notes}
                        onChange={(event) =>
                            setNotes(
                                event.target.value
                            )
                        }
                        rows={5}
                        cols={40}
                        placeholder="Optional notes..."
                    />

                </section>

                <br />

                {error && (
                    <p>{error}</p>
                )}

                <button
                    type="submit"
                    disabled={saving}
                >
                    {saving
                        ? "Saving..."
                        : "Save Check-In"}
                </button>

            </form>

            <br />

            <button
                onClick={() =>
                    navigate("/dashboard")
                }
            >
                Cancel
            </button>

        </div>
    );
}

export default NewCheckInPage;