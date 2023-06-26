import "./sell-bar.css";
import React from "react";
import { ItemNS } from "../../types";
import { Button } from "../core";
import SellCard from "../sell-card/sell-card.component";
import { useNotification } from '../../hooks';
import { OrderNS } from '../../types/order.type';
import { UserContext } from '../providers/user.provider';
import { orderService } from '../../services';
interface IProps {
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
const SellBar = (props: IProps) => {
    const { selectedItems, setSelectedItems, price } = props;
    const [totalPrice, setTotalPrice] = React.useState<number>(0);
    const user = React.useContext(UserContext);
    const { setNotification } = useNotification();
    const tax = 0.10;
    const discount = 5;
    React.useEffect(() => {
        if (price !== 0)
            setTotalPrice((price + (price * tax)) - discount);
        else setTotalPrice(0);
    }, [price]);
    const itemsNumber = React.useMemo(() => {
        let count = 0;
        selectedItems.map(item => {
            count += item.number;
            return 1;
        });
        return count;
    }, [selectedItems]);

    const handleTransaction = async () => {
        if (itemsNumber === 0) {
            return setNotification({ message: 'There isn\'t any item in the list', status: 'warning' });
        }
        const items = selectedItems.map((item) => ({ item: item.item._id as string, quantity: item.number }));
        const order: OrderNS.IOrder = {
            casherName: user.user?.fullName || 'unknown',
            total: totalPrice,
            items: items,
            tax: tax,
        };
        const addOrder = await orderService.addOrder(user.user?.token as string, order);
        if (addOrder) {
            setNotification({ message: 'Order performed successfully', status: 'success' });
            setSelectedItems([]);
        }
        else {
            setNotification({ message: 'Something went wrong', status: 'error' });
        }
    };

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
                    <span>discount</span>
                    <span>-{discount.toFixed(2)}$</span>
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
                    onClick={() => handleTransaction()}
                >
                    Process Transaction
                </Button>
            </div>
        </div>
    );
};

export default SellBar;
