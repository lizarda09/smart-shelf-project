import React, {useContext, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";

export const AddSale = () => {
    const history = useHistory();
    const [form, setForm] = useState({
        name: '', count: ''
    });
    const { token } = useContext(AuthContext);
    const { loading, error, request, clearError } = useHttp();

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    };

    const addSaleHandler = async () => {
        try {
            const sale = await request('/api/sale/add', 'PUT', {...form}, {
                Authorization: `Bearer ${ token }`
            });
            console.log(sale);
            history.push('/sale');
        } catch (e) {}
    };

    return (
        <div className="row">
            <div className="col s8 offset-s2">
                <h3 className="center">Введите данные о новой продаже</h3>
                <div className="card blue-grey lighten-5">
                    <div className="card-content">
                        <div>
                            <div className="input-field">
                                <input id="name" onChange={changeHandler} name="name" type="text" />
                                <label htmlFor="name">Название</label>
                            </div>
                            <div className="input-field">
                                <input id="count" onChange={changeHandler} name="count" type="text" />
                                <label htmlFor="count">Количество</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn blue-grey darken-2" onClick={addSaleHandler} >Добавить</button>
                    </div>
                </div>
            </div>
        </div>
    )
}