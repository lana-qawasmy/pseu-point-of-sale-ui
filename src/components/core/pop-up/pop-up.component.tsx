import React from 'react';
import './pop-up.css';

interface IProps {
    children: React.ReactNode;
}
const PopUp = (props: IProps) => {
    return (
        <div className="popUpWrapper blur">
            <div className='popUp'>
                {props.children}
            </div>
        </div>
    );
};

export default PopUp;