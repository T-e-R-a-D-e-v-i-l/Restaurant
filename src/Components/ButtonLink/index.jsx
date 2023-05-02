function ButtonLink(props) {
    const { title } = props

    return (
        <div className="bg-amber-200 rounded-xl ml-2 px-10 py-2">{title}</div>
    )
}

export default ButtonLink