import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Signin, ViewExistedItems, Signup, AddItem, PosView, OrdersHistory, Terms } from './pages/index';

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<PosView />} />
                    <Route path='/signin' element={<Signin />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/addItem' element={<AddItem />} />
                    <Route path='/ordersHistory' element={<OrdersHistory />} />
                    <Route path='/existedItems' element={<ViewExistedItems />} />
                    <Route path='/terms' element={<Terms />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;