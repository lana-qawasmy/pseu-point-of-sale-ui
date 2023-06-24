import "./sell-bar.css";
import { ItemNS } from "../../types";
import { Button } from "../core";
interface Iprops {
  selectedItems: {
    item: ItemNS.Item;
    number: number;
  }[];
  setSelectedItems: React.Dispatch<
    React.SetStateAction<
      {
        item: ItemNS.Item;
        number: number;
      }[]
    >
  >;
}
const SellBar = (props: Iprops) => {
  return (
    <div className="sellBarContainer">
      <div className="sectionOne">
        <h2>Details Items</h2>
        <div className="cardContainer">
        <div className="cardWrapper"></div>
        </div>
      </div>
      <div className="sectionTwo">
        <div className="row">
          <span>Item</span>
          <span>2 (Items)</span>
        </div>
        <div className="row">
          <span>Subtotal</span>
          <span>34.98</span>
        </div>
        <div className="row">
          <span>discount</span>
          <span>-5</span>
        </div>
        <div className="row">
          <span>Tax(10%)</span>
          <span>3.5</span>
        </div>
      </div>
      <div className="sectionThree">
        <div className="row">
          <span>Tax(10%)</span>
          <span>3.5</span>
        </div>
        <Button HtmlType="button" Type="Primary" Width="350" Ratio="7/1" Radius="40" Color="#03045e" FontColor="white" FontWeight={700} FontSize="21">Process Transaction</Button>
      </div>
    </div>
  );
};

export default SellBar;
