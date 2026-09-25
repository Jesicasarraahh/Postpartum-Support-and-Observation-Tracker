import { useNavigate } from "react-router-dom";
import { removeToken } from "../auth/token";

function DashboardPage() {

    const navigate = useNavigate();

    function handleLogout() {
        removeToken();
        navigate("/login");
    }

    return (
        <div>
            <h1>Mother Dashboard</h1>

            <p>Welcome to your postpartum support space.</p>

            <button onClick={handleLogout}>
                Log Out
            </button>
        </div>
    );
}

export default DashboardPage;