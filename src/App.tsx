import './App.css';
import Input from './components/core/input/input.component';

const App = () => {
    return (
        <div className="App">
            <Input Type='textArea' Status='valid' />
            <Input Type='text' Status='invalid' />
        </div>
    );
};

export default App;
