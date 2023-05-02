function Button(props) {
    const { title, type, handleClick } = props

    return (
        <button onClick={event => handleClick(event)} type={type} className="bg-amber-200 rounded-xl ml-2 px-10 py-2">{title}</button>
    )
}

export default Button