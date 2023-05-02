import { Link } from "react-router-dom"
import ItemsInCart from 'Components/ItemsInCart';


function Header(cartItems) {

    return (
        <div className="flex flex-col items-center">
            <div className="flex">
                <Link to={`/`} className="flex items-center">
                    <img src="./images/logo.png" alt="" />
                    <h1 className="ml-3 text-4xl font-bold">My <br />food</h1>
                    <h3 className="ml-10 text-2xl text-slate-800 italic font-semibold">Все лучшие заведения нашего города в одном месте!</h3>
                </Link>
                <Link to={`/cart`} className="w-24 h-24 m-2">
                    <ItemsInCart quantity={cartItems.length} />
                    <img src="./images/basket.png" alt="" />
                </Link>
            </div>
        </div>
    )
}

export default Header