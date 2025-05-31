import {Routes, Route, Navigate} from 'react-router-dom';
import {ThemeProvider} from "./contexts";

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




function App() {
    return (
        <>
            <ThemeProvider>
                <Routes>
                    <Route path="/" element={<Navigate to="/main-page" replace/>}/>

                    {/* auth */}
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/signup" element={<RegisterPage/>}/>
                    <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
                    <Route path="/change-password" element={<ChangePasswordPage/>}/>

                    {/* settings */}
                    <Route path="/settings" element={<SettingsPage/>}/>

                    {/* main (users crud) */}
                    <Route path="/main-page" element={<MainPage/>}/>

                    {/* statistics */}
                    <Route path="/statistics" element={<StatisticsPage/>}/>

                    {/* terms of use */}
                    <Route path="/terms-of-use" element={<TermsOfUsePage/>}/>

                    {/* privacy policy */}
                    <Route path="/privacy-policy" element={<PrivacyPolicyPage/>}/>

                    {/* statistics */}
                    <Route path="/cookie-policy" element={<CookiePolicyPage/>}/>

                    {/* 404 */}
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </ThemeProvider>
        </>
    );
}

export default App;