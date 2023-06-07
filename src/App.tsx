import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Signin, ViewExistedItems, Signup, AddItem, PosView, OrdersHistory, Terms } from './pages/index';
import { UserProvider } from './components/providers';
import { NavigationBar } from './components/core';
import Guard from './components/guard/guard.component';
const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <UserProvider>
                    <NavigationBar />
                    <Routes>
                        <Route path='/' element={<Guard><PosView /></Guard>} />
                        <Route path='/signin' element={<Signin />} />
                        <Route path='/signup' element={<Signup />} />
                        <Route path='/addItem' element={<Guard><AddItem /></Guard>} />
                        <Route path='/ordersHistory' element={<Guard><OrdersHistory /></Guard>} />
                        <Route path='/existedItems' element={<Guard><ViewExistedItems /></Guard>} />
                        <Route path='/terms' element={<Terms />} />
                    </Routes>
                </UserProvider>
            </BrowserRouter>
        </div>
    );
};

export default App;