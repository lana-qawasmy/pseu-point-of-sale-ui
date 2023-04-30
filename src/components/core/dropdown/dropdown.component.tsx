import './dropdown.css';
interface IProps {
    name?: string,
    id?: string,
    Color?: string,
    Required?: boolean,
    Disabled?: boolean,
    Radius?: string
}
const Dropdown = (props: IProps) => {
    // props = {...props, Color:"#0077B6", Disabled: false, Radius:"0",Required: false}
    return (
        <div className="dropdownWrapper">
            <select id={props.id} name= {props.name}>
                <option className='dropdownOption' value="volvo">Volvo</option>
                <option className='dropdownOption' value="saab">Saab</option>
                <option className='dropdownOption' value="opel">Opel</option>
                <option className='dropdownOption' value="audi">Audi</option>
            </select>
        </div>
    );
};

export default Dropdown;
