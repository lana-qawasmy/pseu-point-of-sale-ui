import "./sell-bar.css";
import { ItemNS } from "../../types";
import { Button } from "../core";
import SellCard from "../sell-card/sell-card.component";
import { useEffect, useMemo, useState } from "react";
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
  price: number;
}
const SellBar = (props: Iprops) => {
    const {selectedItems, setSelectedItems, price} = props
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const tax = 0.10;
    const discount = 5;
    useEffect(()=>{
        setTotalPrice((price + (price * tax)) - discount);
    },[price]);
    const itemsNumber = useMemo(()=>{
        let count = 0;
        selectedItems.map(item=>{
            count += item.number
            return 1;
        });
        return count;
    },[selectedItems]);
  return (
    <div className="sellBarContainer">
      <div className="sectionOne">
        <h2>Details Items</h2>
        <div className="cardContainer">
          {selectedItems?.map((item, index) => {
            return (
              <SellCard
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                index={index}
                key={index}
              />
            );
          })}
        </div>
      </div>
      <div className="sectionTwo">
        <div className="row">
          <span>Item</span>
          <span>{itemsNumber} (Items)</span>
        </div>
        <div className="row">
          <span>Subtotal</span>
          <span>{price.toFixed(2)}</span>
        </div>
        <div className="row">
          <span>discount</span>
          <span>-{discount.toFixed(2)}</span>
        </div>
        <div className="row">
          <span>Tax({(tax * 10).toFixed(2)}%)</span>
          <span>{(tax * price).toFixed(2)}</span>
        </div>
      </div>
      <div className="sectionThree">
        <div className="row">
          <span>Total</span>
          <span>{totalPrice}</span>
        </div>
        <Button
          HtmlType="button"
          Type="Primary"
          Width="350"
          Ratio="7/1"
          Radius="40"
          Color="#03045e"
          FontColor="white"
          FontWeight={700}
          FontSize="21"
        >
          Process Transaction
        </Button>
      </div>
    </div>
  );
};

export default SellBar;
