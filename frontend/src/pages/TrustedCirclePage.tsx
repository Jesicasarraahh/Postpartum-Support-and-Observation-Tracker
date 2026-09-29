import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import { apiRequest } from "../services/api";

import type {
    TrustedCircleMember
} from "../types";

function TrustedCirclePage() {

    const { profileId } = useParams();

    const navigate = useNavigate();

    const [members, setMembers] =
        useState<TrustedCircleMember[]>([]);

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [relationship, setRelationship] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);


    async function loadMembers() {

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
                    `/api/postpartum-profiles/${profileId}/trusted-circle`
                );

            if (!response.ok) {

                setError(
                    "Could not load trusted circle."
                );

                return;
            }

            const data:
                TrustedCircleMember[] =
                    await response.json();

            setMembers(data);

        } catch {

            setError(
                "Something went wrong while loading your trusted circle."
            );

        } finally {

            setLoading(false);
        }
    }


    useEffect(() => {
        loadMembers();
    }, [profileId]);


    async function handleSubmit(
        event: FormEvent
    ) {

        event.preventDefault();

        if (!profileId) {
            return;
        }

        setError("");
        setSaving(true);

        try {

            const response =
                await apiRequest(
                    `/api/postpartum-profiles/${profileId}/trusted-circle`,
                    {
                        method: "POST",

                        body: JSON.stringify({
                            name,
                            email,
                            relationship
                        })
                    }
                );

            if (!response.ok) {

                setError(
                    "Could not add trusted person."
                );

                return;
            }

            setName("");
            setEmail("");
            setRelationship("");

            await loadMembers();

        } catch {

            setError(
                "Something went wrong while adding the trusted person."
            );

        } finally {

            setSaving(false);
        }
    }


    if (loading) {

        return (
            <p>
                Loading trusted circle...
            </p>
        );
    }


    return (
        <div>

            <h1>
                Trusted Circle
            </h1>

            <p>
                Add the people you trust to support
                your postpartum journey.
            </p>


            <button
                onClick={() =>
                    navigate("/dashboard")
                }
            >
                Back to Dashboard
            </button>


            <br />
            <br />


            <section>

                <h2>
                    Add Trusted Person
                </h2>

                <form onSubmit={handleSubmit}>

                    <div>

                        <label>
                            Name
                        </label>

                        <br />

                        <input
                            type="text"
                            value={name}
                            onChange={(event) =>
                                setName(
                                    event.target.value
                                )
                            }
                            required
                        />

                    </div>


                    <br />


                    <div>

                        <label>
                            Email
                        </label>

                        <br />

                        <input
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }
                            required
                        />

                    </div>


                    <br />


                    <div>

                        <label>
                            Relationship
                        </label>

                        <br />

                        <select
                            value={relationship}
                            onChange={(event) =>
                                setRelationship(
                                    event.target.value
                                )
                            }
                            required
                        >

                            <option value="">
                                Select relationship
                            </option>

                            <option value="Partner">
                                Partner
                            </option>

                            <option value="Parent">
                                Parent
                            </option>

                            <option value="Sibling">
                                Sibling
                            </option>

                            <option value="Friend">
                                Friend
                            </option>

                            <option value="Other">
                                Other
                            </option>

                        </select>

                    </div>


                    <br />


                    <button
                        type="submit"
                        disabled={saving}
                    >
                        {saving
                            ? "Adding..."
                            : "Add to Trusted Circle"}
                    </button>

                </form>

            </section>


            <br />


            {error && (
                <p>
                    {error}
                </p>
            )}


            <section>

                <h2>
                    Your Trusted Circle
                </h2>


                {members.length === 0 ? (

                    <p>
                        You have not added anyone yet.
                    </p>

                ) : (

                    <div>

                        {members.map(member => (

                            <div
                                key={member.id}
                            >

                                <h3>
                                    {member.name}
                                </h3>

                                <p>
                                    {member.relationship}
                                </p>

                                <p>
                                    {member.email}
                                </p>

                                <br />

                            </div>

                        ))}

                    </div>
                )}

            </section>

        </div>
    );
}

export default TrustedCirclePage;