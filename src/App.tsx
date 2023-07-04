import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Signin, ViewExistedItems, Signup, AddItem, PosView, OrdersHistory, Terms, SingleItem, UserProfile } from './pages';
import { UserProvider, ItemsProvider } from './components/providers';
import { Header, NavigationBar, RoleGuard } from './components/core';
import { Notification, Guard } from './components';

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
                            <Route path='/addItem' element={<Guard><RoleGuard role={['manager', 'admin']}><AddItem /></RoleGuard></Guard>} />
                            <Route path='/ordersHistory' element={<Guard><OrdersHistory /></Guard>} />
                            <Route path='/existedItems' element={<Guard><RoleGuard role={['manager', 'admin']}><ViewExistedItems /></RoleGuard></Guard>} />
                            <Route path='/terms' element={<Terms />} />
                            <Route path='/viewSingleItem/:id' element={<SingleItem />} />
                            <Route path='/viewSingleOrder/:id' element={<SingleItem />} />
                            <Route path='/profile' element={<UserProfile />} />
                        </Routes>
                    </BrowserRouter>
                </ItemsProvider>
            </UserProvider>
            <Notification />
        </div>
    );
};

export default App;