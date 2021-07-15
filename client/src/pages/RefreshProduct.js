import React, {useContext, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";

export const RefreshProduct = ({ refreshedProdName, refreshedProd, getProductsList, setShowRefresh }) => {
    const history = useHistory();
    const [form, setForm] = useState({
        name: '', price: '', count: '', discount: ''
    });
    const { token } = useContext(AuthContext);
    const { request } = useHttp();

    console.log(refreshedProd);

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    };

    const refreshProductHandler = async () => {
        try {
            const product = await request(`/api/product/${refreshedProd}`, 'PUT', form, {
                Authorization: `Bearer ${ token }`
            });
            getProductsList();
            console.log(product);
        } catch (e) {

        }
    };

    return (
        <div className="row">
            <div className="col s8 offset-s2">
                <h3 className="center">Обновите данные о продукте {refreshedProdName}</h3>
                <div className="card  light-green lighten-3">
                    <div className="card-content z-depth-5">
                        <div>
                            <div className="input-field">
                                <input id="name" onChange={changeHandler} name="name" type="text" />
                                <label htmlFor="name">Название</label>
                            </div>
                            <div className="input-field">
                                <input id="price" onChange={changeHandler} name="price" type="text" />
                                <label htmlFor="price">Цена</label>
                            </div>
                            <div className="input-field">
                                <input id="count" onChange={changeHandler} name="count" type="text" />
                                <label htmlFor="count">Количество</label>
                            </div>
                            <div className="input-field">
                                <input id="discount" onChange={changeHandler} name="discount" type="text" />
                                <label htmlFor="discount">Скидка</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn light-green darken-3 btn-add-product" onClick={refreshProductHandler} >Обновить</button>
                        <button className="btn light-green darken-1 right btn-add-product" >Скрыть</button>
                    </div>
                </div>
            </div>
        </div>
    )
}