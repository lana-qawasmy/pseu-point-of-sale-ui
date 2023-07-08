import "./sell-card.css";
import { ItemNS } from "../../types";
import { useNotification, useSellCard } from "../../hooks";
import React from "react";

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
    index: number;
}
const SellCard = (props: IProps) => {
    const { index, selectedItems, setSelectedItems } = props;
    const { handleCounter, handleDrag, handleDragStart, handleDragEnd } = useSellCard({ index, selectedItems, setSelectedItems });
    const notification = useNotification();
    return (
        <div className="cardWrapper" onDrag={handleDrag} onDragStart={handleDragStart} onDragEnd={handleDragEnd} draggable="true">
            <div className="image" style={{ backgroundImage: `url('${selectedItems[index].item.image}')` }} title={`${selectedItems[index].item.name} image`}></div>
            <div className="rightSection">
                <span title={`${selectedItems[index].item.name}`}>{selectedItems[index].item.name}</span>
                <div className="bottom">
                    <div className="counter">
                        <button onClick={() => handleCounter('decrement')} title='Decrement'>-</button>
                        <span className="numberOfElements" title={`Number of ${selectedItems[index].item.name}(s)`}>{selectedItems[index].number}</span>
                        <button className={selectedItems[index].item.quantity > 0 ? '' : 'soldOut'}
                            onClick={() => {
                                selectedItems[index].item.quantity
                                    ? handleCounter('increment')
                                    : notification.setNotification({ message: 'Item is out of stock', status: 'error' });
                            }} title='Increment'>+</button>
                    </div>
                    <span title='Price'>{(selectedItems[index].item.priceHistory[0].price) as number}$</span>
                </div>
            </div>
        </div>
    );
};


export default SellCard;