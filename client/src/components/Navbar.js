import React, {useContext} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    };

    return (
        <nav>
            <div className="nav-wrapper teal lighten-2">
                <a href="#" className="brand-logo center black-text">Smart Shelf</a>
                <ul className="left hide-on-med-and-down">
                    <li><NavLink to="/product"><span className="nav-bar-li">Продукты</span></NavLink></li>
                    <li><NavLink to="/user"><span className="nav-bar-li">Пользователи</span></NavLink></li>
                    <li><NavLink to="/shelf"><span className="nav-bar-li">Полки</span></NavLink></li>
                    <li><NavLink to="/sale"><span className="nav-bar-li">Продажи</span></NavLink></li>
                    <li><NavLink to="/statistic"><span className="nav-bar-li">Статистика</span></NavLink></li>
                    <li><a href="/" className="nav-bar-li" onClick={logoutHandler}>Выйти</a></li>
                </ul>
                <ul className="right hide-on-med-and-down">
                    <button className="btn">Ukr</button>
                    <button className="btn">Eng</button>
                </ul>
            </div>
        </nav>
    )
}