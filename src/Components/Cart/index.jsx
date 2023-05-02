import { useEffect } from "react"


function Cart({ deleteProducts, orderItems }) {

    // const cartJson = localStorage.getItem('cartItems')
    // const cartItems = JSON.parse(cartJson)

    // useEffect(() => {
    //     const cartJson = localStorage.getItem("cartItems")
    //     const cartItems = JSON.parse(cartJson)
    // }, [cartItems])

    useEffect(() => {
        const cartJson = localStorage.getItem('orderItems')
        if (cartJson) {
            orderItems = JSON.parse(cartJson)
        }
    }, [orderItems])

    // const deleteProducts = () => {
    //     console.log('Delete!')
    // }

    const result = orderItems.reduce((prev, current) => prev + current.value * current.price, 0)

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
                        <input
                            // value={count}
                            // onChange={(event) => {
                            //     setCartItems(event.target.value)
                            // }}
                            name="count"
                            min='1'
                            className="border border-solid text-center border-gray-400 rounded p-1 w-1/12"></input>
                        <p>=</p>
                        <p className="text-xl font-bold italic">  ₽ </p>
                        <button onClick={() => deleteProducts(menuOrder.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            ))
            }

            <div className='flex justify-end shadow-x rounded-2xl gap-4 p-6 text-lg font-semibold italic'>
                <p>Итого:</p>
                <p>8 блюд</p>
                <p key={result}>на сумму: {result} ₽</p>
            </div>
            <button className='bg-amber-200 py-2 rounded-xl w-full'>Оформить заказ</button>
        </div>
    )
}

export default Cart