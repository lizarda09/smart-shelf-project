import React, {useState, useEffect} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {useHistory} from "react-router-dom";

export const RegisterPage = () => {
    const history = useHistory();
    const message = useMessage();
    const { loading, error, request, clearError } = useHttp();
    const [form, setForm] = useState({
        firstName: '', secondName: '', phone: '', email: '', password: ''
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    };
    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            history.push('/');
            console.log(data);
        } catch (e) {}
    };

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Smart Shelf</h1>
                <div className="card lime lighten-3">
                    <div className="card-content">
                        <span className="card-title">Регистрация</span>
                        <div>
                            <div className="input-field">
                                <input id="firstName" onChange={changeHandler} name="firstName" type="text" />
                                <label htmlFor="firstName">First name</label>
                            </div>
                            <div className="input-field">
                                <input id="secondName" onChange={changeHandler} name="secondName" type="text" />
                                <label htmlFor="secondName">Second name</label>
                            </div>
                            <div className="input-field">
                                <input id="phone" onChange={changeHandler} name="phone" type="text" />
                                <label htmlFor="phone">Phone</label>
                            </div>
                            <div className="input-field">
                                <input id="email" onChange={changeHandler} name="email" type="email" />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input id="password" onChange={changeHandler} name="password" type="password" />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn  lime darken-3" disabled={loading} onClick={registerHandler}>Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    )
}