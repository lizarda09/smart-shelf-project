import React, {useContext, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const Search = ({users}) => {
    const [usersByPosition, setUsersByPosition] = useState([]);
    const [userByEmail, setUserByEmail] = useState(null);
    const { request } = useHttp();
    const { token } = useContext(AuthContext);
    let [sortedUserArr, setSortedUserArr] = useState([]);

    const getUsersByPosition = async () => {
        // try {
        //     const input = document.querySelector('input[name="search"]');
        //     const arr = await request(`/api/user/${input.value}`, 'GET', null, {
        //         Authorization: `Bearer ${ token }`
        //     });
        //     setUsersByPosition(arr);
        //     console.log(arr);
        // } catch (e){
        //     console.log(e);
        // }
        console.log(users);
    };

    const search = () => {
        try {
            const input = document.querySelector('input[name="search"]');

            users.forEach(user => {
                let tempArr;
                for(let key in user){

                }
                setSortedUserArr(tempArr);
                console.log(sortedUserArr);
            });
        } catch (e) {
            console.log(e);
        }
    };



    const getUserByEmail = async () => {
        try {
            const input = document.querySelector('input[name="search"]');
            const user = await request(`/api/user/${input.value}`, 'GET', null, {
                Authorization: `Bearer ${ token }`
            });
            setUserByEmail(user);
            console.log(user);
        } catch (e){
            console.log(e);
        }
    };

    return (
        <div>
            <input name="search" placeholder="Поиск" onChange={search} type="text"/>
            <button className="btn">По Id</button>
            <button className="btn" onClick={getUserByEmail}>По почте</button>
            <button className="btn" onClick={getUsersByPosition}>По должности</button>
            <h5 className="center">Отфильтрованный список пользователей</h5>
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
                { usersByPosition.map( user => {
                    return (
                        <tr key={user._id}>
                            <td>{user.firstName}</td>
                            <td>{user.secondName}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>{user.position}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
};