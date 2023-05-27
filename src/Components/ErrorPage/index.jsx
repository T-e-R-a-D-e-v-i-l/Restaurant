import { Link } from "react-router-dom"

function ErrorPage() {
    return (
        <div className="max-w-2xl mx-auto">
            {/* <button className="bg-amber-200 py-2 px-4 rounded-xl text-center font-semibold text-xl">
                <Link to="/" >
                    <p>Назад</p>
                </Link>
            </button> */}
            <Link to="/">
                <button className="bg-amber-200 py-2 px-8 mt-10 rounded-xl text-center font-semibold text-xl">Назад</button>
            </Link>
            <img src="./images/404 Error.png" alt="" />
        </div>
    )
}

export default ErrorPage