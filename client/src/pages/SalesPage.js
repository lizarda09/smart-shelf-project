import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {NavLink} from "react-router-dom";
import {useMessage} from "../hooks/message.hook";
import {Sales} from "../components/Sales";

export const SalesPage = () => {
    const message = useMessage();
    const { loading, error, request, clearError } = useHttp();
    const [ salesArr, setSalesArr ] = useState([]);
    const { token } = useContext(AuthContext);


    const getSalesList = useCallback(async () => {
        try {
            const salesList = await request('/api/sale', 'GET', null, {
                Authorization: `Bearer ${ token }`
            });
            setSalesArr(salesList.sales);
            console.log(salesArr);
        } catch (e){
            console.log(e);
        }
    }, [token, request]);

    useEffect(() => {
        getSalesList()
    }, [getSalesList]);

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <div className="center">
                <NavLink to="/addSale" ><button className="btn center add-product-btn">Добавить продажу</button></NavLink>
            </div>
            { !loading && salesArr && <Sales salesArr={salesArr} getSalesList={getSalesList}/>}
        </>
    )
}