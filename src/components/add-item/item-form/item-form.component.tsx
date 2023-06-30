import './item-form.css';
import { Image } from "phosphor-react";
import { useAddItem } from '../../../hooks';
import { Button, Input } from '../../core';
import { ItemNS } from '../../../types';

interface IProps {
    edit?: boolean;
    setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
    item?: ItemNS.Item;

}

const ItemForm = (props?: IProps) => {
    const item = useAddItem(props?.item || undefined);
    const priceHistorySize = props?.item?.priceHistory.length || 0;
    return (
        <div className="addItemPageContainer">
            <form onSubmit={e => {
                item.submitHandler(e);
                if (props?.setEdit) {
                    props?.setEdit(false);
                }
            }} className="addItemFormContainer">
                <div className="addItemFormTitle">
                    <span>{props?.edit ? 'Edit ' : 'Add New '} Item</span>
                </div>
                <div className="addItemInputWrapper">
                    <Input
                        name="itemName"
                        Width={210}
                        Height={30}
                        Radius={15}
                        Required
                        PlaceHolder="Name"
                        DefaultValue={props?.item?.name || ''}
                    />
                </div>
                <div className="addItemInputWrapper">
                    <Input
                        name="price"
                        Width={210}
                        Height={30}
                        Radius={15}
                        Required
                        PlaceHolder="Price"
                        Type="number"
                        DefaultValue={props?.item?.priceHistory[priceHistorySize - 1].price.toString() || ''}
                    />
                </div>
                <div className="addItemInputWrapper">
                    <Input
                        name="description"
                        Width={210}
                        Height={50}
                        Radius={15}
                        Type="textArea"
                        PlaceHolder="Description"
                        DefaultValue={props?.item?.description || ''}
                    />
                </div>
                <div className="addItemUploadImageWrapper">
                    <div
                        className="imageWrapper"
                        style={{ backgroundImage: `url('${item.imageIcon.value}')` }}
                        onClick={() => {
                            item.hideImagePopup
                                ? item.setHideImagePopup(false)
                                : item.setHideImagePopup(true);
                        }}
                    ></div>
                    <div className="imageSelector">
                        <label htmlFor="addItemInputSelector" style={item.uploadStatus}>
                            <span>Upload item picture</span>
                            <input
                                type="file"
                                id="addItemInputSelector"
                                accept="image/png, image/gif, image/jpeg"
                                onChange={(e) => {
                                    item.uploadImage(e);
                                }}
                                name="image"
                            />
                            <Image size={16} />
                        </label>
                    </div>
                </div>
                <div className="addItemInputWrapper">
                    <Input
                        name="barcode"
                        Width={180}
                        Height={30}
                        Radius={15}
                        Required
                        PlaceHolder="Barcode"
                        DefaultValue={props?.item?.barcode || ''}
                    />
                </div>
                <div className="addItemSubmitButton">
                    <Button HtmlType="submit" Color="#023e8a" FontWeight={"bold"} Radius="20" Ratio="20/9" Width="90">{props?.edit ? 'Edit' : 'Add'}</Button>
                    {props?.edit && <Button HtmlType="button" Color="#023e8a" FontWeight={"bold"} Radius="20" Ratio="20/9" Width="90" onClick={e => props.setEdit&& props.setEdit(false)}>Cancel</Button>}
                    
                </div>
            </form>
            <div
                className={item.hideImagePopup ? "hidden" : "showImageOverlay"}
                onClick={() => {
                    item.hideImagePopup
                        ? item.setHideImagePopup(false)
                        : item.setHideImagePopup(true);
                }}
            >
                <div
                    className="showImageBody"
                    style={{ backgroundImage: `url('${item.imageIcon.value}')` }}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                ></div>
            </div>
        </div>
    );
};

export default ItemForm;