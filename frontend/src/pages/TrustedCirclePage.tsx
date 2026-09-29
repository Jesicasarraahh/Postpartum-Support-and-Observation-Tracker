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

import "../styles/trustedCircle.css";


function TrustedCirclePage() {

    const { profileId } =
        useParams();

    const navigate =
        useNavigate();

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

    const [message, setMessage] =
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
                    "Could not load your trusted circle."
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
        setMessage("");
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
                    "Could not add this person to your trusted circle."
                );

                return;
            }

            setName("");
            setEmail("");
            setRelationship("");

            setMessage(
                "Invitation sent successfully."
            );

            await loadMembers();

        } catch {

            setError(
                "Something went wrong while sending the invitation."
            );

        } finally {

            setSaving(false);
        }
    }


    if (loading) {

        return (
            <div className="trusted-loading">
                Loading your trusted circle...
            </div>
        );
    }


    return (
        <div className="trusted-page">

            <div className="trusted-container">


                {/* HEADER */}

                <header className="trusted-header">

                    <button
                        type="button"
                        className="trusted-back-button"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        ← Back
                    </button>


                    <div className="trusted-heading">

                        <p className="trusted-eyebrow">
                            YOUR SUPPORT SYSTEM
                        </p>

                        <h1>
                            Trusted Circle
                        </h1>

                        <p>
                            Invite the people you trust
                            to support your postpartum journey
                            and share observations with you.
                        </p>

                    </div>

                </header>


                {/* PAGE GRID */}

                <div className="trusted-grid">


                    {/* INVITE FORM */}

                    <section className="trusted-invite-card">

                        <div className="trusted-card-heading">

                            <div className="trusted-heading-icon">
                                +
                            </div>

                            <div>

                                <p className="trusted-card-label">
                                    INVITE SOMEONE
                                </p>

                                <h2>
                                    Add to your circle
                                </h2>

                                <p>
                                    They'll receive an email
                                    with their personal access link.
                                </p>

                            </div>

                        </div>


                        <form
                            className="trusted-form"
                            onSubmit={handleSubmit}
                        >

                            <div className="trusted-field">

                                <label htmlFor="trustedName">
                                    Name
                                </label>

                                <input
                                    id="trustedName"
                                    type="text"
                                    value={name}
                                    onChange={(event) =>
                                        setName(
                                            event.target.value
                                        )
                                    }
                                    placeholder="e.g. Daniel"
                                    required
                                />

                            </div>


                            <div className="trusted-field">

                                <label htmlFor="trustedEmail">
                                    Email
                                </label>

                                <input
                                    id="trustedEmail"
                                    type="email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(
                                            event.target.value
                                        )
                                    }
                                    placeholder="name@example.com"
                                    required
                                />

                            </div>


                            <div className="trusted-field">

                                <label htmlFor="relationship">
                                    Relationship
                                </label>

                                <select
                                    id="relationship"
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


                            {message && (
                                <div className="trusted-success">
                                    {message}
                                </div>
                            )}


                            {error && (
                                <div className="trusted-error">
                                    {error}
                                </div>
                            )}


                            <button
                                type="submit"
                                className="trusted-submit-button"
                                disabled={saving}
                            >
                                {saving
                                    ? "Sending Invitation..."
                                    : "Send Invitation"}
                            </button>

                        </form>

                    </section>


                    {/* MEMBER LIST */}

                    <section className="trusted-members-card">

                        <div className="trusted-members-heading">

                            <div>

                                <p className="trusted-card-label">
                                    YOUR CIRCLE
                                </p>

                                <h2>
                                    People supporting you
                                </h2>

                            </div>


                            <span className="trusted-count">
                                {members.length}
                                {" "}
                                {members.length === 1
                                    ? "person"
                                    : "people"}
                            </span>

                        </div>


                        {members.length === 0 ? (

                            <div className="trusted-empty">

                                <div className="trusted-empty-icon">
                                    ◌
                                </div>

                                <h3>
                                    Your circle is empty
                                </h3>

                                <p>
                                    Add someone you trust
                                    using the invitation form.
                                </p>

                            </div>

                        ) : (

                            <div className="trusted-member-list">

                                {members.map(
                                    (member, index) => (

                                        <article
                                            key={member.id}
                                            className={
                                                index % 3 === 0
                                                    ? "trusted-member member-lavender"
                                                    : index % 3 === 1
                                                        ? "trusted-member member-peach"
                                                        : "trusted-member member-sage"
                                            }
                                        >

                                            <div className="member-avatar">
                                                {member.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>


                                            <div className="member-info">

                                                <h3>
                                                    {member.name}
                                                </h3>

                                                <span className="relationship-badge">
                                                    {member.relationship}
                                                </span>

                                                <p>
                                                    {member.email}
                                                </p>

                                            </div>


                                            <div className="member-status">

                                                <span className="status-dot">
                                                </span>

                                                Invited

                                            </div>

                                        </article>

                                    )
                                )}

                            </div>

                        )}

                    </section>

                </div>


                {/* INFO CARD */}

                <section className="trusted-info-card">

                    <div className="trusted-info-icon">
                        ♡
                    </div>

                    <div>

                        <h3>
                            How Trusted Circle works
                        </h3>

                        <p>
                            Each person you invite receives
                            their own access link. They can
                            record what they personally observe,
                            and those observations can appear
                            alongside your check-ins in your
                            combined timeline.
                        </p>

                    </div>

                </section>


            </div>

        </div>
    );
}

export default TrustedCirclePage;