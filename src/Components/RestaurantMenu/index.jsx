import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


function RestaurantMenu() {
    const { slug } = useParams()

    console.log(slug)

    const [memu, setMenu] = useState([])

    useEffect(() => {
        fetch(`https://www.bit-by-bit.ru/api/student-projects/restaurants/${slug}`)
            .then(data => data.json())
            .then(response => setMenu(response))
    }, [slug])

    useEffect(() => {
        fetch(`https://www.bit-by-bit.ru/api/student-projects/restaurants/${slug}/items`)
            .then(data => data.json())
            .then(response => setMenu(response))
    }, [slug])

    return (
        <div>
            <div className="flex items-center ">
                <img src={menu.image} alt="" className="h-2/6 w-2/6 "></img>
                <div className="flex flex-col items-center justify-center gap-4 pl-16">
                    <h3 className="text-4xl font-bold">{menu.name}</h3>
                </div>
            </div>
            cnhfybwf vty.
        </div>
    )
}

export default RestaurantMenu