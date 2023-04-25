
function CartMenu({ menu, restCard, deleteProducts }) {



    return (
        <div className='max-w-screen-md mx-auto mb-10'>
            <h2 className='text-4xl font-bold py-10 text-center'>Корзина</h2>
            <p className='text-2xl font-semibold italic'>Ваш заказ из ресторана: {restCard.name}</p>

            {menu.map((menu) => (
                <div key={menu.id} className="flex items-center  shadow-xl px-6 py-4 rounded-2xl gap-4 ">
                    <div className='flex justify-start items-center gap-4 w-4/5'>
                        <img className="w-1/6  rounded-3xl object-center object-cover" src={menu.image} alt=""></img>
                        <h3 className="text-lg font-semibold">{menu.name}</h3>
                    </div>
                    <div className="flex justify-between items-center gap-10 ">
                        <input
                            // value={count}
                            name="count"
                            min='1'
                            className="border border-solid border-gray-400 rounded p-2 w-1/6"></input>
                        <p className="text-xl font-bold italic">{menu.price} ₽ </p>
                        <button onClick={() => deleteProducts(menu.id)}>
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
                <p>на сумму: ₽</p>
            </div>
            <button className='bg-amber-200 py-2 rounded-xl w-full'>Оформить заказ</button>
        </div>
    )
}

export default CartMenu