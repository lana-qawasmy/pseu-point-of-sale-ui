import './input.css';

interface IProps {
    HtmlType?: string;
    Type?: string;

    Height?: number;
    Width?: number;
    Radius?: number;

    Disable?: boolean;

    PlaceHolder?: string;
    Label?: string;

    Status?: string;

    FontSize?: number;
    FontWeight?: string;
}

const Input = (props: IProps) => {
    props = { ...props, };
    return (
        <div className='input'>

        </div>
    );
};

export default Input;