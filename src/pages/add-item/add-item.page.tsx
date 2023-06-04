import Button from "../../components/core/button/button.component";
import Input from "../../components/core/input/input.component";
import "./add-item.css";
import { Image } from "phosphor-react";
import useAddItem from "../../hooks/add-item.hook";

const AddItem = () => {
  const item = useAddItem();

  return (
    <div className="addItemPageContainer">
      <form onSubmit={item.submitHandler} className="addItemFormContainer">
        <div className="addItemFormTitle">
          <span>Add New Item</span>
        </div>
        <div className="addItemInputWrapper">
          <Input
            name="itemName"
            Width={210}
            Height={30}
            Radius={15}
            Required
            PlaceHolder="Name"
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
          />
        </div>
        <div className="addItemUploadImageWrapper">
          <div
            className="imageWrapper"
            style={{ backgroundImage: `url('${item.imageIcon}')` }}
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
          />
        </div>
        <div className="addItemSubmitButton">
          <Button HtmlType="submit" Color="#023e8a" FontWeight={"bold"} Radius="20" Ratio="20/9" Width="90">Add</Button>
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
          style={{ backgroundImage: `url('${item.imageIcon}')` }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        ></div>
      </div>
    </div>
  );
};
export default AddItem;
