import React, {useCallback, useContext, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const Sales = ({ salesArr, getSalesList }) => {
    const { request } = useHttp();
    const { token } = useContext(AuthContext);


    if (!salesArr.length) {
        return <h3 className="center">Продаж пока нет</h3>
    }

    return (
        <>
                <h3 className="center">Продажи</h3>
                <table className="striped">
                    <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Кол-во</th>
                        <th>Дата продажи</th>
                    </tr>
                    </thead>
                    <tbody>
                    { salesArr.map( sale => {
                        return (
                            <tr key={sale._id}>
                                <td>{sale.name}</td>
                                <td>{sale.count}</td>
                                <td>{sale.purchaseDate}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
        </>
    )
}