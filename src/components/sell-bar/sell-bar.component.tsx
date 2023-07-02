import "./sell-bar.css";
import { ItemNS } from "../../types";
import { Button, Input } from "../core";
import SellCard from "../sell-card/sell-card.component";
import React, { useEffect, useMemo, useState } from "react";
import { useDiscount } from "../../hooks";
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
    const { selectedItems, setSelectedItems, price } = props;
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const discount = useDiscount();
    const tax = 0.10;
    // const [discountObject , setDiscount] = React.useState({})
    useEffect(() => {
        if (price !== 0)
            setTotalPrice((price + (price * tax)) - (price * (discount.discount / 100)));
        else setTotalPrice(0);
    }, [price, discount]);
    const itemsNumber = useMemo(() => {
        let count = 0;
        selectedItems.map(item => {
            count += item.number;
            return 1;
        });
        return count;
    }, [selectedItems]);

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
                    <span>{price.toFixed(2)}$</span>
                </div>
                <div className="row">
                    <span>Tax({(tax * 10).toFixed(2)}%)</span>
                    <span>{(tax * price).toFixed(2)}$</span>
                </div>
                <div className="row">
                    <span>discount</span>
                    <span>{discount.discount}%</span>
                </div>
                <form className="row" onSubmit={discount.handleDiscount}>
                    <Input
                        PlaceHolder='Discount code'
                        Height={39}
                        Radius={10}
                        Color="#03045e"
                        name="code"
                        onChange={e => discount.setDiscountCode(e.target.value)}
                    />
                    <Button
                        HtmlType='submit'
                        Width='100'
                        Radius="10"
                        Color="#03045e"
                        FontSize="12"
                    >
                        Apply discount
                    </Button>
                </form>
            </div>
            <div className="sectionThree">
                <div className="row">
                    <span>Total</span>
                    <span>{totalPrice.toFixed(2)}$</span>
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
