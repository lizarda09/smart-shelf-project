import React, {useCallback, useContext, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";
import {RefreshProduct} from "../pages/RefreshProduct";
import {useMessage} from "../hooks/message.hook";

export const Products = ({ products, getProductsList }) => {
    const message = useMessage();
    const { request } = useHttp();
    const { token } = useContext(AuthContext);
    const history = useHistory();
    let [isShowRefresh, setShowRefresh] = useState(false);
    let [refreshedProd, setRefreshedProd] = useState(null);
    let [refreshedProdName, setRefreshedProdName] = useState(null);

    const deleteProduct = async event => {
        try {
            const idProduct = event.target.dataset.product;
            const product = await request(`/api/product/${idProduct}`, 'DELETE', null, {
             Authorization: `Bearer ${ token }`
            });
            getProductsList();
            message("Продукт добавлен!")
        } catch (e){
            console.log(e);
        }
    };

    const openRefreshPage = event => {
        const idProduct = event.target.dataset.product;
        const productName = event.target.dataset.name;
        //history.push('/refreshProduct');
        setRefreshedProd(idProduct);
        setShowRefresh(true);
        setRefreshedProdName(productName);
        console.log(idProduct)
        console.log(productName)
    };

    const checkDiscount = async event => {
        try {
            const idProduct = event.target.dataset.product;
            const product = await request(`/api/product/${idProduct}/checkDiscount`, 'POST', null, {
                Authorization: `Bearer ${ token }`
            });
            message(product.message);
            getProductsList();
        } catch (e){
            console.log(e);
        }
    };

    if (!products.length) {
        return <h3 className="center">Продуктов пока нет</h3>
    }

    return (
        <>
            <h3 className="center">Продукты</h3>
            <table className="striped">
                <thead>
                <tr>
                    <th>Наименование</th>
                    <th>Кол-во</th>
                    <th>Цена</th>
                    <th>Скидка</th>
                    <th>Дата производства</th>
                    <th>Срок хранения</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                { products.map( product => {
                    return (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.count}</td>
                            <td>{product.price} гривен</td>
                            <td>{product.discount} гривен</td>
                            <td>{product.dateOfManufacture}</td>
                            <td>{product.shelfLife} часов</td>
                            <td><button data-product={product._id} className="btn" onClick={deleteProduct}>Удалить</button></td>
                            <td><button data-product={product._id}
                                        data-name={product.name}
                                        data-count={product.count}
                                        data-price={product.price}
                                        className="btn" onClick={openRefreshPage}>Обновить</button></td>
                            <td><button data-product={product._id} className="btn" onClick={checkDiscount}>Проверить скидку</button></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            {isShowRefresh && <RefreshProduct getProductsList={getProductsList}
                                              refreshedProd={refreshedProd}
                                              setShowRefresh={setShowRefresh}
                                              refreshedProdName={refreshedProdName}
            />}
        </>
    )
}