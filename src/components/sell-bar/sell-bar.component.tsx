import "./sell-bar.css";
import { ItemNS } from "../../types";
import { Button, Input } from "../core";
import SellCard from "../sell-card/sell-card.component";
import React, { useEffect, useMemo, useState } from "react";
import { UserContext } from "../providers/user.provider";
import { discountService } from "../../services";
import { useNotification } from "../../hooks";
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
    const userContext = React.useContext(UserContext)
    const tax = 0.10;
    const [discount, setDiscount] = React.useState<number>(0)
    const [discountCode, setDiscountCode] = React.useState<string>();
    const notification = useNotification()
    // const [discountObject , setDiscount] = React.useState({})
    useEffect(() => {
        if (price !== 0)
            setTotalPrice((price + (price * tax)) - (price * (discount / 100)));
        else setTotalPrice(0);
    }, [price , discount]);
    const itemsNumber = useMemo(() => {
        let count = 0;
        selectedItems.map(item => {
            count += item.number;
            return 1;
        });
        return count;
    }, [selectedItems]);

    const handleDiscount = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const discountValue = await discountService.getDiscount(discountCode || '', userContext.user?.token || '')
            if (discountValue?.value)
                setDiscount(discountValue.value)
            else {
                setDiscount(0)
                notification.setNotification({ message: 'Discount code you entered is not valid! ', status: 'error' })
            }

        } catch (error) {
            setDiscount(0)
            notification.setNotification({ message: 'Discount code you entered is not valid! ', status: 'error' })
        }
    }
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
                <form className="row discount" onSubmit={handleDiscount}>
                    <Input
                        PlaceHolder='Discount code'
                        Height={39}
                        Radius={10}
                        Color="#03045e"
                        name="code"
                        onChange={e => setDiscountCode(e.target.value)}
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
                <div className="row">
                    <span>discount</span>
                    <span>{discount}%</span>
                </div>
                <div className="row">
                    <span>Tax({(tax * 10).toFixed(2)}%)</span>
                    <span>{(tax * price).toFixed(2)}$</span>
                </div>
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
