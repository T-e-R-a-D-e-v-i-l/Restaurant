function ButtonCount(props) {
    const { title, changeCount } = props

    return (
        <button onClick={changeCount} >
            {title}
        </button>
    )
}

export default ButtonCount