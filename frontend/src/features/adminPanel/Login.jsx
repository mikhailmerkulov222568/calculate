import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearRegisterErrors, loginUser } from "../../store/actions/usersActions";
import '../../components/styles/Register.css';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.users.loginError);
    const loading = useSelector(state => state.users.loginLoading);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [localError, setLocalError] = useState(null);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

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

    const submitFormHandler = async e => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(loginUser({ ...user }));

            if (resultAction && resultAction.payload) {
                if (resultAction.payload.error) {
                    setLocalError(resultAction.payload.error);
                } else {
                    navigate('/'); // Переход на главную страницу только если нет ошибки
                }
            } else {
                setLocalError('Не удалось выполнить вход.');
            }
        } catch (e) {
            setLocalError(e.message || 'Ошибка входа');
        }
    };

    return (
        <div className="register-container">
            <h1 className="register-title">Login</h1>
            {/* Отображаем ошибки из глобального состояния или локальные ошибки */}
            {error && <p className="register-error">{error.error}</p>}
            {localError && <p className="register-error">{localError}</p>}
            <br/>
            <form onSubmit={submitFormHandler} className="register-form">
                <input
                    type="email"
                    value={user.email}
                    onChange={inputChangeHandler}
                    name='email'
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
                <button type="submit" disabled={loading}
                        className="register-button">
                    {loading ? 'Loading...' : 'Login'}
                </button>
                <Link to="/register" style={{ margin: '10px 30px' }}>
                    Зарегистрироваться
                </Link>
            </form>
        </div>
    );
};

export default Login;
