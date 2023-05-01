import './input.css';

interface IProps {
    HtmlType?: 'text' | 'textArea';

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
    props = {
        ...props,
        Height: props.Height ? props.Height : 20,
        Width: props.Width ? props.Width : 20,
        Radius: props.Radius ? props.Radius : 50/100,
        Disable: props.Disable ? props.Disable : false,
        PlaceHolder: props.PlaceHolder ? props.PlaceHolder : '',
        Label: props.Label ? props.Label : '',
        Status: props.Status ? props.Status : 'valid',
        FontSize: props.FontSize ? props.FontSize : 20,
        FontWeight: props.FontWeight ? props.FontWeight : 'normal',
    };
    return (
        <>
            {
                props.HtmlType === 'textArea'
                    ?
                    <textarea className='textArea'>
                    </textarea>
                    :
                    <input className='input' />
            }
        </>
    );
};

export default Input;