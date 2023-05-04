import { BrowserRouter , Routes , Route} from 'react-router-dom';
import './App.css';
import Signin from './pages/signin/signin.page';
import Signup from './pages/signup/signup.page';
import AddItem from './pages/add-item/add-item.page';
import PosView from './pages/pos-view/pos-view.page';
import OrdersHistory from './pages/orders-history/orders-history.page';
import ViewWxistedItems from './pages/view-existed-items/view-existed-items.page';

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
            <Routes>
                <Route path='/signin' element={<Signin/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/sddItem' element={<AddItem/>}/>
                <Route path='/posView' element={<PosView/>}/>
                <Route path='/ordersHistory' element={<OrdersHistory/>}/>
                <Route path='/existedItems' element={<ViewWxistedItems/>}/>
            </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
