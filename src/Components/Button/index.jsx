function Button(props) {
    const { title, type } = props

    return (
        <button type={type} className="bg-amber-200 rounded-xl ml-2 px-10 py-2">{title}</button>
    )
}

export default Button