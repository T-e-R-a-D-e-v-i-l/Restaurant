import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Button from 'Components/Button'
import { format } from "date-fns"
import swal from 'sweetalert'
import Header from 'Components/Heder';

function RestaurantPage({ quantity }) {
    const { slug } = useParams()
    const [restCard, setRestCard] = useState(null) // карточка ресторана  
    const [menu, setMenu] = useState([]) // все блюда меню 
    const [cartItems, setCartItems] = useState(localStorage.getItem("orderItems") ? JSON.parse(localStorage.getItem("orderItems")) : []) // товары в корзине 

    useEffect(() => {
        fetch(`https://www.bit-by-bit.ru/api/student-projects/restaurants/${slug}`)
            .then(data => data.json())
            .then(response => setRestCard(response))
    }, [slug, setRestCard])

    useEffect(() => {
        fetch(`https://www.bit-by-bit.ru/api/student-projects/restaurants/${slug}/items`)
            .then(data => data.json())
            .then(response => setMenu(response))
    }, [slug, setMenu])

    useEffect(() => {
        localStorage.setItem("orderItems", JSON.stringify(cartItems))
    }, [cartItems])

    if (!restCard) return <div className="flex justify-center text-xl text-slate-600 font-semibold pt-36">Loading...</div>

    const handleClick = (event, menuItem) => {
        event.preventDefault()
        const orderMenu = {
            itemId: menuItem.id,
            place: restCard.name,
            image: menuItem.image,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
            restaurantId: menuItem.restaurantId
        }

        setCartItems([...cartItems, orderMenu])

        // попытка не добавлять блюда из одного ресторана
        if (cartItems.length !== 0 && cartItems[0].restaurantId !== orderMenu.restaurantId) {
            swal("В вашей корзине есть блюда из другого ресторана, для продолжения удалите товары из корзины");
            deleteProducts(cartItems.itemId)
        }
        if (cartItems.length !== 0 && cartItems[0].restaurantId === orderMenu.restaurantId) {
            setCartItems([...cartItems, orderMenu])
        }
    }

    const deleteProducts = (id) => {
        setCartItems(cartItems.filter(item => item.itemId !== id))
    }

    const plusItem = menuItem => {
        const cartItem = cartItems.find(c => c.itemId === menuItem.id)
        setCartItems([...cartItems.filter(c => c.itemId !== menuItem.id),
        { ...cartItem, quantity: parseInt(cartItem.quantity) + 1 }])
    }

    const minusItem = menuItem => {
        const cartItem = cartItems.find(c => c.itemId === menuItem.id)
        if (cartItem.quantity > 1) {
            setCartItems([...cartItems.filter(c => c.itemId !== menuItem.id),
            { ...cartItem, quantity: parseInt(cartItem.quantity) - 1 }])
        }
        if (cartItem.quantity <= 1) {
            deleteProducts(cartItems.itemId) // не удаляет
        }
    }

    return (
        <div className="max-w-5xl mx-auto">
            <Header quantity={cartItems.length} />
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
                        {menu.map((menuItem) => (
                            <div key={menuItem.id} className="flex items-center gap-2 shadow-xl p-4 rounded-2xl">
                                <img className="w-1/4 h-fit rounded-3xl object-center object-cover" src={menuItem.image} alt=""></img>
                                <div className="flex flex-col">
                                    <h3 className="text-xl font-semibold">{menuItem.name}</h3>
                                    <p className="">{menuItem.description}</p>
                                </div>
                                <div className="flex flex-col items-center gap-8 w-2/3">
                                    <p className="text-xl font-bold italic">{menuItem.price} ₽ </p>
                                    {cartItems.map(c => c.itemId).includes(menuItem.id) ? (
                                        <div className="flex gap-4 text-xl font-semibold">
                                            <button onClick={() => minusItem(menuItem)}>-</button>
                                            <p>{cartItems.find(c => c.itemId === menuItem.id).quantity}</p>
                                            <button onClick={() => plusItem(menuItem)}>+</button>
                                        </div>) : (
                                        <Button handleClick={(event) => handleClick(event, menuItem)} title="Заказать" />
                                    )}
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantPage