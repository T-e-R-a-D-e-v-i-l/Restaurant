import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ButtonLink from 'Components/ButtonLink';


function Restaurants() {
    const [items, setItems] = useState([])
    useEffect(() => {
        fetch(`https://www.bit-by-bit.ru/api/student-projects/restaurants`)
            .then(data => data.json())
            .then(response => setItems(response))
    }, [])

    // console.log(items)

    const [value, setValue] = useState('')
    const [isOpen, setIsOpen] = useState(true)

    const filteredRest = items.filter(item => {
        return item.name.toLowerCase().includes(value.toLowerCase())
    })

    const itemClickHandler = (e) => {
        setValue(e.target.textContent)
        setIsOpen(!isOpen)
    }

    const inputClickHandler = () => {
        setIsOpen(true)
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex mt-10 mb-5 justify-center relative">
                <input name="restaurant"
                    onChange={(event) => setValue(event.target.value)}
                    onClick={inputClickHandler}
                    value={value}
                    placeholder="Найти ресторан"
                    className="border border-solid border-gray-400 w-6/12 rounded p-2"
                />
                <ul className="absolute left-64 top-12 bg-white max-h-48 w-6/12 rounded h-auto overflow-auto">
                    {
                        value && isOpen
                            ? filteredRest.map((item) => (
                                <li className="p-2 hover:bg-amber-200 transition-all cursor-pointer"
                                    onClick={itemClickHandler}>
                                    {item.name}
                                </li>
                            ))
                            : null
                    }
                </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-10">
                {filteredRest.map((item) => (
                    <div key={item.id} className="flex flex-col items-center shadow-2xl text-center border rounded-xl overflow-hidden">
                        <img className="h-1/2 lg:h-1/4 w-full object-center object-cover" src={item.image} alt=""></img>
                        <h3 className="text-2xl font-semibold">{item.name}</h3>
                        <p className="mt-3 text-slate-700 text-sm">Основное направление кухни: {item.cuisine}</p>
                        <p className="mt-5 text-slate-950 px-2">{item.description}</p>
                        <Link to={`/restPage/${item.slug}`} className="mt-10">
                            <ButtonLink title="Подробнее" />
                        </Link>
                    </div>
                ))
                }
            </div>
        </div>
    )
}
export default Restaurants