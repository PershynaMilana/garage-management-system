import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./pages/auth/LoginPage.tsx";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import NotFoundPage from "./pages/not-found/NotFoundPage.tsx";
import ForgotPasswordPage from "./pages/reset-password/ForgotPasswordPage.tsx";
import ChangePasswordPage from "./pages/reset-password/ChangePasswordPage.tsx";
import MainPage from "./pages/main-page/MainPage.tsx";


function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/main-page" replace />} />

                {/* auth */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/change-password" element={<ChangePasswordPage />} />

                {/* main */}
                <Route path="/main-page" element={<MainPage />} />

                {/* 404 */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
}

export default App;