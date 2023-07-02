import "./sell-card.css";
import { ItemNS } from "../../types";
import { useSellCard } from "../../hooks";
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
  return (
    <div className="cardWrapper" onDrag={handleDrag} onDragStart={handleDragStart} onDragEnd={handleDragEnd} draggable="true">
      <div className="image" style={{ backgroundImage: `url('${selectedItems[index].item.image}')` }}></div>
      <div className="rightSection">
        <span>{selectedItems[index].item.name}</span>
        <div className="bottom">
          <div className="counter">
            <button onClick={() => handleCounter('decrement')}>-</button>
            <span>{selectedItems[index].number}</span>
            <button onClick={() => handleCounter('increment')}>+</button>
          </div>
          <span>
            {(selectedItems[index].item.priceHistory[0].price.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 }))}$
          </span>
        </div>
      </div>
    </div>
  );
};


export default SellCard;