import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Button from 'Components/Button';
import { format } from "date-fns"
import uuid4 from 'uuid4'


function RestaurantPage({ menu, restCard, setMenu, setRestCard }) {

    const { slug } = useParams()

    const [cartItems, setCartItems] = useState([])


    // console.log(slug)

    const addProduct = (orderMenu) => {
        setCartItems([cartItems])
    }


    useEffect(() => {
        fetch(`https://www.bit-by-bit.ru/api/student-projects/restaurants/${slug}`)
            .then(data => data.json())
            .then(response => setRestCard(response))
    }, [slug])

    useEffect(() => {
        fetch(`https://www.bit-by-bit.ru/api/student-projects/restaurants/${slug}/items`)
            .then(data => data.json())
            .then(response => setMenu(response))
    }, [slug])

    if (!restCard) return <div>Loading...</div>

    const handleClick = event => {
        event.preventDefault()
        const orderMenu = {
            id: uuid4(),
            price: menu.price
        }
        addProduct(cartItems)

        console.log(orderMenu)
    }

    return (
        <div className='max-w-screen-md m-auto '>
            <div key={restCard.id} className='bg-slate-50 shadow-inner rounded-3xl p-10 my-10 flex flex-col items-center gap-6'>
                <div className="flex items-center ">
                    <img src={restCard.image} alt="" className="h-2/6 w-2/6 "></img>
                    <div className="flex flex-col items-center justify-center gap-4 pl-16">
                        <h3 className="text-4xl font-bold">{restCard.name}</h3>
                        <p className="italic text-slate-700">Основное направление кухни: {restCard.cuisine}</p>
                    </div>
                </div>
                <p className="text-center text-xl">{restCard.description}</p>
                <p >Время работы: {format(new Date(restCard.openAt), "HH.mm")} - {format(new Date(restCard.closeAt), "HH.mm")}</p>
                <div className="text-center italic text-slate-700">
                    <p>Адрес: {restCard.address}</p>
                    <p>Телефон: {restCard.phone}</p>
                    <p>Электронная почта: {restCard.email}</p>
                </div>
                <div className="grid gap-4">
                    <h2 className="text-4xl text-center font-semibold">Наше меню</h2>
                    {menu.map((menu) => (
                        <div key={menu.id} className="flex items-center gap-2 shadow-xl p-4 rounded-2xl">
                            <img className="w-1/4 h-fit rounded-3xl object-center object-cover" src={menu.image} alt=""></img>
                            <div className="flex flex-col">
                                <h3 className="text-xl font-semibold">{menu.name}</h3>
                                <p className="">{menu.description}</p>
                            </div>
                            <div className="flex flex-col items-center gap-4">
                                <p className="text-xl font-bold italic">{menu.price} ₽ </p>
                                <Button handleClick={handleClick} title="Заказать" />
                            </div>
                        </div>
                    ))
                    }
                </div>

            </div>
        </div>
    )
}

export default RestaurantPage