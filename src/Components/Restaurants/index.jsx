import { useState } from "react"
import { useEffect } from "react"
// import { format } from "date-fns"

function Restaurants() {
    const [items, setItems] = useState([])
    useEffect(() => {
        fetch(`https://www.bit-by-bit.ru/api/student-projects/restaurants`)
            .then(data => data.json())
            .then(response => setItems(response))
    }, [])
    return (
        <div className="max-w-5xl m-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 p-10">
            {items.map((item) => (
                <div key={item.id} className="flex flex-col justify-stretch text-center">
                    <img className="" src='{item.image}' alt=""></img>
                    <h3 className="text-2xl font-semibold">{item.name}</h3>
                    <p className="text-slate-700 text-sm">Основное направление кухни: {item.cuisine}</p>
                    <p className="mt-5 text-slate-950">{item.description}</p>
                    {/* <p>Время работы: {format(item.openAt, "HH.mm")} - {format(item.closeAt, "HH.mm")}</p> */}
                    <div className="flex flex-col mt-8 text-sm text-stone-700">
                        <p>{item.address}</p>
                        <p>{item.phone}</p>
                        <p>{item.email}</p>
                    </div>
                </div>
            ))
            }
        </div >
    )
}
export default Restaurants