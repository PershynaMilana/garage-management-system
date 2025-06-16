import { useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts";
import { useDispatch } from 'react-redux'; 
import { validateCurrentToken } from './store/authSlice'; 
import { AppDispatch } from './store/store'; 

import LoginPage from "./pages/auth/LoginPage.tsx";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import NotFoundPage from "./pages/not-found/NotFoundPage.tsx";
import ForgotPasswordPage from "./pages/reset-password/ForgotPasswordPage.tsx";
import ChangePasswordPage from "./pages/reset-password/ChangePasswordPage.tsx";
import MainPage from "./pages/main-page/MainPage.tsx";
import SettingsPage from "./pages/settings/SettingsPage.tsx";
import StatisticsPage from "./pages/statistics/StatisticsPage.tsx";
import TermsOfUsePage from "./pages/terms-of-use/TermsOfUsePage.tsx";
import PrivacyPolicyPage from "./pages/privacy-policy/PrivacyPolicyPage.tsx";
import CookiePolicyPage from "./pages/cookie-policy/CookiePolicyPage.tsx";
import GarageManagementPage from "./pages/garage-managment/GarageManagementPage.tsx"; 

import ProtectedRoute from './components/auth/ProtectedRoute'; 

function App() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(validateCurrentToken());
    }, [dispatch]);

    return (
        <>
            <ThemeProvider>
                <Routes>
                    {/* Публічні маршрути (доступні всім) */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    {/* ChangePasswordPage може бути як публічною (для скидання за токеном), так і захищеною (для зміни пароля увійшовшого користувача) */}
                    {/* Наразі ми залишаємо її публічною, оскільки вона може використовуватися для потоку "забув пароль" */}
                    <Route path="/change-password" element={<ChangePasswordPage />} />

                    <Route path="/terms-of-use" element={<TermsOfUsePage />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                    <Route path="/cookie-policy" element={<CookiePolicyPage />} />

                    {/* Захищені маршрути (доступні лише автентифікованим користувачам) */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<Navigate to="/main-page" replace />} /> {/* Перенаправлення з кореня */}
                        <Route path="/main-page" element={<MainPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/statistics" element={<StatisticsPage />} />
                        <Route path="/garage-management" element={<GarageManagementPage />} /> {/* Додано захищений маршрут для GarageManagementPage */}
                    </Route>

                    {/* Маршрут 404 (завжди доступний) */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </ThemeProvider>
        </>
    );
}

export default App;
