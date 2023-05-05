function ButtonCount(props) {
    const { title, changeCount } = props

    return (
        <button onClick={changeCount} className="">
            {title}
        </button>
    )
}

export default ButtonCount