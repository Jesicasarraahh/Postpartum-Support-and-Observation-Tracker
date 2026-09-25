import {
    BrowserRouter,
    Navigate,
    Route,
    Routes
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileSetupPage
    from "./pages/ProfileSetupPage";

import NewCheckInPage
    from "./pages/NewCheckInPage";

function App() {

    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route
    path="/profile/setup"
    element={
        <ProtectedRoute>
            <ProfileSetupPage />
        </ProtectedRoute>
    }
/>

<Route
    path="/check-in/:profileId"
    element={
        <ProtectedRoute>
            <NewCheckInPage />
        </ProtectedRoute>
    }
/>

            </Routes>
        </BrowserRouter>
    );
}

export default App;