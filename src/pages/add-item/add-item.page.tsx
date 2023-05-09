import Button from '../../components/core/button/button.component';
import Input from '../../components/core/input/input.component';
import './add-item.css';
import { Image } from 'phosphor-react';


const AddItem = () => {
    return (
        <div className='addItemPageContainer'>
            <form onSubmit={e => { e.preventDefault(); }} className="addItemFormContainer">
                <div className="addItemFormTitle">
                    <span>Add New Item</span>
                </div>
                <div className="addItemInputWrapper">
                    <Input Width={210} Height={30} Radius={15} Required PlaceHolder='Name' />
                </div>
                <div className="addItemInputWrapper">
                    <Input Width={210} Height={30} Radius={15} Required PlaceHolder='Price' />
                </div>
                <div className="addItemInputWrapper">
                    <Input Width={210} Height={50} Radius={15} Required Type='textArea' PlaceHolder='Description' />
                </div>
                <div className="addItemUploadImageWrapper">
                    <div className="imageWrapper"></div>
                    <div className="imageSelector">
                        <label htmlFor='addItemInputSelector'>
                            <input
                                type="file"
                                id='addItemInputSelector'
                                accept="image/png, image/gif, image/jpeg" />
                        </label >
                    </div>
                </div>
                <div className="addItemInputWrapper">
                    <Input Width={180} Height={30} Radius={15} Required PlaceHolder='Barcode' />
                </div>
                <div className="addItemSubmitButton">
                    <Button HtmlType='submit'>Add</Button>
                </div>
            </form>
        </div>
    );
};
export default AddItem;