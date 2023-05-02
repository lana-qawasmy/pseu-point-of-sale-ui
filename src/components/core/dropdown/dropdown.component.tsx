import './dropdown.css';
interface IProps {
    data: string[],
    name: string,
    id: string,
    Placeholder?: string,
    Color?: string,
    Required?: boolean,
    Disabled?: boolean,
    Radius?: string,
    width?: string,
    height?: string,
    onChange?: (val: string) => void
}
const Dropdown = (props: IProps) => {
    let style = {
        border: `solid 2px ${props.Color || "#0077B6"}`,
        color: `${props.Color || "#0077B6"}`,
        width: `${props.width ? props.width + "px" : "150px"}`,
        height: `${props.height ? props.height + "px" : "30px"}`,
        borderRadius: `${props.Radius ? props.Radius + "px" : "0px"}`
    };

    return (
        <div className='dropDown' >
            <div className='dropdownContainer'
                style={{ width: `${props.width ? props.width + "px" : "150px"}` }}>
                {props.Required ?
                    <div className="dropdownRequired"
                        style={{ width: `${props.width ? props.width + "px" : "150px"}` }}>
                        <span>*</span>
                    </div>
                    :
                    <div className="dropdownRequired"
                        style={{ width: `${props.width ? props.width + "px" : "150px"}` }}>
                    </div>
                }
                <select
                    id={props.id}
                    name={props.name}
                    className="dropdownWrapper"
                    style={style}
                    onChange={e => { return props.onChange && props.onChange(e.target.value) }}
                    required={props.Required}
                    disabled={props.Disabled}>
                    {
                        props.Placeholder &&
                        <option className='dropdownOption' value="" disabled>Role</option>
                    }
                    {props.data.map((item) => {
                        return (
                            <option className='dropdownOption' value={item} key={item}>{item}</option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
};

export default Dropdown;
