import { useEffect, useState } from "react"
import swal from 'sweetalert'

function OrderForm() {
    const [orderItems, setOrderItems] = useState([])
    const [customerName, setCustomerName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [comment, setComment] = useState('')
    const [phoneDirty, setPhoneDirty] = useState(false)
    const [emailDirty, setEmailDirty] = useState(false)
    const [customerNameDirty, setCustomerNameDirty] = useState(false)
    const [phoneError, setPhoneError] = useState('Введите номер телефона')
    const [emailError, setEmailError] = useState('Введите адрес электронной почты')
    const [customerNameError, setCustomerNameError] = useState('Введите Фамилию и Имя')

    useEffect(() => {
        const cartItemsLS = localStorage.getItem('orderItems')
        if (cartItemsLS) {
            setOrderItems(JSON.parse(cartItemsLS))
        }
    }, [])  // ничего не передается, пустой массив [orderItems]???



    async function orderSubmit(event) {
        event.preventDefault()
        const params = {
            customerName,
            phone,
            email,
            restaurantId: orderItems[0].restaurantId,
            cartItems: orderItems
        };

        const url = `https://www.bit-by-bit.ru/api/student-projects/restaurants/order`;

        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(params),
        });

        try {
            let date = await response.json();

            if (date) {
                swal("Спасибо!", "Ваша заявка принята!", "success");
            }
        } catch (error) {
            swal("Произошла ошибка!", "Попробуйте снова", "error");
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'phone':
                setPhoneDirty(true)
                break
            case 'email':
                setEmailDirty(true)
                break
            case 'customerName':
                setCustomerNameDirty(true)
                break
            default: break
        }
    }

    const phoneHandler = (e) => { // выдает ошибку
        setPhone(e.target.value)
        const re = /\+7\d{10}/
        if (!re.test(String(e.target.value).toLowerCase())) {
            setPhoneError('Введите данные в заданом формате +7(999)999-99-99!')
        } else {
            setPhoneError('')
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некорректный адресс электронной почты, проверьте данные!')
        } else {
            setEmailError('')
        }
    }

    const nameHandler = (e) => { // выдает ошибку
        setCustomerName(e.target.value)
        const re = /^[А-ЯЁ][а-яё]$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setCustomerNameError('Некорректные данные!')
        } else {
            setCustomerNameError('')
        }
    }

    return (
        <div className='max-w-screen-md mx-auto '>
            <h3 className="text-xl font-semibold py-6">Введите данные для оформления заказа:</h3>
            <form className="flex flex-col gap-6">
                {(customerNameDirty && customerNameError) && <div className="text-red-700">{customerNameError}</div>}
                <input
                    name="customerName"
                    value={customerName}
                    onChange={(e) => {
                        setCustomerName(e.target.value)
                        nameHandler(e)
                    }}
                    onBlur={e => blurHandler(e)}
                    placeholder="Фамилия, имя"
                    className="border border-solid border-gray-400 rounded p-2"
                />
                {(phoneDirty && phoneError) && <div className="text-red-700">{phoneError}</div>}
                <input
                    name="phone"
                    value={phone}
                    onChange={(e) => {
                        setPhone(e.target.value)
                        phoneHandler(e)
                    }}
                    onBlur={e => blurHandler(e)}
                    placeholder="+7(999)999-99-99"
                    className="border border-solid border-gray-400 rounded p-2"
                />
                {(emailDirty && emailDirty) && <div className="text-red-600">{emailError}</div>}
                <input
                    name="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        emailHandler(e)
                    }}
                    onBlur={e => blurHandler(e)}
                    placeholder="Адрес электронной почты"
                    className="border border-solid border-gray-400 rounded p-2"
                />
                <input
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Адрес доставки"
                    className="border border-solid border-gray-400 rounded p-2"
                />
                <input
                    name="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Комментарий для курьера"
                    className="border border-solid border-gray-400 rounded p-2 h-28 "
                />
                <button className='bg-amber-200 py-2 font-semibold text-xl rounded-xl w-full' type="submit" onClick={orderSubmit}>Оформить заказ</button>

            </form>
        </div>
    )
}

export default OrderForm