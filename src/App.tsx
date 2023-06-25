import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Signin, ViewExistedItems, Signup, AddItem, PosView, OrdersHistory, Terms, UserProfile } from './pages';
import { UserProvider } from './components/providers';
import { Header, NavigationBar } from './components/core';
import Guard from './components/guard/guard.component';
import { RoleGuard} from './components/core';
import { Notification } from './components';

const App = () => {
    return (
        <div className="App">
            <UserProvider>
                <BrowserRouter>
                    <Header />
                    <NavigationBar />
                    <Routes>
                        <Route path='/' element={<Guard><PosView /></Guard>} />
                        <Route path='/signin' element={<Signin />} />
                        <Route path='/signup' element={<Signup />} />
                        <Route path='/addItem' element={<Guard><RoleGuard role={['manager']}><AddItem /></RoleGuard></Guard>} />
                        <Route path='/ordersHistory' element={<Guard><OrdersHistory /></Guard>} />
                        <Route path='/existedItems' element={<Guard><RoleGuard role={['manager']}><ViewExistedItems /></RoleGuard></Guard>} />
                        <Route path='/terms' element={<Terms />} />
                        <Route path='/profile' element={<UserProfile />} />
                    </Routes>
                </BrowserRouter>
            </UserProvider>
            <Notification />
        </div>
    );
};

export default App;