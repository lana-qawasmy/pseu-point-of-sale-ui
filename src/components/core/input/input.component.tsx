import './input.css';

interface IProps {
    Type?: 'text' | 'textArea';

    Color?: string;

    Height?: number;
    Width?: number;
    Radius?: number;

    Disabled?: boolean;

    PlaceHolder?: string;
    Label?: string;

    Status?: string;

    FontSize?: number;
    FontWeight?: string;
}

const Input = (props: IProps) => {
    props = {
        ...props,
        Label: props.Label ? props.Label : '',
        Status: props.Status ? props.Status : 'valid',
    };

    const style = {
        height: `${props.Height ? props.Height : props.Type === 'textArea' ? '80' : '40'}px`,
        width: `${props.Width ? props.Width : props.Type === 'textArea' ? '150' : '150'}px`,
        borderRadius: `${props.Radius ? props.Radius : '5'}px`,
        fontWeight: `${props.FontWeight ? props.FontWeight : 'normal'}`,
        fontSize: `${props.FontSize ? props.FontSize : '16'}px`,
        borderColor: `${props.Color ? props.Color : '#0077B6'}`,
    };

    return (
        <>
            {
                props.Type === 'textArea'
                    ?
                    <textarea
                        className='textArea'
                        style={style}
                        disabled={props.Disabled}
                        placeholder={props.PlaceHolder}
                    />
                    :
                    <input
                        className='input'
                        style={style}
                        disabled={props.Disabled}
                        placeholder={props.PlaceHolder}
                    />
            }
        </>
    );
};

export default Input;