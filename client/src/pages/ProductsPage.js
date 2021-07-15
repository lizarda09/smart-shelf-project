import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Products} from "../components/Products";
import {Loader} from "../components/Loader";
import {NavLink} from "react-router-dom";
import {useMessage} from "../hooks/message.hook";

export const ProductsPage = () => {
    const message = useMessage();
    const { loading, error, request, clearError } = useHttp();
    const [ productsArr, setProductsArr ] = useState([]);
    const { token } = useContext(AuthContext);


    const getProductsList = useCallback(async () => {
        try {
            const productList = await request('/api/product', 'GET', null, {
                Authorization: `Bearer ${ token }`
            });
            setProductsArr(productList.products);
            console.log(productsArr)
        } catch (e){
            console.log(e);
        }
    }, [token, request]);

    useEffect(() => {
        getProductsList()
    }, [getProductsList]);

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
                   <NavLink to="/addProduct" ><button className="btn add-product-btn">Добавить продукт</button></NavLink>
               </div>
               { !loading && productsArr && <Products products={productsArr} getProductsList={getProductsList}/>}
           </>
       )
}