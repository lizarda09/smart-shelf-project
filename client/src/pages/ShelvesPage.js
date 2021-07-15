import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Shelf} from "../components/Shelf";
import {Loader} from "../components/Loader";
import {NavLink} from "react-router-dom";
import {useMessage} from "../hooks/message.hook";

export const ShelvesPage = () => {
    const message = useMessage();
    const { loading, error, request, clearError } = useHttp();
    const [ shelvesArr, setShelvesArr ] = useState([]);
    const { token } = useContext(AuthContext);


    const getShelvesList = useCallback(async () => {
        try {
            const shelvesList = await request('/api/shelf', 'GET', null, {
                Authorization: `Bearer ${ token }`
            });
            setShelvesArr(shelvesList.shelves);
            console.log(shelvesArr)
        } catch (e){
            console.log(e);
        }
    }, [token, request]);

    useEffect(() => {
        getShelvesList()
    }, [getShelvesList]);

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
                <NavLink to="/addShelf" ><button className="btn">Добавить полку</button></NavLink>
            </div>
            { !loading && shelvesArr && <Shelf getShelvesList={getShelvesList} shelvesArr={shelvesArr}/>}
        </>
    )
}