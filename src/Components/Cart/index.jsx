import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
// import ButtonLink from 'Components/ButtonLink';



function Cart() {

    const [orderItems, setOrderItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const cartItemsLS = localStorage.getItem('orderItems')
        if (cartItemsLS) {
            setOrderItems(JSON.parse(cartItemsLS))
        }
        setIsLoading(false)
    }, [])

    const deleteProducts = (id) => {
        setOrderItems(orderItems.filter(item => item.id !== id))
        if (orderItems) {
            const cartJson = JSON.stringify(orderItems)
            localStorage.setItem("orderItems", cartJson)
        }
    }


    if (isLoading) return <div className="flex justify-center text-xl text-slate-600 font-semibold pt-36">Loading...</div>
    if (!orderItems.length === 0) return <div className="flex justify-center text-xl text-slate-600 font-semibold pt-36">Вы пока ничего не выбрали...</div>


    const result = orderItems.reduce((prev, current) => prev + parseInt(current.value) * parseInt(current.price), 0)
    const totalResult = orderItems.reduce((prev, current) => prev + parseInt(current.price), 0)


    return (
        <div className='max-w-screen-md mx-auto mb-10'>
            <h2 className='text-4xl font-bold py-10 text-center'>Корзина</h2>
            <p className='text-2xl font-semibold italic'>Ваш заказ из ресторана: {orderItems.place}</p>
            {orderItems.length === 0 && (
                <div className='text-center text-xl mt-10'>Вы пока ничего не выбрали</div>
            )}
            {orderItems.map((menuOrder) => (
                <div key={menuOrder.id} className="flex items-center  shadow-xl px-6 py-4 rounded-2xl gap-4 ">
                    <div className='flex justify-start items-center gap-4 w-3/5'>
                        <img className="w-1/6  rounded-3xl object-center object-cover" src={menuOrder.image} alt=""></img>
                        <h3 className="text-lg font-semibold">{menuOrder.name}</h3>
                    </div>
                    <div className="flex justify-between items-center gap-6 ">
                        <p className="text-lg italic">{menuOrder.price} ₽</p>
                        <p>x</p>
                        <input
                            // value={count}
                            // onChange={(event) => {
                            //     setCartItems(event.target.value)
                            // }}
                            name="count"
                            min='1'
                            className="border border-solid text-center border-gray-400 rounded p-1 w-1/12"></input>
                        <p>=</p>
                        <p className="text-xl font-bold italic"> {result}  ₽ </p>
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
                <p>{orderItems.length} блюд</p>
                <p>на сумму: {totalResult} ₽</p>
            </div>
            <Link to={`/orderForm`} className="mt-10">
                <div
                    className='bg-amber-200 py-2 rounded-xl w-full text-center font-semibold text-xl'>
                    Оформить заказ
                </div>
                {/* <ButtonLink title="Оформить заказ" /> */}
            </Link>
        </div>
    )
}

export default Cart