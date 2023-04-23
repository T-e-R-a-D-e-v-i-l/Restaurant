import './App.css';
import Header from 'Components/Heder';
import Restaurants from 'Components/Restaurants';
import RestaurantPage from 'Components/RestaurantPage';
import RestaurantMenu from 'Components/RestaurantMenu';
import Basket from 'Components/Basket';
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {
    return (
        <BrowserRouter className='max-w-screen-lg m-auto'>
            <Header />
            <Routes>
                <Route path="/" element={<Restaurants />} />
                <Route path="/restPage/:slug" element={<RestaurantPage />} />
                <Route path="/restMenu/:slug.items" element={<RestaurantMenu />} />
                <Route path="/basket" element={<Basket />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
