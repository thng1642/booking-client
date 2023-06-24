import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Search from "./pages/search/Search";
import Login from "./pages/login/Login";
import Transaction from "./pages/transactions/Transaction";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Home/>}/>
    //     <Route path="/search" element={<Search/>}/>
    //     <Route path="/detail" element={<Detail/>}/>
    //     <Route path="/transaction" element={<Transaction />} /> 
    //     <Route path="/login" element={<Login />} />
    //   </Routes>
    // </BrowserRouter>
    <AppRouter />
  );
}

export default App;
