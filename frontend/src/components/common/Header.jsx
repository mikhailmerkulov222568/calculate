import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../store/actions/usersActions";
import "./../styles/Header.css";

function Header() {
    const user = useSelector((state) => state.users.user);
    const dispatch = useDispatch();

    return (
        <header className="header-container">
            <div className="header-content">
                <div className="logo-section">
                    <Link to="/" className="logo-link">
                        Калькулятор
                    </Link>
                </div>
                <nav className="nav-section">

                </nav>
                <div className="user-section">
                    {user ? (
                        <>
                            {user && user.role === 'admin' && (
                                <Link to="/admin" className="nav-link">Администратор</Link>
                            )}
                            <button className="logout-button" onClick={() => dispatch(logoutUser())}>
                                Выйти
                            </button>

                        </>

                    ) : (
                        <div className="auth-links">
                            <Link to="/login" className="auth-link">Войти</Link>
                            <Link to="/register" className="auth-link">Зарегистрироваться</Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
