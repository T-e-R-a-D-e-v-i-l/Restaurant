import './App.css';
import Header from 'Components/Heder';
import Restaurants from 'Components/Restaurants';
import RestaurantPage from 'Components/RestaurantPage';
import CartMenu from 'Components/CartMenu';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"



function App() {

    const [restCard, setRestCard] = useState(null)
    const [menu, setMenu] = useState([])


    const deleteProducts = () => {
        console.log('Delete!')
    }

    return (
        <BrowserRouter className='max-w-screen-lg m-auto'>
            <Header />
            <Routes>
                <Route path="/" element={<Restaurants />} />
                <Route path="/restPage/:slug" element={<RestaurantPage menu={menu} restCard={restCard} setMenu={setMenu} setRestCard={setRestCard} />} />
                <Route path="/cart" element={<CartMenu menu={menu} restCard={restCard} deleteProducts={deleteProducts} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
