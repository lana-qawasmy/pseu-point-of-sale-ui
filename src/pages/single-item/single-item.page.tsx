import "./single-item.css";
import { useSingleItem, formatPrice } from "../../hooks";
import { PriceHistory } from "../../components";
const SingleItem = () => {
  const { item } = useSingleItem();

  return (
    <>
      {item && (
        <div className="singleItemPage">
          <div className="singleItemContainer">
            <div
              className="image"
              style={{ backgroundImage: `url('${item.image}')` }}
            ></div>
            <div className="content">
              <h2>{item.name}</h2>
              <span className="quantity">
                <span className="number">{item.quantity}</span>Piece(s) available
              </span>
              <div className="price">
                <span className="certainPrice">
                  {formatPrice(item.priceHistory[0].price)} $
                </span>
                <span className="discount">{formatPrice(22.0)} $</span>
              </div>
              <span className="description">{item.description}</span>
            </div>
          </div>
          <PriceHistory priceHistory={item.priceHistory as { date: Date; price: Number; }[]} />
        </div>
      )}
    </>
  );
};

export default SingleItem;
