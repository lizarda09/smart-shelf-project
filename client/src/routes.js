import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {ProductsPage} from "./pages/ProductsPage";
import {UsersPage} from "./pages/UsersPage";
import {LoginPage} from "./pages/LoginPage";
import {RegisterPage} from "./pages/RegisterPage";
import {ShelvesPage} from "./pages/ShelvesPage";
import {AddProduct} from "./pages/AddProductPage";
import {SalesPage} from "./pages/SalesPage";
import {AddSale} from "./pages/AddSalePage";
import {StatisticPage} from "./pages/StatisticPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated){
        return (
            <Switch>
                <Route path="/product" exact>
                    <ProductsPage />
                </Route>
                <Route path="/user" exact>
                    <UsersPage />
                </Route>
                <Route path="/shelf" exact>
                    <ShelvesPage />
                </Route>
                <Route path="/sale" exact>
                    <SalesPage />
                </Route>
                <Route path="/addProduct" exact>
                    <AddProduct />
                </Route>
                <Route path="/statistic" exact>
                    <StatisticPage />
                </Route>
                <Route path="/addSale" exact>
                    <AddSale />
                </Route>
            </Switch>
        )
    }

    else return (
        <Switch>
            <Route path="/" exact>
                <LoginPage/>
            </Route>
            <Route path="/register" exact>
                <RegisterPage/>
            </Route>
        </Switch>
    )
}