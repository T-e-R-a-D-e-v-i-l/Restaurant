import './App.css';
import Header from 'Components/Heder';
import Restaurants from 'Components/Restaurants'


function App() {
    return (
        <div className='max-w-screen-lg m-auto'>
            <Header />
            <Restaurants />
        </div>
    );
}

export default App;
