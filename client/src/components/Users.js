import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Search} from "./Search";
import {useMessage} from "../hooks/message.hook";

export const Users = ({ users, getUsersList }) => {
    const message = useMessage();
    const { token } = useContext(AuthContext);
    const { request } = useHttp();

    if (!users.length) {
        return <h3 className="center">Пользователей пока нет</h3>
    }

    console.log(users);
    const fireUser = async event => {
        try {
            const idUser = event.target.dataset.user;
            const user = await request(`/api/user/${idUser}`, 'DELETE', null, {
                Authorization: `Bearer ${ token }`
            });
            message("Пользователь уволен");
            getUsersList();
            console.log(user.position);
        } catch (e){
            console.log(e);
        }
    };

    const makeAdmin = async event => {
        try {
            const idUser = event.target.dataset.user;
            const user = await request(`/api/user/${idUser}`, 'PUT', null, {
                Authorization: `Bearer ${ token }`
            });
            console.log(user.position);
            message("Пользователь стал админом");
            getUsersList();
        } catch (e){
            console.log(e);
            message(e.message);
        }
    };

    const isUserAdmin = arrPosition => {
        try {
           return arrPosition.indexOf("ADMIN") !== -1;
        } catch (e){
            console.log(e);
            message(e.message);
        }
    };

    return (
        <div>
            <Search users={users}/>
            <h5 className="center">Список всех пользователей</h5>
            <table className="striped">
                <thead>
                <tr>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Телефон</th>
                    <th>Почта</th>
                    <th>Должность</th>
                </tr>
                </thead>
                <tbody>
                { users.map( user => {
                    console.log(user.position)
                    return (
                        <tr key={user._id}>
                            <td>{user.firstName}</td>
                            <td>{user.secondName}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>
                                {user.position.reduce((prev, curr) => {
                                    return prev + " " + curr;
                                })}
                            </td>

                            <td><button data-user={user._id} className="btn" onClick={fireUser}>Удалить</button></td>
                            <td>
                              <button data-user={user._id} className="btn" onClick={makeAdmin}>Сделать админом</button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}