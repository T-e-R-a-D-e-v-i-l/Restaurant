function OrderForm() {
    return (
        <div>
            <p>Введите данные для оформления заказа:</p>
            <input
                name="name"
                placeholder="Фамилия, имя"
                className="border border-solid border-gray-400 rounded p-2"
            />
            <input
                name="adress"
                placeholder="Адрес доставки"
                className="border border-solid border-gray-400 rounded p-2"
            />
            <input
                name="comment"
                placeholder="Комментарий для курьера"
                className="border border-solid border-gray-400 rounded p-2"
            />
        </div>
    )
}

export default OrderForm