import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearRegisterErrors, registerUser } from "../../store/actions/usersActions";
import '../../components/styles/Register.css';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.users.registerError);
    const loading = useSelector(state => state.users.registerLoading);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: '',
        displayName: '',
    });
    const [localError, setLocalError] = useState(null); // Состояние для хранения локальной ошибки
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        return () => {
            dispatch(clearRegisterErrors());
            setLocalError(null);
        };
    }, [dispatch]);

    const inputChangeHandler = e => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const submitFormHandler = async e => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(registerUser({ ...user }));

            if (resultAction && resultAction.payload) {
                if (resultAction.payload.error) {
                    setLocalError(resultAction.payload.error);
                } else {
                    navigate('/'); // Переход на главную страницу только если нет ошибки
                }
            } else {
                setLocalError('Не удалось выполнить регистрацию.');
            }
        } catch (e) {
            setLocalError(e.message || 'Ошибка регистрации');
        }
    };

    return (
        <div className="register-container">
            <h1 className="register-title">Register</h1>
            {/* Отображаем ошибки из глобального состояния или локальные ошибки */}
            {error && <p className="register-error">{error.error}</p>}
            {localError && <p className="register-error">{localError}</p>}
            <form onSubmit={submitFormHandler} className="register-form">
                <input
                    type="text"
                    name="displayName"
                    value={user.displayName}
                    onChange={inputChangeHandler}
                    placeholder="Username"
                    className="register-input"
                />
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={inputChangeHandler}
                    placeholder="Email"
                    className="register-input"
                />
                <div className="password-container">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={user.password}
                        onChange={inputChangeHandler}
                        placeholder="Password"
                        className="register-input"
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="password-toggle-button"
                    >
                        {showPassword ? '🔓' : '🔒'}
                    </button>
                </div>
                <button type="submit" className="register-button" disabled={loading}>
                    {loading ? 'Loading...' : 'Register'}
                </button>
                <Link to="/login" style={{ margin: '10px 30px' }}>
                    Войти
                </Link>
            </form>
        </div>
    );
};

export default Register;
