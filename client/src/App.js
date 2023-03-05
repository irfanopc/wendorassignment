
import './App.css';
import Home from './components/homepage/Home';
import Product from './components/product/Product';
import  Login from './components/auth/login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartItems from './components/product/CartItems';
import Register from './components/auth/signup';
function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}> </Route>
          <Route path="/login" element={<Login/>}> </Route>
          <Route path="/register" element={<Register/>}> </Route>
          <Route path="/cartitems" element={<Product/>}> </Route>
         </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
