import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Button from 'Components/Button';
import { format } from "date-fns"


function RestaurantPage() {

    const { slug } = useParams()

    // console.log(slug)
    const [restCard, setRestCard] = useState([])

    useEffect(() => {
        fetch(`https://www.bit-by-bit.ru/api/student-projects/restaurants/${slug}`)
            .then(data => data.json())
            .then(response => setRestCard(response))
    }, [slug])

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
                <Link to={`/restPage/${restCard.slug}`}>
                    <Button title="Посмотреть меню" />
                </Link>
            </div>
        </div>
    )
}

export default RestaurantPage