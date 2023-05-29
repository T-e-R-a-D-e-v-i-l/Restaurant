import Header from 'Components/Heder';

function EmptyCart() {
    return (
        <div>
            <Header />
            <div className='text-center text-xl mt-10'>Вы пока ничего не выбрали</div>
        </div>
    )
}

export default EmptyCart