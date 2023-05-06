import './App.css';
import Button from './components/core/button/button.component';

const App = () => {
    return (
        <div className="App">
            <div style={{margin: "40px"}}></div>
            <h1>Primary</h1>
            <Button HtmlType='button' Type='Primary' />
            <h1>Secondary</h1>
            <Button HtmlType='button' Type='Secondary' />
            <h1>Tertiary</h1>
            <Button HtmlType='button' Type='Tertiary' />
            <h1>Danger</h1>
            <Button HtmlType='button' Type='Danger' />
            <h1>Ghost</h1>
            <Button HtmlType='button' Type='Ghost' />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    );
};

export default App;
