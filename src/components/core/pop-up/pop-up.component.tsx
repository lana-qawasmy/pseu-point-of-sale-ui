import React from 'react';
import './pop-up.css';

interface IProps {
    children: React.ReactNode;
    setDisplayPopup?: React.Dispatch<React.SetStateAction<boolean>>
}
const PopUp = (props: IProps) => {
    return (
        <div className="popUpWrapper blur" >
            <div className='popUp'>
                {props.children}
            </div>
        </div>
    );
};

export default PopUp;