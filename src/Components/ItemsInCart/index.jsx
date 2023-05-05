function ItemsInCart({ quantity = 0 }) {

    return quantity > 0 ? (
        <div className="absolute w-5 h-5 bg-red-600 rounded-full text-base flex justify-center items-center text-white top-2.5 right-2">
            {quantity}
        </div>
    ) : null
}

export default ItemsInCart