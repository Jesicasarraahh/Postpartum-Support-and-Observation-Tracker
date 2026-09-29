import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useSearchParams } from "react-router-dom";

import { apiRequest } from "../services/api";

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

    const [observerConcerned, setObserverConcerned] =
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

                const data: TrustedAccess =
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
            <p>
                Opening trusted-circle invitation...
            </p>
        );
    }


    if (error && !access) {

        return (
            <div>

                <h1>
                    Trusted Circle
                </h1>

                <p>
                    {error}
                </p>

            </div>
        );
    }


    return (
        <div>

            <h1>
                Trusted Circle Observation
            </h1>

            {access && (

                <div>

                    <p>
                        Welcome,{" "}
                        <strong>
                            {access.name}
                        </strong>
                    </p>

                    <p>
                        Relationship:{" "}
                        {access.relationship}
                    </p>

                </div>
            )}


            <p>
                Use this form to record something
                you personally observed.
            </p>


            <form onSubmit={handleSubmit}>

                <div>

                    <label>
                        Observation Category
                    </label>

                    <br />

                    <select
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


                <br />


                <div>

                    <label>
                        What did you observe?
                    </label>

                    <br />

                    <textarea
                        rows={6}
                        cols={45}
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


                <br />


                <div>

                    <label>
                        When did you observe this?
                    </label>

                    <br />

                    <input
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


                <br />


                <label>

                    <input
                        type="checkbox"
                        checked={observerConcerned}
                        onChange={(event) =>
                            setObserverConcerned(
                                event.target.checked
                            )
                        }
                    />

                    {" "}
                    I am concerned about this observation

                </label>


                <br />
                <br />


                <button
                    type="submit"
                    disabled={saving}
                >
                    {saving
                        ? "Submitting..."
                        : "Submit Observation"}
                </button>

            </form>


            {message && (
                <p>
                    {message}
                </p>
            )}

            {error && (
                <p>
                    {error}
                </p>
            )}

        </div>
    );
}

export default TrustedAccessPage;