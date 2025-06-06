import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changePassword, clearError } from '../../store/authSlice'; // Імпортуємо action
import { RootState, AppDispatch } from '../../store/store'; // Імпортуємо RootState та AppDispatch
import { ChangePasswordRequest } from '../../types/auth'; // Імпортуємо оновлений тип

const ChangePasswordPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { isLoading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [localError, setLocalError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        // Очищаємо Redux помилку при завантаженні компонента
        dispatch(clearError());
        setLocalError(null);
        setSuccessMessage(null);
    }, [dispatch]);

    // Перенаправляємо, якщо користувач не автентифікований (якщо це сторінка зміни пароля для увійшовшого користувача)
    // Або якщо це сторінка скидання пароля, то логіка може бути іншою (наприклад, перевірка токена з URL)
    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            // Якщо це сторінка зміни пароля для увійшовшого користувача,
            // і він не автентифікований, перенаправляємо на логін.
            // Якщо це сторінка скидання пароля (після "забув пароль"),
            // то тут має бути логіка перевірки resetToken з URL.
            // Наразі ми припускаємо, що це для увійшовшого користувача.
            // navigate('/login');
        }
    }, [isAuthenticated, isLoading, navigate]);

    useEffect(() => {
        if (error) {
            setLocalError(error);
        } else {
            setLocalError(null);
        }
    }, [error]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);
        setSuccessMessage(null);
        dispatch(clearError());

        if (newPassword !== confirmNewPassword) {
            setLocalError('Новий пароль та підтвердження не співпадають.');
            return;
        }
        if (newPassword.length < 6) { // Приклад простої валідації
            setLocalError('Новий пароль має бути не менше 6 символів.');
            return;
        }

        const changePasswordData: ChangePasswordRequest = {
            oldPassword,
            newPassword,
        };

        try {
            const resultAction = await dispatch(changePassword(changePasswordData)).unwrap();
            setSuccessMessage(resultAction.message || 'Пароль успішно змінено!');
            setOldPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            // Можливо, перенаправити користувача або показати модальне вікно
            // navigate('/settings'); // Приклад перенаправлення
        } catch (err: any) {
            setLocalError(err || 'Не вдалося змінити пароль.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Змінити пароль</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="oldPassword" className="block text-gray-700 text-sm font-bold mb-2">
                            Старий пароль
                        </label>
                        <input
                            type="password"
                            id="oldPassword"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">
                            Новий пароль
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirmNewPassword" className="block text-gray-700 text-sm font-bold mb-2">
                            Підтвердіть новий пароль
                        </label>
                        <input
                            type="password"
                            id="confirmNewPassword"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    {localError && (
                        <p className="text-red-500 text-xs italic mb-4 text-center">{localError}</p>
                    )}
                    {successMessage && (
                        <p className="text-green-500 text-xs italic mb-4 text-center">{successMessage}</p>
                    )}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Зміна...' : 'Змінити пароль'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
