import './App.css';
import Header from 'Components/Heder';
import Restaurants from 'Components/Restaurants';
import RestaurantPage from 'Components/RestaurantPage';
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {
    return (
        <BrowserRouter className='max-w-screen-lg m-auto'>
            <Header />
            <Routes>
                <Route path="/" element={<Restaurants />} />
                <Route path="/RestaurantPage/:slug" element={<RestaurantPage />} />
            </Routes>
            <Restaurants />
        </BrowserRouter>
    );
}

export default App;
