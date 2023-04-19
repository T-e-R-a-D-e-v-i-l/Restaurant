import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
// import Button from 'Components/Button';

// import { format } from "date-fns"


function RestaurantPage() {

    const { slug } = useParams

    // console.log(slug)
    const [restCards, setRestCard] = useState([])

    useEffect(() => {
        fetch(`https://www.bit-by-bit.ru/api/student-projects/restaurants/${slug}`)
            .then(data => data.json())
            .then(response => setRestCard(response))
    }, [slug])

    return (
        <div>
            {restCards.map((restCard) => (
                <div>страница ресторана</div>
                // <div key={restCard.id}>
                //     <img src={restCard.image} alt=""></img>
                //     <h3 >{restCard.name}</h3>
                //     <p >Основное направление кухни: {restCard.cuisine}</p>
                //     <p >{restCard.description}</p>
                //     <p >Время работы: {format(new Date(restCard.openAt), "HH.mm")} - {format(new Date(restCard.closeAt), "HH.mm")}</p>
                //     <div >
                //         <p>{restCard.address}</p>
                //         <p>{restCard.phone}</p>
                //         <p>{restCard.email}</p>
                //     </div>
                //     {/* <Link to={`/RestaurantPage/${item.slug}`}> */}
                // <Button title="Посмотреть меню" />
                //     {/* </Link> */}
                // </div>
            ))
            }
        </div>
    )
}

export default RestaurantPage