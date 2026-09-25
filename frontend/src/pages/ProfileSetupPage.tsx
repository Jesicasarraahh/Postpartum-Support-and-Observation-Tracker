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

        } finally {
            setSaving(false);
        }
    }

    return (
        <div>

            <h1>Create Postpartum Profile</h1>

            <p>
                Enter your delivery date to begin
                your postpartum check-ins.
            </p>

            <form onSubmit={handleSubmit}>

                <div>

                    <label htmlFor="deliveryDate">
                        Delivery Date
                    </label>

                    <br />

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

                </div>

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
                        : "Create Profile"}
                </button>

            </form>

            <br />

            <button
                onClick={() =>
                    navigate("/dashboard")
                }
            >
                Back
            </button>

        </div>
    );
}

export default ProfileSetupPage;