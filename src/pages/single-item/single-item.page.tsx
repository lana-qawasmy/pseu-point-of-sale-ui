import "./single-item.css";
import { useSingleItem } from "../../hooks";
const SingleItem = () => {
  const { id, item } = useSingleItem();
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
                <span className="number">43</span>Pieces available
              </span>
              <div className="price">
                <span className="certainPrice">
                  {item.priceHistory[0].price.toFixed(2).toString()}
                </span>
                <span className="discount">22.05</span>
              </div>
              <span className="description">{item.description}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleItem;
