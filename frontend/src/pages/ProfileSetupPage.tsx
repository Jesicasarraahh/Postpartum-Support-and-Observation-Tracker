import {
    useState
} from "react";

import type {
    FormEvent
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    apiRequest
} from "../services/api";

import "../styles/profileSetup.css";


function ProfileSetupPage() {

    const navigate = useNavigate();

    const [deliveryDate, setDeliveryDate] =
        useState("");

    const [error, setError] =
        useState("");

    const [saving, setSaving] =
        useState(false);


    async function handleSubmit(
        event: FormEvent
    ) {

        event.preventDefault();

        setError("");
        setSaving(true);

        try {

            const response =
                await apiRequest(
                    "/api/postpartum-profiles",
                    {
                        method: "POST",

                        body: JSON.stringify({
                            deliveryDate
                        })
                    }
                );

            if (!response.ok) {

                setError(
                    "Could not create postpartum profile."
                );

                return;
            }

            navigate("/dashboard");

        } catch {

            setError(
                "Something went wrong while creating your profile."
            );

        } finally {

            setSaving(false);
        }
    }


    return (
        <div className="profile-setup-page">

            <div className="profile-setup-container">


                <section className="profile-setup-card">


                    <button
                        type="button"
                        className="profile-setup-back"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        ← Back
                    </button>


                    <div className="profile-setup-heading">

                        <div className="profile-setup-icon">
                            ♡
                        </div>

                        <p className="profile-setup-eyebrow">
                            YOUR POSTPARTUM JOURNEY
                        </p>

                        <h1>
                            Create Your Postpartum Profile
                        </h1>

                        <p>
                            Add your delivery date so your
                            check-ins and postpartum timeline
                            can be organized around your journey.
                        </p>

                    </div>


                    <form
                        className="profile-setup-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="profile-setup-field">

                            <label htmlFor="deliveryDate">
                                Delivery Date
                            </label>

                            <input
                                id="deliveryDate"
                                type="date"
                                value={deliveryDate}
                                onChange={(event) =>
                                    setDeliveryDate(
                                        event.target.value
                                    )
                                }
                                required
                            />

                            <p className="profile-setup-help">
                                This date helps organize your
                                postpartum check-ins and timeline.
                            </p>

                        </div>


                        {error && (

                            <div className="profile-setup-error">
                                {error}
                            </div>

                        )}


                        <button
                            type="submit"
                            className="profile-setup-submit"
                            disabled={saving}
                        >
                            {saving
                                ? "Creating Profile..."
                                : "Create Profile"}
                        </button>

                    </form>


                    <div className="profile-setup-info">

                        <div className="profile-setup-info-icon">
                            ✦
                        </div>

                        <p>
                            You’ll be able to record check-ins,
                            invite trusted people, and view your
                            combined timeline after setup.
                        </p>

                    </div>


                </section>

            </div>

        </div>
    );
}

export default ProfileSetupPage;