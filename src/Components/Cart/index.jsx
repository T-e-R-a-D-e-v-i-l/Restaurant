import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
// import Count from 'Components/Count'
// import ButtonLink from 'Components/ButtonLink';
import Header from 'Components/Heder';


function Cart() {

    const [isLoading, setIsLoading] = useState(true)
    const [orderItems, setOrderItems] = useState([]) // товары в корзине 
    const [cartItems] = useState(localStorage.getItem("orderItems") ? JSON.parse(localStorage.getItem("orderItems")) : []) // товары в корзине 

    useEffect(() => {
        const cartItemsLS = localStorage.getItem('orderItems')
        if (cartItemsLS) {
            setOrderItems(JSON.parse(cartItemsLS))
        }
        setIsLoading(false)
    }, [])

    // useEffect(() => {
    //     localStorage.setItem("orderItems", JSON.stringify(orderItems))
    // }, [orderItems])

    const deleteProducts = (id) => {
        setOrderItems(orderItems.filter(item => item.id !== id))
        if (orderItems) {
            localStorage.setItem("orderItems", JSON.stringify(orderItems))
        }
    }

    if (isLoading) return <div className="flex justify-center text-xl text-slate-600 font-semibold pt-36">Loading...</div>
    if (!orderItems.length === 0) return <div className="flex justify-center text-xl text-slate-600 font-semibold pt-36">Вы пока ничего не выбрали...</div>

    const totalResult = orderItems.reduce((prev, current) => prev + parseFloat(current.price), 0)

    return (
        <div className="max-w-5xl mx-auto">
            <Header quantity={cartItems.length} />
            <div className='max-w-screen-md mx-auto mb-10 px-10'>
                <h2 className='text-4xl font-bold pt-10 pb-6 text-center'>Корзина</h2>
                <div className="flex justify-end pb-6">
                    <button className="bg-gray-100 rounded-xl ml-2 px-10 py-2">Очистить корзину</button>
                </div>
                <p className='text-2xl font-semibold italic pb-4'>Ваш заказ из ресторана: {orderItems[0].place}</p>
                {orderItems.length === 0 && (
                    <div className='text-center text-xl mt-10'>Вы пока ничего не выбрали</div>
                )}
                {orderItems.map((menuOrder) => (
                    <div key={menuOrder.id} className="flex items-center justify-between shadow-xl px-6 py-4 rounded-2xl gap-6 ">
                        <div className='flex justify-start items-center gap-4 w-3/6'>
                            <img className="w-1/6  rounded-3xl object-center object-cover" src={menuOrder.image} alt=""></img>
                            <h3 className="text-lg font-semibold">{menuOrder.name}</h3>
                        </div>
                        <div className="flex justify-between items-center gap-2 ">
                            <p className="text-lg italic">{menuOrder.price} ₽</p>
                            <p>x</p>
                            {/* <div>
                            <Count />
                        </div> */}
                            <input
                                value={menuOrder.quantity}
                                // onChange={(event) => {
                                //     menuOrder.quantity = event.target.value
                                //     setOrderItems()
                                // }}
                                name="count"
                                min='1'
                                className="border border-solid text-center border-gray-400 rounded p-1 w-1/12"></input>
                            <p>=</p>
                            <p className="text-xl font-bold italic"> {menuOrder.quantity * menuOrder.price}  ₽ </p>
                            <button onClick={() => deleteProducts(menuOrder.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="w-6 h-6">
                                    <path strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))
                }

                <div className='flex justify-end shadow-x rounded-2xl gap-4 p-6 text-lg font-semibold italic'>
                    <p>Итого:</p>
                    <p>блюд {orderItems.length} </p>
                    <p>на сумму: {totalResult.toFixed(2)} ₽</p>
                </div>
                <Link to={`/orderForm`} className="mt-10">
                    <div
                        className='bg-amber-200 py-2 rounded-xl w-full text-center font-semibold text-xl'>
                        Оформить заказ
                    </div>
                    {/* <ButtonLink title="Оформить заказ" /> */}
                </Link>
            </div>
        </div>
    )
}

export default Cart


