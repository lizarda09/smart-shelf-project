import React, {useCallback, useContext, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";
import {RefreshProduct} from "../pages/RefreshProduct";
import {useMessage} from "../hooks/message.hook";

export const Shelf = ({ getShelvesList, shelvesArr }) => {
    const message = useMessage();
    const { request } = useHttp();
    const { token } = useContext(AuthContext);
    const history = useHistory();
    let [isShowRefresh, setShowRefresh] = useState(false);
    let [refreshedProd, setRefreshedProd] = useState(null);

    const deleteShelf = async event => {
        try {
            const idShelf = event.target.dataset.shelf;
            const product = await request(`/api/shelf/${idShelf}`, 'DELETE', null, {
                Authorization: `Bearer ${ token }`
            });
            getShelvesList();
        } catch (e){
            console.log(e);
        }
    };

    const openRefreshPage = event => {
        const idProduct = event.target.dataset.product;
        //history.push('/refreshProduct');
        setRefreshedProd(idProduct);
        setShowRefresh(true);
        console.log(idProduct)
    };


    if (!shelvesArr.length) {
        return <h3 className="center">Полок пока нет</h3>
    }

    return (
        <>
            <h3 className="center">Полки</h3>
            <table className="striped">
                <thead>
                <tr>
                    <th>Название</th>
                    <th>Продукты</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {/*{ products.map( product => {*/}
                {/*    return (*/}
                {/*        <tr key={product._id}>*/}
                {/*            <td>{product.name}</td>*/}
                {/*            <td>{product.count}</td>*/}
                {/*            <td>{product.price} гривен</td>*/}
                {/*            <td>{product.discount} гривен</td>*/}
                {/*            <td>{product.dateOfManufacture}</td>*/}
                {/*            <td>{product.shelfLife} часов</td>*/}
                {/*            <td><button data-product={product._id} className="btn" onClick={deleteProduct}>Удалить</button></td>*/}
                {/*            <td><button data-product={product._id} className="btn" onClick={openRefreshPage}>Обновить</button></td>*/}
                {/*            <td><button data-product={product._id} className="btn" onClick={checkDiscount}>Проверить скидку</button></td>*/}
                {/*        </tr>*/}
                {/*    )*/}
                {/*})}*/}
                </tbody>
            </table>
        </>
    )
}