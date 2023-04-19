import { Link } from "react-router-dom"
import { useState } from "react"


function Header() {
    // const [value, setValue] = useState('')

    // const filteredRest = items.filter(item => {
    //     return item.name.toLowerCase().includes(value.toLowerCase())
    // })

    return (
        <div className="flex flex-col items-center">
            <div className="flex">
                <Link to='/Restaurants' className="flex items-center">
                    <img src="./images/logo.png" alt="" />
                    <h1 className="ml-3 text-4xl font-bold">My <br />food</h1>
                    <h3 className="ml-10 text-2xl text-slate-800 italic font-semibold">Все лучшие заведения нашего города в одном месте!</h3>
                </Link>
                <Link className="w-24 h-24 m-2">
                    <img src="./images/basket.png" alt="" />
                </Link>
            </div>
            {/* <div className="flex my-10">
                <input name="restaurant"
                    onChange={(event) => setValue(event.target.value)}
                    placeholder="Найти ресторан"
                    className="border border-solid border-gray-400 w-9/12 rounded p-2"
                />
                <button className="bg-amber-200 rounded-xl ml-2 px-10 py-2">Найти</button>
            </div> */}
        </div>
    )
}

export default Header