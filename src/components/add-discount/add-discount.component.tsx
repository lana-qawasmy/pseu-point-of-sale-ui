import { Button, Input } from "../core";
import "./add-discount.css";
import { useAddDiscount } from "../../hooks";

const AddDiscount = () => {
    const {
        input,
        setInput,
        handleNumberInput,
        disableButton,
        handelSave,
        emptyInputs,
    } = useAddDiscount();
    return (
        <div className="addDiscountContainer">
            <h1 title='Add new discount'>Add new discount</h1>
            <div className="firstSection">
                <Input
                    Color="#ccc"
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
                        Color="#ccc"
                        onChange={(e) => {
                            handleNumberInput(e.target.value, "percentage");
                        }}
                        value={input.value.toString()}
                    />
                </div>
                <div className="innerWrapper">
                    <Input
                        Color="#ccc"
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
                        Title='Cancel'
                        HtmlType="button"
                        Type="Danger"
                        Width="100"
                        Radius="20"
                        onClick={emptyInputs}
                    >
                        Cancel
                    </Button>
                    <Button
                        Title='Save'
                        HtmlType="button"
                        Type="Tertiary"
                        Width="100"
                        Radius="20"
                        Disabled={disableButton}
                        onClick={handelSave}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddDiscount;
