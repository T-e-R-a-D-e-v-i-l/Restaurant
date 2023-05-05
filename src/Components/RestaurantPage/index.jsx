import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Button from 'Components/Button'
import { format } from "date-fns"
import uuid4 from 'uuid4'
import swal from 'sweetalert'


function RestaurantPage() {

    const { slug } = useParams()

    const [restCard, setRestCard] = useState(null) // карточка ресторана  
    const [menu, setMenu] = useState([]) // все блюда меню 
    const [cartItems, setCartItems] = useState([]) // товары в корзине 
    // const [btnOn, setBtnOn] = useState(true)

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
        const cartJson = JSON.stringify(cartItems)
        localStorage.setItem("orderItems", cartJson)

        console.log(cartJson)
    }, [cartItems])



    if (!restCard) return <div className="flex justify-center text-xl text-slate-600 font-semibold pt-36">Loading...</div>

    // console.log(slug)
    // const addProduct = (cartItems, orderMenu) => {
    //     if (cartItems.length > 0) {
    //         if (cartItems[0].place !== orderMenu[0].place) {
    //             swal({
    //                 title: "Подтвердите действие!",
    //                 text: "В вашей корзине есть блюда из другого ресторана, очистить корзину?",
    //                 icon: "warning",
    //                 buttons: true,
    //                 dangerMode: true,
    //             })
    //                 .then((willDelete) => {
    //                     if (willDelete) {
    //                         swal("Корзина очищена!", {
    //                             icon: "success",
    //                         });
    //                     } else {
    //                         swal("");
    //                     }
    //                 });
    //         } else {
    //             setCartItems([orderMenu]);
    //         }
    //     } else {
    //         setCartItems()
    //     }
    // }

    const handleClick = (event, menuItem) => {
        event.preventDefault()
        const orderMenu = {
            id: uuid4(),
            place: restCard.name,
            image: menuItem.image,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
            restaurantId: menuItem.restaurantId
        }

        if (cartItems.length !== 0 && cartItems.restaurantId !== orderMenu.restaurantId) {
            swal("В вашей корзине есть блюда из другого ресторана, для продолжения удалите товары из корзины");
        }
        if (cartItems.length !== 0 && cartItems.restaurantId === orderMenu.restaurantId) {
            setCartItems([...cartItems, orderMenu])
        }


        console.log(orderMenu)


        // addProduct(cartItems)
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
                    {menu.map((menuItem) => (
                        <div key={menuItem.id} className="flex items-center gap-2 shadow-xl p-4 rounded-2xl">
                            <img className="w-1/4 h-fit rounded-3xl object-center object-cover" src={menuItem.image} alt=""></img>
                            <div className="flex flex-col">
                                <h3 className="text-xl font-semibold">{menuItem.name}</h3>
                                <p className="">{menuItem.description}</p>
                            </div>
                            <div className="flex flex-col items-center gap-4">
                                <p className="text-xl font-bold italic">{menuItem.price} ₽ </p>
                                <Button handleClick={(event) => handleClick(event, menuItem)} title="Заказать" />
                                {/* <Button onClick={() => deleteProducts(menu.id)} title="Удалить" /> */}
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