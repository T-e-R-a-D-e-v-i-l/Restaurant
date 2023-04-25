function Button(props) {
    const { title, type, handleClick } = props

    return (
        <Button onClick={event => handleClick(event)} type={type} className="bg-amber-200 rounded-xl ml-2 px-10 py-2">{title}</Button>
    )
}

export default Button