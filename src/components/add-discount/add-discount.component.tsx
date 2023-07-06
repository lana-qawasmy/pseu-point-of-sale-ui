import { Button, Input } from "../core";
import "./add-discount.css";
import { useAddDiscount } from "../../hooks";

const AddDiscount = () => {
  const {
    input,
    setInput,
    handleNumberInput,
    disableButton,
    handlSave,
    emptyInputs,
  } = useAddDiscount();
  return (
    <div className="addDiscountContainer">
      <h1>Add new discount</h1>
      <div className="firstSection">
        <Input
          Label="Discount code"
          Required
          PlaceHolder="2023-summer"
          Type="text"
          Height={25}
          Radius={20}
          onChange={(e) => {
            setInput((oldState) => ({ ...oldState, code: e.target.value }));
          }}
          value={input.code}
        />
        <div className="innerWrapper" style={{ marginRight: 15 }}>
          <Input
            Label="Percentage %"
            PlaceHolder="10"
            Required
            Type="number"
            Height={25}
            Width={100}
            Radius={20}
            onChange={(e) => {
              handleNumberInput(e.target.value, "percentage");
            }}
            value={input.value.toString()}
          />
        </div>
        <div className="innerWrapper">
          <Input
            Type="number"
            Label="Interval (days)"
            PlaceHolder="22"
            Required
            Height={25}
            Width={110}
            Radius={20}
            onChange={(e) => {
              handleNumberInput(e.target.value, "interval");
            }}
            value={input.daysInterval.toString()}
          />
        </div>
      </div>
      <div className="secondSection">
        <div className="buttonsWrapper">
          <Button 
          HtmlType="button" 
          Type="Danger" 
          Width="100" 
          Radius="20"
          onClick={emptyInputs}
          >
            Cancel
          </Button>
          <Button
            HtmlType="button"
            Type="Tertiary"
            Width="100"
            Radius="20"
            Disabled={disableButton}
            onClick={handlSave}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddDiscount;
