import './App.css';
import Button from './components/core/button/button.component';

const App = () => {
    return (
        <div className="App">
            <div style={{margin: "40px"}}></div>
            <h1>Primary</h1>
            <Button HtmlType='button' Type='Primary' Width='150' Ratio='50/10' Radius='15'>
                Signup
            </ Button>
            &nbsp;
            <Button HtmlType='button' Type='Primary' Disabled/>
            <h1>Secondary</h1>
            <Button HtmlType='button' Type='Secondary' />
            &nbsp;
            <Button HtmlType='button' Type='Secondary' Disabled/>
            <h1>Tertiary</h1>
            <Button HtmlType='button' Type='Tertiary' />
            &nbsp;
            <Button HtmlType='button' Type='Tertiary' Disabled/>
            <h1>Danger</h1>
            <Button HtmlType='button' Type='Danger' />
            &nbsp;
            <Button HtmlType='button' Type='Danger' Disabled/>
            <h1>Ghost</h1>
            <Button HtmlType='button' Type='Ghost' />
            &nbsp;
            <Button HtmlType='button' Type='Ghost' Disabled/>
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    );
};

export default App;
