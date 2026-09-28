import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { apiRequest } from "../services/api";
import type { CheckIn } from "../types";

function CheckInHistoryPage() {

    const { profileId } = useParams();

    const navigate = useNavigate();

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

                const data: CheckIn[] =
                    await response.json();

                setCheckIns(data);

            } catch {

                setError(
                    "Something went wrong while loading check-ins."
                );

            } finally {

                setLoading(false);
            }
        }

        loadCheckIns();

    }, [profileId]);

    if (loading) {
        return <p>Loading check-ins...</p>;
    }

    return (
        <div>

            <h1>Check-In History</h1>

            <button
                onClick={() =>
                    navigate("/dashboard")
                }
            >
                Back to Dashboard
            </button>

            <br />
            <br />

            {error && (
                <p>{error}</p>
            )}

            {checkIns.length === 0 && !error ? (

                <div>

                    <p>
                        You have not completed any
                        check-ins yet.
                    </p>

                    <Link
                        to={`/check-in/${profileId}`}
                    >
                        Complete Your First Check-In
                    </Link>

                </div>

            ) : (

                <div>

                    {checkIns.map(checkIn => (

                        <div
                            key={checkIn.id}
                            style={{
                                border: "1px solid #ccc",
                                padding: "15px",
                                marginBottom: "15px"
                            }}
                        >

                            <h2>
                                {new Date(
                                    checkIn.createdAt
                                ).toLocaleString()}
                            </h2>

                            <p>
                                <strong>
                                    Sleep:
                                </strong>
                                {" "}
                                {checkIn.sleepHours !== null
                                    ? `${checkIn.sleepHours} hours`
                                    : "Not entered"}
                            </p>

                            <p>
                                <strong>
                                    Medication:
                                </strong>
                                {" "}
                                {checkIn.medicationStatus}
                            </p>

                            <p>
                                <strong>
                                    Moods:
                                </strong>
                                {" "}
                                {checkIn.moods.length > 0
                                    ? checkIn.moods.join(", ")
                                    : "None selected"}
                            </p>

                            <p>
                                <strong>
                                    Physical feelings:
                                </strong>
                                {" "}
                                {checkIn.physicalFeelings.length > 0
                                    ? checkIn.physicalFeelings.join(", ")
                                    : "None selected"}
                            </p>

                            <p>
                                <strong>
                                    Notes:
                                </strong>
                                {" "}
                                {checkIn.notes
                                    ? checkIn.notes
                                    : "No notes"}
                            </p>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

export default CheckInHistoryPage;