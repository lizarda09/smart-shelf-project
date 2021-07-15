import React, {useState, useEffect, useContext} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const LoginPage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const message = useMessage();
    const { loading, error, request, clearError } = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    };
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId);
            history.push('/product');
        } catch (e) {}
    };

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Smart Shelf</h1>
                <div className="card light-green lighten-3">
                    <div className="card-content">
                        <span className="card-title">Вход</span>
                        <div>
                            <div className="input-field">
                                <input id="email" onChange={changeHandler} value={form.email} name="email" type="email" />
                                    <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input id="password" onChange={changeHandler} value={form.password} name="password" type="password" />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn light-green darken-3" disabled={loading} onClick={loginHandler}>Войти</button>
                        <NavLink to="/register"><button className="btn grey lighten-1 black-text" disabled={loading}>Регистрация</button></NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}