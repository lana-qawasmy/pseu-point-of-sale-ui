import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Signin, ViewExistedItems, Signup, AddItem, PosView, OrdersHistory, Terms, SingleItem, UserProfile, SingleOrder, NotFound } from './pages';
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
                            <Route path='/viewSingleItem/:id' element={<Guard><SingleItem /></Guard>} />
                            <Route path='/viewSingleOrder/:id' element={<Guard><SingleOrder /></Guard>} />
                            <Route path='/profile' element={<Guard><UserProfile /></Guard>} />
                            <Route path="/*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </ItemsProvider>
            </UserProvider>
            <Notification />
        </div>
    );
};

export default App;