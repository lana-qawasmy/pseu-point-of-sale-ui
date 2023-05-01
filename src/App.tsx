import './App.css';
import Input from './components/core/input/input.component';

const App = () => {
    return (
        <div className="App">
            <Input HtmlType='textArea' />
            <Input HtmlType='text' />
        </div>
    );
};

export default App;
