import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {NavLink} from "react-router-dom";
import {Users} from "../components/Users";
import {useMessage} from "../hooks/message.hook";

export const UsersPage = () => {
    const message = useMessage();
    const { request, loading } = useHttp();
    const [ usersArr, setUsersArr ] = useState([]);
    const { token } = useContext(AuthContext);


    const getUsersList = useCallback(async () => {
        try {
            const userList = await request('/api/user', 'GET', null, {
                Authorization: `Bearer ${ token }`
            });
            setUsersArr(userList.users);
            console.log(usersArr)
        } catch (e){
            message(e.message);
            console.log(e);
        }
    }, [token, request]);

    useEffect(() => {
        getUsersList()
    }, [getUsersList]);

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <h3 className="center">Пользователи</h3>
            { !loading && usersArr && <Users getUsersList={getUsersList} users={usersArr} />}
        </>
    )
}