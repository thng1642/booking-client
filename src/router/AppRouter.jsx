import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/home/Home";
import Detail from "../pages/detail/Detail";
import Search from "../pages/search/Search";
import Transaction from "../pages/transactions/Transaction";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import { AppProvider } from "../store";

export default function AppRouter() {
    return(
        <AppProvider>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/detail/:id" element={<Detail/>}/>
                    <Route path="/search" element={<Search/>}/>
                    <Route path="/transaction" element={<Transaction />} /> 
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Routes>
        </BrowserRouter>
        </AppProvider>
    )
}