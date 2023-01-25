import React from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Products from "./pages/Products";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import Login from "./Login";


export default function App() {
  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />}></Route>
        <Route path="/products" exact element={<Products />}></Route>
        <Route path="/users" exact element={<Users />}></Route>
        <Route path="/orders" exact element={<Orders />}></Route>
      </Routes>
    </BrowserRouter>
   </>
  )
}
