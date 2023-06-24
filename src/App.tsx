import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Signin, ViewExistedItems, Signup, AddItem, PosView, OrdersHistory, Terms } from './pages';
import { UserProvider } from './components/providers';
import { Header, NavigationBar } from './components/core';
import Guard from './components/guard/guard.component';
import { Notification } from './components';
import ItemsProvider from './components/providers/items.provider';

const App = () => {
    return (
        <div className="App">
            <UserProvider>
                <ItemsProvider>
                    <BrowserRouter>
                        <Header />
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
                    </BrowserRouter>
                </ItemsProvider>
            </UserProvider>
            <Notification />
        </div>
    );
};

export default App;