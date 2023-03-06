
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
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} /> 
          <Route path="/register" element={<Register/>} /> 
          <Route path="/cartitems" element={<Product/>} /> 
          
         </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
