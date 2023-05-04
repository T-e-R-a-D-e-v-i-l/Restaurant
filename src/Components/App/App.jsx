import './App.css';
import Header from 'Components/Heder';
import Restaurants from 'Components/Restaurants';
import RestaurantPage from 'Components/RestaurantPage';
import Cart from 'Components/Cart';
import OrderForm from 'Components/OrderForm';
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Restaurants />} />
                <Route path="/restPage/:slug" element={<RestaurantPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orderForm" element={<OrderForm />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
